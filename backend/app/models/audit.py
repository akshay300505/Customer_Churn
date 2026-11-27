from sqlalchemy import Column, Integer, String, Text, DateTime

from datetime import datetime

from app.config.database import Base


class Audit(Base):
    __tablename__ = "audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=True
    )

    action = Column(
        String(100),
        nullable=False
    )

    resource = Column(
        String(100),
        nullable=True
    )

    details = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )