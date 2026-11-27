from pydantic import BaseModel, ConfigDict


class CustomerCreate(BaseModel):
    customer_id: str
    name: str = "Unknown Customer"
    email: str | None = None
    phone: str | None = None
    gender: str | None = None
    age: int | None = None
    senior_citizen: bool = False
    partner: bool = False
    dependents: bool = False
    tenure: int = 0
    contract: str | None = None
    payment_method: str | None = None
    monthly_charges: float = 0
    total_charges: float = 0
    internet_service: str | None = None
    tech_support: str | None = None
    online_security: str | None = None
    paperless_billing: str | None = None
    churn: bool = False


class CustomerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    customer_id: str
    name: str
    email: str | None
    phone: str | None
    gender: str | None
    age: int | None
    senior_citizen: bool
    partner: bool
    dependents: bool
    tenure: int
    contract: str | None
    payment_method: str | None
    monthly_charges: float
    total_charges: float
    internet_service: str | None
    tech_support: str | None
    online_security: str | None
    paperless_billing: str | None
    churn: bool