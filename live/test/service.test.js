import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { loadConfig, parseMonitors, ConfigError } from '../src/config.js';
import { parseMetrics } from '../src/kuma.js';
import { History } from '../src/history.js';
import { pollOnce, toStatus } from '../src/poller.js';
import { createApp, rateLimiter } from '../src/app.js';
import { renderTelemetry, STALE_MS } from '../src/telemetry.js';

const METRICS = `# HELP monitor_status Monitor Status (1 = UP, 0= DOWN, 2= PENDING, 3= MAINTENANCE)
# TYPE monitor_status gauge
monitor_status{monitor_name="beleads-api",monitor_type="http",monitor_url="https://10.0.0.5:3000/health",monitor_hostname="null",monitor_port="null"} 1
monitor_response_time{monitor_name="beleads-api",monitor_type="http",monitor_url="https://10.0.0.5:3000/health",monitor_hostname="null",monitor_port="null"} 132
monitor_status{monitor_name="ponto \\"web\\"",monitor_type="http",monitor_url="x",monitor_hostname="null",monitor_port="null"} 0
monitor_response_time{monitor_name="ponto \\"web\\"",monitor_type="http",monitor_url="x",monitor_hostname="null",monitor_port="null"} -1
monitor_status{monitor_name="slow",monitor_type="http",monitor_url="x",monitor_hostname="null",monitor_port="null"} 1
monitor_response_time{monitor_name="slow",monitor_type="http",monitor_url="x",monitor_hostname="null",monitor_port="null"} 4000
monitor_status{monitor_name="secret-internal-db",monitor_type="port",monitor_url="null",monitor_hostname="10.0.0.9",monitor_port="5432"} 1
`;

const TOKEN = 'a'.repeat(40);
const ENV = {
  KUMA_URL: 'http://uptime-kuma:3001', KUMA_API_KEY: 'uk1_x',
  MONITORS: 'beleads-api=BELeads; ponto "web"=BELPonto ;slow=Website', INGEST_TOKEN: TOKEN,
};
const fakeFetch = (text = METRICS, status = 200) => async (url, opts) => {
  assert.equal(url, 'http://uptime-kuma:3001/metrics');
  assert.match(opts.headers.authorization, /^Basic /);
  return new Response(text, { status });
};

// ── configuração ───────────────────────────────────────────────────────────
test('config válida', () => {
  const c = loadConfig({ ...ENV, DATA_DIR: '/tmp/x' });
  assert.deepEqual(c.monitors.map((m) => m.name), ['BELeads', 'BELPonto', 'Website']);
  assert.equal(c.monitors[1].kuma, 'ponto "web"');
  assert.equal(c.pollSeconds, 60);
});

test('config inválida falha com mensagem clara', () => {
  const bad = [
    { ...ENV, KUMA_URL: 'uptime-kuma:3001' },
    { ...ENV, KUMA_URL: 'http://kuma:3001/metrics' },
    { ...ENV, KUMA_API_KEY: '' },
    { ...ENV, MONITORS: '' },
    { ...ENV, MONITORS: 'a=<script>' },
    { ...ENV, MONITORS: 'a=X;b=X' },
    { ...ENV, INGEST_TOKEN: 'curto' },
    { ...ENV, POLL_SECONDS: '1' },
  ];
  for (const env of bad) assert.throws(() => loadConfig(env), ConfigError);
  assert.equal(loadConfig({ ...ENV, INGEST_TOKEN: '' }).ingestToken, null);
});

test('parseMonitors: o primeiro "=" separa; acentos e espaços no nome público', () => {
  assert.deepEqual(parseMonitors(' site  prod =BELPreço; ;txintxa=Txintxa do Gigi'), [
    { kuma: 'site  prod', name: 'BELPreço' }, { kuma: 'txintxa', name: 'Txintxa do Gigi' },
  ]);
  assert.throws(() => parseMonitors('api=v2=API'), ConfigError);
});

// ── Kuma ───────────────────────────────────────────────────────────────────
test('parseMetrics lê status e latência e ignora o resto', () => {
  const m = parseMetrics(METRICS);
  assert.deepEqual(m.get('beleads-api'), { status: 1, responseMs: 132 });
  assert.deepEqual(m.get('ponto "web"'), { status: 0, responseMs: -1 });
  assert.equal(m.size, 4);
  assert.ok(!JSON.stringify([...m]).includes('10.0.0'));
});

test('toStatus', () => {
  assert.equal(toStatus(1, 100, 1500), 'up');
  assert.equal(toStatus(1, 4000, 1500), 'degraded');
  assert.equal(toStatus(0, -1, 1500), 'down');
  assert.equal(toStatus(3, 0, 1500), 'up');
  assert.equal(toStatus(2, 0, 1500), null);
});

// ── histórico e poller ─────────────────────────────────────────────────────
test('poll grava só os sistemas mapeados e persiste no disco', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'ryu-'));
  const config = loadConfig({ ...ENV, DATA_DIR: dir });
  const h = new History(dir);
  const r = await pollOnce({ config, history: h, now: Date.UTC(2026, 9, 27, 12), fetchImpl: fakeFetch() });
  assert.deepEqual(r, { seen: 3, total: 3, missing: [] });
  const saved = readFileSync(join(dir, 'state.json'), 'utf8');
  assert.ok(!saved.includes('secret-internal') && !saved.includes('10.0.0'), 'nada fora da lista sai do Kuma');
  const snap = new History(dir).snapshot(config.monitors.map((m) => m.name));
  assert.deepEqual(snap.systems.map((s) => s.status), ['up', 'down', 'degraded']);
  assert.equal(snap.systems[0].uptime30d, 100);
  assert.equal(snap.systems[1].uptime30d, 0);
  assert.ok(!existsSync(join(dir, 'state.json.tmp')));
});

