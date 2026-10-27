// RYŪMON live — Cloudflare Worker (docs/ESCOPO-RYUMON.md §11).
//
//   GET  /telemetry.svg?theme=dark|light   painel (só lê o KV; nunca chama rede)
//   POST /ingest                           métricas higienizadas (monitor ou CI)
//   GET  /health                           diagnóstico sem dados sensíveis
//
// KV (binding PROFILE):
//   "monitor" → { updatedAt, systems: [{ name, status, uptime30d, latencyMs }] }
//   "ci"      → { [system]: { tests, deployedAt } }
import { renderTelemetry, STALE_MS } from './telemetry.js';

const MAX_BODY = 8 * 1024;
const STATUSES = new Set(['up', 'degraded', 'down']);

const SVG_HEADERS = {
  'content-type': 'image/svg+xml; charset=utf-8',
  'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
  'x-content-type-options': 'nosniff',
  'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'",
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
});

const allowList = (env) => (env.SYSTEMS ?? '').split(',').map((s) => s.trim()).filter(Boolean);

/** Comparação em tempo constante (o token nunca vaza por timing). */
function sameToken(a, b) {
  const x = new TextEncoder().encode(a), y = new TextEncoder().encode(b);
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

// ── Validação: só passam campos conhecidos, com tipos e limites ────────────
const num = (v, min, max) => (typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max ? v : undefined);

function cleanSystem(raw, allow) {
  if (!raw || typeof raw !== 'object' || !allow.includes(raw.name)) return null;
  if (!STATUSES.has(raw.status)) return null;
  const out = { name: raw.name, status: raw.status };
  const up = num(raw.uptime30d, 0, 100);
  if (up !== undefined) out.uptime30d = Math.round(up * 100) / 100;
  if (Array.isArray(raw.latencyMs)) {
    out.latencyMs = raw.latencyMs.slice(-20).map((v) => num(v, 0, 60000)).filter((v) => v !== undefined).map(Math.round);
  }
  return out;
}

function cleanCi(raw, allow) {
  if (!raw || typeof raw !== 'object' || !allow.includes(raw.system)) return null;
  const out = {};
  const tests = num(raw.tests, 0, 1e7);
  if (tests !== undefined) out.tests = Math.round(tests);
  if (typeof raw.deployedAt === 'string' && raw.deployedAt.length <= 40) {
    const t = Date.parse(raw.deployedAt);
    if (Number.isFinite(t) && t <= Date.now() + 5 * 60e3) out.deployedAt = new Date(t).toISOString();
  }
  return Object.keys(out).length ? out : null;
}

async function ingest(request, env) {
  if (!env.INGEST_TOKEN) return json({ error: 'not configured' }, 503);
  const auth = request.headers.get('authorization') ?? '';
  if (!sameToken(auth, `Bearer ${env.INGEST_TOKEN}`)) return json({ error: 'unauthorized' }, 401);
  if (env.LIMITER) {
    const { success } = await env.LIMITER.limit({ key: request.headers.get('cf-connecting-ip') ?? 'x' });
    if (!success) return json({ error: 'rate limited' }, 429);
  }
  const len = Number(request.headers.get('content-length') ?? 0);
  if (len > MAX_BODY) return json({ error: 'too large' }, 413);
  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: 'too large' }, 413);
  let body;
  try { body = JSON.parse(text); } catch { return json({ error: 'invalid json' }, 400); }

  const allow = allowList(env);

  // Lote do monitor (VPS): substitui o retrato inteiro de uma vez
  if (Array.isArray(body.systems)) {
    const systems = body.systems.slice(0, 50).map((s) => cleanSystem(s, allow)).filter(Boolean);
    if (!systems.length) return json({ error: 'no valid systems' }, 422);
    await env.PROFILE.put('monitor', JSON.stringify({ updatedAt: Date.now(), systems }));
    return json({ ok: true, accepted: systems.length, rejected: body.systems.length - systems.length });
  }

  // Passo de CI: testes e horário do deploy de um sistema
  const ci = cleanCi(body, allow);
  if (!ci) return json({ error: 'invalid payload' }, 422);
  const all = (await env.PROFILE.get('ci', 'json')) ?? {};
  all[body.system] = { ...all[body.system], ...ci };
  await env.PROFILE.put('ci', JSON.stringify(all));
  return json({ ok: true });
}

async function readState(env) {
  const [monitor, ci] = await Promise.all([env.PROFILE.get('monitor', 'json'), env.PROFILE.get('ci', 'json')]);
  return { systems: monitor?.systems ?? [], updatedAt: monitor?.updatedAt ?? null, ci: ci ?? {}, allow: allowList(env) };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const theme = url.searchParams.get('theme') === 'light' ? 'light' : 'dark';

    if (url.pathname === '/telemetry.svg' && (request.method === 'GET' || request.method === 'HEAD')) {
      const svg = renderTelemetry(await readState(env), theme);
      return new Response(request.method === 'HEAD' ? null : svg, { headers: SVG_HEADERS });
    }
    if (url.pathname === '/ingest' && request.method === 'POST') return ingest(request, env);
    if (url.pathname === '/health') {
      const { updatedAt } = await readState(env);
      return json({ ok: true, signal: updatedAt != null && Date.now() - updatedAt <= STALE_MS });
    }
    return new Response('Not found', { status: 404 });
  },
};
