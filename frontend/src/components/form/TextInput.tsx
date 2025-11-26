import React, { memo } from "react";

type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  register?: any; // react-hook-form register
};

function TextInputComponent({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
  register,
}: Props) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-200"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...(register ? register(id) : {})}
        className={`w-full rounded-lg bg-slate-900 border px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 
          focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]
          ${error ? "border-red-500" : "border-slate-700"}`}
      />
      {error && (
        <p className="text-xs text-red-400 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

const TextInput = memo(TextInputComponent);
export default TextInput;
