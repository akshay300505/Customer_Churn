from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.recommendation import Recommendation


def generate_guidance(
    db: Session,
    customer: Customer,
    risk_level: str
):

    recommendations = []

    if risk_level == "High":

        recommendations.extend([
            {
                "category": "Retention",
                "title": "Offer a Personalized Retention Plan",
                "description":
                    "Contact the customer with a personalized retention offer.",
                "priority": "High"
            },
            {
                "category": "Pricing",
                "title": "Review Pricing",
                "description":
                    "Consider a suitable pricing incentive based on customer value.",
                "priority": "High"
            },
            {
                "category": "Engagement",
                "title": "Customer Success Outreach",
                "description":
                    "Schedule proactive customer-success communication.",
                "priority": "Medium"
            }
        ])

    elif risk_level == "Medium":

        recommendations.extend([
            {
                "category": "Engagement",
                "title": "Increase Customer Engagement",
                "description":
                    "Send relevant product and service engagement messages.",
                "priority": "Medium"
            },
            {
                "category": "Support",
                "title": "Check Customer Satisfaction",
                "description":
                    "Review recent support interactions and satisfaction.",
                "priority": "Medium"
            }
        ])

    else:

        recommendations.append({
            "category": "Loyalty",
            "title": "Maintain Customer Relationship",
            "description":
                "Continue normal engagement and loyalty activities.",
            "priority": "Low"
        })

    db.query(
        Recommendation
    ).filter(
        Recommendation.customer_id
        == customer.id
    ).delete()

    for item in recommendations:

        recommendation = Recommendation(
            customer_id=customer.id,
            category=item["category"],
            title=item["title"],
            description=item["description"],
            priority=item["priority"]
        )

        db.add(recommendation)

    db.commit()

    return recommendations