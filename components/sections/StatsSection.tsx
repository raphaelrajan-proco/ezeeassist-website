"use client";

import CountUp from "react-countup";

const stats = [
  { prefix: "", end: 60,    suffix: "+",  decimals: 0, label: "Franchise brands" },
  { prefix: "", end: 4000,  suffix: "+",  decimals: 0, label: "Locations" },
  { prefix: "", end: 10000, suffix: "+",  decimals: 0, label: "Users" },
  { prefix: "", end: 70,    suffix: "%+", decimals: 0, label: "Support deflection" },
];

export default function StatsSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <p
          className="mb-16 md:mb-24 text-xs"
          style={{
            color: "#00AEEF",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Real Results from Real Brands
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 md:gap-y-24 md:gap-x-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <p
                className="text-7xl md:text-8xl lg:text-9xl"
                style={{
                  color: "#F5EDE0",
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                }}
              >
                {stat.prefix}
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2.4}
                  useEasing
                  enableScrollSpy
                  scrollSpyOnce
                  separator=","
                />
              </p>
              <p
                className="mt-6 text-lg md:text-xl"
                style={{
                  color: "#A89B86",
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
