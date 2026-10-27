// Rotas HTTP. Sem framework: o serviço é pequeno e não precisa de dependências.
//
//   GET  /telemetry.svg?theme=dark|light   painel (público, via Caddy)
//   GET  /health                           200 se o Kuma respondeu há pouco, senão 503
//   POST /ingest                           opcional: testes e deploy vindos do CI
import { timingSafeEqual, createHash } from 'node:crypto';
import { renderTelemetry, STALE_MS } from './telemetry.js';

const MAX_BODY = 4 * 1024;

const SVG_HEADERS = {
  'content-type': 'image/svg+xml; charset=utf-8',
  'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
  'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'",
  'x-content-type-options': 'nosniff',
  'cross-origin-resource-policy': 'cross-origin',
};

const sha = (s) => createHash('sha256').update(s).digest();
const sameSecret = (a, b) => timingSafeEqual(sha(a), sha(b));

/** Limite simples por IP (janela fixa), suficiente para o /ingest. */
export function rateLimiter({ limit = 30, windowMs = 60_000 } = {}) {
  const hits = new Map();
  return (key, now = Date.now()) => {
    const h = hits.get(key);
    if (!h || now - h.start > windowMs) {
      if (hits.size > 10_000) hits.clear();
      hits.set(key, { start: now, n: 1 });
      return true;
    }
    return ++h.n <= limit;
  };
}

function cleanCi(body, names) {
  if (!body || typeof body !== 'object' || !names.includes(body.system)) return null;
  const out = {};
  if (Number.isInteger(body.tests) && body.tests >= 0 && body.tests <= 1e7) out.tests = body.tests;
  if (typeof body.deployedAt === 'string' && body.deployedAt.length <= 40) {
    const t = Date.parse(body.deployedAt);
    if (Number.isFinite(t) && t <= Date.now() + 5 * 60e3) out.deployedAt = new Date(t).toISOString();
  }
  return Object.keys(out).length ? out : null;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    let tooLarge = false;
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) tooLarge = true; // continua drenando, sem guardar
      else chunks.push(c);
    });
    req.on('end', () => (tooLarge
      ? reject(Object.assign(new Error('too large'), { status: 413 }))
      : resolve(Buffer.concat(chunks).toString('utf8'))));
    req.on('error', reject);
  });
}

export function createApp({ config, history, now = () => Date.now() }) {
  const names = config.monitors.map((m) => m.name);
  const allow = rateLimiter();
  const cache = new Map(); // tema → { at, svg }: re-renderiza no máximo a cada 15 s

  const send = (res, status, body, headers) => {
    res.writeHead(status, headers);
    res.end(body);
  };
  const json = (res, status, obj) => send(res, status, JSON.stringify(obj), {
    'content-type': 'application/json', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff',
  });

  const svg = (theme) => {
    const t = now();
    const hit = cache.get(theme);
    if (hit && t - hit.at < 15_000 && hit.poll === history.state.lastPoll) return hit.svg;
    const out = renderTelemetry(history.snapshot(names), theme, t);
    cache.set(theme, { at: t, poll: history.state.lastPoll, svg: out });
    return out;
  };

  return async function handle(req, res) {
    try {
      const url = new URL(req.url, 'http://local');
      if (url.pathname === '/telemetry.svg') {
        if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, '', { allow: 'GET, HEAD' });
        const body = svg(url.searchParams.get('theme') === 'light' ? 'light' : 'dark');
        return send(res, 200, req.method === 'HEAD' ? '' : body, SVG_HEADERS);
      }
      if (url.pathname === '/health') {
        const last = history.state.lastPoll;
        const ok = last != null && now() - last <= STALE_MS;
        return json(res, ok ? 200 : 503, { ok });
      }
      if (url.pathname === '/ingest' && config.ingestToken) {
        if (req.method !== 'POST') return send(res, 405, '', { allow: 'POST' });
        const ip = (config.trustProxy && String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()) || req.socket.remoteAddress || '?';
        if (!allow(ip)) return json(res, 429, { error: 'rate limited' });
        if (!sameSecret(String(req.headers.authorization ?? ''), `Bearer ${config.ingestToken}`)) return json(res, 401, { error: 'unauthorized' });
        if (Number(req.headers['content-length'] ?? 0) > MAX_BODY) {
          res.setHeader('connection', 'close');
          return json(res, 413, { error: 'too large' });
        }
        let body;
        try { body = JSON.parse(await readBody(req)); } catch (e) { return json(res, e.status ?? 400, { error: e.status ? 'too large' : 'invalid json' }); }
        const ci = cleanCi(body, names);
        if (!ci) return json(res, 422, { error: 'invalid payload' });
        history.setCi(body.system, ci);
        history.save();
        cache.clear();
        return json(res, 200, { ok: true });
      }
      return send(res, 404, 'Not found', { 'content-type': 'text/plain' });
    } catch (err) {
      console.error(JSON.stringify({ level: 'error', msg: 'request failed', err: String(err?.message ?? err) }));
      if (!res.headersSent) send(res, 500, 'Internal error', { 'content-type': 'text/plain' });
    }
  };
}
