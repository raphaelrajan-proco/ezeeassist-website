"use client";

import { useEffect, useRef } from "react";
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
        className="flex w-full overflow-hidden"
        style={{
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

/* ── Coaching capacity ─────────────────────────────────────
   A two-scenario animated chart, rebuilt from the two-line handoff.
   Grey is Today: one coach per twenty locations, fifty by the end, and
   the impact line never rises. Blue is What it should be: one coach per
   forty locations, twenty-five by the end, impact rising linearly at
   exactly 10 degrees. Both draw concurrently; the divergence is the
   argument. Illustrative ratios, not measured figures.

   Kept against the handoff, all prior explicit rules: the 5600ms draw
   (1.25x speed-up), replay on every full exit and re-entry, the arrowed
   y-axis, "A small fraction of one coach", and the compact sub-section
   type scale. Do not steepen the blue line past 10 degrees or make it
   exponential, and never let the grey line move vertically. */

const CH_MIN = 20, CH_MAX = 1000;
/* Grey and blue coach ratios: locations per coach. */
const CH_RA = 20, CH_RB = 40;
const CH_X0 = 6, CH_X1 = 576;
/* Both lines start on this baseline; the blue one climbs off it. */
const CH_YBASE = 142;
const CH_RISE = Math.tan((10 * Math.PI) / 180) * (CH_X1 - CH_X0);
const CH_AXIS_Y = 176;
const CH_YAXIS_TOP = 24;
/* 1.25x the handoff's 7000, by request. */
const CH_DUR = 5600;
const CH_VIEW_W = 600, CH_VIEW_H = 190;

const chX = (loc: number) => CH_X0 + (CH_X1 - CH_X0) * ((loc - CH_MIN) / (CH_MAX - CH_MIN));
const chYBlue = (x: number) => CH_YBASE - ((x - CH_X0) / (CH_X1 - CH_X0)) * CH_RISE;

/** Stat label, styled like the section's other mono eyebrows. */
function ChartStatLabel({ children, accent = false, dim = false }: {
  children: React.ReactNode; accent?: boolean; dim?: boolean;
}) {
  return (
    <div
      className="text-[10.5px] uppercase"
      style={{
        fontFamily: "var(--pb-mono)", letterSpacing: "0.12em", lineHeight: 1.35,
        color: accent ? "var(--pb-accent-ink)" : "var(--pb-muted)",
        opacity: dim ? 0.85 : 1,
      }}
    >
      {children}
    </div>
  );
}

/** The dash swatch beside each scenario label; these replace a legend. */
function ScenarioLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" style={{ width: 16, height: 3, borderRadius: 2, background: color, flex: "none" }} />
      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--pb-text)" }}>{children}</span>
    </div>
  );
}

const CH_STAT_NUM: React.CSSProperties = {
  fontFamily: "var(--font-editorial)", fontWeight: 800,
  letterSpacing: "-0.03em", lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
};

