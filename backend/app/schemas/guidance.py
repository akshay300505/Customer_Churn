from pydantic import BaseModel


class GuidanceResponse(BaseModel):
    customer_id: int
    risk_level: str
    recommendations: list[dict]