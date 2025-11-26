import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../lib/validation/authShemas";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export function useRegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      setServerError(null);
      setIsSubmitting(true);
      setIsSuccess(false);

      try {
        await registerUser(values);
        setIsSuccess(true);
        showToast({
          type: "success",
          message: "Registered successfully. Please login.",
        });
        navigate("/login", { replace: true });
      } catch (err: any) {
        console.error(err);
        setServerError(err?.message || "Registration failed");
        showToast({
          type: "error",
          message: err?.message || "Registration failed",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    form,
    onSubmit,
    serverError,
    isSubmitting,
    isSuccess,
  };
}
