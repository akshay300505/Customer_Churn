import React, { useState, useMemo } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Users,
} from "lucide-react";
import { PageEmptyState } from "../../components/Common/PageEmptyState";

export const Customers = () => {
  const { activeDataset, formatMoney, currentCurrency, setSelectedCustomer, exportToCsv } = useDataset();

  const allCustomers = useMemo(
    () => activeDataset?.analytics?.customers || [],
    [activeDataset?.analytics?.customers]
  );

  if (!activeDataset || allCustomers.length === 0) {
    return (
      <PageEmptyState
        icon={Users}
        title="Customer Explorer & Risk Profiles"
        subtitle="No customer records currently loaded. Upload your customer file (CSV, Excel, PDF, JSON) in the Data Studio or via the Upload button to search, sort, and inspect individual account risk profiles."
        accentColor="blue"
      />
    );
  }

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [sortField, setSortField] = useState("churnProbability");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Dynamic plan options
  const planOptions = useMemo(() => {
    const set = new Set(allCustomers.map((c) => c.plan).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [allCustomers]);

  // Filtering
  const filteredCustomers = useMemo(() => {
    return allCustomers.filter((c) => {
      const search = searchTerm.toLowerCase().trim();
      const nameStr = String(c.name || "").toLowerCase();
      const idStr = String(c.id || "").toLowerCase();
      const planStr = String(c.plan || "").toLowerCase();

      const matchesSearch =
        !search ||
        nameStr.includes(search) ||
        idStr.includes(search) ||
        planStr.includes(search);

      const matchesRisk = selectedRisk === "All" || c.riskLevel === selectedRisk;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Churned" ? c.churned === "Yes" : c.churned !== "Yes");
      const matchesPlan = selectedPlan === "All" || c.plan === selectedPlan;

      return matchesSearch && matchesRisk && matchesStatus && matchesPlan;
    });
  }, [allCustomers, searchTerm, selectedRisk, selectedStatus, selectedPlan]);

  // Sorting
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      let aVal = a[sortField] ?? "";
      let bVal = b[sortField] ?? "";

      if (typeof aVal === "string" || typeof bVal === "string") {
        return sortOrder === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [filteredCustomers, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / itemsPerPage));
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedCustomers.slice(start, start + itemsPerPage);
  }, [sortedCustomers, currentPage]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Customer Explorer & Risk Profiles
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Search, filter, and inspect predictive churn profiles for all <strong className="text-slate-700 dark:text-slate-200">{allCustomers.length.toLocaleString()}</strong> accounts in <strong className="text-blue-600 dark:text-blue-400">{currentCurrency.name} ({currentCurrency.symbol})</strong>.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-[11px] rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/60">
              Full account roster — all {allCustomers.length.toLocaleString()} records
            </span>
            <span className="text-[11px] rounded-full border border-purple-100 bg-purple-50 px-2.5 py-0.5 font-bold text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900/60">
              Multi-column search & sort
            </span>
            <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/60">
              Click any row to inspect individual risk profile
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={exportToCsv}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <Download size={14} className="text-slate-500 dark:text-slate-400" />
          <span>Export Scored CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs space-y-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, name, plan..."
              className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
          </div>

          {/* Risk Level */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => {
                setSelectedRisk(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Risk Tiers</option>
              <option value="High">High Risk (&ge;70%)</option>
              <option value="Medium">Medium Risk (40-69%)</option>
              <option value="Low">Low Risk (&lt;40%)</option>
            </select>
          </div>

          {/* Churn Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Churn Statuses</option>
              <option value="Churned">Confirmed / Predicted Churned</option>
              <option value="Retained">Active / Retained</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <select
              value={selectedPlan}
              onChange={(e) => {
                setSelectedPlan(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan === "All" ? "All Plans / Tiers" : plan}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredCustomers.length}</strong> matching accounts
          </span>
          {(searchTerm || selectedRisk !== "All" || selectedStatus !== "All" || selectedPlan !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedRisk("All");
                setSelectedStatus("All");
                setSelectedPlan("All");
                setCurrentPage(1);
              }}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Customer Table (Desktop & Tablet) */}
      <div className="hidden md:block rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase text-[10px] tracking-wider dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400">
              <th className="py-3.5 pl-4 cursor-pointer" onClick={() => toggleSort("name")}>
                <div className="flex items-center gap-1">Customer <ArrowUpDown size={11} /></div>
              </th>
              <th className="py-3.5 cursor-pointer" onClick={() => toggleSort("plan")}>
                <div className="flex items-center gap-1">Plan <ArrowUpDown size={11} /></div>
              </th>
              <th className="py-3.5 cursor-pointer" onClick={() => toggleSort("charges")}>
                <div className="flex items-center gap-1">Monthly Billing ({currentCurrency.symbol}) <ArrowUpDown size={11} /></div>
              </th>
              <th className="py-3.5 cursor-pointer" onClick={() => toggleSort("tenure")}>
                <div className="flex items-center gap-1">Tenure <ArrowUpDown size={11} /></div>
              </th>
              <th className="py-3.5 cursor-pointer" onClick={() => toggleSort("churnProbability")}>
                <div className="flex items-center gap-1">Churn Probability <ArrowUpDown size={11} /></div>
              </th>
              <th className="py-3.5">Risk Tier</th>
              <th className="py-3.5 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedCustomers.map((cust) => {
              const isHigh = cust.riskLevel === "High";
              const isMed = cust.riskLevel === "Medium";
              return (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 text-xs">
                        {cust.initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {cust.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{cust.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 font-medium text-slate-700 dark:text-slate-300">{cust.plan}</td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                    {formatMoney(cust.charges)}
                  </td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-400">{cust.tenure} mos</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            isHigh ? "bg-rose-500" : isMed ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${cust.churnProbability}%` }}
                        />
                      </div>
                      <span
                        className={`font-black ${
                          isHigh ? "text-rose-600 dark:text-rose-400" : isMed ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {cust.churnProbability}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isHigh
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                          : isMed
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      }`}
                    >
                      {cust.riskLevel}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(cust);
                      }}
                      className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid View (< 768px) */}
      <div className="md:hidden space-y-3">
        {paginatedCustomers.map((cust) => {
          const isHigh = cust.riskLevel === "High";
          const isMed = cust.riskLevel === "Medium";
          return (
            <div
              key={cust.id}
              onClick={() => setSelectedCustomer(cust)}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs active:bg-slate-50 transition dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 text-xs">
                    {cust.initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{cust.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{cust.id}</span>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isHigh
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                      : isMed
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}
                >
                  {cust.riskLevel} Risk
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                  <span className="text-[10px] text-slate-400 block">Plan</span>
                  <strong className="text-slate-800 dark:text-slate-200 truncate block">{cust.plan}</strong>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                  <span className="text-[10px] text-slate-400 block">Spend</span>
                  <strong className="text-slate-800 dark:text-slate-200">{formatMoney(cust.charges)}</strong>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                  <span className="text-[10px] text-slate-400 block">Risk Score</span>
                  <strong className={isHigh ? "text-rose-600 dark:text-rose-400 font-black" : "text-slate-800 dark:text-slate-200"}>
                    {cust.churnProbability}%
                  </strong>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">{cust.tenure} months tenure</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-[11px]">View Details &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 text-xs shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <span className="text-slate-500 dark:text-slate-400">
          Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of <strong className="text-slate-900 dark:text-white">{totalPages}</strong>
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};