import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_NAME: str = os.getenv(
        "APP_NAME",
        "Customer Churn Guidance API"
    )

    APP_VERSION: str = os.getenv(
        "APP_VERSION",
        "1.0.0"
    )

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./customer_churn.db"
    )

    SECRET_KEY: str = os.getenv(
        "SECRET_KEY",
        "customer-churn-guidance-secret-key-change-this"
    )

    ALGORITHM: str = os.getenv(
        "ALGORITHM",
        "HS256"
    )

    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "1440"
        )
    )

    FRONTEND_URL: str = os.getenv(
        "FRONTEND_URL",
        "http://localhost:5173"
    )

    UPLOAD_DIR: str = os.getenv(
        "UPLOAD_DIR",
        "uploads"
    )


settings = Settings()