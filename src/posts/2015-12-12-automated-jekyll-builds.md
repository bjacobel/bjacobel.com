---
title: "Migrating from GitHub Pages, Part 1: Automated Jekyll builds with Travis CI"
date: 2015-12-12 23:50:00
url: /2015/12/12/automated-jekyll-builds/
---

This post is the first of two detailing the setup I've picked for hosting my Jekyll site. In the second, I'll dive into Docker, [Caddy](https://caddyserver.com) and Let's Encrypt. First, though, I wanted to share a cool little feature I built into my workflow with Git, Jekyll, and Travis CI.

I've hosted this site on GitHub Pages since 2013, even before I was using Jekyll. It's been a great little setup, especially the ease of being able to `git push` to deploy. Lately, though, one thing has been bothering me about my site: as a web developer who would never consider releasing a site without SSL, the lack of it on my own site was a sore spot. [HTTPS support for GitHub Pages](https://github.com/isaacs/github/issues/156) using custom domains is a much-requested feature, but as GitHub hasn't made any movement on it and the recent launch of [Let's Encrypt](https://letsencrypt.org) has made SSL much cheaper and easier to deploy, I thought the time had come to migrate off of GitHub Pages and onto my own hosting solution with SSL support.

One thing that was important to me in designing a system for deploying and hosting my site off GitHub Pages was that it not lock me into using Jekyll. I've been very interested in both [Hugo](https://gohugo.io/) and [Ghost](https://ghost.org/) and wanted to leave the door open to moving to a new blogging platform. With that in mind, I set up my hosting platform to pull static HTML from a Git repository, leaving all building with Jekyll to be done on my laptop.

For this setup to work, I'd need to write Markdown on my computer, `jekyll build` it, and commit both the Markdown and HTML to Git. On GitHub Pages, though, I could just write the Markdown and let The Cloud take care of the build process -- a step back in simplicity. To get back to write-markdown-and-commit, I introduced a set of custom build commands to Travis CI, a continuous integration service integrated with GitHub.

Every time I push new Markdown content to GitHub, Travis CI checks out my blog's repository and installs Jekyll. After doing an incremental build ([new in Jekyll 3.0!](https://github.com/jekyll/jekyll/pull/3116)), Travis adds any new files in `_site` to Git and commits them, then automatically pushes the built files back to GitHub. It's a simple little feature, but it keeps my Jekyll hosting solution at feature parity with GitHub Pages and my site up to date.

You can view the `.travis.yml` that makes this feature tick [here](https://github.com/bjacobel/bjacobel.com/blob/master/.travis.yml).
