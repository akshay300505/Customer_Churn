import React from "react";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Activity,
  ArrowRight,
} from "lucide-react";

/**
 * CustomerCard
 *
 * Displays basic customer information along with
 * current activity/churn status.
 *
 * Props:
 * - customer: customer object
 * - onView: callback when View Details is clicked
 */

const CustomerCard = ({ customer = {}, onView }) => {
  const {
    id = "CUS-0001",
    name = "Unknown Customer",
    email = "customer@example.com",
    phone = "Not available",
    plan = "Standard",
    status = "Active",
    lastActive = "Recently",
    joinedDate = "Not available",
    activity = "Medium",
    churnProbability = 0,
  } = customer;

  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case "active":
        return "status-active";

      case "at risk":
      case "atrisk":
        return "status-warning";

      case "churned":
        return "status-danger";

      case "recovered":
        return "status-success";

      default:
        return "status-neutral";
    }
  };

  const getActivityClass = () => {
    switch (activity?.toLowerCase()) {
      case "high":
        return "activity-high";

      case "medium":
        return "activity-medium";

      case "low":
        return "activity-low";

      default:
        return "activity-medium";
    }
  };

  const getRiskClass = () => {
    if (churnProbability >= 70) {
      return "risk-high";
    }

    if (churnProbability >= 40) {
      return "risk-medium";
    }

    return "risk-low";
  };

  return (
    <article className="customer-card">
      {/* Header */}
      <div className="customer-card-header">
        <div className="customer-profile">
          <div className="customer-avatar">
            <User size={22} />
          </div>

          <div className="customer-title">
            <h3>{name}</h3>
            <span>{id}</span>
          </div>
        </div>

        <span className={`status-badge ${getStatusClass()}`}>
          {status}
        </span>
      </div>

      {/* Customer Information */}
      <div className="customer-card-body">

        {/* Email */}
        <div className="customer-info-row">
          <Mail size={17} />

          <div>
            <span className="info-label">Email</span>
            <p>{email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="customer-info-row">
          <Phone size={17} />

          <div>
            <span className="info-label">Phone</span>
            <p>{phone}</p>
          </div>
        </div>

        {/* Plan */}
        <div className="customer-info-row">
          <Activity size={17} />

          <div>
            <span className="info-label">Plan</span>
            <p>{plan}</p>
          </div>
        </div>

        {/* Joined Date */}
        <div className="customer-info-row">
          <CalendarDays size={17} />

          <div>
            <span className="info-label">Joined</span>
            <p>{joinedDate}</p>
          </div>
        </div>

      </div>

      {/* Activity / Risk */}
      <div className="customer-card-metrics">

        <div className="customer-metric">
          <span>Last Active</span>
          <strong>{lastActive}</strong>
        </div>

        <div className="customer-metric">
          <span>Activity</span>

          <strong className={getActivityClass()}>
            {activity}
          </strong>
        </div>

        <div className="customer-metric">
          <span>Churn Risk</span>

          <strong className={getRiskClass()}>
            {churnProbability}%
          </strong>
        </div>

      </div>

      {/* Footer */}
      <div className="customer-card-footer">

        <div className="churn-progress-container">
          <div className="churn-progress-label">
            <span>Churn Probability</span>
            <strong>{churnProbability}%</strong>
          </div>

          <div className="churn-progress">
            <div
              className={`churn-progress-fill ${getRiskClass()}`}
              style={{
                width: `${Math.min(
                  Math.max(churnProbability, 0),
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          className="card-action-button"
          onClick={() => onView?.(customer)}
        >
          <span>View Details</span>
          <ArrowRight size={16} />
        </button>

      </div>
    </article>
  );
};

export default CustomerCard;