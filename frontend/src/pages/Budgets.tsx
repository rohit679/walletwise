// src/pages/Budgets.jsx
import React from "react";

const budgets = [
  { id: 1, category: "Food", limit: 8000, spent: 6200 },
  { id: 2, category: "Transport", limit: 3000, spent: 2100 },
  { id: 3, category: "Shopping", limit: 5000, spent: 4800 },
];

export default function Budgets() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Budgets</h1>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4">
        {budgets.map((b) => {
          const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
          const barColor =
            pct > 90
              ? "bg-red-500"
              : pct > 75
                ? "bg-orange-400"
                : "bg-emerald-500";

          return (
            <div key={b.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{b.category}</span>
                <span className="text-slate-400">
                  ₹ {b.spent} / ₹ {b.limit} ({pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <p className="text-sm font-medium mb-3">Add / Edit Budget</p>
        <form className="grid gap-3 md:grid-cols-3 text-xs">
          <div>
            <label className="block mb-1 text-slate-400">Category</label>
            <input className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5" />
          </div>
          <div>
            <label className="block mb-1 text-slate-400">Monthly limit</label>
            <input
              type="number"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full rounded-lg bg-[#4f46e5] py-1.5 text-xs font-semibold hover:bg-indigo-500">
              Save budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
