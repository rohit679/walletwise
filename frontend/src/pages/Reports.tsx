// src/pages/Reports.jsx
import React from "react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Reports</h1>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Month</span>
            <select className="rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5 text-xs">
              <option>November 2025</option>
              <option>October 2025</option>
              <option>September 2025</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs hover:bg-slate-800">
              Export CSV
            </button>
            <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs hover:bg-slate-800">
              Export PDF
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-slate-700 h-48 flex items-center justify-center text-xs text-slate-500">
          Reports summary / charts placeholder
        </div>
      </div>
    </div>
  );
}
