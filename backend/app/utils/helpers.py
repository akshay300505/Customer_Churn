from datetime import datetime
import re


def clean_string(value):
    if value is None:
        return None

    return str(value).strip()


def normalize_column_name(name: str):
    name = str(name).strip().lower()

    name = re.sub(
        r"[^a-z0-9]+",
        "_",
        name
    )

    return name.strip("_")


def to_float(value, default=0.0):
    try:
        if value is None or str(value).strip() == "":
            return default

        return float(
            str(value)
            .replace(",", "")
            .strip()
        )

    except Exception:
        return default


def to_int(value, default=0):
    try:
        if value is None or str(value).strip() == "":
            return default

        return int(float(value))

    except Exception:
        return default


def to_bool(value):
    if isinstance(value, bool):
        return value

    if value is None:
        return False

    return str(value).strip().lower() in {
        "yes",
        "true",
        "1",
        "y",
        "t"
    }


def risk_from_probability(probability: float):
    if probability >= 70:
        return "High"

    if probability >= 40:
        return "Medium"

    return "Low"


def utc_now():
    return datetime.utcnow()