#!/usr/bin/env python3
"""Envia a telemetria higienizada do Uptime Kuma para o painel do perfil.

Roda no VPS (cron a cada 5 min). Lê o /metrics LOCAL do Kuma, guarda um
histórico curto em disco para calcular uptime de 30 dias e latência recente,
e faz UM POST em lote para o Worker. Nada do Kuma fica exposto na internet.

Só sai do servidor: nome público do sistema, status, uptime % e latências (ms).
Nunca: hostname, IP, URL, rota, mensagem de erro, versão.

Configuração por variáveis de ambiente:
  KUMA_URL        ex.: http://127.0.0.1:3001         (só endereço local)
  KUMA_API_KEY    chave de API do Kuma (Settings → API Keys)
  INGEST_URL      ex.: https://ryumon.<conta>.workers.dev/ingest
  INGEST_TOKEN    o mesmo segredo do Worker (wrangler secret put INGEST_TOKEN)
  MONITORS        mapa "nome no Kuma=nome público", separado por ';'
                  ex.: "beleads-api=BELeads;ponto-web=BELPonto"
  STATE_FILE      opcional, padrão /var/lib/ryumon/state.json

cron:  */5 * * * *  /usr/bin/env $(cat /etc/ryumon.env | xargs) python3 /opt/ryumon/push_telemetry.py
"""
import base64, json, os, re, sys, time, urllib.request

WINDOW = 30 * 86400          # uptime de 30 dias
KEEP_LATENCY = 20            # últimas medições para a sparkline
SLOW_MS = 1500               # acima disso o sistema aparece como "degraded"

# monitor_status: 0 = down, 1 = up, 2 = pending, 3 = maintenance
LINE = re.compile(r'^(monitor_status|monitor_response_time)\{([^}]*)\}\s+([-\d.eE+]+)$')
LABEL = re.compile(r'(\w+)="((?:[^"\\]|\\.)*)"')


def env(name, default=None):
    v = os.environ.get(name, default)
    if v is None:
        sys.exit(f"falta a variável {name}")
    return v


def read_metrics(base, key):
    req = urllib.request.Request(f"{base.rstrip('/')}/metrics")
    req.add_header("Authorization", "Basic " + base64.b64encode(f":{key}".encode()).decode())
    with urllib.request.urlopen(req, timeout=10) as r:
        text = r.read().decode()
    out = {}
    for line in text.splitlines():
        m = LINE.match(line.strip())
        if not m:
            continue
        metric, labels, value = m.groups()
        name = dict(LABEL.findall(labels)).get("monitor_name")
        if name:
            out.setdefault(name, {})[metric] = float(value)
    return out


def main():
    mapping = dict(p.split("=", 1) for p in env("MONITORS").split(";") if "=" in p)
    state_file = env("STATE_FILE", "/var/lib/ryumon/state.json")
    try:
        with open(state_file) as f:
            state = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        state = {}

    metrics = read_metrics(env("KUMA_URL"), env("KUMA_API_KEY"))
    now = int(time.time())
    systems = []
    for kuma_name, public in mapping.items():
        m = metrics.get(kuma_name)
        if m is None or "monitor_status" not in m:
            continue
        code = int(m["monitor_status"])
        if code == 2:                      # pending: ainda não sabemos, não conta
            continue
        latency = m.get("monitor_response_time")
        up = code in (1, 3)                # manutenção planejada não derruba o uptime
        h = state.setdefault(public, {"samples": [], "latency": []})
        h["samples"] = [s for s in h["samples"] if s[0] > now - WINDOW] + [[now, 1 if up else 0]]
        if latency is not None and latency >= 0:
            h["latency"] = (h["latency"] + [round(latency)])[-KEEP_LATENCY:]
        status = "down" if not up else "degraded" if (latency or 0) > SLOW_MS else "up"
        ups = sum(s[1] for s in h["samples"])
        systems.append({
            "name": public,
            "status": status,
            "uptime30d": round(100 * ups / len(h["samples"]), 2),
            "latencyMs": h["latency"],
        })

    os.makedirs(os.path.dirname(state_file), exist_ok=True)
    tmp = state_file + ".tmp"
    with open(tmp, "w") as f:
        json.dump(state, f)
    os.replace(tmp, state_file)

    if not systems:
        sys.exit("nenhum monitor mapeado encontrado no Kuma")
    body = json.dumps({"systems": systems}).encode()
    req = urllib.request.Request(env("INGEST_URL"), data=body, method="POST", headers={
        "Authorization": f"Bearer {env('INGEST_TOKEN')}", "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=10) as r:
        print(r.status, r.read().decode())


if __name__ == "__main__":
    main()
