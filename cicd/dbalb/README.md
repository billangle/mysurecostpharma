# Backend ECS and DB

The Dockerfile is in pharmacy_api/Dockerfile - it is assuming running on port 80. There needs to be a change so that the local build can be on 8000.
The containerdb and other container strategy doesn't work for this Python application. 

The API Gateway is not used in this build. The references have bee commented out.


The ECS healthcheck has been configured to work on /docs, which contais the swagger. This corrected the circuit-breaker failure problem.

This version does not run the SQL schema creation using the Lambda automatically. This was do to a coding error, which has been corrected. The database used is postgres and the schema is loaded there. It was loaded by manully running the Lambda.




The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
