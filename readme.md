###bjacobel.com
=========
My personal website and blog.

####Run locally
Requirements:
- Ruby 2.2.1
- Bundler

        bundle install
        jekyll serve

####Deploy
Just push to GitHub, Travis will build the site with Jekyll, push it to S3 and then invalidate the CloudFront cache.