from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.config.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(150),
        nullable=False
    )

    industry = Column(
        String(100),
        nullable=True
    )

    email = Column(
        String(150),
        nullable=True
    )

    phone = Column(
        String(50),
        nullable=True
    )

    status = Column(
        String(30),
        default="Active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )