"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, TrendingDown, TrendingUp } from "lucide-react";
import GrowthTrustStrip from "./TrustStrip";

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
/* Eyebrow reads as a muted label, not a second headline. */
const HERO_EYEBROW = "rgba(245,237,224,0.78)";

/* ── Fixed geometry ────────────────────────────────────────
   The card is hard-sized to its tallest (final) state, measured on
   the rendered page at the 34rem card width, so the frame and the
   whole hero row never reflow during the loop. */
const CARD_BODY_H = 424; // px; trimmed for the 1200x790 fold, mask absorbs the difference
const CARD_HEADER_H = 49; // px
const CARD_H = CARD_HEADER_H + CARD_BODY_H;
const PANEL_PAD = 24; // p-6 on all breakpoints, fold budget
const PANEL_H = CARD_H + PANEL_PAD * 2;

/* ── Loop timeline ─────────────────────────────────────────
   Two scenes. Scene A (phases 1-5) is the asked-and-answered thread.
   Scene B (phases 6-9) is the same store on Monday morning, where the
   work starts itself. Each scene holds ~4s once complete before the
   next begins, so a reader who arrives mid-loop still catches one. */
const T_VERIFY = 1600;
const T_TYPING = 4000;
const T_ANSWER = 4900;
const T_ACTION = 6600;
const T_SCENE_B = 10600;
const T_KPIS = 12000;
const T_ACTIONS = 14200;
const T_EXECUTE = 16600;
const T_RESET = 20600;

const VERIFY_ROWS = [
  "Schedule: 41 open slots, Thursday and Friday afternoons",
  "Local campaigns: reactivation offer paused 12 days ago",
  "Playbook: Off-Peak Demand Guide, approved 4 Jun",
];

/* Mock digest figures, the same register as the rest of the card: this
   is a product screen, not a claim about results. */
const KPI_ROWS: { label: string; value: string; note: string; good: boolean }[] = [
  { label: "Bookings, next 7 days", value: "68%",  note: "target 80%",  good: false },
  { label: "Rebook rate",           value: "47%",  note: "target 55%",  good: false },
  { label: "Average ticket",        value: "$82",  note: "up 6%",       good: true  },
  { label: "Retail attach",         value: "22%",  note: "up 3 pts",    good: true  },
];

const DIGEST_ACTIONS = [
  "Relaunch the reactivation offer to 340 lapsed clients",
  "Open 2 more Thursday afternoon shifts",
];

