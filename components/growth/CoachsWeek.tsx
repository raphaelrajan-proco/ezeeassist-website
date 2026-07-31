"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Hash, Mail, MessageSquare,
  FileSpreadsheet, BarChart3, Sparkles, LayoutDashboard,
} from "lucide-react";
import {
  SectionShell,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED,
} from "./shared";
import { OrderedPanel } from "./artifact-panels";

/**
 * The problem, as a sandwich: the calendar claim and its chart on top,
 * the three kinds of work that eat the week across the middle, and the
 * one-layer payoff at the bottom. Beat names match the hero descriptor
 * so the page repeats itself on purpose.
 */
// TODO: Replace with real product screen recording


/* ── Coach's-week chart ────────────────────────────────── */

type Category = { key: string; label: string; color: string; onColor: string; silent?: boolean };

/* Coaching reads the same brand blue in both bars. The contrast the chart
 * makes is width, not shade, so tinting the smaller share weakened it.
 * Repeat questions is silent: it is the only other band wide enough to
 * label, and naming it competed with Coaching for the eye. */
const CATEGORIES: Category[] = [
  { key: "questions",  label: "Repeat questions", color: "#3F3F46", onColor: "#FFFFFF", silent: true },
  { key: "compliance", label: "Compliance",       color: "#71717A", onColor: "#FFFFFF" },
  { key: "prep",       label: "Call prep",        color: "#A1A1AA", onColor: "#18181B" },
  { key: "reporting",  label: "Reports",          color: "#D4D4D8", onColor: "#18181B" },
  { key: "coaching",   label: "Coaching",         color: "#00AEEF", onColor: "#FFFFFF" },
];

/** Below this share a label cannot fit inside its own segment at the
 *  narrowest desktop width, so only the majority bands are named. */
const IN_BAR_LABEL_MIN_PCT = 16;

const BARS: { label: string; strong?: boolean; values: Record<string, number> }[] = [
  { label: "Today",             values: { questions: 50, compliance: 15, prep: 10, reporting: 5, coaching: 20 } },
  { label: "What it should be", strong: true, values: { questions: 5, compliance: 5, prep: 5, reporting: 5, coaching: 80 } },
];

