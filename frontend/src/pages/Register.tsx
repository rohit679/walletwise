import React from "react";
import { Link } from "react-router-dom";
import registerIllustration from "../assets/register1.png";
import TextInput from "../components/form/TextInput";
import OAuthButton from "../components/auth/OAuthButton";
import { useRegisterForm } from "../hooks/useRegisterForm";

export default function RegisterPage() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    serverError,
    isSubmitting,
    isSuccess,
  } = useRegisterForm();

  const handleGoogleOAuth = () => {
    // redirect to your Google OAuth URL
    window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_URL || "#";
  };

  const handleGithubOAuth = () => {
    // redirect to your GitHub OAuth URL
    window.location.href = import.meta.env.VITE_GITHUB_OAUTH_URL || "#";
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          `{/* Form side */}
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
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  id="name"
                  label="Full name"
                  placeholder="Rohit Prasad"
                  autoComplete="name"
                  register={register}
                  error={errors.name?.message as string}
                />

                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  register={register}
                  error={errors.email?.message as string}
                />

                <TextInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  register={register}
                  error={errors.password?.message as string}
                />

                {serverError && (
                  <p className="text-xs text-red-400">{serverError}</p>
                )}

                {isSuccess && (
                  <p className="text-xs text-emerald-400">
                    Account created successfully. Redirecting...
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-2 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4f46e5]/40 transition-colors
                    ${
                      isSubmitting
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-[#4f46e5] hover:bg-indigo-500"
                    }`}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-slate-700" />
                <span className="text-xs text-slate-400">or continue with</span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>

              {/* OAuth buttons */}
              <div className="flex flex-col gap-3">
                <OAuthButton
                  provider="google"
                  label="Continue with Google"
                  onClick={handleGoogleOAuth}
                />
                <OAuthButton
                  provider="github"
                  label="Continue with GitHub"
                  onClick={handleGithubOAuth}
                />
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
