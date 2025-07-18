import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_drug():
    response = client.post("/drugs", json={
        "name": "TestDrug",
        "manufacturer": "TestPharma",
        "quantity": 100,
        "type": "tablet",
        "price": 19.99
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "TestDrug"
    assert data["quantity"] == 100

def test_search_drugs():
    response = client.get("/drugs?name=TestDrug")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
