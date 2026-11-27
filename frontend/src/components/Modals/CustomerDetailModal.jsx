import React from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Lightbulb,
  CreditCard,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

export const CustomerDetailModal = () => {
  const { selectedCustomer, setSelectedCustomer, formatMoney, currentCurrency } = useDataset();

  if (!selectedCustomer) return null;

  const c = selectedCustomer;
  const isHighRisk = c.riskLevel === "High";
  const isMediumRisk = c.riskLevel === "Medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedCustomer(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-base shadow-sm">
              {c.initials || "CU"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{c.name}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    isHighRisk
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                      : isMediumRisk
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}
                >
                  {c.riskLevel} Risk
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">ID: {c.id}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Churn Probability Visual Gauge */}
        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-850">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingDown size={14} className={isHighRisk ? "text-rose-600" : "text-amber-500"} />
              Calculated Churn Probability
            </span>
            <span
              className={`text-base font-black ${
                isHighRisk ? "text-rose-600 dark:text-rose-400" : isMediumRisk ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {c.churnProbability}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isHighRisk
                  ? "bg-gradient-to-r from-amber-500 to-rose-600"
                  : isMediumRisk
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${c.churnProbability}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Low Risk (0-39%)</span>
            <span>Medium Risk (40-69%)</span>
            <span>High Risk (70-100%)</span>
          </div>
        </div>

        {/* Quick Attributes Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <CreditCard size={12} /> Monthly Spend
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {formatMoney(c.charges)}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Calendar size={12} /> Account Tenure
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {c.tenure} months
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Layers size={12} /> Current Plan
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
              {c.plan}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> Churn Status
            </span>
            <div className={`text-sm font-bold mt-1 ${c.churned === "Yes" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
              {c.churned}
            </div>
          </div>
        </div>

        {/* Contributing Risk Factors */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
            <AlertTriangle size={14} className="text-amber-500" />
            Detected Risk Drivers
          </h4>
          <div className="space-y-1.5">
            {(c.riskFactors || []).map((factor, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/50 px-3 py-2 text-xs font-medium text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Retention Recommendations */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
            <Lightbulb size={14} className="text-blue-600 dark:text-blue-400" />
            Recommended Retention Playbook
          </h4>
          <div className="space-y-2">
            {(c.recommendations || []).map((rec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-xs text-blue-950 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-200 font-medium"
              >
                <Sparkles size={15} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert(`Initiated retention intervention workflow for customer ${c.id}`);
              setSelectedCustomer(null);
            }}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Execute Retention Action
          </button>
        </div>
      </div>
    </div>
  );
};
