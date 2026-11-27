import React, { useState } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Users,
  ShieldAlert,
  ArrowUpRight,
  Database,
  UploadCloud,
  ChevronRight,
  BarChart2,
  PieChart as PieIcon,
  Activity,
  Calculator,
  Info,
  LineChart as LineChartIcon,
  CheckCircle2,
  Download,
  Printer,
  FileSpreadsheet,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { DatasetEmptyState } from "../../components/Common/DatasetEmptyState";
import { CompanyGrowthGuidance } from "../../components/Cards/CompanyGrowthGuidance";

export const Dashboard = () => {
  const {
    activeDataset,
    formatMoney,
    currentCurrency,
    setUploadModalOpen,
    setActiveTab,
    setSelectedCustomer,
    theme,
    successMessage,
    exportDatasetExcel,
    exportDatasetCsv,
  } = useDataset();

  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  if (!activeDataset || !activeDataset.analytics?.customers) {
    return (
      <DatasetEmptyState
        title="Customer Churn Intelligence Dashboard"
        subtitle="No customer dataset currently loaded. Upload your customer file (CSV, Excel, PDF, JSON) to generate real KPIs, risk segmentation, financial churn metrics, and AI retention guidance."
      />
    );
  }

  const analytics = activeDataset?.analytics;
  const kpis = analytics?.kpis || {};
  const charts = analytics?.charts || {};
  const urgentCustomers = analytics?.urgentActionCustomers || [];
  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      {/* Top Welcome / Dataset Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
            <Activity size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight sm:text-2xl">
                Customer & Revenue Churn Dashboard
              </h1>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                {activeDataset?.format}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Computed from <strong className="text-slate-700 dark:text-slate-200">{activeDataset?.name}</strong> • Display Currency: <strong className="text-blue-600 dark:text-blue-400">{currentCurrency.name} ({currentCurrency.symbol})</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Download Dashboard Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750"
            >
              <Download size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Download Dashboard</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {downloadMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDownloadMenuOpen(false)} />
                <div className="absolute right-0 mt-1.5 z-50 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Dashboard Export Options
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDownloadMenuOpen(false);
                        window.print();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
                    >
                      <Printer size={15} className="text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-semibold">Print / Save as PDF</div>
                        <div className="text-[10px] text-slate-400">Download formatted executive PDF</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDownloadMenuOpen(false);
                        exportDatasetExcel();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
                    >
                      <FileSpreadsheet size={15} className="text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <div className="font-semibold">Excel Workbook (.xlsx)</div>
                        <div className="text-[10px] text-slate-400">Complete customer audit spreadsheet</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDownloadMenuOpen(false);
                        exportDatasetCsv();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
                    >
                      <Download size={15} className="text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="font-semibold">CSV Scored Export</div>
                        <div className="text-[10px] text-slate-400">Raw rows with churn risk scores</div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Database size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Switch Dataset</span>
          </button>
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/30 hover:bg-blue-700 transition"
          >
            <UploadCloud size={14} />
            <span>Upload New File</span>
          </button>
        </div>
      </div>

      {/* Live Data Ingestion & Validation Success Banner */}
      {successMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/90 bg-emerald-50/90 p-4 text-xs font-semibold text-emerald-950 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200 shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-emerald-900 dark:text-emerald-300">Data Validated & Auto-Updated Successfully</div>
            <p className="text-[11px] font-normal text-emerald-800/90 dark:text-emerald-300/80 mt-0.5">{successMessage}</p>
          </div>
        </div>
      )}

      {/* 4 Core KPI Cards with Explicit Mathematical Formulas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Customer Churn Rate */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Customer Churn Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <TrendingDown size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
              {kpis.customerChurnRate || "0.0"}%
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {kpis.customersLost} of {kpis.customersAtStart} lost
            </span>
          </div>
          {/* Clean Metric Baseline Status */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Retained Cohort</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {kpis.activeCount || (kpis.customersAtStart - kpis.customersLost)} accounts
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
            <span>Customer Retention Rate:</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{kpis.customerRetentionRate}%</strong>
          </div>
        </div>

        {/* KPI 2: Revenue Churn Rate */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Revenue Churn Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <DollarSign size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
              {kpis.revenueChurnRate || "0.0"}%
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              MRR lost
            </span>
          </div>
          {/* Clean Metric Baseline Status */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Monthly Recurring Lost</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {formatMoney(kpis.recurringRevenueLost)}/mo
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
            <span>Revenue Retention:</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{kpis.revenueRetentionRate}%</strong>
          </div>
        </div>

        {/* KPI 3: Total Recurring Revenue (MRR) */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Recurring Revenue (MRR)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Users size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {formatMoney(kpis.recurringRevenueAtStart)}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              per month
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
            <span>Estimated Annual (ARR):</span>
            <strong className="text-slate-800 dark:text-slate-200 font-bold">{formatMoney(kpis.estimatedARR)}</strong>
          </div>
        </div>

        {/* KPI 4: High Risk Revenue at Stake */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Revenue at Risk</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <ShieldAlert size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
              {formatMoney(kpis.revenueAtRisk)}
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {kpis.atRiskPercentage}% pool
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
            <span>High Risk Accounts:</span>
            <strong className="text-rose-600 dark:text-rose-400 font-bold">{kpis.highRiskCount} accounts</strong>
          </div>
        </div>
      </div>

      {/* Churn Trend Chart – Historical time-series if available, otherwise navigate prompt */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <LineChartIcon size={16} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {charts.hasHistoricalTrend
                  ? "Historical Churn Dynamics: Customer Churn vs. Revenue Churn Trend"
                  : "Customer Retention & Survival Dynamics Across Tenure Cohorts"}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {charts.hasHistoricalTrend
                ? "Time-series trend analysis comparing percentage of accounts lost versus recurring revenue lost over consecutive months."
                : "Real cohort survival curve tracking account retention and churn rate across customer lifespan."}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {charts.hasHistoricalTrend ? (
              <>
                <span className="flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Customer Churn %
                </span>
                <span className="flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Revenue Churn %
                </span>
                <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Retention %
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Retention Rate %
                </span>
                <span className="flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Churn Rate %
                </span>
              </>
            )}
          </div>
        </div>

        {charts.hasHistoricalTrend ? (
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={charts.monthlyTrendLineData || []}
                margin={{ top: 15, right: 20, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }} unit="%" />
                <Tooltip
                  formatter={(val, name) => [
                    `${val}%`,
                    name === "customerChurnRate"
                      ? "Customer Churn Rate"
                      : name === "revenueChurnRate"
                      ? "Revenue Churn Rate"
                      : "Retention Rate",
                  ]}
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderRadius: "12px",
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    color: isDark ? "#f8fafc" : "#0f172a",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(val) => (
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {val === "customerChurnRate"
                        ? "Customer Churn Rate (%)"
                        : val === "revenueChurnRate"
                        ? "Revenue Churn Rate (%)"
                        : "Customer Retention Rate (%)"}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="customerChurnRate"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenueChurnRate"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#f59e0b" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="customerRetentionRate"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
              <Info size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Tenure Survival & Cohort Retention Curve Available in Analytics
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Your dataset does not contain time-stamped monthly records required for a historical trend line. The full<strong> customer survival curve</strong>, plan vulnerability bars, and spend distribution are available on the <strong>Deep Analytics</strong> page — computed directly from your actual tenure data.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("analytics")}
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700 transition"
                >
                  Open Deep Analytics <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Company Growth & Revenue Expansion Engine with Interactive Simulations */}
      <CompanyGrowthGuidance />

      {/* Quick Navigation: Page Shortcuts to Specialized Views */}
      <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50/50 p-5 dark:border-blue-900/50 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-blue-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-sm">
              <BarChart2 size={15} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Explore Deeper Intelligence — Navigate to Specialized Views
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Each section below provides dedicated, non-overlapping analysis of your customer portfolio
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("customers")}
            className="group flex flex-col items-start gap-1.5 rounded-xl border border-slate-200/80 bg-white p-4 text-left hover:border-blue-400 hover:shadow-sm transition dark:border-slate-800 dark:bg-slate-850 dark:hover:border-blue-600"
          >
            <span className="rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition">
              <Users size={15} />
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">Customer Explorer</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Search, sort & inspect every account's individual risk profile and behavioral metrics.
            </span>
            <span className="mt-auto text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              View All Customers <ChevronRight size={12} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className="group flex flex-col items-start gap-1.5 rounded-xl border border-slate-200/80 bg-white p-4 text-left hover:border-indigo-400 hover:shadow-sm transition dark:border-slate-800 dark:bg-slate-850 dark:hover:border-indigo-600"
          >
            <span className="rounded-lg bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition">
              <LineChartIcon size={15} />
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">Deep Analytics</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Survival curves, cohort retention decay, plan vulnerability & spend tier distributions.
            </span>
            <span className="mt-auto text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Open Analytics <ChevronRight size={12} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("predictions")}
            className="group flex flex-col items-start gap-1.5 rounded-xl border border-slate-200/80 bg-white p-4 text-left hover:border-purple-400 hover:shadow-sm transition dark:border-slate-800 dark:bg-slate-850 dark:hover:border-purple-600"
          >
            <span className="rounded-lg bg-purple-100 p-2 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition">
              <ShieldAlert size={15} />
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">Churn Prediction Engine</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Rule-based risk scoring, feature weights, and live sensitivity threshold tuning.
            </span>
            <span className="mt-auto text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Predictions <ChevronRight size={12} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guidance")}
            className="group flex flex-col items-start gap-1.5 rounded-xl border border-slate-200/80 bg-white p-4 text-left hover:border-emerald-400 hover:shadow-sm transition dark:border-slate-800 dark:bg-slate-850 dark:hover:border-emerald-600"
          >
            <span className="rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition">
              <ArrowUpRight size={15} />
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">Retention Playbook</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Per-account recovery actions, strategy feedback logging & playbook execution tracking.
            </span>
            <span className="mt-auto text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Open Playbook <ChevronRight size={12} />
            </span>
          </button>
        </div>
      </div>

      {/* Primary Chart Visualizers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Churn Risk Tier Distribution */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Risk Segmentation Breakdown</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Distribution of customers across risk tiers</p>
            </div>
            <PieIcon size={15} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.riskDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {(charts.riskDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, item) => [
                    `${value} customers (${item.payload.percent}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderRadius: "12px",
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    color: isDark ? "#f8fafc" : "#0f172a",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry) => (
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {value} ({entry.payload.value})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Churn by Plan / Subscription Tier */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Churn by Subscription Tier</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Retained vs churned accounts across plans</p>
            </div>
            <BarChart2 size={15} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={charts.churnByPlan || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey="plan" tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }} />
                <Tooltip
                  formatter={(val, name) => [`${val} accounts`, name === "churned" ? "Churned" : "Retained"]}
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderRadius: "12px",
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    color: isDark ? "#f8fafc" : "#0f172a",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {value === "retained" ? "Retained Accounts" : "Churned Accounts"}
                    </span>
                  )}
                />
                <Bar dataKey="retained" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Urgent Action Priority Accounts */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Urgent At-Risk Accounts Requiring Intervention
              </h3>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                Top Priority
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              High-spend accounts with elevated churn probability. Intervene to protect recurring revenue.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("customers")}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All Customers ({kpis.customersAtStart?.toLocaleString()}) <ChevronRight size={14} />
          </button>
        </div>

        {urgentCustomers.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No high-risk accounts detected in this dataset.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-3 pl-2">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Monthly Billing ({currentCurrency.symbol})</th>
                  <th className="pb-3">Tenure</th>
                  <th className="pb-3">Churn Probability</th>
                  <th className="pb-3">Risk Level</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {urgentCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedCustomer(cust)}
                  >
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs">
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
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">{cust.plan}</td>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">
                      {formatMoney(cust.charges)}
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-400">{cust.tenure} mos</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${cust.churnProbability}%` }}
                          />
                        </div>
                        <span className="font-black text-rose-600 dark:text-rose-400">{cust.churnProbability}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                        High Risk
                      </span>
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(cust);
                        }}
                        className="rounded-lg bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                      >
                        Inspect & Retain
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};