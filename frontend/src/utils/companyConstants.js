/**
 * Default enterprise workspace definitions.
 * Kept in a separate file so DatasetContext.jsx contains
 * ONLY React components and hooks — which is required by
 * React Fast Refresh (Vite HMR) for instant module reloads.
 */
export const DEFAULT_COMPANIES = [
  {
    id: "primary",
    name: "Primary Enterprise",
    industry: "Corporate / SaaS",
    tier: "Core Portfolio",
    code: "CORP",
    color: "bg-blue-600",
  },
  {
    id: "global",
    name: "Global Operations",
    industry: "Multi-Region Enterprise",
    tier: "International Subscriptions",
    code: "GLOB",
    color: "bg-indigo-600",
  },
  {
    id: "americas",
    name: "Americas Division",
    industry: "Regional Portfolio",
    tier: "Direct Accounts",
    code: "AMER",
    color: "bg-emerald-600",
  },
  {
    id: "emea_apac",
    name: "EMEA & APAC Division",
    industry: "Cross-Border Services",
    tier: "Expansion Accounts",
    code: "APAC",
    color: "bg-purple-600",
  },
];
