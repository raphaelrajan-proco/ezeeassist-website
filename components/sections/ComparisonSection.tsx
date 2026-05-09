"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  { topic: "Support",          before: "Hours to days. Manual responses.",          after: "Instant. AI resolves 70%+ automatically." },
  { topic: "Coaching",         before: "Reactive. Only when an FBC is available.",  after: "Proactive. AI coaches operators on performance gaps." },
  { topic: "Compliance",       before: "Discovered after the fact.",                after: "Monitored continuously. Flagged in real-time." },
  { topic: "Knowledge access", before: "Scattered across 10+ systems.",             after: "One AI agent, every source connected." },
  { topic: "After-hours",      before: "No one home. Questions pile up.",           after: "Always on. Instant answers at 2am." },
  { topic: "Onboarding",       before: "Weeks of manual training.",                 after: "Day-one access to all brand knowledge." },
  { topic: "Workflows",        before: "Manual. Repetitive. Error-prone.",          after: "AI-powered. Automated. At scale." },
];

function Row({
  topic,
  before,
  after,
  index,
  total,
  inView,
}: {
  topic: string;
  before: string;
  after: string;
  index: number;
  total: number;
  inView: boolean;
}) {
  const last = index === total - 1;
  const baseDelay = 0.15 + index * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: baseDelay }}
      className="relative grid grid-cols-[1fr_2fr_2fr] gap-6 md:gap-12 py-6 md:py-8"
      style={
        !last
          ? {
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: "var(--ed-rule)",
            }
          : {}
      }
    >
      {/* EZee column blue accent — fills in just after the row arrives */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: baseDelay + 0.25 }}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: 0,
          bottom: 0,
          right: 0,
          width: "calc(40% - 12px)",
          backgroundColor: "rgba(0,174,239,0.05)",
        }}
      />

      <p
        className="ed-fg text-base md:text-lg relative"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {topic}
      </p>
      <p className="ed-fg-muted text-base md:text-lg relative" style={{ lineHeight: 1.45 }}>
        {before}
      </p>
      <p
        className="ed-fg text-base md:text-lg relative"
        style={{ lineHeight: 1.45, fontWeight: 500 }}
      >
        {after}
      </p>
    </motion.div>
  );
}

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">Side by Side</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            The old way{" "}
            <span className="ed-accent">vs. the EZee way.</span>
          </h2>
        </motion.div>

        <div ref={ref}>
          <span
            className="ed-rule-draw"
            data-visible={inView}
            aria-hidden="true"
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-[1fr_2fr_2fr] gap-6 md:gap-12 py-6"
            style={{
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: "var(--ed-rule)",
            }}
          >
            <div />
            <p
              className="ed-fg-muted text-xs"
              style={{ fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              Without EZee
            </p>
            <p
              className="ed-accent text-xs"
              style={{ fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              With EZee
            </p>
          </motion.div>

          {rows.map((row, i) => (
            <Row
              key={row.topic}
              topic={row.topic}
              before={row.before}
              after={row.after}
              index={i}
              total={rows.length}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
