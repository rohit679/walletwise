import React from "react";
import { Link } from "react-router-dom";
import loginIllustration from "../assets/login.png"; // ⬅ your image

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your /login API
    console.log("Login submit");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Layout: image + form */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Illustration side */}
          <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-[#4f46e5] to-indigo-500">
            <img
              src={loginIllustration}
              alt="WalletWise login illustration"
              className="w-full h-full object-cover max-h-[520px]"
            />
          </div>

          {/* Form side */}
          <div className="p-8 md:p-10 flex items-center">
            <div className="w-full">
              {/* Logo / Branding */}
              <div className="mb-8 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#4f46e5]/10 border border-[#4f46e5]/40 mb-3">
                  <span className="text-2xl font-bold text-[#4f46e5]">₩</span>
                </div>
                <h1 className="text-2xl font-semibold text-white">
                  WalletWise
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  One stop solution for your expense management in a smarter way.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-200 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-[#4f46e5] hover:text-indigo-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4f46e5]/40 hover:bg-indigo-500 transition-colors"
                >
                  Log in
                </button>
              </form>

              {/* Footer links */}
              <p className="mt-5 text-center text-xs text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#4f46e5] hover:text-indigo-300"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
