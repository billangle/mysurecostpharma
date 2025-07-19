# MySurecostPharma
SureCost Pharma Project - created by William Beckett
* https://www.linkedin.com/in/wbeckett/
* http://rightaresearch.com



### Part 1
The REST API is written in Python using FastAPI. It is assuming a Postgres Database and uses SQLAlchemy as the ORM. The application is deployed using a Docker container. The Postgres Database is also deployed using a Docker container. The source code is located in the /phamacy_api drectory of the repository. There are both Python and UNIX shell based test tools, utilized for unit tests.

### Part 2
The frontend application is ReactJS based solution using Redux toolkit and Axios libraries. The application constructed using the vite build tool. The tailwind CSS style library for a consistent look and feel across the application. The vitest library is utilized for unit tests. The source code is in the /drug-app directory of the repository.

### AI Tools Used
* ChatGPT model o4-mini-high

### Prompt Logs and Prompting Strategy

Basic strategy is to provide overview prompts, which will generate the basic request. This is followed by a series of questions, asked by the LLM, which are used to add functionality to the solution. 

## Part 1 Prompts

### Started with Database
Create a schema for a SQL database which will the storage of prescription drug data. This data is for  platform for managing pharmacy inventory. One of our core features is the ability to manage drug data from various sources and formats. This data should include price, manufacturer, quantity, type. Utilize a UUID to ensure that each row is unique.

### Used Database to create the API
Using this table build a REST API in Python using FastAPI which implements Create, Update, Delete, and flexible Search endpoints for drug records.  Ensure idempotency for Create and Update operations. Provide a Dockerfile to containerize the backend. Implement a real persistence layer using an ORM such as SQLAlchemy. Add external configuration management (e.g., environment variables) Implement global error handling and structured logging


## Part 2 Prompts

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

## AI-Generated vs. Manually Refined Work



## AI Failures

### Missing libaries
* example @hookform/resolvers

### Frontend Testing was a complete failure
The frontend unit tests required many iterations and much manul intervention, before there was a solution.

## Pros and Cons
The AI tooing generated code that was very helpful to start the project. The REST API code was very effective. The UI code was much more challenging and took some work. 

## Production Readiness

* FrontEnd: Utilizing the .env for BASEURL of the REST API - should add the library env-cmd and .env files foreach environment, prod, qa, dev, etc
* Create GitHub actions for deployment with varibles and secrets for database access credentials and AWS account information
* Create ECS deployment using ALB for the REST API 
* Create Postgres RDS Serverless for database
* Deploy frontend on S3 bucket using the name of the Route53 DNS entry for this application. Make this SSL using Cloudfront
* Utilize AWS CDK to make the deployment automated and repeatable 


## Database Schema

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

## Getting Started


### Prerequisites

* Docker Desktop
* NPM

### Running


### Testing

### Links

* Vite - https://vite.dev/guide
* Tailwind CSS - https://tailwindcss.com/docs/installation/framework-guides
* Axios -
* Redux Toolkit - 
* Vitest -
