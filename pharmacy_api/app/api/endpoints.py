from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.schemas.drug import DrugCreate, DrugUpdate, DrugOut
from app.models.drug import Drug
from app.core.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/drugs", response_model=DrugOut)
def create_drug(drug: DrugCreate, db: Session = Depends(get_db)):
    db_obj = db.query(Drug).filter(Drug.id == drug.id).first() if drug.id else None
    if db_obj:
        return db_obj
    new_drug = Drug(**drug.dict(exclude_unset=True))
    db.add(new_drug)
    db.commit()
    db.refresh(new_drug)
    return new_drug

@router.get("/drugs/{drug_id}", response_model=DrugOut)
def get_drug(drug_id: UUID, db: Session = Depends(get_db)):
    drug = db.query(Drug).filter(Drug.id == drug_id).first()
    if not drug:
        raise HTTPException(status_code=404, detail="Drug not found")
    return drug

@router.get("/drugs", response_model=list[DrugOut])
def search_drugs(name: str = "", db: Session = Depends(get_db)):
    return (
        db.query(Drug)
        .filter(Drug.name.ilike(f"%{name}%"))
        .order_by(Drug.name)
        .all()
    )

@router.put("/drugs/{drug_id}", response_model=DrugOut)
def update_drug(drug_id: UUID, drug: DrugUpdate, db: Session = Depends(get_db)):
    db_obj = db.query(Drug).filter(Drug.id == drug_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Drug not found")
    for key, value in drug.dict(exclude_unset=True).items():
        setattr(db_obj, key, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.delete("/drugs/{drug_id}")
def delete_drug(drug_id: UUID, db: Session = Depends(get_db)):
    db_obj = db.query(Drug).filter(Drug.id == drug_id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Drug not found")
    db.delete(db_obj)
    db.commit()
    return {"detail": "Deleted"}
