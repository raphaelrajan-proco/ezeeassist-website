"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { prefix: "",   value: 67,   suffix: "%",  label: "Support ticket reduction for WSI globally" },
  { prefix: "",   value: 93,   suffix: "%",  label: "AI resolution rate at DekaLash" },
  { prefix: "",   value: 2600, suffix: "+",  label: "Queries answered for DivaDance in 6 months" },
  { prefix: "< ", value: 30,   suffix: "s",  label: "Average response time, around the clock" },
];

function useCountUp(target: number, isInView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);
  return count;
}

function StatCard({ prefix, value, suffix, label, isInView }: (typeof stats)[0] & { isInView: boolean }) {
  const count = useCountUp(value, isInView);
  const display =
    value === 2600
      ? count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString()
      : count.toString();

  return (
    <div className="flex flex-col items-center text-center px-6">
      <p className="text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] lg:text-6xl" style={{ letterSpacing: "-0.02em" }}>
        {prefix}{display}{suffix}
      </p>
      <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400 max-w-[180px]">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "rgba(0,174,239,0.04)" }}>
      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-14">
          Real Results from Real Brands
        </p>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 divide-y-2 divide-[#00AEEF]/10 md:divide-y-0 md:divide-x-2">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
