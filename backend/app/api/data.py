from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    Form,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.services.ingestion_service import (
    ingest_csv
)


router = APIRouter(
    prefix="/data",
    tags=["Data"]
)


@router.post(
    "/upload"
)
async def upload_csv(
    file: UploadFile = File(...),
    company_id: str | None = Form(default=None),
    company_name: str | None = Form(default=None),
    db: Session = Depends(get_db)
):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is required"
        )

    allowed_exts = (".csv", ".xlsx", ".xls", ".pdf")
    if not any(file.filename.lower().endswith(ext) for ext in allowed_exts):
        raise HTTPException(
            status_code=400,
            detail="Only CSV, Excel (.xlsx, .xls), and PDF files are supported"
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty"
        )

    try:
        result = ingest_csv(
            db,
            file_bytes,
            file.filename
        )

        return {
            "success": True,
            "message":
                f"{file.filename} processed successfully",
            "data": result
        }

    except Exception as exc:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail=f"CSV processing failed: {exc}"
        )