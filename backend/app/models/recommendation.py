from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.config.database import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

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

    category = Column(
        String(100),
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    priority = Column(
        String(30),
        default="Medium"
    )

    status = Column(
        String(30),
        default="Pending"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )