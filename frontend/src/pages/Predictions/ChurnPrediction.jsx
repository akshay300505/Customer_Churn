import React, { useState, useMemo } from "react";
import { useDataset } from "../../context/DatasetContext";
import { PageEmptyState } from "../../components/Common/PageEmptyState";
import {
  Brain,
  Sliders,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Search,
  ChevronRight,
  Sparkles,
  Info,
  Scale,
  Activity,
  Layers,
  ArrowUpDown,
  Download,
} from "lucide-react";

export const ChurnPrediction = () => {
  const {
    activeDataset,
    thresholds,
    setThresholds,
    formatMoney,
    currentCurrency,
    setSelectedCustomer,
    exportToCsv,
  } = useDataset();

  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!activeDataset || !activeDataset.analytics?.customers) {
    return (
      <PageEmptyState
        icon={Brain}
        title="Predictive Churn Risk Engine & Sensitivity Analysis"
        subtitle="No customer dataset currently loaded. Upload your customer file (CSV, Excel, PDF, JSON) in the Data Studio or via the Upload button to generate rule-based churn predictions, feature importance weights, and threshold sensitivity analysis."
        accentColor="purple"
      />
    );
  }

  const analytics = activeDataset.analytics;
  const model = analytics.predictionModel || {};
  const customers = analytics.customers || [];

  // Sliders for live risk sensitivity tuning
  const handleHighThresholdChange = (e) => {
    const val = Number(e.target.value);
    setThresholds((prev) => ({
      ...prev,
      high: Math.max(val, prev.medium + 5),
    }));
  };

  const handleMediumThresholdChange = (e) => {
    const val = Number(e.target.value);
    setThresholds((prev) => ({
      ...prev,
      medium: Math.min(val, prev.high - 5),
    }));
  };

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.plan.toLowerCase().includes(q);

      const matchRisk =
        riskFilter === "all" ||
        (riskFilter === "critical" && c.churnProbability >= 80) ||
        (riskFilter === "high" && c.riskLevel === "High") ||
        (riskFilter === "medium" && c.riskLevel === "Medium") ||
        (riskFilter === "low" && c.riskLevel === "Low");

      return matchSearch && matchRisk;
    });
  }, [customers, searchTerm, riskFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / itemsPerPage));
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md shadow-indigo-500/20">
              <Brain size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Rule-Based Churn Risk Assessment & Predictive Modeling
                </h1>
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-bold text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                  v{model.version || "2.4.0"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Explainable behavioral scoring, feature importance weights, and real-time sensitivity controls for <strong className="text-slate-700 dark:text-slate-200">{activeDataset.name}</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={exportToCsv}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Download size={14} className="text-slate-500 dark:text-slate-400" />
            <span>Export Scored Predictions</span>
          </button>
        </div>
      </div>

      {/* Model Performance & Evaluation Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Total Evaluated
          </span>
          <strong className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">
            {model.totalEvaluated?.toLocaleString()}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">100% of portfolio scored</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Predicted Churn Accounts
          </span>
          <strong className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
            {model.predictedChurnCount?.toLocaleString()}
          </strong>
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-bold mt-1 block">
            {model.predictedChurnRate}% of customer base
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Critical Risk Cohort
          </span>
          <strong className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
            {model.criticalRiskCount?.toLocaleString()}
          </strong>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold mt-1 block">
            Probability &ge; 80%
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {model.hasGroundTruth ? "Ground-Truth Accuracy" : "Risk Scoring Engine"}
          </span>
          <strong className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            {model.modelAccuracy !== null ? `${model.modelAccuracy}%` : "Heuristic Rule-Engine"}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {model.hasGroundTruth
              ? `Benchmarked vs ${model.evaluatedSampleCount} ground-truth records`
              : "Calibrated on multi-factor enterprise retention weights"}
          </span>
        </div>
      </div>

      {/* Feature Importance & Explainability Weights */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale size={16} className="text-indigo-600 dark:text-indigo-400" />
            Explainable Behavioral Feature Weights
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Relative weight and impact of each telemetry signal in the heuristic risk assessment algorithm:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(model.featuresUsed || []).map((feat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-black uppercase ${
                      feat.impact === "Critical"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                        : feat.impact === "High"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    }`}
                  >
                    {feat.impact} Impact
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                    {feat.weight}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{feat.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threshold Sensitivity Tuning Simulator */}
      <div className="rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/40 via-purple-50/30 to-slate-50/50 p-6 shadow-xs dark:border-indigo-900/40 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Dynamic Sensitivity Threshold Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjusting thresholds immediately updates risk cohort classifications, at-risk revenue calculations, and retention priorities across the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* High Risk Slider */}
          <div className="space-y-2 rounded-xl bg-white p-4 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                High Risk Threshold
              </label>
              <span className="font-mono text-sm font-black text-rose-600 dark:text-rose-400">
                &ge; {thresholds.high}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={90}
              value={thresholds.high}
              onChange={handleHighThresholdChange}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>More Alert (50%)</span>
              <strong className="text-slate-700 dark:text-slate-300 font-semibold">
                {model.highRiskCount} Accounts Classified
              </strong>
              <span>Conservative (90%)</span>
            </div>
          </div>

          {/* Medium Risk Slider */}
          <div className="space-y-2 rounded-xl bg-white p-4 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Medium Risk Threshold
              </label>
              <span className="font-mono text-sm font-black text-amber-600 dark:text-amber-400">
                &ge; {thresholds.medium}%
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={65}
              value={thresholds.medium}
              onChange={handleMediumThresholdChange}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Broad Watch (20%)</span>
              <strong className="text-slate-700 dark:text-slate-300 font-semibold">
                {model.mediumRiskCount} Accounts Classified
              </strong>
              <span>Strict (65%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Predictions Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Customer Churn Probability Scoring
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Showing {filteredCustomers.length} scored accounts. Click any customer to inspect full risk profile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search accounts..."
                className="rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-blue-500 w-48"
              />
            </div>

            {/* Risk filter */}
            <select
              value={riskFilter}
              onChange={(e) => {
                setRiskFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical (&ge;80%)</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-850 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Account ID & Name</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Monthly Spend</th>
                <th className="py-3 px-4">Tenure</th>
                <th className="py-3 px-4">Predicted Churn Risk</th>
                <th className="py-3 px-4">Key Risk Factor</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {paginatedCustomers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-850/60 cursor-pointer transition"
                >
                  <td className="py-3 px-4 font-medium">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-black text-[10px] dark:bg-indigo-950/60 dark:text-indigo-300">
                        {c.initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{c.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {c.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {formatMoney(c.charges)}
                  </td>
                  <td className="py-3 px-4">{c.tenure} mos</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          c.churnProbability >= 80
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
                            : c.riskLevel === "High"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                            : c.riskLevel === "Medium"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        }`}
                      >
                        {c.churnProbability}% Risk
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full ${
                            c.churnProbability >= 70
                              ? "bg-rose-500"
                              : c.churnProbability >= 40
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${c.churnProbability}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-slate-500 dark:text-slate-400 max-w-xs truncate">
                    {c.riskFactors?.[0] || "Standard Activity"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      Inspect &rarr;
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border px-3 py-1 font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border px-3 py-1 font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
