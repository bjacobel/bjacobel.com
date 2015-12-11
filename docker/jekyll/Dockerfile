FROM jekyll/jekyll:builder
MAINTAINER Brian Jacobel <bjacobel@gmail.com>

WORKDIR /bjdotcom

RUN git clone https://github.com/bjacobel/bjacobel.github.io.git /bjdotcom
RUN git checkout bjacobel.com
RUN bundle install
