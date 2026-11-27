import React, { useState, useMemo } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  ArrowRight,
  UserCheck,
  Send,
  Download,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { PageEmptyState } from "../../components/Common/PageEmptyState";

export const Guidance = () => {
  const {
    activeDataset,
    formatMoney,
    currentCurrency,
    setSelectedCustomer,
    setActiveTab,
  } = useDataset();

  const customers = activeDataset?.analytics?.customers || [];
  const kpis = activeDataset?.analytics?.kpis || {};

  if (!activeDataset || customers.length === 0) {
    return (
      <PageEmptyState
        icon={Lightbulb}
        title="Intelligent Retention Guidance & Recovery Playbook"
        subtitle="No customer dataset currently loaded. Upload your customer file (CSV, Excel, PDF, JSON) in the Data Studio or via the Upload button to generate actionable, customer-specific retention playbooks and feedback tracking."
        accentColor="purple"
      />
    );
  }

  // Feedback state stored locally in browser session
  const [feedbackRecords, setFeedbackRecords] = useState(() => {
    try {
      const saved = localStorage.getItem("churn_guidance_feedback");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Selected item for logging detailed feedback
  const [feedbackModalCust, setFeedbackModalCust] = useState(null);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [feedbackActionType, setFeedbackActionType] = useState("Discount Offer");

  // Generate dynamic recommendation items from dataset customers
  const guidanceItems = useMemo(() => {
    return customers
      .filter((c) => c.riskLevel === "High" || c.riskLevel === "Medium" || c.churned === "Yes")
      .map((c) => {
        const feedback = feedbackRecords[c.id] || {
          status: "pending",
          appliedAction: null,
          notes: "",
          timestamp: null,
        };

        // Determine category based on top risk factor
        const topFactor = c.riskFactors?.[0] || "General Account Trajectory";
        let category = "Retention";
        let priority = "Medium";
        let primaryAction = c.recommendations?.[0] || "Schedule proactive customer check-in";

        if (/billing|charges|pricing|fee/i.test(topFactor)) {
          category = "Pricing Optimization";
          priority = c.riskLevel === "High" ? "Critical" : "High";
        } else if (/support|tickets|complaint/i.test(topFactor)) {
          category = "Support Resolution";
          priority = "Critical";
        } else if (/inactive|inactivity|login/i.test(topFactor)) {
          category = "Re-engagement";
          priority = "High";
        } else if (/tenure|onboarding/i.test(topFactor)) {
          category = "Onboarding Care";
          priority = "High";
        }

        return {
          id: c.id,
          name: c.name,
          plan: c.plan,
          charges: c.charges,
          tenure: c.tenure,
          churnProbability: c.churnProbability,
          riskLevel: c.riskLevel,
          topFactor,
          riskFactors: Array.isArray(c.riskFactors) ? c.riskFactors : [],
          primaryAction,
          allRecommendations: Array.isArray(c.recommendations) ? c.recommendations : [],
          category,
          priority,
          feedbackStatus: feedback.status, // 'pending' | 'applied' | 'in_progress' | 'resolved' | 'dismissed'
          feedbackNotes: feedback.notes,
          feedbackAction: feedback.appliedAction,
          feedbackTime: feedback.timestamp,
          rawCustomer: c,
        };
      });
  }, [customers, feedbackRecords]);

  // Filtered recommendations
  const filteredGuidance = useMemo(() => {
    return guidanceItems.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.primaryAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topFactor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRisk = riskFilter === "all" || item.riskLevel.toLowerCase() === riskFilter;
      const matchStatus = statusFilter === "all" || item.feedbackStatus === statusFilter;
      const matchCategory = categoryFilter === "all" || item.category === categoryFilter;

      return matchSearch && matchRisk && matchStatus && matchCategory;
    });
  }, [guidanceItems, searchQuery, riskFilter, statusFilter, categoryFilter]);

  // Update status handler
  const handleUpdateStatus = (custId, newStatus, actionName = null, customNotes = "") => {
    setFeedbackRecords((prev) => {
      const updated = {
        ...prev,
        [custId]: {
          status: newStatus,
          appliedAction: actionName || prev[custId]?.appliedAction || "Strategy Initiated",
          notes: customNotes || prev[custId]?.notes || "",
          timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        },
      };
      try {
        localStorage.setItem("churn_guidance_feedback", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Metrics summary
  const totalCount = guidanceItems.length;
  const appliedCount = guidanceItems.filter((i) => i.feedbackStatus === "applied" || i.feedbackStatus === "resolved").length;
  const inProgressCount = guidanceItems.filter((i) => i.feedbackStatus === "in_progress").length;
  const pendingCount = guidanceItems.filter((i) => i.feedbackStatus === "pending").length;
  const revenueProtected = guidanceItems
    .filter((i) => i.feedbackStatus === "applied" || i.feedbackStatus === "resolved")
    .reduce((acc, curr) => acc + curr.charges, 0);

  // Export Guidance Report
  const exportGuidanceReport = () => {
    const headers = [
      "Customer ID",
      "Customer Name",
      "Plan",
      `Monthly Spend (${currentCurrency.code})`,
      "Churn Probability (%)",
      "Risk Level",
      "Top Risk Factor",
      "Recommended Action",
      "Retention Status",
      "Action Taken",
      "Feedback Notes",
    ];

    const rows = guidanceItems.map((g) => [
      `"${g.id}"`,
      `"${g.name}"`,
      `"${g.plan}"`,
      g.charges,
      g.churnProbability,
      `"${g.riskLevel}"`,
      `"${g.topFactor}"`,
      `"${g.primaryAction}"`,
      `"${g.feedbackStatus.toUpperCase()}"`,
      `"${g.feedbackAction || "None"}"`,
      `"${g.feedbackNotes || ""}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `churn_retention_guidance_${activeDataset?.name?.replace(/\.[^/.]+$/, "") || "export"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-md shadow-indigo-500/20">
            <Lightbulb size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight sm:text-2xl">
                Retention Guidance & Action Playbook
              </h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                Feedback Enabled
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Turn predictive churn signals into tangible interventions, log retention feedback, and track recovered revenue.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={exportGuidanceReport}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Download size={14} className="text-blue-600 dark:text-blue-400" />
            Export Playbook CSV
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/30 hover:bg-blue-700 transition"
          >
            View Live Dashboard
          </button>
        </div>
      </div>

      {/* 4 Feedback & Guidance KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Total Actionable Accounts</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <ShieldAlert size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {totalCount}
            </span>
            <span className="text-xs font-bold text-slate-400">targeted accounts</span>
          </div>
          <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>High Risk Priority:</span>
            <strong className="text-rose-600 dark:text-rose-400">{kpis.highRiskCount} critical</strong>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Strategies Applied</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {appliedCount}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              of {totalCount} deployed
            </span>
          </div>
          <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>Execution Rate:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">
              {totalCount > 0 ? ((appliedCount / totalCount) * 100).toFixed(0) : 0}% completed
            </strong>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Interventions In Flight</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
              {inProgressCount}
            </span>
            <span className="text-xs font-bold text-slate-400">in negotiation</span>
          </div>
          <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>Awaiting Feedback:</span>
            <strong className="text-slate-700 dark:text-slate-300">{pendingCount} unreviewed</strong>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Protected Revenue (MRR)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <DollarSign size={17} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {formatMoney(revenueProtected)}
            </span>
            <span className="text-xs font-bold text-slate-400">monthly</span>
          </div>
          <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>Annual Value Protected:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">{formatMoney(revenueProtected * 12)}</strong>
          </div>
        </div>
      </div>

      {/* Guidance-Exclusive: Playbook Progress & Coverage Tracker */}
      <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/70 via-purple-50/30 to-slate-50/50 p-5 dark:border-indigo-900/50 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-indigo-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-sm">
              <TrendingUp size={15} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Playbook Coverage & Intervention Progress
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time tracking of retention strategy execution across your at-risk customer portfolio
              </p>
            </div>
          </div>
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
            Session Tracking
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 dark:border-slate-700/80 dark:bg-slate-850 shadow-2xs text-center">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{totalCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">At-Risk Accounts</div>
            <div className="text-[10px] text-slate-400 mt-1">Targeted in this session</div>
          </div>
          <div className="rounded-xl border border-emerald-200/90 bg-emerald-50/60 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/20 shadow-2xs text-center">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{appliedCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Strategies Applied</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              {totalCount > 0 ? ((appliedCount / totalCount) * 100).toFixed(0) : 0}% completion
            </div>
          </div>
          <div className="rounded-xl border border-amber-200/90 bg-amber-50/60 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/20 shadow-2xs text-center">
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{inProgressCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">In Progress</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-1">Negotiation open</div>
          </div>
          <div className="rounded-xl border border-indigo-200/90 bg-indigo-50/60 p-3.5 dark:border-indigo-900/60 dark:bg-indigo-950/20 shadow-2xs text-center">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{pendingCount}</div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Pending Review</div>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">Awaiting action</div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Overall Playbook Execution Progress</span>
            <span className="font-black text-slate-900 dark:text-white">
              {totalCount > 0 ? ((appliedCount / totalCount) * 100).toFixed(0) : 0}% Complete
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
              style={{ width: `${totalCount > 0 ? (appliedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {appliedCount} of {totalCount} at-risk accounts have received an applied retention strategy.
            {pendingCount > 0 && ` ${pendingCount} account${pendingCount > 1 ? 's' : ''} still await intervention — scroll down to take action.`}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search account by name, ID, or recommended retention action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Risk Tiers</option>
            <option value="high">High Risk Only</option>
            <option value="medium">Medium Risk</option>
          </select>

          {/* Feedback Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Retention Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="applied">Strategy Applied</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved / Retained</option>
            <option value="dismissed">Dismissed</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Playbook Categories</option>
            <option value="Pricing Optimization">Pricing Optimization</option>
            <option value="Support Resolution">Support Resolution</option>
            <option value="Re-engagement">Re-engagement</option>
            <option value="Onboarding Care">Onboarding Care</option>
            <option value="Retention">Standard Retention</option>
          </select>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-3.5">
        {filteredGuidance.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
            <Lightbulb size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No retention actions match your filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting search keywords or status dropdowns.</p>
          </div>
        ) : (
          filteredGuidance.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Customer Info & Risk Factor */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.riskLevel === "High"
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}
                    >
                      {item.riskLevel} Risk ({item.churnProbability}%)
                    </span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                      {item.category}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                        item.feedbackStatus === "applied" || item.feedbackStatus === "resolved"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : item.feedbackStatus === "in_progress"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          : item.feedbackStatus === "dismissed"
                          ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      Status: {item.feedbackStatus.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 text-xs">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition flex items-center gap-2"
                        onClick={() => setSelectedCustomer(item.rawCustomer)}
                      >
                        {item.name}
                        <span className="text-[11px] font-normal text-slate-400">({item.id})</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.plan} Plan • {formatMoney(item.charges)}/mo • {item.tenure} months tenure
                      </p>
                    </div>
                  </div>

                  {/* Root Cause & Strategy Description */}
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">Primary Churn Driver:</span>
                      <span className="text-slate-600 dark:text-slate-400">{item.topFactor}</span>
                    </div>
                    <div className="mt-1.5 flex items-start gap-2 text-xs">
                      <span className="font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">Recommended Playbook:</span>
                      <span className="font-medium text-slate-900 dark:text-slate-200">{item.primaryAction}</span>
                    </div>

                    {item.feedbackNotes && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                        <MessageSquare size={13} />
                        <span>Team Feedback ({item.feedbackAction}): "{item.feedbackNotes}" ({item.feedbackTime})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Interactive Feedback Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 lg:w-48">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(item.id, "applied", "Annual Commitment Discount")}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
                  >
                    <CheckCircle2 size={14} />
                    Apply Strategy
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackModalCust(item);
                      setFeedbackNotes(item.feedbackNotes || "");
                      setFeedbackActionType(item.feedbackAction || "Discount Offer");
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <MessageSquare size={14} className="text-blue-600 dark:text-blue-400" />
                    Log Custom Feedback
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(item.id, "in_progress", "Contact Initiated")}
                      className="flex-1 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-800 hover:bg-amber-100 transition dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 text-center"
                    >
                      In Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(item.id, "dismissed", "Not Applicable")}
                      className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100 transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 text-center"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Log Recommendation Feedback & Notes */}
      {feedbackModalCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Log Retention Feedback & Strategy
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackModalCust(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
              >
                <XCircle size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Target Account:</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {feedbackModalCust.name} ({feedbackModalCust.id}) • {formatMoney(feedbackModalCust.charges)}/mo
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Strategy Applied / Action Type
                </label>
                <select
                  value={feedbackActionType}
                  onChange={(e) => setFeedbackActionType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Annual Commitment Discount">Annual Commitment Discount (15-20%)</option>
                  <option value="Customer Success Escalation Call">Customer Success Escalation Call</option>
                  <option value="Technical Support Resolution">Technical Support Ticket Resolution</option>
                  <option value="Product Training & Best Practices">Product Training & Feature Walkthrough</option>
                  <option value="Custom Plan Restructuring">Custom Plan Restructuring</option>
                  <option value="Contract Extension Incentive">Contract Extension Incentive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Retention Notes & Outcome Feedback
                </label>
                <textarea
                  rows={3}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="e.g. Spoke with client VP, agreed to 15% discount for 1-year lock-in. Risk downgraded to Low."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setFeedbackModalCust(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(feedbackModalCust.id, "applied", feedbackActionType, feedbackNotes);
                    setFeedbackModalCust(null);
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
                >
                  Save Feedback & Mark Applied
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};