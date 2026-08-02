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

/* Static by request: the animated count-up plus drift depended on an
   IntersectionObserver that missed its element when the layout swapped
   from stacked to pinned on mount, so it sat at 0. One honest number
   until the real count is wired.
   TODO: wire to the real count of the last 24 hours. */
const COUNT = 1834;

/* ── Step control ──────────────────────────────────────────
   The section pins for the length of its scroll track and the page's own
   scroll position picks the active band, so nothing hijacks the wheel:
   scrolling behaves exactly as it does everywhere else on the page, and
   the container simply holds still while it happens. The arrow jumps to
   the next band's scroll offset, so clicking and scrolling drive one
   shared piece of state rather than two.

   STEP_VH is the scroll distance per band. Lower feels twitchy, higher
   makes the section feel stuck. */
const STEP_VH = 65;

function useStepper(count: number, enabled: boolean) {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  /* Scroll offset that puts band `i` on screen. Also what the arrow
     scrolls to, which is what keeps click and scroll in agreement. */
  const offsetFor = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const track = el.offsetHeight - window.innerHeight;
    if (track <= 0 || count < 2) return top;
    return top + (track * i) / (count - 1);
  }, [count]);

  useEffect(() => {
    if (!enabled) { setIndex(0); return; }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const track = el.offsetHeight - window.innerHeight;
      if (track <= 0) return;
      const p = (window.scrollY - top) / track;
      const next = Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))));
      setIndex((cur) => (cur === next ? cur : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count, enabled]);

  const goTo = useCallback((i: number) => {
    const target = Math.max(0, Math.min(count - 1, i));
    setIndex(target);
    window.scrollTo({ top: offsetFor(target), behavior: "smooth" });
  }, [count, offsetFor]);

  return { sectionRef, index, goTo };
}

/** Pinning and stepping are desktop only. Below lg the bands stack. */
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

/* ── Pieces ────────────────────────────────────────────── */

function MomentCard({ card, i, animate }: { card: Card; i: number; animate: boolean }) {
  const t = TONE[card.tone];
  return (
    <div
      className="flex flex-col gap-[9px] p-5"
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        boxShadow: t.shadow,
        animation: animate ? `ed-wl-rise .5s ${EASE_OUT} both ${i * 70}ms` : undefined,
      }}
    >
      <div className="flex items-center gap-[9px]" style={{ color: t.meta }}>
        <Icon name={card.icon} />
        <span style={{ fontFamily: MONO, fontSize: 12 }}>{card.meta}</span>
      </div>
      <div style={{ fontFamily: JAKARTA, fontSize: 17, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--wl-text)" }}>
        {card.title}
      </div>
      <div className="text-[14px]" style={{ lineHeight: 1.5, color: "var(--wl-muted)" }}>
        {card.body}
      </div>
    </div>
  );
}

function BandHeading({ band }: { band: (typeof BANDS)[number] }) {
  return (
    <div className="flex items-center gap-4 pb-[18px]">
      <span style={{ fontFamily: JAKARTA, fontSize: 19, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--wl-text)" }}>
        {band.title}
      </span>
      {band.note && (
        <span className="text-[13.5px] hidden sm:inline" style={{ color: "var(--wl-muted)" }}>{band.note}</span>
      )}
      <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--wl-rule)" }} />
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-[22px] gap-y-1.5">
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
  );
}

