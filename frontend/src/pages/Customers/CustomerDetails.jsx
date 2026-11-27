import React, { useEffect, useMemo } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import useCustomers from "../../hooks/useCustomers";

import "./Customers.css";


/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (value) => {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};


const normalize = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim();
};


const getRiskClass = (risk) => {
  const normalizedRisk = normalize(risk);

  if (
    normalizedRisk === "high" ||
    normalizedRisk === "critical"
  ) {
    return "customer-risk-high";
  }

  if (
    normalizedRisk === "medium" ||
    normalizedRisk === "moderate"
  ) {
    return "customer-risk-medium";
  }

  return "customer-risk-low";
};


const getStatusClass = (status) => {
  const normalizedStatus = normalize(status)
    .replace(/\s+/g, "-");

  if (normalizedStatus === "active") {
    return "customer-status-active";
  }

  if (
    normalizedStatus === "at-risk" ||
    normalizedStatus === "atrisk"
  ) {
    return "customer-status-risk";
  }

  if (normalizedStatus === "churned") {
    return "customer-status-churned";
  }

  return "customer-status-default";
};


const getInitials = (name) => {
  const value = String(name || "Customer").trim();

  if (!value) {
    return "C";
  }

  const parts = value.split(/\s+/);

  if (parts.length === 1) {
    return parts[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};


const getCustomerId = (customer) => {
  return (
    customer?.id ||
    customer?.customerId ||
    customer?.customer_id ||
    ""
  );
};


const getCustomerName = (customer) => {
  return (
    customer?.name ||
    customer?.customerName ||
    "Customer"
  );
};


const getCustomerEmail = (customer) => {
  return (
    customer?.email ||
    customer?.customerEmail ||
    "Not specified"
  );
};


const getCustomerPhone = (customer) => {
  return (
    customer?.phone ||
    customer?.customerPhone ||
    "Not specified"
  );
};


const getCustomerCompany = (customer) => {
  return (
    customer?.companyName ||
    customer?.company ||
    "Not specified"
  );
};


const getCustomerRisk = (customer) => {
  return (
    customer?.riskLevel ||
    customer?.risk ||
    "Low"
  );
};


const getCustomerStatus = (customer) => {
  return customer?.status || "Active";
};


const getProbability = (customer) => {
  const value = Number(
    customer?.churnProbability ??
    customer?.churnRisk ??
    customer?.probability ??
    0
  );

  return Math.min(
    100,
    Math.max(0, value)
  );
};


const getRevenue = (customer) => {
  return Number(
    customer?.revenue ??
    customer?.totalRevenue ??
    0
  ) || 0;
};


const getTenure = (customer) => {
  return Number(
    customer?.tenure ??
    customer?.tenureMonths ??
    0
  ) || 0;
};


const getMonthlyCharges = (customer) => {
  return Number(
    customer?.monthlyCharges ??
    customer?.monthlyCharge ??
    0
  ) || 0;
};


const getTotalCharges = (customer) => {
  return Number(
    customer?.totalCharges ??
    customer?.totalSpent ??
    0
  ) || 0;
};


const getSupportTickets = (customer) => {
  return Number(
    customer?.supportTickets ??
    customer?.tickets ??
    0
  ) || 0;
};


/* =========================================================
   CUSTOMER DETAILS
========================================================= */

const CustomerDetails = () => {
  const { id, customerId } = useParams();

  const navigate = useNavigate();

  const routeCustomerId =
    customerId || id || "";


  const {
    customers = [],
    selectedCustomer,
    selectCustomer,
    loading = false,
    error = null,
  } = useCustomers();


  /* =======================================================
     FIND CUSTOMER
  ======================================================= */

  const customer = useMemo(() => {
    const selectedId =
      getCustomerId(selectedCustomer);

    if (
      selectedCustomer &&
      String(selectedId) ===
        String(routeCustomerId)
    ) {
      return selectedCustomer;
    }

    return customers.find(
      (item) =>
        String(
          getCustomerId(item)
        ) === String(routeCustomerId)
    );
  }, [
    selectedCustomer,
    customers,
    routeCustomerId,
  ]);


  /* =======================================================
     SELECT CUSTOMER
  ======================================================= */

  useEffect(() => {
    if (
      customer &&
      typeof selectCustomer === "function"
    ) {
      selectCustomer(customer);
    }
  }, [
    customer,
    selectCustomer,
  ]);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading && !customer) {
    return (
      <div className="customers-page">

        <div className="customer-details-loading">

          <span className="customers-loader" />

          <p>
            Loading customer details...
          </p>

        </div>

      </div>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error && !customer) {
    return (
      <div className="customers-page">

        <div
          className="customers-alert customers-alert-error"
          role="alert"
        >
          {typeof error === "string"
            ? error
            : "Unable to load customer details."}
        </div>


        <Link
          to="/customers"
          className="customers-back-link"
        >
          ← Back to Customers
        </Link>

      </div>
    );
  }


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!customer) {
    return (
      <div className="customers-page">

        <div className="customer-not-found">

          <div className="customer-not-found-icon">
            ?
          </div>

          <h1>
            Customer Not Found
          </h1>

          <p>
            The requested customer could not
            be found in the current customer records.
          </p>

          <Link
            to="/customers"
            className="customers-primary-button"
          >
            Back to Customers
          </Link>

        </div>

      </div>
    );
  }


  /* =======================================================
     CUSTOMER DATA
  ======================================================= */

  const idValue =
    getCustomerId(customer);

  const name =
    getCustomerName(customer);

  const email =
    getCustomerEmail(customer);

  const phone =
    getCustomerPhone(customer);

  const company =
    getCustomerCompany(customer);

  const customerStatus =
    getCustomerStatus(customer);

  const risk =
    getCustomerRisk(customer);

  const probability =
    getProbability(customer);

  const revenue =
    getRevenue(customer);

  const tenure =
    getTenure(customer);

  const monthlyCharges =
    getMonthlyCharges(customer);

  const totalCharges =
    getTotalCharges(customer);

  const contract =
    customer.contract ||
    customer.contractType ||
    "Not specified";

  const paymentMethod =
    customer.paymentMethod ||
    "Not specified";

  const supportTickets =
    getSupportTickets(customer);

  const lastUpdated =
    customer.lastUpdated ||
    customer.updatedAt ||
    "Recently";


  /* =======================================================
     RECOMMENDATION
  ======================================================= */

  const recommendation =
    customer.recommendation ||
    customer.recommendedAction ||
    (
      probability >= 70
        ? "Prioritize this customer for immediate retention outreach."
        : probability >= 40
        ? "Monitor customer activity and consider a targeted retention campaign."
        : "Continue regular engagement and monitor customer health."
    );


  const riskDescription =
    probability >= 70
      ? "Customer requires immediate attention."
      : probability >= 40
      ? "Customer should be monitored closely."
      : "Customer currently shows relatively low churn risk.";


  /* =======================================================
     FACTOR VALUES
  ======================================================= */

  const contractRisk =
    normalize(contract) ===
      "month-to-month"
      ? "High"
      : "Low";


  const supportRisk =
    supportTickets > 5
      ? "High"
      : supportTickets > 2
      ? "Medium"
      : "Low";


  const tenureLabel =
    tenure < 6
      ? "New"
      : tenure < 24
      ? "Established"
      : "Long-term";


  /* =======================================================
     ANALYTICS NAVIGATION
  ======================================================= */

  const handleAnalytics = () => {
    if (!idValue) {
      navigate(
        "/analytics/customers"
      );
      return;
    }

    navigate(
      `/analytics/customers?customerId=${encodeURIComponent(
        idValue
      )}`
    );
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="customers-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="customer-details-header">

        <div>

          <Link
            to="/customers"
            className="customers-back-link"
          >
            ← Back to Customers
          </Link>


          <div className="customer-title-row">

            <div className="customer-large-avatar">
              {getInitials(name)}
            </div>


            <div>

              <span className="customers-eyebrow">
                CUSTOMER PROFILE
              </span>

              <h1>
                {name}
              </h1>

              <p>
                {email}
              </p>

            </div>

          </div>

        </div>


        <div className="customer-details-actions">

          <span
            className={`customer-status-badge ${getStatusClass(
              customerStatus
            )}`}
          >
            {customerStatus}
          </span>

        </div>

      </header>


      {/* ===================================================
          RISK BANNER
      =================================================== */}

      <section
        className={`customer-risk-banner ${getRiskClass(
          risk
        )}`}
      >

        <div className="customer-risk-banner-main">

          <div>

            <span>
              AI CHURN PREDICTION
            </span>

            <h2>
              {probability.toFixed(0)}%
            </h2>

            <p>
              {riskDescription}
            </p>

          </div>


          <div className="customer-risk-meter">

            <div className="customer-risk-meter-track">

              <span
                style={{
                  width: `${probability}%`,
                }}
              />

            </div>


            <div className="customer-risk-meter-labels">

              <span>
                Low
              </span>

              <span>
                Medium
              </span>

              <span>
                High
              </span>

            </div>

          </div>

        </div>


        <span
          className={`customer-risk-badge ${getRiskClass(
            risk
          )}`}
        >
          {risk} Risk
        </span>

      </section>


      {/* ===================================================
          METRICS
      =================================================== */}

      <section className="customer-details-metrics">

        <div className="customer-detail-metric-card">

          <span>
            Customer Revenue
          </span>

          <strong>
            {formatCurrency(revenue)}
          </strong>

          <small>
            Total tracked value
          </small>

        </div>


        <div className="customer-detail-metric-card">

          <span>
            Tenure
          </span>

          <strong>
            {tenure}
          </strong>

          <small>
            Months
          </small>

        </div>


        <div className="customer-detail-metric-card">

          <span>
            Monthly Charges
          </span>

          <strong>
            {formatCurrency(
              monthlyCharges
            )}
          </strong>

          <small>
            Current monthly value
          </small>

        </div>


        <div className="customer-detail-metric-card">

          <span>
            Support Tickets
          </span>

          <strong>
            {supportTickets}
          </strong>

          <small>
            Recorded tickets
          </small>

        </div>

      </section>


      {/* ===================================================
          DETAILS GRID
      =================================================== */}

      <section className="customer-details-grid">

        {/* =================================================
            CUSTOMER INFORMATION
        ================================================= */}

        <div className="customer-details-card">

          <div className="customer-details-card-header">

            <div>

              <h2>
                Customer Information
              </h2>

              <span>
                Basic customer profile
              </span>

            </div>

          </div>


          <div className="customer-information-list">

            <div className="customer-information-row">

              <span>
                Customer Name
              </span>

              <strong>
                {name}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Email
              </span>

              {email !== "Not specified" ? (
                <a
                  href={`mailto:${email}`}
                  className="customer-link"
                >
                  {email}
                </a>
              ) : (
                <strong>
                  {email}
                </strong>
              )}

            </div>


            <div className="customer-information-row">

              <span>
                Phone
              </span>

              {phone !== "Not specified" ? (
                <a
                  href={`tel:${phone}`}
                  className="customer-link"
                >
                  {phone}
                </a>
              ) : (
                <strong>
                  {phone}
                </strong>
              )}

            </div>


            <div className="customer-information-row">

              <span>
                Company
              </span>

              <strong>
                {company}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Customer ID
              </span>

              <strong>
                {idValue || "—"}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            SUBSCRIPTION
        ================================================= */}

        <div className="customer-details-card">

          <div className="customer-details-card-header">

            <div>

              <h2>
                Subscription
              </h2>

              <span>
                Customer account details
              </span>

            </div>

          </div>


          <div className="customer-information-list">

            <div className="customer-information-row">

              <span>
                Contract
              </span>

              <strong>
                {contract}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Payment Method
              </span>

              <strong>
                {paymentMethod}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Monthly Charges
              </span>

              <strong>
                {formatCurrency(
                  monthlyCharges
                )}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Total Charges
              </span>

              <strong>
                {formatCurrency(
                  totalCharges
                )}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Tenure
              </span>

              <strong>
                {tenure} months
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            CHURN FACTORS
        ================================================= */}

        <div className="customer-details-card">

          <div className="customer-details-card-header">

            <div>

              <h2>
                Churn Risk Factors
              </h2>

              <span>
                AI prediction indicators
              </span>

            </div>

          </div>


          <div className="customer-risk-factor-list">

            <div className="customer-risk-factor">

              <div>

                <span>
                  Churn Probability
                </span>

                <strong>
                  {probability.toFixed(0)}%
                </strong>

              </div>


              <div className="customer-factor-progress">

                <span
                  style={{
                    width: `${probability}%`,
                  }}
                />

              </div>

            </div>


            <div className="customer-risk-factor">

              <div>

                <span>
                  Contract Risk
                </span>

                <strong>
                  {contractRisk}
                </strong>

              </div>

            </div>


            <div className="customer-risk-factor">

              <div>

                <span>
                  Support Activity
                </span>

                <strong>
                  {supportRisk}
                </strong>

              </div>

            </div>


            <div className="customer-risk-factor">

              <div>

                <span>
                  Customer Tenure
                </span>

                <strong>
                  {tenureLabel}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            RECOMMENDATION
        ================================================= */}

        <div className="customer-details-card customer-recommendation-card">

          <div className="customer-details-card-header">

            <div>

              <h2>
                Recommended Action
              </h2>

              <span>
                AI-powered retention guidance
              </span>

            </div>

          </div>


          <div className="customer-recommendation-content">

            <div className="customer-recommendation-icon">
              💡
            </div>


            <div>

              <strong>
                Retention Recommendation
              </strong>

              <p>
                {recommendation}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            ACCOUNT ACTIVITY
        ================================================= */}

        <div className="customer-details-card">

          <div className="customer-details-card-header">

            <div>

              <h2>
                Account Activity
              </h2>

              <span>
                Latest customer information
              </span>

            </div>

          </div>


          <div className="customer-information-list">

            <div className="customer-information-row">

              <span>
                Status
              </span>

              <span
                className={`customer-status-badge ${getStatusClass(
                  customerStatus
                )}`}
              >
                {customerStatus}
              </span>

            </div>


            <div className="customer-information-row">

              <span>
                Risk Level
              </span>

              <span
                className={`customer-risk-badge ${getRiskClass(
                  risk
                )}`}
              >
                {risk}
              </span>

            </div>


            <div className="customer-information-row">

              <span>
                Last Updated
              </span>

              <strong>
                {lastUpdated}
              </strong>

            </div>


            <div className="customer-information-row">

              <span>
                Customer Revenue
              </span>

              <strong>
                {formatCurrency(revenue)}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            NOTES
        ================================================= */}

        <div className="customer-details-card">

          <div className="customer-details-card-header">

            <div>

              <h2>
                Customer Notes
              </h2>

              <span>
                Additional information
              </span>

            </div>

          </div>


          <p className="customer-notes">
            {customer.notes ||
              customer.description ||
              "No additional notes have been added for this customer."}
          </p>

        </div>

      </section>


      {/* ===================================================
          FOOTER ACTIONS
      =================================================== */}

      <footer className="customer-details-footer">

        <Link
          to="/customers"
          className="customer-secondary-button"
        >
          ← All Customers
        </Link>


        <button
          type="button"
          className="customer-primary-button"
          onClick={handleAnalytics}
        >
          View Customer Analytics →
        </button>

      </footer>

    </div>
  );
};


export default CustomerDetails;