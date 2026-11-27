import React from "react";
import PropTypes from "prop-types";
import "./Loader.css";

const Loader = ({
  size = "medium",
  variant = "spinner",
  text = "",
  fullScreen = false,
  overlay = false,
  className = "",
}) => {
  const containerClasses = [
    "app-loader",
    `app-loader-${size}`,
    `app-loader-${variant}`,
    fullScreen ? "app-loader-fullscreen" : "",
    overlay ? "app-loader-overlay" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderLoader = () => {
    if (variant === "dots") {
      return (
        <div
          className="app-loader-dots"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          className="app-loader-pulse"
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        className="app-loader-spinner"
        aria-hidden="true"
      />
    );
  };

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading"}
    >
      <div className="app-loader-content">
        {renderLoader()}

        {text && (
          <span className="app-loader-text">
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf([
    "small",
    "medium",
    "large",
  ]),
  variant: PropTypes.oneOf([
    "spinner",
    "dots",
    "pulse",
  ]),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string,
};

export default Loader;