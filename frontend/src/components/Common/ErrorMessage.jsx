import React from "react";
import PropTypes from "prop-types";
import "./ErrorMessage.css";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "We couldn't complete your request. Please try again.",
  retryLabel = "Try Again",
  onRetry,
  showIcon = true,
  size = "medium",
  className = "",
}) => {
  const containerClasses = [
    "error-message",
    `error-message-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleRetry = () => {
    if (typeof onRetry === "function") {
      onRetry();
    }
  };

  return (
    <section
      className={containerClasses}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <div className="error-message-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10.29 3.86L1.82 18C1.64456 18.3037 1.64289 18.6794 1.81561 18.9846C1.98834 19.2899 2.31065 19.4788 2.66 19.48H21.34C21.6894 19.4788 22.0117 19.2899 22.1844 18.9846 22.18 18L13.71 3.86C13.5348 3.56269 13.2147 3.381 12.87 3.381C12.5253 3.381 12.2052 3.56269 12.03 3.86L10.29 3.86Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M12 9V13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <circle
              cx="12"
              cy="16"
              r="0.8"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      <div className="error-message-content">
        <h3 className="error-message-title">
          {title}
        </h3>

        <p className="error-message-text">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            className="error-message-retry"
            onClick={handleRetry}
          >
            {retryLabel}
          </button>
        )}
      </div>
    </section>
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  retryLabel: PropTypes.string,
  onRetry: PropTypes.func,
  showIcon: PropTypes.bool,
  size: PropTypes.oneOf([
    "small",
    "medium",
    "large",
  ]),
  className: PropTypes.string,
};

export default ErrorMessage;