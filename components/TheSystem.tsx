"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * The reveal, built from the convergence-diagram design handoff. Three
 * inputs flow into the EZee Assist core, five governed outputs flow out.
 * Pulses travel the wires, the core breathes, the output cards flicker,
 * and an activity log rotates beneath.
 *
 * The wire paths and pulse offset-paths are absolute coordinates in a
 * 1180x620 canvas, so the canvas keeps that fixed size and is scaled to
 * whatever width it is given. Below lg it is unreadable at that scale,
 * so a stacked version renders instead.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const CANVAS_W = 1180;
const CANVAS_H = 620;

/* Handoff dark tokens, with one deliberate substitution: the spec's
   #4373FF accent is mapped to the site's brand blue, per the handoff's
   own instruction to map onto existing token names. */
const T = {
  bg: "#05070D",
  panel: "#0B101C",
  panel2: "#0E1524",
  chip: "#141B2C",
  text: "#EEF2F8",
  muted: "#93A0B5",
  border: "rgba(238,242,248,.09)",
  accent: "#00AEEF",
  accentSoft: "rgba(0,174,239,.10)",
  accentSoft2: "rgba(0,174,239,.25)",
  ok: "#34D399",
  wire: "rgba(238,242,248,.13)",
  shadow: "0 30px 70px -30px rgba(0,0,0,.7)",
} as const;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const JAKARTA = "var(--font-editorial)";

/* ── Data ──────────────────────────────────────────────── */

const PEOPLE = ["HQ", "Coaches", "Franchisees", "Location staff"];

const PLAYBOOKS = [
  { text: "SOPs · brand standards", solid: true },
  { text: "Training · certification", solid: false },
  { text: "Policy · compliance rules", solid: false },
];

/* Real names from lib/data/integrations.ts. The handoff calls for brand
   SVGs, but /public/logos/integrations/ does not exist yet, so these are
   wordmark tiles.
   TODO: swap for <Image> once the integration SVGs land. */
const SYSTEMS = ["Salesforce", "Slack", "HubSpot", "Teams", "Drive", "Zendesk", "Notion", "Airtable"];

const OUTPUTS = [
  { label: "Answers",          sub: "Cited, 24/7, in every channel",        y: 40,  delay: "-0.1s" },
  { label: "Agents",           sub: "Multi-step agentic work, human-gated", y: 148, delay: "-1s" },
  { label: "Reporting Hub",    sub: "Live numbers, no analyst queue",       y: 256, delay: "-1.8s" },
  { label: "Compliance Hub",   sub: "Every location checked nightly",       y: 364, delay: "-2.6s" },
  { label: "Applications Hub", sub: "Built by anyone, inside your guardrails", y: 472, delay: "-3.2s" },
];

const IN_WIRES = [
  { d: "M322 105 C 400 105 410 310 476 310", delay: "0s" },
  { d: "M322 275 C 390 275 400 310 476 310", delay: "-1.2s" },
  { d: "M322 480 C 400 480 410 310 476 310", delay: "-2.4s" },
];
const OUT_WIRES = [
  { d: "M704 310 C 780 310 800 84 876 84",   delay: "-0.5s" },
  { d: "M704 310 C 780 310 800 192 876 192", delay: "-1.4s" },
  { d: "M704 310 C 780 310 800 300 876 300", delay: "-2.2s" },
  { d: "M704 310 C 780 310 800 408 876 408", delay: "-3s" },
  { d: "M704 310 C 780 310 800 516 876 516", delay: "-1.8s" },
];

const LOG = [
  "Nightly compliance sweep ran · 214 locations · 9 tasks opened",
  "Reactivation offer approved by coach · Store #214",
  "Answered from PLAYBOOK § 4.2 in 6s · Store #118",
];

/* ── Shared pieces ─────────────────────────────────────── */

