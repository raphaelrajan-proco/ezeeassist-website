"use client";

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * The primary solution section, built from the operating-system diagram
 * handoff. Three HQ input cards feed a central core; eleven wires carry
 * two-way colour-coded pulses; the right column of live stores grows
 * horizontally into a field of locations on scroll.
 *
 * The geometry is absolute coordinates in a fixed 1400x660 canvas, so the
 * canvas keeps that size and is scaled to whatever width it is handed.
 * Below 1200 it is unreadable at that scale, which is where the handoff
 * says to reflow, so a stacked version renders instead.
 *
 * Tokens live on `.ed-os` in globals.css, not here.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const CANVAS_W = 1400;
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

/* Local files under /public/logos/integrations/, never a CDN. Notion's
   mark is near-black and disappears on the dark chip, so its file is the
   grey variant rather than the brand black. */
const SYSTEMS = [
  { src: "/logos/integrations/mailchimp.svg",   alt: "Mailchimp" },
  { src: "/logos/integrations/hubspot.svg",     alt: "HubSpot" },
  { src: "/logos/integrations/airtable.svg",    alt: "Airtable" },
  { src: "/logos/integrations/quickbooks.svg",  alt: "QuickBooks" },
  { src: "/logos/integrations/xero.svg",        alt: "Xero" },
  { src: "/logos/integrations/stripe.svg",      alt: "Stripe" },
  { src: "/logos/integrations/notion.svg",      alt: "Notion" },
  { src: "/logos/integrations/googledrive.svg", alt: "Google Drive" },
  { src: "/logos/integrations/dropbox.svg",     alt: "Dropbox" },
];

const STORES = ["#052", "#118", "#214", "#263", "#331", "#402", "#519", "#604"];

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
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <PanelTitle>Your data and systems</PanelTitle>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".12em", color: "var(--os-accent-ink)", textAlign: "right" }}>
          NOTHING MIGRATES
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {SYSTEMS.map((s) => (
          <span
            key={s.alt}
            style={{
              height: 36, borderRadius: 9, background: "var(--os-chip)", border: "1px solid var(--os-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {/* Plain img, not next/image: these are tiny local SVGs and the
                optimizer has nothing to do with them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} width={18} height={18} style={{ width: 18, height: 18 }} />
          </span>
        ))}
        <span
          style={{
            height: 36, borderRadius: 9, background: "var(--os-accent)", color: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: JAKARTA, fontSize: 10.5, fontWeight: 800,
          }}
        >
          +250
        </span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--os-muted)", lineHeight: 1.45 }}>
        POS · scheduling · CRM · accounting · connected at the source, always current.
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

