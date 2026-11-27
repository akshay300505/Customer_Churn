import React, { useState, useRef } from "react";
import { useDataset } from "../../context/DatasetContext";
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";

export const UploadModal = () => {
  const {
    uploadModalOpen,
    setUploadModalOpen,
    companies,
    selectedCompany,
    switchCompany,
    uploadAndProcessFile,
    isLoading,
    loadingMessage,
    error,
  } = useDataset();

  const [isDragging, setIsDragging] = useState(false);
  const [modalCompanyId, setModalCompanyId] = useState(selectedCompany?.id || "primary");
  const fileInputRef = useRef(null);

  if (!uploadModalOpen) return null;

  const targetComp = companies.find((c) => c.id === modalCompanyId) || selectedCompany || companies[0];

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => !isLoading && setUploadModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Upload Dataset to Create Dashboard</h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instantly calculates churn rates, risk distribution, trends, and prevents duplicate records.
            </p>
          </div>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setUploadModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Target Company Selector */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-white block">
              Assign to Organization:
            </label>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Data and deduplication will be scoped to this workspace
            </span>
          </div>
          <select
            value={modalCompanyId}
            onChange={(e) => {
              setModalCompanyId(e.target.value);
              switchCompany(e.target.value);
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Overlay State */}
        {isLoading ? (
          <div className="my-8 flex flex-col items-center justify-center space-y-3 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Processing Dataset...</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">{loadingMessage || "Computing churn probabilities & generating dynamic dashboard."}</p>
          </div>
        ) : (
          /* Dropzone */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-blue-600 bg-blue-50/60 dark:border-blue-400 dark:bg-blue-950/30 scale-[0.99]"
                : "border-slate-300 bg-slate-50/50 hover:border-blue-500 hover:bg-blue-50/30 dark:border-slate-700 dark:bg-slate-850 dark:hover:border-blue-400 dark:hover:bg-slate-800"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.pdf,.json"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-blue-100/70 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shadow-sm mb-3">
              <UploadCloud size={26} className="sm:size-7" />
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Drag & drop your file here, or <span className="text-blue-600 dark:text-blue-400 underline">browse</span>
            </h4>

            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Supports <strong className="text-slate-700 dark:text-slate-200">CSV</strong>, <strong className="text-slate-700 dark:text-slate-200">Excel (.xlsx/.xls)</strong>, <strong className="text-slate-700 dark:text-slate-200">PDF</strong>, and <strong className="text-slate-700 dark:text-slate-200">JSON</strong> files up to 100MB.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-1 rounded-md bg-emerald-100/70 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <FileSpreadsheet size={11} /> CSV / Excel Auto-Detect
              </span>
              <span className="flex items-center gap-1 rounded-md bg-rose-100/70 px-2 py-0.5 text-[10px] font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                <FileText size={11} /> PDF Tabular Extract
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
