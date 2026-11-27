import React from "react";
import {
  RotateCcw,
  User,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/**
 * RecoveryCard
 *
 * Displays customer recovery information and
 * recommended recovery action.
 *
 * Props:
 * - recovery: recovery object
 * - onAction: callback for recovery action
 */

const RecoveryCard = ({ recovery = {}, onAction }) => {
  const {
    id = "REC-0001",
    customerName = "Customer",
    action = "Personalized Retention Offer",
    reason = "High churn probability",
    probability = 75,
    status = "Pending",
    expectedRecovery = 65,
  } = recovery;

  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "recovery-completed";

      case "in progress":
      case "inprogress":
        return "recovery-progress";

      case "failed":
        return "recovery-failed";

      case "pending":
      default:
        return "recovery-pending";
    }
  };

  const getRiskClass = () => {
    if (probability >= 70) {
      return "risk-high";
    }

    if (probability >= 40) {
      return "risk-medium";
    }

    return "risk-low";
  };

  return (
    <article className="recovery-card">

      {/* Header */}
      <div className="recovery-card-header">

        <div className="recovery-title">

          <div className="recovery-icon">
            <RotateCcw size={21} />
          </div>

          <div>
            <h3>{action}</h3>
            <span>{id}</span>
          </div>

        </div>

        <span className={`recovery-status ${getStatusClass()}`}>
          {status}
        </span>

      </div>

      {/* Customer */}
      <div className="recovery-customer">

        <User size={18} />

        <div>
          <span>Customer</span>
          <strong>{customerName}</strong>
        </div>

      </div>

      {/* Reason */}
      <div className="recovery-reason">

        <Target size={18} />

        <div>
          <span>Recovery Reason</span>
          <p>{reason}</p>
        </div>

      </div>

      {/* Metrics */}
      <div className="recovery-metrics">

        <div className="recovery-metric">

          <div className="metric-icon">
            <TrendingUp size={17} />
          </div>

          <div>
            <span>Churn Risk</span>

            <strong className={getRiskClass()}>
              {probability}%
            </strong>
          </div>

        </div>

        <div className="recovery-metric">

          <div className="metric-icon">
            <CheckCircle2 size={17} />
          </div>

          <div>
            <span>Expected Recovery</span>

            <strong className="recovery-percentage">
              {expectedRecovery}%
            </strong>
          </div>

        </div>

      </div>

      {/* Recovery Progress */}
      <div className="recovery-progress-section">

        <div className="recovery-progress-header">
          <span>Recovery Potential</span>
          <strong>{expectedRecovery}%</strong>
        </div>

        <div className="recovery-progress">
          <div
            className="recovery-progress-fill"
            style={{
              width: `${Math.min(
                Math.max(expectedRecovery, 0),
                100
              )}%`,
            }}
          />
        </div>

      </div>

      {/* Action */}
      <div className="recovery-card-footer">

        <span className="recovery-footer-text">
          Recommended action
        </span>

        <button
          type="button"
          className="recovery-action-button"
          onClick={() => onAction?.(recovery)}
        >
          <span>Take Action</span>
          <ArrowRight size={16} />
        </button>

      </div>

    </article>
  );
};

export default RecoveryCard;