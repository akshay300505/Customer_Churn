from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

from app.services.customer_service import (
    get_customers,
    get_customer,
    create_customer,
    update_customer,
    delete_customer
)


router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get(
    "",
    response_model=list[CustomerResponse]
)
def list_customers(
    search: str | None = Query(
        default=None
    ),
    skip: int = 0,
    limit: int = 1000,
    db: Session = Depends(get_db)
):

    return get_customers(
        db,
        skip,
        limit,
        search
    )


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def customer_details(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = get_customer(
        db,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@router.post(
    "",
    response_model=CustomerResponse
)
def add_customer(
    data: CustomerCreate,
    db: Session = Depends(get_db)
):

    try:
        return create_customer(
            db,
            data
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        )


@router.put(
    "/{customer_id}",
    response_model=CustomerResponse
)
def edit_customer(
    customer_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    customer = get_customer(
        db,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return update_customer(
        db,
        customer,
        data
    )


@router.delete(
    "/{customer_id}"
)
def remove_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = get_customer(
        db,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    delete_customer(
        db,
        customer
    )

    return {
        "success": True,
        "message": "Customer deleted successfully"
    }