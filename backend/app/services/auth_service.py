from datetime import datetime, timedelta
from jose import jwt
from sqlalchemy.orm import Session

from app.config.settings import settings
from app.models.user import User
from app.utils.security import hash_password, verify_password


def create_user(
    db: Session,
    username: str,
    email: str,
    password: str,
    full_name: str | None = None
):
    existing = db.query(User).filter(
        User.username == username
    ).first()

    if existing:
        raise ValueError("Username already exists")

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
        full_name=full_name,
        role="admin"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    username: str,
    password: str
):
    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    return user


def create_access_token(user: User):
    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user.id),
        "username": user.username,
        "role": user.role,
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )