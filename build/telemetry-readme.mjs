// Liga (ou desliga) o painel de telemetria no README, entre os marcadores
// <!-- telemetry:start --> e <!-- telemetry:end -->. Antes de ligar, confere que o
// endereço responde de verdade: o README nunca aponta para uma imagem quebrada.
//
//   npm run telemetry -- https://telemetry.seudominio.com.br
//   npm run telemetry -- --off
import { readFileSync, writeFileSync } from 'node:fs';

const README = new URL('../README.md', import.meta.url);
const START = '<!-- telemetry:start -->', END = '<!-- telemetry:end -->';
const arg = process.argv[2];

const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };
if (!arg) fail('uso: npm run telemetry -- https://SEU-DOMINIO   (ou --off)');

const src = readFileSync(README, 'utf8');
const a = src.indexOf(START), b = src.indexOf(END);
if (a < 0 || b < a) fail('marcadores telemetry:start/end não encontrados no README');

let block = '';
if (arg !== '--off') {
  const base = arg.replace(/\/+$/, '');
  if (!/^https:\/\/[^/\s]+$/.test(base)) fail('use só a origem HTTPS, ex.: https://telemetry.seudominio.com.br');
  for (const theme of ['dark', 'light']) {
    const url = `${base}/telemetry.svg?theme=${theme}`;
    let res;
    try { res = await fetch(url, { signal: AbortSignal.timeout(15_000) }); } catch (e) { fail(`${url}: ${e.message}`); }
    const type = res.headers.get('content-type') ?? '';
    if (res.status !== 200 || !type.startsWith('image/svg+xml')) fail(`${url}: HTTP ${res.status} ${type}`);
    if (!/no-cache/.test(res.headers.get('cache-control') ?? '')) fail(`${url}: sem cache-control no-cache (o Caddy está reescrevendo?)`);
    const body = await res.text();
    if (/NO SIGNAL|waiting for the first signal/.test(body)) console.warn(`! ${theme}: o painel responde, mas ainda sem dados do Kuma`);
    console.log(`✓ ${url}`);
  }
  block = `
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${base}/telemetry.svg?theme=dark">
  <source media="(prefers-color-scheme: light)" srcset="${base}/telemetry.svg?theme=light">
  <img width="100%" src="${base}/telemetry.svg?theme=dark" alt="Live production telemetry: status, 30-day uptime and latency of the systems I run, read from production monitoring.">
</picture>
`;
}

writeFileSync(README, src.slice(0, a + START.length) + block + src.slice(b));
console.log(block ? '✓ painel ligado no README' : '✓ painel removido do README');
