import logging
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.company import Company
from app.models.customer import Customer
from app.models.dataset import Dataset
from app.services.prediction_service import create_prediction

logger = logging.getLogger(__name__)

INITIAL_COMPANIES = [
    {
        "name": "CloudScale SaaS",
        "industry": "Enterprise Software",
        "email": "enterprise@cloudscalesaas.com",
        "phone": "+1-800-555-0199",
        "status": "Active"
    },
    {
        "name": "Netflix Entertainment",
        "industry": "Media Streaming",
        "email": "partnerships@netflix.com",
        "phone": "+1-888-638-3549",
        "status": "Active"
    },
    {
        "name": "Spotify Global",
        "industry": "Audio Streaming",
        "email": "enterprise@spotify.com",
        "phone": "+46-8-555-1234",
        "status": "Active"
    },
    {
        "name": "Apex Telecom & Fiber",
        "industry": "Telecommunications",
        "email": "support@apextelecom.net",
        "phone": "+1-800-273-9821",
        "status": "Active"
    }
]

SAMPLE_CUSTOMERS_DATA = [
    {"customer_id": "CUST-8021", "name": "Rahul Kumar", "monthly_charges": 129.99, "tenure": 8, "churn": True, "contract": "Month-to-month", "tech_support": "No", "online_security": "No", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8045", "name": "Priya Sharma", "monthly_charges": 89.99, "tenure": 14, "churn": True, "contract": "Month-to-month", "tech_support": "No", "online_security": "Yes", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8073", "name": "Arjun Mehta", "monthly_charges": 59.99, "tenure": 5, "churn": False, "contract": "One year", "tech_support": "Yes", "online_security": "Yes", "internet_service": "DSL"},
    {"customer_id": "CUST-8089", "name": "Sneha Reddy", "monthly_charges": 149.99, "tenure": 22, "churn": False, "contract": "Two year", "tech_support": "Yes", "online_security": "Yes", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8102", "name": "Vikram Singh", "monthly_charges": 49.99, "tenure": 31, "churn": False, "contract": "Two year", "tech_support": "Yes", "online_security": "No", "internet_service": "DSL"},
    {"customer_id": "CUST-8118", "name": "Ananya Rao", "monthly_charges": 79.99, "tenure": 18, "churn": False, "contract": "One year", "tech_support": "No", "online_security": "Yes", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8125", "name": "Dev Patel", "monthly_charges": 249.99, "tenure": 3, "churn": True, "contract": "Month-to-month", "tech_support": "No", "online_security": "No", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8142", "name": "Meera Nair", "monthly_charges": 84.50, "tenure": 11, "churn": False, "contract": "One year", "tech_support": "Yes", "online_security": "Yes", "internet_service": "DSL"},
    {"customer_id": "CUST-8159", "name": "Karan Johar", "monthly_charges": 39.99, "tenure": 2, "churn": True, "contract": "Month-to-month", "tech_support": "No", "online_security": "No", "internet_service": "DSL"},
    {"customer_id": "CUST-8176", "name": "Rohan Gupta", "monthly_charges": 139.99, "tenure": 29, "churn": False, "contract": "Two year", "tech_support": "Yes", "online_security": "Yes", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8193", "name": "Pooja Hegde", "monthly_charges": 299.99, "tenure": 16, "churn": False, "contract": "One year", "tech_support": "Yes", "online_security": "Yes", "internet_service": "Fiber optic"},
    {"customer_id": "CUST-8210", "name": "Amitabh Verma", "monthly_charges": 94.99, "tenure": 7, "churn": True, "contract": "Month-to-month", "tech_support": "No", "online_security": "No", "internet_service": "Fiber optic"}
]

def seed_initial_data_if_empty():
    db: Session = SessionLocal()
    try:
        existing_companies = db.query(Company).count()
        if existing_companies == 0:
            logger.info("Database has no companies. Seeding initial companies...")
            company_objs = []
            for comp_data in INITIAL_COMPANIES:
                company = Company(**comp_data)
                db.add(company)
                company_objs.append(company)
            db.commit()

        default_company = db.query(Company).first()
        existing_customers = db.query(Customer).count()
        if existing_customers == 0 and default_company:
            logger.info("Database has no customers. Seeding initial customers...")
            dataset = Dataset(
                filename="initial_portfolio.csv",
                file_type="csv",
                rows_count=len(SAMPLE_CUSTOMERS_DATA),
                valid_rows=len(SAMPLE_CUSTOMERS_DATA),
                invalid_rows=0,
                status="Processed"
            )
            db.add(dataset)
            db.commit()

            for cdata in SAMPLE_CUSTOMERS_DATA:
                cust = Customer(
                    company_id=default_company.id,
                    total_charges=cdata["monthly_charges"] * max(1, cdata["tenure"]),
                    **cdata
                )
                db.add(cust)
                db.commit()
                db.refresh(cust)
                create_prediction(db, cust)

            logger.info("Successfully seeded customers & computed predictions into SQLite DB.")
    except Exception as e:
        logger.warning(f"Seed initial data warning: {e}")
        db.rollback()
    finally:
        db.close()

