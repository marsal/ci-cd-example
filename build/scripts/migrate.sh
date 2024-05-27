#!/bin/bash

# Ejecuta la migración usando el comando necesario
npx prisma migrate deploy

# Lanza el comando de inicio del backend
exec "$@"