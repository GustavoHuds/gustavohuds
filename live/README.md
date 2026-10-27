# RYŪMON live: painel de telemetria

O serviço lê o status dos sistemas e desenha o painel `/telemetry.svg` que aparece no perfil do GitHub. A fonte é uma de duas:

- **`SOURCE=bot`**: o **monitor-bot**, o bot de Telegram que checa as aplicações a cada 60 s. O serviço lê o SQLite dele (`monitor.db`) por um volume montado só leitura. O status é o mesmo que chega no Telegram (queda confirmada após 2 falhas seguidas), e o uptime de 30 dias sai do histórico do próprio bot, já certo no primeiro minuto.
- **`SOURCE=kuma`**: o **Uptime Kuma**, pelo `/metrics`, na rede Docker interna.

```
GitHub (camo) ──HTTPS──▶ Traefik/Caddy ──▶ ryumon-live ──▶ monitor.db do bot (:ro)  ou  Kuma /metrics
                         só /telemetry.svg é público       nada da fonte é exposto
```

- **Sem dependências:** só Node 22 (`node:sqlite` para o bot). A imagem roda como usuário sem privilégio, com sistema de arquivos só leitura, sem capacidades e com memória limitada.
- **Lista permitida:** só os sistemas listados em `MONITORS` saem do servidor, com o nome público que você escolher. URL, hostname, porta e texto de erro são descartados na leitura.
- **Não escreve na fonte:** o banco do bot é aberto só leitura, num volume `:ro`.
- **Histórico em volume:** o serviço guarda o uptime dos últimos 30 dias e as últimas 20 latências. Com menos de 30 dias de dados, o painel mostra quantos dias tem de fato (`3d UPTIME`).
- **Nunca mente:** se a fonte não responde (ou o bot não checa nada há 5 min) por 15 min, o painel mostra `NO SIGNAL`.

## Instalar no VPS

```bash
git clone https://github.com/GustavoHuds/gustavohuds.git /opt/gustavohuds
cd /opt/gustavohuds/live
cp .env.example .env && nano .env      # SOURCE, MONITOR_NETWORK, BOT_DATA_DIR (ou KUMA_*)
./deploy.sh check                      # lista os sistemas que a fonte conhece
nano .env                              # preencha MONITORS com os nomes listados
./deploy.sh                            # constrói, sobe e confere o /health
```

Depois:

1. **Proxy:** publique só o `/telemetry.svg`. Traefik (Coolify): copie o `traefik.example.yaml` para a pasta de configuração dinâmica e troque o domínio. Caddy: copie o bloco do `Caddyfile.example` e recarregue. O site **não** pode ficar atrás do Authelia.
2. **DNS:** crie o registro A/AAAA do subdomínio apontando para o VPS.
3. **README do perfil:** na sua máquina, rode `npm run telemetry -- https://telemetry.seudominio.com.br`. O script confere se o painel responde e só então insere a imagem no README.

**Atualizar:** `cd /opt/gustavohuds && git pull && live/deploy.sh`

**Diagnóstico:** `./deploy.sh status`, `./deploy.sh logs` e `./deploy.sh check`.

## Opcional: testes e deploy vindos do CI

1. Defina `INGEST_TOKEN` no `.env` (`openssl rand -hex 32`), libere o `handle /ingest` no Caddy e rode `./deploy.sh`.
2. Adicione um passo no workflow de cada sistema:

```yaml
- name: Publish profile telemetry
  if: success() && github.ref == 'refs/heads/main'
  run: |
    curl -fsS -X POST "$INGEST_URL" \
      -H "Authorization: Bearer $INGEST_TOKEN" -H "content-type: application/json" \
      -d "{\"system\":\"BELeads\",\"tests\":$(jq '.numPassedTests' test-results.json),\"deployedAt\":\"$(date -Iseconds)\"}"
  env:
    INGEST_URL: ${{ secrets.PROFILE_INGEST_URL }}      # https://telemetry.seudominio.com.br/ingest
    INGEST_TOKEN: ${{ secrets.PROFILE_INGEST_TOKEN }}
```

O `system` precisa ser um dos nomes públicos em `MONITORS`.

## Desenvolvimento

```bash
npm test                                   # node:test, sem dependências
SOURCE=bot BOT_DB=/caminho/monitor.db MONITORS="BELPonto=BELPonto" DATA_DIR=./.data npm start
```

As nuvens do painel (`src/art.js`) são geradas pela raiz do repositório (`npm run build`), a partir de `assets/src/ai/D-clouds-set.png`.
