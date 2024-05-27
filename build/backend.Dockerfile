FROM node:20.13-bookworm-slim AS builder

RUN apt-get update \
# Nos aseguramos que tenemos todos los paquetes debian actualizados, porque
# sinó tendremos reportes de vulnerabilidades pendientes de solucionar
 && apt-get dist-upgrade -y --no-install-recommends \
 && apt-get install -y --no-install-recommends \
    apt-transport-https\
    ca-certificates \
    gnupg\
    curl \
    git \
    rsync \
    python3 \
    sudo \
 && apt-get autoremove --purge -y \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Usamos uid/gid 1001 para el usuario node (que correrá la aplicación)
# porque en los servidores el uid del usuario no privilegiado es ese
# (puesto que hay un primer usuario ubuntu/admin que toma el uid/gid 1000)
# Pero en local para que nos funcione tenemos que dejarlo con el 1000
RUN groupmod -g 1001 node \
  && usermod -u 1001 -g 1001 node \
  && chown --recursive 1001:1001 /home/node \
  && mkdir /home/node/.config \
  && chown --recursive 1001:1001 /home/node/.config \
  && chmod 700 /home/node/.config
USER node



WORKDIR /api

COPY --chown=1001:1001 build/local/backend/migrate.sh entrypoint.sh

COPY --chown=1001:1001 api .
# ENV vars replaced with de .env file
ENV NODE_ENV=dev
ENV DATABASE_URL="mysql://user:password@hostdb:3306/database"

RUN npm install
RUN npm run build