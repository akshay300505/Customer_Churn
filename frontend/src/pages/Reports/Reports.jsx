import React from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  Printer,
  Download,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import { PageEmptyState } from "../../components/Common/PageEmptyState";

export const Reports = () => {
  const {
    activeDataset,
    formatMoney,
    currentCurrency,
    exportDatasetCsv,
    exportDatasetExcel,
  } = useDataset();

  if (!activeDataset || !activeDataset.analytics?.customers) {
    return (
      <PageEmptyState
        icon={FileSpreadsheet}
        title="Executive Churn Audit & Compliance Reports"
        subtitle="No customer dataset currently loaded. Upload your customer file (CSV, Excel, PDF, JSON) in the Data Studio or via the Upload button to generate print-ready executive briefs, CSV, and Excel exports."
        accentColor="emerald"
      />
    );
  }

  const analytics = activeDataset?.analytics;
  const kpis = analytics?.kpis || {};
  const urgentCustomers = analytics?.urgentActionCustomers || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900 gap-4 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Executive Churn Audit Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Print-ready executive summary and actionable retention roadmap for <strong className="text-slate-700 dark:text-slate-200">{activeDataset?.name}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={exportDatasetCsv}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            title="Download full analysis as CSV"
          >
            <Download size={14} className="text-slate-500 dark:text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={exportDatasetExcel}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition shadow-xs dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
            title="Download full analysis as Excel workbook (.xlsx)"
          >
            <FileSpreadsheet size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>Export Excel (.xlsx)</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/25 hover:bg-blue-700 transition"
          >
            <Printer size={14} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs space-y-8 dark:border-slate-800 dark:bg-slate-900 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b-2 border-slate-900 dark:border-slate-700 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white print:text-black">
                ChurnIntel<span className="text-blue-600">.ai</span>
              </span>
              <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 print:bg-slate-100 print:text-black">
                EXECUTIVE BRIEF
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 print:text-black mt-1">
              Customer & Revenue Churn Vulnerability Audit
            </h2>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 sm:text-right space-y-0.5 print:text-slate-600">
            <div>
              <strong>Audit Date:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            <div>
              <strong>Dataset Analyzed:</strong> {activeDataset?.name}
            </div>
            <div>
              <strong>Currency:</strong> {currentCurrency.name} ({currentCurrency.code} - {currentCurrency.symbol})
            </div>
          </div>
        </div>

        {/* Executive Summary Metrics Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            01. Key Financial & Churn Telemetry
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Customer Churn Rate</span>
              <strong className="text-2xl font-black text-rose-600 mt-1 block">{kpis.customerChurnRate}%</strong>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {kpis.customersLost} of {kpis.customersAtStart} accounts lost
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Revenue Churn Rate</span>
              <strong className="text-2xl font-black text-amber-600 mt-1 block">{kpis.revenueChurnRate}%</strong>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {formatMoney(kpis.recurringRevenueLost)} lost MRR
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Revenue at Risk</span>
              <strong className="text-2xl font-black text-rose-600 mt-1 block">{formatMoney(kpis.revenueAtRisk)}</strong>
              <span className="text-[10px] text-slate-400 mt-1 block">{kpis.atRiskPercentage}% of total MRR</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">High Risk Population</span>
              <strong className="text-2xl font-black text-rose-600 mt-1 block">{kpis.highRiskCount}</strong>
              <span className="text-[10px] text-slate-400 mt-1 block">urgent intervention pool</span>
            </div>
          </div>
        </div>

        {/* High Risk Accounts Priority List */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            02. High-Value Accounts at Immediate Churn Risk
          </h3>
          <div className="rounded-xl border border-slate-200 overflow-hidden dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 pl-4">Account ID</th>
                  <th className="py-2.5">Customer Name</th>
                  <th className="py-2.5">Plan</th>
                  <th className="py-2.5">Monthly Billing ({currentCurrency.symbol})</th>
                  <th className="py-2.5">Tenure</th>
                  <th className="py-2.5">Probability</th>
                  <th className="py-2.5 pr-4">Primary Risk Factor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {urgentCustomers.slice(0, 6).map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 pl-4 font-mono font-medium text-slate-500 dark:text-slate-400">{c.id}</td>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white">{c.name}</td>
                    <td className="py-2.5 text-slate-700 dark:text-slate-300">{c.plan}</td>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white">{formatMoney(c.charges)}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{c.tenure} mos</td>
                    <td className="py-2.5 font-black text-rose-600">{c.churnProbability}%</td>
                    <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400 truncate max-w-xs">{c.riskFactors[0] || "Tenure vulnerability"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Action Checklist */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            03. Recommended Executive Retention Roadmap
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold shrink-0">
                1
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  Target High-Risk Exposure Pool ({formatMoney(kpis.revenueAtRisk)})
                </strong>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Proactively engage the {kpis.highRiskCount} accounts driving {kpis.atRiskPercentage}% of financial risk with personalized annual renewal discounts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold shrink-0">
                2
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white font-bold block">
                  Address Early Tenure Churn (0-3 Months Window)
                </strong>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Accounts lost during onboarding represent the largest customer volume attrition. Implement automated check-ins and onboarding refreshers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Generated by ChurnIntel.ai Autonomous Intelligence Engine</span>
          <span>Confidential — Internal Business Telemetry</span>
        </div>
      </div>
    </div>
  );
};