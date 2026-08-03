"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The always-on wall. Twenty-six moments from one day across the network
 * in four time bands. From lg up the section pins as a split screen: the
 * thesis holds still on the left while the page's own scroll drives the
 * card column on the right, one to one, like a page inside the page. The
 * band tags and the key sit fixed above the card column; a fade at the
 * column's top and bottom lets the neighbouring band show through
 * dimmed, which is the cue that there is more to scroll. The counter
 * waits in flow below the pinned screen, so it arrives under both halves
 * once the last band is spent, and the section moves on.
 *
 * Tokens live on `.ed-wall` in globals.css, not here.
 */

const MONO = "var(--wl-mono)";
const JAKARTA = "var(--font-editorial)";

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
  bell:      <><path d="M18.5 16h-13l1.6-2.6V9.7a4.9 4.9 0 0 1 9.8 0v3.7z" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  receipt:   <><path d="M6.5 3.5h11V20l-1.8-1.3-1.9 1.3-1.8-1.3-1.9 1.3-1.8-1.3L6.5 20z" /><path d="M9.5 8.5h5M9.5 12h5M9.5 15.5h3" /></>,
  shield:    <><path d="M12 3.5 5.5 6v5.4c0 4.2 2.7 7.3 6.5 8.6 3.8-1.3 6.5-4.4 6.5-8.6V6z" /><path d="m9.2 11.6 2.1 2.1 3.6-4" /></>,
  truck:     <><path d="M3.5 6.5h10V16h-10zM13.5 9.5h4l2.5 3V16h-6.5" /><circle cx="7.2" cy="17.6" r="1.7" /><circle cx="16.4" cy="17.6" r="1.7" /></>,
  megaphone: <><path d="M4.5 10.5v3.4l2.5.4V10zM7 10l12.5-4.8v13.6L7 14.3z" /><path d="m9.3 15 1 4 2.6-.7-.9-3.2" /></>,
} as const;

type IconName = keyof typeof ICONS;

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ flex: "none" }}
    >
      {ICONS[name]}
    </svg>
  );
}

/* ── The twenty-six moments ────────────────────────────────
   TODO: replace with real log moments before launch. The handoff is
   explicit that invented moments read as invented to a franchisor, and
   that the timestamps matter most: 9:14am is credible where 9:00am is
   not. Keep the four bands and the mix of trigger types, swap the
   specifics.

   `tone` is assigned from what each card's own text says the system DID,
   rebalanced on request to roughly even detected and automated:
     neutral  the payoff is a flag, alert, hold, or surfaced intel: the
              system watched and told a human (alert sent, flagged for
              the owner, held for owner, "here is what the network did")
     accent   the payoff is finished work: something was drafted,
              assembled, answered, started, merged, or sent
     violet   franchisee-authored: an owner built it (three on the wall,
              one during the day and two on the longer clock)
   The split is 11 / 12 / 3. Surfacing network intel counts as detected,
   not automated: the system found something and reported it, even when
   what it found came from other locations. */

type Tone = "neutral" | "accent" | "violet";
type Card = { icon: IconName; meta: string; title: string; body: string; tone: Tone; thread?: "a" | "b" };

