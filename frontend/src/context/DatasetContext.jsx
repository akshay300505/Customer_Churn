import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { parseFileContent } from "../utils/fileParser";
import { analyzeDataset } from "../utils/churnAnalytics";
import { CURRENCIES, convertCurrency, formatCurrency } from "../utils/currency";
import { downloadCsv, downloadExcel } from "../utils/exportUtils";
import { DEFAULT_COMPANIES } from "../utils/companyConstants";

const DatasetContext = createContext(null);


export const DatasetProvider = ({ children }) => {
  // 1. Navigation tab ('dashboard' | 'studio' | 'customers' | 'predictions' | 'guidance' | 'analytics' | 'reports' | 'settings')
  const [activeTab, setActiveTab] = useState("dashboard");

  // 2. Companies state
  const [companies, setCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem("churn_companies_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If saved companies contains obsolete demo names (netflix/spotify/telecom), reset to clean enterprise list
          const hasDemo = parsed.some((c) => ["netflix", "spotify", "telecom"].includes(c.id));
          if (!hasDemo) return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed reading churn_companies_list:", e);
    }
    return DEFAULT_COMPANIES;
  });

  const [selectedCompany, setSelectedCompany] = useState(() => {
    try {
      const saved = localStorage.getItem("churn_selected_company");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.id) {
          if (!["netflix", "spotify", "telecom"].includes(parsed.id)) {
            const match = DEFAULT_COMPANIES.find((c) => c.id === parsed.id);
            if (match) return match;
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn("Failed reading churn_selected_company:", e);
    }
    return DEFAULT_COMPANIES[0];
  });

  // 3. Theme state ('dark' | 'light') - SINGLE source of truth
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("churn_theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "dark";
    }
  });

  // 4. Currency state
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem("churn_currency");
      if (saved && CURRENCIES[saved]) return saved;
    } catch {
      // ignore
    }
    return "USD";
  });

  // 5. Risk Sensitivity Thresholds
  const [thresholds, setThresholds] = useState({ high: 70, medium: 40 });

  // 6. UI modal & selection states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // 7. Async loading / error states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // 8. Active Dataset & Datasets List (Strictly real data; clears any legacy demo datasets)
  const [activeDataset, setActiveDataset] = useState(() => {
    try {
      const saved = localStorage.getItem("churn_active_dataset");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Exclude demo datasets (Netflix, Spotify, Telecom)
        const isDemo =
          parsed?.name?.toLowerCase().includes("netflix") ||
          parsed?.name?.toLowerCase().includes("spotify") ||
          parsed?.name?.toLowerCase().includes("telecom") ||
          parsed?.companyId === "netflix" ||
          parsed?.companyId === "spotify" ||
          parsed?.companyId === "telecom";

        if (!isDemo && parsed && parsed.rawRows && parsed.rawRows.length > 0) {
          const analytics = analyzeDataset(parsed.rawRows, {
            highRiskThreshold: 70,
            mediumRiskThreshold: 40,
          });
          return {
            ...parsed,
            analytics,
          };
        } else {
          localStorage.removeItem("churn_active_dataset");
        }
      }
    } catch (e) {
      console.warn("Failed reading churn_active_dataset from localStorage:", e);
    }
    return null; // Clean empty state on start
  });

  const [datasetsList, setDatasetsList] = useState(() => {
    return activeDataset ? [activeDataset] : [];
  });

  // Synchronize HTML theme class
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("churn_theme", theme);
    } catch (e) {
      console.warn("Theme sync warning:", e);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Synchronize Currency preference
  useEffect(() => {
    try {
      localStorage.setItem("churn_currency", currency);
    } catch (e) {
      console.warn("Currency sync warning:", e);
    }
  }, [currency]);

  const currentCurrency = useMemo(() => CURRENCIES[currency] || CURRENCIES.USD, [currency]);

  const formatMoney = useCallback(
    (amountInUsd, decimals) => {
      return formatCurrency(amountInUsd, currency, { decimals });
    },
    [currency]
  );

  const convertMoney = useCallback(
    (amountInUsd) => {
      return convertCurrency(amountInUsd, currency);
    },
    [currency]
  );

  // Update thresholds and synchronously recalculate analytics
  const updateThresholds = useCallback((newThresholdsOrFn) => {
    setThresholds((prev) => {
      const next = typeof newThresholdsOrFn === "function" ? newThresholdsOrFn(prev) : newThresholdsOrFn;
      setActiveDataset((current) => {
        if (!current?.rawRows) return current;
        return {
          ...current,
          analytics: analyzeDataset(current.rawRows, {
            highRiskThreshold: next.high,
            mediumRiskThreshold: next.medium,
          }),
        };
      });
      return next;
    });
  }, []);

  // Notifications timeout auto-clear
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Ingest, Validate & Auto-update dataset specifically for the uploaded data
  const uploadAndProcessFile = useCallback(
    async (file, companyOverride = null) => {
      setIsLoading(true);
      setLoadingMessage(`Validating and parsing ${file.name}...`);
      setError(null);

      const targetCompany = companyOverride || selectedCompany || DEFAULT_COMPANIES[0];

      try {
        const parsed = await parseFileContent(file);
        if (!parsed || !parsed.data || parsed.data.length === 0) {
          throw new Error(`The file "${file.name}" is empty or has an unreadable structure.`);
        }

        // Validate and deduplicate records specifically within the uploaded file
        const getId = (r) => {
          if (!r || typeof r !== "object") return null;
          const key =
            Object.keys(r).find((k) =>
              /^(customer_?id|cust_?id|user_?id|account_?id|client_?id|member_?id|subscriber_?id|id)$/i.test(k)
            ) || Object.keys(r).find((k) => /id|account|user|client|customer/i.test(k));
          return key && r[key] !== undefined && r[key] !== null && String(r[key]).trim() !== ""
            ? String(r[key]).trim()
            : null;
        };

        const seenIdMap = new Map();
        const validRows = [];
        let duplicateCount = 0;

        parsed.data.forEach((row, idx) => {
          if (!row || typeof row !== "object") return;
          const hasContent = Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
          if (!hasContent) return;

          const rawId = getId(row);
          const customerId = rawId || `CUST-${10000 + idx + 1}`;
          const normalizedKey = customerId.toLowerCase();

          if (seenIdMap.has(normalizedKey)) {
            duplicateCount++;
            const existingIndex = seenIdMap.get(normalizedKey);
            validRows[existingIndex] = {
              ...validRows[existingIndex],
              ...row,
              _lastMergedAt: new Date().toISOString(),
            };
          } else {
            seenIdMap.set(normalizedKey, validRows.length);
            validRows.push({
              ...row,
              customer_id: customerId,
              _ingestedAt: new Date().toISOString(),
            });
          }
        });

        if (validRows.length === 0) {
          throw new Error("No valid data rows found in the uploaded file.");
        }

        setLoadingMessage(`Analyzing ${validRows.length.toLocaleString()} customer records...`);

        // Compute analytics from the real uploaded data
        const analytics = analyzeDataset(validRows, {
          highRiskThreshold: thresholds.high,
          mediumRiskThreshold: thresholds.medium,
        });

        const newDataset = {
          id: `ds-${Date.now()}`,
          name: file.name,
          format: file.name.split(".").pop()?.toUpperCase() || "CSV",
          uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          companyId: targetCompany.id,
          companyName: targetCompany.name,
          companyCode: targetCompany.code,
          rowsCount: validRows.length,
          duplicateRecordsMerged: duplicateCount,
          rawRows: validRows,
          analytics,
        };

        // Update active dataset and state
        setActiveDataset(newDataset);
        setDatasetsList((prev) => [newDataset, ...prev.filter((d) => d.id !== newDataset.id)]);

        // Persist strictly real data to localStorage
        try {
          localStorage.setItem("churn_active_dataset", JSON.stringify(newDataset));
        } catch (e) {
          console.warn("Storage warning (dataset size exceeds localStorage limit):", e);
        }

        // Switch to dashboard
        setActiveTab("dashboard");
        setUploadModalOpen(false);

        const dupMsg = duplicateCount > 0 ? ` (${duplicateCount} duplicate customer IDs safely consolidated)` : "";
        setSuccessMessage(`Successfully processed "${file.name}" with ${validRows.length.toLocaleString()} customer records${dupMsg}. All KPIs & risk metrics updated!`);
      } catch (err) {
        console.error("Upload error:", err);
        setError(err.message || "Failed to process the uploaded file. Please verify column headers and try again.");
      } finally {
        setIsLoading(false);
        setLoadingMessage("");
      }
    },
    [selectedCompany, thresholds, setActiveTab]
  );

  // Reset to clean empty state (removes all active data)
  const resetToEmptyState = useCallback(() => {
    setActiveDataset(null);
    setDatasetsList([]);
    localStorage.removeItem("churn_active_dataset");
    setSuccessMessage("Active dataset cleared. Displaying platform guide.");
  }, []);

  // Export dataset as Excel (.xlsx) workbook using SheetJS
  const exportDatasetExcel = useCallback(() => {
    if (!activeDataset || !activeDataset.analytics?.customers) {
      alert("No customer data available to export. Please upload a dataset first.");
      return;
    }
    const customers = activeDataset.analytics.customers;
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const rows = customers.map((c) => ({
      "Customer ID": c.id,
      "Customer Name": c.name,
      "Enterprise Company": selectedCompany?.name || activeDataset.companyName || "Enterprise",
      "Subscription Plan": c.plan,
      [`Monthly Billing (${curr.code})`]: Number(convertCurrency(c.charges, currency).toFixed(2)),
      "Tenure (Months)": c.tenure,
      "Churn Status": c.churned,
      "Predicted Churn Risk (%)": c.churnProbability,
      "Risk Segmentation": c.riskLevel,
      "Account Health": c.status,
      "Top Risk Factors": (c.riskFactors || []).join("; "),
      "Actionable Recommendations": (c.recommendations || []).join("; "),
      "Region / Territory": c.region,
    }));
    downloadExcel(
      rows,
      "Customer_Risk_Audit",
      `churn_audit_${selectedCompany?.id || "data"}_${Date.now()}.xlsx`
    );
  }, [activeDataset, currency, selectedCompany]);

  // Export dataset as clean CSV
  const exportDatasetCsv = useCallback(() => {
    if (!activeDataset || !activeDataset.analytics?.customers) {
      alert("No customer data available to export. Please upload a dataset first.");
      return;
    }
    const customers = activeDataset.analytics.customers;
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const rows = customers.map((c) => ({
      "Customer ID": c.id,
      "Customer Name": c.name,
      "Enterprise Company": selectedCompany?.name || activeDataset.companyName || "Enterprise",
      "Subscription Plan": c.plan,
      [`Monthly Billing (${curr.code})`]: Number(convertCurrency(c.charges, currency).toFixed(2)),
      "Tenure (Months)": c.tenure,
      "Churn Status": c.churned,
      "Predicted Churn Risk (%)": c.churnProbability,
      "Risk Segmentation": c.riskLevel,
      "Account Health": c.status,
      "Top Risk Factors": (c.riskFactors || []).join("; "),
      "Actionable Recommendations": (c.recommendations || []).join("; "),
      "Region / Territory": c.region,
    }));
    downloadCsv(
      rows,
      `churn_audit_${selectedCompany?.id || "data"}_${Date.now()}.csv`
    );
  }, [activeDataset, currency, selectedCompany]);

  // Switch Company handler (Strictly scopes data; NO demo data loading)
  const switchCompany = useCallback((companyId) => {
    const comp = companies.find((c) => c.id === companyId);
    if (comp) {
      setSelectedCompany(comp);
      try {
        localStorage.setItem("churn_selected_company", JSON.stringify(comp));
      } catch {
        // ignore
      }

      // If user uploaded a dataset for this company, activate it; otherwise leave activeDataset as null
      const matchingDs = datasetsList.find((d) => d.companyId === comp.id);
      if (matchingDs) {
        setActiveDataset(matchingDs);
      } else {
        // Do NOT load demo data!
        setActiveDataset(null);
      }
    }
  }, [companies, datasetsList]);

  // Add new Custom Company
  const addCompany = useCallback((newComp) => {
    setCompanies((prev) => {
      const updated = [...prev, newComp];
      try {
        localStorage.setItem("churn_companies_list", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    setSelectedCompany(newComp);
    try {
      localStorage.setItem("churn_selected_company", JSON.stringify(newComp));
    } catch {
      // ignore
    }
  }, []);

  // Switch between existing datasets
  const switchDataset = useCallback(
    (id) => {
      const found = datasetsList.find((d) => d.id === id);
      if (found) {
        setActiveDataset(found);
        if (found.companyId) {
          const comp = companies.find((c) => c.id === found.companyId);
          if (comp) setSelectedCompany(comp);
        }
        setSuccessMessage(`Switched active view to "${found.name}".`);
      }
    },
    [datasetsList, companies]
  );

  // Export current scored dataset to CSV
  const exportToCsv = useCallback(() => {
    if (!activeDataset || !activeDataset.analytics?.customers) return;

    const customers = activeDataset.analytics.customers;
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const headers = [
      "Customer ID",
      "Name",
      "Company",
      "Plan",
      `Monthly Spend (${curr.code})`,
      "Tenure (Mo)",
      "Churn Status",
      "Churn Probability (%)",
      "Risk Level",
      "Top Risk Factors",
      "Retention Recommendations",
    ];

    const rows = customers.map((c) => [
      `"${c.id}"`,
      `"${c.name}"`,
      `"${selectedCompany?.name || "Enterprise"}"`,
      `"${c.plan}"`,
      convertCurrency(c.charges, currency).toFixed(2),
      c.tenure,
      `"${c.churned}"`,
      c.churnProbability,
      `"${c.riskLevel}"`,
      `"${(c.riskFactors || []).join("; ")}"`,
      `"${(c.recommendations || []).join("; ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `churn_scored_${selectedCompany?.id || "data"}_${activeDataset.name.replace(/\.[^/.]+$/, "")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [activeDataset, currency, selectedCompany]);

  return (
    <DatasetContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        setTheme,
        toggleTheme,
        currency,
        setCurrency,
        currentCurrency,
        formatMoney,
        convertMoney,
        companies,
        selectedCompany,
        switchCompany,
        addCompany,
        sidebarOpen,
        setSidebarOpen,
        uploadModalOpen,
        setUploadModalOpen,
        selectedCustomer,
        setSelectedCustomer,
        thresholds,
        setThresholds: updateThresholds,
        isLoading,
        loadingMessage,
        error,
        setError,
        successMessage,
        setSuccessMessage,
        activeDataset,
        datasetsList,
        uploadAndProcessFile,
        switchDataset,
        exportToCsv,
        exportDatasetCsv,
        exportDatasetExcel,
        resetToEmptyState,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export const useDataset = () => {
  const context = useContext(DatasetContext);
  if (!context) {
    throw new Error("useDataset must be used within a DatasetProvider");
  }
  return context;
};
