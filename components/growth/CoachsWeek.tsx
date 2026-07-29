"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Hash, MessageSquare } from "lucide-react";
import {
  Overline, SectionHeadline, SectionShell, GradientFrame,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";

/**
 * The coach's week. Three story beats with product vignettes, then the
 * Today vs Should-be chart as the synthesis, then the kicker.
 */
// TODO: Replace with real product screen recording

/* ── Chart data (unchanged) ────────────────────────────── */

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
  { key: "reporting",  label: "Reporting",            color: "#D4D4D8", onColor: "#18181B" },
  { key: "coaching",   label: "Coaching",             color: "#00AEEF", onColor: "#FFFFFF", highlight: true },
];

const IN_BAR_LABEL_MIN_PCT = 15;

const BARS: { label: string; values: Record<string, number> }[] = [
  { label: "Today",             values: { questions: 50, compliance: 15, prep: 10, reporting: 5, coaching: 20 } },
  { label: "What it should be", values: { questions: 5,  compliance: 5,  prep: 5,  reporting: 5, coaching: 80 } },
];

/* ── Vignette 1: the same question, three stores ───────── */

const INBOX_THREADS = [
  { store: "Store #052", channel: "SMS",   icon: MessageSquare, q: "What is the closing checklist for the spa?" },
  { store: "Store #118", channel: "Slack", icon: Hash,          q: "what's the spa closing checklist?" },
  { store: "Store #331", channel: "SMS",   icon: MessageSquare, q: "closing checklist for tonight?" },
];

