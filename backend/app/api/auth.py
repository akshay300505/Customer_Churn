from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse
)

from app.services.auth_service import (
    authenticate_user,
    create_access_token,
    create_user
)

from app.middleware.auth_middleware import (
    get_current_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):

    try:
        return create_user(
            db,
            data.username,
            data.email,
            data.password,
            data.full_name
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        )


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        data.username,
        data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        user
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }


@router.get(
    "/me",
    response_model=UserResponse
)
def me(
    current_user=Depends(
        get_current_user
    )
):
    return current_user