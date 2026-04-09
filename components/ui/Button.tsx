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
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AEEF] cursor-pointer select-none";

  const sizes = {
    sm:  "px-5 py-2 text-sm",
    md:  "px-8 py-3 text-base",
    lg:  "px-10 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-[#00AEEF] text-white shadow-sm hover:bg-[#0095CC] hover:shadow-md active:bg-[#0085BB] active:scale-[0.98]",
    secondary:
      "border border-[#00AEEF] text-[#00AEEF] bg-transparent hover:bg-[#00AEEF]/[0.05] active:bg-[#00AEEF]/10 active:scale-[0.98]",
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
