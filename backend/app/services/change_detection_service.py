import hashlib
import json

from sqlalchemy.orm import Session

from app.models.customer import Customer


def calculate_customer_checksum(customer):
    data = {
        "customer_id": customer.customer_id,
        "name": customer.name,
        "email": customer.email,
        "tenure": customer.tenure,
        "contract": customer.contract,
        "monthly_charges": customer.monthly_charges,
        "total_charges": customer.total_charges,
        "churn": customer.churn
    }

    raw = json.dumps(
        data,
        sort_keys=True
    ).encode("utf-8")

    return hashlib.sha256(raw).hexdigest()


def detect_changes(
    db: Session,
    incoming_customers
):

    changes = []

    for incoming in incoming_customers:

        existing = (
            db.query(Customer)
            .filter(
                Customer.customer_id
                == incoming.customer_id
            )
            .first()
        )

        if not existing:
            changes.append({
                "customer_id":
                    incoming.customer_id,
                "change": "new"
            })

            continue

        changed = False

        fields = [
            "name",
            "email",
            "tenure",
            "contract",
            "monthly_charges",
            "total_charges",
            "churn"
        ]

        for field in fields:

            if getattr(
                existing,
                field,
                None
            ) != getattr(
                incoming,
                field,
                None
            ):
                changed = True
                break

        if changed:
            changes.append({
                "customer_id":
                    incoming.customer_id,
                "change": "updated"
            })

    return changes