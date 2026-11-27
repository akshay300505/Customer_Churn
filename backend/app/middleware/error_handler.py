import logging

from fastapi import Request
from fastapi.responses import JSONResponse


logger = logging.getLogger("customer-churn")


async def global_exception_handler(
    request: Request,
    exc: Exception
):
    logger.exception(
        "Unhandled error: %s",
        exc
    )

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
            "detail": str(exc)
        }
    )