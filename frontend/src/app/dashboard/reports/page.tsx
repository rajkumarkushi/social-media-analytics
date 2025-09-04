"use client";

import { downloadCSV, downloadPDF } from "@/lib/api";

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Reports</h1>
      <p className="mb-6 text-gray-600">Export your analytics data:</p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={downloadCSV}
          className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2.5 rounded-md hover:bg-green-700 active:bg-green-800 transition shadow-sm"
        >
          Download CSV
        </button>

        <button
          onClick={downloadPDF}
          className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-md hover:bg-blue-700 active:bg-blue-800 transition shadow-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