function GovernedPill({ width }: { width?: number }) {
  return (
    <div
      style={{
        width, textAlign: "center", fontFamily: MONO, fontSize: 9, letterSpacing: ".13em",
        color: "var(--os-accent-ink)", border: "1px solid var(--os-accent-soft2)",
        background: "var(--os-accent-soft)", borderRadius: 999,
        /* The fixed-width pill takes no side padding, per the spec; the
           stacked one has no width so it needs some. Both hold one line. */
        padding: width ? "6px 0" : "6px 16px",
        whiteSpace: "nowrap",
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

function StoreChip({ label }: { label: string }) {
  return (
    <span
      style={{
        height: 46, boxSizing: "border-box", borderRadius: 10, background: "var(--os-panel)",
        border: "1px solid var(--os-border)", display: "flex", alignItems: "center",
        paddingLeft: 14, fontFamily: MONO, fontSize: 11.5, color: "var(--os-text)",
      }}
    >
      Store {label}
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
        const dur = rand(3.4, 5.4);
        next.push({
          d,
          color: FLOWS[Math.floor(Math.random() * FLOWS.length)].color,
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

/* ── Scroll reveal ─────────────────────────────────────────
   The scroll guard matters: without it the reveal fires on load in tall
   viewports and the moment is lost. */

function useNetworkReveal(ref: React.RefObject<HTMLDivElement | null>) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExpanded(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let done = false;
    const check = () => {
      if (done) return;
      const scrolled = (window.scrollY || document.documentElement.scrollTop || 0) > 80;
      if (scrolled && el.getBoundingClientRect().bottom < window.innerHeight * 0.92) {
        done = true;
        setExpanded(true);
      }
    };

    /* The observer is the trigger; the scroll listener is the fallback for
       browsers where it does not re-fire. */
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(check, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1] })
      : null;
    io?.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    check();

    return () => { io?.disconnect(); window.removeEventListener("scroll", check); };
  }, [ref]);

  return expanded;
}

/* ── Full canvas, lg and up ────────────────────────────── */

function OsCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const pulses = usePulses();
  const expanded = useNetworkReveal(wrapRef);

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
    <div ref={wrapRef} className="hidden min-[1200px]:block w-full" style={{ height: CANVAS_H * scale }}>
      <div
        ref={canvasRef}
        role="img"
        aria-label="HQ people, playbooks, and systems flow into EZee Assist, which connects every location."
        style={{
          position: "relative", width: CANVAS_W, height: CANVAS_H,
          transform: `scale(${scale})`, transformOrigin: "top left",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, fontFamily: MONO, fontSize: 10.5, letterSpacing: ".14em", color: "var(--os-muted)" }}>
          FRANCHISOR HQ
        </div>
        <div style={{ position: "absolute", left: 1000, top: 0, fontFamily: MONO, fontSize: 10.5, letterSpacing: ".14em", color: "var(--os-muted)" }}>
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
              background: p.color, boxShadow: `0 0 12px 2px ${p.color}`, opacity: 0,
              offsetPath: `path('${p.d}')`,
              animation: `ed-os-travel ${p.dur.toFixed(2)}s linear infinite ${p.delay.toFixed(2)}s`,
              animationDirection: p.reverse ? "reverse" : "normal",
            }}
          />
        ))}

        <div style={{ position: "absolute", left: 0, top: 70, width: 300 }}><PeopleCard /></div>
        <div style={{ position: "absolute", left: 0, top: 200, width: 300 }}><PlaybooksCard /></div>
        <div style={{ position: "absolute", left: 0, top: 344, width: 300 }}><SystemsCard /></div>

        <div style={{ position: "absolute", left: 556, top: 250, zIndex: 2 }}>
          <Core w={208} h={130} />
        </div>
        <div style={{ position: "absolute", left: 578, top: 394, zIndex: 2 }}>
          <GovernedPill width={164} />
        </div>
        <div style={{ position: "absolute", left: 532, top: 440, width: 256, zIndex: 2 }}>
          <FlowLegend />
        </div>

        {/* 120 + 10 + (5 x 46) + (4 x 10) = 400 exactly. box-sizing on the
            tiles is load-bearing: without it the 1px borders make them 48px
            and every row drifts out of alignment. */}
        <div style={{ position: "absolute", left: 1000, top: 60, width: 400, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 120, flex: "none" }}>
            {STORES.map((s) => <StoreChip key={s} label={s} />)}
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="ed-os-col"
              style={{
                display: "flex", flexDirection: "column", gap: 10, flex: "0 0 46px", width: 46,
                opacity: expanded ? 1 : 0,
                transform: expanded ? "translateX(0)" : "translateX(-14px)",
                transition: `opacity .55s ease ${i * 140}ms, transform .55s cubic-bezier(.2,.85,.3,1) ${i * 140}ms`,
              }}
            >
              {Array.from({ length: 8 }, (_, j) => (
                <span
                  key={j}
                  style={{
                    height: 46, boxSizing: "border-box", borderRadius: 10,
                    background: "var(--os-tile)", border: "1px solid var(--os-tile-border)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", left: 1000, top: 520, width: 400, fontSize: 12.5, color: "var(--os-muted)", lineHeight: 1.5 }}>
          {expanded
            ? "And every location you open next, connected the day it opens."
            : "Keep scrolling. The network keeps going."}
        </div>
      </div>
    </div>
  );
}

/* ── Stacked, below lg ─────────────────────────────────── */

function StackedDiagram() {
  return (
    <div className="min-[1200px]:hidden" aria-hidden="true">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
        <PeopleCard />
        <PlaybooksCard />
        <SystemsCard />
      </div>

      <div className="flex justify-center py-5">
        <span style={{ width: 1, height: 40, background: "var(--os-wire)" }} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <Core w={208} h={128} />
        <GovernedPill />
        <FlowLegend />
      </div>

      <div className="flex justify-center py-5">
        <span style={{ width: 1, height: 40, background: "var(--os-wire)" }} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {STORES.map((s) => <StoreChip key={s} label={s} />)}
      </div>
      <p className="mt-4 text-[12.5px]" style={{ color: "var(--os-muted)", lineHeight: 1.5 }}>
        And every location you open next, connected the day it opens.
      </p>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

const PAYOFF = ["Your coaches multiplied.", "Your standards held.", "Your numbers growing."];

export default function TheSystem() {
  return (
    <section id="the-system" className="ed-os w-full scroll-mt-24" style={{ backgroundColor: "var(--os-bg)" }}>
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 pt-12 md:pt-16 pb-10 flex flex-col gap-7">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-4xl"
          style={{
            color: "var(--os-text)",
            fontFamily: JAKARTA,
            fontWeight: 700,
            /* Held to one line at every width. The string needs 16.21px of
               width per 1px of font size, and the column is 342px at 390,
               688 at 768 and 1400 from 1024 up, so the ceiling is 21.1 /
               42.4 / 86px. This sits under each and stops at the spec's 44. */
            fontSize: "clamp(1.25rem, 0.393rem + 3.51vw, 2.75rem)",
            letterSpacing: "-0.028em",
            lineHeight: 1.1,
          }}
        >
          EZee Assist is the operating system.
        </motion.h2>

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

        {/* No rule above this and no grid: the three lines sit as one
            centred lockup. On a full-width three-column grid they spread
            to the far edges and read as left-justified rather than as a
            group. */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 -mt-2">
          {PAYOFF.map((line) => (
            <div
              key={line}
              className="text-[18px] md:text-[22px] text-center"
              style={{ fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--os-text)" }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
