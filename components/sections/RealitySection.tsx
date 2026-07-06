"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Section 2 — The Reality: "your teams are already building with AI."
 * Three alternating rows (HQ / Coaches / Locations), each naming the
 * shadow-AI behavior with a small stylized visual, then a closing
 * statement that lands the insight.
 */

/* ─── Visual 1: HQ browser tabs ────────────────────────── */

function HQTabsVisual() {
  const tabs = [
    { name: "ChatGPT",  active: true  },
    { name: "Claude",   active: false },
    { name: "Gemini",   active: false },
    { name: "Copilot",  active: false },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-[380px]"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
      }}
    >
      {/* Tab strip */}
      <div
        className="flex items-end gap-1 px-3 pt-2.5"
        style={{ backgroundColor: "var(--ed-bg-alt)" }}
      >
        {tabs.map((t) => (
          <span
            key={t.name}
            className="text-[10px] rounded-t-lg px-3 py-1.5"
            style={{
              backgroundColor: t.active ? "var(--ed-card)" : "transparent",
              color: t.active ? "var(--ed-fg)" : "var(--ed-fg-muted)",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            {t.name}
          </span>
        ))}
      </div>
      {/* Window body */}
      <div className="px-4 py-4">
        <p
          className="text-[12px] mb-3"
          style={{
            color: "var(--ed-fg)",
            fontFamily: "var(--font-editorial)",
            lineHeight: 1.4,
          }}
        >
          &ldquo;Rewrite this franchise disclosure section in plain
          English…&rdquo;
        </p>
        <p
          className="text-[10px]"
          style={{
            color: "var(--ed-fg-muted)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          marketing · ops · legal · finance
        </p>
      </div>
    </div>
  );
}

/* ─── Visual 2: Coach phones ───────────────────────────── */

function CoachPhonesVisual() {
  // Brand-tinted cards: ChatGPT green, Claude orange, Gemini blue
  const phones = [
    { tool: "ChatGPT", query: "summarize this franchisee report…",  rot: -4, color: "#10A37F", tint: "rgba(16,163,127,0.07)" },
    { tool: "Claude",  query: "what should I tell this zee about…", rot: 0,  color: "#D97706", tint: "rgba(217,119,6,0.07)" },
    { tool: "Gemini",  query: "analyse these location numbers…",    rot: 4,  color: "#4285F4", tint: "rgba(66,133,244,0.07)" },
  ];
  return (
    <div className="flex items-stretch justify-center gap-3 w-full max-w-[440px]">
      {phones.map((p, i) => (
        <motion.div
          key={p.tool}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + i * 0.12 }}
          className="rounded-2xl px-4 py-4 flex-1 overflow-hidden"
          style={{
            backgroundColor: p.tint,
            border: "1px solid var(--ed-rule)",
            borderTop: `3px solid ${p.color}`,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <p
            className="text-[10px] mb-2.5"
            style={{
              color: p.color,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {p.tool}
          </p>
          <p
            className="text-base md:text-lg"
            style={{
              color: "var(--ed-fg)",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;{p.query}&rdquo;
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Visual 3: Location map pins ──────────────────────── */

function LocationMapVisual() {
  // Each pin: a location running a different AI tool
  const pins = [
    { x: 14, y: 22, color: "#10A37F", initial: "G" },  // ChatGPT green
    { x: 38, y: 14, color: "#D97706", initial: "C" },  // Claude orange
    { x: 64, y: 24, color: "#4285F4", initial: "G" },  // Gemini blue
    { x: 84, y: 16, color: "#7C3AED", initial: "C" },  // Copilot purple
    { x: 26, y: 46, color: "#6B7280", initial: "X" },  // Grok grey
    { x: 52, y: 42, color: "#10A37F", initial: "G" },
    { x: 76, y: 50, color: "#DC2626", initial: "P" },  // Perplexity-ish red
    { x: 14, y: 72, color: "#4285F4", initial: "G" },
    { x: 42, y: 76, color: "#7C3AED", initial: "C" },
    { x: 68, y: 78, color: "#D97706", initial: "C" },
  ];
  return (
    <div
      className="relative rounded-2xl w-full max-w-[380px] overflow-hidden"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
        aspectRatio: "16 / 12",
      }}
    >
      {/* Subtle dot grid — stylized map texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--ed-rule) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          opacity: 0.55,
        }}
        aria-hidden="true"
      />

      {/* Abstract map roads */}
      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M0,24 C20,20 45,30 70,22 S95,28 100,24",
          "M0,48 C25,43 50,55 75,47 S95,51 100,48",
          "M28,0 C24,22 32,48 26,75",
          "M62,0 C58,24 66,52 60,75",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--ed-rule)"
            strokeWidth="0.6"
          />
        ))}
      </svg>

      {/* One accessible description for the whole visual; the pin letters
          are decorative and would read as a garble to screen readers. */}
      <p className="sr-only">
        Map showing locations across the network, each using a different AI
        tool.
      </p>

      {pins.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.4, y: -6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 + i * 0.07 }}
          className="absolute flex h-6 w-6 items-center justify-center rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: `${p.color}1E`,
            border: `1.5px solid ${p.color}`,
          }}
        >
          <span
            aria-hidden="true"
            className="text-[8px]"
            style={{ color: p.color, fontWeight: 700 }}
          >
            {p.initial}
          </span>
        </motion.span>
      ))}

      <p
        className="absolute bottom-3 left-4 right-4 text-[9px]"
        style={{
          color: "var(--ed-fg-muted)",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Different pins. Different AIs. Nothing connected. Nothing captured.
      </p>
    </div>
  );
}

/* ─── Row config ───────────────────────────────────────── */

const rows = [
  {
    overline: "At HQ",
    statement:
      "Your marketing team has ChatGPT open all day. Your ops team is testing custom GPTs. Your legal team is drafting franchise agreements in Claude.",
    visual: <HQTabsVisual />,
    visualSide: "right" as const,
  },
  {
    overline: "At Field Support",
    statement:
      "Your field coaches and regional managers are pasting franchisee reports into whatever AI they've come to trust. Every coach, a different tool. Every insight, a different context.",
    visual: <CoachPhonesVisual />,
    visualSide: "left" as const,
  },
  {
    overline: "At Locations",
    statement:
      "Your franchisees are Googling procedures at 2am. Your staff are asking ChatGPT things they should be asking your ops team.",
    visual: <LocationMapVisual />,
    visualSide: "right" as const,
  },
];

function Row({
  overline,
  statement,
  visual,
  visualSide,
}: (typeof rows)[number]) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const slideFromX = visualSide === "right" ? -40 : 40;

  const Text = (
    <div className="md:col-span-7">
      <p
        className="ed-fg-muted text-xs mb-6"
        style={{
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {overline}
      </p>
      <p
        className="ed-fg text-2xl md:text-3xl lg:text-4xl max-w-2xl"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
        }}
      >
        {statement}
      </p>
    </div>
  );

  const Visual = (
    <div className="md:col-span-5 flex items-center justify-center md:justify-start">
      {visual}
    </div>
  );

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: slideFromX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 py-16 md:py-20 items-center"
      >
        {visualSide === "right" ? (
          <>
            {Text}
            {Visual}
          </>
        ) : (
          <>
            {Visual}
            {Text}
          </>
        )}
      </motion.div>
      <span className="ed-rule-draw" data-visible={inView} aria-hidden="true" />
    </>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function RealitySection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-12 md:mb-16"
        >
          <p className="ed-overline mb-8">The Reality</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            <span className="ed-fg-muted">Whether you like it or not,</span>{" "}
            <span className="ed-fg">
              your teams are already building with AI.
            </span>
          </h2>
        </motion.div>

        <span className="ed-rule-draw" data-visible={headInView} aria-hidden="true" />

        {rows.map((row) => (
          <Row key={row.overline} {...row} />
        ))}

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-16 md:mt-24 text-3xl md:text-4xl lg:text-5xl max-w-5xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          <span className="ed-fg-muted">
            Disconnected from your systems. Invisible to your leadership.
            Blind to your brand.
          </span>{" "}
          <span className="ed-fg">And growing every day.</span>
        </motion.p>
      </div>
    </section>
  );
}
