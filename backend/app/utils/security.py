import hashlib
import hmac
import secrets

from jose import jwt, JWTError

from app.config.settings import settings


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        120000
    )

    return (
        salt.hex()
        + "$"
        + password_hash.hex()
    )


def verify_password(
    password: str,
    stored_password: str
) -> bool:

    try:
        salt_hex, hash_hex = stored_password.split("$")

        salt = bytes.fromhex(salt_hex)

        calculated = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt,
            120000
        )

        return hmac.compare_digest(
            calculated.hex(),
            hash_hex
        )

    except Exception:
        return False


def decode_token(token: str):
    try:
        return jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
    except JWTError:
        return None