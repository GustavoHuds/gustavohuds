# RYŪMON live: painel de telemetria

O serviço lê o **Uptime Kuma** pela rede Docker interna e desenha o painel `/telemetry.svg` que aparece no perfil do GitHub.

```
GitHub (camo) ──HTTPS──▶ Caddy ──▶ ryumon-live ──rede interna──▶ Uptime Kuma /metrics
                         só /telemetry.svg é público           nada do Kuma é exposto
```

- **Sem dependências:** só Node 22. A imagem roda como usuário sem privilégio, com sistema de arquivos só leitura, sem capacidades e com memória limitada.
- **Lista permitida:** só os monitores listados em `MONITORS` saem do servidor, com o nome público que você escolher. A URL, o hostname, a porta e o tipo do monitor são descartados na leitura.
- **Histórico em volume:** o serviço guarda o uptime dos últimos 30 dias e as últimas 20 latências. Com menos de 30 dias de dados, o painel mostra quantos dias tem de fato (`3d UPTIME`).
- **Nunca mente:** se o Kuma não responde há 15 min, o painel mostra `NO SIGNAL`.

## Instalar no VPS

```bash
git clone https://github.com/GustavoHuds/gustavohuds.git /opt/gustavohuds
cd /opt/gustavohuds/live
cp .env.example .env && nano .env      # MONITOR_NETWORK, KUMA_URL, KUMA_API_KEY
./deploy.sh check                      # lista os monitores do Kuma
nano .env                              # preencha MONITORS com os nomes listados
./deploy.sh                            # constrói, sobe e confere o /health
```

Depois:

1. **Caddy:** copie o bloco do `Caddyfile.example` para o seu Caddyfile, troque o domínio e recarregue (`docker exec caddy caddy reload --config /etc/caddy/Caddyfile`). Esse site **não** pode ficar atrás do Authelia.
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
KUMA_URL=http://localhost:3001 KUMA_API_KEY=... MONITORS="api=API" DATA_DIR=./.data npm start
```

As nuvens do painel (`src/art.js`) são geradas pela raiz do repositório (`npm run build`), a partir de `assets/src/ai/D-clouds-set.png`.
