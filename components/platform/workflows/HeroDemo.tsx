"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JAKARTA, MONO } from "@/components/platform/shared";
import { DEMO_PLAYS, STATE_COLOR } from "./data";

/**
 * The hero's "214 locations" demo, and the only animated component on
 * the page.
 *
 * It shows a sentence becoming a decision at 214 locations at once:
 * the coach's line types out, the counts appear, the tile field resolves,
 * and four callouts explain why four locations landed where they did.
 *
 * Three things are load-bearing:
 *
 * **The fill is seeded, not random.** Each play has its own seed so the
 * scatter is identical on every load. Random order would make the same
 * page look different to two people looking at it together, and the
 * scatter itself is the point: it must not read as a left-to-right
 * sweep, which would imply the locations are processed in sequence.
 *
 * **It starts on visibility, once.** An IntersectionObserver at 0.35, so
 * the animation is not already over by the time the section is scrolled
 * to, and never replays on scroll.
 *
 * **Reduced motion jumps straight to `done`.** No typing, no fill; the
 * finished state renders immediately. That is required, not optional.
 *
 * Tab switching skips typing: the sentence is already complete, only the
 * fill replays. Clicking the active tab does nothing.
 */

type Phase = "idle" | "typing" | "counts" | "filling" | "done";

const TYPE_MS = 16;
const PAUSE_MS = 160;
const FILL_MS = 1350;
const CONNECTOR_MIN = 520;

