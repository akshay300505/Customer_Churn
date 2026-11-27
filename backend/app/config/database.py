from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config.settings import settings


connect_args = {}

if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {
        "check_same_thread": False
    }


engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def create_tables():
    from app.models.company import Company
    from app.models.customer import Customer
    from app.models.dataset import Dataset
    from app.models.prediction import Prediction
    from app.models.recommendation import Recommendation
    from app.models.user import User
    from app.models.audit import Audit

    Base.metadata.create_all(bind=engine)