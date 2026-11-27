import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";

const CompanyContext =
  createContext(null);

const COMPANY_STORAGE_KEY =
  "churn_guidance_company";

const DEFAULT_COMPANY = {
  id: "primary",
  name: "Primary Enterprise",
  industry: "Technology & SaaS",
  size: "Enterprise",
  country: "United States",
  currency: "USD",
  timezone: "UTC",

  customerCount: 0,
  activeCustomers: 0,
  atRiskCustomers: 0,
  churnedCustomers: 0,

  monthlyRevenue: 0,

  createdAt: "2026-01-01",
};

const getStoredCompany = () => {
  try {
    const stored =
      localStorage.getItem(
        COMPANY_STORAGE_KEY
      );

    if (!stored) {
      return DEFAULT_COMPANY;
    }

    return {
      ...DEFAULT_COMPANY,
      ...JSON.parse(stored),
    };
  } catch {
    return DEFAULT_COMPANY;
  }
};

const CompanyProvider = ({ children }) => {
  const [company, setCompany] =
    useState(getStoredCompany);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      COMPANY_STORAGE_KEY,
      JSON.stringify(company)
    );
  }, [company]);

  const selectCompany = useCallback(
    async (companyData = {}) => {
      setLoading(true);
      setError("");

      try {
        const updatedCompany = {
          ...DEFAULT_COMPANY,
          ...companyData,
        };

        setCompany(updatedCompany);

        localStorage.setItem(
          COMPANY_STORAGE_KEY,
          JSON.stringify(
            updatedCompany
          )
        );

        return {
          success: true,
          company: updatedCompany,
        };
      } catch (companyError) {
        const message =
          companyError?.message ||
          "Unable to select company.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateCompany = useCallback(
    (updates = {}) => {
      setCompany((currentCompany) => {
        const updatedCompany = {
          ...currentCompany,
          ...updates,
        };

        localStorage.setItem(
          COMPANY_STORAGE_KEY,
          JSON.stringify(
            updatedCompany
          )
        );

        return updatedCompany;
      });
    },
    []
  );

  const resetCompany = useCallback(() => {
    setCompany(DEFAULT_COMPANY);

    localStorage.setItem(
      COMPANY_STORAGE_KEY,
      JSON.stringify(DEFAULT_COMPANY)
    );

    setError("");
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const value = useMemo(
    () => ({
      company,
      loading,
      error,
      selectCompany,
      updateCompany,
      resetCompany,
      clearError,
    }),
    [
      company,
      loading,
      error,
      selectCompany,
      updateCompany,
      resetCompany,
      clearError,
    ]
  );

  return (
    <CompanyContext.Provider
      value={value}
    >
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCompany = () => {
  const context =
    useContext(CompanyContext);

  if (!context) {
    throw new Error(
      "useCompany must be used inside CompanyProvider."
    );
  }

  return context;
};

export { CompanyContext };

export default CompanyProvider;