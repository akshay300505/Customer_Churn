import React from "react";
import PropTypes from "prop-types";
import "./EmptyState.css";

const EmptyState = ({
  title = "No data available",
  message = "There is currently no information to display.",
  actionLabel = "",
  onAction,
  icon = null,
  size = "medium",
  className = "",
}) => {
  const containerClasses = [
    "empty-state",
    `empty-state-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const defaultIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8 9H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M8 13H13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M8 17H11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );

  const handleAction = () => {
    if (typeof onAction === "function") {
      onAction();
    }
  };

  return (
    <section
      className={containerClasses}
      aria-label="Empty state"
    >
      <div className="empty-state-icon">
        {icon || defaultIcon}
      </div>

      <div className="empty-state-content">
        <h3 className="empty-state-title">
          {title}
        </h3>

        <p className="empty-state-message">
          {message}
        </p>

        {actionLabel && (
          <button
            type="button"
            className="empty-state-action"
            onClick={handleAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </section>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  icon: PropTypes.node,
  size: PropTypes.oneOf([
    "small",
    "medium",
    "large",
  ]),
  className: PropTypes.string,
};

export default EmptyState;