const panelStyle: React.CSSProperties = {
  boxSizing: "border-box",
  border: `1px solid ${T.border}`,
  borderRadius: 16,
  background: T.panel,
};

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 700, color: T.text }}>{children}</div>
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
              background: T.chip, border: `1px solid ${T.border}`, color: T.muted,
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
          <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: T.muted }}>
            <span style={{ width: 14, height: 3, borderRadius: 2, flex: "none", background: r.solid ? T.accent : T.accentSoft2 }} />
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
        <PanelTitle>Your systems</PanelTitle>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".12em", color: T.accent, whiteSpace: "nowrap" }}>
          NOTHING MIGRATES
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {SYSTEMS.map((s) => (
          <span
            key={s}
            style={{
              height: 32, borderRadius: 9, background: T.chip, border: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9.5, fontWeight: 600, color: T.muted, overflow: "hidden", whiteSpace: "nowrap",
            }}
          >
            {s}
          </span>
        ))}
        <span
          style={{
            height: 32, borderRadius: 9, background: T.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: JAKARTA, fontSize: 10.5, fontWeight: 800,
          }}
        >
          +250
        </span>
      </div>
      <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.45 }}>
        POS · scheduling · CRM · accounting · connected at the source, always current.
      </div>
    </div>
  );
}

function CoreLogo({ height }: { height: number }) {
  return (
    <Image
      src="/logo-white.svg"
      alt="EZee Assist"
      width={Math.round((583.2 / 151.2) * height)}
      height={height}
      unoptimized
      style={{ height, width: "auto", maxWidth: 190 }}
    />
  );
}

function OutputCard({ label, sub, pulseDelay }: { label: string; sub: string; pulseDelay?: string }) {
  return (
    <div
      className={pulseDelay ? "ed-sys-card" : undefined}
      style={{
        ...panelStyle,
        padding: "16px 20px",
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 4,
        animation: pulseDelay ? `ed-sys-card-pulse 3.6s linear infinite ${pulseDelay}` : undefined,
      }}
    >
      <div style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 700, color: T.text }}>{label}</div>
      <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

