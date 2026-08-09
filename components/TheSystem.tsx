"use client";

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * The primary solution section, built from the operating-system diagram
 * handoff. Three HQ input cards feed a central core, eleven wires carry
 * two-way pulses, and the right column names locations and then tickers
 * past a hundred.
 *
 * The geometry is absolute coordinates in a fixed 1210x660 canvas, so the
 * canvas keeps that size and is scaled to whatever width it is handed.
 * It was 1400 while the right side held a field of growth tiles; with
 * those gone the block only needs its chips, and the narrower canvas is
 * what lets the section sit in the site's shared container without
 * scaling the type down to nothing.
 * Below 1200 it is unreadable at that scale, which is where the handoff
 * says to reflow, so a stacked version renders instead.
 *
 * Tokens live on `.ed-os` in globals.css, not here.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const CANVAS_W = 1210;
const CANVAS_H = 660;

const MONO = "var(--os-mono)";
const JAKARTA = "var(--font-editorial)";

/* ── Data ──────────────────────────────────────────────── */

const PEOPLE = ["HQ", "Field coaches", "Support", "Marketing", "Ops", "Real estate"];

const PLAYBOOKS = [
  { text: "SOPs · brand standards", solid: true },
  { text: "Training · certification", solid: false },
  { text: "Policy · compliance rules", solid: false },
];

/* NOTE: the integration SVGs under /public/logos/integrations/ are no
   longer referenced here; the systems card now names types and rotates
   brand names as text. The files are kept, since other routes may want
   them, but nothing on this page loads them. */

/* Seven named locations plus a ticker in the eighth slot, one per
   out-wire. The ticker starts where the named list stops and runs up, so
   the column reads as a network that keeps going rather than a fixed
   eight. */
const NAMED_STORES = 7;
const TICKER_FROM = NAMED_STORES + 1;
/* Two digits by design: the chip hands over to the phrase at 99, so the
   "100s" label is what carries the count past three figures. */
const TICKER_TO = 99;

/* What the systems are, rather than whose they are. The brand names live
   in the marquee below, where they can rotate. */
const SYSTEM_TYPES = [
  "Knowledge base", "Intranet", "LMS", "CRM", "ERP",
  "BI", "POS", "Scheduling", "Accounting", "Ticketing",
];

const SYSTEM_BRANDS = [
  "HubSpot", "ServiceTitan", "Mindbody", "Zenoti", "FranConnect",
  "SharePoint", "Trainual", "Dropbox", "ServiceMinder", "Salesforce",
  "Slack", "QuickBooks", "Xero", "NetSuite", "Toast",
  "Square", "Zendesk", "Notion", "Airtable", "Google Drive",
  "Microsoft Teams", "Power BI", "Tableau", "Gusto", "Shopify",
];

/* All three sit in the EZee blue family rather than blue / amber /
   violet: the three-colour version read as three unrelated systems. The
   pulse dots are white regardless, so the wires stay calm. */
const FLOWS = [
  { label: "Answers", color: "var(--os-answers)", soft: "var(--os-answers-soft)" },
  { label: "Actions", color: "var(--os-actions)", soft: "var(--os-actions-soft)" },
  { label: "Agents",  color: "var(--os-agents)",  soft: "var(--os-agents-soft)" },
];

/* One array feeds both the SVG `d` attributes and the pulse offset-paths.
   They have to be the same strings or the dots float in empty space. */
const PATHS = [
  "M300 122 C 420 122 450 315 552 315",
  "M300 259 C 410 259 440 315 552 315",
  "M300 469 C 420 469 450 315 552 315",
  "M768 315 C 870 315 890 83 996 83",
  "M768 315 C 866 315 886 139 996 139",
  "M768 315 C 862 315 882 195 996 195",
  "M768 315 C 858 315 878 251 996 251",
  "M768 315 C 858 315 878 307 996 307",
  "M768 315 C 858 315 878 363 996 363",
  "M768 315 C 862 315 882 419 996 419",
  "M768 315 C 870 315 890 475 996 475",
];

/* ── Shared pieces ─────────────────────────────────────── */

