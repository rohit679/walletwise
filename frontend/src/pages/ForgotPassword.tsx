import React from "react";
import { Link } from "react-router-dom";
import forgotIllustration from "../assets/forgotpassword.png";

export default function ForgotPasswordPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your /auth/forgot-password API
    console.log("Forgot password submit");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="
        w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl 
        shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2
      ">
        {/* Left: Form */}
        <div className="p-8 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Branding */}
            <div className="mb-8 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 
                rounded-2xl bg-[#4f46e5]/10 border border-[#4f46e5]/40 mb-3">
                <span className="text-2xl font-bold text-[#4f46e5]">₩</span>
              </div>
              <h1 className="text-2xl font-semibold text-white">
                Forgot your password?
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Enter the email you use for WalletWise and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 
                  text-sm text-slate-100 placeholder-slate-500 focus:outline-none 
                  focus:ring-2 focus:ring-[#4f46e5]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#4f46e5] text-white font-semibold rounded-lg py-2.5
                shadow-lg shadow-[#4f46e5]/40 hover:bg-indigo-500 transition"
              >
                Send reset link
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-slate-400">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-[#4f46e5] hover:text-indigo-300"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#4f46e5] to-indigo-500">
          <img
            src={forgotIllustration}
            alt="WalletWise forgot password illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
