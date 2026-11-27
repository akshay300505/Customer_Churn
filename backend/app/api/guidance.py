from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.customer import Customer

from app.services.prediction_service import (
    latest_prediction,
    create_prediction
)

from app.services.guidance_service import (
    generate_guidance
)


router = APIRouter(
    prefix="/guidance",
    tags=["Guidance"]
)


@router.get(
    "/customer/{customer_id}"
)
def get_guidance(
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
        prediction = create_prediction(
            db,
            customer
        )

    recommendations = generate_guidance(
        db,
        customer,
        prediction.risk_level
    )

    return {
        "customer_id": customer.id,
        "risk_level": prediction.risk_level,
        "recommendations": recommendations
    }