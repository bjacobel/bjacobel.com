###bjacobel.github.io
=========
My personal website and blog, hosted on ECS with Docker, Caddy and Let's Encrypt.

####Run locally
Requirements:
  - Ruby 2.2.1
  - Bundler

    bundle install
    jekyll serve

####Run locally (in Docker)
Requirements:
  - Docker
  - Docker Machine
  - Docker Compose
  - VirtualBox

    docker-machine start default
    eval "$(docker-machine env default)"
    docker-compose up

####Deploy
