// Diagnóstico de instalação: testa a leitura da fonte (monitor-bot ou Kuma) e
// lista o que ela expõe, marcando o que já está mapeado em MONITORS.
//
//   docker compose run --rm ryumon-live node src/check.js
import { fetchMetrics } from './kuma.js';
import { listBotApps, readBot, FRESH_MS } from './bot.js';
import { loadConfig, parseMonitors, ConfigError } from './config.js';

let mapped = [];
try { mapped = parseMonitors(process.env.MONITORS); } catch (e) { if (!(e instanceof ConfigError)) throw e; console.warn(`aviso: ${e.message}`); }

let config;
try {
  config = loadConfig({ ...process.env, MONITORS: process.env.MONITORS || 'x=x' });
} catch (err) {
  if (!(err instanceof ConfigError)) throw err;
  console.error(`✗ configuração inválida: ${err.message}`);
  process.exit(2);
}

function report(found, label, where) {
  console.log(`✓ ${where} respondeu com ${found.size} sistemas:\n`);
  for (const [name, m] of [...found].sort(([a], [b]) => a.localeCompare(b))) {
    const map = mapped.find((x) => x.key === name);
    console.log(`  ${map ? '●' : '○'} ${name.padEnd(36)} ${String(label(m)).padEnd(12)} ${map ? `→ ${map.name}` : ''}`);
  }
  const missing = mapped.filter((m) => !found.has(m.key));
  if (missing.length) {
    console.log(`\n✗ em MONITORS mas não existem na fonte: ${missing.map((m) => `"${m.key}"`).join(', ')}`);
    process.exit(1);
  }
  console.log(`\n● = mapeado em MONITORS (${mapped.length}).  Formato: MONITORS="nome na fonte=Nome público;..."`);
}

if (config.source === 'bot') {
  try {
    const apps = listBotApps(config.botDb);
    const { lastCheck } = readBot(config.botDb, []);
    report(apps, (m) => (m.down ? 'down' : 'up'), `monitor-bot (${config.botDb})`);
    const age = lastCheck == null ? null : Date.now() - lastCheck;
    if (age == null || age > FRESH_MS) {
      console.error(`\n✗ o bot não checa nada há ${age == null ? 'sempre' : `${Math.round(age / 60e3)} min`}: ele está rodando?`);
      process.exit(1);
    }
    console.log(`  última checagem do bot: há ${Math.round(age / 1000)} s`);
  } catch (err) {
    console.error(`✗ não consegui ler ${config.botDb}: ${err.message}`);
    console.error('  confira BOT_DATA_DIR no .env (a pasta do volume de dados do monitor-bot, montada só leitura).');
    process.exit(1);
  }
} else {
  try {
    const metrics = await fetchMetrics(config);
    const label = { 0: 'down', 1: 'up', 2: 'pending', 3: 'maintenance' };
    report(metrics, (m) => label[m.status] ?? '?', `Kuma em ${config.kumaUrl}`);
  } catch (err) {
    console.error(`✗ não consegui ler ${config.kumaUrl}/metrics: ${err.message}`);
    console.error('  confira se o serviço está na mesma rede Docker do Kuma (MONITOR_NETWORK) e a chave de API.');
    process.exit(1);
  }
}
