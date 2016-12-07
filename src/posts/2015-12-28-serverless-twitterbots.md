---
title: "Serverless Twitterbots with AWS Lambda, KMS and DynamoDB"
date: 2015-12-28 23:50:00
url: /2015/12/28/serverless-twitterbots/
---

Writing bots for Twitter has always been one of my favorite ways to try out a new technology. When I was just first learning about building APIs I built [Orient Haiku](https://twitter.com/orientku), a Python script that looked for haikus in the text of [Bowdoin Orient](http://bowdoinorient.com) articles (delivered over a brand-new JSON API). Later, while I was learning concurrency patterns in Go, I built [Goggles](https://twitter.com/gogglesbot), a Go program that consumed the Twitter Streaming API, ran any images it found through a feature classification service, and used its insights to spread a little positivity.

These projects were fun to build and I learned a lot while creating them, but eventually I let both stop running for the same reason: the cost of running a server, both in terms of dollars and hours to maintain and secure it, was too high. AWS Lambda offers a way out of this pickle, providing computing resources on-demand without the need for either paying for or maintaining a persistent server. Lambda can spin up an execution environment based on various triggers, including `cron` - perfect for a Twitter bot.

### The data
Boston maintains a website packed with interesting datasets, from [crime statistics](https://data.cityofboston.gov/Public-Safety/Crime-Incident-Reports/7cdf-6fgx) to [employee salaries](https://data.cityofboston.gov/Finance/Employee-Earnings-Report-2014/4swk-wcg8). What's more, the [data.cityofboston.gov](https://data.cityofboston.gov) site features an API that provides programmatic access to all of this information. Browsing through the datasets in December of 2015, I came across the [Food Establishment Inspections](https://data.cityofboston.gov/Health/Food-Establishment-Inspections/qndu-wx8w) log, which caught my interest because the Chipotle near my apartment had just been shut down by the city for [infecting over 100 people with norovirus](http://www.nytimes.com/2015/12/10/business/officials-confirm-norovirus-in-a-chipotle-outbreak.html). Clearly, knowing which restaurants fail food inspections was is in the public interest, but it wasn't clear that the public knew that this data was available for free online. I thought building a service to relay this information through a website much more of the public checks every day -- Twitter -- might be fun, interesting, and even of some public value.


### Key management
Because Lambda currently doesn't have support for more conventional means of storing sensitive configuration secrets like environment variables, it's necessary to get a little more creative. AWS Key Management Service (KMS) is a sub-feature of AWS's larger Identity and Access Management (IAM) tools that allows you to store an encryption key in the cloud and recall it over the AWS API. Using KMS, it's possible to devise a credential management system that's secure, flexible, and can be committed straight to Git.

To use KMS to store application secrets, first [create an encryption key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html). Next, create a subfolder in your application called `/secrets` that will be used to store encrypted binary files. Next, write your secrets to this folder. As an example, we'd like to encrypt our Foursquare API client secret, `asdf-123987-lkjh`, and make it available in our application as `FoursquareClientSecret`. To write this secret to an encrypted binary file, execute the `aws kms encrypt` command. For example:

    aws kms encrypt --key-id amzn-key-id --plaintext "asdf-123987-lkjh" --query CiphertextBlob --output text | base64 --decode > ./secrets/FoursquareClientSecret


In this example, replace `amzn-key-id` with the ID of the encryption key you created in KMS, `asdf-123987-lkjh` with the desired value of your secret, and `FoursquareClientSecret` with the name your application will refer to it by.

(This assumes you have already configured the AWS CLI, if not, run `aws configure` or manually create a profile in `~/.aws/credentials` first.)

Your secret is now safely encrypted - it can be committed to Git and pushed to GitHub, or included in a deployment bundle and sent to Lambda. To access the encrypted value inside your application, you will again need to use a KMS API client. Below is an example using `boto` and Python:

```python
import boto3
import os

class Secrets
    def __init__(self):
        for secret in os.listdir('{}/secrets'.format(cwd)):
            with open('{}/secrets/{}'.format(cwd, secret), 'rb') as f:
                setattr(self, secret, kms.decrypt(
                    CiphertextBlob=f.read()
                )['Plaintext'])

config = Secrets()
```


This code creates an instance of class `Config`, which on initialization scans through your `/secrets` directory, decrypts everything and stores the decrypted values as attributes of the `Config` instance. Now `config.FoursquareClientSecret == asdf-123987-lkjh`, and your Lambda code can use secret values with ease.


### Data persistence
Because the Lambda is a Twitter bot, it's fairly important that it never process (and thus tweet) the same data twice. To prevent this, a persistent record of the violations already known and tweeted was necessary. For this, I looked to AWS DynamoDB, a NoSQL database we use in many projects at [Localytics](https://localytics.com). Currently, the bot downloads the last day of violations every 20 minutes, then scans through each one and checks its id against Dynamo to see if it's already been tweeted about. If not, the program saves the id in Dynamo and goes to press. This approach is a little naïve -- for one thing, it puts an unnecessary load on the APIs Boston provides. I may refine this this workflow in the future into two tasks: one to download the previous day's violations and save them to SQS, and another to burn down the queue over the course of the day. For now, though, Dynamo fits well with the need for a low-cost, simple database separated from the execution environment of the code.


### Where next?
Given that working with Lambda, Dynamo and KMS has been so successful for this project, I'm interested in finding ways to refine this project or apply the stack to other scenarios.

At [Localytics](https://localytics.com), we're currently using a number of different Lambdas in production. For some of these projects, we've started to use the deployment framework [Serverless](https://github.com/serverless/serverless) (formerly JAWS) to manage Lambdas and their associated CloudFormation resources. For this personal project I didn't see the need to use something as heavy as Serverless for orchestration -- I'm currently just deploying with a [small bash script](https://github.com/bjacobel/bosfoodfails/tree/master/deploy.sh) -- but I do have my eye on several other deployment tools built around the Lambda ecosystem like [Kappa](https://github.com/garnaat/kappa) and [Apex](https://github.com/apex/apex).

I'd also like to update some of my older projects to use Lambda. Goggles, the feature classification bot mentioned above in this post, currently isn't running because of the pain of paying for and managing a server to run it. I'm hoping for first-party support of Golang on Lambda in the next year, but also looking into [Apex](https://github.com/apex/apex), a Lambda toolkit that provides a Node runner to invoke a Go binary and thus run Go on Lambda. This project's dependence on Go won't be the only difficulty in porting it to Lambda: it also consumes the Twitter Streaming API, which I haven't yet figured out how to capture as a Lambda event stream. This project may involve learning some more about SNS or Kinesis, or may turn out not to be a good fit for Lambda at all.

Speaking of Lambda support, I was pretty disappointed when I learned that Lambda would be launching supporting only Python 2.7. Python's come a long way since the 2.7 days, but Lambda's lack of support means that a number of language features I'd like to use in the food inspections bot just aren't possible. Specifically, Python 3.5's `async` and `await` coroutines may make it possible to restructure and parallelize some of the external API calls this bot must make, reducing execution time and lowering my AWS bill even further. I'm eagerly looking forward to Python 3.x support on Lambda, and will be rewriting the code that powers [@bosfoodfails](https://twitter.com/bosfoodfails) as soon as it's launched.

*Update, 2/21/2016:* [Goggles](https://twitter.com/gogglesbot) is back up and running, using Apex, Lambda and Go 1.6!
