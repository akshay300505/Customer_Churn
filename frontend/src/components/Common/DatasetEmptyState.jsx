import React from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  UploadCloud,
  Database,
  FileSpreadsheet,
  FileText,
  FileCode,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Users,
  ShieldAlert,
  ArrowRight,
  Brain,
  Lightbulb,
  BarChart3,
  Layers,
  Sparkles,
  HelpCircle,
  FileCheck,
  Zap,
  Target,
  Eye,
  Rocket,
  ShieldCheck,
  Award,
  Clock,
  Printer,
  Download,
} from "lucide-react";

export const DatasetEmptyState = () => {
  const { setUploadModalOpen, setActiveTab, isLoading } = useDataset();

  const handleDownloadDashboard = () => {
    window.print();
  };

  const futureBenefits = [
    {
      title: "Improved Customer Retention",
      description: "Help businesses identify customers at risk and take preventive measures to reduce customer loss.",
      icon: ShieldCheck,
      color: "emerald",
    },
    {
      title: "Better Decision-Making",
      description: "Support business decisions through accurate data analysis and meaningful insights.",
      icon: Target,
      color: "blue",
    },
    {
      title: "Early Churn Identification",
      description: "Recognize potential customer churn before it leads to permanent customer loss.",
      icon: Clock,
      color: "amber",
    },
    {
      title: "Enhanced Customer Satisfaction",
      description: "Understand customer complaints, preferences, and behavioural patterns to improve service quality.",
      icon: Award,
      color: "purple",
    },
    {
      title: "Reduced Business Costs",
      description: "Help minimize the expenses associated with acquiring new customers by improving existing customer retention.",
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Personalized Recovery Strategies",
      description: "Provide suitable recommendations based on individual customer behaviour and churn factors.",
      icon: Lightbulb,
      color: "indigo",
    },
    {
      title: "Business Growth",
      description: "Strengthen customer relationships, improve loyalty, and support long-term business development.",
      icon: TrendingUp,
      color: "teal",
    },
    {
      title: "Future AI Integration",
      description: "Expand the platform with advanced machine learning, automated analytics, real-time monitoring, and intelligent recommendation systems.",
      icon: Brain,
      color: "blue",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto py-2 sm:py-4 animate-in fade-in slide-in-from-bottom-2">
      {/* 1. Hero Platform Welcome & Mission Banner with Tagline */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 md:p-12 text-center shadow-xs transition-colors dark:border-slate-700/80 dark:bg-slate-900">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30">
          <Database size={28} className="animate-pulse" />
        </div>

        {/* Brand Tagline Badge */}
        <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-[11px] sm:text-xs font-bold text-blue-700 border border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-700/70 shadow-2xs">
          <Zap size={14} className="text-blue-600 dark:text-blue-400" />
          <span>CustomerIntel – Predict Risk, Understand Behaviour, Retain Customers.</span>
        </div>

        <h1 className="mt-3.5 text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight">
          Customer Churn Guidance Platform
        </h1>

        <p className="mx-auto mt-2.5 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed px-2 font-normal">
          An intelligent, data-driven web application engineered to ingest your customer datasets, detect behavioral churn triggers, calculate revenue churn, forecast ARR compounding, and formulate individual account retention guidance.
        </p>

        {/* Primary Call to Action Controls & Download Option */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full">
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/30 transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
          >
            <UploadCloud size={18} />
            <span>Upload Customer Dataset (CSV, Excel, PDF, JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-750 shadow-xs"
          >
            <FileSpreadsheet size={18} className="text-blue-600 dark:text-blue-400" />
            <span>Open Data & File Studio</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadDashboard}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 shadow-xs"
            title="Download/Print Dashboard Guide"
          >
            <Printer size={17} className="text-slate-600 dark:text-slate-300" />
            <span>Download Dashboard (PDF)</span>
          </button>
        </div>
      </div>

      {/* 2. About & Purpose Cards (High Contrast, Crisp Typography) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* About Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-700/80 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100/80 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-bold">
                <Sparkles size={16} />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                About Customer Churn Guidance
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Customer Churn Guidance is an intelligent, data-driven web application designed to help businesses understand customer behaviour, identify customers who are likely to leave, and take proactive steps to improve customer retention.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              The application transforms raw customer data into meaningful insights through data analysis, churn prediction, risk classification, explainable insights, and actionable recovery recommendations. It provides an interactive platform where businesses can monitor customer activities, analyze churn patterns, and make informed decisions to strengthen customer relationships.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <CheckCircle2 size={15} />
            <span>Intelligent, Data-Driven Customer Retention Platform</span>
          </div>
        </div>

        {/* Purpose Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-700/80 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-bold">
                <Target size={16} />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Purpose
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              The purpose of Customer Churn Guidance is to help businesses identify potential customer loss at an early stage, understand the factors contributing to customer dissatisfaction, and take appropriate actions to improve customer retention.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              It aims to simplify customer data analysis and convert complex information into clear, understandable insights that support better business decisions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <CheckCircle2 size={15} />
            <span>Early Identification • Root Cause Analysis • Actionable Retention</span>
          </div>
        </div>
      </div>

      {/* 3. Vision and Mission — Side-by-Side in Desktop View (Left and Right Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Left Box: Vision */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7 shadow-xs dark:border-blue-700/60 dark:bg-blue-950/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/25">
                <Eye size={17} />
              </div>
              <h2 className="text-base sm:text-lg font-black text-blue-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-blue-900 dark:text-slate-100 leading-relaxed font-medium">
              To build a smarter and more reliable customer retention platform that enables businesses to understand customer needs, anticipate potential churn, and create long-lasting customer relationships through data-driven intelligence.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-700/50 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Smarter &bull; Proactive &bull; Long-Lasting Relationships
          </div>
        </div>

        {/* Right Box: Mission */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7 shadow-xs dark:border-indigo-700/60 dark:bg-indigo-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-500/25">
                <Rocket size={17} />
              </div>
              <h2 className="text-base sm:text-lg font-black text-indigo-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-indigo-900 dark:text-slate-100 leading-relaxed font-medium">
              Our mission is to provide businesses with an effective and user-friendly platform that combines customer data management, analytics, churn prediction, risk assessment, and personalized recovery guidance.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-indigo-900 dark:text-slate-100 leading-relaxed font-medium">
              We aim to make customer retention more proactive, accessible, and effective by transforming customer information into meaningful insights and practical recommendations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-indigo-200 dark:border-indigo-700/50 text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            Analytics &bull; Prediction &bull; Recovery Guidance
          </div>
        </div>
      </div>

      {/* 4. Step-by-Step Platform Walkthrough ("How to Use This Platform") */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 lg:p-8 shadow-xs dark:border-slate-700/80 dark:bg-slate-900 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-1">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
              How to Use This Platform: 4-Step Intelligence Workflow
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              From uploading your company records to executing automated retention playbooks
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 self-start sm:self-auto">
            Step-by-Step Guide
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Step 1 */}
          <div className="rounded-xl border border-blue-200/80 bg-blue-50/50 p-4 dark:border-blue-800/60 dark:bg-slate-850 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="h-6 w-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  1
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Data Ingestion
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Upload Any Company Dataset
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                Upload your customer data in <strong>CSV</strong>, <strong>Excel (.xlsx, .xls)</strong>, <strong>PDF</strong>, or <strong>JSON</strong> format. Paste raw CSV rows directly in the Data Studio.
              </p>
            </div>
            <div className="pt-2 border-t border-blue-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
              Auto-deduplication & ID merging
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-indigo-200/80 bg-indigo-50/50 p-4 dark:border-indigo-800/60 dark:bg-slate-850 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="h-6 w-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  2
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  Instant Calculations
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Deterministic Mathematical KPIs
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                Computes real <strong>Customer Churn Rate</strong>, <strong>Revenue Churn Rate</strong>, Monthly Recurring Lost (MRR), and plots longitudinal <strong>cohort survival curves</strong>.
              </p>
            </div>
            <div className="pt-2 border-t border-indigo-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
              (Lost &divide; Starting Base) &times; 100
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-purple-200/80 bg-purple-50/50 p-4 dark:border-purple-800/60 dark:bg-slate-850 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="h-6 w-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  3
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  Risk Modeling
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Heuristic Churn Scoring
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                Scores 100% of your customer accounts (0%–100% risk) based on tenure decay, billing bracket, ticket velocity, and contract type, isolating critical accounts.
              </p>
            </div>
            <div className="pt-2 border-t border-purple-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
              Explainable feature weights
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 dark:border-emerald-800/60 dark:bg-slate-850 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="h-6 w-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  4
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Action & Export
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Retention Playbooks & Reports
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                Execute account-specific interventions, track feedback resolution statuses, simulate valuation multiples, and export data in Excel (.xlsx) or CSV.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-200/60 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
              One-click SheetJS Excel export
            </div>
          </div>
        </div>
      </div>

      {/* 5. Future Benefits Section (8 Structured Cards with High Contrast) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 lg:p-8 shadow-xs dark:border-slate-700/80 dark:bg-slate-900 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-1">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" />
              Future Benefits
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Strategic advantages unlocked by deploying Customer Churn Guidance across your organization
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            Strategic Value
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {futureBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-4 dark:border-slate-700/70 dark:bg-slate-850 flex flex-col justify-between space-y-2 hover:border-blue-400 dark:hover:border-blue-500 transition shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                      <Icon size={15} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Strategic Growth & Enterprise Capabilities Card */}
      <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50/50 p-5 sm:p-7 lg:p-8 shadow-xs dark:border-emerald-900/60 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-xs">
              <TrendingUp size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                How Churn Intelligence Powers Sustainable Company Growth
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                Key economic mechanics unlocked once customer attrition is plugged
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 hidden sm:inline-block">
            SaaS Growth Engine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 dark:border-slate-700/80 dark:bg-slate-850 shadow-2xs">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1 text-xs sm:text-sm">
              1. Compounding ARR
            </span>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Arresting customer attrition by just 5% delivers up to <strong>+35% higher annual recurring revenue</strong> over 3 years due to base retention compounding.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white p-4 dark:border-slate-700/80 dark:bg-slate-850 shadow-2xs">
            <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1 text-xs sm:text-sm">
              2. Net Revenue Retention (NRR &gt;105%)
            </span>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Retained customer cohorts enable expansion and upsell revenue to surpass 100%, generating organic company growth with zero reliance on new acquisition.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white p-4 dark:border-slate-700/80 dark:bg-slate-850 shadow-2xs">
            <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1 text-xs sm:text-sm">
              3. Enterprise Valuation Multiplier
            </span>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Companies with low customer churn command premium market multiples of <strong>6x to 10x ARR</strong>, directly multiplying company equity valuation.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Bottom Action Box with Download Dashboard Option */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 text-center shadow-xs dark:border-slate-700/80 dark:bg-slate-900">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Ready to Analyze Your Customer Portfolio?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-lg mx-auto">
          Upload any customer dataset now to immediately populate all 8 analytical views with genuine, data-driven intelligence.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
          >
            <UploadCloud size={16} />
            <span>Select File to Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <FileCode size={16} className="text-slate-500" />
            <span>Paste CSV in Studio</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadDashboard}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Printer size={16} className="text-blue-600 dark:text-blue-400" />
            <span>Download Dashboard / Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
