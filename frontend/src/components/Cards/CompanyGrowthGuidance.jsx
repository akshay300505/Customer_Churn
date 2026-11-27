import React, { useState, useMemo } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  TrendingUp,
  Sparkles,
  DollarSign,
  ShieldCheck,
  Zap,
  Target,
  ArrowUpRight,
  Layers,
  Award,
  ChevronRight,
  CheckCircle2,
  Clock,
  Users,
  Building,
  BarChart2,
  BookOpen,
  PieChart,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

export const CompanyGrowthGuidance = ({ compact = false }) => {
  const { activeDataset, formatMoney, currentCurrency, currency } = useDataset();

  // Simulated churn reduction slider (1% to 10%)
  const [targetReduction, setTargetReduction] = useState(5);
  // View mode tab: "levers" | "playbooks" | "matrix"
  const [activeGrowthTab, setActiveGrowthTab] = useState("levers");

  const analytics = activeDataset?.analytics;
  const kpis = analytics?.kpis || {};
  const customers = analytics?.customers || [];

  // Growth calculations based on real dataset metrics
  const growthCalculations = useMemo(() => {
    const totalMRR = kpis.recurringRevenueAtStart || 0;
    const totalARR = totalMRR * 12;
    const customerCount = kpis.customersAtStart || 0;
    const churnRate = parseFloat(kpis.customerChurnRate || 0);

    // Churn reduction effect
    const reductionFraction = targetReduction / 100;
    const retainedAccounts = Math.round(customerCount * reductionFraction);
    const mrrSaved = totalMRR * reductionFraction;
    const arrSaved = mrrSaved * 12;

    // 6x ARR valuation multiple impact
    const valuationImpact = arrSaved * 6;

    // Current Net Revenue Retention (NRR) approximation
    const grossRetention = parseFloat(kpis.revenueRetentionRate || 85);
    const estimatedExpansionRate = 14.2; // Benchmark expansion
    const estimatedNRR = Math.min(135, Math.max(70, grossRetention + estimatedExpansionRate)).toFixed(1);

    // Segment counts for growth opportunities
    const lowRiskExpansionPool = customers.filter((c) => c.riskLevel === "Low");
    const highSpendExpansionMRR = lowRiskExpansionPool.reduce((acc, c) => acc + c.charges, 0);
    const potentialUpsellARR = highSpendExpansionMRR * 0.18 * 12;

    const earlyTenurePool = customers.filter((c) => c.tenure <= 3);
    const earlyTenureLost = earlyTenurePool.filter((c) => c.riskLevel === "High" || c.churned === "Yes").length;

    // Estimated LTV calculation (Average Monthly Revenue per user / monthly churn rate)
    const arpu = customerCount > 0 ? totalMRR / customerCount : 0;
    const monthlyChurnFraction = Math.max(0.01, (churnRate / 100));
    const currentLTV = Math.round(arpu / monthlyChurnFraction);
    const improvedLTV = Math.round(arpu / Math.max(0.005, (monthlyChurnFraction - (reductionFraction * 0.5))));
    const ltvUpliftPercent = currentLTV > 0 ? Math.round(((improvedLTV - currentLTV) / currentLTV) * 100) : 0;

    return {
      totalARR,
      arrSaved,
      mrrSaved,
      retainedAccounts,
      valuationImpact,
      estimatedNRR,
      lowRiskCount: lowRiskExpansionPool.length,
      potentialUpsellARR,
      earlyTenureCount: earlyTenurePool.length,
      earlyTenureLost,
      arpu,
      currentLTV,
      improvedLTV,
      ltvUpliftPercent,
    };
  }, [kpis, customers, targetReduction]);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 lg:p-6 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20">
            <TrendingUp size={20} className="sm:size-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 className="text-sm sm:text-base lg:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Company Growth & Revenue Expansion Engine
              </h3>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-800 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                GROWTH ENGINE
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Actionable strategic playbooks, ARR compounding, and financial explanations to accelerate company scaling.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 self-start sm:self-auto max-w-full overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800 text-[11px] font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveGrowthTab("levers")}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition ${
              activeGrowthTab === "levers"
                ? "bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Growth Levers
          </button>
          <button
            type="button"
            onClick={() => setActiveGrowthTab("playbooks")}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition ${
              activeGrowthTab === "playbooks"
                ? "bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Executive Explanations
          </button>
          <button
            type="button"
            onClick={() => setActiveGrowthTab("matrix")}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition ${
              activeGrowthTab === "matrix"
                ? "bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Execution Roadmap
          </button>
        </div>
      </div>

      {/* 4 Financial Growth Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 sm:p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block truncate">
            ARR Unlocked (+{targetReduction}%)
          </span>
          <strong className="text-base sm:text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-0.5 sm:mt-1 block truncate">
            +{formatMoney(growthCalculations.arrSaved)}
          </strong>
          <span className="text-[9px] sm:text-[10px] text-emerald-700/80 dark:text-emerald-300/80 mt-0.5 sm:mt-1 block font-medium">
            Recurring cash flow preserved
          </span>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 sm:p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block truncate">
            Accounts Protected
          </span>
          <strong className="text-base sm:text-2xl font-black text-blue-900 dark:text-blue-200 mt-0.5 sm:mt-1 block truncate">
            +{growthCalculations.retainedAccounts} Accounts
          </strong>
          <span className="text-[9px] sm:text-[10px] text-blue-700/80 dark:text-blue-300/80 mt-0.5 sm:mt-1 block font-medium">
            Compound base for cross-sell
          </span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 sm:p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block truncate">
            Net Revenue Retention (NRR)
          </span>
          <strong className="text-base sm:text-2xl font-black text-indigo-900 dark:text-indigo-200 mt-0.5 sm:mt-1 block truncate">
            {growthCalculations.estimatedNRR}%
          </strong>
          <span className="text-[9px] sm:text-[10px] text-indigo-700/80 dark:text-indigo-300/80 mt-0.5 sm:mt-1 block font-medium">
            Target &gt;105% for top-quartile SaaS
          </span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3 sm:p-4 dark:border-purple-900/40 dark:bg-purple-950/20">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block truncate">
            Enterprise Valuation Lift
          </span>
          <strong className="text-base sm:text-2xl font-black text-purple-900 dark:text-purple-200 mt-0.5 sm:mt-1 block truncate">
            +{formatMoney(growthCalculations.valuationImpact)}
          </strong>
          <span className="text-[9px] sm:text-[10px] text-purple-700/80 dark:text-purple-300/80 mt-0.5 sm:mt-1 block font-medium">
            Based on 6&times; ARR market multiple
          </span>
        </div>
      </div>

      {/* Interactive Churn Reduction Simulation Slider */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5 sm:p-5 dark:border-slate-800 dark:bg-slate-850 space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
              <Zap size={15} className="text-amber-500 shrink-0" />
              Interactive Company Growth & Valuation Simulator
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Drag the slider to calculate the exact impact of reducing churn on annual recurring revenue and enterprise valuation.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Target Churn Reduction:</span>
            <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-black text-white font-mono shadow-xs">
              {targetReduction}%
            </span>
          </div>
        </div>

        <div className="space-y-1 pt-1">
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={targetReduction}
            onChange={(e) => setTargetReduction(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>1% (Conservative)</span>
            <span>5% (Target Milestone)</span>
            <span>10% (Transformational)</span>
          </div>
        </div>
      </div>

      {/* Tab 1: Strategic Growth Levers */}
      {activeGrowthTab === "levers" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              4 Core Strategic Levers to Drive Sustainable Company Growth
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Lever 1 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between space-y-2 hover:border-emerald-300 dark:hover:border-emerald-800 transition">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-black uppercase dark:bg-emerald-950/70 dark:text-emerald-300">
                    Expansion & Upsell Catalyst
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatMoney(growthCalculations.potentialUpsellARR)} ARR
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Monetize {growthCalculations.lowRiskCount} Retained & Highly Active Accounts
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Accounts with low churn risk and high product usage represent your fastest, lowest-cost growth path. Introduce feature tier upgrades (Standard to Enterprise), add-on modules, and dedicated team seat packages.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>Implementation Effort: <strong>Low</strong></span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">ROI: High (3-6 Months)</span>
              </div>
            </div>

            {/* Lever 2 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-800 transition">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-black uppercase dark:bg-blue-950/70 dark:text-blue-300">
                    Onboarding Retention Shield
                  </span>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    {growthCalculations.earlyTenureCount} Early Accounts
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Mitigate Day 0-90 Early Drop-off
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Historical cohort telemetry reveals customer attrition peaks in the first 90 days. Introducing an interactive product checklist, automated Day-7 milestone emails, and a mandatory Day-14 check-in boosts first-year retention by up to 28%.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>Implementation Effort: <strong>Medium</strong></span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">ROI: Immediate (1-2 Months)</span>
              </div>
            </div>

            {/* Lever 3 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between space-y-2 hover:border-indigo-300 dark:hover:border-indigo-800 transition">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="rounded bg-indigo-100 text-indigo-800 px-2 py-0.5 text-[10px] font-black uppercase dark:bg-indigo-950/70 dark:text-indigo-300">
                    Annual Contract Lock-in
                  </span>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    Cash Flow Accelerant
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Migrate Month-to-Month into Annual Commitments
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Month-to-month subscriptions experience 2.4&times; the churn rate of annual commitments. Proactively offer a 15% discount for annual upfront billing to lock in guaranteed revenue, improve working capital, and eliminate monthly churn exposure.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>Implementation Effort: <strong>Low</strong></span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">ROI: High (Instant Working Capital)</span>
              </div>
            </div>

            {/* Lever 4 */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between space-y-2 hover:border-rose-300 dark:hover:border-rose-800 transition">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-black uppercase dark:bg-rose-950/70 dark:text-rose-300">
                    Executive CS Escalation
                  </span>
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    Protect {formatMoney(kpis.revenueAtRisk)}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Intercept High-Spend At-Risk Accounts
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Prioritize the top {kpis.highRiskCount} high-billing accounts showing elevated support tickets or declining login activity. Dispatch senior customer success leads for 1-on-1 Quarterly Business Reviews to resolve friction before cancellation occurs.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>Implementation Effort: <strong>Medium</strong></span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">ROI: Critical Revenue Protection</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Executive Explanations & Economic Foundations */}
      {activeGrowthTab === "playbooks" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Why Retention Drives 80% of Enterprise Company Growth: Economic Foundations
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Explanation 1 */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/40 dark:bg-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-xs">
                <div className="h-6 w-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                  1
                </div>
                The Negative Churn Compounding Effect
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                When account expansion revenue outpaces churned revenue, Net Revenue Retention (NRR) surpasses 100%. At 110% NRR, your company grows by <strong>10% annually even if you do not sign a single new customer</strong>. Churn reduction is the fastest lever to unlock this compounding growth.
              </p>
              <div className="rounded-lg bg-white/80 p-2 dark:bg-slate-800 text-[10px] text-slate-500 font-mono">
                Formula: NRR = (Ending ARR from Existing Base - Churn + Expansion) &divide; Starting ARR
              </div>
            </div>

            {/* Explanation 2 */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-900/40 dark:bg-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
                <div className="h-6 w-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[11px]">
                  2
                </div>
                Customer Lifetime Value (LTV) Multiplication
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Customer Lifetime Value is inversely proportional to churn rate. Reducing your monthly churn rate increases LTV from <strong>{formatMoney(growthCalculations.currentLTV)}</strong> to <strong>{formatMoney(growthCalculations.improvedLTV)}</strong> (+{growthCalculations.ltvUpliftPercent}%), dramatically accelerating CAC payback.
              </p>
              <div className="rounded-lg bg-white/80 p-2 dark:bg-slate-800 text-[10px] text-slate-500 font-mono">
                Formula: LTV = Average Revenue Per User (ARPU) &divide; Monthly Churn Rate
              </div>
            </div>

            {/* Explanation 3 */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 dark:border-blue-900/40 dark:bg-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-xs">
                <div className="h-6 w-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[11px]">
                  3
                </div>
                Enterprise Valuation Multiplier (6x - 10x ARR)
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Venture investors and strategic acquirers heavily discount companies with churn &gt;15%, assigning conservative multiples (2x-3x). In contrast, predictable retention commands premium enterprise multiples of <strong>6x to 10x ARR</strong>, adding <strong>+{formatMoney(growthCalculations.valuationImpact)}</strong> to company valuation.
              </p>
              <div className="rounded-lg bg-white/80 p-2 dark:bg-slate-800 text-[10px] text-slate-500 font-mono">
                Valuation = Predictable ARR &times; Enterprise Quality Multiple (6.0&times;)
              </div>
            </div>

            {/* Explanation 4 */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 dark:border-amber-900/40 dark:bg-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-xs">
                <div className="h-6 w-6 rounded-lg bg-amber-600 text-white flex items-center justify-center text-[11px]">
                  4
                </div>
                CAC Payback & Capital Efficiency
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Acquiring a new customer costs 5x to 7x more than retaining an existing one. By plugging customer churn, every marketing and sales dollar invested compounds into lasting top-line growth rather than merely replacing departed customers.
              </p>
              <div className="rounded-lg bg-white/80 p-2 dark:bg-slate-800 text-[10px] text-slate-500 font-mono">
                Rule of Thumb: Retained revenue yields 85%+ gross profit margins
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Execution Matrix */}
      {activeGrowthTab === "matrix" && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-850 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Company Growth Execution Matrix & Roadmap
            </span>
            <span className="text-[11px] text-slate-400">Prioritized by ARR Compounding</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[550px]">
              <thead className="bg-slate-100/60 dark:bg-slate-800/60 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Growth Initiative</th>
                  <th className="py-2.5 px-3">Target Customer Segment</th>
                  <th className="py-2.5 px-3">Expected ARR Impact</th>
                  <th className="py-2.5 px-3">Difficulty</th>
                  <th className="py-2.5 px-3 text-right">Target Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    1. Annual Commitment Incentives
                  </td>
                  <td className="py-3 px-3 text-slate-500">Month-to-month accounts &gt; 6 mo</td>
                  <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                    +12% to +18% Cash Flow
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Low Effort
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-500">Immediate (Days)</td>
                </tr>
                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    2. VIP CS Outreach for At-Risk Spend
                  </td>
                  <td className="py-3 px-3 text-slate-500">Top 10% highest spenders with tickets</td>
                  <td className="py-3 px-3 font-bold text-rose-600 dark:text-rose-400">
                    Protects {formatMoney(kpis.revenueAtRisk)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      Medium Effort
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-500">1 - 2 Weeks</td>
                </tr>
                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    3. Automated Inactivity Re-engagement
                  </td>
                  <td className="py-3 px-3 text-slate-500">Accounts with &gt;14 days inactivity</td>
                  <td className="py-3 px-3 font-bold text-indigo-600 dark:text-indigo-400">
                    +8% Re-activation Rate
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Low Effort
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-500">2 - 3 Weeks</td>
                </tr>
                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    4. Multi-Product Tier Expansion
                  </td>
                  <td className="py-3 px-3 text-slate-500">Healthy Low-Risk Standard subscribers</td>
                  <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatMoney(growthCalculations.potentialUpsellARR)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                      High Effort
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-500">1 - 2 Months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
