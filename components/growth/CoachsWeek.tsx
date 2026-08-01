"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Hash, Mail, MessageSquare,
  FileSpreadsheet, BarChart3, Sparkles, LayoutDashboard,
} from "lucide-react";
import { SectionShell } from "./shared";

/**
 * The problem, built from a supplied design handoff. The argument runs in
 * order: the claim, the Today bar as its summary, the three kinds of work
 * that fill it, the capacity block showing the ratio never improves, the
 * corrected bar, and the line that hands off to the solution.
 *
 * Tokens live on `.ed-problem` in globals.css, not here.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Time bars ─────────────────────────────────────────────
   Five segments. The four greys carry no labels: they are identified by
   the matching swatches on the pillar headings below, which is why the
   ramp tone and the swatch tone have to stay in step. */

type Segment = { flex: number; fill: string };

const TODAY_SEGMENTS: Segment[] = [
  { flex: 26, fill: "var(--pb-admin-1)" },
  { flex: 22, fill: "var(--pb-admin-2)" },
  { flex: 19, fill: "var(--pb-admin-3)" },
  { flex: 13, fill: "var(--pb-admin-4)" },
];

const SHOULD_SEGMENTS: Segment[] = [
  { flex: 7, fill: "var(--pb-admin-1)" },
  { flex: 6, fill: "var(--pb-admin-2)" },
  { flex: 4, fill: "var(--pb-admin-3)" },
  { flex: 3, fill: "var(--pb-admin-4)" },
];

