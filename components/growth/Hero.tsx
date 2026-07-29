"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED } from "./shared";

/**
 * Two-column hero. Copy left, the four-beat interaction stacked top to
 * bottom on the right. One real question: ask, verify, answer, act,
 * with the governance chrome visible above the fold.
 */
// TODO: Replace with real product screen recording

const BEAT_LABELS = ["Franchisee asks", "EZee checks", "EZee answers", "Next action"];

/** Body copy inside the beat cards. Floor is 14px for legibility. */
const BEAT_BODY = "text-sm";

function BeatShell({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 + index * 0.35 }}
    >
      {/* Pill backdrop so the label stays legible where cards overlap. */}
      <p
        className="ed-fg-muted text-[11px] mb-1 inline-flex items-center rounded-full px-2 py-0.5"
        style={{ fontWeight: 500, letterSpacing: "0.04em", backgroundColor: "var(--ed-bg-alt)" }}
      >
        <span style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>
          {String(index + 1).padStart(2, "0")}
        </span>{" "}
        {BEAT_LABELS[index]}
      </p>
      {children}
    </motion.div>
  );
}

/* Beat 1: the question */
function BeatAsk() {
  return (
    <div className="rounded-xl p-2.5" style={MOCK_SURFACE}>
      <p className="text-[11px] mb-1" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Store #214 · SMS
      </p>
      <div className="rounded-2xl rounded-tl-md px-3 py-1.5" style={{ backgroundColor: "rgba(10,10,10,0.05)" }}>
        <p className={BEAT_BODY} style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>
          Can I run the summer promo pricing at my location this weekend?
        </p>
      </div>
    </div>
  );
}

/* Beat 2: the verification chrome */
const CHECKS = [
  "Role: Franchisee, Store #214",
  "Region: West, promo eligible",
  "Source: Summer Promo Guide, approved 12 Jun",
];

function BeatCheck() {
  return (
    <div className="rounded-xl p-2.5" style={MOCK_SURFACE}>
      <p className="text-[11px] mb-1" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Verifying
      </p>
      <div className="space-y-0.5">
        {CHECKS.map((c) => (
          <div key={c} className="flex items-start gap-1.5">
            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
              style={{ backgroundColor: "rgba(22,163,74,0.12)" }}
            >
              <Check aria-hidden="true" className="w-2.5 h-2.5" strokeWidth={3} style={{ color: "#15803D" }} />
            </span>
            <p className={BEAT_BODY} style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>
              {c}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Beat 3: the cited answer */
function BeatAnswer() {
  return (
    <div className="rounded-xl p-2.5" style={MOCK_SURFACE}>
      <p className="text-[11px] mb-1" style={{ color: "var(--ed-accent-text)", fontWeight: 600, letterSpacing: "0.06em" }}>
        EZee Assist
      </p>
      <div className="rounded-2xl rounded-tl-md px-3 py-1.5 mb-1" style={{ backgroundColor: "rgba(0,174,239,0.08)" }}>
        <p className={BEAT_BODY} style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>
          Yes. Weekend pricing is approved for West region through 31 Aug.
          Signage and social assets are in your brand kit.
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {["SUMMER-PROMO-GUIDE.PDF", "WEST-REGION-ADDENDUM.PDF"].map((f) => (
          <span
            key={f}
            className="rounded-full px-1.5 py-0.5 text-[9px]"
            style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 600 }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Beat 4: the action, gated by a human */
function BeatAction() {
  return (
    <div className="rounded-xl p-2.5" style={MOCK_SURFACE}>
      <p className="text-[11px] mb-1" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Suggested
      </p>
      <p className={`${BEAT_BODY} mb-1.5`} style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>
        Push approved signage to Store #214 print queue
      </p>
      <button
        type="button"
        className="w-full rounded-lg py-1.5 text-[13px]"
        style={{ backgroundColor: "#00AEEF", color: "#FFFFFF", fontWeight: 600 }}
      >
        Approve
      </button>
      <p className="text-[11px] mt-1" style={{ color: MOCK_MUTED }}>
        Coach notified
      </p>
    </div>
  );
}

const BEATS = [<BeatAsk key="a" />, <BeatCheck key="b" />, <BeatAnswer key="c" />, <BeatAction key="d" />];

/** Brand-blue semibold emphasis inside the H1. */
function Mark({ children }: { children: React.ReactNode }) {
  return <span style={{ fontWeight: 600, color: "var(--ed-accent)" }}>{children}</span>;
}

export default function GrowthHero() {
  return (
    <section className="relative w-full ed-bg overflow-hidden">
      <div
        className="ed-hero-blob"
        style={{ width: "620px", height: "620px", top: "-200px", left: "-200px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.2em] mb-8"
              style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}
            >
              The execution layer for franchise networks
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="ed-fg max-w-xl text-5xl lg:text-6xl leading-[1.08] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
            >
              Turn your <Mark>franchise playbooks</Mark> into the unified{" "}
              <Mark>AI Operating System</Mark> that drives franchisee growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="ed-fg-muted mt-7 max-w-xl text-lg md:text-xl leading-relaxed"
            >
              Scaling coaching and support, without adding headcount.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue">
                Book a Demo
              </Link>
              <Link href="#capabilities" className="ed-btn ed-btn-secondary">
                See it work
              </Link>
            </motion.div>
          </div>

          {/* Right: the four beats as layered product surfaces */}
          <div>
            <p className="sr-only">
              A franchisee asks whether summer promo pricing applies at their
              location. EZee verifies their role, region eligibility, and the
              approved source document, answers with citations, then suggests
              a follow-up action that a human approves.
            </p>
            <div className="ed-gradient-frame rounded-3xl p-6 md:p-8">
              {BEATS.map((beat, i) => (
                <div
                  key={i}
                  className={i === 0 ? "relative" : "relative -mt-2.5"}
                  style={{ zIndex: i + 1 }}
                >
                  <BeatShell index={i}>{beat}</BeatShell>
                </div>
              ))}
            </div>
            <p
              className="ed-fg-muted mt-4 text-[11px] uppercase tracking-[0.18em] text-center"
              style={{ fontWeight: 500 }}
            >
              Sourced from your systems. Governed by your rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
