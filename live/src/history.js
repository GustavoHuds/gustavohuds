// Histórico local: contagem diária de amostras (up/total) por sistema, para o
// uptime de 30 dias, e as últimas latências para a sparkline. Cabe em poucos KB
// e sobrevive a reinícios (volume /data). Gravação atômica: tmp + rename.
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DAYS = 30;
const KEEP_LATENCY = 20;

const dayKey = (ms) => new Date(ms - 3 * 3600e3).toISOString().slice(0, 10); // dia em BRT

export class History {
  constructor(dataDir) {
    this.file = dataDir ? join(dataDir, 'state.json') : null;
    this.state = { systems: {}, ci: {}, lastPoll: null };
    if (this.file) {
      mkdirSync(dataDir, { recursive: true });
      try { this.state = { ...this.state, ...JSON.parse(readFileSync(this.file, 'utf8')) }; } catch { /* primeiro start */ }
    }
  }

  /** Registra uma leitura: status "up"|"degraded"|"down" e latência (ou null). */
  record(name, status, latencyMs, now) {
    const s = (this.state.systems[name] ??= { days: {}, latency: [], status: null });
    const k = dayKey(now);
    const d = (s.days[k] ??= [0, 0]);
    d[0] += status === 'down' ? 0 : 1;
    d[1] += 1;
    s.status = status;
    if (Number.isFinite(latencyMs) && latencyMs >= 0) s.latency = [...s.latency, Math.round(latencyMs)].slice(-KEEP_LATENCY);
    const cut = dayKey(now - (DAYS - 1) * 86400e3);
    for (const key of Object.keys(s.days)) if (key < cut) delete s.days[key];
  }

  /**
   * Substitui o sistema inteiro por dados já agregados na fonte (o monitor-bot
   * guarda 35 dias de checagens, então o uptime sai certo desde o primeiro poll).
   */
  replace(name, { status, latency, days }) {
    this.state.systems[name] = { days: { ...days }, latency: latency.slice(-KEEP_LATENCY), status };
  }

  /** Sistema sumiu da fonte ou está "pending": mantém o histórico, sem status atual. */
  unknown(name) {
    const s = this.state.systems[name];
    if (s) s.status = null;
  }

  markPoll(now) { this.state.lastPoll = now; }

  setCi(name, data) { this.state.ci[name] = { ...this.state.ci[name], ...data }; }

  snapshot(names) {
    const systems = names.map((name) => {
      const s = this.state.systems[name];
      if (!s) return { name };
      const days = Object.values(s.days);
      const [up, total] = days.reduce((a, [u, t]) => [a[0] + u, a[1] + t], [0, 0]);
      return {
        name,
        status: s.status ?? undefined,
        uptime30d: total ? (100 * up) / total : undefined,
        latencyMs: s.latency,
        days: days.length,
      };
    });
    return { systems, ci: this.state.ci, updatedAt: this.state.lastPoll, allow: names };
  }

  save() {
    if (!this.file) return;
    const tmp = `${this.file}.tmp`;
    writeFileSync(tmp, JSON.stringify(this.state));
    renameSync(tmp, this.file);
  }
}
