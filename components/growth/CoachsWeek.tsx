"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Hash, Mail, MessageSquare } from "lucide-react";
import {
  AnimatedValue, SectionShell,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED,
} from "./shared";
import { OrderedPanel, ScatteredPanel } from "./artifact-panels";

/**
 * The problem, as a sandwich: the calendar claim and its chart on top,
 * the three kinds of work that eat the week across the middle, and the
 * one-layer payoff at the bottom. Beat names match the hero descriptor
 * so the page repeats itself on purpose.
 */
// TODO: Replace with real product screen recording


/* ── Coach's-week chart ────────────────────────────────── */

type Category = { key: string; label: string; color: string; onColor: string; highlight?: boolean };

const CATEGORIES: Category[] = [
  { key: "questions",  label: "Repeat questions", color: "#3F3F46", onColor: "#FFFFFF" },
  { key: "compliance", label: "Compliance",       color: "#71717A", onColor: "#FFFFFF" },
  { key: "prep",       label: "Call prep",        color: "#A1A1AA", onColor: "#18181B" },
  { key: "reporting",  label: "Reports",          color: "#D4D4D8", onColor: "#18181B" },
  { key: "coaching",   label: "Coaching",         color: "#00AEEF", onColor: "#FFFFFF", highlight: true },
];

/** Below this share a label cannot fit inside its own segment at the
 *  narrowest desktop width, so only the majority bands are named. */
const IN_BAR_LABEL_MIN_PCT = 16;

const BARS: { label: string; values: Record<string, number> }[] = [
  { label: "Today",             values: { questions: 50, compliance: 15, prep: 10, reporting: 5, coaching: 20 } },
  { label: "What it should be", values: { questions: 5,  compliance: 5,  prep: 5,  reporting: 5, coaching: 80 } },
];

