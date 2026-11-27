from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate

from app.services.prediction_service import (
    create_prediction
)


def get_customers(
    db: Session,
    skip=0,
    limit=100,
    search=None
):
    query = db.query(Customer)

    if search:
        search_text = f"%{search}%"

        query = query.filter(
            (
                Customer.name.ilike(search_text)
            )
            |
            (
                Customer.customer_id.ilike(search_text)
            )
            |
            (
                Customer.email.ilike(search_text)
            )
        )

    return (
        query
        .order_by(Customer.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_customer(
    db: Session,
    customer_id: int
):
    return (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )


def create_customer(
    db: Session,
    data: CustomerCreate
):
    existing = (
        db.query(Customer)
        .filter(
            Customer.customer_id
            == data.customer_id
        )
        .first()
    )

    if existing:
        raise ValueError(
            "Customer ID already exists"
        )

    customer = Customer(
        **data.model_dump()
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    create_prediction(
        db,
        customer
    )

    return customer


def update_customer(
    db: Session,
    customer: Customer,
    data: dict
):
    for key, value in data.items():

        if hasattr(customer, key):
            setattr(
                customer,
                key,
                value
            )

    db.commit()
    db.refresh(customer)

    create_prediction(
        db,
        customer
    )

    return customer


def delete_customer(
    db: Session,
    customer: Customer
):
    db.delete(customer)
    db.commit()