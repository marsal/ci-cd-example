FROM node:20.13-alpine as builder

RUN apk update &&\
    apk upgrade

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al directorio de trabajo
COPY package.json package-lock.json tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Compila el código TypeScript
RUN npm run build

# Comando para ejecutar tu aplicación cuando se inicie el contenedor
CMD ["node", "dist/test.js"]