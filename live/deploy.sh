#!/usr/bin/env bash
# RYŪMON live: instalar, atualizar e diagnosticar no VPS.
#
#   ./deploy.sh          testa tudo, (re)constrói e sobe o serviço
#   ./deploy.sh check    só testa a conexão com o Kuma e lista os monitores
#   ./deploy.sh status   estado do container + /health
#   ./deploy.sh logs     últimas linhas de log
set -euo pipefail
cd "$(dirname "$0")"

say()  { printf '\033[1;34m▸\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

command -v docker >/dev/null || die "docker não encontrado"
docker compose version >/dev/null 2>&1 || die "docker compose (v2) não encontrado"
[ -f .env ] || die "falta o .env:  cp .env.example .env  e preencha"
chmod 600 .env

env_get() { grep -E "^$1=" .env | tail -n1 | cut -d= -f2-; }
net="$(env_get MONITOR_NETWORK)"
[ -n "$net" ] || die "MONITOR_NETWORK vazio no .env"
docker network inspect "$net" >/dev/null 2>&1 || die "a rede Docker \"$net\" não existe. Veja: docker network ls"
[ -n "$(env_get KUMA_API_KEY)" ] || die "KUMA_API_KEY vazio no .env"

check() {
  say "testando o Kuma de dentro da rede \"$net\"…"
  docker compose build -q
  docker compose run --rm --no-deps ryumon-live node src/check.js
}

case "${1:-up}" in
  check)  check ;;
  logs)   docker compose logs --tail=100 ryumon-live ;;
  status)
    docker compose ps ryumon-live
    docker compose exec -T ryumon-live node -e \
      "fetch('http://127.0.0.1:8080/health').then(async r=>console.log(r.status, await r.text()))"
    ;;
  up)
    check
    say "subindo o serviço…"
    docker compose up -d --build --remove-orphans
    for _ in $(seq 1 30); do
      code="$(docker compose exec -T ryumon-live node -e \
        "fetch('http://127.0.0.1:8080/health').then(r=>console.log(r.status),()=>console.log(0))" 2>/dev/null || echo 0)"
      [ "$code" = "200" ] && break
      sleep 2
    done
    [ "${code:-0}" = "200" ] || { docker compose logs --tail=30 ryumon-live; die "o serviço subiu mas o /health não ficou OK"; }
    ok "ryumon-live no ar e lendo o Kuma"
    echo
    echo "  Próximo passo: adicione o bloco do Caddyfile.example ao seu Caddyfile e recarregue o Caddy."
    echo "  Depois teste de fora:  curl -sI https://SEU-DOMINIO/telemetry.svg"
    ;;
  *) die "uso: ./deploy.sh [up|check|status|logs]" ;;
esac
