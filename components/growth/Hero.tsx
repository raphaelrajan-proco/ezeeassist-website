"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/**
 * Ada-style hero. Left: fluid-type lockup. Right: one fixed-size
 * conversation window playing a continuous looped moment, styled as
 * Microsoft Teams. The window never changes size; content is
 * bottom-anchored and earlier content slides up behind a fade mask.
 */
// TODO: Replace with real product screen recording

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Fixed geometry ────────────────────────────────────────
   The card is hard-sized to its tallest (final) state, measured on
   the rendered page at the 34rem card width, so the frame and the
   whole hero row never reflow during the loop. */
const CARD_BODY_H = 452; // px, measured: full final sequence height
const CARD_HEADER_H = 49; // px
const CARD_H = CARD_HEADER_H + CARD_BODY_H;
const PANEL_PAD = 32; // p-8 on all breakpoints
const PANEL_H = CARD_H + PANEL_PAD * 2;

/* ── Loop timeline, slowed ~1.5x per review thread MWr-_7COduND ── */
const T_VERIFY = 1600;
const T_TYPING = 4000;
const T_ANSWER = 4900;
const T_ACTION = 6600;
const T_RESET = 12100;

const VERIFY_ROWS = [
  "Schedule: 41 open slots, Thursday and Friday afternoons",
  "Local campaigns: reactivation offer paused 12 days ago",
  "Playbook: Off-Peak Demand Guide, approved 4 Jun",
];

type Phase = 1 | 2 | 3 | 4 | 5;

const TEAMS_PURPLE = "#6264A7";

function SenderLabel({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p
      className="text-[11px] mb-1"
      style={{ color: accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)", fontWeight: 600 }}
    >
      {children}
    </p>
  );
}

/** In-place entrance: fade + small translate. Never animates height. */
function Enter({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      layout="position"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay, layout: { duration: 0.45, ease: EASE } }}
    >
      {children}
    </motion.div>
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

  const teamsBlock = { borderRadius: "6px" };

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        height: `${CARD_H}px`,
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5"
        style={{ height: `${CARD_HEADER_H}px`, borderBottom: `1px solid var(--ed-rule)` }}
      >
        <span className="text-[13px]" style={{ color: "var(--ed-fg)", fontWeight: 600 }}>
          Store #214 · Microsoft Teams
        </span>
        <span
          className="inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: TEAMS_PURPLE }}
          aria-hidden="true"
        />
      </div>

      {/* Fixed-height, bottom-anchored conversation window */}
      <div
        className="relative"
        style={{
          height: `${CARD_BODY_H}px`,
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, transparent 0px, black 36px)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 36px)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cycle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 py-4"
          >
            {/* Beat 1: inbound, Teams block */}
            {(reduceMotion || phase >= 1) && (
              <Enter>
                <div className="pb-3">
                  <SenderLabel>Store #214 · Owner</SenderLabel>
                  <div
                    className="w-full px-4 py-2.5"
                    style={{ ...teamsBlock, backgroundColor: "var(--ed-card-alt)" }}
                  >
                    <p className="text-sm" style={{ color: "var(--ed-fg)", lineHeight: 1.4 }}>
                      Next week is only 62% booked. What can I do?
                    </p>
                  </div>
                </div>
              </Enter>
            )}

            {/* Beat 2: verification */}
            {(reduceMotion || phase >= 2) && (
              <Enter>
                <div
                  className="px-4 py-3 mb-3"
                  style={{ ...teamsBlock, backgroundColor: "var(--ed-bg-alt)", border: `1px solid var(--ed-rule)` }}
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
                        transition={{ duration: 0.4, ease: EASE, delay: reduceMotion ? 0 : i * 0.45 }}
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
              </Enter>
            )}

            {/* Beat 3: typing (loop only) */}
            <AnimatePresence>
              {!reduceMotion && phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="pb-2"
                >
                  <div className="inline-block" style={{ ...teamsBlock, backgroundColor: "rgba(0,174,239,0.08)" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Beat 4: answer */}
            {(reduceMotion || phase >= 4) && (
              <Enter>
                <div className="pb-3">
                  <SenderLabel accent>EZee Assist</SenderLabel>
                  <div
                    className="w-full px-4 py-2.5"
                    style={{ ...teamsBlock, backgroundColor: "rgba(0,174,239,0.08)" }}
                  >
                    <p className="text-sm" style={{ color: "var(--ed-fg)", lineHeight: 1.45 }}>
                      Your gap is Thursday and Friday afternoon. The
                      reactivation offer filled 38 slots last quarter at this
                      lead time. A draft is ready for 340 lapsed clients in
                      your area.
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
              </Enter>
            )}

            {/* Beat 5: action */}
            {(reduceMotion || phase >= 5) && (
              <Enter>
                <div
                  className="px-4 py-3.5"
                  style={{ ...teamsBlock, backgroundColor: "var(--ed-bg-alt)", border: `1px solid var(--ed-rule)` }}
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
              </Enter>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */

/** Brand-blue semibold emphasis. Only "AI Operating System" gets it. */
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
          <div className="max-w-[38rem]">
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
                // Brief specifies clamp(2.5rem, 1.4rem + 3vw, 4rem) as a
                // two-line render. The copy column is ~540px at 1440, which
                // caps a single-line "Your playbooks, running at every
                // location." at ~29px, so the spec is unachievable in this
                // layout. Deliberate three-line lockup at the largest size
                // the column holds instead; flagged in the brief summary.
                fontSize: "clamp(2.25rem, 0.4rem + 2.5vw, 2.375rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              Your playbooks and data,{" "}
              <span className="block">running at every location.</span>
              <span className="block">
                <Mark>Growing revenue at every one.</Mark>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="mb-10"
              style={{
                fontSize: "clamp(1.0625rem, 0.95rem + 0.45vw, 1.3125rem)",
                fontWeight: 400,
                lineHeight: 1.55,
                color: "var(--ed-fg-muted)",
              }}
            >
              Coaching has always been rationed. EZee puts your playbooks
              and performance data to work at every location, so all of
              them get the attention only a few used to get.
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
              <Link href="#the-week" className="ed-btn ed-btn-secondary" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                See where the week goes
              </Link>
            </motion.div>
          </div>

          {/* Right: fixed-size conversation window on a fixed-size panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          >
            <p className="sr-only">
              A live conversation in Microsoft Teams: a location owner
              reports that next week is only 62 percent booked. The system
              checks the schedule, local campaigns, and the approved
              playbook, answers with the gap and a ready draft for 340
              lapsed clients with cited sources, then suggests relaunching
              the reactivation offer, gated behind a human Approve button,
              with the coach notified.
            </p>
            <div
              className="ed-gradient-frame rounded-3xl p-8 flex justify-center items-center"
              style={{ height: `${PANEL_H}px` }}
            >
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
