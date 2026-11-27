import React, { useState, useRef } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  ClipboardPaste,
  Building2,
} from "lucide-react";

export const DataUpload = () => {
  const {
    activeDataset,
    companies,
    selectedCompany,
    switchCompany,
    uploadAndProcessFile,
    isLoading,
    loadingMessage,
    error,
    successMessage,
    setActiveTab,
  } = useDataset();

  const [activeUploadMethod, setActiveUploadMethod] = useState("file"); // 'file' | 'paste'
  const [selectedUploadCompanyId, setSelectedUploadCompanyId] = useState(selectedCompany?.id || "primary");
  const [pastedContent, setPastedContent] = useState("");
  const [pasteFilename, setPasteFilename] = useState("manual_customer_data.csv");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const targetComp = companies.find((c) => c.id === selectedUploadCompanyId) || selectedCompany || companies[0];

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadAndProcessFile(files[0], targetComp);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadAndProcessFile(files[0], targetComp);
    }
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!pastedContent.trim()) return;
    const blob = new Blob([pastedContent], { type: "text/csv" });
    const file = new File([blob], pasteFilename || "pasted_data.csv", { type: "text/csv" });
    uploadAndProcessFile(file, targetComp);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 lg:p-6 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 px-2 py-0.5 rounded-md inline-block">
              DATA INGESTION STUDIO
            </span>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Create Dashboards from Uploaded Files
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Upload customer data in <strong className="text-slate-700 dark:text-slate-200">CSV</strong>, <strong className="text-slate-700 dark:text-slate-200">Excel (.xlsx)</strong>, or <strong className="text-slate-700 dark:text-slate-200">PDF</strong> format to generate interactive churn analytics, trend lines, and predictive risk scoring.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-xl bg-blue-600 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/25 hover:bg-blue-700 transition"
            >
              <span>View Active Dashboard</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Tab Navigation for Upload Methods (Responsive 2-Item Segmented Control) */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:flex sm:border-b border-slate-100 dark:border-slate-800 gap-1.5 sm:gap-2 p-1 sm:p-0 rounded-xl sm:rounded-none bg-slate-100/80 sm:bg-transparent dark:bg-slate-800/80 sm:dark:bg-transparent">
          <button
            type="button"
            onClick={() => setActiveUploadMethod("file")}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-bold transition rounded-lg sm:rounded-none sm:border-b-2 ${
              activeUploadMethod === "file"
                ? "bg-white text-blue-600 shadow-xs sm:shadow-none sm:bg-transparent sm:border-blue-600 dark:bg-slate-900 dark:text-blue-400 dark:sm:border-blue-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 sm:border-transparent"
            }`}
          >
            <UploadCloud size={16} className="shrink-0" />
            <span className="truncate">
              <span className="inline sm:hidden">Upload File</span>
              <span className="hidden sm:inline">File Upload (CSV, XLSX, PDF, JSON)</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveUploadMethod("paste")}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-bold transition rounded-lg sm:rounded-none sm:border-b-2 ${
              activeUploadMethod === "paste"
                ? "bg-white text-blue-600 shadow-xs sm:shadow-none sm:bg-transparent sm:border-blue-600 dark:bg-slate-900 dark:text-blue-400 dark:sm:border-blue-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 sm:border-transparent"
            }`}
          >
            <ClipboardPaste size={16} className="shrink-0" />
            <span className="truncate">
              <span className="inline sm:hidden">Paste CSV</span>
              <span className="hidden sm:inline">Paste Raw CSV Data</span>
            </span>
          </button>
        </div>
      </div>

      {/* Alert Banners */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3.5 sm:p-4 text-xs text-rose-800 font-medium dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
          <AlertCircle size={17} className="text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 sm:p-4 text-xs text-emerald-800 font-medium dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
          <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Upload Processing State */}
      {isLoading && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 sm:p-8 text-center space-y-3 dark:border-blue-900/50 dark:bg-blue-950/20">
          <div className="h-10 w-10 mx-auto animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Processing & Analyzing Dataset...</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{loadingMessage}</p>
        </div>
      )}

      {/* Company Selection & Data Deduplication Notice */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold text-xs sm:text-sm">
            {targetComp.code || "CO"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Target Organization:</span>
              <span className="text-xs sm:text-sm font-black text-blue-600 dark:text-blue-400 truncate">{targetComp.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {targetComp.industry}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Automated Duplicate Prevention is active: Identical customer IDs are safely merged to avoid duplicate records.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            Switch Target:
          </label>
          <select
            value={selectedUploadCompanyId}
            onChange={(e) => {
              setSelectedUploadCompanyId(e.target.value);
              switchCompany(e.target.value);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Method 1: File Drag & Drop */}
      {activeUploadMethod === "file" && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-10 lg:p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30 scale-[0.99]"
                  : "border-slate-300 bg-white hover:border-blue-500 hover:bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400 dark:hover:bg-slate-800/50 shadow-xs"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.pdf,.json"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm mb-3 sm:mb-4 dark:bg-blue-950/60 dark:text-blue-400">
                <UploadCloud size={26} className="sm:size-8" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Click to upload or drag & drop customer dataset
              </h3>

              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                Automatic column discovery for customer IDs, monthly charges, tenure, subscription plans, support history, and churn status.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="rounded-lg bg-emerald-50 border border-emerald-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <FileSpreadsheet size={12} /> CSV (.csv)
                </span>
                <span className="rounded-lg bg-blue-50 border border-blue-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 flex items-center gap-1">
                  <FileSpreadsheet size={12} /> Excel (.xlsx, .xls)
                </span>
                <span className="rounded-lg bg-rose-50 border border-rose-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 flex items-center gap-1">
                  <FileText size={12} /> PDF (.pdf)
                </span>
                <span className="rounded-lg bg-purple-50 border border-purple-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 flex items-center gap-1">
                  <FileCode size={12} /> JSON (.json)
                </span>
              </div>
            </div>
          </div>

          {/* Supported Format Guidelines */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
              Smart Schema Auto-Discovery
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No manual column renaming needed. Our engine automatically recognizes common corporate fields:
            </p>

            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                <span><strong>Customer ID:</strong> customer_id, user_id, id, account</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                <span><strong>Monthly Billing:</strong> monthly_charges, monthly_fee, charges, amount</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                <span><strong>Tenure:</strong> tenure, tenure_months, signup_date</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                <span><strong>Churn Signal:</strong> churned, churn, is_churn, or auto-scored</span>
              </li>
            </ul>

            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-[11px] sm:text-xs text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-300">
              <strong>Tip:</strong> If no churn column is present, our ML heuristics calculate behavioral churn risk based on usage and billing patterns!
            </div>
          </div>
        </div>
      )}

      {/* Method 2: Paste Raw CSV */}
      {activeUploadMethod === "paste" && !isLoading && (
        <form onSubmit={handlePasteSubmit} className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Paste CSV Text</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Paste comma-separated rows with column headers in the first line.</p>
            </div>
            <input
              type="text"
              value={pasteFilename}
              onChange={(e) => setPasteFilename(e.target.value)}
              placeholder="filename.csv"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 w-full sm:w-48 font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <textarea
            rows={8}
            value={pastedContent}
            onChange={(e) => setPastedContent(e.target.value)}
            placeholder={`customer_id,name,subscription_type,monthly_charges,tenure,churned\nCUST-001,John Doe,Premium,119.99,12,0\nCUST-002,Jane Smith,Basic,49.99,3,1`}
            className="w-full rounded-xl border border-slate-200 p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => setPastedContent("")}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-center"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={!pastedContent.trim()}
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 text-center"
            >
              Process & Generate Dashboard
            </button>
          </div>
        </form>
      )}

      {/* Currently Loaded Dataset Details Card */}
      {activeDataset && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                Active Dataset Metadata: {activeDataset.name}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Loaded on {activeDataset.uploadDate} • Format: {activeDataset.format}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 self-start sm:self-auto">
              Active in Dashboard
            </span>
          </div>

          <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 sm:p-3">
              <span className="text-slate-400 block text-[10px] sm:text-[11px]">Total Rows</span>
              <strong className="text-slate-800 dark:text-white text-xs sm:text-sm font-bold">
                {activeDataset.rowsCount?.toLocaleString()}
              </strong>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 sm:p-3">
              <span className="text-slate-400 block text-[10px] sm:text-[11px]">Customer Churn Rate</span>
              <strong className="text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold">
                {activeDataset.analytics?.kpis?.customerChurnRate}%
              </strong>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 sm:p-3">
              <span className="text-slate-400 block text-[10px] sm:text-[11px]">Revenue Churn Rate</span>
              <strong className="text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-bold">
                {activeDataset.analytics?.kpis?.revenueChurnRate}%
              </strong>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 sm:p-3">
              <span className="text-slate-400 block text-[10px] sm:text-[11px]">High Risk Accounts</span>
              <strong className="text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold">
                {activeDataset.analytics?.kpis?.highRiskCount}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};