from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.company import (
    CompanyCreate,
    CompanyResponse
)

from app.services.company_service import (
    get_companies,
    get_company,
    create_company
)


router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)


@router.get(
    "",
    response_model=list[CompanyResponse]
)
def list_companies(
    db: Session = Depends(get_db)
):
    return get_companies(db)


@router.get(
    "/{company_id}",
    response_model=CompanyResponse
)
def company_details(
    company_id: int,
    db: Session = Depends(get_db)
):

    company = get_company(
        db,
        company_id
    )

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


@router.post(
    "",
    response_model=CompanyResponse
)
def add_company(
    data: CompanyCreate,
    db: Session = Depends(get_db)
):
    return create_company(
        db,
        data
    )