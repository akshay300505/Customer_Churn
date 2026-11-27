import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const DashboardContext =
  createContext(null);

const DEMO_CUSTOMERS = [];
const DEMO_CHURN_TREND = [];
const DEMO_REVENUE_TREND = [];
const DEMO_RISK_DISTRIBUTION = [];
const DEMO_FEATURE_IMPORTANCE = [];

const DashboardProvider = ({
  children,
}) => {
  const [customers, setCustomers] =
    useState(DEMO_CUSTOMERS);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  const [filters, setFilters] =
    useState({
      riskLevel: "All",
      status: "All",
      search: "",
      dateRange: "7d",
    });

  const dashboardStats = useMemo(() => {
    const totalCustomers =
      customers.length;

    const highRiskCustomers =
      customers.filter(
        (customer) =>
          customer.riskLevel === "High" ||
          customer.riskLevel === "Critical"
      ).length;

    const mediumRiskCustomers =
      customers.filter(
        (customer) =>
          customer.riskLevel === "Medium"
      ).length;

    const lowRiskCustomers =
      customers.filter(
        (customer) =>
          customer.riskLevel === "Low"
      ).length;

    const atRiskCustomers =
      customers.filter(
        (customer) =>
          customer.status === "At Risk"
      ).length;

    const churnedCustomers =
      customers.filter(
        (customer) =>
          customer.status === "Churned"
      ).length;

    const predictedChurn =
      customers.filter(
        (customer) =>
          Number(
            customer.churnProbability
          ) >= 50
      ).length;

    const totalRevenue =
      customers.reduce(
        (total, customer) =>
          total +
          Number(
            customer.monthlyRevenue || 0
          ),
        0
      );

    const averageChurnProbability =
      totalCustomers > 0
        ? customers.reduce(
            (total, customer) =>
              total +
              Number(
                customer.churnProbability ||
                  0
              ),
            0
          ) / totalCustomers
        : 0;

    return {
      totalCustomers,
      highRiskCustomers,
      mediumRiskCustomers,
      lowRiskCustomers,
      atRiskCustomers,
      churnedCustomers,
      predictedChurn,
      totalRevenue,
      averageChurnProbability,
      churnRate:
        totalCustomers > 0
          ? (
              (predictedChurn /
                totalCustomers) *
              100
            ).toFixed(1)
          : "0.0",
    };
  }, [customers]);

  const filteredCustomers =
    useMemo(() => {
      const search =
        String(filters.search || "")
          .trim()
          .toLowerCase();

      return customers.filter(
        (customer) => {
          const matchesRisk =
            filters.riskLevel === "All" ||
            customer.riskLevel ===
              filters.riskLevel;

          const matchesStatus =
            filters.status === "All" ||
            customer.status ===
              filters.status;

          const matchesSearch =
            !search ||
            customer.customerName
              .toLowerCase()
              .includes(search) ||
            customer.customerId
              .toLowerCase()
              .includes(search) ||
            customer.email
              .toLowerCase()
              .includes(search) ||
            customer.company
              .toLowerCase()
              .includes(search);

          return (
            matchesRisk &&
            matchesStatus &&
            matchesSearch
          );
        }
      );
    }, [customers, filters]);

  const refreshDashboard =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        /*
         * Frontend-only refresh.
         * Real API request can be connected here later.
         */

        await new Promise(
          (resolve) =>
            setTimeout(resolve, 400)
        );

        setLastUpdated(
          new Date()
        );

        return {
          success: true,
        };
      } catch (refreshError) {
        const message =
          refreshError?.message ||
          "Unable to refresh dashboard.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setLoading(false);
      }
    }, []);

  const updateFilters = useCallback(
    (updates = {}) => {
      setFilters((current) => ({
        ...current,
        ...updates,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      riskLevel: "All",
      status: "All",
      search: "",
      dateRange: "7d",
    });
  }, []);

  const selectCustomer =
    useCallback((customer) => {
      setSelectedCustomer(
        customer || null
      );
    }, []);

  const clearSelectedCustomer =
    useCallback(() => {
      setSelectedCustomer(null);
    }, []);

  const addCustomer = useCallback(
    (customerData = {}) => {
      const newCustomer = {
        id:
          customerData.id ||
          `CUS-${Date.now()}`,

        customerId:
          customerData.customerId ||
          customerData.id ||
          `CUS-${Date.now()}`,

        customerName:
          customerData.customerName ||
          customerData.name ||
          "New Customer",

        email:
          customerData.email ||
          "customer@example.com",

        company:
          customerData.company ||
          "New Company",

        plan:
          customerData.plan ||
          "Basic",

        status:
          customerData.status ||
          "Active",

        churnProbability:
          Number(
            customerData.churnProbability ||
              0
          ),

        riskLevel:
          customerData.riskLevel ||
          "Low",

        monthlyRevenue:
          Number(
            customerData.monthlyRevenue ||
              0
          ),

        lastUpdated:
          "Just now",

        recommendation:
          customerData.recommendation ||
          "Continue monitoring customer activity.",
      };

      setCustomers((current) => [
        newCustomer,
        ...current,
      ]);

      return newCustomer;
    },
    []
  );

  const updateCustomer = useCallback(
    (customerId, updates = {}) => {
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === customerId ||
          customer.customerId ===
            customerId
            ? {
                ...customer,
                ...updates,
                lastUpdated:
                  "Just now",
              }
            : customer
        )
      );
    },
    []
  );

  const removeCustomer = useCallback(
    (customerId) => {
      setCustomers((current) =>
        current.filter(
          (customer) =>
            customer.id !==
              customerId &&
            customer.customerId !==
              customerId
        )
      );

      setSelectedCustomer(
        (current) => {
          if (
            current?.id ===
              customerId ||
            current?.customerId ===
              customerId
          ) {
            return null;
          }

          return current;
        }
      );
    },
    []
  );

  const getCustomerById =
    useCallback(
      (customerId) =>
        customers.find(
          (customer) =>
            customer.id ===
              customerId ||
            customer.customerId ===
              customerId
        ) || null,
      [customers]
    );

  const churnTrend =
    DEMO_CHURN_TREND;

  const revenueTrend =
    DEMO_REVENUE_TREND;

  const riskDistribution =
    DEMO_RISK_DISTRIBUTION;

  const featureImportance =
    DEMO_FEATURE_IMPORTANCE;

  const value = useMemo(
    () => ({
      customers,
      filteredCustomers,

      selectedCustomer,

      dashboardStats,

      churnTrend,
      revenueTrend,
      riskDistribution,
      featureImportance,

      filters,

      loading,
      error,
      lastUpdated,

      refreshDashboard,

      updateFilters,
      resetFilters,

      selectCustomer,
      clearSelectedCustomer,

      addCustomer,
      updateCustomer,
      removeCustomer,
      getCustomerById,
    }),
    [
      customers,
      filteredCustomers,
      selectedCustomer,
      dashboardStats,
      filters,
      loading,
      error,
      lastUpdated,
      refreshDashboard,
      updateFilters,
      resetFilters,
      selectCustomer,
      clearSelectedCustomer,
      addCustomer,
      updateCustomer,
      removeCustomer,
      getCustomerById,
    ]
  );

  return (
    <DashboardContext.Provider
      value={value}
    >
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboard = () => {
  const context =
    useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider."
    );
  }

  return context;
};

export { DashboardContext };

export default DashboardProvider;