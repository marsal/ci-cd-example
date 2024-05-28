#!/bin/bash

# Cambiar al directorio ci-cd-example
cd /root/ci-cd-example

# Detener los servicios con docker-compose
docker-compose -f docker-compose-deploy.yml down

# Actualizar el repositorio git
git pull

# Iniciar los servicios con docker-compose
docker-compose -f docker-compose-deploy.yml up -d --force-recreate
