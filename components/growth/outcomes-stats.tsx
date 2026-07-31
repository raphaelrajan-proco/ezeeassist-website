"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedValue } from "./shared";

/**
 * The outcome band. Three numbers, oversized, each with a source
 * line. Values SSR at their final figure and count up on hydration.
 * Outcome figures only; network scale lives in the hero eyebrow and
 * is deliberately not repeated here.
 */

// TODO: growth thesis metric slate, pending sourcing. When available, add:
//   Coaching touchpoints per location, per month
//   Locations supported per coach
//   Weeks cut from new franchisee ramp
// These are leading indicators of franchisee revenue and are the intended
// replacement for the deflection-weighted band. Keep 70%+ questions resolved.

type Stat = {
  value: number;
  suffix: string;
  label: string;
  source: string;
};

const STATS: Stat[] = [
  {
    value: 70,
    suffix: "%+",
    label: "Questions resolved without a human",
    source: "Network average across active deployments",
  },
  {
    value: 650,
    suffix: "+",
    label: "Support hours saved in six months",
    source: "DivaDance, 50 locations",
  },
  {
    value: 94,
    suffix: "%",
    label: "Deflection during the Mindbody migration",
    source: "DekaLash, 120 locations",
  },
];

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <p
        className="tracking-[-0.04em]"
        style={{
          color: "#00AEEF",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 0.9,
          fontSize: "clamp(3.25rem, 2rem + 3.2vw, 5rem)",
        }}
      >
        <AnimatedValue end={stat.value} suffix={stat.suffix} inView={inView} />
      </p>
      <p
        className="ed-fg mt-4 text-base md:text-lg"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.3 }}
      >
        {stat.label}
      </p>
      <p className="ed-fg-muted mt-2 text-sm leading-relaxed">{stat.source}</p>
    </motion.div>
  );
}

export default function OutcomesStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
      {STATS.map((s, i) => (
        <StatCell key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
}
