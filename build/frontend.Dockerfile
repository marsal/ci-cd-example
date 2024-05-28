FROM node:20.13-alpine as builder

WORKDIR /var/www/
COPY frontend/ .

RUN npm install && npm run build

FROM nginx:1.26.0-alpine
RUN apk update &&\
    apk upgrade

COPY /build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html

COPY --from=builder /var/www/dist/ .
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
