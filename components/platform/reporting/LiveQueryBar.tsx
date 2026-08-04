"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * The hero's live query bar: a monospace question that types itself, then
 * the answer rendered underneath.
 *
 * The whole argument of this page is that the *shape* of the answer follows
 * the question, so the three states deliberately render three different
 * shapes — bars, then a line, then exception rows. Rendering all three as
 * bar charts would prove nothing, which is why the render is a discriminated
 * union rather than one chart component with a data prop.
 *
 * Sits on the hero photograph, so every colour here is the on-photograph
 * palette from DESIGN.md §4.4 (white body, #9FE0F8 accent) rather than the
 * page tokens, which assume a light or dark *page* surface, not an image.
 *
 * First paint is state 1 complete, not an empty bar. That serves three
 * things at once: no layout shift as the first characters land, a
 * meaningful server render, and the reduced-motion case for free — with
 * the effect disabled, what is already on screen is exactly the static
 * state the brief asks for.
 */

const ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const ON_IMAGE_DIM = "rgba(245,237,224,0.55)";
const RULE = "rgba(245,237,224,0.16)";
const WARN = "#F5B26B"; /* #B45309 is unreadable on the photograph. */

const TYPE_MS = 40;
const PAUSE_MS = 600;
const HOLD_MS = 3000;

type Render =
  | { kind: "bars"; rows: { label: string; pct: number; lead: boolean }[] }
  | { kind: "trend"; points: number[]; median: number }
  | { kind: "exceptions"; rows: { label: string; metric: string; delta: string }[] };

const STATES: { query: string; render: Render }[] = [
  {
    query: "rank my territory by attach rate",
    render: {
      kind: "bars",
      /* Descending, top three accent. Store numbers rather than "Location
         1-5": a real-looking identifier is the difference between a mock
         and a diagram. */
      rows: [
        { label: "Store #118", pct: 34, lead: true },
        { label: "Store #052", pct: 31, lead: true },
        { label: "Store #204", pct: 28, lead: true },
        { label: "Store #331", pct: 19, lead: false },
        { label: "Store #087", pct: 14, lead: false },
      ],
    },
  },
  {
    query: "show me that as a trend instead",
    /* Same territory, same six weeks, re-cut. The median sits behind as a
       dashed rule so the rise reads as a rise against something. */
    render: { kind: "trend", points: [18, 21, 20, 25, 27, 31], median: 23 },
  },
  {
    query: "just the ones behind plan",
    render: {
      kind: "exceptions",
      rows: [
        { label: "Store #331", metric: "booked", delta: "-18%" },
        { label: "Store #087", metric: "rebook", delta: "-12%" },
        { label: "Store #219", metric: "attach", delta: "-9%" },
      ],
    },
  },
];

const CAPTION = "12 locations · live from Mindbody · 1.4s";

/* Phases per state: type the query, pause on the finished question, hold
   the rendered answer, then clear and advance. */
type Phase = "typing" | "pause" | "hold";

export default function LiveQueryBar() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(STATES[0].query.length);
  /* Starts on `hold` so the state-1-complete server render is what the
     visitor sees first; the loop picks up from the end of its beat. */
  const [phase, setPhase] = useState<Phase>("hold");
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    const state = STATES[index];

    if (phase === "typing") {
      if (typed < state.query.length) {
        timer.current = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        timer.current = setTimeout(() => setPhase("pause"), 0);
      }
    } else if (phase === "pause") {
      timer.current = setTimeout(() => setPhase("hold"), PAUSE_MS);
    } else {
      timer.current = setTimeout(() => {
        setIndex((i) => (i + 1) % STATES.length);
        setTyped(0);
        setPhase("typing");
      }, HOLD_MS);
    }

    return () => clearTimeout(timer.current);
  }, [index, typed, phase, reduced]);

  const state = STATES[index];
  /* The outgoing answer stays on screen, dimmed, while the next question
     types, and is replaced the moment the new one lands. The brief's beat
     is "clear, next state", which literally read leaves a 168px box empty
     for the ~2.5s of typing and pause out of every ~5.5s cycle — half the
     loop showing nothing, which reads as broken rather than as waiting.
     Holding the previous render also argues the page's own point: the
     numbers do not change, the shape of the answer does. */
  const shown = reduced || phase === "hold" ? index : (index + STATES.length - 1) % STATES.length;
  const render = STATES[shown].render;
  const settled = reduced || phase === "hold";

  return (
    <div
      className="w-full max-w-[560px] overflow-hidden rounded-[14px]"
      style={{
        backgroundColor: "rgba(4,26,44,0.55)",
        border: `1px solid ${RULE}`,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* The question */}
      <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span aria-hidden="true" style={{ fontFamily: MONO, fontSize: 13, color: ACCENT, fontWeight: 600 }}>
          &gt;
        </span>
        <p
          className="min-w-0 flex-1 truncate"
          style={{ fontFamily: MONO, fontSize: 13, color: "#FFFFFF", lineHeight: 1.4 }}
        >
          {state.query.slice(0, typed)}
          {!reduced && (
            <span
              aria-hidden="true"
              className="ed-caret ml-0.5 inline-block"
              style={{ width: 7, height: "1.05em", backgroundColor: ACCENT, verticalAlign: "-0.18em" }}
            />
          )}
        </p>
      </div>

      {/* The answer */}
      <div className="px-4 pb-3.5 pt-4" style={{ minHeight: 168 }}>
        <div style={{ opacity: settled ? 1 : 0.34, transition: reduced ? "none" : "opacity .3s ease" }}>
          {render.kind === "bars" && <Bars rows={render.rows} />}
          {render.kind === "trend" && <Trend points={render.points} median={render.median} />}
          {render.kind === "exceptions" && <Exceptions rows={render.rows} />}
        </div>
      </div>

      <div className="px-4 pb-3.5">
        <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.06em", color: ON_IMAGE_DIM }}>
          {CAPTION}
        </span>
      </div>
    </div>
  );
}

