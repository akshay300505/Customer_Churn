from app.utils.validators import (
    validate_customer_dataframe
)


def validate_dataframe(dataframe):
    valid, errors = validate_customer_dataframe(
        dataframe
    )

    return {
        "valid": valid,
        "errors": errors,
        "rows": len(dataframe)
    }