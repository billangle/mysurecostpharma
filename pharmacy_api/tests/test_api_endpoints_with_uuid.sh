#!/bin/bash

set -e

API_URL="http://localhost:8000/drugs"
UUID=$(uuidgen)

echo "▶️  Creating a drug (POST)"
CREATE_RESPONSE=$(curl -s -X POST $API_URL -H "Content-Type: application/json" -d '{
  "id": "'"$UUID"'",
  "name": "Ibuprofen",
  "manufacturer": "HealthCorp",
  "quantity": 150,
  "type": "tablet",
  "price": 5.99
}')
echo "$CREATE_RESPONSE"

# Extract the ID and validate
DRUG_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id')

if [[ "$DRUG_ID" == "null" || -z "$DRUG_ID" ]]; then
  echo "❌ Failed to create drug or extract ID. Aborting tests."
  exit 1
fi

echo "🆔 Drug ID: $DRUG_ID"

echo "▶️  Getting all drugs (GET)"
curl -s -X GET $API_URL | jq

echo "▶️  Searching for drugs (GET?name=Ibu)"
curl -s -X GET "$API_URL?name=Ibu" | jq

echo "▶️  Getting a specific drug by ID (GET /{id})"
curl -s -X GET "$API_URL/$DRUG_ID" | jq

echo "▶️  Updating the drug (PUT /{id})"
curl -s -X PUT "$API_URL/$DRUG_ID" -H "Content-Type: application/json" -d '{
  "name": "Ibuprofen Updated",
  "manufacturer": "HealthCorp",
  "quantity": 200,
  "type": "tablet",
  "price": 6.49
}' | jq

echo "▶️  Deleting the drug (DELETE /{id})"
curl -s -X DELETE "$API_URL/$DRUG_ID" | jq

echo "✅ Done."