/* ── The three shapes ─────────────────────────────────────── */

function Bars({ rows }: { rows: { label: string; pct: number; lead: boolean }[] }) {
  const max = Math.max(...rows.map((r) => r.pct));
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <span
            className="flex-none"
            style={{ fontFamily: MONO, fontSize: 11, color: ON_IMAGE_DIM, width: 74, fontVariantNumeric: "tabular-nums" }}
          >
            {r.label}
          </span>
          <span className="h-[9px] flex-1 overflow-hidden rounded-full" style={{ backgroundColor: "rgba(245,237,224,0.10)" }}>
            <span
              className="block h-full rounded-full"
              style={{
                width: `${(r.pct / max) * 100}%`,
                backgroundColor: r.lead ? ACCENT : "rgba(245,237,224,0.32)",
              }}
            />
          </span>
          <span
            className="flex-none text-right"
            style={{ fontFamily: MONO, fontSize: 11, width: 32, color: r.lead ? ACCENT : ON_IMAGE_DIM, fontVariantNumeric: "tabular-nums" }}
          >
            {r.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

function Trend({ points, median }: { points: number[]; median: number }) {
  /* Plotted in a 0-100 x 0-40 box so the stroke widths below read the same
     regardless of how wide the bar renders. */
  const W = 100;
  const H = 40;
  const lo = Math.min(...points, median) - 3;
  const hi = Math.max(...points, median) + 3;
  const x = (i: number) => (i / (points.length - 1)) * W;
  const y = (v: number) => H - ((v - lo) / (hi - lo)) * H;
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ");
  const my = y(median).toFixed(2);

  return (
    <div className="flex flex-col gap-2.5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-[104px] w-full"
        role="img"
        aria-labelledby="lqb-trend-t lqb-trend-d"
      >
        <title id="lqb-trend-t">Attach rate trend</title>
        <desc id="lqb-trend-d">
          Six weeks of attach rate rising from 18 to 31 percent, against a median of 23 percent.
        </desc>
        <line x1="0" y1={my} x2={W} y2={my} stroke="rgba(245,237,224,0.30)" strokeWidth="0.6" strokeDasharray="3 2.5" vectorEffect="non-scaling-stroke" />
        <path d={d} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: MONO, fontSize: 10.5, color: ON_IMAGE_DIM }}>6 weeks</span>
        <span style={{ fontFamily: MONO, fontSize: 10.5, color: ON_IMAGE_DIM }}>median {median}%</span>
      </div>
    </div>
  );
}

function Exceptions({ rows }: { rows: { label: string; metric: string; delta: string }[] }) {
  return (
    <div className="flex flex-col">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="flex items-center justify-between gap-3 py-3"
          style={{ borderTop: i === 0 ? "none" : `1px solid ${RULE}` }}
        >
          <span style={{ fontFamily: MONO, fontSize: 11.5, color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>
            {r.label}
          </span>
          <span className="flex items-center gap-3">
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: ON_IMAGE_DIM, letterSpacing: "0.08em" }}>
              {r.metric.toUpperCase()}
            </span>
            {/* Colour is not the only signal: the sign carries it too, which
                is what keeps this readable in greyscale. */}
            <span
              className="rounded px-1.5 py-0.5"
              style={{
                fontFamily: MONO, fontSize: 11.5, fontWeight: 600, color: WARN,
                backgroundColor: "rgba(245,178,107,0.12)", fontVariantNumeric: "tabular-nums",
              }}
            >
              {r.delta}
            </span>
          </span>
        </div>
      ))}
      <p className="mt-3 text-[12px]" style={{ color: ON_IMAGE }}>
        3 of 12 behind plan.
      </p>
    </div>
  );
}
