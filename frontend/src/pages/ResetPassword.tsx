import { Link } from "react-router-dom";
import resetIllustration from "../assets/resetpassword.png";
import TextInput from "../components/form/TextInput";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";

export default function ResetPasswordPage() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    serverError,
    isSubmitting,
    email,
  } = useResetPasswordForm();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Form */}
        <div className="p-8 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Branding */}
            <div className="mb-8 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#4f46e5]/10 border border-[#4f46e5]/40 mb-3">
                <span className="text-2xl font-bold text-[#4f46e5]">₩</span>
              </div>
              <h1 className="text-2xl font-semibold text-white">
                Reset your password
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Reset password link is sent to{" "}
                <span className="text-slate-200 font-medium">{email}</span>.
                Enter your new password.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                id="newPassword"
                label="New password"
                type="password"
                placeholder="Enter a strong password"
                autoComplete="new-password"
                register={register}
                error={errors.newPassword?.message as string}
              />

              <TextInput
                id="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                register={register}
                error={errors.confirmPassword?.message as string}
              />

              {serverError && (
                <p className="text-xs text-red-400 mt-1">{serverError}</p>
              )}

              <button
                type="submit"
                // disabled={isSubmitting}
                className={`w-full mt-2 rounded-lg py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4f46e5]/40 transition 
                  ${
                    isSubmitting
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-[#4f46e5] hover:bg-indigo-500"
                  }`}
              >
                {isSubmitting ? "Resetting..." : "Reset password"}
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
            className="w-full h-full object-contain p-8"
          />
        </div>
      </div>
    </div>
  );
}
