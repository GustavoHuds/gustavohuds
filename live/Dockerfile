# RYŪMON live: imagem mínima, sem dependências de npm, rodando como usuário sem privilégio.
FROM node:22-alpine

ENV NODE_ENV=production PORT=8080 DATA_DIR=/data
WORKDIR /app

# /data pertence ao usuário "node": o volume nomeado herda essa permissão na criação
RUN mkdir -p /data && chown node:node /data
COPY --chown=root:root package.json ./
COPY --chown=root:root src ./src

USER node
EXPOSE 8080
VOLUME ["/data"]

# saudável = o Kuma respondeu nos últimos 15 min
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"

CMD ["node", "src/server.js"]
