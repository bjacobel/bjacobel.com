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

####Deploy to production
Requirements:
  - Docker
  - Docker Machine
  - Docker Compose
  - Running remote Docker host (DigitalOcean)
  - SSH keys

    # (only need to do this once)
    docker-machine create \
      --driver generic \
      --generic-ip-address <production IP> \
      --generic-ssh-key "/Users/bjacobel/.ssh/<production SSH key>" \
      production

    eval "$(docker-machine env production)"
    docker-compose build
    docker-compose up
