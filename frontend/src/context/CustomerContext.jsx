/* =========================================================
   CUSTOMER CHURN GUIDANCE
   Customer Context
   ========================================================= */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import customerService from "../services/customerService";

/* ---------------------------------------------------------
   CONTEXT
   --------------------------------------------------------- */

const CustomerContext = createContext(null);

/* ---------------------------------------------------------
   DEFAULT STATE
   --------------------------------------------------------- */

const DEFAULT_STATS = {
  totalCustomers: 0,
  activeCustomers: 0,
  atRiskCustomers: 0,
  churnedCustomers: 0,
  averageChurnRate: 0,
};

/* ---------------------------------------------------------
   PROVIDER
   --------------------------------------------------------- */

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(DEFAULT_STATS);

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [statsError, setStatsError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    riskLevel: "",
    status: "",
    companyId: "",
  });

  /* -------------------------------------------------------
     LOAD CUSTOMERS
     ------------------------------------------------------- */

  const loadCustomers = useCallback(
    async (customParams = {}) => {
      setLoading(true);
      setError(null);

      try {
        const activeFilters = {
          ...filters,
          ...customParams,
        };

        const result =
          await customerService.getCustomers(
            activeFilters
          );

        const safeCustomers =
          Array.isArray(result)
            ? result
            : Array.isArray(result?.customers)
            ? result.customers
            : Array.isArray(result?.data)
            ? result.data
            : [];

        setCustomers(safeCustomers);

        return safeCustomers;
      } catch (err) {
        const message =
          err?.message ||
          "Unable to load customers.";

        setError(message);
        setCustomers([]);

        return [];
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  /* -------------------------------------------------------
     LOAD CUSTOMER STATS
     ------------------------------------------------------- */

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);

    try {
      const result =
        await customerService.getCustomerStats();

      const safeStats = {
        ...DEFAULT_STATS,
        ...(result || {}),
      };

      setStats(safeStats);

      return safeStats;
    } catch (err) {
      const message =
        err?.message ||
        "Unable to load customer statistics.";

      setStatsError(message);

      return DEFAULT_STATS;
    } finally {
      setStatsLoading(false);
    }
  }, []);

  /* -------------------------------------------------------
     INITIAL LOAD
     ------------------------------------------------------- */

  useEffect(() => {
    loadCustomers();
    loadStats();
  }, [loadCustomers, loadStats]);

  /* -------------------------------------------------------
     REFRESH
     ------------------------------------------------------- */

  const refreshCustomers = useCallback(
    async () => {
      const [customerResult, statsResult] =
        await Promise.all([
          loadCustomers(),
          loadStats(),
        ]);

      return {
        customers: customerResult,
        stats: statsResult,
      };
    },
    [loadCustomers, loadStats]
  );

  /* -------------------------------------------------------
     GET CUSTOMER
     ------------------------------------------------------- */

  const getCustomer = useCallback(
    async (customerId) => {
      if (!customerId) {
        return null;
      }

      try {
        return await customerService.getCustomerById(
          customerId
        );
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load customer."
        );

        return null;
      }
    },
    []
  );

  /* -------------------------------------------------------
     ADD CUSTOMER
     ------------------------------------------------------- */

  const addCustomer = useCallback(
    async (customerData) => {
      setLoading(true);
      setError(null);

      try {
        const customer =
          await customerService.createCustomer(
            customerData
          );

        if (customer) {
          setCustomers((previous) => [
            customer,
            ...previous,
          ]);
        }

        await loadStats();

        return customer;
      } catch (err) {
        const message =
          err?.message ||
          "Unable to create customer.";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadStats]
  );

  /* -------------------------------------------------------
     UPDATE CUSTOMER
     ------------------------------------------------------- */

  const updateCustomer = useCallback(
    async (customerId, customerData) => {
      setLoading(true);
      setError(null);

      try {
        const updatedCustomer =
          await customerService.updateCustomer(
            customerId,
            customerData
          );

        setCustomers((previous) =>
          previous.map((customer) =>
            customer.id === customerId
              ? {
                  ...customer,
                  ...updatedCustomer,
                }
              : customer
          )
        );

        await loadStats();

        return updatedCustomer;
      } catch (err) {
        const message =
          err?.message ||
          "Unable to update customer.";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadStats]
  );

  /* -------------------------------------------------------
     DELETE CUSTOMER
     ------------------------------------------------------- */

  const removeCustomer = useCallback(
    async (customerId) => {
      if (!customerId) {
        return {
          success: false,
        };
      }

      setLoading(true);
      setError(null);

      try {
        const result =
          await customerService.deleteCustomer(
            customerId
          );

        if (result?.success !== false) {
          setCustomers((previous) =>
            previous.filter(
              (customer) =>
                customer.id !== customerId
            )
          );
        }

        await loadStats();

        return result;
      } catch (err) {
        const message =
          err?.message ||
          "Unable to delete customer.";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadStats]
  );

  /* -------------------------------------------------------
     FILTER HANDLING
     ------------------------------------------------------- */

  const updateFilter = useCallback(
    (field, value) => {
      setFilters((previous) => ({
        ...previous,
        [field]: value,
      }));
    },
    []
  );

  const setCustomerFilters = useCallback(
    (newFilters = {}) => {
      setFilters((previous) => ({
        ...previous,
        ...newFilters,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      riskLevel: "",
      status: "",
      companyId: "",
    });
  }, []);

  /* -------------------------------------------------------
     FILTERED CUSTOMERS
     ------------------------------------------------------- */

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    const search =
      String(filters.search || "")
        .trim()
        .toLowerCase();

    if (search) {
      result = result.filter((customer) => {
        const name =
          String(customer?.name || "")
            .toLowerCase();

        const email =
          String(customer?.email || "")
            .toLowerCase();

        const company =
          String(customer?.company || "")
            .toLowerCase();

        const id =
          String(customer?.id || "")
            .toLowerCase();

        return (
          name.includes(search) ||
          email.includes(search) ||
          company.includes(search) ||
          id.includes(search)
        );
      });
    }

    if (filters.riskLevel) {
      result = result.filter(
        (customer) =>
          String(customer?.riskLevel || "") ===
          String(filters.riskLevel)
      );
    }

    if (filters.status) {
      result = result.filter(
        (customer) =>
          String(customer?.status || "") ===
          String(filters.status)
      );
    }

    if (filters.companyId) {
      result = result.filter(
        (customer) =>
          String(customer?.companyId || "") ===
          String(filters.companyId)
      );
    }

    return result;
  }, [customers, filters]);

  /* -------------------------------------------------------
     RISK HELPERS
     ------------------------------------------------------- */

  const highRiskCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          customer?.riskLevel === "High"
      ),
    [customers]
  );

  const mediumRiskCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          customer?.riskLevel === "Medium"
      ),
    [customers]
  );

  const lowRiskCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          customer?.riskLevel === "Low"
      ),
    [customers]
  );

  const atRiskCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          customer?.riskLevel === "High" ||
          customer?.riskLevel === "Medium" ||
          customer?.status === "At Risk"
      ),
    [customers]
  );

  const churnedCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          customer?.status === "Churned"
      ),
    [customers]
  );

  /* -------------------------------------------------------
     CONTEXT VALUE
     ------------------------------------------------------- */

  const value = useMemo(
    () => ({
      /* Data */
      customers,
      filteredCustomers,
      stats,

      /* Loading */
      loading,
      statsLoading,

      /* Errors */
      error,
      statsError,

      /* Filters */
      filters,
      updateFilter,
      setCustomerFilters,
      clearFilters,

      /* CRUD */
      loadCustomers,
      loadStats,
      refreshCustomers,
      getCustomer,
      addCustomer,
      createCustomer: addCustomer,
      updateCustomer,
      removeCustomer,
      deleteCustomer: removeCustomer,

      /* Risk groups */
      highRiskCustomers,
      mediumRiskCustomers,
      lowRiskCustomers,
      atRiskCustomers,
      churnedCustomers,

      /* Counts */
      customerCount: customers.length,
      filteredCustomerCount:
        filteredCustomers.length,
      highRiskCount:
        highRiskCustomers.length,
      mediumRiskCount:
        mediumRiskCustomers.length,
      lowRiskCount:
        lowRiskCustomers.length,
      atRiskCount:
        atRiskCustomers.length,
      churnedCount:
        churnedCustomers.length,
    }),
    [
      customers,
      filteredCustomers,
      stats,
      loading,
      statsLoading,
      error,
      statsError,
      filters,
      updateFilter,
      setCustomerFilters,
      clearFilters,
      loadCustomers,
      loadStats,
      refreshCustomers,
      getCustomer,
      addCustomer,
      updateCustomer,
      removeCustomer,
      highRiskCustomers,
      mediumRiskCustomers,
      lowRiskCustomers,
      atRiskCustomers,
      churnedCustomers,
    ]
  );

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

/* ---------------------------------------------------------
   HOOK
   --------------------------------------------------------- */

export const useCustomer = () => {
  const context =
    useContext(CustomerContext);

  if (!context) {
    throw new Error(
      "useCustomer must be used inside CustomerProvider."
    );
  }

  return context;
};

export default CustomerContext;