---
title: BosFoodFails
image: boston_seal.png
source: https://github.com/bjacobel/bosfoodfails
source_title: GitHub
site: https://twitter.com/bosfoodfails
site_title: "@bosfoodfails"
---

**Boston Food Inspections** (@bosfoodfails) is a Twitter bot that consumes food inspection data published by
the City of Boston. Every day, new violations of the city's health code are tweeted alongside geographic information,
statistics on previous violations, and pictures from the Foursquare API. This project runs entirely on AWS Lambda
and uses KMS and DynamoDB to store credentials and state, meaning it requires no persistent server to run. Read
more in [my blog post about this project](/2015/12/28/serverless-twitterbots/)
