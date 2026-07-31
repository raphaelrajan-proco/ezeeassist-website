"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Hash, Mail, MessageSquare, TrendingDown } from "lucide-react";
import {
  AnimatedValue, Overline, SectionShell,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";
import { ScatteredPanel } from "./artifact-panels";

/**
 * The problem, in three cascading beats: capacity, fragmentation, and
 * ungoverned AI. The coach's-week chart carries the headline claim,
 * then each beat supplies one cause. Everything sits in one section
 * with no internal scrolling.
 */
// TODO: Replace with real product screen recording

/* ── Coach's-week chart ────────────────────────────────── */

type Category = {
  key: string;
  label: string;
  color: string;
  onColor: string;
  highlight?: boolean;
};

const CATEGORIES: Category[] = [
  { key: "questions",  label: "Repeat questions",     color: "#3F3F46", onColor: "#FFFFFF" },
  { key: "compliance", label: "Compliance follow-up", color: "#71717A", onColor: "#FFFFFF" },
  { key: "prep",       label: "Call prep",            color: "#A1A1AA", onColor: "#18181B" },
  { key: "reporting",  label: "KPI review",           color: "#D4D4D8", onColor: "#18181B" },
  { key: "coaching",   label: "Coaching",             color: "#00AEEF", onColor: "#FFFFFF", highlight: true },
];

const IN_BAR_LABEL_MIN_PCT = 15;

const BARS: { label: string; values: Record<string, number> }[] = [
  { label: "Today",             values: { questions: 50, compliance: 15, prep: 10, reporting: 5, coaching: 20 } },
  { label: "What it should be", values: { questions: 5,  compliance: 5,  prep: 5,  reporting: 5, coaching: 80 } },
];

function Bar({
  bar, barIndex, inView, reduceMotion,
}: {
  bar: (typeof BARS)[number]; barIndex: number; inView: boolean; reduceMotion: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <p className="ed-fg text-sm" style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
          {bar.label}
        </p>
        <p className="text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>
          {bar.values.coaching}% coaching
        </p>
      </div>

      <div className="flex w-full overflow-hidden rounded-md" style={{ height: "30px", border: "1px solid var(--ed-rule)" }}>
        {CATEGORIES.map((cat, i) => {
          const pct = bar.values[cat.key];
          // Today's coaching share renders at 55% intensity; the
          // should-be bar carries full brand blue.
          const dimmed = Boolean(cat.highlight && barIndex === 0);
          return (
            <motion.div
              key={cat.key}
              initial={reduceMotion ? false : { width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + barIndex * 0.25 + i * 0.05 }}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: reduceMotion ? `${pct}%` : undefined,
                backgroundColor: dimmed ? "rgba(0,174,239,0.55)" : cat.color,
              }}
            >
              {pct >= IN_BAR_LABEL_MIN_PCT && (
                <span className="px-2 min-w-0" style={{ color: dimmed ? "var(--ed-fg)" : cat.onColor }}>
                  <span className="text-[11px] flex-shrink-0" style={{ fontWeight: 700 }}>
                    {pct}%
                  </span>
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Two oversized figures lead; the bars sit beside them as support. */
function CoachWeekChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div ref={ref} className="ed-gradient-frame rounded-3xl p-6 md:p-8">
      <p className="sr-only">
        A field coach&apos;s week today gives 20 percent of the time to
        coaching, against 80 percent if the mechanical work were handled.
        Today: repeat questions 50 percent, compliance follow-up 15
        percent, call prep 10 percent, KPI review 5 percent, coaching 20
        percent. What it should be: repeat questions 5 percent, compliance
        follow-up 5 percent, call prep 5 percent, KPI review 5 percent,
        coaching 80 percent.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-center">
        {/* The two figures that carry the claim */}
        <div className="flex gap-8 sm:gap-12" aria-hidden="true">
          {[
            { value: 20, label: "of a coach's week\ngoes to coaching today", accent: false },
            { value: 80, label: "is what it could be\nwith the rest handled", accent: true },
          ].map((f) => (
            <div key={f.value}>
              <p
                className="tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  lineHeight: 0.9,
                  fontSize: "clamp(3.5rem, 2.2rem + 3.4vw, 5.5rem)",
                  color: f.accent ? "#00AEEF" : "var(--ed-fg)",
                }}
              >
                <AnimatedValue end={f.value} suffix="%" inView={inView} />
              </p>
              <p className="ed-fg-muted mt-3 text-sm leading-snug whitespace-pre-line">
                {f.label}
              </p>
            </div>
          ))}
        </div>

        {/* Supporting breakdown */}
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4" aria-hidden="true">
            {CATEGORIES.map((cat) => (
              <span key={cat.key} className="flex items-center gap-1.5">
                <span className="block h-2 w-2 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span
                  className="text-[12.5px]"
                  style={{ color: cat.highlight ? "var(--ed-accent-text)" : "var(--ed-fg-muted)", fontWeight: cat.highlight ? 600 : 500 }}
                >
                  {cat.label}
                </span>
              </span>
            ))}
          </div>
          <div className="space-y-4">
            {BARS.map((bar, i) => (
              <Bar key={bar.label} bar={bar} barIndex={i} inView={inView} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Beat 1 visual: the inbox and the chase, one layer ──── */

const INBOX_THREADS = [
  { store: "Store #052", channel: "SMS",   icon: MessageSquare, tint: "#15803D", q: "What is the closing checklist for the spa?" },
  { store: "Store #118", channel: "Slack", icon: Hash,          tint: "#611F69", q: "what's the spa closing checklist?" },
  { store: "Store #331", channel: "Email", icon: Mail,          tint: "#0072CE", q: "closing checklist for tonight?" },
];

const CHASE_ROWS = [
  { store: "Store #331", note: "Insurance expires in 14 days", overdue: true },
  { store: "Store #118", note: "2 modules outstanding",        overdue: true },
  { store: "Store #214", note: "All current",                  overdue: false },
];

function CapacityVisual() {
  return (
    <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
      <div className="px-4 pt-4 pb-3">
        <p className="text-[12.5px] mb-2.5" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
          Monday, 8:41 to 9:06 am
        </p>
        <div className="space-y-2">
          {INBOX_THREADS.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.store} className="flex items-start gap-2">
                <Icon aria-hidden="true" className="h-4 w-4 mt-1 flex-shrink-0" strokeWidth={2} style={{ color: t.tint }} />
                <div className="rounded-lg rounded-tl-sm px-3 py-1.5 min-w-0" style={{ backgroundColor: "rgba(10,10,10,0.05)" }}>
                  <p className="text-[11px] mb-0.5" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
                    {t.store} · {t.channel}
                  </p>
                  <p className="text-[13px]" style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>
                    {t.q}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Same layer, second obligation: the compliance chase */}
      <div className="px-4 pt-3 pb-4" style={{ borderTop: `1px solid ${MOCK_HAIRLINE}`, backgroundColor: "rgba(10,10,10,0.02)" }}>
        <p className="text-[12.5px] mb-2" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
          Compliance · West territory
        </p>
        <div className="space-y-1.5">
          {CHASE_ROWS.map((r) => (
            <div key={r.store} className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-mono" style={{ color: MOCK_TEXT }}>{r.store}</span>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] whitespace-nowrap"
                style={r.overdue
                  ? { backgroundColor: "rgba(217,119,6,0.12)", color: "#B45309", fontWeight: 700 }
                  : { backgroundColor: "rgba(22,163,74,0.10)", color: "#15803D", fontWeight: 600 }}
              >
                {r.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Beat 2 visual: the territory grid ─────────────────── */
/* One coach's territory for a month. The obvious failure is flagged
   and gets the call. The two locations sitting either side of target
   get nothing, and that is where the incremental growth sits. */

const TERRITORY_TILES = 30;
const CALLED = new Set([4, 11, 19]);
/** Labelled tiles: the flagged one had the call, the other two did not. */
const LABELLED: Record<number, { pct: string; flagged?: boolean }> = {
  4:  { pct: "71%", flagged: true },
  14: { pct: "98%" },
  22: { pct: "101%" },
};

function TerritoryVisual() {
  return (
    <div className="rounded-xl p-4 w-full" style={MOCK_SURFACE}>
      <p className="text-[12.5px] mb-2.5" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        One coach&apos;s territory · this month
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="block h-2 w-2 rounded-sm" style={{ backgroundColor: "#00AEEF" }} />
          <span className="text-[10.5px]" style={{ color: MOCK_MUTED, fontWeight: 600 }}>Coaching call</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="block h-2 w-2 rounded-sm" style={{ backgroundColor: "rgba(10,10,10,0.12)" }} />
          <span className="text-[10.5px]" style={{ color: MOCK_MUTED, fontWeight: 600 }}>No call</span>
        </span>
        <span className="flex items-center gap-1.5">
          <TrendingDown aria-hidden="true" className="h-3 w-3" strokeWidth={2.25} style={{ color: "#DC2626" }} />
          <span className="text-[10.5px]" style={{ color: MOCK_MUTED, fontWeight: 600 }}>Below target</span>
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1.5" aria-hidden="true">
        {Array.from({ length: TERRITORY_TILES }, (_, i) => {
          const called = CALLED.has(i);
          const tag = LABELLED[i];
          return (
            <div
              key={i}
              className="relative aspect-square rounded-md flex items-center justify-center"
              style={{
                backgroundColor: called ? "rgba(0,174,239,0.85)" : "rgba(10,10,10,0.07)",
                border: `1px solid ${
                  tag && !called ? "rgba(10,10,10,0.30)" : called ? "rgba(0,174,239,0.9)" : "rgba(10,10,10,0.06)"
                }`,
              }}
            >
              {tag && (
                <span
                  className="text-[10px] leading-none"
                  style={{ color: called ? "#FFFFFF" : MOCK_TEXT, fontWeight: 700 }}
                >
                  {tag.pct}
                </span>
              )}
              {tag?.flagged && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
                >
                  <TrendingDown className="h-2.5 w-2.5" strokeWidth={3} style={{ color: "#DC2626" }} />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[12px] mt-3 leading-snug" style={{ color: MOCK_MUTED }}>
        The two that got no call are where your next 4% lives.
      </p>
    </div>
  );
}

/* ── The cascade ───────────────────────────────────────── */

const BEATS = [
  {
    label: "Capacity",
    body: "Coaching has always been rationed. Coaches spend the week on work the playbook already answers.",
    visual: <CapacityVisual />,
  },
  {
    label: "Fragmentation",
    body: "The data that would make coaching specific is scattered across five systems.",
    visual: <TerritoryVisual />,
  },
  {
    label: "Ungoverned AI",
    body: "Franchisees have already started using AI. It does not know your brand, and you cannot see it.",
    visual: <ScatteredPanel />,
  },
];

/* ── Section ───────────────────────────────────────────── */

export default function CoachsWeek() {
  return (
    <SectionShell alt id="the-week">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 md:mb-10"
      >
        <Overline>The problem</Overline>
        <h2
          className="ed-fg leading-[1.05] tracking-[-0.03em] max-w-4xl"
          style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, textWrap: "balance", fontSize: "clamp(2rem, 1.1rem + 1.9vw, 3rem)" }}
        >
          You think every location gets a tailored plan. Your calendar says otherwise.
        </h2>
      </motion.div>

      <CoachWeekChart />

      {/* Three causes, cascading left to right */}
      <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
        {BEATS.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: "var(--ed-fg-muted)", fontWeight: 600 }}>
              {b.label}
            </p>
            <p className="ed-fg text-base md:text-lg leading-snug mb-5" style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
              {b.body}
            </p>
            {b.visual}
          </motion.div>
        ))}
      </div>

      {/* Payoff, handing off to the reveal */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="ed-fg mt-12 md:mt-14 text-2xl md:text-3xl tracking-[-0.02em] max-w-3xl"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25, textWrap: "balance" }}
      >
        What is missing is one system all three run on.
      </motion.p>
    </SectionShell>
  );
}
