import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { loadConfig, ConfigError } from '../src/config.js';
import { readBot, listBotApps, FRESH_MS } from '../src/bot.js';
import { History } from '../src/history.js';
import { pollOnce } from '../src/poller.js';

// Mesmo esquema do bot/monitor_bot/store.py do belmont-monitor.
const ESQUEMA = `
CREATE TABLE checagem (ts INTEGER NOT NULL, chave TEXT NOT NULL, ok INTEGER NOT NULL, ms REAL);
CREATE INDEX checagem_chave_ts ON checagem (chave, ts);
CREATE TABLE vida (minuto INTEGER PRIMARY KEY);
CREATE TABLE estado (id INTEGER PRIMARY KEY CHECK (id = 1), json TEXT NOT NULL);
CREATE TABLE rotina (chave TEXT PRIMARY KEY, ts INTEGER NOT NULL, ok INTEGER NOT NULL, msg TEXT NOT NULL DEFAULT '');
`;

const NOW = Date.UTC(2026, 9, 27, 15); // 12:00 BRT
const DAY = 86400;

/** Banco de bot com checagens a cada 10 min nos últimos `days` dias. */
function fakeBot({ lastAgoS = 30, days = 40, estado } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'ryu-bot-'));
  const file = join(dir, 'monitor.db');
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode=WAL');
  db.exec(ESQUEMA);
  const ins = db.prepare('INSERT INTO checagem (ts, chave, ok, ms) VALUES (?, ?, ?, ?)');
  const end = Math.floor(NOW / 1000) - lastAgoS;
  db.exec('BEGIN'); // ~17 mil linhas: uma transação só, senão é um fsync por linha
  for (let ts = end - days * DAY; ts <= end; ts += 600) {
    ins.run(ts, 'app:BELPonto', 1, 110);
    // Belsite: fora do ar no dia mais antigo da janela de 30 dias, lento no fim
    const belsiteDown = ts > end - 29 * DAY && ts < end - 28 * DAY;
    ins.run(ts, 'app:Belsite', belsiteDown ? 0 : 1, belsiteDown ? null : (ts > end - 3600 ? 4000 : 120));
    ins.run(ts, 'app:Interno', 1, 50);
  }
  db.exec('COMMIT');
  db.prepare('INSERT INTO estado (id, json) VALUES (1, ?)').run(JSON.stringify(estado ?? {
    'app:BELPonto': { caido: false, erro: '', onde: 'https://10.0.0.5/v1/saude' },
    'app:Belsite': { caido: false, erro: '', onde: 'https://loja.example.com/api/health' },
    'app:Interno': { caido: true, erro: 'ECONNREFUSED 10.0.0.9:5432', onde: 'http://10.0.0.9:5432' },
    'vps:cpu': { caido: false },
  }));
  db.close();
  return { dir, file };
}

const env = (file, extra = {}) => ({
  SOURCE: 'bot', BOT_DB: file, MONITORS: 'BELPonto=BELPonto;Belsite=Website;Interno=Interno', ...extra,
});

test('config: SOURCE=bot dispensa o Kuma; fonte desconhecida falha', () => {
  const c = loadConfig({ SOURCE: 'bot', MONITORS: 'a=A' });
  assert.equal(c.source, 'bot');
  assert.equal(c.botDb, '/bot/monitor.db');
  assert.equal(c.kumaApiKey, null);
  assert.throws(() => loadConfig({ SOURCE: 'prometheus', MONITORS: 'a=A' }), ConfigError);
  assert.throws(() => loadConfig({ MONITORS: 'a=A' }), /KUMA_URL/); // sem SOURCE continua sendo Kuma
});

test('readBot: estado confirmado, latência e dias em BRT; app desconhecido fica de fora', () => {
  const { file } = fakeBot();
  const r = readBot(file, ['BELPonto', 'Belsite', 'Interno', 'Nada'], { now: NOW });
  assert.equal(r.lastCheck, NOW - 30_000);
  assert.equal(r.systems.get('Interno').down, true);
  assert.equal(r.systems.get('BELPonto').down, false);
  assert.equal(r.systems.get('BELPonto').latency.length, 20);
  assert.equal(Object.keys(r.systems.get('BELPonto').days).length, 30);
  assert.ok(!r.systems.has('Nada'));
  assert.equal(r.systems.get('Belsite').latency.at(-1), 4000);
});

test('readBot não escreve no banco do bot', () => {
  const { file } = fakeBot();
  const before = statSync(file).mtimeMs;
  readBot(file, ['BELPonto'], { now: NOW });
  listBotApps(file);
  assert.equal(statSync(file).mtimeMs, before);
  assert.throws(() => new DatabaseSync(file, { readOnly: true }).exec('DELETE FROM checagem'), /readonly/i);
});

test('poll do bot: status, uptime de 30 dias e nada de URL/erro no estado salvo', async () => {
  const { file } = fakeBot();
  const dir = mkdtempSync(join(tmpdir(), 'ryu-'));
  const config = loadConfig(env(file, { DATA_DIR: dir }));
  const h = new History(dir);
  const r = await pollOnce({ config, history: h, now: NOW });
  assert.deepEqual(r, { seen: 3, total: 3, missing: [] });
  const snap = h.snapshot(config.monitors.map((m) => m.name));
  assert.deepEqual(snap.systems.map((s) => s.status), ['up', 'degraded', 'down']);
  assert.equal(snap.systems[0].uptime30d, 100);
  assert.equal(snap.systems[0].days, 30);
  assert.ok(snap.systems[1].uptime30d < 100 && snap.systems[1].uptime30d > 95);
  const saved = readFileSync(join(dir, 'state.json'), 'utf8');
  for (const leak of ['10.0.0', 'ECONNREFUSED', 'https://', 'vps:']) assert.ok(!saved.includes(leak), `vazou ${leak}`);
});

test('bot parado: o poll falha sem renovar o sinal nem apagar o histórico', async () => {
  const { file } = fakeBot({ lastAgoS: FRESH_MS / 1000 + 60 });
  const config = loadConfig(env(file));
  const h = new History(null);
  h.record('BELPonto', 'up', 100, NOW - 60_000);
  h.markPoll(NOW - 60_000);
  await assert.rejects(pollOnce({ config, history: h, now: NOW }), /sem checagens há 6 min/);
  assert.equal(h.state.lastPoll, NOW - 60_000);
  assert.equal(h.state.systems.BELPonto.status, 'up');
});

test('banco inexistente: erro claro', async () => {
  const config = loadConfig(env('/nao/existe/monitor.db'));
  await assert.rejects(pollOnce({ config, history: new History(null), now: NOW }), /unable to open|no such file|cannot open/i);
});

test('app que o bot deixou de checar fica sem status e aparece em missing', async () => {
  const { file } = fakeBot({ estado: { 'app:BELPonto': { caido: false } } });
  const config = loadConfig(env(file, { MONITORS: 'BELPonto=BELPonto;Sumiu=Sumiu' }));
  const r = await pollOnce({ config, history: new History(null), now: NOW });
  assert.deepEqual(r.missing, ['Sumiu']);
});
