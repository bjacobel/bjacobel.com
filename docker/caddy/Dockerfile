FROM alpine:edge
MAINTAINER Brian Jacobel <bjacobel@gmail.com>

RUN apk add --update openssh-client git tar

RUN mkdir /caddysrc \
  && curl -sL -o /caddysrc/caddy_linux_amd64.tar.gz "http://caddyserver.com/download/build?os=linux&arch=amd64&features=git" \
  && tar -xf /caddysrc/caddy_linux_amd64.tar.gz -C /caddysrc \
  && mv /caddysrc/caddy /usr/bin/caddy \
  && chmod 755 /usr/bin/caddy \
  && rm -rf /caddysrc

WORKDIR /var/www/bjacobel.com

COPY Caddyfile /etc/caddy/Caddyfile

RUN git clone https://github.com/bjacobel/bjacobel.github.io.git /tmp/bjacobel.com \
  && cd /tmp/bjacobel.com \
  && git checkout bjacobel.com \
  && cp -r _site/* /var/www/bjacobel.com/

ENTRYPOINT ["/usr/bin/caddy"]
