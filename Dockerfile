FROM nginx:1.19.6-alpine

MAINTAINER Benjamin Pannell <admin@sierrasoftworks.com>

COPY conf/nginx.conf /etc/nginx/conf.d/blog.conf

ARG VERSION
LABEL version=${VERSION:-development}

COPY public/ /src/blog/

EXPOSE 3000
#HEALTHCHECK --interval=5s --timeout=1s \
#    CMD curl -f http://localhost:3000/index.html || exit 1
