FROM node:11.1.0-alpine AS base
LABEL version="4.0.0"
LABEL description=""

WORKDIR /usr/src/app
COPY ["package.json", "./"]
COPY ["package-lock.json", "./"]

FROM base AS builder
RUN npm set progress=false && npm config set depth 0 && npm ci
COPY ["src/", "./src"]
RUN npm run Prod

FROM nginx:1.14.1-alpine as Web
LABEL maintainer="MrFlutters (https://github.com/MrFlutters)"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/web.conf /etc/nginx/conf.d/web.conf

LABEL traefik.backend=fluttershub_home
LABEL traefik.frontend.rule="Host:${CI_COMMIT_REF_SLUG}fluttershub.com"
LABEL traefik.docker.network=web
LABEL traefik.frontend.redirect.entryPoint=https
LABEL traefik.enable=true
LABEL traefik.port=80

EXPOSE 80
RUN rm -Rf /usr/share/nginx/html/ && rm /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html/
CMD [ "nginx", "-g", "daemon off;" ]