function InboxVignette() {
  return (
    <div className="rounded-xl p-3.5 w-full max-w-sm" style={MOCK_SURFACE}>
      <p className="text-[11px] mb-2.5" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        Monday, 8:41 to 9:06 am
      </p>
      <div className="space-y-2">
        {INBOX_THREADS.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.store} className="flex items-start gap-2">
              <Icon aria-hidden="true" className="w-3.5 h-3.5 mt-1 flex-shrink-0" strokeWidth={2}
                style={{ color: t.channel === "Slack" ? "#611F69" : "#15803D" }} />
              <div className="rounded-2xl rounded-tl-md px-3 py-1.5 min-w-0" style={{ backgroundColor: "rgba(10,10,10,0.05)" }}>
                <p className="text-[10px] mb-0.5" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
                  {t.store} · {t.channel}
                </p>
                <p className="text-[12.5px]" style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>
                  {t.q}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Vignette 2: the chase ─────────────────────────────── */

function ChaseVignette() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl p-3.5" style={MOCK_SURFACE}>
        <p className="text-[11px] mb-2" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
          Compliance · West territory
        </p>
        <div className="space-y-1.5">
          {[
            { store: "Store #331", note: "Insurance expires in 14 days", overdue: true },
            { store: "Store #118", note: "2 modules outstanding",        overdue: true },
            { store: "Store #214", note: "All current",                  overdue: false },
          ].map((r) => (
            <div key={r.store} className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-mono" style={{ color: MOCK_TEXT }}>{r.store}</span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px]"
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

      {/* Half-built spreadsheet corner, tucked under */}
      <div className="relative ml-8 -mt-2 rounded-xl overflow-hidden" style={{ ...MOCK_SURFACE, zIndex: 2 }}>
        <div className="flex items-center gap-2 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}`, backgroundColor: "rgba(10,10,10,0.03)" }}>
          <span className="text-[10px] font-mono" style={{ color: MOCK_MUTED }}>fx</span>
          <span className="text-[10px] font-mono truncate" style={{ color: MOCK_TEXT }}>
            =VLOOKUP(A2,POS!B:F,4,FALSE)
          </span>
        </div>
        <div className="grid grid-cols-4" aria-hidden="true">
          {["A", "B", "C", "D"].map((c) => (
            <span key={c} className="text-center text-[9px] py-0.5 font-mono" style={{ color: MOCK_MUTED, borderBottom: `1px solid ${MOCK_HAIRLINE}`, borderRight: `1px solid ${MOCK_HAIRLINE}` }}>
              {c}
            </span>
          ))}
          {["Store", "Sales", "Target", ""].map((v, i) => (
            <span key={i} className="text-[9px] px-1.5 py-1 font-mono truncate" style={{ color: v ? MOCK_TEXT : MOCK_MUTED, borderRight: `1px solid ${MOCK_HAIRLINE}` }}>
              {v || "…"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Vignette 3: what is left ──────────────────────────── */

const WEEK: { day: string; blocks: { label: string; blue?: boolean }[] }[] = [
  { day: "Mon", blocks: [{ label: "Questions" }, { label: "Questions" }, { label: "Reports" }] },
  { day: "Tue", blocks: [{ label: "Questions" }, { label: "Chasing" }, { label: "Questions" }] },
  { day: "Wed", blocks: [{ label: "Reports" }, { label: "Questions" }, { label: "Chasing" }] },
  { day: "Thu", blocks: [{ label: "Questions" }, { label: "Chasing" }, { label: "Reports" }] },
  { day: "Fri", blocks: [{ label: "Questions" }, { label: "Coaching", blue: true }, { label: "Reports" }] },
];

function WeekVignette() {
  return (
    <div className="rounded-xl p-3.5 w-full max-w-sm" style={MOCK_SURFACE}>
      <p className="text-[11px] mb-2.5" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
        A coach&apos;s calendar
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {WEEK.map((d) => (
          <div key={d.day}>
            <p className="text-[9px] text-center mb-1 font-mono" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
              {d.day}
            </p>
            <div className="space-y-1">
              {d.blocks.map((b, i) => (
                <div
                  key={i}
                  className="rounded px-1 py-1.5 text-center"
                  style={{
                    backgroundColor: b.blue ? "rgba(0,174,239,0.14)" : "rgba(10,10,10,0.05)",
                    border: `1px solid ${b.blue ? "rgba(0,174,239,0.4)" : "transparent"}`,
                  }}
                >
                  <span className="text-[8.5px] leading-none" style={{ color: b.blue ? "#0077A8" : MOCK_MUTED, fontWeight: b.blue ? 700 : 500 }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Story beats ───────────────────────────────────────── */

const BEATS = [
  {
    label: "The inbox",
    copy: "The same closing-checklist question arrives from three stores before nine. Each one gets a personal reply, because the answer lives in a document nobody opens.",
    vignette: <InboxVignette />,
    flip: false,
  },
  {
    label: "The chase",
    copy: "Insurance renewals, training modules, and audit documents each run on their own deadline. The weekly report still gets assembled by hand from five systems.",
    vignette: <ChaseVignette />,
    flip: true,
  },
  {
    label: "What is left",
    copy: "Coaching gets the hours nothing else claimed, usually a Friday afternoon. The numbers it runs on closed two weeks earlier.",
    vignette: <WeekVignette />,
    flip: false,
  },
];

function Beat({ beat, first }: { beat: (typeof BEATS)[number]; first: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-8"
      style={first ? {} : { borderTop: "1px solid var(--ed-rule)" }}
    >
      <div className={beat.flip ? "md:order-2" : ""}>
        <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>
          {beat.label}
        </p>
        <p className="ed-fg-muted text-base md:text-lg leading-relaxed max-w-lg">
          {beat.copy}
        </p>
      </div>
      <div className={`flex ${beat.flip ? "md:order-1 md:justify-start" : "md:justify-end"} justify-center`}>
        {beat.vignette}
      </div>
    </motion.div>
  );
}

/* ── Chart bar ─────────────────────────────────────────── */

function Bar({
  bar, barIndex, inView, reduceMotion,
}: {
  bar: (typeof BARS)[number]; barIndex: number; inView: boolean; reduceMotion: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="ed-fg text-base md:text-lg" style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
          {bar.label}
        </p>
        <p className="text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>
          {bar.values.coaching}% coaching
        </p>
      </div>

      <div className="flex w-full overflow-hidden rounded-lg" style={{ height: "56px", border: "1px solid var(--ed-rule)" }}>
        {CATEGORIES.map((cat, i) => {
          const pct = bar.values[cat.key];
          return (
            <motion.div
              key={cat.key}
              initial={reduceMotion ? false : { width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + barIndex * 0.25 + i * 0.05 }}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: reduceMotion ? `${pct}%` : undefined, backgroundColor: cat.color }}
            >
              {pct >= IN_BAR_LABEL_MIN_PCT && (
                <span className="flex items-baseline gap-1.5 px-2 min-w-0" style={{ color: cat.onColor }}>
                  <span className="text-[11px] truncate hidden sm:inline" style={{ fontWeight: 500 }}>
                    {cat.label}
                  </span>
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

/* ── Section ───────────────────────────────────────────── */

export default function CoachsWeek() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <SectionShell alt id="the-week">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-10 md:mb-12"
      >
        <Overline>The problem</Overline>
        <SectionHeadline>Your coaches were hired to grow locations.</SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          Here is where the week actually goes.
        </p>
      </motion.div>

      {/* Story beats */}
      <div className="mb-12 md:mb-14">
        {BEATS.map((b, i) => (
          <Beat key={b.label} beat={b} first={i === 0} />
        ))}
      </div>

      {/* The synthesis: Today vs Should-be */}
      <div ref={ref} className="ed-gradient-frame rounded-3xl p-6 md:p-8">
        <p className="sr-only">
          Chart comparing how a field coach&apos;s week is spent today versus
          how it should be spent. Today: repeat questions 50 percent,
          compliance follow-up 15 percent, call prep 10 percent, reporting 5
          percent, coaching 20 percent. What it should be: repeat questions 5
          percent, compliance follow-up 5 percent, call prep 5 percent,
          reporting 5 percent, coaching 80 percent.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8" aria-hidden="true">
          {CATEGORIES.map((cat) => (
            <span key={cat.key} className="flex items-center gap-2">
              <span className="block h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-xs" style={{ color: cat.highlight ? "var(--ed-accent-text)" : "var(--ed-fg-muted)", fontWeight: cat.highlight ? 600 : 500 }}>
                {cat.label}
              </span>
            </span>
          ))}
        </div>

        <div className="space-y-10">
          {BARS.map((bar, i) => (
            <Bar key={bar.label} bar={bar} barIndex={i} inView={inView} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      {/* Kicker */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mt-14 text-2xl md:text-3xl tracking-[-0.02em] max-w-3xl"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25 }}
      >
        <span className="ed-fg-muted">Four days in five go to work </span>
        <span className="ed-fg" style={{ fontWeight: 600 }}>
          the playbook already answers.
        </span>
      </motion.p>
    </SectionShell>
  );
}
