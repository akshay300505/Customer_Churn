import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import create_tables
from app.config.settings import settings

from app.api.auth import router as auth_router
from app.api.companies import router as companies_router
from app.api.customers import router as customers_router
from app.api.data import router as data_router
from app.api.predictions import router as predictions_router
from app.api.analytics import router as analytics_router
from app.api.explainability import router as explainability_router
from app.api.guidance import router as guidance_router
from app.api.reports import router as reports_router

from app.middleware.error_handler import (
    global_exception_handler
)

from app.middleware.logging import (
    request_logging_middleware
)


logging.basicConfig(
    level=logging.INFO,
    format=(
        "%(asctime)s | "
        "%(levelname)s | "
        "%(name)s | "
        "%(message)s"
    )
)


os.makedirs(
    settings.UPLOAD_DIR,
    exist_ok=True
)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Customer Churn Guidance "
        "Backend API"
    )
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.middleware("http")
async def logging_middleware(
    request,
    call_next
):
    return await request_logging_middleware(
        request,
        call_next
    )


app.add_exception_handler(
    Exception,
    global_exception_handler
)


app.include_router(
    auth_router,
    prefix="/api"
)

app.include_router(
    companies_router,
    prefix="/api"
)

app.include_router(
    customers_router,
    prefix="/api"
)

app.include_router(
    data_router,
    prefix="/api"
)

app.include_router(
    predictions_router,
    prefix="/api"
)

app.include_router(
    analytics_router,
    prefix="/api"
)

app.include_router(
    explainability_router,
    prefix="/api"
)

app.include_router(
    guidance_router,
    prefix="/api"
)

app.include_router(
    reports_router,
    prefix="/api"
)


from app.utils.seed_db import seed_initial_data_if_empty


@app.on_event("startup")
def startup_event():

    create_tables()
    seed_initial_data_if_empty()

    logging.info(
        "Customer Churn Guidance API started"
    )


@app.get("/")
def root():

    return {
        "success": True,
        "application":
            settings.APP_NAME,
        "version":
            settings.APP_VERSION,
        "status":
            "running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }