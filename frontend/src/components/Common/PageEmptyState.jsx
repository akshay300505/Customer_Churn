import React from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  UploadCloud,
  FileSpreadsheet,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export const PageEmptyState = ({
  icon: Icon = Database,
  title = "No Customer Dataset Loaded",
  subtitle = "Upload your customer dataset in the Data Studio or via the Upload button to generate live analytics and risk assessments.",
  accentColor = "blue",
}) => {
  const { setUploadModalOpen, setActiveTab, isLoading } = useDataset();

  const colorStyles = {
    blue: {
      iconBg: "bg-blue-600 text-white shadow-blue-500/25",
      badge: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800",
      border: "border-blue-100 dark:border-blue-900/40",
    },
    emerald: {
      iconBg: "bg-emerald-600 text-white shadow-emerald-500/25",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800",
      border: "border-emerald-100 dark:border-emerald-900/40",
    },
    purple: {
      iconBg: "bg-purple-600 text-white shadow-purple-500/25",
      badge: "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800",
      border: "border-purple-100 dark:border-purple-900/40",
    },
    amber: {
      iconBg: "bg-amber-600 text-white shadow-amber-500/25",
      badge: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800",
      border: "border-amber-100 dark:border-amber-900/40",
    },
  }[accentColor] || {
    iconBg: "bg-blue-600 text-white shadow-blue-500/25",
    badge: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800",
    border: "border-blue-100 dark:border-blue-900/40",
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-16 px-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
        <div className={`mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl ${colorStyles.iconBg} shadow-lg`}>
          <Icon size={28} />
        </div>

        <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-bold border ${colorStyles.badge}`}>
          <Sparkles size={12} />
          <span>DATASET REQUIRED</span>
        </div>

        <h2 className="mt-3 text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full">
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
          >
            <UploadCloud size={16} />
            <span>Upload Customer Dataset</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <span>Platform Overview & Guide</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
