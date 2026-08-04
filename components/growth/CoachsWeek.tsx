"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
      {/* The header row spans the bar, so the eyebrow sits over the bar's
          right end. Now that the bar runs the full row, that is the
          margin, which is where it should be. */}
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
          className="text-[9.5px] uppercase"
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
          /* Full 48 thickness, running the whole row to the margin. The
             earlier 70% stop existed to mark the line the deleted
             uncapped bar blew through; with that bar gone there is
             nothing left for a short bar to point at. */
          width: "100%",
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

/* ── The coverage hexagon ──────────────────────────────────
   Six axes of personalised coaching, with a shape that stretches and
   contracts unevenly and never fills the ring. It replaced a single wide
   bar, which could only argue about volume; a radar can argue about
   *shape*, which is the actual point: a coach redistributes attention,
   they do not manufacture more of it.

   Three constraints carry the argument, and breaking any of them
   inverts it:

     1. Total area is constant across all twelve states. The shape
        redistributes, it never shrinks. A shrinking shape reads as a
        coach getting worse.
     2. No axis ever reaches the outer ring. The cap is 85%.
     3. Two or three axes are elevated at once, never one and never all
        six. Uneven is the whole idea.

   The values below are verified against all three (constant area to
   within 0.01%, peak exactly 85%). The handoff's own values missed two
   of its own rules: they peaked at 90% on "local market insight" and
   swung 62% in area. These are those values renormalised, so each
   state keeps its dominant axis and its character.

   Timing is deliberately irregular. Evenly spaced keyTimes read as
   mechanical; do not tidy them.

   SMIL rather than CSS, because `points` is not reliably animatable as
   a CSS property. SolutionBento already ships `animateMotion`, so there
   is no project policy against it. */

const HEX_AXES = [
  "Just-in-time guidance",
  "Tailored training",
  "Individual onboarding",
  "Local market insight",
  /* Positions 5 and 6 are the growth-driving pair and must stay
     adjacent, so they contract together when the shape spikes
     elsewhere. Do not reorder these. */
  "Performance reviews",
  "Situational coaching",
];

/* x, y and text-anchor per axis, at a label radius of ~112. */
const HEX_LABELS: { x: number; y: number; anchor: "middle" | "start" | "end" }[] = [
  { x: 280, y: 84,  anchor: "middle" },
  { x: 377, y: 144, anchor: "start" },
  { x: 377, y: 256, anchor: "start" },
  { x: 280, y: 324, anchor: "middle" },
  { x: 183, y: 256, anchor: "end" },
  { x: 183, y: 144, anchor: "end" },
];

const HEX_RINGS = [
  "280,177.5 299.5,188.75 299.5,211.25 280,222.5 260.5,211.25 260.5,188.75",
  "280,155 319,177.5 319,222.5 280,245 241,222.5 241,177.5",
  "280,132.5 338.5,166.25 338.5,233.75 280,267.5 221.5,233.75 221.5,166.25",
  "280,110 357.9,155 357.9,245 280,290 202.1,245 202.1,155",
];

/* Paths, not polygon points.
   The handoff specified `<animate attributeName="points">` on a polygon.
   Blink does not implement SMIL animation of `points` at all: a raw,
   hand-written SVG doing exactly that sits frozen in Chrome 150, with
   no error and the document timeline running normally. Shipping it as
   written would have given every Chrome user a static chart.
   Animating `d` on a path is the same shape, is supported, and keeps
   the whole approach inside SMIL as the handoff asked. Every value has
   an identical command sequence, which spline interpolation requires. */
