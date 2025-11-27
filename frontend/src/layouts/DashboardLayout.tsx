// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/expenses", label: "Expenses", icon: "💸" },
  { to: "/income", label: "Income", icon: "💰" },
  { to: "/budgets", label: "Budgets", icon: "🎯" },
  { to: "/reports", label: "Reports", icon: "📊" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-slate-800 bg-slate-900/90 backdrop-blur
        transition-all duration-200 ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4f46e5]/10 border border-[#4f46e5]/50">
              <span className="font-semibold text-[#4f46e5]">₩</span>
            </div>
            {!collapsed && (
              <span className="font-semibold tracking-tight">WalletWise</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden md:inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 text-xs hover:bg-slate-800"
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm
                transition 
                ${
                  isActive
                    ? "bg-[#4f46e5] text-white shadow-inner shadow-[#4f46e5]/50"
                    : "text-slate-300 hover:bg-slate-800/80"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-slate-800 text-[11px] text-slate-500">
          {!collapsed && (
            <>
              Signed in as <span className="text-slate-300">Admin</span>
            </>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center justify-between px-4">
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-lg"
            >
              ☰
            </button>
            <span className="font-semibold text-sm">WalletWise Admin</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <span>Admin Panel</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              A
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
