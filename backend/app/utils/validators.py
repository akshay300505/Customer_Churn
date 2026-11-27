import pandas as pd


REQUIRED_CUSTOMER_COLUMNS = [
    "customer_id"
]


def validate_customer_dataframe(
    dataframe: pd.DataFrame
):
    errors = []

    if dataframe.empty:
        errors.append("CSV file contains no rows")

        return False, errors

    columns = {
        str(column).lower().strip()
        for column in dataframe.columns
    }

    if not any(
        column in columns
        for column in [
            "customer_id",
            "customerid",
            "customer id"
        ]
    ):
        errors.append(
            "Customer ID column is missing"
        )

    return len(errors) == 0, errors


def validate_email(email):
    if not email:
        return True

    return (
        "@" in email
        and "." in email.split("@")[-1]
    )


def validate_positive_number(value):
    try:
        return float(value) >= 0
    except Exception:
        return False