function TimeBar({
  title, lede, eyebrow, eyebrowAccent = false,
  segments, coachingFlex, pct, pctSize, caption, ariaLabel,
}: {
  title: string;
  lede: string;
  eyebrow: string;
  eyebrowAccent?: boolean;
  segments: Segment[];
  coachingFlex: number;
  pct: string;
  pctSize: number;
  caption?: string;
  ariaLabel: string;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <span
            className="text-[19px] md:text-[22px]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--pb-text)",
            }}
          >
            {title}
          </span>
          <span className="text-[14px] md:text-[15px]" style={{ color: "var(--pb-muted)" }}>
            {lede}
          </span>
        </div>
        <span
          className="text-[10.5px] uppercase"
          style={{
            fontFamily: "var(--pb-mono)",
            letterSpacing: "0.14em",
            color: eyebrowAccent ? "var(--pb-accent-ink)" : "var(--pb-muted)",
          }}
        >
          {eyebrow}
        </span>
      </div>

      {/* The whole bar scales rather than each segment, which keeps the
          proportions exact and never re-lays-out the flex row. */}
      <motion.div
        role="img"
        aria-label={ariaLabel}
        className="flex w-full overflow-hidden"
        style={{
          height: "60px",
          borderRadius: "12px",
          border: "1px solid var(--pb-border)",
          transformOrigin: "left",
        }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {segments.map((s, i) => (
          <div key={i} style={{ flex: s.flex, backgroundColor: s.fill }} />
        ))}
        {/* At 390 the 20 percent segment is 68px wide, which cannot hold
            both the word and the figure. The figure is the part that
            carries the meaning, so the word steps aside below sm. */}
        <div
          className={`flex items-center gap-2 px-4 md:px-[18px] min-w-0 ${
            coachingFlex < 50 ? "justify-center sm:justify-between" : "justify-between"
          }`}
          style={{ flex: coachingFlex, backgroundColor: "var(--pb-accent)", color: "#FFFFFF" }}
        >
          <span
            className={`text-[12.5px] md:text-[13.5px] truncate ${
              coachingFlex < 50 ? "hidden sm:block" : ""
            }`}
            style={{ fontWeight: 600 }}
          >
            Coaching
          </span>
          <span
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 800,
              fontSize: `${pctSize}px`,
              letterSpacing: "-0.02em",
            }}
          >
            {pct}
          </span>
        </div>
      </motion.div>

      {caption && (
        <p className="text-[13px]" style={{ color: "var(--pb-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

/* ── Pillar detail cards ───────────────────────────────────
   The card shells and their contents carry over from the previous build,
   including the channel icons, the file-type icons and the amber/green
   status pills. The handoff prototype omits the icons for speed and says
   so; that omission is not a design decision. */

function DetailCard({ header, mono = false, children, footer }: {
  header: string;
  mono?: boolean;
  children: React.ReactNode;
  footer?: string;
}) {
  return (
    <div
      className="flex flex-1 flex-col gap-3 p-[22px]"
      style={{
        backgroundColor: "var(--pb-panel)",
        border: "1px solid var(--pb-border)",
        borderRadius: "16px",
        boxShadow: "var(--pb-shadow)",
      }}
    >
      <div
        className={mono ? "text-[12px]" : "text-[13px]"}
        style={{
          fontWeight: 700,
          color: "var(--pb-text)",
          ...(mono ? { fontFamily: "var(--pb-mono)", letterSpacing: "0.02em" } : null),
        }}
      >
        {header}
      </div>
      {children}
      {footer && (
        <div className="text-[12.5px]" style={{ color: "var(--pb-muted)" }}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* 01 Repetitive questions: several locations, several channels, one hour.
   The same refund question shows up twice on purpose; the rest are the
   ordinary traffic it arrives alongside. */
const INBOX_THREADS = [
  { store: "STORE #052", channel: "SMS",   icon: MessageSquare, tint: "#15803D", q: "Refund policy on a cancelled booking?" },
  { store: "STORE #118", channel: "SLACK", icon: Hash,          tint: "#611F69", q: "whats the refund rule for cancellations" },
  { store: "STORE #331", channel: "EMAIL", icon: Mail,          tint: "#0072CE", q: "Which report shows deposits?" },
  { store: "STORE #402", channel: "TEAMS", icon: MessageSquare, tint: "#5B5FC7", q: "New hire Monday, what do I send?" },
  { store: "STORE #214", channel: "SMS",   icon: MessageSquare, tint: "#15803D", q: "Approval needed for a local promo?" },
];

function QuestionsCard() {
  return (
    <DetailCard header="Monday, 8:41 to 9:06 am">
      <div className="flex flex-col gap-2.5">
        {INBOX_THREADS.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={`${t.store}-${i}`}
              className="px-3 py-2.5"
              style={{ backgroundColor: "var(--pb-chip)", borderRadius: "10px" }}
            >
              <div className="flex items-center gap-1.5">
                <Icon aria-hidden="true" className="h-3 w-3 flex-shrink-0" strokeWidth={2} style={{ color: t.tint }} />
                <span
                  className="text-[9.5px]"
                  style={{ fontFamily: "var(--pb-mono)", letterSpacing: "0.06em", color: "var(--pb-muted)" }}
                >
                  {t.store} · {t.channel}
                </span>
              </div>
              <div className="text-[13px] mt-[3px]" style={{ color: "var(--pb-text)" }}>
                {t.q}
              </div>
            </div>
          );
        })}
      </div>
    </DetailCard>
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

function ComplianceCard() {
  return (
    <DetailCard header="Compliance · West territory" mono footer="Every deadline runs on its own clock.">
      <div className="flex flex-col gap-[9px]">
        {CHASE_ROWS.map((r) => (
          <div key={r.store} className="flex items-center justify-between gap-2.5">
            <span className="text-[12.5px]" style={{ fontFamily: "var(--pb-mono)", color: "var(--pb-text)" }}>
              {r.store}
            </span>
            <span
              className="text-[11.5px] whitespace-nowrap px-[9px] py-1"
              style={{
                fontWeight: 700,
                borderRadius: "6px",
                color: r.overdue ? "var(--pb-warn)" : "var(--pb-ok)",
                backgroundColor: r.overdue ? "var(--pb-warn-soft)" : "var(--pb-ok-soft)",
              }}
            >
              {r.note}
            </span>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

/* 03 Report building: the by-hand reporting the week actually runs on. */
const REPORT_SCRAPS: { icon: React.ElementType; tint: string; title: string }[] = [
  { icon: FileSpreadsheet, tint: "#188038", title: "week-42-v7.xlsx" },
  { icon: FileSpreadsheet, tint: "#188038", title: "rollup-FINAL.xlsx" },
  { icon: BarChart3,       tint: "#0072CE", title: "Regional rollup" },
  { icon: Sparkles,        tint: "#10A37F", title: "ChatGPT analysis" },
  { icon: Mail,            tint: "#C5221F", title: "RE: RE: numbers" },
  { icon: MessageSquare,   tint: "#15803D", title: "resend the deck?" },
  { icon: LayoutDashboard, tint: "#7C3AED", title: "Ops dashboard" },
  { icon: FileSpreadsheet, tint: "#188038", title: "labour-hours.xlsx" },
  { icon: BarChart3,       tint: "#0072CE", title: "P&L chart" },
  { icon: Mail,            tint: "#C5221F", title: "FW: which version?" },
  { icon: FileSpreadsheet, tint: "#188038", title: "Q3-numbers-v3.xlsx" },
  { icon: MessageSquare,   tint: "#15803D", title: "sending mine over" },
];

function ReportsCard() {
  return (
    <DetailCard header="This week's numbers, by hand">
      <div className="grid grid-cols-2 gap-2" aria-hidden="true">
        {REPORT_SCRAPS.map((s, i) => {
          const Icon = s.icon;
          return (
            /* The chips wrap rather than truncate. The handoff's 12px label
               assumes no icon; restoring the icons, which the handoff asks
               for, costs 18px of the chip and the longest filenames no
               longer fit on one line at 1205. Wrapping keeps every label
               readable and the grid rows stay aligned to each other. */
            <span
              key={i}
              className="flex items-start gap-1.5 min-w-0 px-[11px] py-[9px]"
              style={{
                fontSize: "12px",
                lineHeight: 1.3,
                borderRadius: "9px",
                backgroundColor: "var(--pb-panel-2)",
                border: "1px solid var(--pb-border)",
                color: "var(--pb-text)",
              }}
            >
              <Icon aria-hidden="true" className="h-3 w-3 flex-shrink-0 mt-[2px]" strokeWidth={2} style={{ color: s.tint }} />
              <span className="min-w-0">{s.title}</span>
            </span>
          );
        })}
      </div>
      <p className="sr-only">
        Twelve separate pieces of hand-made reporting: several spreadsheet
        versions, two charts, a one-off ChatGPT analysis, two email threads,
        two text messages, and a dashboard.
      </p>
    </DetailCard>
  );
}

/* ── The three kinds of work ───────────────────────────────
   Swatch tone matches the bar segment it stands for, which is what lets
   the bar itself go unlabelled. */

const PILLARS = [
  {
    swatch: "var(--pb-admin-1)",
    title: "Repetitive questions",
    body: "Multiple repeat questions arrive from several locations before 9am, each one needing a personal reply.",
    card: <QuestionsCard />,
  },
  {
    swatch: "var(--pb-admin-2)",
    title: "Compliance chasing",
    body: "Insurance, P&L, training, and audit deadlines all run separately, and someone has to chase each one.",
    card: <ComplianceCard />,
  },
  {
    swatch: "var(--pb-admin-3)",
    title: "Report building",
    body: "The weekly numbers get rebuilt by hand from five systems, and everyone keeps their own version.",
    card: <ReportsCard />,
  },
];

/* ── Coaching capacity ─────────────────────────────────────
   Illustrative ratios, not measured figures: the point is that the coach
   count grows and the owners-per-coach number does not. On the coach's
   side throughout, so nothing here mentions cost or headcount spend. */

const CAPACITY = [
  { franchisees: 30,  coaches: 1,  caption: "One coach. Thirty owners.",      emphasis: false },
  { franchisees: 120, coaches: 4,  caption: "Four coaches. Still thirty each.", emphasis: false },
  { franchisees: 300, coaches: 10, caption: "Ten coaches. Still thirty each.",  emphasis: true  },
];

function CapacityCard({ item, reduceMotion }: {
  item: (typeof CAPACITY)[number]; reduceMotion: boolean;
}) {
  return (
    <div
      className="flex flex-1 flex-col gap-3 p-5"
      style={{
        borderRadius: "14px",
        backgroundColor: item.emphasis ? "var(--pb-accent-soft)" : "var(--pb-panel-2)",
        border: `1px solid ${item.emphasis ? "var(--pb-accent-soft2)" : "var(--pb-border)"}`,
      }}
    >
      <div
        className="text-[10px] uppercase"
        style={{ fontFamily: "var(--pb-mono)", letterSpacing: "0.12em", color: "var(--pb-muted)" }}
      >
        {item.franchisees} franchisees
      </div>

      <div className="flex items-baseline gap-2">
        <span
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 800,
            fontSize: "34px",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: item.emphasis ? "var(--pb-accent-ink)" : "var(--pb-text)",
          }}
        >
          {item.coaches}
        </span>
        <span className="text-[13px]" style={{ color: "var(--pb-muted)" }}>
          {item.coaches === 1 ? "coach" : "coaches"}
        </span>
      </div>

      {/* The multiplying squares are the argument: the count grows, the
          ratio behind it never does. */}
      <div className="flex flex-wrap gap-1 content-start" style={{ minHeight: "34px" }} aria-hidden="true">
        {Array.from({ length: item.coaches }, (_, i) => (
          <motion.span
            key={i}
            className="block"
            style={{
              width: "13px",
              height: "13px",
              borderRadius: "4px",
              backgroundColor: item.emphasis ? "var(--pb-accent)" : "var(--pb-admin-2)",
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, ease: EASE, delay: reduceMotion ? 0 : i * 0.03 }}
          />
        ))}
      </div>

      <div className="text-[12px]" style={{ color: "var(--pb-muted)", lineHeight: 1.45 }}>
        {item.caption}
      </div>
    </div>
  );
}

function CapacityBlock() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className="flex flex-col gap-8 p-7 md:p-10 lg:px-11 lg:py-10"
      style={{
        backgroundColor: "var(--pb-panel)",
        border: "1px solid var(--pb-border)",
        borderRadius: "20px",
        boxShadow: "var(--pb-shadow)",
      }}
    >
      <div className="flex flex-col gap-3.5">
        <div
          className="text-[10.5px] uppercase"
          style={{ fontFamily: "var(--pb-mono)", letterSpacing: "0.14em", color: "var(--pb-accent-ink)" }}
        >
          And the coaching that is left never gets deeper
        </div>
        <h3
          className="text-[24px] md:text-[28px] lg:text-[32px]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            letterSpacing: "-0.022em",
            lineHeight: 1.2,
            textWrap: "pretty",
            color: "var(--pb-text)",
          }}
        >
          Growth adds coaches. It never adds coaching.
        </h3>
        <p className="text-[15px] md:text-[16px] max-w-[620px]" style={{ color: "var(--pb-muted)", lineHeight: 1.6 }}>
          Add thirty more owners, add another coach. The team keeps growing.
          What any one franchisee actually gets, and how much of it is real
          coaching, never moves.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
          <span className="text-[13.5px]" style={{ fontWeight: 600, color: "var(--pb-text)" }}>
            As the network grows
          </span>
          <span className="text-[12.5px]" style={{ color: "var(--pb-muted)" }}>
            Same load on every coach. Same support for every owner.
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          {CAPACITY.map((c) => (
            <CapacityCard key={c.franchisees} item={c} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function CoachsWeek() {
  return (
    <SectionShell alt id="the-week">
      <div className="ed-problem flex flex-col gap-12 md:gap-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-[820px]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            /* 24px at 390 up to the spec's 46px. Below md the sentences
               wrap on their own and the hard break is dropped. */
            fontSize: "clamp(1.5rem, 0.585rem + 3.75vw, 2.875rem)",
            letterSpacing: "-0.028em",
            lineHeight: 1.1,
            textWrap: "pretty",
            color: "var(--pb-text)",
          }}
        >
          Coaching is meant to drive growth.
          <br className="hidden md:block" />{" "}
          But, everything else consumes it.
        </motion.h2>

        <TimeBar
          title="4/5 days"
          lede="go to admin work, not growth."
          eyebrow="A coach's week, today"
          segments={TODAY_SEGMENTS}
          coachingFlex={20}
          pct="20%"
          pctSize={17}
          caption="The three blocks below are what fills the other 80%."
          ariaLabel="Today: 20 percent coaching, 80 percent admin work."
        />

        {/* Three across from lg. At 768 a three-column grid left each card
            around 208px, which wrapped every question and status pill. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className="flex h-full flex-col gap-5"
            >
              {/* The floor holds all three cards to the same start line,
                  which is what makes the row read as one band. The handoff
                  says 104px; the longest description runs to three lines
                  from 1024 up and measures 105.4, so the floor is 106. */}
              <div className="flex flex-col gap-2 lg:min-h-[106px]">
                <div className="flex items-center gap-2.5">
                  <span
                    className="block flex-shrink-0"
                    style={{ width: "10px", height: "10px", borderRadius: "3px", backgroundColor: p.swatch }}
                  />
                  <h3
                    className="text-[18px] md:text-[20px]"
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      color: "var(--pb-text)",
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p className="text-[14.5px]" style={{ color: "var(--pb-muted)", lineHeight: 1.55 }}>
                  {p.body}
                </p>
              </div>
              {p.card}
            </motion.div>
          ))}
        </div>

        <CapacityBlock />

        <TimeBar
          title="What it should be"
          lede="the admin load carried by the system, not the coach."
          eyebrow="The same week, with EZee Assist"
          eyebrowAccent
          segments={SHOULD_SEGMENTS}
          coachingFlex={80}
          pct="80%"
          pctSize={19}
          ariaLabel="With EZee Assist: 80 percent coaching, 20 percent admin work."
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            /* 21px at 390 up to the spec's 38px. */
            fontSize: "clamp(1.3125rem, 0.6rem + 2.92vw, 2.375rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            textWrap: "pretty",
            color: "var(--pb-accent-ink)",
          }}
        >
          Reclaiming coaching time needs HQ
          <br className="hidden md:block" />{" "}
          to reclaim the operating system.
        </motion.p>
      </div>
    </SectionShell>
  );
}
