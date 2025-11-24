// src/pages/Settings.jsx
import React from "react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Currency & theme */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Currency</p>
            <select className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs">
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Theme</p>
            <div className="flex items-center gap-3 text-xs">
              <button className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900">
                Dark (default)
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
                Light (coming soon)
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Preferences</p>
            <div className="space-y-2 text-xs text-slate-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-900" defaultChecked />
                Show dashboard tips
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-900" />
                Enable email alerts
              </label>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4">
          <p className="text-sm font-medium">Categories</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Food", "Transport", "Shopping", "Rent", "Bills"].map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1"
              >
                {cat}
                <button className="text-[10px] text-slate-400 hover:text-red-400">✕</button>
              </span>
            ))}
          </div>
          <form className="flex gap-2 text-xs">
            <input
              placeholder="Add category"
              className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5"
            />
            <button className="rounded-lg bg-[#4f46e5] px-3 py-1.5 font-semibold hover:bg-indigo-500">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
