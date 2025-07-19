#!/bin/bash

set -e  # Exit on any error

# Step 1: Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker Desktop and try again."
  exit 1
fi

# Step 2: Start pharmacy-db container
echo "🚀 Starting pharmacy-db container..."
docker rm -f pharmacy-db 2>/dev/null || true
docker run --name pharmacy-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=pharmacy \
  -p 5432:5432 \
  -d postgres

# Wait for Postgres to be ready
echo "⏳ Waiting for database to become available..."
until docker exec pharmacy-db pg_isready -U user >/dev/null 2>&1; do
  sleep 1
done

# Step 3: Create the database table
echo "🗃️  Applying schema..."
cat schema.sql | psql postgres://user:password@localhost:5432/pharmacy

# Step 4: Build the pharmacy API image
echo "🔨 Building pharmacy-api Docker image..."
docker build -t pharmacy-api .

# Step 5: Run the REST API
echo "🚀 Starting pharmacy-api container..."
docker rm -f pharmacy-api 2>/dev/null || true
docker run --name pharmacy-api \
  --env DATABASE_URL=postgresql://user:password@host.docker.internal:5432/pharmacy \
  -p 8000:8000 \
  -d pharmacy-api

sleep 5

# Step 6: Add sample drugs
echo "💊 Adding drugs to the database..."
cd tests
./add_10_drugs.sh

# Step 7: Run endpoint tests
echo "✅ Testing API endpoints..."
./test_api_endpoints_with_uuid.sh
