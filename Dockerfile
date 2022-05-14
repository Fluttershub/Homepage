FROM node:18-alpine AS base
LABEL version="4.1.0"
LABEL description=""

WORKDIR /usr/src/app
COPY ["package.json", "./"]
COPY ["yarn.lock", "./"]

FROM base AS builder
RUN apk add --no-cache --virtual .gyp python make g++ \
    && yarn install \    
    && apk del .gyp

COPY ["src/", "./src"]
RUN npm run Prod

FROM nginx:1.21.6-alpine as Web
LABEL maintainer="Phoenix (https://github.com/HotaruBlaze)"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/web.conf /etc/nginx/conf.d/web.conf

LABEL com.ouroboros.enable="true"
LABEL traefik.http.routers.fluttershub-com.tls=true
LABEL traefik.http.routers.fluttershub-com.rule=Host(`fluttershub.com`)
LABEL traefik.http.routers.fluttershub-com.tls.certresolver=letsencrypt
LABEL traefik.http.services.fluttershub-com.loadbalancer.server.port=80
LABEL traefik.enable=true


EXPOSE 80
RUN rm -Rf /usr/share/nginx/html/ && rm /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html/
CMD [ "nginx", "-g", "daemon off;" ]