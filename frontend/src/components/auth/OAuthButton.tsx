import React from "react";

type Props = {
  provider: "google" | "github";
  label: string;
  onClick: () => void;
};

const providerIcon: Record<string, string> = {
  google: "🔍",
  github: "💻",
};

export default function OAuthButton({ provider, label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 hover:bg-slate-800 transition-colors"
    >
      <span>{providerIcon[provider]}</span>
      <span>{label}</span>
    </button>
  );
}
