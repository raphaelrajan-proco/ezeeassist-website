"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Overline, SectionHeadline, SectionShell, AnimatedValue } from "./shared";

/**
 * Section 11: three numbers matched to the sales deck, each with a
 * source line. Stats SSR their final value and count up on hydration.
 */

type Stat = {
  value?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
  source: string;
};

// TODO: growth thesis metric slate, pending sourcing. When available, add:
//   Coaching touchpoints per location, per month
//   Locations supported per coach
//   Weeks cut from new franchisee ramp
// These are leading indicators of franchisee revenue and are the intended
// replacement for the deflection-weighted band. Keep 70%+ questions resolved.
// The third slot (previously the DekaLash 94%, which duplicated the proof
// card) returns when the coaching-coverage metrics above are sourced.
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
    label: "Support hours saved in the first six months",
    source: "DivaDance, 50 locations",
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
        className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] flex items-end min-h-[1.1em]"
        style={{
          color: "#00AEEF",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        {stat.staticValue ? (
          stat.staticValue
        ) : (
          <AnimatedValue end={stat.value ?? 0} suffix={stat.suffix} inView={inView} />
        )}
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

export default function OutcomesBand() {
  return (
    <SectionShell alt id="outcomes">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>Outcomes</Overline>
        <SectionHeadline>Here is what comes back.</SectionHeadline>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-4xl">
        {STATS.map((s, i) => (
          <StatCell key={s.label} stat={s} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
