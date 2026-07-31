"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import GrowthTrustStrip from "./TrustStrip";
import { NETWORK_SCALE } from "@/lib/data/network-scale";

/**
 * Ada-style hero. Left: fluid-type lockup. Right: one fixed-size
 * conversation window playing a continuous looped moment, styled as
 * Microsoft Teams. The window never changes size; content is
 * bottom-anchored and earlier content slides up behind a fade mask.
 */
// TODO: Replace with real product screen recording

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Layout switch. true  = trust line sits above the logo marquee and the
 *                        copy stack starts on the H1 (current).
 *                false = trust line is the hero eyebrow above the H1
 *                        (previous layout). Flip this one boolean to
 *                        revert; nothing else needs to change.
 */
export const EYEBROW_ABOVE_LOGOS = true;

/* ── Hero background ───────────────────────────────────────
   The photograph is a blue gradient, deep at the left and near-white at
   the bottom right. Sampled per-pixel, the copy column sits around
   #1069af, where the old dark copy died: #0077A8 measured 1.15:1 and
   #00AEEF 2.27:1. So the hero runs light on a scrimmed image.

   Scrim strengths are the weakest that clear the targets on the
   lightest pixel of each band, not on its average:
     copy column   cream 4.53:1, accent cyan 3.64:1 (large text)
     trust + logos cream 7.20:1
     behind pill   white pill 3.62:1, so it reads as deliberate
   Raising HERO_SCRIM_FLAT darkens the whole frame; the fade only
   affects the bottom half, where the marquee sits. */
const HERO_SCRIM = "#0B2C48";     /* solid fallback before the image paints */
const HERO_SCRIM_FLAT = 0.3;
const HERO_SCRIM_FADE = 0.9;
/* The top fade exists for 390. A narrow viewport crops the landscape frame
   to its leftmost 19%, which is the lightest part of the image, and the
   eyebrow landed at 4.40:1 there against a 4.5 target. This also lifts the
   backdrop behind the pill from 3.9:1 to 4.8:1. */
const HERO_SCRIM_TOP = 0.15;

/* Copy colours for the scrimmed image. Cyan is reserved for the lead's
   second sentence, which is 26-40px bold and therefore large text. */
const HERO_FG = "#FFFFFF";
const HERO_FG_SOFT = "#F5EDE0";
const HERO_ACCENT = "#9FE0F8";

/* ── Fixed geometry ────────────────────────────────────────
   The card is hard-sized to its tallest (final) state, measured on
   the rendered page at the 34rem card width, so the frame and the
   whole hero row never reflow during the loop. */
const CARD_BODY_H = 424; // px; trimmed for the 1200x790 fold, mask absorbs the difference
const CARD_HEADER_H = 49; // px
const CARD_H = CARD_HEADER_H + CARD_BODY_H;
const PANEL_PAD = 24; // p-6 on all breakpoints, fold budget
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

export default function GrowthHero() {
  return (
    /* The nav pill floats over this section, so the hero starts at the top
       of the document and pads its content past the pill. --nav-block is
       the pill height plus its inset, defined on .theme-editorial. */
    <section
      className="ed-hero-shot relative w-full overflow-hidden"
      style={{ paddingTop: "var(--nav-block)", backgroundColor: HERO_SCRIM }}
    >
      {/* Background. The photograph runs to the top of the document, behind
          the nav pill. object-position keeps the dark left of the frame and
          drops the near-white right edge, which is the part light text
          cannot survive. Two scrims follow: a flat wash to unify the frame,
          then a bottom fade so the trust line and logo marquee sit on a
          controlled colour rather than on the brightest part of the image. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "left center" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${HERO_SCRIM_FLAT})` }} />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, rgba(4,32,54,${HERO_SCRIM_TOP}) 0%, rgba(4,32,54,0) 35%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 50%, rgba(4,32,54,${HERO_SCRIM_FADE}) 100%)` }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[48fr_46fr] gap-16 xl:gap-24 items-center">

          {/* Left: copy */}
          <div className="max-w-[38rem]">
            {!EYEBROW_ABOVE_LOGOS && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="uppercase mb-4"
                style={{
                  fontSize: "clamp(0.609rem, 0.525rem + 0.19vw, 0.703rem)",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "var(--ed-accent-text)",
                }}
              >
                Trusted by {NETWORK_SCALE.brands} brands across {NETWORK_SCALE.locations} locations
              </motion.p>
            )}

            {/* Eyebrow slot. The h1 stays on this line so the page's primary
                statement still matches the title tag and the JSON-LD.
                Held to one line at every width. Bold and uppercase at 0.16em
                is wide, so the column is the ceiling: one line allows 10.5px
                at 390, 13px at 1024, 16px at 1205, 16.75px at 1440. The
                clamp sits just under each. Tracking is the lever if this ever
                needs to be larger; dropping to 0.10em buys about 1.5px. */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="uppercase mb-4"
              style={{
                fontSize: "clamp(0.625rem, -0.173rem + 1.49vw, 1rem)",
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: HERO_FG,
              }}
            >
              AI Operating System for franchisee success.
            </motion.h1>

            {/* Lead slot, held to three lines at every width. Sized against
                measured wrap points, not a width ratio: the ceiling for three
                lines is 23.5px at 390, 29px at 1024, 35.5px at 1205, 37px at
                1440. 1024 binds hardest, because that is where the two-column
                grid starts and squeezes the copy column to 425px, narrower
                than at 768. The clamp sits ~4% under each ceiling. */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
              className="mb-4"
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(1.40625rem, 0.67rem + 1.68vw, 2.1875rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: HERO_FG,
              }}
            >
              Take the low-value work off your coaches.{" "}
              <span style={{ color: HERO_ACCENT }}>
                Multiply their expertise across every location.
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
              className="mb-6"
              style={{
                /* Three lines at every width. This copy is 168 characters, so
                   the ceiling is tight: 12.25px at 390, 15.25px at 1024,
                   18.5px at 1205, 19.25px at 1440. Mobile is the cost of the
                   three-line cap; allowing four lines there would buy 16.25px. */
                fontSize: "clamp(0.734rem, 0.3125rem + 0.9375vw, 1.15625rem)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: HERO_FG_SOFT,
              }}
            >
              Repetitive questions. Compliance chasing. Report building. EZee
              handles all of it, so a coach can build the plays once and every
              location runs them. <strong style={{ fontWeight: 700 }}>Growth, not headcount.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.45 }}
            >
              {/* White fill on the image. The blue fill measured 2.07:1
                  against the scrimmed background, so the button barely
                  separated from it, and its white label was 2.53:1. */}
              <Link
                href="/contact"
                className="ed-btn ed-btn-arrow inline-flex"
                style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
              >
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
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
              className="ed-gradient-frame rounded-3xl p-6 flex justify-center items-center"
              style={{ height: `${PANEL_H}px` }}
            >
              <div className="w-full max-w-[34rem]">
                <ConversationCard />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <GrowthTrustStrip showTrustLine={EYEBROW_ABOVE_LOGOS} />
    </section>
  );
}