function Counter({ innerRef }: { innerRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={innerRef}
      className="grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-5 md:gap-10 items-center px-6 py-5 md:px-8 md:py-6"
      style={{ background: "var(--wl-panel-2)", border: "1px solid var(--wl-border)", borderRadius: 20 }}
    >
      <div className="flex flex-col gap-0.5">
        <div
          className="text-[38px] md:text-[52px]"
          style={{
            fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
            fontVariantNumeric: "tabular-nums", color: "var(--wl-text)",
          }}
        >
          {COUNT.toLocaleString()}
        </div>
        <div className="text-[13.5px]" style={{ color: "var(--wl-muted)" }}>
          outcomes across the network in the last 24 hours
        </div>
      </div>
      <div
        className="text-[14px] md:text-[15.5px] md:border-l md:pl-10 max-w-[660px]"
        style={{ lineHeight: 1.55, color: "var(--wl-text)", borderColor: "var(--wl-border)", textWrap: "pretty" }}
      >
        None needed a coach to be awake. And what any one location learns,
        every location gets, anonymized, aggregated, and approved by you.
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function AlwaysOn() {
  const isDesktop = useIsDesktop();
  const { sectionRef, index, goTo } = useStepper(BANDS.length, isDesktop);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const band = BANDS[index];
  const atEnd = index === BANDS.length - 1;

  const header = (
    <div className="flex flex-col gap-3 max-w-[900px]">
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
          /* Smaller than the handoff's flat 44px: the header, the band
             viewport and the counter all have to share one screen once
             the section pins. */
          fontSize: "clamp(1.375rem, 0.62rem + 2.1vw, 2rem)",
        }}
      >
        Your best coach, at every location, at the hour it matters.
      </h2>
      <p className="text-[14.5px] md:text-[15.5px] max-w-[780px]" style={{ lineHeight: 1.55, color: "var(--wl-muted)" }}>
        Nobody pulled any of this. Each one started as a play built once, and
        some of them draw on what the rest of your network already learned.
      </p>
      <Legend />
    </div>
  );

  /* ── Below lg: no pin, every band stacked ── */
  if (!isDesktop) {
    return (
      <section id="always-on" className="ed-wall w-full scroll-mt-24" style={{ backgroundColor: "var(--wl-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 flex flex-col gap-9">
          {header}
          {BANDS.map((b) => (
            <div key={b.title}>
              <BandHeading band={b} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {b.cards.map((c, i) => <MomentCard key={c.title} card={c} i={i} animate={false} />)}
              </div>
            </div>
          ))}
          <Counter />
        </div>
      </section>
    );
  }

  /* ── lg and up: one pinned container, bands step inside it ──
     The scroll track below the pin is what the page scrolls through; the
     pinned child never moves, so the header, the key and the ticker stay
     put and only the band viewport changes. */
  return (
    <section
      id="always-on"
      ref={sectionRef}
      className="ed-wall w-full scroll-mt-24 relative"
      style={{ backgroundColor: "var(--wl-bg)", height: `calc(100vh + ${(BANDS.length - 1) * STEP_VH}vh)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto max-w-7xl h-full px-6 md:px-12 lg:px-16 py-6 flex flex-col justify-center gap-5">
          {header}

          {/* The viewport is a fixed height whatever the band holds, so
              the header, the key and the ticker never shift between
              steps. Rows centre inside it, so a three-card band sits in
              the middle rather than leaving a hole under one row. */}
          <div className="flex flex-col flex-none" style={{ height: 340 }}>
            <BandHeading band={band} />
            {/* key remounts on every step, which is what replays the
                stagger rather than showing the next band already settled */}
            <div
              key={band.title}
              className="grid grid-cols-3 gap-5 flex-1 min-h-0 content-center"
            >
              {band.cards.map((c, i) => (
                <MomentCard key={c.title} card={c} i={i} animate={!reduceMotion} />
              ))}
            </div>
          </div>

          {/* Step control, centred under the band viewport */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Time of day">
              {BANDS.map((b, i) => (
                <button
                  key={b.title}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={b.title}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === index ? 22 : 8, height: 8,
                    background: i === index ? "var(--wl-accent)" : "var(--wl-border)",
                    border: "none", cursor: "pointer", padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(atEnd ? 0 : index + 1)}
              aria-label={atEnd ? "Back to Overnight" : `Next: ${BANDS[index + 1].title}`}
              className="flex items-center justify-center rounded-full transition-colors"
              style={{
                width: 34, height: 34, flex: "none", cursor: "pointer",
                background: "var(--wl-panel)", border: "1px solid var(--wl-border)",
                color: "var(--wl-text)", boxShadow: "var(--wl-shadow)",
              }}
            >
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                style={{ transform: atEnd ? "rotate(180deg)" : undefined }}
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </button>
          </div>

          <Counter />
        </div>
      </div>
    </section>
  );
}
