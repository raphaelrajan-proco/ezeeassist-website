"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE } from "./shared";

/**
 * Ada-style hero: generous two-column layout, fluid clamp typography,
 * and one single product surface playing a continuous looped moment.
 */
// TODO: Replace with real product screen recording

/* ── The looped conversation card ──────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Loop timeline in ms, measured from cycle start. */
const T_VERIFY = 1000;
const T_TYPING = 2600;
const T_ANSWER = 3200;
const T_ACTION = 4400;
const T_RESET = 7900; // action + 3.5s hold

const VERIFY_ROWS = [
  "Schedule: 41 open slots, Thursday and Friday afternoons",
  "Local campaigns: reactivation offer paused 12 days ago",
  "Playbook: Off-Peak Demand Guide, approved 4 Jun",
];

/** Phases: 1 question · 2 verifying · 3 typing · 4 answer · 5 action */
type Phase = 1 | 2 | 3 | 4 | 5;

function Block({
  show,
  children,
  duration = 0.5,
}: {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration, ease: EASE }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--ed-fg-muted)" }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}

function ConversationCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>(1);
  const [cycle, setCycle] = useState(0);

  // Loop driver. Pauses off-screen (timers cleared, phase held) and
  // resumes when the card returns.
  useEffect(() => {
    if (reduceMotion || !inView) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === 1) t = setTimeout(() => setPhase(2), T_VERIFY);
    else if (phase === 2) t = setTimeout(() => setPhase(3), T_TYPING - T_VERIFY);
    else if (phase === 3) t = setTimeout(() => setPhase(4), T_ANSWER - T_TYPING);
    else if (phase === 4) t = setTimeout(() => setPhase(5), T_ACTION - T_ANSWER);
    else t = setTimeout(() => { setCycle((c) => c + 1); setPhase(1); }, T_RESET - T_ACTION);
    return () => clearTimeout(t);
  }, [phase, inView, reduceMotion]);

  const show = (p: Phase) => (reduceMotion ? p !== 3 : phase >= p && (p !== 3 || phase === 3));

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid var(--ed-rule)` }}
      >
        <span className="text-[13px]" style={{ color: "var(--ed-fg)", fontWeight: 600 }}>
          Store #214 · SMS
        </span>
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#15803D" }} />
        </span>
      </div>

      {/* Cross-fade wrapper keyed by cycle so resets are soft */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cycle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="px-5 py-4"
        >
          {/* Beat 1: inbound, right-aligned, muted grey */}
          <Block show={show(1)} duration={0.5}>
            <div className="flex justify-end pb-3">
              <div
                className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5"
                style={{ backgroundColor: "var(--ed-card-alt)" }}
              >
                <p className="text-sm" style={{ color: "var(--ed-fg)", lineHeight: 1.4 }}>
                  Next week is only 62% booked. What can I do?
                </p>
              </div>
            </div>
          </Block>

          {/* Beat 2: verification strip */}
          <Block show={show(2)} duration={0.5}>
            <div
              className="rounded-xl px-4 py-3 mb-3"
              style={{ backgroundColor: "var(--ed-bg-alt)", border: `1px solid var(--ed-rule)` }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-2"
                style={{ color: "var(--ed-fg-muted)", fontWeight: 600 }}
              >
                Checking
              </p>
              <div className="space-y-1.5">
                {VERIFY_ROWS.map((row, i) => (
                  <motion.div
                    key={row}
                    initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: reduceMotion ? 0 : i * 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(22,163,74,0.12)" }}
                    >
                      <Check aria-hidden="true" className="w-2.5 h-2.5" strokeWidth={3} style={{ color: "#15803D" }} />
                    </span>
                    <p className="text-[13px]" style={{ color: "var(--ed-fg)", lineHeight: 1.4 }}>
                      {row}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Block>

          {/* Beat 3: typing indicator (loop only) */}
          <Block show={!reduceMotion && phase === 3} duration={0.3}>
            <div className="flex justify-start pb-2">
              <div className="rounded-2xl rounded-bl-md" style={{ backgroundColor: "rgba(0,174,239,0.08)" }}>
                <TypingDots />
              </div>
            </div>
          </Block>

          {/* Beat 4: the answer, left-aligned, pale blue */}
          <Block show={reduceMotion ? true : phase >= 4} duration={0.55}>
            <div className="flex flex-col items-start pb-3">
              <div
                className="max-w-[92%] rounded-2xl rounded-bl-md px-4 py-2.5"
                style={{ backgroundColor: "rgba(0,174,239,0.08)" }}
              >
                <p className="text-sm" style={{ color: "var(--ed-fg)", lineHeight: 1.45 }}>
                  Your gap is Thursday and Friday afternoon. The reactivation
                  offer filled 38 slots last quarter at this lead time. A
                  draft is ready for 340 lapsed clients in your area.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["OFF-PEAK-DEMAND-GUIDE.PDF", "LOCAL-CAMPAIGN-PLAYBOOK.PDF"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-2 py-0.5 text-[10px]"
                    style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 600 }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Block>

          {/* Beat 5: the action card */}
          <Block show={reduceMotion ? true : phase >= 5} duration={0.6}>
            <div
              className="rounded-xl px-4 py-3.5"
              style={{ backgroundColor: "var(--ed-bg-alt)", border: `1px solid var(--ed-rule)` }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-1.5"
                style={{ color: "var(--ed-fg-muted)", fontWeight: 600 }}
              >
                Suggested
              </p>
              <p className="text-sm mb-3" style={{ color: "var(--ed-fg)", fontWeight: 500, lineHeight: 1.35 }}>
                Relaunch reactivation offer · 340 clients
              </p>
              <button
                type="button"
                className="w-full rounded-lg py-2 text-sm"
                style={{ backgroundColor: "#00AEEF", color: "#FFFFFF", fontWeight: 600 }}
              >
                Approve
              </button>
              <p className="text-[12px] mt-2" style={{ color: "var(--ed-fg-muted)" }}>
                Coach notified
              </p>
            </div>
          </Block>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */

/** Brand-blue semibold emphasis inside the H1. */
function Mark({ children }: { children: React.ReactNode }) {
  return <span style={{ fontWeight: 600, color: "var(--ed-accent)" }}>{children}</span>;
}

export default function GrowthHero() {
  return (
    <section className="relative w-full ed-bg overflow-hidden">
      <div
        className="ed-hero-blob"
        style={{ width: "620px", height: "620px", top: "-220px", left: "-220px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[48fr_46fr] gap-16 xl:gap-24 items-center">

          {/* Left: copy */}
          <div className="max-w-[36rem]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="uppercase mb-6"
              style={{
                fontSize: "clamp(0.8125rem, 0.7rem + 0.25vw, 0.9375rem)",
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: "var(--ed-accent-text)",
              }}
            >
              The execution layer for franchise networks
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
              className="ed-fg mb-8"
              style={{
                fontFamily: "var(--font-editorial)",
                /* Max held to 3.4rem rather than the drafted 3.75rem: at
                   60px inside the 36rem column this 17-word H1 wraps to 6
                   lines, and the hard requirement is 5. */
                fontSize: "clamp(2.25rem, 1.1rem + 2.6vw, 3.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                textWrap: "balance",
              }}
            >
              Turn your <Mark>franchise playbooks</Mark> into the unified{" "}
              <Mark>AI Operating System</Mark> that drives franchisee growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="mb-10"
              style={{
                fontSize: "clamp(1.5rem, 1.1rem + 1.1vw, 2.125rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                color: "var(--ed-fg-muted)",
              }}
            >
              Scaling coaching and support, without adding headcount.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                Book a Demo
              </Link>
              <Link href="#capabilities" className="ed-btn ed-btn-secondary" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                See it work
              </Link>
            </motion.div>
          </div>

          {/* Right: single conversation surface on a gradient panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          >
            <p className="sr-only">
              A live conversation: an operator reports that next week is only
              62 percent booked. The system checks the schedule, local
              campaigns, and the approved playbook, answers with the gap and
              a ready draft for 340 lapsed clients with cited sources, then
              suggests relaunching the reactivation offer, gated behind a
              human Approve button, with the coach notified.
            </p>
            <div className="ed-gradient-frame rounded-3xl p-8 md:p-12 flex justify-center">
              <div className="w-full max-w-[34rem]">
                <ConversationCard />
              </div>
            </div>
            <p
              className="mt-4 text-center uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                fontWeight: 500,
                color: "var(--ed-fg-muted)",
              }}
            >
              Sourced from your systems. Governed by your rules.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