function GovernedPill({ width }: { width?: number }) {
  return (
    <div
      style={{
        width, textAlign: "center", fontFamily: MONO, fontSize: 9, letterSpacing: ".13em",
        color: T.accent, border: `1px solid ${T.accentSoft2}`, background: T.accentSoft,
        borderRadius: 999,
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

function ActivityLog({ absolute }: { absolute?: boolean }) {
  return (
    <div
      className="ed-sys-log"
      /* Wider than the spec's 360px so the longest line holds on one row at
         this font stack; still centred on the 1180 canvas. */
      style={absolute
        ? { position: "absolute", left: 330, top: 560, width: 520, height: 20 }
        : { position: "relative", height: 34, width: "100%" }}
    >
      {LOG.map((line, i) => (
        <div
          key={line}
          style={{
            position: "absolute", inset: 0, textAlign: "center", fontSize: 12, color: T.muted,
            animation: `ed-sys-log${i + 1} 12s linear infinite`,
          }}
        >
          <span style={{ color: T.ok }}>●</span> {line}
        </div>
      ))}
    </div>
  );
}

/* ── Full canvas, lg and up ────────────────────────────── */

function ConvergenceCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  /* The canvas is a fixed 1180x620 because the wires and pulses are
     absolute coordinates. Scale it to whatever width it is handed. */
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

  const dot: React.CSSProperties = {
    position: "absolute", top: 0, left: 0, width: 7, height: 7, borderRadius: "50%",
    background: T.accent, boxShadow: `0 0 12px 2px rgba(0,174,239,.6)`,
  };

  return (
    <div ref={wrapRef} className="hidden lg:block w-full" style={{ height: CANVAS_H * scale }}>
      <div
        className="ed-sys-canvas"
        aria-hidden="true"
        style={{
          position: "relative", width: CANVAS_W, height: CANVAS_H,
          transform: `scale(${scale})`, transformOrigin: "top left",
        }}
      >
        {/* Glow behind everything */}
        <div
          style={{
            position: "absolute", left: 390, top: 110, width: 400, height: 400, borderRadius: "50%",
            background: `radial-gradient(circle, ${T.accentSoft2}, transparent 65%)`,
            filter: "blur(30px)", opacity: 0.8,
          }}
        />

        <svg viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[...IN_WIRES, ...OUT_WIRES].map((w) => (
            <path key={w.d} d={w.d} fill="none" stroke={T.wire} strokeWidth={1.5} />
          ))}
        </svg>

        {[...IN_WIRES, ...OUT_WIRES].map((w) => (
          <span
            key={`dot-${w.d}`}
            className="ed-sys-dot"
            style={{ ...dot, offsetPath: `path('${w.d}')`, animation: `ed-sys-travel 3.6s linear infinite ${w.delay}` }}
          />
        ))}

        <div style={{ position: "absolute", left: 40, top: 40, width: 280 }}><PeopleCard /></div>
        <div style={{ position: "absolute", left: 40, top: 210, width: 280 }}><PlaybooksCard /></div>
        <div style={{ position: "absolute", left: 40, top: 380, width: 280 }}><SystemsCard /></div>

        {/* Core */}
        <div
          style={{
            position: "absolute", left: 480, top: 240, width: 220, height: 140, boxSizing: "border-box",
            borderRadius: 20, background: T.panel, border: `1px solid ${T.accentSoft2}`,
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
            animation: "ed-sys-core-glow 5s ease-in-out infinite",
          }}
        >
          <CoreLogo height={48} />
        </div>

        <div style={{ position: "absolute", left: 508, top: 396, zIndex: 2 }}>
          <GovernedPill width={164} />
        </div>

        <ActivityLog absolute />

        {OUTPUTS.map((o) => (
          <div key={o.label} style={{ position: "absolute", left: 880, top: o.y, width: 260, height: 88 }}>
            <OutputCard label={o.label} sub={o.sub} pulseDelay={o.delay} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stacked, below lg ─────────────────────────────────── */

function StackedDiagram() {
  return (
    <div className="ed-sys-stack lg:hidden" aria-hidden="true">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
        <PeopleCard />
        <PlaybooksCard />
        <SystemsCard />
      </div>

      <div className="flex justify-center py-5">
        <span style={{ width: 1, height: 40, background: T.wire }} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div
          style={{
            width: 220, height: 128, boxSizing: "border-box", borderRadius: 20,
            background: T.panel, border: `1px solid ${T.accentSoft2}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "ed-sys-core-glow 5s ease-in-out infinite",
          }}
        >
          <CoreLogo height={40} />
        </div>
        <GovernedPill />
      </div>

      <div className="flex justify-center py-5">
        <span style={{ width: 1, height: 40, background: T.wire }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OUTPUTS.map((o) => (
          <OutputCard key={o.label} label={o.label} sub={o.sub} />
        ))}
      </div>

      <div className="mt-8">
        <ActivityLog />
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function TheSystem() {
  return (
    <section id="the-system" className="w-full scroll-mt-24" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:py-28 lg:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="leading-[1.05] tracking-[-0.03em] max-w-4xl mb-14 md:mb-16"
          style={{
            color: T.text,
            fontFamily: JAKARTA,
            fontWeight: 700,
            /* Held to one line at every width. The string needs 16.21px of
               width per 1px of font size, and the column is 342px at 390,
               672 at 768 and 896 from 1024 up, so the ceiling is 21.1 /
               41.5 / 55.3px. This sits just under each. */
            fontSize: "clamp(1.25rem, -0.04rem + 5.29vw, 3.3125rem)",
          }}
        >
          EZee Assist is the operating system.
        </motion.h2>

        <p className="sr-only">
          Convergence diagram. Three inputs feed one layer: your people (HQ,
          coaches, franchisees, location staff), your playbooks (SOPs, brand
          standards, training, certification, policy, compliance rules), and
          your systems (POS, scheduling, CRM, accounting, connected at the
          source across 250 plus integrations, with nothing migrated). They
          converge on EZee Assist, which is governed and human-gated. Five
          outputs come from it: Answers, cited and available 24/7 in every
          channel; Agents, running multi-step work behind a human gate;
          Reporting Hub, live numbers with no analyst queue; Compliance Hub,
          every location checked nightly; and Applications Hub, built by
          anyone inside your guardrails.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <ConvergenceCanvas />
          <StackedDiagram />
        </motion.div>
      </div>
    </section>
  );
}
