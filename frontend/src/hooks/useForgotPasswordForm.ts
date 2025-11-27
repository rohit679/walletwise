import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../lib/validation/authShemas";
import { forgotPassword } from "../services/authService";
import { useToast } from "../context/ToastContext";

type ForgotPasswordFormValues = {
    email: string;
};

export function useForgotPasswordForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const form = useForm<ForgotPasswordFormValues>({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "onBlur",
    });

    const onSubmit = useCallback(
        async (values: ForgotPasswordFormValues) => {
            setServerError(null);
            setIsSubmitting(true);

            try {
                await forgotPassword(values);

                showToast({
                    type: "success",
                    message: "Password reset link sent to your email.",
                });
            } catch (err: any) {
                console.error(err);
                const msg = err?.message || "Failed to send reset link";
                setServerError(msg);
                showToast({
                    type: "error",
                    message: msg,
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [showToast],
    );

    return {
        form,
        onSubmit,
        serverError,
        isSubmitting,
    };
}