function Bar({ bar, barIndex, inView, reduceMotion }: {
  bar: (typeof BARS)[number]; barIndex: number; inView: boolean; reduceMotion: boolean;
}) {
  return (
    <div>
      <p
        className="ed-fg text-sm mb-2"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: bar.strong ? 700 : 500 }}
      >
        {bar.label}
      </p>

      <div className="flex w-full overflow-hidden rounded-md" style={{ height: "32px", border: "1px solid var(--ed-rule)" }}>
        {CATEGORIES.map((cat, i) => {
          const pct = bar.values[cat.key];
          return (
            <motion.div
              key={cat.key}
              initial={reduceMotion ? false : { width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + barIndex * 0.25 + i * 0.05 }}
              className="flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{
                width: reduceMotion ? `${pct}%` : undefined,
                backgroundColor: cat.color,
              }}
            >
              {!cat.silent && pct >= IN_BAR_LABEL_MIN_PCT && (
                <span
                  className="px-2 text-[11px] whitespace-nowrap"
                  style={{ color: cat.onColor, fontWeight: 600 }}
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
        Four days out of every five go to admin work rather than growth.
        Today: repeat questions 50 percent, compliance 15 percent, call prep
        10 percent, reports 5 percent, coaching 20 percent. What it should
        be: repeat questions 5 percent, compliance 5 percent, call prep 5
        percent, reports 5 percent, coaching 80 percent.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
        {/* The figure restates the Today bar: 20 percent coaching leaves four
            days in five on everything else. Nothing new is claimed. */}
        <div className="max-w-[15rem]" aria-hidden="true">
          <p
            className="tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              lineHeight: 0.9,
              fontSize: "clamp(3rem, 2rem + 2.6vw, 4.5rem)",
              color: "var(--ed-fg)",
            }}
          >
            4<span style={{ color: "#00AEEF" }}>/</span>5
          </p>
          <p className="ed-fg-muted mt-3 text-sm leading-snug">
            days go to admin work, not growth.
          </p>
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

/* All three visuals share one height so the row reads as a band. Set by the
   fullest card at the tightest width: five threads at 768, where the
   three-column grid leaves each card about 224px wide. */
const CARD_H = 336;

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

/* 01 Repetitive questions: several locations, several channels, one hour.
   The same refund question shows up twice on purpose; the rest are the
   ordinary traffic it arrives alongside. */
/* Kept short on purpose. At 768 the three-column grid squeezes each card to
   about 224px, and anything longer wraps to three lines and overruns. */
const INBOX_THREADS = [
  { store: "Store #052", channel: "SMS",   icon: MessageSquare, tint: "#15803D", q: "Refund policy on a cancelled booking?" },
  { store: "Store #118", channel: "Slack", icon: Hash,          tint: "#611F69", q: "whats the refund rule for cancellations" },
  { store: "Store #331", channel: "Email", icon: Mail,          tint: "#0072CE", q: "Which report shows deposits?" },
  { store: "Store #402", channel: "Teams", icon: MessageSquare, tint: "#5B5FC7", q: "New hire Monday, what do I send?" },
  { store: "Store #214", channel: "SMS",   icon: MessageSquare, tint: "#15803D", q: "Approval needed for a local promo?" },
];

function QuestionsVisual() {
  return (
    <VisualCard title="Monday, 8:41 to 9:06 am">
      <div className="space-y-1">
        {INBOX_THREADS.map((t, i) => {
          const Icon = t.icon;
          return (
            <div key={`${t.store}-${i}`} className="flex items-start gap-2">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 mt-1 flex-shrink-0" strokeWidth={2} style={{ color: t.tint }} />
              <div className="rounded-lg rounded-tl-sm px-2.5 py-1 min-w-0" style={{ backgroundColor: "rgba(10,10,10,0.05)" }}>
                <p className="text-[10px] mb-0.5" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
                  {t.store} · {t.channel}
                </p>
                <p className="text-[12px]" style={{ color: MOCK_TEXT, lineHeight: 1.25 }}>{t.q}</p>
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
  { store: "Store #087", note: "P&L not submitted", overdue: true },
  { store: "Store #263", note: "Food safety cert lapsed", overdue: true },
  { store: "Store #519", note: "Background checks pending", overdue: true },
  { store: "Store #214", note: "All current", overdue: false },
];

function ComplianceVisual() {
  return (
    <VisualCard title="Compliance · West territory">
      <div className="space-y-1.5">
        {CHASE_ROWS.map((r) => (
          <div key={r.store} className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-mono" style={{ color: MOCK_TEXT }}>{r.store}</span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap"
              style={r.overdue
                ? { backgroundColor: "rgba(217,119,6,0.12)", color: "#B45309", fontWeight: 700 }
                : { backgroundColor: "rgba(22,163,74,0.10)", color: "#15803D", fontWeight: 600 }}
            >
              {r.note}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] mt-2.5" style={{ color: MOCK_MUTED }}>
        Every deadline runs on its own clock.
      </p>
    </VisualCard>
  );
}

/* 03 Report building: the by-hand sprawl the week actually runs on.
   Hand-placed, overlapping, slightly rotated. The card clips, so tiles
   bleeding past the edge are intentional: the pile does not end. */
type Scrap = {
  icon: React.ElementType;
  tint: string;
  title: string;
  sub?: string;
  x: string; y: string; rot: number; z: number;
  bars?: number[];
};

const REPORT_SCRAPS: Scrap[] = [
  { icon: FileSpreadsheet, tint: "#188038", title: "week-42-numbers-v7.xlsx", sub: "edited by 3 people",      x: "-2%",  y: "0%",   rot: -4, z: 4 },
  { icon: BarChart3,       tint: "#0072CE", title: "Regional rollup",                                        x: "52%",  y: "6%",   rot: 3,  z: 3, bars: [40, 70, 45, 85, 60] },
  { icon: Sparkles,        tint: "#10A37F", title: "ChatGPT",              sub: "“summarise this P&L”", x: "4%", y: "31%", rot: 5,  z: 6 },
  { icon: Mail,            tint: "#C5221F", title: "RE: RE: weekly numbers", sub: "4 attachments",            x: "46%",  y: "38%",  rot: -3, z: 5 },
  { icon: LayoutDashboard, tint: "#7C3AED", title: "Ops dashboard",        sub: "last synced 9 days ago",     x: "-4%",  y: "58%",  rot: 2,  z: 2 },
  { icon: MessageSquare,   tint: "#15803D", title: "can you resend the deck?",                               x: "50%",  y: "70%",  rot: 6,  z: 7 },
  { icon: FileSpreadsheet, tint: "#188038", title: "rollup-FINAL-v2.xlsx",                                   x: "12%",  y: "80%",  rot: -6, z: 1 },
];

function ReportScrap({ s }: { s: Scrap }) {
  const Icon = s.icon;
  return (
    <div
      className="absolute rounded-md px-2 py-1.5"
      style={{
        left: s.x, top: s.y, zIndex: s.z,
        transform: `rotate(${s.rot}deg)`,
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(10,10,10,0.10)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
        maxWidth: "58%",
      }}
    >
      <span className="flex items-center gap-1.5">
        <Icon aria-hidden="true" className="h-3 w-3 flex-shrink-0" strokeWidth={2} style={{ color: s.tint }} />
        <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          {s.title}
        </span>
      </span>
      {s.sub && (
        <span className="block text-[9px] mt-0.5 truncate" style={{ color: MOCK_MUTED }}>
          {s.sub}
        </span>
      )}
      {s.bars && (
        <span className="mt-1 flex items-end gap-0.5" style={{ height: 22 }} aria-hidden="true">
          {s.bars.map((h, i) => (
            <span key={i} className="block w-1.5 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 3 ? "#0072CE" : "#C7CDD4" }} />
          ))}
        </span>
      )}
    </div>
  );
}

function ReportsVisual() {
  return (
    <VisualCard title="This week's numbers, by hand">
      <div className="relative h-full" aria-hidden="true">
        {REPORT_SCRAPS.map((s, i) => (
          <ReportScrap key={i} s={s} />
        ))}
      </div>
      <p className="sr-only">
        A pile of hand-made reporting: spreadsheets edited by several people,
        a regional rollup chart, a one-off ChatGPT analysis of a P&amp;L, a
        long email thread with four attachments, a dashboard last synced nine
        days ago, and a text message asking for the deck again.
      </p>
    </VisualCard>
  );
}

/* ── The three kinds of work ───────────────────────────── */

const BEATS = [
  {
    label: "Repetitive questions",
    body: "Multiple repeat questions arrive from several locations before 9am, each one needing a personal reply.",
    visual: <QuestionsVisual />,
  },
  {
    label: "Compliance chasing",
    body: "Insurance, P&L, training, and audit deadlines all run separately, and someone has to chase each one.",
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
        {/* Sized to the hero's lead line (22.5-35px) rather than the old
            32-48px section scale, so the two openings match. */}
        <h2
          className="ed-fg leading-[1.1] tracking-[-0.03em] max-w-4xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            textWrap: "balance",
            fontSize: "clamp(1.40625rem, 0.67rem + 1.68vw, 2.1875rem)",
          }}
        >
          Coaching has always been rationed. Meant to drive growth, consumed by
          everything else.
        </h2>
      </motion.div>

      <CoachWeekChart />

      {/* The three kinds of work that take the week */}
      {/* Three across only from 1024. At 768 the three-column grid left each
          card 208px wide, which wrapped every question and badge and
          overran the shared card height. */}
      <div className="mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-start">
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
        What&rsquo;s missing is a unified execution layer that connects all people, playbooks, and tools.
      </motion.p>

      <div className="mt-8">
        <OrderedPanel />
      </div>
    </SectionShell>
  );
}
