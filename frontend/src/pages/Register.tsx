import React from "react";
import { Link } from "react-router-dom";
import registerIllustration from "../assets/register1.png"; // ⬅ your image

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your /register API here
    console.log("Register submit");
  };

  const handleGoogleOAuth = () => {
    // TODO: redirect to your Google OAuth URL
    console.log("Google OAuth");
  };

  const handleGithubOAuth = () => {
    // TODO: redirect to your GitHub OAuth URL
    console.log("GitHub OAuth");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Form side */}
          <div className="p-8 md:p-10 flex items-center">
            <div className="w-full">
              {/* Branding */}
              <div className="mb-8 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#4f46e5]/10 border border-[#4f46e5]/40 mb-3">
                  <span className="text-2xl font-bold text-[#4f46e5]">₩</span>
                </div>
                <h1 className="text-2xl font-semibold text-white">
                  Create your WalletWise account
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Start tracking and managing your expenses the smart way.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-200 mb-1"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    placeholder="Rohit Prasad"
                  />
                </div>

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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-200 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    placeholder="Create a strong password"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4f46e5]/40 hover:bg-indigo-500 transition-colors"
                >
                  Create account
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-slate-700" />
                <span className="text-xs text-slate-400">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>

              {/* OAuth buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleGoogleOAuth}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 hover:bg-slate-800 transition-colors"
                >
                  <span>🔍</span>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGithubOAuth}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 hover:bg-slate-800 transition-colors"
                >
                  <span>💻</span>
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Footer links */}
              <p className="mt-6 text-center text-xs text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#4f46e5] hover:text-indigo-300"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Illustration side */}
          <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-[#4f46e5] to-indigo-500">
            <img
              src={registerIllustration}
              alt="WalletWise registration illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
