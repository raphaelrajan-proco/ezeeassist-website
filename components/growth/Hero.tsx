"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE } from "./shared";

/**
 * Growth hero: playbooks → AI team promise, with the coach's Monday
 * brief as the hero artifact. Fits with its visual in one viewport at
 * 1440x900.
 */

/* ── Monday brief card ─────────────────────────────────── */
// TODO: Replace with real product screen recording

const BRIEF_ROWS = [
  {
    store: "Store #214",
    metric: "Membership conversion down 12% vs target",
    action: "Rerun the Week 2 objection-handling module with the front desk team",
  },
  {
    store: "Store #087",
    metric: "3 new 2-star reviews, all citing wait time",
    action: "Review the Saturday open staffing template",
  },
  {
    store: "Store #331",
    metric: "Insurance certificate expires in 14 days",
    action: "Send renewal reminder, escalate if no response by Friday",
  },
];

function MondayBrief() {
  return (
    <div className="rounded-2xl overflow-hidden w-full max-w-[420px] mx-auto" style={MOCK_SURFACE}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}
      >
        <span className="text-[12px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          Monday brief · West territory · 42 locations
        </span>
        <span aria-hidden="true" className="block h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#00AEEF" }} />
      </div>

      {/* Flagged rows */}
      {BRIEF_ROWS.map((r, i) => (
        <motion.div
          key={r.store}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.15 }}
          className="px-4 py-3"
          style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}
        >
          <p className="text-[11px] mb-1" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
            {r.store}
            <span style={{ color: "#B45309", fontWeight: 500 }}> · {r.metric}</span>
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: MOCK_MUTED }}>
            <span style={{ color: "#0077A8", fontWeight: 600 }}>Recommended: </span>
            {r.action}
          </p>
        </motion.div>
      ))}

      {/* Footer */}
      <div className="px-4 py-2.5 flex items-center gap-1.5">
        <span className="text-[10px]" style={{ color: MOCK_MUTED, fontWeight: 500 }}>
          Drafted by EZee · Ready for your call at 9am
        </span>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */

export default function GrowthHero() {
  return (
    <section className="relative w-full ed-bg overflow-hidden">
      {/* Ambient blue blob */}
      <div
        className="ed-hero-blob"
        style={{ width: "700px", height: "700px", top: "-140px", left: "-160px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.2em] mb-6"
              style={{ color: "#00AEEF", fontWeight: 500 }}
            >
              For Franchise and Multi-Location Brands
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="max-w-[22ch] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
            >
              <span className="ed-fg">Turn your franchise playbooks into</span>{" "}
              <span style={{ color: "#00AEEF" }}>
                an AI team that drives franchisee growth.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
              className="ed-fg-muted mt-8 max-w-2xl text-lg md:text-xl leading-relaxed"
            >
              Scale coaching and support without adding headcount. EZee
              connects your knowledge, performance data, and systems so
              coaches guide better, high-impact work runs itself, and
              revenue improves at every location.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.2 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
                Book a Demo
              </Link>
              <Link href="#ai-team" className="ed-btn ed-btn-secondary">
                See how it works
              </Link>
            </motion.div>
          </div>

          {/* Monday brief */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="lg:col-span-5"
          >
            <MondayBrief />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
