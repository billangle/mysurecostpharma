from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints
from app.core.config import settings
from app.core.logger import setup_logger

app = FastAPI(title="Pharmacy Drug Inventory API")

# Add CORS settings (adjust origins for production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domains in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_logger(app)

app.include_router(endpoints.router)
