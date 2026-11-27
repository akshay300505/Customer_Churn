from pydantic import BaseModel, ConfigDict
from datetime import datetime


class DatasetResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    filename: str
    file_type: str
    rows_count: int
    valid_rows: int
    invalid_rows: int
    status: str
    checksum: str | None
    created_at: datetime