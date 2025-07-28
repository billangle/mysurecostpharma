#!/bin/bash

API_URL=https://api.mysurecostpharma.com/drugs

echo "📦 Adding 10 drug records to the database..."

declare -a names=("Amoxicillin" "Ibuprofen" "Paracetamol" "Azithromycin" "Simvastatin" "Metformin" "Lisinopril" "Hydrochlorothiazide" "Amlodipine" "Albuterol")
declare -a manufacturers=("Pfizer" "Advil Inc." "Tylenol" "Zithromax" "StatCo" "GlucoPharm" "HeartMed" "WaterPharma" "CalciMed" "BreatheEZ")
declare -a quantities=(100 150 200 120 180 300 90 85 70 50)
declare -a types=("capsule" "tablet" "tablet" "tablet" "tablet" "tablet" "tablet" "tablet" "tablet" "inhaler")
declare -a prices=(12.5 7.99 5.49 18.0 11.25 4.75 10.0 6.5 9.3 25.0)

for i in "${!names[@]}"; do
  ID=$(uuidgen)
  JSON=$(cat <<EOF
{
  "id": "$ID",
  "name": "${names[$i]}",
  "manufacturer": "${manufacturers[$i]}",
  "quantity": ${quantities[$i]},
  "type": "${types[$i]}",
  "price": ${prices[$i]}
}
EOF
)
  echo "➡️  Adding: ${names[$i]}"
  curl -s -X POST $API_URL -H "Content-Type: application/json" -d "$JSON" | jq
done

echo "✅ All drugs added."
