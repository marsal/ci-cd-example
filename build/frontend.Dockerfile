FROM node:20.13-alpine as builder

RUN apk update &&\
    apk upgrade

WORKDIR /var/www/
COPY frontend/ .

RUN ls -lah
RUN npm install && npm run build
RUN ls -lah

FROM nginx:1.26.0-alpine
RUN apk update &&\
    apk upgrade

RUN ls -lah
COPY /build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /var/www/dist/ .
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
