// Leitura do Uptime Kuma pelo endpoint Prometheus /metrics (rede interna).
// Só os nomes dos monitores, o status e o tempo de resposta são usados;
// URL, hostname, porta e tipo do monitor são descartados aqui mesmo.

// monitor_status: 0 = down, 1 = up, 2 = pending, 3 = maintenance
const LINE = /^(monitor_status|monitor_response_time)\{(.*)\}\s+(\S+)$/;
const LABEL = /(\w+)="((?:[^"\\]|\\.)*)"/g;
const unescape = (s) => s.replace(/\\(["\\n])/g, (_, c) => (c === 'n' ? '\n' : c));

/** Texto do /metrics → Map(nome do monitor → { status, responseMs }). */
export function parseMetrics(text) {
  const out = new Map();
  for (const raw of text.split('\n')) {
    const m = LINE.exec(raw.trim());
    if (!m) continue;
    const [, metric, labels, value] = m;
    let name = null;
    for (const [, k, v] of labels.matchAll(LABEL)) if (k === 'monitor_name') name = unescape(v);
    const n = Number(value);
    if (name == null || !Number.isFinite(n)) continue;
    const entry = out.get(name) ?? {};
    if (metric === 'monitor_status') entry.status = n;
    else entry.responseMs = n;
    out.set(name, entry);
  }
  return out;
}

export async function fetchMetrics({ kumaUrl, kumaApiKey }, { timeoutMs = 10_000, fetchImpl = fetch } = {}) {
  let res;
  try {
    res = await fetchImpl(`${kumaUrl}/metrics`, {
      headers: { authorization: `Basic ${Buffer.from(`:${kumaApiKey}`).toString('base64')}` },
      signal: AbortSignal.timeout(timeoutMs),
      redirect: 'error',
    });
  } catch (err) {
    // "fetch failed" sozinho não ajuda: mostra a causa (DNS, conexão recusada, timeout)
    const cause = err?.cause?.code ?? err?.cause?.message ?? err?.name;
    throw new Error(`Kuma inacessível em ${kumaUrl} (${cause ?? err.message})`);
  }
  if (res.status === 401 || res.status === 403) throw new Error(`Kuma recusou a chave de API (HTTP ${res.status})`);
  if (!res.ok) throw new Error(`Kuma respondeu HTTP ${res.status}`);
  return parseMetrics(await res.text());
}
