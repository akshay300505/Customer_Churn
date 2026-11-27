import React, { lazy, Suspense } from "react";
import { DatasetProvider, useDataset } from "./context/DatasetContext";
import { Navbar } from "./components/Navigation/Navbar";
import { Sidebar } from "./components/Navigation/Sidebar";
import { UploadModal } from "./components/Modals/UploadModal";
import { CustomerDetailModal } from "./components/Modals/CustomerDetailModal";

// ─── Lazy-loaded page chunks (code splitting) ─────────────────────────────────
// Each page is loaded on first navigation — slashes the initial bundle size.
const Dashboard     = lazy(() => import("./pages/Dashboard/Dashboard").then(m => ({ default: m.Dashboard })));
const DataUpload    = lazy(() => import("./pages/Data/DataUpload").then(m => ({ default: m.DataUpload })));
const Customers     = lazy(() => import("./pages/Customers/Customers").then(m => ({ default: m.Customers })));
const Analytics     = lazy(() => import("./pages/Analytics/Analytics").then(m => ({ default: m.Analytics })));
const Reports       = lazy(() => import("./pages/Reports/Reports").then(m => ({ default: m.Reports })));
const Settings      = lazy(() => import("./pages/Settings/Settings").then(m => ({ default: m.Settings })));
const Guidance      = lazy(() => import("./pages/Guidance/Guidance").then(m => ({ default: m.Guidance })));
const ChurnPrediction = lazy(() => import("./pages/Predictions/ChurnPrediction").then(m => ({ default: m.ChurnPrediction })));

// ─── Page Loading Skeleton ─────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex flex-1 items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30">
        <svg
          className="h-7 w-7 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Loading View…</p>
        <p className="text-xs text-slate-400 mt-0.5">CustomerIntel AI Platform</p>
      </div>
    </div>
  </div>
);

// ─── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-900 text-white font-sans">
          <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="h-12 w-12 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl">
              !
            </div>
            <h2 className="text-lg font-bold text-white">Application Recovery Mode</h2>
            <p className="text-xs text-slate-400">
              A temporary state mismatch occurred in local storage cache.
            </p>
            <pre className="p-3 rounded-lg bg-slate-950 text-rose-300 text-[11px] text-left overflow-auto max-h-32 font-mono">
              {this.state.error?.toString()}
            </pre>
            <button
              type="button"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
            >
              Reset Session Cache &amp; Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Main Layout ───────────────────────────────────────────────────────────────
const MainLayout = () => {
  const { activeTab } = useDataset();

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":   return <Dashboard />;
      case "studio":      return <DataUpload />;
      case "customers":   return <Customers />;
      case "predictions": return <ChurnPrediction />;
      case "analytics":   return <Analytics />;
      case "guidance":    return <Guidance />;
      case "reports":     return <Reports />;
      case "settings":    return <Settings />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 dark:bg-[#090d16] dark:text-slate-100 transition-colors">
      {/* Responsive Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Responsive Top Navigation */}
        <Navbar />

        {/* Scrollable View Container — each page loaded lazily */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 max-w-7xl mx-auto w-full transition-all">
          <Suspense fallback={<PageLoader />}>
            {renderActiveView()}
          </Suspense>
        </main>
      </div>

      {/* Global Modals (always present, tiny footprint) */}
      <UploadModal />
      <CustomerDetailModal />
    </div>
  );
};

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ErrorBoundary>
      <DatasetProvider>
        <MainLayout />
      </DatasetProvider>
    </ErrorBoundary>
  );
}