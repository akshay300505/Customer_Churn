import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
  },

  build: {
    chunkSizeWarningLimit: 600,

    rolldownOptions: {
      output: {
        // Rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          // React core — always cached first
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // Recharts — heavy charting library (~450KB)
          if (id.includes("node_modules/recharts")) {
            return "vendor-charts";
          }
          // Lucide icons
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          // SheetJS / xlsx — only needed for file parsing
          if (id.includes("node_modules/xlsx")) {
            return "vendor-xlsx";
          }
          // PDF.js
          if (id.includes("node_modules/pdfjs-dist")) {
            return "vendor-pdf";
          }
          // d3 utilities (used by recharts)
          if (id.includes("node_modules/d3-") || id.includes("node_modules/d3/")) {
            return "vendor-d3";
          }
        },
      },
    },
  },
});
