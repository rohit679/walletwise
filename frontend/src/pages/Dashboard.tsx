// src/pages/Dashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const summaryCards = [
  { label: "Total Expenses", value: "₹ 42,300", sub: "This month" },
  { label: "Total Income", value: "₹ 60,000", sub: "This month" },
  { label: "Net Savings", value: "₹ 17,700", sub: "After expenses" },
  { label: "Active Budgets", value: "5", sub: "3 near limit" },
];

const trendData = [
  { month: "Jan", expenses: 12000, income: 20000 },
  { month: "Feb", expenses: 15000, income: 22000 },
  { month: "Mar", expenses: 11000, income: 21000 },
  { month: "Apr", expenses: 18000, income: 23000 },
];

const categoryData = [
  { name: "Food", value: 35 },
  { name: "Rent", value: 25 },
  { name: "Travel", value: 15 },
  { name: "Shopping", value: 10 },
  { name: "Others", value: 15 },
];

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#eab308", "#ec4899"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-sm"
          >
            <p className="text-xs text-slate-400">{card.label}</p>
            <p className="mt-2 text-lg font-semibold">{card.value}</p>
            <p className="mt-1 text-[11px] text-slate-500">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm font-medium mb-3">Expense vs Income Trend</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-sm font-medium mb-3">Top Expense Categories</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-slate-400">
            {categoryData.map((c, i) => (
              <li key={c.name}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ background: COLORS[i] }}
                />
                {c.name} — {c.value}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
