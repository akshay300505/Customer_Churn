import React, { useState } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  LayoutDashboard,
  UploadCloud,
  Users,
  Brain,
  BarChart3,
  FileText,
  Sliders,
  X,
  ShieldAlert,
  Database,
  ArrowUpRight,
  TrendingDown,
  Lightbulb,
  Building2,
  ChevronDown,
  Check,
  FolderOpen,
} from "lucide-react";

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    activeDataset,
    setUploadModalOpen,
    companies,
    selectedCompany,
    switchCompany,
    datasetsList,
    switchDataset,
  } = useDataset();

  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [datasetMenuOpen, setDatasetMenuOpen] = useState(false);

  const navigation = [
    { id: "dashboard", label: "Executive Dashboard", icon: LayoutDashboard, badge: "Live" },
    { id: "studio", label: "Data & File Studio", icon: UploadCloud, badge: "CSV/PDF/XLS" },
    { id: "customers", label: "Customer Explorer", icon: Users, count: activeDataset?.analytics?.kpis?.customersAtStart },
    { id: "predictions", label: "Churn Prediction", icon: Brain, badge: "AI Engine" },
    { id: "guidance", label: "Retention Guidance", icon: Lightbulb, badge: "Playbook" },
    { id: "analytics", label: "Deep Churn Analytics", icon: BarChart3 },
    { id: "reports", label: "Executive Reports", icon: FileText },
    { id: "settings", label: "Risk & Currency Settings", icon: Sliders },
  ];

  const atRiskCount = activeDataset?.analytics?.kpis?.highRiskCount || 0;
  const churnRate = activeDataset?.analytics?.kpis?.customerChurnRate || "0.0";

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white shadow-xl transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:static lg:z-0 lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header */}
        <div className="flex h-14 sm:h-16 items-center justify-between border-b border-slate-100 px-5 sm:px-6 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-sm shadow-md shadow-blue-500/20">
              CI
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Churn Intelligence</h2>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">Autonomous Analytics</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Company & Dataset Controls (Particularly for Mobile / Tablet) */}
        <div className="p-3 sm:p-4 space-y-2 border-b border-slate-100 dark:border-slate-800/80">
          {/* Company Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCompanyMenuOpen(!companyMenuOpen);
                setDatasetMenuOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50/70 p-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-2 truncate">
                <Building2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <div className="text-left truncate">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Company</div>
                  <div className="truncate font-bold text-slate-900 dark:text-white">{selectedCompany?.name}</div>
                </div>
              </div>
              <ChevronDown size={13} className="text-slate-400 shrink-0" />
            </button>

            {companyMenuOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Organization
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {companies.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        switchCompany(c.id);
                        setCompanyMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition ${
                        c.id === selectedCompany?.id
                          ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/60"
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      {c.id === selectedCompany?.id && <Check size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dataset Status & Switcher Card */}
          <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-3 dark:border-blue-900/50 dark:from-slate-800/80 dark:to-indigo-950/30">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1 font-semibold text-blue-950 dark:text-blue-300">
                <Database size={13} className="text-blue-600 dark:text-blue-400" />
                Active Dataset
              </span>
              <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                {activeDataset?.format || "EMPTY"}
              </span>
            </div>
            <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5" title={activeDataset?.name}>
              {activeDataset?.name || "No dataset loaded"}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 pt-1.5 border-t border-blue-200/40 dark:border-slate-700/60">
              <span>{activeDataset?.rowsCount ? `${activeDataset.rowsCount.toLocaleString()} records` : "0 records"}</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                <TrendingDown size={11} /> {churnRate}% churn
              </span>
            </div>
            {/* Quick Actions in Sidebar */}
            <div className="mt-2 pt-2 border-t border-blue-200/40 dark:border-slate-700/60 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("studio");
                  setSidebarOpen(false);
                }}
                className="flex-1 rounded-lg bg-white/80 py-1 px-2 text-[10px] font-bold text-blue-700 hover:bg-white transition text-center shadow-2xs dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700"
              >
                Change Dataset
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadModalOpen(true);
                  setSidebarOpen(false);
                }}
                className="rounded-lg bg-blue-600 py-1 px-2 text-[10px] font-bold text-white hover:bg-blue-700 transition"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Analytics & Views
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200"}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {item.count > 999 ? `${(item.count / 1000).toFixed(1)}k` : item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Urgent Attention Alert Box */}
        {atRiskCount > 0 && (
          <div className="p-4 pt-1">
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 dark:border-rose-900/40 dark:bg-rose-950/20">
              <div className="flex items-start gap-2.5">
                <div className="rounded-lg bg-rose-100 p-1 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300">
                  <ShieldAlert size={16} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                    {atRiskCount} Accounts At Risk
                  </h4>
                  <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-0.5">
                    High churn probability detected. Urgent retention recommended.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("customers");
                      setSidebarOpen(false);
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 dark:text-rose-300 hover:underline"
                  >
                    View At-Risk Accounts <ArrowUpRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Upload Action */}
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setUploadModalOpen(true);
              setSidebarOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-900/40 dark:hover:text-blue-300"
          >
            <UploadCloud size={15} />
            <span>Upload New CSV / PDF</span>
          </button>
        </div>
      </aside>
    </>
  );
};
