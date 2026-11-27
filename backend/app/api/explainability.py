from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.customer import Customer

from app.services.prediction_service import (
    latest_prediction
)

from app.services.explainability_service import (
    explain_prediction
)


router = APIRouter(
    prefix="/explainability",
    tags=["Explainability"]
)


@router.get(
    "/customer/{customer_id}"
)
def customer_explanation(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = (
        db.query(Customer)
        .filter(
            Customer.id
            == customer_id
        )
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    prediction = latest_prediction(
        db,
        customer_id
    )

    if not prediction:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )

    return explain_prediction(
        customer,
        prediction.churn_probability
    )