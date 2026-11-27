from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.services.analytics_service import (
    get_dashboard_summary,
    get_risk_distribution,
    get_churn_trend
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/dashboard"
)
def dashboard(
    db: Session = Depends(get_db)
):
    return get_dashboard_summary(
        db
    )


@router.get(
    "/summary"
)
def summary(
    db: Session = Depends(get_db)
):
    return get_dashboard_summary(
        db
    )


@router.get(
    "/risk-distribution"
)
def risk_distribution(
    db: Session = Depends(get_db)
):
    return get_risk_distribution(
        db
    )


@router.get(
    "/churn-trend"
)
def churn_trend(
    db: Session = Depends(get_db)
):
    return get_churn_trend(
        db
    )


# Compatibility endpoint for dashboards
@router.get(
    "/../dashboard"
)
def dashboard_compatibility(
    db: Session = Depends(get_db)
):
    return get_dashboard_summary(
        db
    )