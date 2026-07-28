"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * The coach's week: a time allocation chart, not a list. Two stacked
 * bars with consistent category colors so the eye tracks coaching
 * growing from a sliver to the majority of the week.
 */
// TODO: Replace with real product screen recording

type Category = { key: string; label: string; color: string; highlight?: boolean };

const CATEGORIES: Category[] = [
  { key: "questions",  label: "Repeat questions",     color: "#A1A1AA" },
  { key: "compliance", label: "Compliance follow-up", color: "#BFBFC6" },
  { key: "prep",       label: "Call prep",            color: "#D4D4D8" },
  { key: "reporting",  label: "Reporting",            color: "#E4E4E7" },
  { key: "coaching",   label: "Coaching",             color: "#00AEEF", highlight: true },
];

const BARS: { label: string; values: Record<string, number> }[] = [
  {
    label: "Today",
    values: { questions: 50, compliance: 15, prep: 10, reporting: 5, coaching: 20 },
  },
  {
    label: "What it should be",
    values: { questions: 5, compliance: 5, prep: 5, reporting: 5, coaching: 80 },
  },
];

function Bar({
  bar,
  barIndex,
  inView,
  reduceMotion,
}: {
  bar: (typeof BARS)[number];
  barIndex: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p
          className="ed-fg text-base md:text-lg"
          style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
        >
          {bar.label}
        </p>
        <p className="text-sm" style={{ color: "#00AEEF", fontWeight: 600 }}>
          {bar.values.coaching}% coaching
        </p>
      </div>

      <div
        className="flex w-full overflow-hidden rounded-lg"
        style={{ height: "56px", border: "1px solid var(--ed-rule)" }}
      >
        {CATEGORIES.map((cat, i) => {
          const pct = bar.values[cat.key];
          return (
            <motion.div
              key={cat.key}
              initial={reduceMotion ? false : { width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 + barIndex * 0.25 + i * 0.05,
              }}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: reduceMotion ? `${pct}%` : undefined,
                backgroundColor: cat.color,
              }}
            >
              {pct >= 15 && (
                <span
                  className="text-[11px] px-1 truncate"
                  style={{
                    color: cat.highlight ? "#FFFFFF" : "#52525B",
                    fontWeight: 600,
                  }}
                >
                  {pct}%
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function CoachsWeek() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <SectionShell alt id="the-week">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>The problem</Overline>
        <SectionHeadline>
          Your coaches were hired to grow locations.
        </SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          Here is where the week actually goes.
        </p>
      </motion.div>

      <div ref={ref}>
        <p className="sr-only">
          Chart comparing how a field coach&apos;s week is spent today versus
          how it should be spent. Today: repeat questions 50 percent,
          compliance follow-up 15 percent, call prep 10 percent, reporting 5
          percent, coaching 20 percent. What it should be: repeat questions 5
          percent, compliance follow-up 5 percent, call prep 5 percent,
          reporting 5 percent, coaching 80 percent.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8" aria-hidden="true">
          {CATEGORIES.map((cat) => (
            <span key={cat.key} className="flex items-center gap-2">
              <span
                className="block h-2.5 w-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span
                className="text-xs"
                style={{
                  color: cat.highlight ? "#00AEEF" : "var(--ed-fg-muted)",
                  fontWeight: cat.highlight ? 600 : 500,
                }}
              >
                {cat.label}
              </span>
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="space-y-10">
          {BARS.map((bar, i) => (
            <Bar key={bar.label} bar={bar} barIndex={i} inView={inView} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="ed-fg mt-16 text-2xl md:text-3xl tracking-[-0.02em] max-w-3xl"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25 }}
      >
        Four days in five go to work the playbook already answers.
      </motion.p>
    </SectionShell>
  );
}
