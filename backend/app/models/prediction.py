from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.config.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    churn_probability = Column(
        Float,
        default=0
    )

    risk_level = Column(
        String(30),
        default="Low"
    )

    prediction = Column(
        String(50),
        default="No Churn"
    )

    confidence = Column(
        Float,
        default=0
    )

    model_version = Column(
        String(50),
        default="rule-based-v1"
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