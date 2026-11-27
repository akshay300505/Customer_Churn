import React from "react";
import { useDataset } from "../../context/DatasetContext";
import { CURRENCIES, convertCurrency } from "../../utils/currency";
import {
  Sliders,
  DollarSign,
  Database,
  RotateCcw,
  Sun,
  Moon,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const Settings = () => {
  const {
    thresholds,
    setThresholds,
    currency,
    setCurrency,
    theme,
    datasetsList,
    switchDataset,
    activeDataset,
    resetToEmptyState,
  } = useDataset();

  const handleHighChange = (e) => {
    const val = Number(e.target.value);
    setThresholds((prev) => ({
      ...prev,
      high: Math.max(val, prev.medium + 5),
    }));
  };

  const handleMediumChange = (e) => {
    const val = Number(e.target.value);
    setThresholds((prev) => ({
      ...prev,
      medium: Math.min(val, prev.high - 5),
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Application Settings & Intelligence Preferences
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Tune churn risk score sensitivity, currency conversion formulas, and application state.
        </p>
      </div>

      {/* Theme Appearance Status (Read-Only: Single Theme Switcher in Header) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {theme === "dark" ? <Moon size={16} className="text-blue-400" /> : <Sun size={16} className="text-amber-500" />}
              Interface Appearance & Theme
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Strictly centralized theme control: to toggle between Dark Mode and Light Mode, click the sun/moon button located in the top navigation header bar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold border flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-slate-800 text-blue-300 border-slate-700"
                  : "bg-amber-50 text-amber-900 border-amber-200"
              }`}
            >
              {theme === "dark" ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-amber-500" />}
              <span>Active: {theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Currency Conversion Settings */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign size={16} className="text-blue-600 dark:text-blue-400" />
            Financial Display Currency & Exchange Rate Formula
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            All monetary metrics (MRR, charges, at-risk revenue) are dynamically recalculated using the formula: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">Converted Amount = USD &times; Exchange Rate</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.values(CURRENCIES).map((c) => {
            const isSelected = currency === c.code;
            const convertedExample = convertCurrency(100, c.code).toLocaleString(undefined, {
              minimumFractionDigits: c.code === "JPY" ? 0 : 2,
              maximumFractionDigits: c.code === "JPY" ? 0 : 2,
            });

            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setCurrency(c.code)}
                className={`flex flex-col rounded-xl border p-3.5 text-left transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </div>
                  <span className="font-mono text-sm">{c.symbol}</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Exchange Rate:</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                    1 USD = {c.rate} {c.code}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-1">
                  <span>$100.00 USD &rarr;</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-mono">
                    {c.symbol}{convertedExample}
                  </strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Threshold Configuration Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders size={16} className="text-blue-600 dark:text-blue-400" />
            Churn Risk Probability Sensitivity Thresholds
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjusting thresholds dynamically recalculates all customer risk classifications, chart distributions, and revenue at risk across all views.
          </p>
        </div>

        {/* High Risk Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-800 dark:text-slate-200">
              High Risk Cutoff: <span className="text-rose-600 dark:text-rose-400 font-bold">&ge; {thresholds.high}%</span>
            </label>
            <span className="text-[11px] text-slate-400">Accounts flagged as urgent priority</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            value={thresholds.high}
            onChange={handleHighChange}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
          />
        </div>

        {/* Medium Risk Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-800 dark:text-slate-200">
              Medium Risk Cutoff: <span className="text-amber-600 dark:text-amber-400 font-bold">&ge; {thresholds.medium}%</span>
            </label>
            <span className="text-[11px] text-slate-400">Accounts needing monitoring</span>
          </div>
          <input
            type="range"
            min="20"
            max="70"
            value={thresholds.medium}
            onChange={handleMediumChange}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-850 p-4 text-xs flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-300">
            Low Risk Range: <strong>0% to {thresholds.medium - 1}%</strong>
          </span>
          <button
            type="button"
            onClick={() => setThresholds({ high: 70, medium: 40 })}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Reset to Defaults (70% / 40%)
          </button>
        </div>
      </div>

      {/* Active Datasets Management */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database size={16} className="text-blue-600 dark:text-blue-400" />
              Active Datasets ({datasetsList.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              User datasets processed and loaded in the current browser session.
            </p>
          </div>
        </div>

        {datasetsList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-6 text-center text-xs text-slate-400 dark:text-slate-500">
            No user datasets loaded yet. Upload your customer dataset from the Data Studio or via the Upload button to start analysis.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {datasetsList.map((ds) => (
              <div
                key={ds.id}
                className={`flex items-center justify-between p-3.5 text-xs ${
                  ds.id === activeDataset?.id
                    ? "bg-blue-50/60 dark:bg-blue-950/30"
                    : "bg-white dark:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white">{ds.name}</strong>
                    {ds.id === activeDataset?.id && (
                      <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {ds.format} • {ds.rowsCount?.toLocaleString()} records • {ds.uploadDate}
                  </span>
                </div>

                {ds.id !== activeDataset?.id && (
                  <button
                    type="button"
                    onClick={() => switchDataset(ds.id)}
                    className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition"
                  >
                    Switch View
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clean State Reset Management */}
      <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-6 shadow-xs space-y-3 dark:border-rose-900/40 dark:bg-rose-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
              Reset Application to Clean Empty State
            </h3>
            <p className="text-xs text-rose-700/80 dark:text-rose-300/70 mt-0.5">
              Clears loaded portfolio cache so you can test the clean empty state and upload a brand new dataset from scratch.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to clear current session data and return to empty state?")) {
                resetToEmptyState();
              }
            }}
            className="rounded-xl border border-rose-300 bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition"
          >
            Reset to Empty State
          </button>
        </div>
      </div>
    </div>
  );
};