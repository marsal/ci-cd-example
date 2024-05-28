#!/bin/bash

# Archivo de registro para la salida estándar (stdout)
LOG_FILE="/tmp/deploy.log"

# Archivo de registro para la salida de error (stderr)
ERROR_LOG_FILE="/tmp/deploy_error.log"

# Redirigir la salida estándar y de error al archivo de registro
exec > >(tee -a "$LOG_FILE") 2> >(tee -a "$ERROR_LOG_FILE" >&2)

# Imprimir un mensaje para indicar que el script está comenzando
echo "Iniciando el script deploy.sh"

# Cambiar al directorio ci-cd-example
echo "Cambiando al directorio /root/ci-cd-example"
cd /root/ci-cd-example

# Detener los servicios con docker-compose
echo "Deteniendo los servicios con docker-compose"
docker-compose -f docker-compose-deploy.yml down

# Actualizar el repositorio git
echo "Actualizando el repositorio git"
git pull

# Iniciar los servicios con docker-compose
echo "Iniciando los servicios con docker-compose"
docker-compose -f docker-compose-deploy.yml up -d --force-recreate

# Imprimir un mensaje para indicar que el script ha terminado
echo "Script deploy.sh completado"
