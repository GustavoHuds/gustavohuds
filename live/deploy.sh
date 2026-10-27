#!/usr/bin/env bash
# RYŪMON live: instalar, atualizar e diagnosticar no VPS.
# Fonte: monitor-bot (SOURCE=bot, lê o SQLite dele só leitura) ou Uptime Kuma (SOURCE=kuma).
#
#   ./deploy.sh          testa tudo, (re)constrói e sobe o serviço
#   ./deploy.sh check    só testa a leitura da fonte e lista os sistemas
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

env_get() { { grep -E "^$1=" .env || true; } | tail -n1 | cut -d= -f2-; }
net="$(env_get MONITOR_NETWORK)"
[ -n "$net" ] || die "MONITOR_NETWORK vazio no .env"
docker network inspect "$net" >/dev/null 2>&1 || die "a rede Docker \"$net\" não existe. Veja: docker network ls"
source="$(env_get SOURCE)"; source="${source:-kuma}"
case "$source" in
  kuma)
    [ -n "$(env_get KUMA_API_KEY)" ] || die "KUMA_API_KEY vazio no .env"
    export COMPOSE_FILE=compose.yml
    ;;
  bot)
    bot_dir="$(env_get BOT_DATA_DIR)"
    [ -n "$bot_dir" ] || die "BOT_DATA_DIR vazio no .env (pasta do volume de dados do monitor-bot)"
    [ -f "$bot_dir/monitor.db" ] || die "não achei $bot_dir/monitor.db"
    # o container roda como usuário sem privilégio: o banco precisa ser legível por "outros"
    [ "$(( 0$(stat -c %a "$bot_dir/monitor.db") & 4 ))" -ne 0 ] || die "$bot_dir/monitor.db não é legível por outros usuários (precisa de o+r)"
    export COMPOSE_FILE=compose.yml:compose.bot.yml
    ;;
  *) die "SOURCE deve ser bot ou kuma" ;;
esac

check() {
  say "testando a leitura da fonte ($source)…"
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
    ok "ryumon-live no ar e lendo a fonte ($source)"
    echo
    echo "  Próximo passo: publique /telemetry.svg no proxy (Caddyfile.example ou traefik.example.yaml)."
    echo "  Depois teste de fora:  curl -sI https://SEU-DOMINIO/telemetry.svg"
    ;;
  *) die "uso: ./deploy.sh [up|check|status|logs]" ;;
esac
