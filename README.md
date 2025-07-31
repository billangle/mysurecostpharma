# MySurecostPharma
SureCost Pharma Project - created by William Beckett
* https://www.linkedin.com/in/wbeckett/
* http://rightaresearch.com

### Project Link
https://app.mysurecostpharma.com


# Getting Started

### Prerequisites

* Docker Desktop
* npm
* psql (brew install postgresql)

# Running
Assuming that the user is able to have shell access via a terminal. Instructions assume the user is on MacOS.

# Starting Backend
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

# Starting Frontend
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
