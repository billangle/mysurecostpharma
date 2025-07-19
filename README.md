# MySurecostPharma
SureCost Pharma Project - created by William Beckett
* https://www.linkedin.com/in/wbeckett/
* http://rightaresearch.com



### Part 1 Overview
The REST API is written in Python using FastAPI. It is assuming a Postgres Database and uses SQLAlchemy as the ORM. The application is deployed using a Docker container. The Postgres Database is also deployed using a Docker container. The source code is located in the /phamacy_api drectory of the repository. There are UNIX shell based test tools, utilized for unit tests.

### Part 2 Overview
The frontend application is ReactJS based solution using Redux toolkit and Axios libraries. The application constructed using the vite build tool. The tailwind CSS style library for a consistent look and feel across the application. The vitest library is utilized for unit tests. The source code is in the /drug-app directory of the repository.

## AI Tools Used
* ChatGPT model o4-mini-high

## Prompt Logs and Prompting Strategy

Basic strategy is to provide overview prompts, which will generate the basic request. This is followed by a series of questions, asked by the LLM, which are used to add functionality to the solution. This approach utilizes the LLM memory to provide changes on the files that it has created, and is using the LLM memory to build upon the work that it hs done. The basic solution is then downloaded in a ZIP file.

# Part 1 Prompts

### Started with Database
Create a schema for a SQL database which will the storage of prescription drug data. This data is for  platform for managing pharmacy inventory. One of our core features is the ability to manage drug data from various sources and formats. This data should include price, manufacturer, quantity, type. Utilize a UUID to ensure that each row is unique.

### Used Database to create the API
Using this table build a REST API in Python using FastAPI which implements Create, Update, Delete, and flexible Search endpoints for drug records.  Ensure idempotency for Create and Update operations. Provide a Dockerfile to containerize the backend. Implement a real persistence layer using an ORM such as SQLAlchemy. Add external configuration management (e.g., environment variables) Implement global error handling and structured logging


# Part 2 Prompts

### Initial Prompt
<pre>Create a ReactJS web application which utilizes vite and redux toolkit. The application must Display a searchable/filterable list of drugs using your API 
Include forms to create and edit drug records
Allow deletion with a confirmation step
Display backend validation and error responses clearly
The API has the follow REST endpoint
POST /drugs – creates a new drug
GET /drugs – fetches all drugs
GET /drugs?name=Ibu – searches for drugs
GET /drugs/{id} – fetches by ID
PUT /drugs/{id} – updates a drug
DELETE /drugs/{id} – deletes it
Utilize axios as the library to provide the asynchronous REST calls
Utilizes yup to validate form inputs
Write unit test cases using vitest to validate the functionality
</pre>

### Next Prompt
continue with creating components and redux store setup then create a downloadable zip with the entire project

### After reviewing the initial app - added functionality
create an initial page which lists all of the drugs available using card component from tailwind. this page should show 5 drugs and scroll to see the nest five drugs. this page should be the default route for the application. if not drigs are available via th REST API call the the GET /drugs then the page will show text that says that no drugs are available, this this link to add. This should be new new form to add drugs with a route called adddrugs

### Realized there was no routing
i would like routing for edit/view, better card UI, or pagination!

### Finally added styling
add a header on every page with a new generated logo for MySureCostPharma and the title of the page based on the page route. Add a footer with the MySureCostPharma copyright 2025. Add a left collapsable sidebar navigation with icons and links to Add New Drug, Home and Search for a Drug

# AI-Generated vs. Manually Refined Work
The git commits reflect the manual versus the pure AI work. 
<pre>
git log --oneline
21ed2df (HEAD -> main, origin/main, origin/HEAD) updates to readme
1a45d50 updates to unit tests
06aad47 updates toredux for pages
e204ecd updates for search
00ca70d update to add for UUID
a664e34 update so that search and ordering work
22f2ef1 returned sorted list
742a76d added delete
ae64ffb updated the logo
d7a7ce4 app init -- AI for FE
e9286f3 init -- AI for BE
c72db23 Initial commit - AI for BE
</pre>


# AI Failures

### Missing libaries
* example @hookform/resolvers

### Frontend Testing was a complete failure
The frontend unit tests required many iterations and much manual intervention, before there was a solution.

