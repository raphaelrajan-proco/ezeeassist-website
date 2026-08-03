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

/* Three greys, one per pillar below, so the bar and the caption agree:
   there were four, which made "the three blocks below" a miscount. The
   dropped fourth was redistributed across the remaining three in
   proportion, so each bar still splits 80/20 the way it did. */
const TODAY_SEGMENTS: Segment[] = [
  { flex: 31, fill: "var(--pb-admin-1)" },
  { flex: 26, fill: "var(--pb-admin-2)" },
  { flex: 23, fill: "var(--pb-admin-3)" },
];

const SHOULD_SEGMENTS: Segment[] = [
  { flex: 8, fill: "var(--pb-admin-1)" },
  { flex: 7, fill: "var(--pb-admin-2)" },
  { flex: 5, fill: "var(--pb-admin-3)" },
];

function TimeBar({
  title, eyebrow, segments, coachingFlex, pct, pctSize, ariaLabel,
}: {
  title: string;
  eyebrow: string;
  segments: Segment[];
  coachingFlex: number;
  pct: string;
  pctSize: number;
  ariaLabel: string;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="flex flex-col gap-3.5">
      {/* One uniform run rather than a bold figure plus a muted tail: the
          whole line is the claim. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
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
        <span
          className="text-[10.5px] uppercase"
          style={{ fontFamily: "var(--pb-mono)", letterSpacing: "0.14em", color: "var(--pb-muted)" }}
        >
          {eyebrow}
        </span>
      </div>

      {/* The whole bar scales rather than each segment, which keeps the
          proportions exact and never re-lays-out the flex row. */}
      <motion.div
        role="img"
        aria-label={ariaLabel}
        className="flex overflow-hidden"
        style={{
          /* Full 48 thickness, stopping at 70% of the row: the uncapped
             bar below runs to 100%, and its dashed threshold marks the
             line these two stop at. */
          width: "70%",
          height: "48px",
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
        {/* The flex item itself carries no padding, and the padding lives
            on the row inside it. `flex-basis: 0%` cannot shrink a box
            below its own padding, so padding here would sit on top of the
            item's share: the coaching segment drew 22.6% of the Today bar
            while its label read 20%. The greys have no padding, so only
            this one was affected. */}
        <div
          className="min-w-0"
          style={{ flex: coachingFlex, backgroundColor: "var(--pb-accent)", color: "#FFFFFF" }}
        >
          {/* At 390 the 20 percent segment is 68px wide, which cannot hold
              both the word and the figure. The figure is the part that
              carries the meaning, so the word steps aside below sm. */}
          <div
            className={`flex h-full w-full items-center gap-2 px-4 md:px-[18px] min-w-0 ${
              coachingFlex < 50 ? "justify-center sm:justify-between" : "justify-between"
            }`}
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
        </div>
      </motion.div>

    </div>
  );
}

/* ── The uncapped bar ──────────────────────────────────────
   The third bar: all coaching, running past the right edge. The dashed
   rule at 70% is the threshold it blows through, and the fade on the
   last stretch is the "keeps going" cue, so the bar reads as headed off
   the page rather than filling it. Mask, not gradient, so the fade
   follows the accent token in both themes. */

function CouldBeBar() {
  const reduceMotion = Boolean(useReducedMotion());
  const fade = "linear-gradient(to right, black 60%, rgba(0,0,0,.55) 80%, rgba(0,0,0,.18) 92%, transparent 100%)";
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span
          className="text-[19px] md:text-[22px]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--pb-text)",
          }}
        >
          What it could be
        </span>
        <span
          className="text-[10.5px] uppercase"
          style={{ fontFamily: "var(--pb-mono)", letterSpacing: "0.14em", color: "var(--pb-muted)" }}
        >
          The same coach, multiplied
        </span>
      </div>

      <div className="relative">
        <motion.div
          role="img"
          aria-label="What it could be: coaching runs past the cap instead of filling a fixed week."
          className="w-full"
          style={{ height: "48px", transformOrigin: "left" }}
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div
            className="flex h-full w-full items-center"
            style={{
              backgroundColor: "var(--pb-accent)",
              color: "#FFFFFF",
              /* Rounded where it starts, open where it leaves. */
              borderRadius: "12px 0 0 12px",
              WebkitMaskImage: fade,
              maskImage: fade,
            }}
          >
            <span className="px-4 md:px-[18px] text-[12.5px] md:text-[13.5px]" style={{ fontWeight: 600 }}>
              Coaching
            </span>
          </div>
        </motion.div>
        {/* The threshold the bar blows through, overhanging the bar so
            it reads as a line crossed rather than a segment divider. */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute", left: "70%", top: -8, bottom: -8, width: 0,
            borderLeft: "2px dashed var(--pb-border-strong)",
          }}
        />
      </div>
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
      <div className="flex-1 min-h-0">{children}</div>
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
      {/* This card is the tallest of the three, so its chip metrics set
          the whole row's height. Tightened from py-2.5 / gap-2.5, which
          drove the row to 401px. */}
      <div className="flex h-full flex-col justify-between gap-2">
        {INBOX_THREADS.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={`${t.store}-${i}`}
              className="px-3 py-[7px]"
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
              <div className="text-[12.5px] mt-[2px]" style={{ color: "var(--pb-text)", lineHeight: 1.3 }}>
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
/* The one clear location sits mid-list rather than last: parked at the
   end it read as a summary row, which is the opposite of the point. */
const CHASE_ROWS = [
  { store: "Store #331", note: "Insurance expires in 14 days", overdue: true },
  { store: "Store #118", note: "2 training modules outstanding", overdue: true },
  { store: "Store #402", note: "Audit docs not uploaded", overdue: true },
  { store: "Store #214", note: "All current", overdue: false },
  { store: "Store #087", note: "P&L not submitted", overdue: true },
  { store: "Store #263", note: "Food safety cert lapsed", overdue: true },
  { store: "Store #519", note: "Background checks pending", overdue: true },
];

function ComplianceCard() {
  return (
    <DetailCard header="Compliance · West territory" mono footer="Every deadline runs on its own clock.">
      <div className="flex h-full flex-col justify-between gap-[9px]">
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

/* Tilt and offset per index rather than at random, so the scatter is
   stable across renders and identical on the server and the client. */
const SCATTER = [
  { rot: -3.4, dx: -3, dy: 2 },
  { rot: 2.6,  dx: 6,  dy: -4 },
  { rot: 3.2,  dx: -6, dy: 5 },
  { rot: -2.2, dx: 4,  dy: -3 },
  { rot: 1.8,  dx: -5, dy: 4 },
  { rot: -3.8, dx: 7,  dy: -2 },
  { rot: 3.0,  dx: -2, dy: -5 },
  { rot: -1.8, dx: 5,  dy: 3 },
  { rot: 3.6,  dx: -7, dy: -3 },
  { rot: -2.8, dx: 2,  dy: 4 },
  { rot: 2.0,  dx: -4, dy: -4 },
  { rot: -3.2, dx: 6,  dy: 2 },
];

function ReportsCard() {
  return (
    <DetailCard header="This week's numbers, by hand">
      {/* Scattered rather than gridded: the point is that this pile has no
          order, and a tidy grid argues the opposite. Each scrap tilts and
          nudges by its index, and the row overlaps slightly through the
          negative margin, so it reads as a heap on a desk. */}
      <div className="flex h-full flex-wrap content-between gap-x-1.5 gap-y-1 py-0.5" aria-hidden="true">
        {REPORT_SCRAPS.map((sc, i) => {
          const Icon = sc.icon;
          const t = SCATTER[i % SCATTER.length];
          return (
            <span
              key={i}
              className="flex items-center gap-1.5 min-w-0 px-2 py-[7px]"
              style={{
                fontSize: "11px",
                lineHeight: 1.25,
                borderRadius: "8px",
                backgroundColor: "var(--pb-panel)",
                border: "1px solid var(--pb-border)",
                boxShadow: "0 4px 12px -6px rgba(12,20,36,.35)",
                color: "var(--pb-text)",
                transform: `translate(${t.dx}px, ${t.dy}px) rotate(${t.rot}deg)`,
              }}
            >
              <Icon aria-hidden="true" className="h-3 w-3 flex-shrink-0" strokeWidth={2} style={{ color: sc.tint }} />
              <span className="whitespace-nowrap">{sc.title}</span>
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
   Each title is underlined in the tone of the bar segment it stands for,
   which is what lets the bar itself go unlabelled. Tone and segment have
   to stay in step. */

const PILLARS = [
  {
    rule: "var(--pb-admin-1)",
    title: "Repetitive questions",
    body: "Multiple repeat questions arrive from several locations, each one needing a personal reply.",
    card: <QuestionsCard />,
  },
  {
    rule: "var(--pb-admin-2)",
    title: "Compliance chasing",
    body: "Insurance, P&L, training, and audit deadlines all run separately, and someone has to chase each one.",
    card: <ComplianceCard />,
  },
  {
    rule: "var(--pb-admin-3)",
    title: "Report building",
    body: "The weekly numbers get rebuilt by hand from five systems, and everyone keeps their own version.",
    card: <ReportsCard />,
  },
];

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
          But, the mechanical work consumes it.
        </motion.h2>

        {/* The two bars sit together, the claim and its correction, with
            no card around them: the comparison is the point and a box
            between them broke it. */}
        <div className="flex flex-col gap-6">
          <TimeBar
            title="Four days in five go to admin work, not growth"
            eyebrow="A coach's week, today"
            segments={TODAY_SEGMENTS}
            coachingFlex={20}
            pct="20%"
            pctSize={17}
            ariaLabel="Today: 20 percent coaching, 80 percent admin work."
          />
          <TimeBar
            title="What it should be"
            eyebrow="The same week"
            segments={SHOULD_SEGMENTS}
            coachingFlex={80}
            pct="80%"
            pctSize={19}
            ariaLabel="With EZee Assist: 80 percent coaching, 20 percent admin work."
          />
        </div>

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
                {/* The underline alone carries the tie back to the bar
                    segment. A solid dot sat beside it for a while and read
                    as decoration once the rule was the same tone. */}
                <h3
                  className="text-[18px] md:text-[20px]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    color: "var(--pb-text)",
                  }}
                >
                  <span
                    className="inline-block"
                    style={{ borderBottom: `3px solid ${p.rule}`, paddingBottom: 3 }}
                  >
                    {p.title}
                  </span>
                </h3>
                <p className="text-[14.5px]" style={{ color: "var(--pb-muted)", lineHeight: 1.55 }}>
                  {p.body}
                </p>
              </div>
              {p.card}
            </motion.div>
          ))}
        </div>

        {/* The hand-off from time to reach: even a freed-up week is one
            person's week. The section lead's own voice and size, wrapping
            to two lines where it must. */}
        <div className="flex flex-col gap-8">
          <motion.h3
            className="max-w-[900px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 0.585rem + 3.75vw, 2.875rem)",
              letterSpacing: "-0.028em",
              lineHeight: 1.1,
              textWrap: "pretty",
              color: "var(--pb-text)",
            }}
          >
            Even with the time freed up, one coach&rsquo;s expertise only reaches so far.
          </motion.h3>

          <CouldBeBar />

          <p
            className="-mt-2 text-[17.5px] md:text-[18.5px] max-w-[900px]"
            style={{ color: "var(--pb-muted)", lineHeight: 1.5, fontWeight: 600 }}
          >
            A coach&rsquo;s time is capped by the hours in a day. That cap is what
            limits coverage, and why headcount grows as the system grows.
          </p>
        </div>


      </div>
    </SectionShell>
  );
}