const HEX_STATES = [
  "M 280.0,127.4 L 330.3,171.0 L 300.6,211.9 L 280.0,236.3 L 252.5,215.9 L 260.4,188.7 Z",
  "M 280.0,136.6 L 340.8,164.9 L 294.9,208.6 L 280.0,223.2 L 256.4,213.6 L 248.4,181.8 Z",
  "M 280.0,167.5 L 343.7,163.2 L 319.0,222.5 L 280.0,232.5 L 256.5,213.6 L 251.8,183.7 Z",
  "M 280.0,181.1 L 308.6,183.5 L 342.0,235.8 L 280.0,249.2 L 248.8,218.0 L 252.9,184.4 Z",
  "M 280.0,170.5 L 301.9,187.3 L 334.0,231.2 L 280.0,259.1 L 246.8,219.2 L 258.1,187.3 Z",
  "M 280.0,166.9 L 297.9,189.7 L 308.8,216.6 L 280.0,274.4 L 239.5,223.4 L 251.2,183.4 Z",
  "M 280.0,177.9 L 306.8,184.5 L 303.0,213.3 L 280.0,253.1 L 222.5,233.2 L 245.2,179.9 Z",
  "M 280.0,172.2 L 309.7,182.9 L 300.1,211.6 L 280.0,227.8 L 213.7,238.3 L 234.6,173.8 Z",
  "M 280.0,159.1 L 303.6,186.4 L 307.6,215.9 L 280.0,218.2 L 229.3,229.3 L 224.6,168.0 Z",
  "M 280.0,149.7 L 309.1,183.2 L 298.2,210.5 L 280.0,229.4 L 250.8,216.9 L 218.3,164.4 Z",
  "M 280.0,137.9 L 319.7,177.1 L 301.5,212.4 L 280.0,221.2 L 254.9,214.5 L 233.8,173.3 Z",
  /* Identical to the first, so the loop wraps with no visible jump. */
  "M 280.0,127.4 L 330.3,171.0 L 300.6,211.9 L 280.0,236.3 L 252.5,215.9 L 260.4,188.7 Z",
];

/* Full coverage: every axis at 97%. Not 100%, so the outer ring stays
   visible just outside the shape and reads as a frame the blue fills
   rather than a ring the blue replaces. */
const HEX_FULL =
  "M 280.0,112.7 L 355.6,156.4 L 355.6,243.6 L 280.0,287.3 L 204.4,243.6 L 204.4,156.4 Z";

const HEX_KEYTIMES = "0;0.09;0.16;0.27;0.34;0.44;0.52;0.63;0.70;0.81;0.88;1";
const HEX_KEYSPLINES = Array(HEX_STATES.length - 1).fill("0.4 0 0.5 1").join(";");

/** Rings, spokes and axis labels: identical under both shapes. */
function HexFrame({ id, title, desc, children }: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      /* The handoff specified `0 0 560 400`, but the drawing only spans
         y 72..327, so that canvas carried ~75px of dead space above and
         below and swallowed the 24px it also asked for between the
         heading and the chart. Cropping the canvas moves nothing: the
         centre, the radius, the rings and every label coordinate are
         exactly as specified. Bounds are measured with the larger phone
         labels, which reach highest. */
      viewBox="0 64 560 272"
      className="pb-hex block h-auto w-full"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{desc}</desc>

      <g aria-hidden="true">
        {HEX_RINGS.map((points) => (
          <polygon key={points} points={points} fill="none" stroke="var(--pb-border)" strokeWidth={1} />
        ))}
        {HEX_RINGS[HEX_RINGS.length - 1].split(" ").map((vertex) => (
          <line
            key={vertex}
            x1={280}
            y1={200}
            x2={Number(vertex.split(",")[0])}
            y2={Number(vertex.split(",")[1])}
            stroke="var(--pb-border)"
            strokeWidth={1}
          />
        ))}
      </g>

      {children}

      <g aria-hidden="true" fill="var(--pb-muted)">
        {HEX_AXES.map((axis, i) => (
          <text
            key={axis}
            x={HEX_LABELS[i].x}
            y={HEX_LABELS[i].y}
            textAnchor={HEX_LABELS[i].anchor}
            className="pb-hex-label"
          >
            {axis}
          </text>
        ))}
      </g>
    </svg>
  );
}

