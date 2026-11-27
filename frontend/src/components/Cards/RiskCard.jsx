import React from "react";
import {
  AlertTriangle,
  User,
  TrendingUp,
  Clock3,
  ArrowRight,
} from "lucide-react";

/**
 * RiskCard
 *
 * Displays a customer who has been identified
 * as being at risk of churn.
 *
 * Props:
 * - customer: customer risk object
 * - onView: callback for viewing customer details
 */

const RiskCard = ({ customer = {}, onView }) => {
  const {
    id = "CUS-0001",
    name = "Customer",
    churnProbability = 75,
    riskLevel = "High",
    reason = "Reduced engagement",
    lastActive = "2 days ago",
    trend = "Increasing",
  } = customer;

  const getRiskClass = () => {
    switch (riskLevel?.toLowerCase()) {
      case "critical":
        return "risk-critical";

      case "high":
        return "risk-high";

      case "medium":
      case "moderate":
        return "risk-medium";

      case "low":
        return "risk-low";

      default:
        return "risk-medium";
    }
  };

  const getTrendClass = () => {
    switch (trend?.toLowerCase()) {
      case "increasing":
      case "up":
        return "trend-up";

      case "decreasing":
      case "down":
        return "trend-down";

      default:
        return "trend-neutral";
    }
  };

  return (
    <article className={`risk-card ${getRiskClass()}`}>

      {/* Top section */}
      <div className="risk-card-header">

        <div className="risk-customer">

          <div className={`risk-icon ${getRiskClass()}`}>
            <AlertTriangle size={21} />
          </div>

          <div>
            <h3>{name}</h3>
            <span>{id}</span>
          </div>

        </div>

        <span className={`risk-level-badge ${getRiskClass()}`}>
          {riskLevel} Risk
        </span>

      </div>

      {/* Probability */}
      <div className="risk-probability">

        <div className="risk-probability-header">
          <span>Churn Probability</span>

          <strong>
            {churnProbability}%
          </strong>
        </div>

        <div className="risk-progress">

          <div
            className={`risk-progress-fill ${getRiskClass()}`}
            style={{
              width: `${Math.min(
                Math.max(churnProbability, 0),
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Risk Details */}
      <div className="risk-details">

        <div className="risk-detail-item">

          <div className="risk-detail-icon">
            <TrendingUp size={17} />
          </div>

          <div>
            <span>Risk Trend</span>

            <strong className={getTrendClass()}>
              {trend}
            </strong>
          </div>

        </div>

        <div className="risk-detail-item">

          <div className="risk-detail-icon">
            <Clock3 size={17} />
          </div>

          <div>
            <span>Last Active</span>

            <strong>
              {lastActive}
            </strong>
          </div>

        </div>

      </div>

      {/* Reason */}
      <div className="risk-reason">

        <span>Primary Reason</span>

        <p>{reason}</p>

      </div>

      {/* Footer */}
      <div className="risk-card-footer">

        <div className="risk-customer-label">

          <User size={16} />

          <span>
            Customer at risk
          </span>

        </div>

        <button
          type="button"
          className="risk-view-button"
          onClick={() => onView?.(customer)}
        >
          <span>View</span>
          <ArrowRight size={15} />
        </button>

      </div>

    </article>
  );
};

export default RiskCard;