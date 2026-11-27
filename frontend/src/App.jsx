import React from "react";
import { DatasetProvider, useDataset } from "./context/DatasetContext";
import { Navbar } from "./components/Navigation/Navbar";
import { Sidebar } from "./components/Navigation/Sidebar";
import { UploadModal } from "./components/Modals/UploadModal";
import { CustomerDetailModal } from "./components/Modals/CustomerDetailModal";

// Page Views
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { DataUpload } from "./pages/Data/DataUpload";
import { Customers } from "./pages/Customers/Customers";
import { Analytics } from "./pages/Analytics/Analytics";
import { Reports } from "./pages/Reports/Reports";
import { Settings } from "./pages/Settings/Settings";
import { Guidance } from "./pages/Guidance/Guidance";
import { ChurnPrediction } from "./pages/Predictions/ChurnPrediction";

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
              Reset Session Cache & Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainLayout = () => {
  const { activeTab } = useDataset();

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "studio":
        return <DataUpload />;
      case "customers":
        return <Customers />;
      case "predictions":
        return <ChurnPrediction />;
      case "analytics":
        return <Analytics />;
      case "guidance":
        return <Guidance />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
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

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 max-w-7xl mx-auto w-full transition-all">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <UploadModal />
      <CustomerDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <DatasetProvider>
        <MainLayout />
      </DatasetProvider>
    </ErrorBoundary>
  );
}