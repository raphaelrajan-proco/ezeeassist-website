"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AEEF] cursor-pointer select-none";

  const sizes = {
    sm:  "px-5 py-2 text-sm",
    md:  "px-7 py-3 text-base",
    lg:  "px-9 py-3.5 text-base",
  };

  const variants = {
    primary:
      "bg-[#00AEEF] text-white shadow-sm hover:bg-[#0095CC] hover:shadow-[0_8px_25px_rgba(0,174,239,0.30)] active:bg-[#0085BB] active:scale-[0.98]",
    secondary:
      "border-2 border-[#00AEEF] text-[#00AEEF] bg-transparent hover:bg-[#00AEEF]/[0.08] active:bg-[#00AEEF]/[0.14] active:scale-[0.98]",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
