from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.customer import Customer
from app.models.prediction import Prediction


def get_dashboard_summary(db: Session):

    total_customers = (
        db.query(Customer)
        .count()
    )

    churned_customers = (
        db.query(Customer)
        .filter(
            Customer.churn == True
        )
        .count()
    )

    predictions = (
        db.query(Prediction)
        .all()
    )

    high_risk = sum(
        1
        for prediction in predictions
        if prediction.risk_level == "High"
    )

    medium_risk = sum(
        1
        for prediction in predictions
        if prediction.risk_level == "Medium"
    )

    low_risk = sum(
        1
        for prediction in predictions
        if prediction.risk_level == "Low"
    )

    avg_probability = 0

    if predictions:
        avg_probability = round(
            sum(
                p.churn_probability
                for p in predictions
            )
            / len(predictions),
            2
        )

    churn_rate = 0

    if total_customers:
        churn_rate = round(
            (
                churned_customers
                / total_customers
            ) * 100,
            2
        )

    estimated_revenue_at_risk = round(
        sum(
            customer.monthly_charges
            for customer in db.query(Customer).all()
            if customer.churn
        ),
        2
    )

    return {
        "totalCustomers": total_customers,
        "churnedCustomers": churned_customers,
        "highRiskCustomers": high_risk,
        "mediumRiskCustomers": medium_risk,
        "lowRiskCustomers": low_risk,
        "averageChurnProbability": avg_probability,
        "churnRate": churn_rate,
        "revenueAtRisk": estimated_revenue_at_risk
    }


def get_risk_distribution(db: Session):

    predictions = db.query(
        Prediction
    ).all()

    return {
        "high": sum(
            p.risk_level == "High"
            for p in predictions
        ),
        "medium": sum(
            p.risk_level == "Medium"
            for p in predictions
        ),
        "low": sum(
            p.risk_level == "Low"
            for p in predictions
        )
    }


def get_churn_trend(db: Session):

    rows = (
        db.query(
            func.date(Customer.created_at).label("date"),
            func.count(Customer.id).label("customers")
        )
        .group_by(
            func.date(Customer.created_at)
        )
        .order_by(
            func.date(Customer.created_at)
        )
        .all()
    )

    return [
        {
            "date": str(row.date),
            "customers": row.customers
        }
        for row in rows
    ]