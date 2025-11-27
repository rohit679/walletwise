import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastContextValue = {
  showToast: (opts: { type: ToastType; message: string }) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    ({ type, message }: { type: ToastType; message: string }) => {
      setToasts((prev) => {
        const id = Date.now() + Math.random();
        const next = [...prev, { id, type, message }];
        // auto-remove after 3 seconds
        setTimeout(() => {
          setToasts((current) => current.filter((t) => t.id !== id));
        }, 3000);
        return next;
      });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast UI */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              max-w-xs rounded-lg px-4 py-3 text-sm shadow-lg border
              ${toast.type === "success" ? "bg-emerald-900/90 border-emerald-500/60 text-emerald-50" : ""}
              ${toast.type === "error" ? "bg-red-900/90 border-red-500/60 text-red-50" : ""}
              ${toast.type === "info" ? "bg-slate-800/90 border-slate-500/60 text-slate-50" : ""}
            `}
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5">
                {toast.type === "success" && "✅"}
                {toast.type === "error" && "⚠️"}
                {toast.type === "info" && "ℹ️"}
              </span>
              <p>{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