function Bar({ bar, barIndex, inView, reduceMotion }: {
  bar: (typeof BARS)[number]; barIndex: number; inView: boolean; reduceMotion: boolean;
}) {
  return (
    <div>
      <p className="ed-fg text-sm mb-2" style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
        {bar.label}
      </p>

      <div className="flex w-full overflow-hidden rounded-md" style={{ height: "32px", border: "1px solid var(--ed-rule)" }}>
        {CATEGORIES.map((cat, i) => {
          const pct = bar.values[cat.key];
          const dimmed = Boolean(cat.highlight && barIndex === 0);
          return (
            <motion.div
              key={cat.key}
              initial={reduceMotion ? false : { width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + barIndex * 0.25 + i * 0.05 }}
              className="flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{
                width: reduceMotion ? `${pct}%` : undefined,
                backgroundColor: dimmed ? "rgba(0,174,239,0.55)" : cat.color,
              }}
            >
              {pct >= IN_BAR_LABEL_MIN_PCT && (
                <span
                  className="px-2 text-[11px] whitespace-nowrap"
                  style={{ color: dimmed ? "var(--ed-fg)" : cat.onColor, fontWeight: 600 }}
                >
                  {cat.label}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CoachWeekChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div ref={ref} className="ed-gradient-frame rounded-3xl p-6 md:p-8">
      <p className="sr-only">
        A field coach&apos;s week today gives 20 percent of the time to
        coaching, against 80 percent if the mechanical work were handled.
        Today: repeat questions 50 percent, compliance 15 percent, call prep
        10 percent, reports 5 percent, coaching 20 percent. What it should
        be: repeat questions 5 percent, compliance 5 percent, call prep 5
        percent, reports 5 percent, coaching 80 percent.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
        <div className="flex gap-8 sm:gap-10" aria-hidden="true">
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
                  fontSize: "clamp(3rem, 2rem + 2.6vw, 4.5rem)",
                  color: f.accent ? "#00AEEF" : "var(--ed-fg)",
                }}
              >
                <AnimatedValue end={f.value} suffix="%" inView={inView} />
              </p>
              <p className="ed-fg-muted mt-3 text-sm leading-snug whitespace-pre-line">{f.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {BARS.map((bar, i) => (
            <Bar key={bar.label} bar={bar} barIndex={i} inView={inView} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Beat visuals. Every card is the same fixed height so the row
      reads as one uniform band. ─────────────────────────────── */

const CARD_H = 300;

function VisualCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl overflow-hidden w-full flex flex-col"
      style={{ ...MOCK_SURFACE, height: `${CARD_H}px` }}
    >
      <p
        className="px-4 pt-4 pb-2.5 text-[12.5px] flex-shrink-0"
        style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}
      >
        {title}
      </p>
      <div className="px-4 pb-4 flex-1 min-h-0">{children}</div>
    </div>
  );
}

/* 01 Repetitive questions: one question, three locations, three channels. */
const INBOX_THREADS = [
  { store: "Store #052", channel: "SMS",   icon: MessageSquare, tint: "#15803D", q: "What is our refund policy on a cancelled booking?" },
  { store: "Store #118", channel: "Slack", icon: Hash,          tint: "#611F69", q: "whats the refund rule for cancellations?" },
  { store: "Store #331", channel: "Email", icon: Mail,          tint: "#0072CE", q: "customer cancelled, do we refund in full?" },
];

function QuestionsVisual() {
  return (
    <VisualCard title="Monday, 8:41 to 9:06 am">
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
                <p className="text-[13px]" style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>{t.q}</p>
              </div>
            </div>
          );
        })}
      </div>
    </VisualCard>
  );
}

/* 02 Compliance chasing: separate deadlines, one person tracking them. */
const CHASE_ROWS = [
  { store: "Store #331", note: "Insurance expires in 14 days", overdue: true },
  { store: "Store #118", note: "2 training modules outstanding", overdue: true },
  { store: "Store #402", note: "Audit docs not uploaded", overdue: true },
  { store: "Store #214", note: "All current", overdue: false },
];

function ComplianceVisual() {
  return (
    <VisualCard title="Compliance · West territory">
      <div className="space-y-2">
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
      <p className="text-[11.5px] mt-3" style={{ color: MOCK_MUTED }}>
        Every deadline runs on its own clock.
      </p>
    </VisualCard>
  );
}

/* 03 Report building: the by-hand sprawl the week actually runs on. */
function ReportsVisual() {
  return (
    <VisualCard title="This week's numbers, by hand">
      <div className="h-full -mx-1">
        <ScatteredPanel bare />
      </div>
    </VisualCard>
  );
}

/* ── The three kinds of work ───────────────────────────── */

const BEATS = [
  {
    label: "Repetitive questions",
    body: "The same question arrives from three locations before nine, and each one gets a personal reply.",
    visual: <QuestionsVisual />,
  },
  {
    label: "Compliance chasing",
    body: "Insurance, training, and audit deadlines all run separately, and someone has to chase every one.",
    visual: <ComplianceVisual />,
  },
  {
    label: "Report building",
    body: "The weekly numbers get rebuilt by hand from five systems, and everyone keeps their own version.",
    visual: <ReportsVisual />,
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
        <h2
          className="ed-fg leading-[1.05] tracking-[-0.03em] max-w-4xl"
          style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, textWrap: "balance", fontSize: "clamp(2rem, 1.1rem + 1.9vw, 3rem)" }}
        >
          You think every location gets a tailored plan.{" "}
          <span style={{ fontStyle: "italic" }}>Your calendar says otherwise.</span>
        </h2>
        <p className="ed-fg-muted mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
          Coaching has always been rationed.
        </p>
      </motion.div>

      <CoachWeekChart />

      {/* The three kinds of work that take the week */}
      <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
        {BEATS.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            className="flex flex-col"
          >
            <p className="ed-fg text-base md:text-lg leading-snug mb-2" style={{ fontFamily: "var(--font-editorial)", fontWeight: 600 }}>
              {b.label}
            </p>
            <p className="ed-fg-muted text-sm leading-snug mb-5 min-h-[2.5rem]">{b.body}</p>
            {b.visual}
          </motion.div>
        ))}
      </div>

      {/* Payoff: one layer the people, playbooks and tools all run on */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mt-14 md:mt-16 text-2xl md:text-3xl tracking-[-0.02em] max-w-3xl"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 1.25,
          textWrap: "balance",
          /* The accent token, not raw #00AEEF: brand blue on the section's
             light background sits near 2.4:1, which fails at this size. */
          color: "var(--ed-accent-text)",
        }}
      >
        What&rsquo;s missing is one unified execution layer that connects all people, playbooks, and tools.
      </motion.p>

      <div className="mt-8">
        <OrderedPanel />
      </div>
    </SectionShell>
  );
}
