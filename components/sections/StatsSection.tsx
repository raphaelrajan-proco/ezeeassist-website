"use client";

import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const stats = [
  { prefix: "", end: 60,    suffix: "+",  decimals: 0, label: "Franchise brands" },
  { prefix: "", end: 4500,  suffix: "+",  decimals: 0, label: "Locations" },
  { prefix: "", end: 10000, suffix: "+",  decimals: 0, label: "Users" },
  { prefix: "", end: 70,    suffix: "%+", decimals: 0, label: "Support deflection" },
];

function StatBlock({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [counted, setCounted] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="flex flex-col"
    >
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
          duration={2.5}
          useEasing
          enableScrollSpy
          scrollSpyOnce
          separator=","
          onEnd={() => setCounted(true)}
        />
      </p>

      {/* Underline — draws after count finishes */}
      <span
        aria-hidden="true"
        className="block mt-6 origin-left transition-transform"
        style={{
          width: "120px",
          height: "1px",
          backgroundColor: "#00AEEF",
          transform: counted ? "scaleX(1)" : "scaleX(0)",
          transitionDuration: "900ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

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
    </motion.div>
  );
}

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
          {stats.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
