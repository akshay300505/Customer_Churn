from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.services.report_service import (
    generate_report
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get(
    "/summary"
)
def report_summary(
    db: Session = Depends(get_db)
):

    return generate_report(
        db
    )


@router.get(
    "/export-data"
)
def export_data(
    db: Session = Depends(get_db)
):

    return generate_report(
        db
    )