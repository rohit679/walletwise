// src/pages/Expenses.jsx
import React from "react";

const dummyExpenses = [
  { id: 1, date: "2025-11-01", category: "Food", amount: 500, note: "Dinner" },
  { id: 2, date: "2025-11-02", category: "Transport", amount: 200, note: "Cab" },
];

export default function Expenses() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-xl font-semibold">Expenses</h1>
        <div className="flex gap-2">
          <input
            placeholder="Search..."
            className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
          />
          <select className="rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#4f46e5]">
            <option>All categories</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Table */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">Recent Expenses</p>
            <button className="text-xs rounded-lg bg-[#4f46e5] px-3 py-1.5 hover:bg-indigo-500">
              + Add expense
            </button>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-900">
                <tr className="text-slate-400 text-[11px]">
                  <th className="text-left py-2 px-2 border-b border-slate-800">Date</th>
                  <th className="text-left py-2 px-2 border-b border-slate-800">Category</th>
                  <th className="text-left py-2 px-2 border-b border-slate-800">Note</th>
                  <th className="text-right py-2 px-2 border-b border-slate-800">Amount</th>
                  <th className="text-right py-2 px-2 border-b border-slate-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyExpenses.map((exp) => (
                  <tr key={exp.id} className="border-b border-slate-800/60">
                    <td className="py-2 px-2">{exp.date}</td>
                    <td className="py-2 px-2">{exp.category}</td>
                    <td className="py-2 px-2">{exp.note}</td>
                    <td className="py-2 px-2 text-right">₹ {exp.amount}</td>
                    <td className="py-2 px-2 text-right space-x-2">
                      <button className="text-[11px] text-sky-400">Edit</button>
                      <button className="text-[11px] text-red-400">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form + receipt preview */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm font-medium mb-3">Add / Edit Expense</p>
            <form className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-slate-400">Date</label>
                  <input type="date" className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5" />
                </div>
                <div>
                  <label className="block mb-1 text-slate-400">Category</label>
                  <select className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5">
                    <option>Food</option>
                    <option>Transport</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-slate-400">Amount</label>
                <input
                  type="number"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-400">Note</label>
                <input
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-400">Receipt</label>
                <input type="file" className="w-full text-[11px] text-slate-400" />
              </div>
              <button className="w-full rounded-lg bg-[#4f46e5] py-1.5 text-xs font-semibold hover:bg-indigo-500">
                Save expense
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm font-medium mb-3">Receipt preview</p>
            <div className="h-32 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-[11px] text-slate-500">
              No receipt selected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
