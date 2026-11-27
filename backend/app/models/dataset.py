from sqlalchemy import Column, Integer, String, DateTime

from datetime import datetime

from app.config.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String(255),
        nullable=False
    )

    file_type = Column(
        String(50),
        default="csv"
    )

    rows_count = Column(
        Integer,
        default=0
    )

    valid_rows = Column(
        Integer,
        default=0
    )

    invalid_rows = Column(
        Integer,
        default=0
    )

    status = Column(
        String(50),
        default="Processed"
    )

    checksum = Column(
        String(128),
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )