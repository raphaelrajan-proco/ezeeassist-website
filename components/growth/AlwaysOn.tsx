"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The always-on wall, built from a supplied design handoff. Fifteen
 * moments from one day across the network in four time bands, with a
 * live counter beneath. Fifteen cards say "here are examples"; the
 * counter says "this is the floor, not the ceiling."
 *
 * Tokens live on `.ed-wall` in globals.css, not here.
 */

const MONO = "var(--wl-mono)";
const JAKARTA = "var(--font-editorial)";
const EASE_OUT = "cubic-bezier(.2,.8,.2,1)";

/* ── Icons ─────────────────────────────────────────────────
   The icons carry trigger type at a glance. Someone scanning without
   reading should see several different *kinds* of thing happening, which
   is what stops the wall reading as a monitoring dashboard. Do not
   collapse them to one generic bullet. */

const ICONS = {
  moon:      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />,
  package:   <><path d="M21 8.5 12 4 3 8.5v7L12 20l9-4.5z" /><path d="M3 8.5 12 13l9-4.5M12 13v7" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2.5" /><path d="M9 4.5h6a1 1 0 0 1 1 1V7H8V5.5a1 1 0 0 1 1-1zM9 12h6M9 16h4" /></>,
  sunrise:   <path d="M4 18h16M6.5 18a5.5 5.5 0 0 1 11 0M12 4v3M5.6 7.6l2 2M18.4 7.6l-2 2M2.5 14h2M19.5 14h2" />,
  people:    <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9.5" r="2.2" /><path d="M15.4 15.2A4.4 4.4 0 0 1 21 19" /></>,
  personAdd: <><circle cx="10" cy="8" r="3.2" /><path d="M4 19a6 6 0 0 1 12 0M18 8v6M21 11h-6" /></>,
  message:   <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" />,
  document:  <><path d="M14 3.5H7.5A2.5 2.5 0 0 0 5 6v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V8.5z" /><path d="M14 3.5V8h5M8.5 13h7M8.5 16.5h4" /></>,
  star:      <path d="m12 3.8 2.6 5.2 5.8.8-4.2 4 1 5.7-5.2-2.7-5.2 2.7 1-5.7-4.2-4 5.8-.8z" />,
  storefront:<path d="M4 9.5 5.5 5h13L20 9.5M4 9.5h16M4 9.5V20h16V9.5M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />,
  tools:     <path d="M15.5 4.5a4.5 4.5 0 0 0-6 5.9L4 15.9V20h4.1l5.5-5.5a4.5 4.5 0 0 0 5.9-6l-2.9 2.9-2.1-2.1z" />,
  check:     <path d="m4.5 12.5 5 5 10-11" />,
  calendar:  <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3.5v3M16 3.5v3" /></>,
  trend:     <><path d="M4 16.5 9.5 11l3.5 3.5L20 7.5" /><path d="M15.5 7.5H20V12" /></>,
  folder:    <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h3.2l2 2.5h7.8a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2z" />,
} as const;

type IconName = keyof typeof ICONS;

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ flex: "none" }}
    >
      {ICONS[name]}
    </svg>
  );
}

/* ── The fifteen moments ───────────────────────────────────
   TODO: replace with real log moments before launch. The handoff is
   explicit that invented moments read as invented to a franchisor, and
   that the timestamps matter most: 9:14am is credible where 9:00am is
   not. Keep the four bands and the mix of trigger types, swap the
   specifics.

   `tone` is not decoration, it is the argument:
     neutral  the system detected something and handled it
     accent   an automated play drawing on what the network learned
     violet   the only franchisee-authored moment on the wall
   Do not tint more cards than this. */

type Tone = "neutral" | "accent" | "violet";
type Card = { icon: IconName; meta: string; title: string; body: string; tone: Tone; thread?: "a" | "b" };

const BANDS: { title: string; note?: string; cards: Card[] }[] = [
  {
    title: "Overnight",
    note: "while nobody is awake",
    cards: [
      { icon: "moon",      meta: "2:04am · all locations", title: "Closing photos scored", body: "9 stations flagged, tasks opened", tone: "neutral" },
      { icon: "package",   meta: "3:40am · Store #519",    title: "Inventory hit critical", body: "Reorder drafted at approved pricing", tone: "neutral" },
      { icon: "clipboard", meta: "4:00am · West territory", title: "Coach brief assembled", body: "12 locations, ranked by need", tone: "neutral" },
    ],
  },
  {
    title: "Before the doors open",
    cards: [
      { icon: "sunrise",   meta: "6:00am · Store #331", title: "Soft week detected",    body: "62% booked · reactivation draft ready", tone: "accent", thread: "a" },
      { icon: "people",    meta: "6:30am · Store #052", title: "Attach rate slipping",  body: "Top-quartile locations run a 30 second add-on script. Here it is.", tone: "accent" },
      { icon: "personAdd", meta: "7:00am · Store #402", title: "New hire starts today", body: "Day-one sequence started", tone: "neutral" },
    ],
  },
  {
    title: "During the day",
    cards: [
      { icon: "message",    meta: "9:14am · Store #118",  title: "Promo question answered",          body: "Cited from the promo guide in 6 seconds", tone: "neutral" },
      { icon: "document",   meta: "10:05am · Store #214", title: "Started a national retail proposal", body: "4 locations have quoted this. Range, terms, and win rate attached.", tone: "accent" },
      { icon: "star",       meta: "11:40am · Store #263", title: "One-star review posted",           body: "Response drafted, held for owner", tone: "neutral" },
      { icon: "storefront", meta: "12:30pm · Store #087", title: "Competitor opened nearby",         body: "6 locations faced this. What held revenue, and what didn't.", tone: "accent" },
      /* The same closing audit the on demand section shows being built.
         Deliberate continuity across sections, not duplication. */
      { icon: "tools",      meta: "3:45pm · Store #214",  title: "An owner built a closing audit",   body: "Photo checklist per station. Live in twenty minutes, no developer.", tone: "violet" },
      { icon: "check",      meta: "6:50pm · Store #331",  title: "Offer approved by owner",          body: "The 6:00am draft · sent to 340 lapsed clients", tone: "accent", thread: "b" },
    ],
  },
  {
    title: "On a longer clock",
    cards: [
      { icon: "calendar", meta: "14 days out · Store #263",  title: "Insurance lapsing", body: "Owner notified, task opened", tone: "neutral" },
      { icon: "trend",    meta: "Week 6 · Store #402",       title: "Ramp behind cohort", body: "What the fastest 10 openings did in week 6, in order", tone: "accent" },
      { icon: "folder",   meta: "Quarter close · 5 stores",  title: "Audit docs missing", body: "Chased nightly until filed", tone: "neutral" },
    ],
  },
];

const TONE: Record<Tone, { bg: string; border: string; meta: string; shadow?: string }> = {
  neutral: { bg: "var(--wl-panel)",       border: "var(--wl-border)",       meta: "var(--wl-muted)",  shadow: "var(--wl-shadow)" },
  accent:  { bg: "var(--wl-accent-soft)", border: "var(--wl-accent-soft2)", meta: "var(--wl-accent)" },
  violet:  { bg: "var(--wl-violet-soft)", border: "var(--wl-violet-soft2)", meta: "var(--wl-violet)" },
};

/* TODO: wire to the real count of yesterday's moments. This is the one
   fabricated figure on the page, and the drift makes it look live. Fetch
   on mount and keep the drift as the visual layer, or drop the drift. */
const COUNT_TARGET = 1847;

/* ── Reveal ────────────────────────────────────────────────
   One observer, unobserving each band on first intersection. Reveal is
   tracked with functional setState: bands crossing in separate callbacks
   before a commit would otherwise clobber each other, and since the
   observer never re-fires for an element that already intersected, those
   cards would stay invisible forever. */

function useBandReveal(count: number) {
  const [revealed, setRevealed] = useState<boolean[]>(() => Array(count).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setRevealed(Array(count).fill(true));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = refs.current.indexOf(e.target as HTMLDivElement);
        if (i < 0) return;
        io.unobserve(e.target);
        setRevealed((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
      });
    }, { threshold: 0.18 });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);

  return { revealed, refs };
}

/* ── Counter ───────────────────────────────────────────────
   Counts up on 40% visibility, then drifts indefinitely. Reduced motion
   lands on the final value with no count and no drift. */

function useCounter(target: number) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setValue(target); return; }

    const el = ref.current;
    if (!el) return;
    let tick: ReturnType<typeof setInterval>, drift: ReturnType<typeof setTimeout>, started = false;

    const scheduleDrift = () => {
      drift = setTimeout(() => {
        setValue((v) => v + (Math.random() < 0.72 ? 1 : 2));
        scheduleDrift();
      }, 900 + Math.random() * 9000);
    };

    /* setInterval, not requestAnimationFrame. rAF is paused outright in a
       background tab, which strands the count part-way; an interval is
       only throttled. Progress is read from the clock either way, so the
       easing is correct whatever the callback rate turns out to be. */
    const run = () => {
      const t0 = performance.now();
      tick = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / 1300);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p >= 1) { clearInterval(tick); scheduleDrift(); }
      }, 32);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !started) { started = true; io.disconnect(); run(); } });
    }, { threshold: 0.4 });
    io.observe(el);

    return () => { io.disconnect(); clearInterval(tick); clearTimeout(drift); };
  }, [target]);

  return { value, ref };
}

/* ── The #331 thread ───────────────────────────────────────
   Two segments measured from the live DOM: anchor A down to anchor B,
   then B down to the counter, so the thread carries through the last
   band and terminates at the volume statement.

   Measurement runs on rAF after mount, on resize, and on a short
   repeating timer for the first ~6s, because fonts and images shift
   layout after paint. It is deliberately not gated on the band
   observers: a thread that only measures once the bands fire would be
   wrong for anyone who lands mid-section. */

