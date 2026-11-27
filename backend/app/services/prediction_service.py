from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.prediction import Prediction

from app.utils.helpers import risk_from_probability


def calculate_churn_probability(
    customer: Customer
):
    score = 0.0

    if customer.tenure <= 6:
        score += 20

    elif customer.tenure <= 12:
        score += 10

    if customer.monthly_charges >= 100:
        score += 20

    elif customer.monthly_charges >= 70:
        score += 10

    if customer.contract:
        contract = customer.contract.lower()

        if "month" in contract:
            score += 25

        elif "one year" in contract:
            score += 10

    if customer.tech_support:
        if customer.tech_support.lower() == "no":
            score += 8

    if customer.online_security:
        if customer.online_security.lower() == "no":
            score += 8

    if customer.paperless_billing:
        if customer.paperless_billing.lower() in {
            "yes",
            "true"
        }:
            score += 5

    if customer.internet_service:
        if customer.internet_service.lower() == "fiber optic":
            score += 8

    if customer.senior_citizen:
        score += 5

    score = min(
        max(score, 0),
        99
    )

    return round(score, 2)


def create_prediction(
    db: Session,
    customer: Customer
):
    probability = calculate_churn_probability(
        customer
    )

    risk_level = risk_from_probability(
        probability
    )

    prediction_text = (
        "Churn"
        if probability >= 50
        else "No Churn"
    )

    prediction = Prediction(
        customer_id=customer.id,
        churn_probability=probability,
        risk_level=risk_level,
        prediction=prediction_text,
        confidence=round(
            max(probability, 100 - probability),
            2
        ),
        model_version="rule-based-v1"
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction


def latest_prediction(
    db: Session,
    customer_id: int
):
    return (
        db.query(Prediction)
        .filter(
            Prediction.customer_id == customer_id
        )
        .order_by(
            Prediction.created_at.desc()
        )
        .first()
    )


def predict_all_customers(db: Session):
    customers = db.query(Customer).all()

    predictions = []

    for customer in customers:
        prediction = create_prediction(
            db,
            customer
        )

        predictions.append(prediction)

    return predictions