/** Mulberry32. Small, fast, and deterministic from one integer. */
function shuffled(n: number, seed: number) {
  const order = Array.from({ length: n }, (_, i) => i);
  let s = seed >>> 0;
  const rnd = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

const MONO_LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

export default function HeroDemo() {
  const [play, setPlay] = useState(0);
  const [typed, setTyped] = useState(0);
  const [filled, setFilled] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [wide, setWide] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const p = DEMO_PLAYS[play];
  const total = p.field.acted + p.field.adapted + p.field.escalated + p.field.none;

  /* The tile's state, resolved from its position in the seeded order. */
  const order = shuffled(total, p.seed);
  const kindAt = (rank: number) => {
    const { acted, adapted, escalated } = p.field;
    if (rank < acted) return "acted";
    if (rank < acted + adapted) return "adapted";
    if (rank < acted + adapted + escalated) return "escalated";
    return "none";
  };
  const rankOf = new Array<number>(total);
  order.forEach((tile, rank) => { rankOf[tile] = rank; });

  const runFill = useCallback(() => {
    setFilled(0);
    setPhase("filling");
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / FILL_MS);
      setFilled(Math.round(k * total));
      if (k < 1) requestAnimationFrame(step);
      else setPhase("done");
    };
    requestAnimationFrame(step);
  }, [total]);

  /* Start once, when the component is a third visible. */
  useEffect(() => {
    const el = root.current;
    if (!el || started.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      started.current = true;
      setTyped(p.sentence.length);
      setFilled(total);
      setPhase("done");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        setPhase("typing");
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
    // Runs once; the play the observer starts on is always the first.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Typing, then a beat, then the counts, then the fill. */
  useEffect(() => {
    if (phase !== "typing") return;
    const len = p.sentence.length;
    if (typed >= len) {
      const t = setTimeout(() => setPhase("counts"), PAUSE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [phase, typed, p.sentence.length]);

  useEffect(() => {
    if (phase !== "counts") return;
    const t = setTimeout(runFill, 220);
    return () => clearTimeout(t);
  }, [phase, runFill]);

  /* The connector row only makes sense with room for it. */
  useEffect(() => {
    const el = root.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setWide(e.contentRect.width >= CONNECTOR_MIN));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pick = (i: number) => {
    if (i === play) return;
    setPlay(i);
    setTyped(DEMO_PLAYS[i].sentence.length);
    if (started.current) runFill();
    else { setFilled(DEMO_PLAYS[i].field.acted + DEMO_PLAYS[i].field.adapted + DEMO_PLAYS[i].field.escalated + DEMO_PLAYS[i].field.none); setPhase("done"); }
  };

  const showCounts = phase === "counts" || phase === "filling" || phase === "done";
  const done = phase === "done";

  return (
    <div ref={root} className="flex flex-col">
      <div className="flex flex-wrap gap-2">
        {DEMO_PLAYS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={i === play}
            className="rounded-full transition-all duration-200"
            style={{
              ...MONO_LABEL, padding: "7px 11px",
              background: i === play ? "rgba(140,197,220,0.18)" : "transparent",
              border: `1px solid ${i === play ? "#8CC5DC" : "rgba(255,255,255,0.18)"}`,
              color: i === play ? "#FFFFFF" : "rgba(240,246,243,0.62)",
            }}
          >
            {d.name}
          </button>
        ))}
      </div>

      <span className="mb-2.5 mt-5 block" style={{ ...MONO_LABEL, color: "rgba(240,246,243,0.55)" }}>
        What the coach typed
      </span>

      <div
        className="rounded-xl px-4 py-3.5"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", minHeight: 84 }}
      >
        <p style={{ fontFamily: MONO, fontSize: 12.5, lineHeight: 1.65, color: "rgba(245,242,232,0.95)", whiteSpace: "pre-wrap" }}>
          {p.sentence.slice(0, typed)}
          {phase === "typing" && (
            <span className="ml-px inline-block align-middle" style={{ width: 7, height: 14, background: "#8CC5DC" }} aria-hidden="true" />
          )}
        </p>
      </div>

      <div
        className="mt-3.5 flex flex-wrap items-start gap-x-[18px] gap-y-3 transition-opacity duration-[400ms]"
        style={{ opacity: showCounts ? 1 : 0 }}
      >
        {p.counts.map(([n, label], i) => (
          <span key={label} className="flex flex-col gap-0.5">
            <span style={{ ...MONO_LABEL, color: "rgba(240,246,243,0.55)" }}>{label}</span>
            <span style={{ fontFamily: JAKARTA, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", color: i === 0 ? "#FFFFFF" : "#8CC5DC" }}>
              {n}
            </span>
            {i === 0 && <span style={{ ...MONO_LABEL, color: "rgba(240,246,243,0.55)" }}>Locations</span>}
          </span>
        ))}
      </div>

      <div
        className="mt-4 grid gap-[3px]"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(11px, 1fr))" }}
        role="img"
        aria-label={`${total} locations: ${p.counts.slice(1).map(([n, l]) => `${n} ${l.toLowerCase()}`).join(", ")}.`}
      >
        {Array.from({ length: total }, (_, i) => {
          const settled = rankOf[i] < filled;
          return (
            <span
              key={i}
              className="block rounded-[2px] transition-colors duration-[320ms]"
              style={{ aspectRatio: "1", background: settled ? STATE_COLOR[kindAt(rankOf[i])] : STATE_COLOR.undecided }}
            />
          );
        })}
      </div>

      {wide && (
        <div
          className="ed-demo-row mt-4 grid gap-2 transition-opacity duration-[400ms]"
          style={{ "--cols": p.callouts.length, opacity: done ? 1 : 0 } as React.CSSProperties}
          aria-hidden="true"
        >
          {p.callouts.map((c) => (
            <span key={c.store} className="flex flex-col items-center">
              <span className="h-[14px] w-[14px] rounded-[3px]" style={{ background: STATE_COLOR[c.kind] }} />
              <span className="h-[14px] w-px" style={{ background: "rgba(255,255,255,0.22)" }} />
            </span>
          ))}
        </div>
      )}

      <div
        className="ed-demo-row grid gap-2 transition-all duration-[450ms]"
        style={{
          "--cols": p.callouts.length,
          opacity: done ? 1 : 0,
          transform: done ? "translateY(0)" : "translateY(6px)",
          marginTop: wide ? 0 : 16,
        } as React.CSSProperties}
      >
        {p.callouts.map((c) => {
          const style =
            c.kind === "acted"     ? { background: "rgba(140,197,220,0.16)", border: "1px solid #8CC5DC" }
            : c.kind === "adapted" ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.55)" }
            : c.kind === "escalated" ? { background: "rgba(230,168,110,0.14)", border: "1px solid #E6A86E" }
            : { background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.30)" };
          return (
            <div key={c.store} className="flex flex-col gap-1 rounded-[9px] px-2.5 py-2.5" style={style}>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>{c.store}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.kind === "adapted" ? "#FFFFFF" : STATE_COLOR[c.kind] }}>
                {c.state}
              </span>
              <span style={{ fontSize: 12, lineHeight: 1.35, color: "rgba(240,246,243,0.78)" }}>{c.why}</span>
            </div>
          );
        })}
      </div>

      <p
        className="mt-4 max-w-[460px] transition-opacity duration-[450ms]"
        style={{ fontFamily: JAKARTA, fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.35, color: "#FFFFFF", opacity: done ? 1 : 0 }}
      >
        {p.closing}
      </p>
    </div>
  );
}
