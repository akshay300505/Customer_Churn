import React from "react";
import {
  Users,
  UserCheck,
  UserMinus,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/**
 * StatCard
 *
 * Reusable KPI card for the Customer Churn Guidance dashboard.
 *
 * Props:
 * - title        : Card title
 * - value        : Main statistic value
 * - subtitle     : Small description below the value
 * - icon         : Icon component or icon name
 * - trend        : Percentage/value showing change
 * - trendLabel   : Text describing the trend
 * - trendType    : "up" | "down" | "neutral"
 * - variant      : "primary" | "success" | "warning" | "danger" | "info"
 * - loading      : Shows loading state
 * - onClick      : Optional card click handler
 */

const iconMap = {
  customers: Users,
  users: Users,
  active: UserCheck,
  churned: UserMinus,
  churn: UserMinus,
  risk: AlertTriangle,
  "at-risk": AlertTriangle,
  growth: TrendingUp,
  recovery: Activity,
  default: Activity,
};

const StatCard = ({
  title = "Total Customers",
  value = "0",
  subtitle = "Customers",
  icon = "customers",
  trend = null,
  trendLabel = "from previous period",
  trendType = "neutral",
  variant = "primary",
  loading = false,
  onClick,
}) => {
  /**
   * Select icon.
   *
   * The component accepts either:
   * - icon="customers"
   * - icon={Users}
   */
  const IconComponent =
    typeof icon === "string"
      ? iconMap[icon.toLowerCase()] || iconMap.default
      : icon || iconMap.default;

  /**
   * Automatically determine trend style
   * if trendType is not explicitly provided.
   */
  const normalizedTrendType =
    trendType !== "neutral"
      ? trendType
      : typeof trend === "number"
      ? trend > 0
        ? "up"
        : trend < 0
        ? "down"
        : "neutral"
      : "neutral";

  const getTrendClass = () => {
    switch (normalizedTrendType) {
      case "up":
      case "positive":
        return "stat-trend-up";

      case "down":
      case "negative":
        return "stat-trend-down";

      default:
        return "stat-trend-neutral";
    }
  };

  const getTrendIcon = () => {
    switch (normalizedTrendType) {
      case "up":
      case "positive":
        return <ArrowUpRight size={15} />;

      case "down":
      case "negative":
        return <ArrowDownRight size={15} />;

      default:
        return null;
    }
  };

  const getVariantClass = () => {
    const allowedVariants = [
      "primary",
      "success",
      "warning",
      "danger",
      "info",
    ];

    return allowedVariants.includes(variant)
      ? `stat-card-${variant}`
      : "stat-card-primary";
  };

  /**
   * Format numeric values when required.
   *
   * Example:
   * 12500 → 12,500
   */
  const formatValue = (inputValue) => {
    if (
      typeof inputValue === "number" &&
      Number.isFinite(inputValue)
    ) {
      return inputValue.toLocaleString("en-IN");
    }

    return inputValue;
  };

  if (loading) {
    return (
      <article
        className={`stat-card ${getVariantClass()} stat-card-loading`}
      >
        <div className="stat-card-header">
          <div className="stat-card-skeleton stat-card-skeleton-icon" />

          <div className="stat-card-skeleton stat-card-skeleton-menu" />
        </div>

        <div className="stat-card-content">
          <div className="stat-card-skeleton stat-card-skeleton-title" />

          <div className="stat-card-skeleton stat-card-skeleton-value" />

          <div className="stat-card-skeleton stat-card-skeleton-subtitle" />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`stat-card ${getVariantClass()} ${
        onClick ? "stat-card-clickable" : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (
          onClick &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="stat-card-header">
        <div className="stat-card-icon">
          <IconComponent size={22} strokeWidth={2} />
        </div>

        {trend !== null && trend !== undefined && (
          <div className={`stat-card-trend ${getTrendClass()}`}>
            {getTrendIcon()}

            <span>
              {typeof trend === "number"
                ? `${Math.abs(trend)}%`
                : trend}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="stat-card-content">
        <p className="stat-card-title">
          {title}
        </p>

        <h2 className="stat-card-value">
          {formatValue(value)}
        </h2>

        {subtitle && (
          <p className="stat-card-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {/* =====================================================
          TREND INFORMATION
      ====================================================== */}
      {trend !== null &&
        trend !== undefined &&
        trendLabel && (
          <div className="stat-card-footer">
            <span className={`stat-card-trend-text ${getTrendClass()}`}>
              {getTrendIcon()}
              <span>
                {normalizedTrendType === "up"
                  ? "Increasing"
                  : normalizedTrendType === "down"
                  ? "Decreasing"
                  : "No change"}
              </span>
            </span>

            <span className="stat-card-trend-label">
              {trendLabel}
            </span>
          </div>
        )}
    </article>
  );
};

export default StatCard;