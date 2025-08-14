FROM node:20-alpine

LABEL org.opencontainers.image.title="TickTick Canvas Importer" \
      org.opencontainers.image.description="Loads Canvas data into TickTick as tasks" \
      org.opencontainers.image.authors="@shane on Discord"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

USER node

COPY --chown=node:node . .

RUN npm install
RUN { npm audit fix || true; }

ENTRYPOINT ["node", "index.js"]