test('uptime de 30 dias descarta dias antigos', () => {
  const h = new History(null);
  const day = 86400e3, t0 = Date.UTC(2026, 0, 1, 12);
  for (let d = 0; d < 40; d++) h.record('A', d < 10 ? 'down' : 'up', 100, t0 + d * day);
  const s = h.snapshot(['A']).systems[0];
  assert.equal(s.days, 30);
  assert.equal(s.uptime30d, 100);
});

test('Kuma fora do ar: o poll falha sem apagar o histórico', async () => {
  const config = loadConfig({ ...ENV, DATA_DIR: '' });
  const h = new History(null);
  h.record('BELeads', 'up', 100, Date.now());
  await assert.rejects(pollOnce({ config, history: h, fetchImpl: fakeFetch('nope', 401) }), /chave de API/);
  await assert.rejects(pollOnce({ config, history: h, fetchImpl: fakeFetch('x', 502) }), /HTTP 502/);
  assert.equal(h.state.systems.BELeads.status, 'up');
});

test('monitor que sumiu do Kuma fica sem status', async () => {
  const config = loadConfig({ ...ENV, DATA_DIR: '' });
  const h = new History(null);
  await pollOnce({ config, history: h, fetchImpl: fakeFetch() });
  const r = await pollOnce({ config, history: h, fetchImpl: fakeFetch(METRICS.split('\n').filter((l) => !l.includes('slow')).join('\n')) });
  assert.deepEqual(r.missing, ['slow']);
  assert.equal(h.snapshot(['Website']).systems[0].status, undefined);
});

// ── HTTP ───────────────────────────────────────────────────────────────────
async function serve(env = ENV, prep) {
  const config = loadConfig({ ...env, DATA_DIR: '' });
  const history = new History(null);
  prep?.(history);
  const server = createServer(createApp({ config, history }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  return { base, history, close: () => new Promise((r) => server.close(r)) };
}

test('svg com cabeçalhos certos; health reflete o Kuma', async () => {
  const s = await serve();
  try {
    let r = await fetch(`${s.base}/telemetry.svg?theme=light`);
    assert.equal(r.status, 200);
    assert.equal(r.headers.get('content-type'), 'image/svg+xml; charset=utf-8');
    assert.match(r.headers.get('cache-control'), /no-cache/);
    assert.match(await r.text(), /waiting for the first signal/);
    assert.equal((await fetch(`${s.base}/health`)).status, 503);
    s.history.markPoll(Date.now());
    assert.equal((await fetch(`${s.base}/health`)).status, 200);
    assert.equal((await fetch(`${s.base}/telemetry.svg`, { method: 'POST' })).status, 405);
    assert.equal((await fetch(`${s.base}/state.json`)).status, 404);
    assert.equal((await fetch(`${s.base}/../data/state.json`)).status, 404);
  } finally { await s.close(); }
});

test('ingest: token, lista permitida, limites', async () => {
  const s = await serve();
  const post = (body, token = TOKEN) => fetch(`${s.base}/ingest`, {
    method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
  try {
    assert.equal((await post({ system: 'BELeads', tests: 1 }, 'errado')).status, 401);
    assert.equal((await post({ system: 'Intruso', tests: 1 })).status, 422);
    assert.equal((await post('{x')).status, 400);
    assert.equal((await post('x'.repeat(5000))).status, 413);
    assert.equal((await post({ system: 'BELeads', tests: 2147, deployedAt: '2026-10-26T13:05:00-03:00', host: '10.0.0.5' })).status, 200);
    assert.deepEqual(s.history.state.ci.BELeads, { tests: 2147, deployedAt: '2026-10-26T16:05:00.000Z' });
  } finally { await s.close(); }
});

test('ingest desligado sem INGEST_TOKEN', async () => {
  const s = await serve({ ...ENV, INGEST_TOKEN: '' });
  try {
    assert.equal((await fetch(`${s.base}/ingest`, { method: 'POST', body: '{}' })).status, 404);
  } finally { await s.close(); }
});

test('rate limiter', () => {
  const ok = rateLimiter({ limit: 2, windowMs: 1000 });
  assert.deepEqual([ok('a', 0), ok('a', 1), ok('a', 2), ok('b', 2), ok('a', 1500)], [true, true, false, true, true]);
});

// ── render ─────────────────────────────────────────────────────────────────
test('painel: NO SIGNAL depois de 15 min, escape de texto, rótulo de dias honesto', () => {
  const now = Date.now();
  const base = { allow: ['BELeads'], ci: {}, systems: [{ name: 'BELeads', status: 'up', uptime30d: 99.9, days: 3 }] };
  const live = renderTelemetry({ ...base, updatedAt: now - 60e3 }, 'dark', now);
  assert.match(live, /1\/1 SYSTEMS ONLINE/);
  assert.match(live, /3d UPTIME 99\.90%/);
  assert.match(renderTelemetry({ ...base, updatedAt: now - STALE_MS - 1 }, 'dark', now), /NO SIGNAL/);
  const evil = renderTelemetry({ allow: ['<x>&'], ci: {}, systems: [], updatedAt: null });
  assert.doesNotMatch(evil, /<x>/);
});
