// Leitura do monitor-bot (o bot de Telegram do belmont-monitor) direto do SQLite
// dele, em modo só leitura, num volume montado :ro. Nada é escrito no banco.
//
// O bot checa cada app a cada 60 s e grava em `checagem` (ts, chave, ok, ms); o
// estado confirmado de cada alvo (2 falhas seguidas = "caido") fica no JSON de
// `estado`. Daqui saem só status, latência e uptime: URL ("onde") e texto de erro
// do estado são descartados nesta leitura.
import { DatabaseSync } from 'node:sqlite';

export const FRESH_MS = 5 * 60 * 1000; // o bot checa a cada 60 s; 5 min sem checagem = bot parado
const DAYS = 30;
const KEEP_LATENCY = 20;
const BRT = 3 * 3600; // mesmo corte de dia do history.js

const dayKey = (ms) => new Date(ms - BRT * 1000).toISOString().slice(0, 10);

/**
 * Lê os apps pedidos (nome como no monitor.toml do bot) →
 * { lastCheck, systems: Map(nome → { down, latency[], days{dia:[up,total]} }) }.
 * App que o bot não conhece fica fora do Map.
 */
export function readBot(dbPath, names, { now = Date.now() } = {}) {
  const db = new DatabaseSync(dbPath, { readOnly: true, timeout: 5000 });
  try {
    const last = db.prepare('SELECT MAX(ts) AS ts FROM checagem').get()?.ts;
    const row = db.prepare('SELECT json FROM estado WHERE id = 1').get();
    const estado = row ? JSON.parse(row.json) : {};

    const cut = dayKey(now - (DAYS - 1) * 86400e3);
    const since = Math.floor(now / 1000) - (DAYS + 1) * 86400;
    const daysQ = db.prepare(
      `SELECT date(ts - ${BRT}, 'unixepoch') AS dia, SUM(ok) AS up, COUNT(*) AS total
         FROM checagem WHERE chave = ? AND ts >= ? GROUP BY dia`,
    );
    const latQ = db.prepare('SELECT ms FROM checagem WHERE chave = ? AND ms IS NOT NULL ORDER BY ts DESC LIMIT ?');

    const systems = new Map();
    for (const name of names) {
      const chave = `app:${name}`;
      const days = {};
      for (const d of daysQ.all(chave, since)) if (d.dia >= cut) days[d.dia] = [d.up, d.total];
      if (!(chave in estado) && !Object.keys(days).length) continue;
      const latency = latQ.all(chave, KEEP_LATENCY).map((r) => Math.round(r.ms)).reverse();
      systems.set(name, { down: estado[chave]?.caido === true, latency, days });
    }
    return { lastCheck: last == null ? null : last * 1000, systems };
  } finally {
    db.close();
  }
}

/** Nomes de todos os apps que o bot já checou, para o diagnóstico (check.js). */
export function listBotApps(dbPath) {
  const db = new DatabaseSync(dbPath, { readOnly: true, timeout: 5000 });
  try {
    const row = db.prepare('SELECT json FROM estado WHERE id = 1').get();
    const estado = row ? JSON.parse(row.json) : {};
    const out = new Map();
    for (const [chave, e] of Object.entries(estado)) {
      if (chave.startsWith('app:')) out.set(chave.slice(4), { down: e?.caido === true });
    }
    return out;
  } finally {
    db.close();
  }
}
