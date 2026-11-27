import * as XLSX from "xlsx";

/**
 * Download arbitrary data as a clean CSV file
 */
export const downloadCsv = (data, filename = "customer_churn_export.csv") => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Extract headers
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Header row
  csvRows.push(headers.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(","));

  // Value rows
  for (const row of data) {
    const values = headers.map((header) => {
      let val = row[header];
      if (val === null || val === undefined) val = "";
      if (Array.isArray(val)) val = val.join("; ");
      if (typeof val === "object") val = JSON.stringify(val);
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download arbitrary data as an Excel workbook (.xlsx) using SheetJS
 */
export const downloadExcel = (data, sheetName = "Churn_Data", filename = "customer_churn_export.xlsx") => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Sanitize data for Excel sheet
  const sanitized = data.map((item) => {
    const row = {};
    for (const [k, v] of Object.entries(item)) {
      if (Array.isArray(v)) {
        row[k] = v.join(", ");
      } else if (typeof v === "object" && v !== null) {
        row[k] = JSON.stringify(v);
      } else {
        row[k] = v;
      }
    }
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(sanitized);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));

  XLSX.writeFile(workbook, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
};