# Pros and Cons
The AI tooling generated code that was very helpful to start the project. The generated REST API code was very effective. The UI code was much more challenging and took some work. The process of having the LLM build upon ever increasing detailed prompts, was able to create a very useful output.

The limitation of this approach is that once the ZIP file is downloaded, it is much more difficult to make changes. The LLM can forget critical details and generate solutions that no longer align with what was orginally produced. 

# Production Readiness


* Create GitHub actions for deployment with varibles and secrets for database access credentials and AWS account information
* Create AWS ECS deployment using ALB for the REST API - using Fargate serverless compute 
* Create AWS Postgres RDS Serverless for database
* Deploy frontend on AWS S3 bucket using the name of the Route53 DNS entry for this application. Make this SSL using Cloudfront. Add AWS WAF with Botnet protection and CloudShield.
* Utilize OAuth 2.0 to protect the REST API. Requests should include JWT Token.
* Create users/user management using AWS Cognito which can implement OAuth 2.0 and provide JWT tokens for calls to REST API. Integrate the login with the FE application.
* Utilize Loki for storing REST API logs, integrate logs using Grafana
* Utilize AWS CloudWatch RUM tooling on the FE to obtain log information from the FE. Integrate these logs into Grafana
* Utilize AWS CDK to make the deployment automated and repeatable. Integrate with github actions.
* FrontEnd: Currently utilizing the .env for BASEURL of the REST API - should add the library env-cmd and .env file foreach environment, prod, qa, dev. Create entries in package.json for these different environments.


# Getting Started


### Prerequisites

* Docker Desktop
* npm
* psql 

# Running
Assuming that the user is able to have shell access via a terminal. Instructions assume the user is on MacOS.

# Starting Part 1
Run the REST API with Postgres using Docker on port 8000 of the localhost

Run the script ./start_pharma_api.sh from the pharmacy_api directory. Assumes that the script is started in the phamacy_api directory. This will create and run the back-end REST API. 

### Assumptions of the script

* Assumes you're running on macOS or Windows (where host.docker.internal works).

* If you're on Linux, replace host.docker.internal with 172.17.0.1 or your actual host IP.

* Make sure psql is installed and accessible from the shell.

* The script assumes correct file paths and executable scripts (schema.sql, add_10_drugs.sh, and test_api_endpoints_with_uuid.sh).

### Actions of the script - required to start the REST API
* Create and start the pharmacy-db
<pre>
docker run --name pharmacy-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=pharmacy \
  -p 5432:5432 \
  -d postgres
</pre>
* Create the database table in the database
<pre>cd /pharmacy_api
 cat schema.sql | psql postgres://user:password@localhost:5432/pharmacy
 </pre>
* Create the pharmacy_api 
<pre>
docker build -t pharmacy-api .
</pre>
* Run the REST API with the Postgres Database
<pre>docker run --name pharmacy-api \
  --env DATABASE_URL=postgresql://user:password@host.docker.internal:5432/pharmacy \
  -p 8000:8000 \
  pharmacy-api &
  </pre>
* Add some drugs to the database
<pre>
cd tests; ./add_10_drugs.sh
</pre>
* Test that is is working
<pre>
./test_api_endpoints_with_uuid.sh
</pre>

# Starting Part 2
Starting the React Frontend using npm

Must be in the /drug_app directory

* Run the command <pre>npm install</pre>

* Run the command <pre>npm run dev</pre>

The application should be running on
http://localhost:5173/

### Swagger Docs
* http://localhost:8000/docs

### Database Schema

<pre>CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE drugs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    type TEXT NOT NULL,  -- e.g., tablet, capsule, liquid, etc.
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    source TEXT,         -- optional: source system or format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</pre>

### Testing

Unit tests for REST API <pre>
cd pharmacy_api/tests
./test_api_endpoints_with_uuid.sh</pre>

Unit tests for Frontend
<pre>
cd drug_app
npm run test
</pre>

### Links

* Vite - https://vite.dev/guide
* Tailwind CSS - https://tailwindcss.com/docs/installation/framework-guides
* Axios - https://axios-http.com/docs/intro
* Redux Toolkit - https://redux-toolkit.js.org/
* Vitest - https://vitest.dev/
