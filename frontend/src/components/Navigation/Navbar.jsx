import React, { useState } from "react";
import { useDataset } from "../../context/DatasetContext";
import { CURRENCIES } from "../../utils/currency";
import {
  Menu,
  Upload,
  Database,
  Download,
  ChevronDown,
  Sun,
  Moon,
  Activity,
  Layers,
  DollarSign,
  Building2,
  Printer,
  FileSpreadsheet,
} from "lucide-react";

export const Navbar = () => {
  const {
    activeDataset,
    datasetsList,
    switchDataset,
    companies,
    selectedCompany,
    switchCompany,
    setUploadModalOpen,
    setSidebarOpen,
    currency,
    setCurrency,
    currentCurrency,
    theme,
    toggleTheme,
    exportToCsv,
    exportDatasetCsv,
    exportDatasetExcel,
    setActiveTab,
  } = useDataset();

  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [datasetDropdownOpen, setDatasetDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 sm:px-4 lg:px-6 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20 shrink-0">
            <Activity size={17} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                <span className="inline sm:hidden">ChurnIntel</span>
                <span className="hidden sm:inline">ChurnIntel<span className="text-blue-600 dark:text-blue-400">.ai</span></span>
              </span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wide text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 hidden md:inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Company Selector & Active Dataset Switcher (Adaptive Breakpoints) */}
      <div className="hidden lg:flex items-center gap-2 min-w-0">
        {/* Company Dropdown (Visible on xl+ or adaptive on lg) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setCompanyDropdownOpen(!companyDropdownOpen);
              setDatasetDropdownOpen(false);
              setCurrencyDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 px-2.5 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 shrink-0"
            title={`Active Organization: ${selectedCompany?.name}`}
          >
            <Building2 size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="max-w-[110px] xl:max-w-[150px] truncate">{selectedCompany?.name || "Company"}</span>
            <ChevronDown size={12} className="text-slate-400 shrink-0" />
          </button>

          {companyDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setCompanyDropdownOpen(false)} />
              <div className="absolute left-0 mt-2 z-50 w-64 max-w-[calc(100vw-2rem)] origin-top-left rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Select Enterprise Company
                </div>
                <div className="space-y-1">
                  {companies.map((comp) => (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => {
                        switchCompany(comp.id);
                        setCompanyDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                        comp.id === selectedCompany?.id
                          ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/60"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-semibold truncate">{comp.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{comp.industry}</div>
                      </div>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono font-bold dark:bg-slate-700 shrink-0">
                        {comp.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dataset Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setDatasetDropdownOpen(!datasetDropdownOpen);
              setCompanyDropdownOpen(false);
              setCurrencyDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 shrink-0"
            title={`Active Dataset: ${activeDataset?.name || "None"}`}
          >
            <Database size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="max-w-[120px] xl:max-w-[170px] truncate font-semibold text-slate-800 dark:text-slate-100">
              {activeDataset?.name || "Select Dataset"}
            </span>
            {activeDataset?.rowsCount && (
              <span className="rounded bg-blue-100/70 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 shrink-0">
                {activeDataset?.rowsCount?.toLocaleString()}
              </span>
            )}
            <ChevronDown size={12} className="text-slate-400 shrink-0" />
          </button>

          {datasetDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDatasetDropdownOpen(false)} />
              <div className="absolute left-0 mt-2 z-50 w-72 max-w-[calc(100vw-2rem)] origin-top-left rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Active Datasets ({datasetsList.length})
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {datasetsList.map((ds) => (
                    <button
                      key={ds.id}
                      type="button"
                      onClick={() => {
                        switchDataset(ds.id);
                        setDatasetDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                        ds.id === activeDataset?.id
                          ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/60"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate font-medium">{ds.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {ds.format} • {ds.uploadDate}
                        </div>
                      </div>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300 shrink-0">
                        {ds.rowsCount?.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("studio");
                      setDatasetDropdownOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-blue-900/60 dark:hover:text-blue-300"
                  >
                    <Layers size={13} />
                    Open Dataset Studio
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Actions: Theme Toggle, Currency Switcher, Export, Upload */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Single Theme Toggle Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shrink-0"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-600" />}
        </button>

        {/* Currency Switcher with Real Exchange Rates */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setCurrencyDropdownOpen(!currencyDropdownOpen);
              setCompanyDropdownOpen(false);
              setDatasetDropdownOpen(false);
            }}
            className="flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-xl border border-slate-200/90 bg-white px-2 sm:px-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shrink-0"
            title="Convert Display Currency (with Real Exchange Formula)"
          >
            <span className="text-xs sm:text-sm">{currentCurrency.flag}</span>
            {/* Mobile shows symbol; sm+ shows CODE (Symbol) */}
            <span className="font-bold text-blue-600 dark:text-blue-400 hidden sm:inline">{currentCurrency.code}</span>
            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
              <span className="sm:hidden">{currentCurrency.symbol}</span>
              <span className="hidden sm:inline">({currentCurrency.symbol})</span>
            </span>
            <ChevronDown size={11} className="text-slate-400 hidden sm:block" />
          </button>

          {currencyDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setCurrencyDropdownOpen(false)} />
              <div className="absolute right-0 mt-1.5 z-50 w-52 max-w-[calc(100vw-1.5rem)] rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Select Currency (USD Base)
                </div>
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c.code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-xs transition ${
                      currency === c.code
                        ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/60"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span className="truncate max-w-[100px]">{c.name}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{c.symbol}</span>
                      <span className="text-[10px] text-slate-400 block">
                        {c.code === "USD" ? "1.00" : `×${c.rate}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Download Dashboard / Export Dropdown */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setDownloadDropdownOpen(!downloadDropdownOpen);
              setCompanyDropdownOpen(false);
              setDatasetDropdownOpen(false);
              setCurrencyDropdownOpen(false);
            }}
            className="flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-xl border border-slate-200/90 bg-white px-2 sm:px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shrink-0"
            title="Download Dashboard & Reports"
          >
            <Download size={13} className="text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Download</span>
            <ChevronDown size={11} className="text-slate-400" />
          </button>

          {downloadDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDownloadDropdownOpen(false)} />
              <div className="absolute right-0 mt-1.5 z-50 w-60 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Download Dashboard & Data
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDownloadDropdownOpen(false);
                      window.print();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
                  >
                    <Printer size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Print / Save as PDF</div>
                      <div className="text-[10px] text-slate-400">Download formatted executive view</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDownloadDropdownOpen(false);
                      exportDatasetExcel();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
                  >
                    <FileSpreadsheet size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Excel Workbook (.xlsx)</div>
                      <div className="text-[10px] text-slate-400">Spreadsheet with metrics & customers</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDownloadDropdownOpen(false);
                      exportDatasetCsv();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
                  >
                    <Download size={14} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                      <div className="font-semibold">CSV Scored Export</div>
                      <div className="text-[10px] text-slate-400">Raw rows with churn probabilities</div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => setUploadModalOpen(true)}
          className="flex h-8 sm:h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-2.5 sm:px-3 text-xs font-semibold text-white shadow-sm shadow-blue-500/30 transition hover:bg-blue-700 active:scale-[0.98] shrink-0"
          title="Upload new customer dataset (CSV, Excel, PDF)"
          aria-label="Upload dataset"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </div>
    </header>
  );
};
