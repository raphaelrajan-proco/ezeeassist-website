"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Overline, SectionHeadline, SectionShell, AnimatedValue } from "./shared";

/**
 * Section 11: four numbers, each with a source line. Stats SSR their
 * final value and count up on hydration.
 */

// TODO: Stat 4 is the headcount claim expressed as a ratio, which is defensible in a way
// "without adding headcount" is not. It needs a real, sourced number before publish. Do not
// ship a placeholder. If no data exists, replace this slot with a fourth verifiable metric.
//
// Interim: the locations-per-coach ratio is UNSOURCED, so this slot currently carries
// average response time instead. Swap it back once the ratio is measured.
//
// TODO: The 40% support-burden figure currently live on the production site must be verified
// or removed before this page publishes. Do not carry it forward unverified.

type Stat = {
  value?: number;
  suffix?: string;
  staticValue?: string;
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
    label: "Coach hours returned in six months",
    source: "DivaDance, 50 locations",
  },
  {
    staticValue: "42 of 42",
    label: "Locations compliance-checked nightly",
    source: "Illustrative of a live deployment",
  },
  {
    staticValue: "Under 30s",
    label: "Average response, any channel",
    source: "Network average across active deployments",
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
      <p className="ed-fg-muted mt-2 text-xs leading-relaxed">{stat.source}</p>
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
        <SectionHeadline>Four numbers you could repeat to your CFO.</SectionHeadline>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {STATS.map((s, i) => (
          <StatCell key={s.label} stat={s} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