type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
    else if (phase === 5) t = setTimeout(() => setPhase(6), T_SCENE_B - T_ACTION);
    else if (phase === 6) t = setTimeout(() => setPhase(7), T_KPIS - T_SCENE_B);
    else if (phase === 7) t = setTimeout(() => setPhase(8), T_ACTIONS - T_KPIS);
    else if (phase === 8) t = setTimeout(() => setPhase(9), T_EXECUTE - T_ACTIONS);
    else t = setTimeout(() => { setCycle((c) => c + 1); setPhase(1); }, T_RESET - T_EXECUTE);
    return () => clearTimeout(t);
  }, [phase, inView, reduceMotion]);

  const teamsBlock = { borderRadius: "6px" };
  /* Reduced motion never leaves phase 1, so it holds scene A complete. */
  const scene: "A" | "B" = phase >= 6 ? "B" : "A";

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
            key={`${cycle}-${scene}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 py-4"
          >
            {/* ── Scene B: Monday morning, the work starts itself ── */}
            {scene === "B" && (
              <>
                {/* One digest card that grows: header, then figures, then the
                    recommended actions. Kept as a single block so the whole
                    scene clears the fixed body height without clipping. */}
                <Enter>
                  <div className="pb-2.5">
                    <SenderLabel accent>EZee Assist · automated</SenderLabel>
                    <div
                      className="w-full px-4 py-2.5"
                      style={{ ...teamsBlock, backgroundColor: "var(--ed-bg-alt)", border: `1px solid var(--ed-rule)` }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm" style={{ color: "var(--ed-fg)", fontWeight: 600 }}>
                          Salon Health KPI Digest
                        </p>
                        <span className="text-[11px] whitespace-nowrap" style={{ color: "var(--ed-fg-muted)" }}>
                          Mon 8:00 AM
                        </span>
                      </div>

                      {phase >= 7 && (
                        <Enter>
                          <div
                            className="mt-2.5 pt-2.5 space-y-1.5"
                            style={{ borderTop: `1px solid var(--ed-rule)` }}
                          >
                            {KPI_ROWS.map((k, i) => (
                              <motion.div
                                key={k.label}
                                initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, ease: EASE, delay: reduceMotion ? 0 : i * 0.28 }}
                                className="flex items-center justify-between gap-3"
                              >
                                <span className="text-[13px] min-w-0" style={{ color: "var(--ed-fg)" }}>
                                  {k.label}
                                </span>
                                <span className="flex items-center gap-1.5 flex-shrink-0">
                                  <span
                                    className="text-[13px] tabular-nums"
                                    style={{ color: k.good ? "#15803D" : "#B45309", fontWeight: 700 }}
                                  >
                                    {k.value}
                                  </span>
                                  {k.good
                                    ? <TrendingUp aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} style={{ color: "#15803D" }} />
                                    : <TrendingDown aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} style={{ color: "#B45309" }} />}
                                  <span className="text-[11px] whitespace-nowrap" style={{ color: "var(--ed-fg-muted)" }}>
                                    {k.note}
                                  </span>
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </Enter>
                      )}

                      {phase >= 8 && (
                        <Enter>
                          <div
                            className="mt-2.5 pt-2.5"
                            style={{ borderTop: `1px solid var(--ed-rule)` }}
                          >
                            <p
                              className="text-[11px] uppercase tracking-[0.14em] mb-1.5"
                              style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}
                            >
                              Recommended
                            </p>
                            <div className="space-y-1">
                              {DIGEST_ACTIONS.map((a) => (
                                <div key={a} className="flex items-start gap-2">
                                  <span
                                    className="block h-1.5 w-1.5 rounded-full flex-shrink-0 mt-[6px]"
                                    style={{ backgroundColor: "#00AEEF" }}
                                  />
                                  <p className="text-[13px]" style={{ color: "var(--ed-fg)", lineHeight: 1.4 }}>
                                    {a}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Enter>
                      )}
                    </div>
                  </div>
                </Enter>

                {phase >= 9 && (
                  <Enter>
                    <div className="pb-2.5">
                      <SenderLabel>Store #214 · Owner</SenderLabel>
                      <div
                        className="w-full px-4 py-2.5 mb-2"
                        style={{ ...teamsBlock, backgroundColor: "var(--ed-card-alt)" }}
                      >
                        <p className="text-sm" style={{ color: "var(--ed-fg)", lineHeight: 1.4 }}>
                          Yes, help me do it.
                        </p>
                      </div>
                      <div
                        className="px-4 py-2.5"
                        style={{ ...teamsBlock, backgroundColor: "rgba(0,174,239,0.08)" }}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="flex h-4 w-4 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: "rgba(22,163,74,0.12)" }}
                          >
                            <Check aria-hidden="true" className="w-2.5 h-2.5" strokeWidth={3} style={{ color: "#15803D" }} />
                          </span>
                          <p className="text-[13px]" style={{ color: "var(--ed-fg)", lineHeight: 1.4 }}>
                            Offer live at 9:00 AM. Shifts posted. Coach notified.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Enter>
                )}
              </>
            )}

            {/* Beat 1: inbound, Teams block */}
            {scene === "A" && (reduceMotion || phase >= 1) && (
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
            {scene === "A" && (reduceMotion || phase >= 2) && (
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
              {scene === "A" && !reduceMotion && phase === 3 && (
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
            {scene === "A" && (reduceMotion || phase >= 4) && (
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
            {scene === "A" && (reduceMotion || phase >= 5) && (
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
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full px-4 py-1.5 text-[13px]"
                      style={{ backgroundColor: "#00AEEF", color: "#FFFFFF", fontWeight: 600 }}
                    >
                      Approve
                    </button>
                    <span className="text-[12px]" style={{ color: "var(--ed-fg-muted)" }}>
                      Coach notified
                    </span>
                  </div>
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
       the pill height plus its inset; --nav-gap is the breathing room
       every hero on the site leaves under the pill. Both live on
       .theme-editorial, so this hero and the sub-page `.ed-hero-pad`
       clear the nav by the same amount. */
    <section
      className="ed-hero-shot relative w-full overflow-hidden"
      style={{ paddingTop: "calc(var(--nav-block) + var(--nav-gap))", backgroundColor: HERO_SCRIM }}
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
                  /* Same declaration as TrustStrip's line, same floor. */
                  fontSize: "max(var(--ed-type-floor, 12px), clamp(0.609rem, 0.525rem + 0.19vw, 0.703rem))",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "var(--ed-accent-text)",
                }}
              >
                Trusted by leading franchise and multi-location brands.
              </motion.p>
            )}

            {/* Eyebrow: a label, not a headline. Small, uppercase, letter
                spaced and muted, so it reads as context in peripheral vision
                and hands off to the statement below. It is no longer the h1;
                that moved to the statement line. Held to one line at every
                width, and bold uppercase at 0.16em is wide, so the column is
                the ceiling: 10.5px at 390, 13px at 1024, 16px at 1205. */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="uppercase mb-4"
              style={{
                /* Was 0.7x the run above by request, which measured 8.4px at
                   390 and was the smallest text on the page. The type floor
                   now binds it: the clamp tops out at 10.5px, under the 13px
                   eyebrow floor, so this is a flat 13px at every width and
                   wraps to two lines below ~430. Raising the floor is what
                   moves it; the clamp is kept so it takes over again if the
                   token ever drops back under 10.5px. */
                fontSize: "max(var(--ed-type-floor-eyebrow, 13px), clamp(0.525rem, 0.063rem + 0.861vw, 0.65625rem))",
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: HERO_EYEBROW,
              }}
            >
              AI Operating System for franchisee success.
            </motion.p>

            {/* The statement, and the page's h1. Sized to the largest that
                still holds three lines, measured rather than estimated: the
                ceiling is 23.5px at 390, 29px at 1024, 35.5px at 1205 and
                37px at 1440. 1024 binds hardest, since that is where the
                two-column grid squeezes the copy column to 425px.
                Note this tops out under the 40px an h1 usually wants; the
                three-line cap and this copy length are what hold it there. */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
              className="mb-4"
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(1.40625rem, 0.519rem + 1.92vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                color: HERO_FG,
              }}
            >
              Take the low-value work off your coaches.{" "}
              <span style={{ color: HERO_ACCENT }}>
                Multiply their expertise across every location.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
              className="mb-6"
              style={{
                /* Three lines at every width. This copy is 168 characters, so
                   the ceiling is tight: 12.25px at 390, 15.25px at 1024,
                   18.5px at 1205, 19.25px at 1440. Mobile is the cost of the
                   three-line cap; allowing four lines there would buy 16.25px.
                   The floor only binds below ~406px, where the clamp dips
                   under 12px; everywhere else the clamp still governs. */
                fontSize: "max(var(--ed-type-floor, 12px), clamp(0.734rem, 0.3125rem + 0.9375vw, 1.15625rem))",
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
              className="flex flex-wrap items-center gap-3.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.45 }}
            >
              {/* White fill on the image. The blue fill measured 2.07:1
                  against the scrimmed background, so the button barely
                  separated from it, and its white label was 2.53:1. */}
              <Link
                href="/speak-to-an-expert"
                className="ed-btn ed-btn-arrow inline-flex flex-none"
                style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
              >
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              {/* Unfilled and still arrowless: it borrows `ed-btn-arrow`
                  for that class's PADDING and type size only, so the two
                  buttons are the same size, and renders no badge. Matching
                  by padding alone does not work, because the sibling's
                  badge is taller than a text line; `min-h` is what makes
                  the boxes equal. `ed-btn-secondary-dark` supplies the
                  outline built for a photographic band. */}
              <Link
                href="/platform/workflows"
                className="ed-btn ed-btn-secondary-dark ed-btn-arrow inline-flex flex-none items-center"
                /* 48 is the primary's measured height: its 2rem badge plus
                   the 8px top and bottom padding `ed-btn-arrow` sets. This
                   button has no badge, so without the min-height it comes
                   out at 40 and the pair sits mismatched. Width is left to
                   the label; forcing that equal too would pad one of them
                   with dead space. */
                style={{ minHeight: 48 }}
              >
                See coaching in action
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
              Two moments in Microsoft Teams. First, a location owner reports
              that next week is only 62 percent booked. The system checks the
              schedule, local campaigns, and the approved playbook, answers
              with the gap and a ready draft for 340 lapsed clients with
              cited sources, then suggests relaunching the reactivation
              offer, gated behind a human Approve button, with the coach
              notified. Second, on Monday at 8am the same store receives an
              automated Salon Health KPI Digest: bookings for the next seven
              days at 68 percent against an 80 percent target, rebook rate 47
              percent against 55, average ticket 82 dollars and up 6 percent,
              retail attach 22 percent and up 3 points. It recommends
              relaunching the reactivation offer to 340 lapsed clients and
              opening two more Thursday afternoon shifts. The owner replies
              in plain language, yes, help me do it, and the work is carried
              out: the offer is scheduled for 9am, shifts are posted to the
              team, and the coach is notified.
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