const panelStyle: React.CSSProperties = {
  boxSizing: "border-box",
  border: "1px solid var(--os-border)",
  borderRadius: 16,
  background: "var(--os-panel)",
};

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 700, color: "var(--os-text)" }}>
      {children}
    </div>
  );
}

function PeopleCard() {
  return (
    <div style={{ ...panelStyle, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
      <PanelTitle>Your people</PanelTitle>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {PEOPLE.map((p) => (
          <span
            key={p}
            style={{
              fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 999,
              background: "var(--os-chip)", border: "1px solid var(--os-border)", color: "var(--os-muted)",
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlaybooksCard() {
  return (
    <div style={{ ...panelStyle, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
      <PanelTitle>Your playbooks</PanelTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {PLAYBOOKS.map((r) => (
          <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--os-muted)" }}>
            <span
              style={{
                width: 14, height: 3, borderRadius: 2, flex: "none",
                background: r.solid ? "var(--os-accent)" : "var(--os-accent-soft2)",
              }}
            />
            {r.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemsCard() {
  return (
    <div style={{ ...panelStyle, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Stacked, not side by side: sharing the row squeezed the title
          onto two lines. The title holds one line and the tag follows. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <PanelTitle>Your data and systems</PanelTitle>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".12em", color: "var(--os-accent-ink)" }}>
          NOTHING MIGRATES
        </div>
      </div>

      {/* Types, not logos: the category is what a franchisor recognises,
          and a logo grid dates the moment a vendor rebrands. */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {SYSTEM_TYPES.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 10.5, fontWeight: 600, padding: "4px 9px", borderRadius: 999,
              background: "var(--os-chip)", border: "1px solid var(--os-border)", color: "var(--os-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* The brands rotate past instead of being listed, so the set can be
          long without taking the height. The track is rendered twice and
          shifted by exactly half, which is what makes the loop seamless;
          `aria-hidden` because it is the same information as the types
          above, in motion. */}
      <div
        aria-hidden="true"
        className="ed-os-marquee m-vendor-marquee"
        style={{
          position: "relative", overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="ed-os-marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", gap: 18, paddingRight: 18 }}>
              {SYSTEM_BRANDS.map((brand) => (
                <span
                  key={`${copy}-${brand}`}
                  style={{ fontSize: 10, color: "var(--os-muted)", whiteSpace: "nowrap", opacity: 0.85 }}
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The section runs dark in both themes, so the wordmark is always the
 *  white one. Do not gate this on `dark:` unless the section's tokens go
 *  back to switching, or it renders black on a near-black panel. */
function CoreLogo({ height }: { height: number }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/logo-white.svg" alt="EZee Assist" style={{ height, width: "auto", maxWidth: 170 }} />
  );
}

function Core({ w, h }: { w: number; h: number }) {
  return (
    <div
      className="ed-os-core"
      style={{
        width: w, height: h, boxSizing: "border-box", borderRadius: 20,
        background: "var(--os-panel)", border: "1px solid var(--os-accent-soft2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "ed-os-core-glow 5s ease-in-out infinite",
      }}
    >
      <CoreLogo height={44} />
    </div>
  );
}

/** Sizes to its own label. It used to take an explicit `width` with no
    side padding, which broke the moment the type floor raised the label
    from 9px to 12px: the text is wider than the box and `nowrap` pushed
    it straight out through the rounded ends. Padding and an inline box
    cannot do that whatever the font size becomes. */
function GovernedPill() {
  return (
    <div
      style={{
        display: "inline-block", whiteSpace: "nowrap", textAlign: "center",
        fontFamily: MONO, fontSize: 9, letterSpacing: ".13em",
        color: "var(--os-accent-ink)", border: "1px solid var(--os-accent-soft2)",
        background: "var(--os-accent-soft)", borderRadius: 999,
        padding: "6px 18px",
      }}
    >
      GOVERNED · HUMAN-GATED
    </div>
  );
}

function FlowLegend() {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
      {FLOWS.map((f) => (
        <span
          key={f.label}
          style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600,
            padding: "5px 10px", borderRadius: 999, background: f.soft, color: f.color,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: f.color }} />
          {f.label}
        </span>
      ))}
    </div>
  );
}

/* The ticker chip inverts: light fill and dark ink, so it separates from
   the seven dark chips above it rather than getting lost among them. */
function StoreChip({ label, live = false, className }: { label: string; live?: boolean; className?: string }) {
  return (
    <span
      className={className}
      style={{
        height: 46, boxSizing: "border-box", borderRadius: 10,
        /* Same panel as the named chips; the ticker stands out through
           the glow and the type, not a swapped background. The white
           fill it had before overpowered the column. */
        background: "var(--os-panel)",
        border: `1px solid ${live ? "var(--os-accent-soft2)" : "var(--os-border)"}`,
        boxShadow: live ? "0 0 0 1px rgba(0, 174, 239, 0.18), 0 0 16px rgba(0, 174, 239, 0.28)" : undefined,
        display: "flex", alignItems: "center",
        paddingLeft: 14, paddingRight: 12,
        fontFamily: MONO,
        /* 1.25x the named chips' 11.5. */
        fontSize: live ? 14.5 : 11.5,
        fontWeight: live ? 700 : 400,
        color: "var(--os-text)",
        /* Tabular figures so the ticker does not jitter as it climbs. */
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {label}
    </span>
  );
}

/* ── Pulses ────────────────────────────────────────────────
   Randomized once, after mount. Generating them during render would
   reshuffle every pass, and generating them at module scope would make
   the server and client markup disagree. */

type Pulse = { d: string; color: string; dur: number; delay: number; reverse: boolean };

function usePulses(): Pulse[] {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  useEffect(() => {
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const next: Pulse[] = [];
    PATHS.forEach((d, i) => {
      const n = 2 + (i % 2);
      for (let j = 0; j < n; j++) {
        /* Slower than the handoff's 3.4-5.4s, and white rather than per
           flow: eleven coloured dots at speed made the diagram busy. */
        const dur = rand(7, 11);
        next.push({
          d,
          color: "var(--os-pulse)",
          dur,
          delay: -rand(0, dur),
          reverse: Math.random() < 0.5,
        });
      }
    });
    setPulses(next);
  }, []);
  return pulses;
}

/* ── Location ticker ───────────────────────────────────────
   Replaces the scroll-revealed field of tiles. The last chip counts from
   where the named list stops up past a hundred, accelerating, so the
   column reads as a network that keeps extending rather than a fixed
   eight.

   `setInterval`, not `requestAnimationFrame`: rAF is paused outright in a
   background tab, which would strand the count part-way. Progress is read
   from the clock, so the easing is right whatever the callback rate is. */
/* A linear climb at about ten stores a second, starting the moment the
   canvas is visible: an opening hold was tried and read as the counter
   being stuck, and the original cubic ease sat nearly still for the
   first two thirds of its run. */
const TICKER_MS = 9000;
/** What the chip reads once the count is done. Short enough to hold one
    line at the ticker's larger type in the 210px column. */
const TICKER_END_LABEL = "100s of locations";

function useLocationTicker(ref: React.RefObject<HTMLDivElement | null>) {
  const [value, setValue] = useState<number | null>(TICKER_FROM);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setValue(null);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let tick: ReturnType<typeof setInterval> | null = null;
    const stop = () => { if (tick) clearInterval(tick); tick = null; };
    const run = () => {
      stop();
      setValue(TICKER_FROM);
      const t0 = performance.now();
      tick = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / TICKER_MS);
        setValue(Math.round(TICKER_FROM + (TICKER_TO - TICKER_FROM) * p));
        /* Lands on the phrase, not the last figure: a specific number
           here would be a claim, and the point is only that it keeps
           going. */
        if (p >= 1) { stop(); setValue(null); }
      }, 40);
    };

    /* Replays on every re-entry, matching the coaching chart: fully
       leaving the section re-arms it, and coming back restarts the
       climb from the first figure. */
    let away = true;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio >= 0.35 && away) {
          away = false;
          run();
        } else if (!e.isIntersecting) {
          away = true;
          stop();
        }
      });
    }, { threshold: [0, 0.35] });
    io.observe(el);

    return () => { io.disconnect(); stop(); };
  }, [ref]);

  return value;
}

/* ── Full canvas, lg and up ────────────────────────────── */

function OsCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const pulses = usePulses();
  const liveCount = useLocationTicker(wrapRef);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / CANVAS_W));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      const el = wrapRef.current;
      if (el) setScale(Math.min(1, el.clientWidth / CANVAS_W));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    /* The wrapper reserves the canvas's *visible* height, not its full
       660: the drawn content ends around y=594 and the remainder is empty
       canvas, which pushed the payoff line ~80px below the visual. The
       canvas box overflows the wrapper harmlessly; everything it draws
       sits above the cut. */
    <div ref={wrapRef} className="hidden min-[1200px]:block w-full" style={{ height: (CANVAS_H - 66) * scale }}>
      <div
        ref={canvasRef}
        role="img"
        aria-label="HQ people, playbooks, and systems flow into EZee Assist, which connects every location."
        style={{
          position: "relative", width: CANVAS_W, height: CANVAS_H,
          transform: `scale(${scale})`, transformOrigin: "top left",
        }}
      >
        {/* Sat at y=0, a 60px gap above the cards. Dropped to 38 so each
            label reads as a heading for the column under it. */}
        <div style={{ position: "absolute", left: 0, top: 38, fontFamily: MONO, fontSize: 10.5, letterSpacing: ".14em", color: "var(--os-muted)" }}>
          HQ
        </div>
        <div style={{ position: "absolute", left: 1000, top: 38, fontFamily: MONO, fontSize: 10.5, letterSpacing: ".14em", color: "var(--os-muted)" }}>
          EVERY LOCATION
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute", left: 470, top: 190, width: 380, height: 340, borderRadius: "50%",
            background: "radial-gradient(circle, var(--os-accent-soft2), transparent 65%)",
            filter: "blur(34px)", opacity: 0.75,
          }}
        />

        <svg viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {PATHS.map((d) => (
            <path key={d} d={d} fill="none" stroke="var(--os-wire)" strokeWidth={1.4} />
          ))}
        </svg>

        {pulses.map((p, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="ed-os-pulse"
            style={{
              position: "absolute", top: 0, left: 0, width: 7, height: 7, borderRadius: "50%",
              background: p.color, boxShadow: "0 0 10px 2px var(--os-pulse-glow)", opacity: 0,
              offsetPath: `path('${p.d}')`,
              animation: `ed-os-travel ${p.dur.toFixed(2)}s linear infinite ${p.delay.toFixed(2)}s`,
              animationDirection: p.reverse ? "reverse" : "normal",
            }}
          />
        ))}

        {/* One column, not three hardcoded tops. The old values (70, 200,
            344) were derived from the type sizes this diagram had before
            the editorial type floor raised every 9-11.5px label in it, and
            the cards grew until Playbooks overlapped People. Stacking them
            means the group cannot collide again whatever the type does;
            only the top of the stack is pinned. */}
        <div
          style={{
            position: "absolute", left: 0, top: 70, width: 300,
            display: "flex", flexDirection: "column", gap: 14,
          }}
        >
          <PeopleCard />
          <PlaybooksCard />
          <SystemsCard />
        </div>

        <div style={{ position: "absolute", left: 556, top: 250, zIndex: 2 }}>
          <Core w={208} h={130} />
        </div>
        {/* Legend first, governed pill under it: the two swapped places
            from the handoff's order by request. The y values are the
            handoff's two slots, just exchanged. */}
        <div style={{ position: "absolute", left: 532, top: 394, width: 256, zIndex: 2 }}>
          <FlowLegend />
        </div>
        {/* Centred on the core's 660 axis and sized to its own text. A
            fixed width was set against the label at 9px; the type floor
            takes it to 12px, which is 193px of text in a 188px box, so the
            words sat outside the pill. Nothing here is width-bound now. */}
        <div style={{ position: "absolute", left: 660, top: 440, zIndex: 2, transform: "translateX(-50%)" }}>
          <GovernedPill />
        </div>

        {/* One chip per out-wire, so the column and the wires stay in
            step. The last one is the ticker. */}
        <div style={{ position: "absolute", left: 1000, top: 70, width: 210, display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: NAMED_STORES }, (_, i) => (
            <StoreChip key={i} label={`Store #${i + 1}`} />
          ))}
          <StoreChip label={liveCount === null ? TICKER_END_LABEL : `Store #${liveCount}`} live />
        </div>
      </div>
    </div>
  );
}

/* ── Stacked, below lg ─────────────────────────────────── */

/**
 * A mobile connector band: curved wires converging on, or fanning out
 * from, the hub, each carrying a travelling dot.
 *
 * **The dots ride `<animateMotion>` inside the SVG, not CSS
 * `offset-path`.** The handoff specifies `offset-path: path(...)` with a
 * `d` string identical to the wire's, and warns that a one-character
 * difference throws the dot off the line. The deeper problem is that the
 * two never share a coordinate space: `offset-path` resolves in CSS
 * pixels against the element's containing block, while the wire is in
 * viewBox units scaled to whatever the container happens to be. They
 * agree only at exactly 350px wide, which is the reference file's pinned
 * width and no real viewport. At 390 the column is 342px and every dot
 * sits beside its wire; at 320 it is worse.
 *
 * `animateMotion` is inside the viewBox, so it scales with the artwork
 * and stays welded to the line at every width. `preserveAspectRatio
 * ="none"` is what lets the band stretch to the column instead of
 * letterboxing, and the dots stretch with it because they are the same
 * coordinate space.
 */
function ConnectorBand({ dir }: { dir: "in" | "out" }) {
  const H = dir === "in" ? 56 : 52;
  const wires =
    dir === "in"
      ? ["M92 0 C 92 30, 175 26, 175 56", "M175 0 L 175 56", "M258 0 C 258 30, 175 26, 175 56"]
      : ["M175 0 C 175 28, 92 24, 92 52", "M175 0 L 175 52", "M175 0 C 175 28, 258 24, 258 52"];
  const colour = dir === "in" ? "#35A8E0" : "#8FE3C0";
  const dur = dir === "in" ? 3.4 : 3;
  const begins = dir === "in" ? ["0s", "-1.1s", "-2.2s"] : ["0s", "-1s", "-2s"];

  return (
    <div className="m-conn md:hidden" style={{ width: "100%", height: H }} aria-hidden="true">
      <svg viewBox={`0 0 350 ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {wires.map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(53,168,224,.3)" strokeWidth={1.4} />
        ))}
        {wires.map((d, i) => (
          <circle key={`dot-${d}`} className="m-conn-dot" r={2.6} fill={colour}>
            {/* The path here is the SAME string as the wire above, taken
                from the same array rather than retyped, so the two cannot
                drift apart. One dot per band runs backwards so the flow
                reads two-way. */}
            <animateMotion
              dur={`${dur}s`}
              begin={begins[i]}
              repeatCount="indefinite"
              path={d}
              keyPoints={i === 1 ? "1;0" : undefined}
              keyTimes={i === 1 ? "0;1" : undefined}
              calcMode={i === 1 ? "linear" : undefined}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function StackedDiagram() {
  return (
    <div className="min-[1200px]:hidden" aria-hidden="true">
      {/* The canvas above carries these two labels; the stack lost them.
          `md:hidden` so 768-1199 keeps exactly what it renders today. */}
      <div className="ed-mono-label m-conn-label md:hidden" style={{ fontFamily: MONO, letterSpacing: ".16em", color: "var(--os-muted)", marginBottom: 10 }}>
        HQ
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
        <PeopleCard />
        <PlaybooksCard />
        <SystemsCard />
      </div>

      <div className="flex justify-center py-5 max-md:hidden">
        <span style={{ width: 1, height: 40, background: "var(--os-wire)" }} />
      </div>
      <div className="py-4 md:hidden">
        <ConnectorBand dir="in" />
      </div>

      {/* Same order as the canvas: legend, then the governed pill. */}
      <div className="flex flex-col items-center gap-3">
        <Core w={208} h={128} />
        <FlowLegend />
        <GovernedPill />
      </div>

      <div className="flex justify-center py-5 max-md:hidden">
        <span style={{ width: 1, height: 40, background: "var(--os-wire)" }} />
      </div>
      <div className="py-4 md:hidden">
        <ConnectorBand dir="out" />
      </div>

      <div className="ed-mono-label m-conn-label md:hidden" style={{ fontFamily: MONO, letterSpacing: ".16em", color: "var(--os-muted)", marginBottom: 10, textAlign: "right" }}>
        EVERY LOCATION
      </div>
      {/* Six named chips below 768, seven above, so the mobile grid ends
          on a complete row and the ticker becomes the full-width accent
          bar under it rather than an odd eighth cell. `max-md:hidden` on
          the seventh keeps 768-1199 exactly as it was. The chip itself is
          already the static label here; the counting ticker lives on the
          desktop canvas and is untouched. */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {Array.from({ length: NAMED_STORES }, (_, i) => (
          <StoreChip
            key={i}
            label={`Store #${i + 1}`}
            className={i >= 6 ? "m-store-extra" : undefined}
          />
        ))}
        <StoreChip label={TICKER_END_LABEL} live className="max-md:col-span-2 max-md:justify-center" />
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */



export default function TheSystem() {
  return (
    <section id="the-system" className="ed-os w-full scroll-mt-24" style={{ backgroundColor: "var(--os-bg)" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-9 flex flex-col gap-7">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-5xl"
          style={{
            /* White line with ONE accent phrase, which is where this
               started. It went all-accent in between; this is back. The
               accent is `--os-accent-ink` (#00AEEF), correct here because
               the panel is #05070D. On a light band the accent text token
               is #0077A8 and #00AEEF fails contrast. */
            color: "var(--os-text)",
            fontFamily: JAKARTA,
            fontWeight: 700,
            /* **Two lines, not three.** 21 words over a 1216px column
               needs roughly 30px to break twice and about 26 to break
               once; the clamp tops out at 1.875rem so the line count is
               stable from lg up, and `max-w-5xl` below widens the column
               so it does not run to three at mid widths. `balance` rather
               than `pretty`: with a two-line target the two lines should
               be even, which is what balance optimises for. */
            fontSize: "clamp(1.25rem, 0.55rem + 1.9vw, 1.875rem)",
            letterSpacing: "-0.026em",
            lineHeight: 1.2,
            textWrap: "balance",
          }}
        >
          EZee is the operating layer that connects your people, playbooks, and live
          data.{" "}
          <span style={{ color: "var(--os-accent-ink)" }}>
            Coaching reaches its full potential.
          </span>
        </motion.h2>

        {/* Sits under the lead line as one sentence, at a lighter weight
            than it: it is the consequence of the headline, not a second
            headline. It used to close the section as three columns. */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="-mt-3 text-[15px] md:text-[19px]"
          style={{
            fontFamily: JAKARTA, fontWeight: 500, letterSpacing: "-0.015em",
            /* Brighter than --os-muted by request, dimmer than the pure
               white headline so the hierarchy holds. */
            /* `nowrap` is gone with the longer headline above: this line
               is no longer the narrower of the two, so forcing it onto one
               line overflowed the clip at small widths. */
            color: "rgba(238, 242, 248, 0.92)",
          }}
        >
          Your coaches multiplied. Your standards held. Franchisees&rsquo; numbers growing.
        </motion.p>

        <p className="sr-only">
          Operating system diagram. Three inputs feed one layer: your people
          (HQ, field coaches, support, marketing, ops, real estate), your
          playbooks (SOPs, brand standards, training, certification, policy,
          compliance rules), and your data and systems (POS, scheduling, CRM,
          accounting, connected at the source across 250 plus integrations,
          with nothing migrated). They converge on EZee Assist, which is
          governed and human-gated, and which carries answers, actions, and
          agents both ways to every location in the network.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <OsCanvas />
          <StackedDiagram />
        </motion.div>

      </div>
    </section>
  );
}
