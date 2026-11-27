import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children = "Button",
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  onClick,
  className = "",
  ariaLabel,
}) => {
  const buttonClasses = [
    "app-button",
    `app-button-${variant}`,
    `app-button-${size}`,
    fullWidth ? "app-button-full-width" : "",
    loading ? "app-button-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span
            className="app-button-spinner"
            aria-hidden="true"
          />

          <span className="app-button-loading-text">
            Loading...
          </span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span
              className="app-button-icon app-button-icon-left"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <span className="app-button-content">
            {children}
          </span>

          {icon && iconPosition === "right" && (
            <span
              className="app-button-icon app-button-icon-right"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    "button",
    "submit",
    "reset",
  ]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "outline",
    "ghost",
  ]),
  size: PropTypes.oneOf([
    "small",
    "medium",
    "large",
  ]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf([
    "left",
    "right",
  ]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;