import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { renderTelemetry, STALE_MS } from '../src/telemetry.js';

const memoryKv = () => {
  const m = new Map();
  return {
    m,
    async get(k, type) { const v = m.get(k); return v == null ? null : type === 'json' ? JSON.parse(v) : v; },
    async put(k, v) { m.set(k, v); },
  };
};
const env = () => ({ PROFILE: memoryKv(), INGEST_TOKEN: 'secret-token', SYSTEMS: 'BELeads,BELPonto,NinjaCash' });
const post = (body, token = 'secret-token') => new Request('https://x/ingest', {
  method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
const get = (path) => new Request(`https://x${path}`);

test('ingest exige o token', async () => {
  const e = env();
  assert.equal((await worker.fetch(post({ systems: [] }, 'wrong'), e)).status, 401);
  assert.equal((await worker.fetch(post({ systems: [] }, ''), e)).status, 401);
  assert.equal(e.PROFILE.m.size, 0);
});

test('sem token configurado o ingest fica fechado', async () => {
  const e = { ...env(), INGEST_TOKEN: undefined };
  assert.equal((await worker.fetch(post({ systems: [] }), e)).status, 503);
});

test('lote do monitor: só sistemas da lista e só campos conhecidos', async () => {
  const e = env();
  const res = await worker.fetch(post({ systems: [
    { name: 'BELeads', status: 'up', uptime30d: 99.973, latencyMs: [120, 118, 'x', 131], host: '10.0.0.5', version: '1.2.3' },
    { name: 'Intruso', status: 'up' },
    { name: 'BELPonto', status: 'hacked' },
  ] }), e);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, accepted: 1, rejected: 2 });
  const saved = JSON.parse(e.PROFILE.m.get('monitor'));
  assert.deepEqual(saved.systems, [{ name: 'BELeads', status: 'up', uptime30d: 99.97, latencyMs: [120, 118, 131] }]);
});

test('passo de CI grava testes e deploy por sistema', async () => {
  const e = env();
  assert.equal((await worker.fetch(post({ system: 'BELeads', tests: 2147, deployedAt: '2026-10-26T13:05:00-03:00' }), e)).status, 200);
  assert.equal((await worker.fetch(post({ system: 'BELeads', tests: 2150 }), e)).status, 200);
  assert.equal((await worker.fetch(post({ system: 'Fora', tests: 1 }), e)).status, 422);
  assert.deepEqual(JSON.parse(e.PROFILE.m.get('ci')), { BELeads: { tests: 2150, deployedAt: '2026-10-26T16:05:00.000Z' } });
});

test('corpo grande ou JSON inválido é recusado', async () => {
  const e = env();
  assert.equal((await worker.fetch(post('x'.repeat(9000)), e)).status, 413);
  assert.equal((await worker.fetch(post('{nope'), e)).status, 400);
});

test('svg sai com cabeçalhos no-cache e tipo certo', async () => {
  const res = await worker.fetch(get('/telemetry.svg?theme=light'), env());
  assert.equal(res.headers.get('content-type'), 'image/svg+xml; charset=utf-8');
  assert.match(res.headers.get('cache-control'), /no-cache/);
  assert.match(await res.text(), /^<svg/);
});

test('sem dado recente o painel mostra NO SIGNAL', () => {
  const now = Date.now();
  const state = { allow: ['BELeads'], ci: {}, systems: [{ name: 'BELeads', status: 'up', uptime30d: 99.9 }] };
  assert.match(renderTelemetry({ ...state, updatedAt: now - 60e3 }, 'dark', now), /1\/1 SYSTEMS ONLINE/);
  const stale = renderTelemetry({ ...state, updatedAt: now - STALE_MS - 1 }, 'dark', now);
  assert.match(stale, /NO SIGNAL/);
  assert.doesNotMatch(stale, /SYSTEMS ONLINE/);
});

test('texto vai escapado para o SVG (sem injeção)', () => {
  const svg = renderTelemetry({ allow: ['<script>&'], ci: {}, systems: [], updatedAt: null });
  assert.doesNotMatch(svg, /<script>/);
  assert.match(svg, /&lt;script&gt;&amp;/);
});

test('rotas desconhecidas dão 404', async () => {
  assert.equal((await worker.fetch(get('/admin'), env())).status, 404);
  assert.equal((await worker.fetch(get('/ingest'), env())).status, 404);
});
