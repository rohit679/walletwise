// src/pages/Income.jsx
import React from "react";

const dummyIncome = [
  { id: 1, date: "2025-11-01", source: "Salary", amount: 50000 },
  { id: 2, date: "2025-11-10", source: "Freelance", amount: 10000 },
];

export default function Income() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-xl font-semibold">Income</h1>
        <button className="text-xs rounded-lg bg-[#4f46e5] px-3 py-1.5 hover:bg-indigo-500">
          + Add income
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm font-medium mb-3">Income Records</p>
          <div className="overflow-x-auto text-xs">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-900">
                <tr className="text-slate-400 text-[11px]">
                  <th className="text-left py-2 px-2 border-b border-slate-800">Date</th>
                  <th className="text-left py-2 px-2 border-b border-slate-800">Source</th>
                  <th className="text-right py-2 px-2 border-b border-slate-800">Amount</th>
                  <th className="text-right py-2 px-2 border-b border-slate-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyIncome.map((inc) => (
                  <tr key={inc.id} className="border-b border-slate-800/60">
                    <td className="py-2 px-2">{inc.date}</td>
                    <td className="py-2 px-2">{inc.source}</td>
                    <td className="py-2 px-2 text-right">₹ {inc.amount}</td>
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

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm font-medium mb-3">Add / Edit Income</p>
          <form className="space-y-3 text-xs">
            <div>
              <label className="block mb-1 text-slate-400">Date</label>
              <input type="date" className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5" />
            </div>
            <div>
              <label className="block mb-1 text-slate-400">Source</label>
              <input
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5"
                placeholder="Company / Client"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-400">Amount</label>
              <input
                type="number"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1.5"
                placeholder="0.00"
              />
            </div>
            <button className="w-full rounded-lg bg-[#4f46e5] py-1.5 text-xs font-semibold hover:bg-indigo-500">
              Save income
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
