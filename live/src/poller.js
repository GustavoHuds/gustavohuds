// Lê a fonte (monitor-bot ou Uptime Kuma) em intervalo fixo e alimenta o histórico.
// Falha de leitura não apaga nada: o painel só vira "no signal" depois de 15 min.
import { fetchMetrics } from './kuma.js';
import { readBot, FRESH_MS } from './bot.js';

/** Status do Kuma (0–3) + latência → status público, ou null se ainda não sabemos. */
export function toStatus(code, responseMs, slowMs) {
  if (code === 0) return 'down';
  if (code === 1) return responseMs > slowMs ? 'degraded' : 'up';
  if (code === 3) return 'up'; // manutenção planejada não conta como queda
  return null;                 // 2 = pending
}

async function pollKuma({ config, history, now, fetchImpl }) {
  const metrics = await fetchMetrics(config, { fetchImpl });
  let seen = 0;
  for (const { key, name } of config.monitors) {
    const m = metrics.get(key);
    const status = m ? toStatus(m.status, m.responseMs, config.slowMs) : null;
    if (status) { history.record(name, status, m.responseMs, now); seen++; } else history.unknown(name);
  }
  return { seen, missing: config.monitors.filter((m) => !metrics.has(m.key)).map((m) => m.key) };
}

function pollBot({ config, history, now }) {
  const { lastCheck, systems } = readBot(config.botDb, config.monitors.map((m) => m.key), { now });
  // Bot parado: não renova o lastPoll, e o painel cai para "no signal" sozinho.
  if (lastCheck == null) throw new Error('monitor-bot ainda não registrou nenhuma checagem');
  if (now - lastCheck > FRESH_MS) throw new Error(`monitor-bot sem checagens há ${Math.round((now - lastCheck) / 60e3)} min`);
  let seen = 0;
  for (const { key, name } of config.monitors) {
    const s = systems.get(key);
    if (!s) { history.unknown(name); continue; }
    const last = s.latency.at(-1);
    const status = s.down ? 'down' : last > config.slowMs ? 'degraded' : 'up';
    history.replace(name, { status, latency: s.latency, days: s.days });
    seen++;
  }
  return { seen, missing: config.monitors.filter((m) => !systems.has(m.key)).map((m) => m.key) };
}

export async function pollOnce({ config, history, now = Date.now(), fetchImpl }) {
  const r = config.source === 'bot'
    ? pollBot({ config, history, now })
    : await pollKuma({ config, history, now, fetchImpl });
  history.markPoll(now);
  history.save();
  return { ...r, total: config.monitors.length };
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
