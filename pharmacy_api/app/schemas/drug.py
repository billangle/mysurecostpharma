from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class DrugBase(BaseModel):
    name: str
    manufacturer: str
    quantity: int
    type: str
    price: float
    source: Optional[str] = None

class DrugCreate(DrugBase):
    id: Optional[UUID]

class DrugUpdate(DrugBase):
    pass

class DrugOut(DrugBase):
    id: UUID
