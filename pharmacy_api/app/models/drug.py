import uuid
from sqlalchemy import Column, String, Integer, Numeric, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Drug(Base):
    __tablename__ = "drugs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    manufacturer = Column(Text, nullable=False)
    quantity = Column(Integer, nullable=False)
    type = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    source = Column(Text)
