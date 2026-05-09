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

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">Side by Side</p>
          <h2
            ref={ref}
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

        {/* Editorial table — no card, no shadow, just rules */}
        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[1fr_2fr_2fr] gap-6 md:gap-12 py-6 border-b ed-rule"
            style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
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
          </div>

          {rows.map(({ topic, before, after }, i) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 + i * 0.05 }}
              className={`grid grid-cols-[1fr_2fr_2fr] gap-6 md:gap-12 py-6 md:py-8 ${
                i !== rows.length - 1 ? "border-b ed-rule" : ""
              }`}
              style={
                i !== rows.length - 1
                  ? { borderBottomWidth: "1px", borderBottomStyle: "solid" }
                  : {}
              }
            >
              <p
                className="ed-fg text-base md:text-lg"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {topic}
              </p>
              <p
                className="ed-fg-muted text-base md:text-lg"
                style={{ lineHeight: 1.45 }}
              >
                {before}
              </p>
              <p
                className="ed-fg text-base md:text-lg"
                style={{ lineHeight: 1.45, fontWeight: 500 }}
              >
                {after}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
