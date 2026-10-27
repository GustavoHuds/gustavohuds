// Lê o Kuma em intervalo fixo e alimenta o histórico.
// Falha de leitura não apaga nada: o painel só vira "no signal" depois de 15 min.
import { fetchMetrics } from './kuma.js';

/** Status do Kuma (0–3) + latência → status público, ou null se ainda não sabemos. */
export function toStatus(code, responseMs, slowMs) {
  if (code === 0) return 'down';
  if (code === 1) return responseMs > slowMs ? 'degraded' : 'up';
  if (code === 3) return 'up'; // manutenção planejada não conta como queda
  return null;                 // 2 = pending
}

export async function pollOnce({ config, history, now = Date.now(), fetchImpl }) {
  const metrics = await fetchMetrics(config, { fetchImpl });
  let seen = 0;
  for (const { kuma, name } of config.monitors) {
    const m = metrics.get(kuma);
    const status = m ? toStatus(m.status, m.responseMs, config.slowMs) : null;
    if (status) { history.record(name, status, m.responseMs, now); seen++; } else history.unknown(name);
  }
  history.markPoll(now);
  history.save();
  return { seen, total: config.monitors.length, missing: config.monitors.filter((m) => !metrics.has(m.kuma)).map((m) => m.kuma) };
}

export function startPoller({ config, history, log = console }) {
  let timer, lastError = null;
  const tick = async () => {
    try {
      const r = await pollOnce({ config, history });
      if (lastError || r.missing.length) {
        log.info(JSON.stringify({ level: 'info', msg: 'poll ok', seen: r.seen, total: r.total, missing: r.missing }));
      }
      lastError = null;
    } catch (err) {
      const msg = String(err?.message ?? err);
      if (msg !== lastError) log.error(JSON.stringify({ level: 'error', msg: 'poll failed', err: msg }));
      lastError = msg;
    } finally {
      timer = setTimeout(tick, config.pollSeconds * 1000);
    }
  };
  tick();
  return () => clearTimeout(timer);
}
