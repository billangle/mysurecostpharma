from fastapi import FastAPI
from app.api import endpoints
from app.core.config import settings
from app.core.logger import setup_logger

app = FastAPI(title="Pharmacy Drug Inventory API")

setup_logger(app)

app.include_router(endpoints.router)
