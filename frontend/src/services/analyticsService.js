import api from "./api";

const demoTrend = [];
const demoDistribution = [];
const demoFeatureImportance = [];

export const getDashboardAnalytics =
  async (params = {}) => {
    try {
      const response =
        await api.get(
          "/analytics/dashboard",
          {
            params,
          }
        );

      return (
        response.data?.analytics ||
        response.data
      );
    } catch {
      return {
        totalCustomers: 1380,
        activeCustomers: 1125,
        atRiskCustomers: 198,
        churnedCustomers: 57,
        churnRate: 19.1,
        revenue: 4850000,
        revenueAtRisk: 735000,
        retentionRate: 80.9,
        trend:
          demoTrend,
      };
    }
  };

export const getChurnTrend =
  async (params = {}) => {
    try {
      const response =
        await api.get(
          "/analytics/churn-trend",
          {
            params,
          }
        );

      return (
        response.data?.trend ||
        response.data
      );
    } catch {
      return [
        ...demoTrend,
      ];
    }
  };

export const getRiskDistribution =
  async (params = {}) => {
    try {
      const response =
        await api.get(
          "/analytics/risk-distribution",
          {
            params,
          }
        );

      return (
        response.data?.distribution ||
        response.data
      );
    } catch {
      return [
        ...demoDistribution,
      ];
    }
  };

export const getFeatureImportance =
  async (params = {}) => {
    try {
      const response =
        await api.get(
          "/analytics/feature-importance",
          {
            params,
          }
        );

      return (
        response.data?.features ||
        response.data
      );
    } catch {
      return [
        ...demoFeatureImportance,
      ];
    }
  };

export const getRevenueAnalytics =
  async (params = {}) => {
    try {
      const response =
        await api.get(
          "/analytics/revenue",
          {
            params,
          }
        );

      return (
        response.data?.revenue ||
        response.data
      );
    } catch {
      return [
        {
          month: "Mar",
          revenue: 3820000,
          atRisk: 410000,
        },
        {
          month: "Apr",
          revenue: 4010000,
          atRisk: 460000,
        },
        {
          month: "May",
          revenue: 4230000,
          atRisk: 515000,
        },
        {
          month: "Jun",
          revenue: 4470000,
          atRisk: 590000,
        },
        {
          month: "Jul",
          revenue: 4620000,
          atRisk: 675000,
        },
        {
          month: "Aug",
          revenue: 4850000,
          atRisk: 735000,
        },
      ];
    }
  };

export const getCustomerAnalytics =
  async (customerId) => {
    try {
      const response =
        await api.get(
          `/analytics/customers/${customerId}`
        );

      return (
        response.data?.analytics ||
        response.data
      );
    } catch {
      return {
        customerId,

        churnProbability: 82,

        riskLevel: "High",

        tenureMonths: 8,

        monthlyRevenue: 240,

        supportTickets: 7,

        usageFrequency: 3,

        paymentFailures: 2,

        lastActivity:
          "5 days ago",

        activityTrend: [
          {
            month: "Mar",
            value: 82,
          },
          {
            month: "Apr",
            value: 76,
          },
          {
            month: "May",
            value: 71,
          },
          {
            month: "Jun",
            value: 64,
          },
          {
            month: "Jul",
            value: 58,
          },
          {
            month: "Aug",
            value: 43,
          },
        ],
      };
    }
  };

const analyticsService = {
  getDashboardAnalytics,
  getChurnTrend,
  getRiskDistribution,
  getFeatureImportance,
  getRevenueAnalytics,
  getCustomerAnalytics,
};

export default analyticsService;