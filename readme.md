### bjacobel.com
=========
My personal website and blog.

#### Run locally
Requirements:
- Node 6

        yarn || npm install
        yarn start || npm start

#### Deploy
Just push to GitHub. Travis will build the site, push it to S3 and then invalidate the CloudFront cache.
