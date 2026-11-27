from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.config.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=True
    )

    name = Column(
        String(150),
        nullable=False,
        default="Unknown Customer"
    )

    email = Column(
        String(150),
        nullable=True
    )

    phone = Column(
        String(50),
        nullable=True
    )

    gender = Column(
        String(30),
        nullable=True
    )

    age = Column(
        Integer,
        nullable=True
    )

    senior_citizen = Column(
        Boolean,
        default=False
    )

    partner = Column(
        Boolean,
        default=False
    )

    dependents = Column(
        Boolean,
        default=False
    )

    tenure = Column(
        Integer,
        default=0
    )

    contract = Column(
        String(100),
        nullable=True
    )

    payment_method = Column(
        String(100),
        nullable=True
    )

    monthly_charges = Column(
        Float,
        default=0
    )

    total_charges = Column(
        Float,
        default=0
    )

    internet_service = Column(
        String(100),
        nullable=True
    )

    tech_support = Column(
        String(50),
        nullable=True
    )

    online_security = Column(
        String(50),
        nullable=True
    )

    paperless_billing = Column(
        String(50),
        nullable=True
    )

    churn = Column(
        Boolean,
        default=False
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