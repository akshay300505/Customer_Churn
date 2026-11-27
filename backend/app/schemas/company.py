from pydantic import BaseModel, ConfigDict


class CompanyCreate(BaseModel):
    name: str
    industry: str | None = None
    email: str | None = None
    phone: str | None = None


class CompanyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    industry: str | None
    email: str | None
    phone: str | None
    status: str