const BANDS: { title: string; note?: string; cards: Card[] }[] = [
  {
    title: "Overnight",
    note: "while nobody is awake",
    cards: [
      { icon: "bell",      meta: "1:12am · Store #263",    title: "Walk-in cooler drifted",  body: "Alert sent, service ticket opened", tone: "neutral" },
      { icon: "moon",      meta: "2:04am · all locations", title: "Closing photos scored",   body: "9 stations flagged, tasks opened", tone: "neutral" },
      { icon: "receipt",   meta: "2:47am · Store #118",    title: "Registers reconciled",    body: "One deposit off, flagged for the owner", tone: "neutral" },
      { icon: "shield",    meta: "3:15am · all locations", title: "Expiring certifications pulled", body: "Six due in 30 days, reminders queued", tone: "neutral" },
      { icon: "package",   meta: "3:40am · Store #519",    title: "Inventory hit critical",  body: "Reorder drafted at approved pricing", tone: "accent" },
      { icon: "clipboard", meta: "4:00am · West territory", title: "Coach brief assembled",  body: "12 locations, ranked by need", tone: "accent" },
    ],
  },
  {
    title: "Before the doors open",
    cards: [
      { icon: "message",   meta: "5:45am · all locations", title: "Overnight questions cleared", body: "14 answered from the manual, 2 held for HQ", tone: "accent" },
      { icon: "sunrise",   meta: "6:00am · Store #331", title: "Soft week detected",    body: "62% booked · reactivation draft ready", tone: "neutral", thread: "a" },
      { icon: "truck",     meta: "6:15am · Store #519", title: "Delivery came in short", body: "Credit request drafted against the invoice", tone: "accent" },
      { icon: "people",    meta: "6:30am · Store #052", title: "Attach rate slipping",  body: "Top-quartile locations run a 30 second add-on script. Here it is.", tone: "neutral" },
      { icon: "personAdd", meta: "7:00am · Store #402", title: "New hire starts today", body: "Day-one sequence started", tone: "accent" },
      { icon: "document",  meta: "7:40am · Store #144", title: "Morning huddle brief ready", body: "Yesterday's numbers and today's bookings, one card", tone: "accent" },
    ],
  },
  {
    title: "During the day",
    cards: [
      { icon: "message",    meta: "9:14am · Store #118",  title: "Promo question answered",          body: "Cited from the promo guide in 6 seconds", tone: "accent" },
      { icon: "document",   meta: "10:05am · Store #214", title: "Started a national retail proposal", body: "4 locations have quoted this. Range, terms, and win rate attached.", tone: "accent" },
      { icon: "star",       meta: "11:40am · Store #263", title: "One-star review posted",           body: "Response drafted, held for owner", tone: "neutral" },
      { icon: "storefront", meta: "12:30pm · Store #087", title: "Competitor opened nearby",         body: "6 locations faced this. What held revenue, and what didn't.", tone: "neutral" },
      { icon: "megaphone",  meta: "1:20pm · Store #052",  title: "Local campaign assembled",         body: "Hours and offer merged into the brand template", tone: "accent" },
      { icon: "shield",     meta: "2:35pm · Store #402",  title: "Refund edge case resolved",        body: "Policy cited, approval routed to the owner", tone: "neutral" },
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
      { icon: "document", meta: "30 days out · Store #144",  title: "Lease renewal window opens", body: "Terms summary drafted for the owner", tone: "accent" },
      { icon: "trend",    meta: "Week 6 · Store #402",       title: "Ramp behind cohort", body: "What the fastest 10 openings did in week 6, in order", tone: "accent" },
      { icon: "receipt",  meta: "First Monday · Store #144", title: "An owner built a P&L digest", body: "Emailed to their managers, numbers filled in", tone: "violet" },
      { icon: "tools",    meta: "Every October · Store #519", title: "An owner built a winter prep checklist", body: "Site-by-site steps, scheduled each fall", tone: "violet" },
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

/* ── Scroll plumbing ───────────────────────────────────────
   The section pins for the length of its scroll track and the page's own
   scroll maps one to one onto the card column's translate, so nothing
   hijacks the wheel: a notch of page scroll moves the cards a notch. The
   transform is written straight to the DOM in a rAF, not through state,
   so the 26-card tree does not re-render sixty times a second; only the
   active tag index goes through React.

   PAD is the stack's own vertical padding and the depth of the fade mask
   at each end of the viewport: at either extreme the resting band sits
   clear of the fade, and anything beyond it shows through dimmed. */
const PAD = 48;
/* Shallower at the bottom: the deep exit fade plus the grid's padding
   plus the counter's own top margin stacked into a dead zone between the
   last band and the counter. */
const PAD_BOTTOM = 28;
const FADE = `linear-gradient(to bottom, transparent 0px, black ${PAD}px, black calc(100% - ${PAD_BOTTOM}px), transparent 100%)`;
/* Server-render fallback for the track height; replaced by the measured
   stack overflow on mount. */
const DEFAULT_RANGE = 1400;

/** Pinning and the split layout are desktop only. Below lg the bands stack. */
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

function MomentCard({ card }: { card: Card }) {
  const t = TONE[card.tone];
  return (
    <div
      className="flex flex-col gap-[7px] p-4"
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        boxShadow: t.shadow,
      }}
    >
      <div className="flex items-center gap-2" style={{ color: t.meta }}>
        <Icon name={card.icon} />
        <span style={{ fontFamily: MONO, fontSize: 11.5 }}>{card.meta}</span>
      </div>
      <div style={{ fontFamily: JAKARTA, fontSize: 16, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--wl-text)" }}>
        {card.title}
      </div>
      <div className="text-[13.5px]" style={{ lineHeight: 1.45, color: "var(--wl-muted)" }}>
        {card.body}
      </div>
    </div>
  );
}

/** Mobile only: the stacked layout keeps per-band headings because it has
    no fixed tag row telling the reader where they are. */
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
    <div className="flex flex-wrap gap-x-[18px] gap-y-1.5">
      {[
        { label: "Detected and flagged for you", dot: "var(--wl-muted)", dim: true },
        { label: "Automated play, work done for you", dot: "var(--wl-accent)" },
        { label: "Built by an owner", dot: "var(--wl-violet)" },
      ].map((l) => (
        <span key={l.label} className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--wl-muted)" }}>
          <span
            aria-hidden="true"
            style={{ width: 8, height: 8, borderRadius: "50%", background: l.dot, opacity: l.dim ? 0.6 : 1, flex: "none" }}
          />
          {l.label}
        </span>
      ))}
    </div>
  );
}

