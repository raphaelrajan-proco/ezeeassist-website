"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight, ChevronDown } from "lucide-react";
import { MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE } from "./shared";

/**
 * Hero: one real interaction, shown in four beats, with the governance
 * chrome visible. Ask, verify, answer, act. The verification beat is
 * the differentiator and it sits above the fold on purpose.
 */
// TODO: Replace with real product screen recording

const BEAT_LABELS = ["Franchisee asks", "EZee checks", "EZee answers", "Next action"];

function BeatShell({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 + index * 0.4 }}
      className="flex-1 min-w-0"
    >
      <p
        className="ed-fg-muted text-[11px] mb-2.5"
        style={{ fontWeight: 500, letterSpacing: "0.04em" }}
      >
        <span style={{ color: "#00AEEF", fontWeight: 600 }}>
          {String(index + 1).padStart(2, "0")}
        </span>{" "}
        {BEAT_LABELS[index]}
      </p>
      {children}
    </motion.div>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.75 + index * 0.4 }}
      className="hidden lg:flex items-center justify-center flex-shrink-0 self-center pt-6"
      style={{ width: "28px" }}
      aria-hidden="true"
    >
      <ChevronRight className="w-4 h-4" strokeWidth={2} style={{ color: "#00AEEF", opacity: 0.55 }} />
    </motion.div>
  );
}

function MobileConnector() {
  return (
    <div className="lg:hidden flex justify-center py-1.5" aria-hidden="true">
      <ChevronDown className="w-4 h-4" strokeWidth={2} style={{ color: "#00AEEF", opacity: 0.55 }} />
    </div>
  );
}

/* Beat 1: the question */
function BeatAsk() {
  return (
    <div className="rounded-xl p-3.5" style={MOCK_SURFACE}>
      <p className="text-[9.5px] mb-2" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Store #214 · SMS
      </p>
      <div
        className="rounded-2xl rounded-tl-md px-3 py-2"
        style={{ backgroundColor: "rgba(10,10,10,0.05)" }}
      >
        <p className="text-[11.5px]" style={{ color: MOCK_TEXT, lineHeight: 1.4 }}>
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
    <div className="rounded-xl p-3.5" style={MOCK_SURFACE}>
      <p className="text-[9.5px] mb-2.5" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Verifying
      </p>
      <div className="space-y-1.5">
        {CHECKS.map((c) => (
          <div key={c} className="flex items-start gap-1.5">
            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full flex-shrink-0 mt-px"
              style={{ backgroundColor: "rgba(22,163,74,0.12)" }}
            >
              <Check aria-hidden="true" className="w-2.5 h-2.5" strokeWidth={3} style={{ color: "#15803D" }} />
            </span>
            <p className="text-[10.5px]" style={{ color: MOCK_TEXT, lineHeight: 1.35 }}>
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
    <div className="rounded-xl p-3.5" style={MOCK_SURFACE}>
      <p className="text-[9.5px] mb-2" style={{ color: "#0077A8", fontWeight: 600, letterSpacing: "0.06em" }}>
        EZee Assist
      </p>
      <div
        className="rounded-2xl rounded-tl-md px-3 py-2 mb-2"
        style={{ backgroundColor: "rgba(0,174,239,0.08)" }}
      >
        <p className="text-[11.5px]" style={{ color: MOCK_TEXT, lineHeight: 1.4 }}>
          Yes. Weekend pricing is approved for West region through 31 Aug.
          Signage and social assets are in your brand kit.
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {["SUMMER-PROMO-GUIDE.PDF", "WEST-REGION-ADDENDUM.PDF"].map((f) => (
          <span
            key={f}
            className="rounded-full px-1.5 py-0.5 text-[8px]"
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
    <div className="rounded-xl p-3.5" style={MOCK_SURFACE}>
      <p className="text-[9.5px] mb-2" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Suggested
      </p>
      <p className="text-[11.5px] mb-2.5" style={{ color: MOCK_TEXT, lineHeight: 1.4 }}>
        Push approved signage to Store #214 print queue
      </p>
      <button
        type="button"
        className="w-full rounded-lg py-1.5 text-[10.5px]"
        style={{ backgroundColor: "#00AEEF", color: "#FFFFFF", fontWeight: 600 }}
      >
        Approve
      </button>
      <p className="text-[9.5px] mt-2" style={{ color: MOCK_MUTED }}>
        Coach notified
      </p>
    </div>
  );
}

const BEATS = [<BeatAsk key="a" />, <BeatCheck key="b" />, <BeatAnswer key="c" />, <BeatAction key="d" />];

export default function GrowthHero() {
  return (
    <section className="relative w-full ed-bg overflow-hidden">
      <div
        className="ed-hero-blob"
        style={{ width: "680px", height: "680px", top: "-180px", left: "-180px" }}
        aria-hidden="true"
      />

      {/* lg:py-20 rather than py-24: at text-7xl the hero measured 933px tall
          against a 900px viewport, so the beat strip clipped at 1440x900. */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-20">
        {/* Copy. Wider than the subhead measure so the larger H1 wraps to
            two lines and the hero still clears the fold at 1440x900. */}
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.2em] mb-6"
            style={{ color: "#00AEEF", fontWeight: 500 }}
          >
            The execution layer for franchise networks
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="ed-fg text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
          >
            The operating system that runs your playbooks.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="ed-fg-muted mt-6 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            EZee connects your knowledge, performance data, and systems so
            coaches guide better, mechanical work runs itself, and locations
            execute against the standard you set.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.55 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="ed-btn ed-btn-blue">
              Book a Demo
            </Link>
            <Link href="#capabilities" className="ed-btn ed-btn-secondary">
              See it work
            </Link>
          </motion.div>
        </div>

        {/* Four-beat live product moment */}
        <div className="mt-10 md:mt-12">
          <p className="sr-only">
            A franchisee asks whether summer promo pricing applies at their
            location. EZee verifies their role, region eligibility, and the
            approved source document, answers with citations, then suggests a
            follow-up action that a human approves.
          </p>
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {BEATS.map((beat, i) => (
              <div key={i} className="contents">
                <BeatShell index={i}>{beat}</BeatShell>
                {i < BEATS.length - 1 && (
                  <>
                    <Connector index={i} />
                    <MobileConnector />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
