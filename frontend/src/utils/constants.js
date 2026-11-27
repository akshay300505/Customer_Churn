/* =========================================================
   CUSTOMER CHURN GUIDANCE
   Application Constants
   ========================================================= */

/* ---------------------------------------------------------
   APPLICATION
   --------------------------------------------------------- */

export const APP_NAME = "Customer Churn Guidance";

export const APP_SHORT_NAME = "ChurnGuidance";

export const APP_VERSION = "1.0.0";

export const APP_DESCRIPTION =
  "AI-powered customer churn prediction, explainability and retention guidance platform.";

/* ---------------------------------------------------------
   ROUTES
   --------------------------------------------------------- */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  DASHBOARD: "/dashboard",
  DASHBOARD_OVERVIEW: "/dashboard/overview",

  COMPANIES: "/companies",
  ADD_COMPANY: "/companies/add",

  CUSTOMERS: "/customers",
  ADD_CUSTOMER: "/customers/add",

  DATA_UPLOAD: "/data/upload",
  DATA_HISTORY: "/data/history",
  DATA_VALIDATION: "/data/validation",

  PREDICTIONS: "/predictions",

  ANALYTICS: "/analytics",
  CUSTOMER_ANALYTICS: "/analytics/customers",

  EXPLAINABILITY: "/explainability",

  GUIDANCE: "/guidance",

  REPORTS: "/reports",

  SETTINGS: "/settings",

  ADMIN: "/admin",
};

/* ---------------------------------------------------------
   RISK LEVELS
   --------------------------------------------------------- */

export const RISK_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

/* ---------------------------------------------------------
   RISK THRESHOLDS
   --------------------------------------------------------- */

export const RISK_THRESHOLDS = {
  LOW_MAX: 39,
  MEDIUM_MAX: 69,
  HIGH_MAX: 89,
  CRITICAL_MIN: 90,
};

/* ---------------------------------------------------------
   CUSTOMER STATUS
   --------------------------------------------------------- */

export const CUSTOMER_STATUS = {
  ACTIVE: "Active",
  AT_RISK: "At Risk",
  CHURNED: "Churned",
};

/* ---------------------------------------------------------
   PREDICTION STATUS
   --------------------------------------------------------- */

export const PREDICTION_STATUS = {
  STABLE: "Stable",
  AT_RISK: "At Risk",
  LIKELY_TO_CHURN: "Likely to Churn",
  CHURNED: "Churned",
};

/* ---------------------------------------------------------
   RECOMMENDATION STATUS
   --------------------------------------------------------- */

export const RECOMMENDATION_STATUS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  DISMISSED: "Dismissed",
};

/* ---------------------------------------------------------
   PRIORITY
   --------------------------------------------------------- */

export const PRIORITY_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

/* ---------------------------------------------------------
   USER ROLES
   --------------------------------------------------------- */

export const USER_ROLES = {
  ADMIN: "admin",
  ANALYST: "analyst",
  MANAGER: "manager",
  USER: "user",
};

/* ---------------------------------------------------------
   DATA STATUS
   --------------------------------------------------------- */

export const DATA_STATUS = {
  UPLOADED: "Uploaded",
  PROCESSING: "Processing",
  VALIDATING: "Validating",
  VALIDATED: "Validated",
  FAILED: "Failed",
};

/* ---------------------------------------------------------
   SUPPORTED FILE TYPES
   --------------------------------------------------------- */

export const SUPPORTED_FILE_TYPES = [
  ".csv",
  ".xlsx",
  ".xls",
];

/* ---------------------------------------------------------
   FILE LIMITS
   --------------------------------------------------------- */

export const FILE_LIMITS = {
  MAX_SIZE_MB: 25,
  MAX_SIZE_BYTES: 25 * 1024 * 1024,
};

/* ---------------------------------------------------------
   PAGINATION
   --------------------------------------------------------- */

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,

  PAGE_SIZE_OPTIONS: [
    10,
    25,
    50,
    100,
  ],
};

/* ---------------------------------------------------------
   DATE FORMATS
   --------------------------------------------------------- */

export const DATE_FORMATS = {
  DATE: "DD MMM YYYY",
  DATE_TIME: "DD MMM YYYY, hh:mm A",
  SHORT_DATE: "DD/MM/YYYY",
  TIME: "hh:mm A",
};

/* ---------------------------------------------------------
   CHART COLORS
   --------------------------------------------------------- */