/** Thin rule and caption under each chart. */
function HexCaption({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid var(--pb-border-strong)" }} className="mt-1 pt-3">
      <span className="text-[15px]" style={{ fontWeight: 600, color: "var(--pb-text)" }}>
        {children}
      </span>
    </div>
  );
}

function CoverageHexagon() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<SVGAnimateElement>(null);
  /* False until the effect runs, so the server and the first client
     render agree and the static first state is what ships in the HTML. */
  const [animated, setAnimated] = useState(false);
  /* Drives the blue shape's one-time entrance, and stays true under
     reduced motion so the final state is what renders. */
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setReduced(true); setShown(true); return; }
    setAnimated(true);

    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          /* begin="indefinite" means nothing runs until this fires, so
             the chart is still on its first state above the fold. */
          animRef.current?.beginElement();
          setShown(true);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    /* Two charts, the restless one and the settled one. The comparison
       is the argument, so they sit side by side from lg up and stack
       below it, where a half-width chart would render its labels too
       small to read. */
    <div ref={wrapRef} className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
      <div className="w-full max-w-[560px]">
        <HexFrame
          id="pb-hex-today"
          title="Radar chart of personalized coaching coverage today, across six areas"
          desc="Coverage stretches and contracts unevenly across just-in-time guidance, tailored training, individual onboarding, local market insight, performance reviews, and situational coaching, but never fills all six at once."
        >
          <path
            d={HEX_STATES[0]}
            fill="var(--pb-muted)"
            fillOpacity={0.28}
            stroke="var(--pb-text)"
            strokeOpacity={0.55}
            strokeWidth={2.5}
            strokeLinejoin="round"
          >
            {animated && (
              <animate
                ref={animRef}
                attributeName="d"
                dur="27s"
                begin="indefinite"
                calcMode="spline"
                keyTimes={HEX_KEYTIMES}
                keySplines={HEX_KEYSPLINES}
                values={HEX_STATES.join(";")}
                repeatCount="indefinite"
              />
            )}
          </path>
        </HexFrame>
        <HexCaption>Today</HexCaption>
      </div>

      <div className="w-full max-w-[560px]">
        <HexFrame
          id="pb-hex-could"
          title="Radar chart of personalized coaching coverage with EZee Assist, across six areas"
          desc="Coverage reaches every area at once: just-in-time guidance, tailored training, individual onboarding, local market insight, performance reviews, and situational coaching."
        >
          {/* Steady and full, against the restless shape beside it. It
              does not morph: coverage that fluctuated would argue the
              opposite of the point. One entrance, then it holds. */}
          <path
            d={HEX_FULL}
            fill="var(--pb-accent)"
            fillOpacity={0.25}
            stroke="var(--pb-accent)"
            strokeWidth={2.5}
            strokeLinejoin="round"
            style={{
              transformBox: "view-box",
              transformOrigin: "280px 200px",
              transform: shown ? "scale(1)" : "scale(0.35)",
              opacity: shown ? 1 : 0,
              transition: reduced
                ? "none"
                : "transform .95s cubic-bezier(.22,1,.36,1), opacity .6s ease",
            }}
          />
        </HexFrame>
        <HexCaption>What it could be</HexCaption>
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
        {/* 24px to the chart, 26px from the chart to the closing line
            (24 plus the paragraph's own 2). */}
        <div className="flex flex-col gap-6">
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

          <CoverageHexagon />

          <p
            className="mt-0.5 text-[21px] md:text-[22px]"
            style={{ color: "var(--pb-muted)", lineHeight: 1.45, fontWeight: 400 }}
          >
            A coach&rsquo;s time is capped by the hours in a day. That cap is what
            limits coverage,
            {/* Desktop only, or the second line orphans on phones. */}
            <br className="hidden md:block" />{" "}
            and why headcount grows as the system grows.
          </p>
        </div>


      </div>
    </SectionShell>
  );
}
