from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.prediction import Prediction

from app.schemas.prediction import (
    PredictionResponse,
    PredictionRequest
)

from app.services.prediction_service import (
    create_prediction,
    latest_prediction,
    predict_all_customers
)

from app.models.customer import Customer


router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)


@router.get(
    "",
    response_model=list[PredictionResponse]
)
def list_predictions(
    risk_level: str | None = None,
    db: Session = Depends(get_db)
):

    query = db.query(
        Prediction
    )

    if risk_level:
        query = query.filter(
            Prediction.risk_level
            == risk_level
        )

    return (
        query
        .order_by(
            Prediction.created_at.desc()
        )
        .all()
    )


@router.get(
    "/customer/{customer_id}",
    response_model=PredictionResponse
)
def customer_prediction(
    customer_id: int,
    db: Session = Depends(get_db)
):

    prediction = latest_prediction(
        db,
        customer_id
    )

    if not prediction:

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

        prediction = create_prediction(
            db,
            customer
        )

    return prediction


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict_customer(
    data: PredictionRequest,
    db: Session = Depends(get_db)
):

    customer = (
        db.query(Customer)
        .filter(
            Customer.id
            == data.customer_id
        )
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return create_prediction(
        db,
        customer
    )


@router.post(
    "/predict-all"
)
def predict_all(
    db: Session = Depends(get_db)
):

    predictions = predict_all_customers(
        db
    )

    return {
        "success": True,
        "count": len(predictions),
        "message":
            "Predictions generated successfully"
    }