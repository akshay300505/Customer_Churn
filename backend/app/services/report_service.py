from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.prediction import Prediction


def generate_report(db: Session):

    customers = db.query(
        Customer
    ).all()

    predictions = db.query(
        Prediction
    ).all()

    high_risk = [
        p for p in predictions
        if p.risk_level == "High"
    ]

    return {
        "generatedAt": __import__(
            "datetime"
        ).datetime.utcnow().isoformat(),

        "totalCustomers": len(
            customers
        ),

        "totalPredictions": len(
            predictions
        ),

        "highRiskCustomers": len(
            high_risk
        ),

        "averageChurnProbability":
            round(
                sum(
                    p.churn_probability
                    for p in predictions
                )
                / len(predictions),
                2
            )
            if predictions
            else 0,

        "highRiskCustomerIds": [
            p.customer_id
            for p in high_risk
        ]
    }