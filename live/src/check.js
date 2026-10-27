// Diagnóstico de instalação: testa a conexão com o Kuma e lista os monitores
// que ele expõe, marcando quais já estão mapeados em MONITORS.
//
//   docker compose run --rm ryumon-live node src/check.js
import { fetchMetrics } from './kuma.js';
import { parseMonitors, ConfigError } from './config.js';

const url = String(process.env.KUMA_URL ?? '').replace(/\/+$/, '');
if (!url || !process.env.KUMA_API_KEY) {
  console.error('defina KUMA_URL e KUMA_API_KEY no .env');
  process.exit(2);
}

let mapped = [];
try { mapped = parseMonitors(process.env.MONITORS); } catch (e) { if (!(e instanceof ConfigError)) throw e; console.warn(`aviso: ${e.message}`); }

try {
  const metrics = await fetchMetrics({ kumaUrl: url, kumaApiKey: process.env.KUMA_API_KEY });
  const label = { 0: 'down', 1: 'up', 2: 'pending', 3: 'maintenance' };
  console.log(`✓ Kuma respondeu em ${url} com ${metrics.size} monitores:\n`);
  for (const [name, m] of [...metrics].sort(([a], [b]) => a.localeCompare(b))) {
    const map = mapped.find((x) => x.kuma === name);
    console.log(`  ${map ? '●' : '○'} ${name.padEnd(36)} ${String(label[m.status] ?? '?').padEnd(12)} ${map ? `→ ${map.name}` : ''}`);
  }
  const missing = mapped.filter((m) => !metrics.has(m.kuma));
  if (missing.length) {
    console.log(`\n✗ em MONITORS mas não existem no Kuma: ${missing.map((m) => `"${m.kuma}"`).join(', ')}`);
    process.exit(1);
  }
  console.log(`\n● = mapeado em MONITORS (${mapped.length}).  Formato: MONITORS="nome no Kuma=Nome público;..."`);
} catch (err) {
  console.error(`✗ não consegui ler ${url}/metrics: ${err.message}`);
  console.error('  confira se o serviço está na mesma rede Docker do Kuma (MONITOR_NETWORK) e a chave de API.');
  process.exit(1);
}
