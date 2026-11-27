from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.company import CompanyCreate


def get_companies(db: Session):
    return (
        db.query(Company)
        .order_by(Company.id.desc())
        .all()
    )


def get_company(
    db: Session,
    company_id: int
):
    return (
        db.query(Company)
        .filter(Company.id == company_id)
        .first()
    )


def create_company(
    db: Session,
    data: CompanyCreate
):
    company = Company(
        **data.model_dump()
    )

    db.add(company)
    db.commit()
    db.refresh(company)

    return company