export const CHART_COLORS = {
  PRIMARY: "#2563eb",
  SUCCESS: "#16a34a",
  WARNING: "#d97706",
  DANGER: "#dc2626",
  PURPLE: "#7c3aed",
  INFO: "#0284c7",
  GRAY: "#64748b",

  LOW: "#16a34a",
  MEDIUM: "#d97706",
  HIGH: "#f97316",
  CRITICAL: "#dc2626",
};

/* ---------------------------------------------------------
   RISK COLOR MAP
   --------------------------------------------------------- */

export const RISK_COLORS = {
  Low: "#16a34a",
  Medium: "#d97706",
  High: "#f97316",
  Critical: "#dc2626",
};

/* ---------------------------------------------------------
   NAVIGATION ITEMS
   --------------------------------------------------------- */

export const NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: "dashboard",
  },

  {
    label: "Companies",
    path: ROUTES.COMPANIES,
    icon: "building",
  },

  {
    label: "Customers",
    path: ROUTES.CUSTOMERS,
    icon: "users",
  },

  {
    label: "Data Upload",
    path: ROUTES.DATA_UPLOAD,
    icon: "database",
  },

  {
    label: "Predictions",
    path: ROUTES.PREDICTIONS,
    icon: "prediction",
  },

  {
    label: "Analytics",
    path: ROUTES.ANALYTICS,
    icon: "analytics",
  },

  {
    label: "Explainability",
    path: ROUTES.EXPLAINABILITY,
    icon: "explainability",
  },

  {
    label: "Guidance",
    path: ROUTES.GUIDANCE,
    icon: "guidance",
  },

  {
    label: "Reports",
    path: ROUTES.REPORTS,
    icon: "reports",
  },

  {
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: "settings",
  },
];

/* ---------------------------------------------------------
   DASHBOARD DEFAULTS
   --------------------------------------------------------- */

export const DASHBOARD_DEFAULTS = {
  totalCustomers: 0,
  activeCustomers: 0,
  atRiskCustomers: 0,
  churnedCustomers: 0,

  churnRate: 0,
  revenue: 0,
  revenueAtRisk: 0,
  retentionRate: 0,
};

/* ---------------------------------------------------------
   DASHBOARD PERIODS
   --------------------------------------------------------- */

export const DASHBOARD_PERIODS = {
  LAST_7_DAYS: "7D",
  LAST_30_DAYS: "30D",
  LAST_3_MONTHS: "3M",
  LAST_6_MONTHS: "6M",
  LAST_12_MONTHS: "12M",
};

/* ---------------------------------------------------------
   API
   --------------------------------------------------------- */

export const API_CONFIG = {
  DEFAULT_TIMEOUT: 15000,
  HEALTH_TIMEOUT: 3000,
};

/* ---------------------------------------------------------
   LOCAL STORAGE KEYS
   --------------------------------------------------------- */

export const STORAGE_KEYS = {
  AUTH_TOKEN: "churn_auth_token",
  USER: "churn_user",
  COMPANY: "churn_selected_company",
  THEME: "churn_theme",
  SETTINGS: "churn_settings",

  DASHBOARD_PERIOD: "churn_dashboard_period",
};

/* ---------------------------------------------------------
   VALIDATION
   --------------------------------------------------------- */

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,

  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 150,

  MAX_COMPANY_NAME_LENGTH: 150,

  MIN_CHURN_PROBABILITY: 0,
  MAX_CHURN_PROBABILITY: 100,
};

/* ---------------------------------------------------------
   EXPORT DEFAULT
   --------------------------------------------------------- */

const constants = {
  APP_NAME,
  APP_SHORT_NAME,
  APP_VERSION,
  APP_DESCRIPTION,

  ROUTES,

  RISK_LEVELS,
  RISK_THRESHOLDS,

  CUSTOMER_STATUS,
  PREDICTION_STATUS,
  RECOMMENDATION_STATUS,

  PRIORITY_LEVELS,
  USER_ROLES,

  DATA_STATUS,

  SUPPORTED_FILE_TYPES,
  FILE_LIMITS,

  PAGINATION,

  DATE_FORMATS,

  CHART_COLORS,
  RISK_COLORS,

  NAVIGATION_ITEMS,

  DASHBOARD_DEFAULTS,
  DASHBOARD_PERIODS,

  API_CONFIG,

  STORAGE_KEYS,

  VALIDATION,
};

export default constants;