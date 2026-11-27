from pydantic import BaseModel, ConfigDict
from datetime import datetime


class PredictionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    customer_id: int
    churn_probability: float
    risk_level: str
    prediction: str
    confidence: float
    model_version: str
    created_at: datetime


class PredictionRequest(BaseModel):
    customer_id: int