function Counter() {
  return (
    <div
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
        None of these outcomes needed a coach to be awake. And what any one
        location learns, every location gets, anonymized, aggregated, and
        approved by you.
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function AlwaysOn() {
  const isDesktop = useIsDesktop();

  const trackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headRowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [range, setRange] = useState(DEFAULT_RANGE);
  /* The scroller's height in px, set explicitly rather than derived from
     the flex/grid chain. The first build sized it `flex-1` inside an
     auto-sized grid row: Chrome resolved the percentage chain, Safari
     treated it as auto, the viewport grew to the full stack height,
     `range` collapsed to 1 and the section never pinned. It rendered as
     one long static wall. A measured pixel height cannot be lost to that
     ambiguity. The cap keeps the container to roughly one band plus the
     peek even on very tall viewports and in full-page captures, which
     expand 100vh. */
  const [vpH, setVpH] = useState(560);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isDesktop) return;
    const track = trackRef.current, grid = gridRef.current, headRow = headRowRef.current,
      viewport = viewportRef.current, stack = stackRef.current;
    if (!track || !grid || !headRow || !viewport || !stack) return;

    let raf = 0;
    const read = () => {
      raf = 0;
      const r = Math.max(1, stack.scrollHeight - viewport.clientHeight);
      const top = track.getBoundingClientRect().top + window.scrollY;
      const y = Math.max(0, Math.min(r, window.scrollY - top));
      stack.style.transform = `translate3d(0, ${-y}px, 0)`;
      /* Active tag: the band under a probe in the viewport's upper half.
         Flips as the incoming band crosses it. The rects are read after
         the transform above, so the offsets already carry the translate;
         comparing against the viewport is enough. The cap keeps the
         probe honest if the viewport ever renders unclipped. */
      const vpTop = viewport.getBoundingClientRect().top;
      const probe = Math.min(viewport.clientHeight * 0.45, 320);
      let idx = 0;
      bandRefs.current.forEach((b, i) => {
        if (b && b.getBoundingClientRect().top - vpTop <= probe) idx = i;
      });
      setActive((cur) => (cur === idx ? cur : idx));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(read); };
    const measure = () => {
      /* Every fixed cost above the scroller, in resolved pixels: the
         grid's own top padding (nav clearance), the tag row and key with
         their padding, and the grid's 24px bottom padding. None of these
         depend on the scroller's height, so there is no feedback loop. */
      const padTop = parseFloat(getComputedStyle(grid).paddingTop) || 98;
      const headH = headRow.getBoundingClientRect().height;
      const vh = Math.round(Math.min(720, Math.max(320, window.innerHeight - padTop - headH - 24)));
      setVpH(vh);
      setRange(Math.max(1, stack.scrollHeight - vh));
      schedule();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stack);
    ro.observe(headRow);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
      stack.style.transform = "";
    };
  }, [isDesktop]);

  /* Tag click: scroll the page to where that band rests just under the
     top fade. Same shared state as scrolling, nothing hijacked. */
  const goTo = useCallback((i: number) => {
    const track = trackRef.current, viewport = viewportRef.current, stack = stackRef.current;
    const band = bandRefs.current[i];
    if (!track || !viewport || !stack || !band) return;
    const r = Math.max(1, stack.scrollHeight - viewport.clientHeight);
    /* Both rects carry the same translate, so the difference is the
       band's static offset within the stack. */
    const bandTop = band.getBoundingClientRect().top - stack.getBoundingClientRect().top;
    const target = Math.max(0, Math.min(r, bandTop - PAD));
    const top = track.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + target, behavior: reduce ? "auto" : "smooth" });
  }, []);

  /* ── Below lg: no pin, every band stacked ── */
  if (!isDesktop) {
    return (
      <section id="always-on" className="ed-wall w-full scroll-mt-24" style={{ backgroundColor: "var(--wl-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 flex flex-col gap-9">
          <div className="flex flex-col gap-3 max-w-[900px]">
            <div
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, letterSpacing: ".18em", color: "var(--wl-muted)" }}
            >
              Always on
            </div>
            <h2
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.028em", lineHeight: 1.16,
                /* EZee blue, via the token so the light band gets the
                   darker pass-rated value and dark gets the brand hue. */
                color: "var(--wl-accent)",
                fontSize: "clamp(1.375rem, 0.62rem + 2.1vw, 2rem)",
              }}
            >
              <span className="block">Your best coach.</span>
              <span className="block">At every location.</span>
              <span className="block">At the hour it matters.</span>
            </h2>
            <p className="text-[18px] md:text-[19px] max-w-[780px]" style={{ lineHeight: 1.55, color: "var(--wl-muted)" }}>
              Nobody pulled any of this. Each one started as a play built once, and
              some of them draw on what the rest of your network already learned.
            </p>
            <Legend />
          </div>
          {BANDS.map((b) => (
            <div key={b.title}>
              <BandHeading band={b} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {b.cards.map((c) => <MomentCard key={c.title} card={c} />)}
              </div>
            </div>
          ))}
          <Counter />
        </div>
      </section>
    );
  }

  /* ── lg and up: pinned split screen ──
     Left holds the thesis, right scrolls the day. The track wrapper's
     extra height is exactly the stack's overflow, so page scroll and
     card scroll run one to one. The counter sits in flow after the
     track: it enters from the bottom, under both halves, as the pin
     releases. */
  return (
    <section id="always-on" className="ed-wall w-full scroll-mt-24" style={{ backgroundColor: "var(--wl-bg)" }}>
      <div ref={trackRef} className="relative" style={{ height: `calc(100vh + ${range}px)` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={gridRef}
            className="mx-auto grid h-full max-w-7xl gap-10 px-6 md:px-12 lg:px-16 pb-3 xl:gap-14"
            style={{
              gridTemplateColumns: "minmax(0, 7fr) minmax(0, 11fr)",
              /* One definite row. An auto row can grow past the 100vh
                 container and takes percentage heights down with it;
                 minmax(0, 1fr) pins the row to the container. */
              gridTemplateRows: "minmax(0, 1fr)",
              /* The floating nav pill overlays the top of the pinned
                 screen; without this the tag row sits behind it. */
              paddingTop: "calc(var(--nav-block) + 10px)",
            }}
          >
            {/* Left: the fixed half */}
            <div className="flex flex-col justify-center gap-4">
              <div
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, letterSpacing: ".18em", color: "var(--wl-muted)" }}
              >
                Always on
              </div>
              <h2
                style={{
                  fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.028em", lineHeight: 1.16,
                  /* EZee blue, via the token so the light band gets the
                     darker pass-rated value and dark gets the brand hue. */
                  color: "var(--wl-accent)",
                  /* Larger than the old single-column header: the left
                     half is this text's whole job now. */
                  fontSize: "clamp(1.5rem, 0.9rem + 1.7vw, 2.3rem)",
                }}
              >
                <span className="block">Your best coach.</span>
                <span className="block">At every location.</span>
                <span className="block">At the hour it matters.</span>
              </h2>
              {/* 1.25x the 15 it launched at, by request. */}
              <p className="text-[19px]" style={{ lineHeight: 1.55, color: "var(--wl-muted)", maxWidth: 440 }}>
                Nobody pulled any of this. Each one started as a play built once, and
                some of them draw on what the rest of your network already learned.
              </p>
            </div>

            {/* Right: fixed tags and key, then the scrolling day. Centred
                so the capped scroller sits balanced on tall viewports;
                on ordinary ones the column is full and this is a no-op. */}
            <div className="flex h-full min-h-0 flex-col justify-center">
              <div ref={headRowRef} className="flex flex-col gap-2.5 pb-3.5">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Time of day">
                  {BANDS.map((b, i) => (
                    <button
                      key={b.title}
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => goTo(i)}
                      className="rounded-full transition-colors"
                      style={{
                        fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.005em",
                        padding: "5px 12px", cursor: "pointer",
                        background: i === active ? "var(--wl-text)" : "transparent",
                        color: i === active ? "var(--wl-bg)" : "var(--wl-muted)",
                        border: `1px solid ${i === active ? "var(--wl-text)" : "var(--wl-border)"}`,
                      }}
                    >
                      {b.title}
                    </button>
                  ))}
                </div>
                <Legend />
              </div>

              {/* The scroller. The mask dims whatever crosses the top or
                  bottom PAD, which is the faded glimpse of the next band.
                  The height is the measured pixel value, never a
                  percentage: see the note on vpH. */}
              <div
                ref={viewportRef}
                className="relative overflow-hidden"
                style={{ height: vpH, flex: "none", WebkitMaskImage: FADE, maskImage: FADE }}
              >
                <div
                  ref={stackRef}
                  className="flex flex-col gap-9"
                  style={{ padding: `${PAD}px 0 ${PAD_BOTTOM}px`, willChange: "transform" }}
                >
                  {BANDS.map((b, bi) => (
                    /* Each band sits on its own plate, and the plates
                       deepen through the day: the progression itself
                       shows a new time-frame arriving as they scroll by.
                       The tint lives behind the boxes only, per request. */
                    <div
                      key={b.title}
                      ref={(el) => { bandRefs.current[bi] = el; }}
                      className="grid grid-cols-2 gap-3 rounded-2xl p-3.5"
                      style={{ background: `rgba(var(--wl-band-ink), ${(0.025 + bi * 0.02).toFixed(3)})` }}
                    >
                      {b.cards.map((c) => <MomentCard key={c.title} card={c} />)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrives under both halves once the last band is spent. No top
          padding: the scroller's exit fade above already reads as the
          gap, and adding more left a dead zone between the two. */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pb-16">
        <Counter />
      </div>
    </section>
  );
}
