"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Shared primitives for the growth-narrative homepage. Theme-variable
 * driven so light mode is the default and dark mode follows the
 * existing editorial toggle.
 */

export function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.2em] mb-8"
      style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

export function SectionHeadline({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] ${className}`}
      style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
    >
      {children}
    </h2>
  );
}

export function SectionShell({
  children,
  alt = false,
  id,
}: {
  children: React.ReactNode;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`w-full scroll-mt-24 ${alt ? "ed-bg-alt" : "ed-bg"}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        {children}
      </div>
    </section>
  );
}

/* ── Mockup chrome (consistent product UI across the page) ── */

export const MOCK_SURFACE: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  boxShadow:
    "0 18px 44px -14px rgba(9,9,11,0.16), 0 4px 12px -4px rgba(9,9,11,0.10)",
};
export const MOCK_TEXT = "#0A0A0A";
export const MOCK_MUTED = "#52525B";
export const MOCK_HAIRLINE = "#E5E7EB";

export function GradientFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="ed-gradient-frame mt-8 rounded-2xl p-5 md:p-6 overflow-hidden">
      {children}
    </div>
  );
}

export function MockAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] flex-shrink-0"
      style={{ backgroundColor: color, color: "#FFFFFF", fontWeight: 600 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

/* ── SSR-safe animated counter ─────────────────────────── */

/**
 * Server HTML contains the final value; on hydration + scroll-in the
 * number animates 0 → end once. prefers-reduced-motion skips it.
 */
export function AnimatedValue({
  end,
  suffix = "",
  prefix = "",
  inView,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(end);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let raf: number;
    const duration = 2200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, end]);

  return (
    <>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </>
  );
}

/** Big stat block with SSR value + label + supporting line. */
export function StatBlock({
  value,
  suffix,
  staticValue,
  label,
  body,
  index = 0,
}: {
  value?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
  body: string;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <p
        className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em]"
        style={{
          color: "#00AEEF",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 0.95,
        }}
      >
        {staticValue ? (
          staticValue
        ) : (
          <AnimatedValue end={value ?? 0} suffix={suffix} inView={inView} />
        )}
      </p>
      <p
        className="ed-fg mt-4 text-lg md:text-xl"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25 }}
      >
        {label}
      </p>
      <p className="ed-fg-muted mt-2 text-base leading-relaxed" style={{ maxWidth: "20rem" }}>
        {body}
      </p>
    </motion.div>
  );
}
