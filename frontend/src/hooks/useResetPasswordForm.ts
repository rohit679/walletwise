// src/hooks/useResetPasswordForm.ts
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../lib/validation/authShemas";
import { resetPassword } from "../services/authService";
import { useState } from "react";

type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export function useResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: any) => {
    console.log("ResetPasswordForm onSubmit values:", values);
    setServerError(null);
    if (!token || !email) {
      setServerError("Invalid or expired reset link");
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword({
        token,
        email,
        newPassword: values.newPassword,
      });

      showToast({ type: "success", message: "Password reset successfully" });
      navigate("/login");
    } catch (err: any) {
      setServerError(err?.message || "Failed to reset password");
      showToast({ type: "error", message: err?.message || "Failed to reset" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, serverError, isSubmitting, email };
}