function CapacityBlock() {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLDivElement>(null);
  const locARef = useRef<HTMLSpanElement>(null);
  const locBRef = useRef<HTMLSpanElement>(null);
  const coachARef = useRef<HTMLSpanElement>(null);
  const coachBRef = useRef<HTMLSpanElement>(null);
  const lineARef = useRef<SVGLineElement>(null);
  const headARef = useRef<SVGCircleElement>(null);
  const markersARef = useRef<SVGGElement>(null);
  const lineBRef = useRef<SVGLineElement>(null);
  const headBRef = useRef<SVGCircleElement>(null);
  const markersBRef = useRef<SVGGElement>(null);

  /* The whole run is imperative against refs, per the handoff: driving
     seventy-five markers and two per-frame counters through state would
     re-render the section at animation rate for no benefit. React owns
     the static chrome; this effect owns the numbers, lines, markers. */
  useEffect(() => {
    const root = rootRef.current,
      locA = locARef.current, locB = locBRef.current,
      coachA = coachARef.current, coachB = coachBRef.current,
      lineA = lineARef.current, headA = headARef.current, markersA = markersARef.current,
      lineB = lineBRef.current, headB = headBRef.current, markersB = markersBRef.current;
    if (!root || !locA || !locB || !coachA || !coachB || !lineA || !headA || !markersA || !lineB || !headB || !markersB) return;

    const mark = (group: SVGGElement, x: number, y: number, stroke: string) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", String(x));
      c.setAttribute("cy", String(y));
      c.setAttribute("r", "3.5");
      c.setAttribute("fill", "var(--pb-panel)");
      c.setAttribute("stroke", stroke);
      c.setAttribute("stroke-width", "1.6");
      group.appendChild(c);
    };

    /* Draw both lines to `loc` and drop any markers newly earned. */
    const paint = (loc: number, lastA: number, lastB: number): [number, number] => {
      const x = chX(loc);
      const ca = Math.ceil(loc / CH_RA);
      const cb = Math.ceil(loc / CH_RB);
      lineA.setAttribute("x2", String(x));
      headA.setAttribute("cx", String(x));
      lineB.setAttribute("x2", String(x));
      lineB.setAttribute("y2", String(chYBlue(x)));
      headB.setAttribute("cx", String(x));
      headB.setAttribute("cy", String(chYBlue(x)));
      const locText = loc.toLocaleString("en-US");
      locA.textContent = locText;
      locB.textContent = locText;
      if (ca !== lastA) {
        coachA.textContent = String(ca);
        for (let c = lastA + 1; c <= ca; c++) mark(markersA, chX(c * CH_RA), CH_YBASE, "var(--pb-muted)");
      }
      if (cb !== lastB) {
        coachB.textContent = String(cb);
        for (let c = lastB + 1; c <= cb; c++) {
          const mx = chX(c * CH_RB);
          mark(markersB, mx, chYBlue(mx), "var(--pb-accent-ink)");
        }
      }
      return [ca, cb];
    };

    /* Reduced motion paints the completed state and never animates. */
    if (reduceMotion) {
      paint(CH_MAX, 0, 0);
      return;
    }

    let raf = 0, start: number | null = null, lastA = 0, lastB = 0, flashTimer: ReturnType<typeof setTimeout>;

    const frame = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / CH_DUR, 1);
      const loc = Math.round(CH_MIN + (CH_MAX - CH_MIN) * p);
      const ca = Math.ceil(loc / CH_RA);
      if (ca !== lastA) {
        /* Only the grey number flashes: one flashing element is enough,
           and the grey hires are the ones the flat line indicts. */
        coachA.style.color = "var(--pb-accent-ink)";
        clearTimeout(flashTimer);
        flashTimer = setTimeout(() => { coachA.style.color = ""; }, 200);
      }
      [lastA, lastB] = paint(loc, lastA, lastB);
      /* Holds at the end state; nothing schedules after p reaches 1. A
         permanently looping chart beside body copy competes with
         reading, so the only way it moves again is leaving and coming
         back. */
      if (p < 1) raf = requestAnimationFrame(frame);
    };

    /* Wipe and run from the left edge. */
    const restart = () => {
      cancelAnimationFrame(raf);
      start = null;
      lastA = 0;
      lastB = 0;
      while (markersA.firstChild) markersA.removeChild(markersA.firstChild);
      while (markersB.firstChild) markersB.removeChild(markersB.firstChild);
      raf = requestAnimationFrame(frame);
    };

    /* Replays on every re-entry, by request: crossing 40% visibility
       starts a fresh run, but only after the section has fully left the
       viewport since the last one, so partial scrolls and the pinned
       neighbours above cannot retrigger it mid-read. */
    let away = true;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio >= 0.4 && away) {
          away = false;
          restart();
        } else if (!e.isIntersecting) {
          away = true;
          cancelAnimationFrame(raf);
        }
      });
    }, { threshold: [0, 0.4] });
    io.observe(root);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(flashTimer);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-5 p-6 md:p-7 lg:px-8 lg:py-7"
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
          className="text-[20px] md:text-[22px] lg:text-[24px]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            letterSpacing: "-0.022em",
            lineHeight: 1.2,
            textWrap: "pretty",
            color: "var(--pb-text)",
          }}
        >
          As locations scale, so does headcount.
          {/* Desktop only: forcing it on mobile orphans the second line. */}
          <br className="hidden md:inline" />{" "}
          But impact per location holds flat.
        </h3>
        <p className="text-[13.5px] md:text-[14.5px]" style={{ color: "var(--pb-muted)", lineHeight: 1.5 }}>
          You can hire more coaches. You can&rsquo;t hire more hours in their day.
        </p>
      </div>

      {/* The animated numbers would be noise frame by frame to a screen
          reader; the description below carries the meaning instead. */}
      <p className="sr-only">
        Two scenarios compared. Today, each location gets a small fraction
        of one coach and impact per location holds flat as coaches are
        added. What it should be: coaching multiplied past one coach&rsquo;s
        bandwidth, rising with half the headcount.
      </p>

      <div aria-hidden="true" className="flex flex-col gap-4">
        {/* Scenario one: Today. The dash swatches stand in for a legend;
            the labels sitting on their own stat rows is also what keeps
            the two lines distinguishable without colour. */}
        <div className="flex flex-col gap-2.5">
          <ScenarioLabel color="var(--pb-muted)">Today</ScenarioLabel>
          <div className="flex flex-wrap items-end gap-x-7 gap-y-3">
            <div className="flex flex-col gap-1.5">
              <ChartStatLabel>Locations</ChartStatLabel>
              <span className="text-[22px] md:text-[25px]" style={{ ...CH_STAT_NUM, color: "var(--pb-text)" }}>
                <span ref={locARef}>20</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <ChartStatLabel>Coaches</ChartStatLabel>
              <span className="text-[22px] md:text-[25px]" style={{ ...CH_STAT_NUM, transition: "color .15s", color: "var(--pb-text)" }}>
                <span ref={coachARef}>1</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-[240px]">
              <ChartStatLabel>What each location gets</ChartStatLabel>
              <span
                className="text-[16px] md:text-[18px]"
                style={{
                  fontFamily: "var(--font-editorial)", fontWeight: 700,
                  letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--pb-text)",
                }}
              >
                A small fraction of one coach
              </span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" style={{ height: 1, background: "var(--pb-border)" }} />

        {/* Scenario two: What it should be. All accent. */}
        <div className="flex flex-col gap-2.5">
          <ScenarioLabel color="var(--pb-accent-ink)">What it should be</ScenarioLabel>
          <div className="flex flex-wrap items-end gap-x-7 gap-y-3">
            <div className="flex flex-col gap-1.5">
              <ChartStatLabel accent dim>Locations</ChartStatLabel>
              <span className="text-[22px] md:text-[25px]" style={{ ...CH_STAT_NUM, color: "var(--pb-accent-ink)" }}>
                <span ref={locBRef}>20</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <ChartStatLabel accent dim>Coaches</ChartStatLabel>
              <span className="text-[22px] md:text-[25px]" style={{ ...CH_STAT_NUM, color: "var(--pb-accent-ink)" }}>
                <span ref={coachBRef}>1</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-[240px]">
              <ChartStatLabel accent dim>What each location gets</ChartStatLabel>
              <span
                className="text-[16px] md:text-[18px]"
                style={{
                  fontFamily: "var(--font-editorial)", fontWeight: 700,
                  letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--pb-accent-ink)",
                  textWrap: "pretty",
                }}
              >
                Coaching multiplied past one coach&rsquo;s bandwidth
              </span>
            </div>
          </div>
        </div>

        {/* Chart panel: the statement card's tint, since this panel now
            makes that card's argument. */}
        <div
          className="flex flex-col gap-1.5 p-4"
          style={{
            borderRadius: "14px",
            backgroundColor: "var(--pb-accent-soft)",
            border: "1px solid var(--pb-accent-soft2)",
          }}
        >
          <ChartStatLabel accent>Impact per location</ChartStatLabel>
          <svg
            viewBox={`0 0 ${CH_VIEW_W} ${CH_VIEW_H}`}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              <marker id="pb-chart-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0.5 0.5 L7.5 4 L0.5 7.5" fill="none" stroke="var(--pb-accent-soft2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            {/* Y rule: no ticks, no values. Drawn from the axis upward so
                the arrowhead marker points up. */}
            <line x1={CH_X0} y1={CH_AXIS_Y} x2={CH_X0} y2={CH_YAXIS_TOP} stroke="var(--pb-accent-soft2)" strokeWidth="1" markerEnd="url(#pb-chart-arrow)" />
            {/* X rule with the arrowhead. */}
            <line x1={CH_X0} y1={CH_AXIS_Y} x2={CH_X1 + 16} y2={CH_AXIS_Y} stroke="var(--pb-accent-soft2)" strokeWidth="1" markerEnd="url(#pb-chart-arrow)" />
            {/* Grey first, blue second, so blue sits on top where the
                two converge at the left edge. The grey line never moves
                vertically; the blue rises at exactly 10 degrees. */}
            <line ref={lineARef} x1={CH_X0} y1={CH_YBASE} x2={CH_X0} y2={CH_YBASE} stroke="var(--pb-muted)" strokeWidth="2" strokeLinecap="round" />
            <g ref={markersARef} />
            <circle ref={headARef} cx={CH_X0} cy={CH_YBASE} r="4.5" fill="var(--pb-muted)" />
            <line ref={lineBRef} x1={CH_X0} y1={CH_YBASE} x2={CH_X0} y2={CH_YBASE} stroke="var(--pb-accent-ink)" strokeWidth="2" strokeLinecap="round" />
            <g ref={markersBRef} />
            <circle ref={headBRef} cx={CH_X0} cy={CH_YBASE} r="4.5" fill="var(--pb-accent-ink)" />
          </svg>
          {/* Tight under the axis: the old panel left this floating far
              below the rule. */}
          <div
            className="text-center text-[12px]"
            style={{ color: "var(--pb-accent-ink)", marginTop: 2 }}
          >
            Increasing locations and coaches
          </div>
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

        <div className="-mt-4 md:-mt-6">
          <CapacityBlock />
        </div>

      </div>
    </SectionShell>
  );
}
