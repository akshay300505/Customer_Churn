import React from "react";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <section className="dashboard-overview">

      <div className="dashboard-overview-header">
        <div>
          <span className="dashboard-eyebrow">
            BUSINESS OVERVIEW
          </span>

          <h1>Customer Churn Overview</h1>

          <p>
            Get a quick overview of customer activity,
            churn risk, revenue exposure, and prediction
            insights.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="dashboard-primary-button"
        >
          Open Dashboard
        </Link>
      </div>

      <div className="dashboard-overview-grid">

        <div className="dashboard-overview-card">
          <span className="overview-icon">👥</span>

          <div>
            <h3>Customer Intelligence</h3>

            <p>
              Analyze customer behavior and identify
              customers who may be likely to churn.
            </p>
          </div>

          <Link to="/customers">
            Explore Customers →
          </Link>
        </div>

        <div className="dashboard-overview-card">
          <span className="overview-icon">◉</span>

          <div>
            <h3>Churn Predictions</h3>

            <p>
              Review AI-generated churn probabilities
              and risk classifications.
            </p>
          </div>

          <Link to="/predictions">
            View Predictions →
          </Link>
        </div>

        <div className="dashboard-overview-card">
          <span className="overview-icon">✦</span>

          <div>
            <h3>Explainable AI</h3>

            <p>
              Understand the factors influencing churn
              predictions for individual customers.
            </p>
          </div>

          <Link to="/explainability">
            View Explainability →
          </Link>
        </div>

        <div className="dashboard-overview-card">
          <span className="overview-icon">✓</span>

          <div>
            <h3>Retention Guidance</h3>

            <p>
              Turn churn predictions into practical
              customer retention recommendations.
            </p>
          </div>

          <Link to="/guidance">
            View Guidance →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Overview;