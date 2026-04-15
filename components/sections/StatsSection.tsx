"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { prefix: "",   value: 67,   suffix: "%",  label: "Support ticket reduction for WSI globally" },
  { prefix: "",   value: 93,   suffix: "%",  label: "AI resolution rate at DekaLash" },
  { prefix: "",   value: 2600, suffix: "+",  label: "Queries answered for DivaDance in 6 months" },
  { prefix: "< ", value: 30,   suffix: "s",  label: "Average response time, around the clock" },
];

function useCountUp(target: number, running: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!running || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [running, target, duration]);

  return count;
}

function StatCard({
  prefix,
  value,
  suffix,
  label,
  running,
}: (typeof stats)[0] & { running: boolean }) {
  const count = useCountUp(value, running);
  const display =
    value === 2600 ? count.toLocaleString() : count.toString();

  return (
    <div className="flex flex-col items-center text-center px-6">
      <p
        className="text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] lg:text-6xl"
        style={{ letterSpacing: "-0.02em" }}
      >
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400 max-w-[180px]">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRunning(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F0F9FF] dark:bg-[#111111]">
      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-14">
          Real Results from Real Brands
        </p>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 divide-y-2 divide-[#00AEEF]/10 md:divide-y-0 md:divide-x-2">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} running={running} />
          ))}
        </div>
      </div>
    </section>
  );
}
