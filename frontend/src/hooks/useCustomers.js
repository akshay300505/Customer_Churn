// src/hooks/useCustomers.js

import { useMemo } from "react";
import { useDashboard } from "../context/DashboardContext";

/**
 * Custom customer management hook.
 *
 * Handles:
 * - Customer list
 * - Customer filtering
 * - Customer selection
 * - Customer statistics
 * - Add/update/remove customer
 * - Customer lookup
 */
const useCustomers = () => {
  const dashboard = useDashboard();

  const {
    customers = [],
    filteredCustomers = [],
    selectedCustomer = null,

    filters = {},

    loading = false,
    error = null,

    updateFilters,
    resetFilters,

    selectCustomer,
    clearSelectedCustomer,

    addCustomer,
    updateCustomer,
    removeCustomer,

    getCustomerById,
  } = dashboard || {};

  const safeCustomers = Array.isArray(customers)
    ? customers
    : [];

  const safeFilteredCustomers =
    Array.isArray(filteredCustomers)
      ? filteredCustomers
      : safeCustomers;

  const customerStats = useMemo(() => {
    const total = safeCustomers.length;

    const active = safeCustomers.filter(
      (customer) =>
        String(customer?.status || "")
          .trim()
          .toLowerCase() === "active"
    ).length;

    const atRisk = safeCustomers.filter(
      (customer) =>
        String(customer?.status || "")
          .trim()
          .toLowerCase() === "at risk"
    ).length;

    const churned = safeCustomers.filter(
      (customer) =>
        String(customer?.status || "")
          .trim()
          .toLowerCase() === "churned"
    ).length;

    const highRisk = safeCustomers.filter(
      (customer) => {
        const risk = String(
          customer?.riskLevel || ""
        )
          .trim()
          .toLowerCase();

        return (
          risk === "high" ||
          risk === "critical"
        );
      }
    ).length;

    const mediumRisk = safeCustomers.filter(
      (customer) =>
        String(customer?.riskLevel || "")
          .trim()
          .toLowerCase() === "medium"
    ).length;

    const lowRisk = safeCustomers.filter(
      (customer) =>
        String(customer?.riskLevel || "")
          .trim()
          .toLowerCase() === "low"
    ).length;

    const totalRevenue = safeCustomers.reduce(
      (sum, customer) =>
        sum +
        (Number(customer?.monthlyRevenue) || 0),
      0
    );

    const averageChurnProbability =
      total > 0
        ? safeCustomers.reduce(
            (sum, customer) =>
              sum +
              (Number(
                customer?.churnProbability
              ) || 0),
            0
          ) / total
        : 0;

    return {
      total,
      active,
      atRisk,
      churned,

      highRisk,
      mediumRisk,
      lowRisk,

      totalRevenue,
      averageChurnProbability:
        Number(
          averageChurnProbability.toFixed(1)
        ),
    };
  }, [safeCustomers]);

  const handleUpdateFilters = (
    nextFilters
  ) => {
    if (typeof updateFilters !== "function") {
      return;
    }

    updateFilters(nextFilters);
  };

  const handleResetFilters = () => {
    if (typeof resetFilters !== "function") {
      return;
    }

    resetFilters();
  };

  const handleSelectCustomer = (
    customer
  ) => {
    if (typeof selectCustomer !== "function") {
      return;
    }

    selectCustomer(customer);
  };

  const handleClearSelectedCustomer = () => {
    if (
      typeof clearSelectedCustomer !==
      "function"
    ) {
      return;
    }

    clearSelectedCustomer();
  };

  const handleAddCustomer = async (
    customerData
  ) => {
    if (typeof addCustomer !== "function") {
      return null;
    }

    return addCustomer(customerData);
  };

  const handleUpdateCustomer = async (
    customerId,
    customerData
  ) => {
    if (
      typeof updateCustomer !==
      "function"
    ) {
      return null;
    }

    return updateCustomer(
      customerId,
      customerData
    );
  };

  const handleRemoveCustomer = async (
    customerId
  ) => {
    if (
      typeof removeCustomer !==
      "function"
    ) {
      return null;
    }

    return removeCustomer(customerId);
  };

  const handleGetCustomerById = (
    customerId
  ) => {
    if (
      typeof getCustomerById !==
      "function"
    ) {
      return null;
    }

    return getCustomerById(customerId);
  };

  return {
    /* Customer data */
    customers: safeCustomers,
    filteredCustomers:
      safeFilteredCustomers,
    selectedCustomer,

    /* Statistics */
    customerStats,

    /* Filters */
    filters,
    updateFilters:
      handleUpdateFilters,
    resetFilters:
      handleResetFilters,

    /* Selection */
    selectCustomer:
      handleSelectCustomer,
    clearSelectedCustomer:
      handleClearSelectedCustomer,

    /* CRUD */
    addCustomer:
      handleAddCustomer,
    updateCustomer:
      handleUpdateCustomer,
    removeCustomer:
      handleRemoveCustomer,

    /* Lookup */
    getCustomerById:
      handleGetCustomerById,

    /* Request state */
    loading,
    error,
  };
};

export default useCustomers;