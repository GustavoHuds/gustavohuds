// Ponto de entrada do serviço: valida a configuração, abre o histórico,
// começa a ler o Kuma e serve o painel. Encerra limpo com SIGTERM (docker stop).
import { createServer } from 'node:http';
import { loadConfig, ConfigError } from './config.js';
import { History } from './history.js';
import { createApp } from './app.js';
import { startPoller } from './poller.js';

let config;
try {
  config = loadConfig();
} catch (err) {
  if (err instanceof ConfigError) { console.error(`configuração inválida: ${err.message}`); process.exit(2); }
  throw err;
}

const history = new History(config.dataDir);
const server = createServer(createApp({ config, history }));
server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;
server.maxRequestsPerSocket = 100;

const stopPoller = startPoller({ config, history });
server.listen(config.port, () => {
  console.log(JSON.stringify({
    level: 'info', msg: 'ryumon-live up', port: config.port, systems: config.monitors.length,
    ingest: Boolean(config.ingestToken), pollSeconds: config.pollSeconds,
  }));
});

const shutdown = (sig) => {
  console.log(JSON.stringify({ level: 'info', msg: 'shutting down', sig }));
  stopPoller();
  try { history.save(); } catch { /* volume indisponível: nada a fazer */ }
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 5000).unref();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
