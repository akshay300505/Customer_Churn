from sqlalchemy import Column, Integer, String, DateTime

from datetime import datetime

from app.config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    full_name = Column(
        String(150),
        nullable=True
    )

    role = Column(
        String(50),
        default="admin"
    )

    is_active = Column(
        Integer,
        default=1
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )