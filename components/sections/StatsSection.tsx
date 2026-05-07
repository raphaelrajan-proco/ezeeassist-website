"use client";

import CountUp from "react-countup";

const stats = [
  { prefix: "",  end: 60,    suffix: "+",  decimals: 0, label: "Franchise brands" },
  { prefix: "",  end: 4000,  suffix: "+",  decimals: 0, label: "Locations" },
  { prefix: "",  end: 10000, suffix: "+",  decimals: 0, label: "Users" },
  { prefix: "",  end: 70,    suffix: "%+", decimals: 0, label: "Support deflection" },
];

export default function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F0F9FF] dark:bg-[#111111]">
      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-14">
          Real Results from Real Brands
        </p>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 divide-y-2 divide-[#00AEEF]/10 md:divide-y-0 md:divide-x-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-6">
              <p
                className="text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] lg:text-6xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stat.prefix}
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2.2}
                  useEasing
                  enableScrollSpy
                  scrollSpyOnce
                  separator=","
                />
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400 max-w-[180px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
