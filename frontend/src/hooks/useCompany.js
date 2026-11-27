import { useCompany as useCompanyContext } from "../context/CompanyContext";

/**
 * Custom company hook.
 *
 * Provides access to:
 * - Current company
 * - Company loading state
 * - Company errors
 * - Select company
 * - Update company
 * - Reset company
 */
const useCompany = () => {
  const companyContext =
    useCompanyContext();

  return {
    company: companyContext.company,

    loading:
      companyContext.loading,

    error:
      companyContext.error,

    selectCompany:
      companyContext.selectCompany,

    updateCompany:
      companyContext.updateCompany,

    resetCompany:
      companyContext.resetCompany,

    clearError:
      companyContext.clearError,
  };
};

export default useCompany;