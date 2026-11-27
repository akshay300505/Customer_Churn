from app.models.customer import Customer


def explain_prediction(customer, probability):

    factors = []

    if customer.tenure <= 6:
        factors.append({
            "factor": "Short Tenure",
            "impact": "High",
            "description":
                "Customer has been with the company for a short period."
        })

    if customer.monthly_charges >= 100:
        factors.append({
            "factor": "High Monthly Charges",
            "impact": "High",
            "description":
                "Monthly charges are relatively high."
        })

    if customer.contract:
        if "month" in customer.contract.lower():
            factors.append({
                "factor": "Month-to-Month Contract",
                "impact": "High",
                "description":
                    "Month-to-month contracts generally have higher churn risk."
            })

    if customer.tech_support:
        if customer.tech_support.lower() == "no":
            factors.append({
                "factor": "No Tech Support",
                "impact": "Medium",
                "description":
                    "Customer does not have technical support."
            })

    if customer.online_security:
        if customer.online_security.lower() == "no":
            factors.append({
                "factor": "No Online Security",
                "impact": "Medium",
                "description":
                    "Customer does not have online security."
            })

    if not factors:
        factors.append({
            "factor": "Stable Customer Profile",
            "impact": "Low",
            "description":
                "No major churn indicators were detected."
        })

    return {
        "customerId": customer.customer_id,
        "probability": probability,
        "factors": factors
    }