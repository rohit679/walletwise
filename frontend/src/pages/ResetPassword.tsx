// src/pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import resetIllustration from "../assets/resetpassword.png";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Example: token comes from /reset-password?token=xxx
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Reset link is invalid or expired.");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: call your backend reset API
      // const res = await fetch("/api/auth/reset-password", {...});
      console.log("Reset password submit", { token, newPassword });

      // Simulate success
      setTimeout(() => {
        setIsLoading(false);
        setSuccess("Your password has been reset successfully.");
      }, 600);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div
        className="
        w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl 
        shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2
      "
      >
        {/* Left: Form */}
        <div className="p-8 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Branding */}
            <div className="mb-8 text-center md:text-left">
              <div
                className="inline-flex items-center justify-center w-12 h-12 
                rounded-2xl bg-[#4f46e5]/10 border border-[#4f46e5]/40 mb-3"
              >
                <span className="text-2xl font-bold text-[#4f46e5]">₩</span>
              </div>
              <h1 className="text-2xl font-semibold text-white">
                Reset your password
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Choose a new password for your WalletWise account.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-200 mb-1"
                >
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 
                  text-sm text-slate-100 placeholder-slate-500 focus:outline-none 
                  focus:ring-2 focus:ring-[#4f46e5]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-200 mb-1"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 
                  text-sm text-slate-100 placeholder-slate-500 focus:outline-none 
                  focus:ring-2 focus:ring-[#4f46e5]"
                />
              </div>

              {error && <p className="text-xs text-red-400 mt-1">{error}</p>}

              {success && (
                <p className="text-xs text-emerald-400 mt-1">{success}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-2 rounded-lg py-2.5 text-sm font-semibold text-white 
                shadow-lg shadow-[#4f46e5]/40 transition 
                ${isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-[#4f46e5] hover:bg-indigo-500"}`}
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-slate-400">
              Remember your password?{" "}
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
            src={resetIllustration}
            alt="WalletWise reset password illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
