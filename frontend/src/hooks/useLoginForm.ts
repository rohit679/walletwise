import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../lib/validation/authShemas";
import { loginUser } from "../services/authService";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      setServerError(null);
      setIsSubmitting(true);

      try {
        await loginUser(values);

        showToast({
          type: "success",
          message: "Logged in successfully. Redirecting...",
        });

        navigate("/dashboard", { replace: true });
      } catch (err: any) {
        console.error(err);
        const msg = err?.message || "Login failed";
        setServerError(msg);
        showToast({
          type: "error",
          message: msg,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate, showToast],
  );

  return {
    form,
    onSubmit,
    serverError,
    isSubmitting,
  };
}