function useThread(enabled: boolean) {
  const wallRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [d, setD] = useState<string | null>(null);

  const measure = useCallback(() => {
    const wall = wallRef.current, a = aRef.current, b = bRef.current, c = counterRef.current;
    if (!wall || !a || !b) return;
    const w = wall.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const x1 = ra.left - w.left + ra.width / 2, y1 = ra.bottom - w.top;
    const x2 = rb.left - w.left + rb.width / 2, y2 = rb.top - w.top;
    const midY = (y1 + y2) / 2;
    let next = `M${x1} ${y1} C ${x1} ${midY + 40}, ${x2} ${midY - 40}, ${x2} ${y2}`;
    if (c) {
      const rc = c.getBoundingClientRect();
      const y3 = rb.bottom - w.top;
      const y4 = rc.top - w.top - 12;
      const x4 = rc.left - w.left + rc.width * 0.16;
      const midY2 = (y3 + y4) / 2;
      next += ` M${x2} ${y3} C ${x2} ${midY2 + 60}, ${x4} ${midY2 - 20}, ${x4} ${y4}`;
    }
    setD((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    if (!enabled) { setD(null); return; }
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    const iv = setInterval(measure, 900);
    const stop = setTimeout(() => clearInterval(iv), 6000);
    return () => {
      cancelAnimationFrame(raf); window.removeEventListener("resize", measure);
      clearInterval(iv); clearTimeout(stop);
    };
  }, [enabled, measure]);

  return { wallRef, aRef, bRef, counterRef, d };
}

/** The thread is dropped below lg rather than redrawn vertically. */
function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

/* ── Section ───────────────────────────────────────────── */

export default function AlwaysOn() {
  const { revealed, refs } = useBandReveal(BANDS.length);
  const isDesktop = useIsDesktop();
  const { wallRef, aRef, bRef, counterRef, d } = useThread(isDesktop);
  const { value, ref: counterVisRef } = useCounter(COUNT_TARGET);

  return (
    <section id="always-on" className="ed-wall w-full scroll-mt-24 ed-bg-alt">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-16 md:py-24 flex flex-col gap-10 md:gap-11">
        {/* Header */}
        <div className="flex flex-col gap-3.5 max-w-[900px]">
          <div
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, letterSpacing: ".18em", color: "var(--wl-muted)" }}
          >
            Always on
          </div>
          <h2
            style={{
              fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.028em", lineHeight: 1.1,
              color: "var(--wl-text)",
              /* Two lines from lg, wrapping naturally below. Tops out at
                 the spec's 44px. */
              fontSize: "clamp(1.5rem, 0.6rem + 2.8vw, 2.75rem)",
            }}
          >
            Your best coach, at every location, at the hour it matters.
          </h2>
          <p className="text-[15px] md:text-[16.5px] max-w-[760px]" style={{ lineHeight: 1.6, color: "var(--wl-muted)" }}>
            Nobody pulled any of this. Each one started as a play built once,
            and some of them draw on what the rest of your network already
            learned.
          </p>
          <div className="flex flex-wrap gap-x-[22px] gap-y-2 pt-1">
            {[
              { label: "Detected in your data", dot: "var(--wl-muted)", dim: true },
              { label: "Automated play, drawing on your network", dot: "var(--wl-accent)" },
              { label: "Built by an owner", dot: "var(--wl-violet)" },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--wl-muted)" }}>
                <span
                  aria-hidden="true"
                  style={{ width: 9, height: 9, borderRadius: "50%", background: l.dot, opacity: l.dim ? 0.6 : 1, flex: "none" }}
                />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Wall */}
        <div ref={wallRef} className="relative flex flex-col gap-10">
          {/* The thread passes behind every card and the counter, both of
              which are z-index 2. Without the counter's z-index the
              overflowing SVG paints over it. */}
          {d && (
            <>
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible", zIndex: 1 }}
              >
                <path
                  className="ed-wl-thread"
                  d={d} fill="none" stroke="var(--wl-accent-soft2)" strokeWidth="1.6" strokeLinecap="round"
                  strokeDasharray="3000"
                  style={{ animation: "ed-wl-thread-draw 1.3s cubic-bezier(.3,.8,.3,1) both" }}
                />
              </svg>
              <span
                aria-hidden="true"
                className="ed-wl-dot"
                style={{
                  position: "absolute", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%",
                  background: "var(--wl-accent)", boxShadow: "0 0 14px 3px var(--wl-accent-soft2)", zIndex: 1,
                  offsetPath: `path('${d}')`,
                  animation: "ed-wl-thread-run 6.4s linear infinite .9s",
                }}
              />
            </>
          )}

          {BANDS.map((band, bi) => (
            <div
              key={band.title}
              ref={(el) => { refs.current[bi] = el; }}
              className="relative"
            >
              <div className="flex items-center gap-4 pb-[18px]">
                <span style={{ fontFamily: JAKARTA, fontSize: 19, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--wl-text)" }}>
                  {band.title}
                </span>
                {band.note && (
                  <span className="text-[13.5px] hidden sm:inline" style={{ color: "var(--wl-muted)" }}>{band.note}</span>
                )}
                <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--wl-rule)" }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {band.cards.map((c, ci) => {
                  const t = TONE[c.tone];
                  return (
                    <div
                      key={c.title}
                      ref={c.thread === "a" ? aRef : c.thread === "b" ? bRef : undefined}
                      className="relative flex flex-col gap-[9px] p-5"
                      style={{
                        zIndex: 2,
                        background: t.bg,
                        border: `1px solid ${t.border}`,
                        borderRadius: 16,
                        boxShadow: t.shadow,
                        /* Set directly rather than gated with
                           `animation-play-state: inherit`, which is not
                           inherited by default and needs the explicit
                           keyword on every level in between. */
                        opacity: revealed[bi] ? 1 : 0,
                        transform: revealed[bi] ? "translateY(0)" : "translateY(16px)",
                        transition: `opacity .5s ${EASE_OUT} ${ci * 70}ms, transform .5s ${EASE_OUT} ${ci * 70}ms`,
                      }}
                    >
                      <div className="flex items-center gap-[9px]" style={{ color: t.meta }}>
                        <Icon name={c.icon} />
                        <span style={{ fontFamily: MONO, fontSize: 12 }}>{c.meta}</span>
                      </div>
                      <div style={{ fontFamily: JAKARTA, fontSize: 17, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--wl-text)" }}>
                        {c.title}
                      </div>
                      <div className="text-[14px]" style={{ lineHeight: 1.5, color: "var(--wl-muted)" }}>
                        {c.body}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div
          ref={(el) => { counterRef.current = el; counterVisRef.current = el; }}
          className="relative grid grid-cols-1 md:grid-cols-[minmax(0,380px)_1fr] gap-8 md:gap-11 items-center p-7 md:px-[38px] md:py-[34px]"
          style={{
            zIndex: 2,
            background: "var(--wl-panel-2)",
            border: "1px solid var(--wl-border)",
            borderRadius: 20,
          }}
        >
          <div className="flex flex-col gap-1.5">
            <div
              className="text-[44px] md:text-[62px]"
              style={{
                fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
                fontVariantNumeric: "tabular-nums", color: "var(--wl-text)",
              }}
            >
              {value.toLocaleString()}
            </div>
            <div className="text-[14.5px]" style={{ color: "var(--wl-muted)" }}>
              more moments across the network yesterday
            </div>
          </div>
          <div
            className="text-[15px] md:text-[17px] md:border-l md:pl-11 max-w-[660px]"
            style={{ lineHeight: 1.6, color: "var(--wl-text)", borderColor: "var(--wl-border)", textWrap: "pretty" }}
          >
            None needed a coach to be awake. And what any one location learns,
            every location gets, anonymized, aggregated, and approved by you.
          </div>
        </div>
      </div>
    </section>
  );
}
