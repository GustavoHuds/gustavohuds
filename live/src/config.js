// Configuração por variáveis de ambiente, validada na partida.
// Erro de configuração derruba o processo com uma mensagem clara (fail fast).

const MAX_SYSTEMS = 24;
const NAME_RE = /^[\p{L}\p{N} ._-]{1,32}$/u;

export class ConfigError extends Error {}

/** "nome no Kuma=Nome público;outro=Outro" → [{ kuma, name }] na ordem dada. */
export function parseMonitors(raw) {
  const out = [];
  for (const part of String(raw ?? '').split(';')) {
    if (!part.trim()) continue;
    const i = part.indexOf('=');
    if (i < 1) throw new ConfigError(`MONITORS: item sem "=": "${part.trim()}"`);
    const kuma = part.slice(0, i).trim(), name = part.slice(i + 1).trim();
    if (!kuma) throw new ConfigError(`MONITORS: nome do Kuma vazio em "${part.trim()}"`);
    if (!NAME_RE.test(name)) throw new ConfigError(`MONITORS: nome público inválido "${name}" (até 32 letras, números, espaço . _ -)`);
    if (out.some((m) => m.name === name)) throw new ConfigError(`MONITORS: nome público repetido "${name}"`);
    out.push({ kuma, name });
  }
  if (!out.length) throw new ConfigError('MONITORS está vazio: liste ao menos um "monitor do Kuma=Nome público"');
  if (out.length > MAX_SYSTEMS) throw new ConfigError(`MONITORS: no máximo ${MAX_SYSTEMS} sistemas`);
  return out;
}

const int = (v, def, min, max, key) => {
  if (v == null || v === '') return def;
  const n = Number(v);
  if (!Number.isInteger(n) || n < min || n > max) throw new ConfigError(`${key} deve ser inteiro entre ${min} e ${max}`);
  return n;
};

export function loadConfig(env = process.env) {
  const kumaUrl = String(env.KUMA_URL ?? '').replace(/\/+$/, '');
  if (!/^https?:\/\/[^/\s]+$/.test(kumaUrl)) throw new ConfigError('KUMA_URL deve ser só a origem, ex.: http://uptime-kuma:3001');
  if (!env.KUMA_API_KEY) throw new ConfigError('KUMA_API_KEY ausente (Uptime Kuma → Settings → API Keys)');

  const ingestToken = env.INGEST_TOKEN || null;
  if (ingestToken && ingestToken.length < 32) throw new ConfigError('INGEST_TOKEN precisa de 32+ caracteres (gere com: openssl rand -hex 32)');

  return {
    kumaUrl,
    kumaApiKey: env.KUMA_API_KEY,
    monitors: parseMonitors(env.MONITORS),
    ingestToken,
    port: int(env.PORT, 8080, 1, 65535, 'PORT'),
    pollSeconds: int(env.POLL_SECONDS, 60, 15, 600, 'POLL_SECONDS'),
    slowMs: int(env.SLOW_MS, 1500, 100, 60000, 'SLOW_MS'),
    dataDir: env.DATA_DIR || '/data',
    trustProxy: env.TRUST_PROXY === '1',
  };
}
