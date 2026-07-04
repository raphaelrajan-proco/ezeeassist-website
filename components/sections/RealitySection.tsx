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
        {/* Faded team avatars */}
        <div className="flex items-center gap-1.5">
          {["M", "O", "L", "F"].map((a, i) => (
            <span
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[9px]"
              style={{
                backgroundColor: "rgba(0,174,239,0.10)",
                color: "var(--ed-fg-muted)",
                fontWeight: 600,
                opacity: 0.7 - i * 0.12,
              }}
            >
              {a}
            </span>
          ))}
          <span
            className="text-[10px] ml-1"
            style={{ color: "var(--ed-fg-muted)", fontWeight: 500 }}
          >
            marketing · ops · legal · finance
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 2: Coach phones ───────────────────────────── */

function CoachPhonesVisual() {
  const phones = [
    { tool: "ChatGPT", query: "summarize this franchisee report…", rot: -5 },
    { tool: "Claude",  query: "what should I tell this zee about…", rot: 0 },
    { tool: "Gemini",  query: "analyse these location numbers…",    rot: 5 },
  ];
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-[380px]">
      {phones.map((p, i) => (
        <motion.div
          key={p.tool}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + i * 0.12 }}
          className="rounded-2xl px-3 py-4 flex-1"
          style={{
            backgroundColor: "var(--ed-card)",
            border: "1px solid var(--ed-rule)",
            transform: `rotate(${p.rot}deg)`,
            aspectRatio: "9 / 15",
            maxWidth: "120px",
          }}
        >
          <p
            className="text-[8px] mb-2"
            style={{
              color: "var(--ed-fg-muted)",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {p.tool}
          </p>
          <p
            className="text-[10px]"
            style={{
              color: "var(--ed-fg)",
              fontFamily: "var(--font-editorial)",
              lineHeight: 1.35,
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
  const pins = [
    { x: 18, y: 30, color: "#10A37F" },  // teal-ish (ChatGPT)
    { x: 42, y: 18, color: "#D97706" },  // amber (Claude)
    { x: 66, y: 34, color: "#4285F4" },  // blue (Gemini)
    { x: 30, y: 62, color: "#7C3AED" },  // violet (Copilot)
    { x: 58, y: 70, color: "#10A37F" },
    { x: 80, y: 58, color: "#DC2626" },
    { x: 12, y: 78, color: "#4285F4" },
  ];
  return (
    <div
      className="relative rounded-2xl w-full max-w-[380px] overflow-hidden"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
        aspectRatio: "16 / 11",
      }}
    >
      {/* Abstract map lines */}
      <svg
        viewBox="0 0 100 70"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M0,22 C20,18 45,28 70,20 S95,26 100,22",
          "M0,45 C25,40 50,52 75,44 S95,48 100,45",
          "M28,0 C24,20 32,45 26,70",
          "M62,0 C58,22 66,48 60,70",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--ed-rule)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {pins.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 + i * 0.09 }}
          className="absolute flex h-5 w-5 items-center justify-center rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: `${p.color}22`,
            border: `1.5px solid ${p.color}`,
          }}
        >
          <span
            className="block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
        </motion.span>
      ))}

      <p
        className="absolute bottom-3 left-4 text-[9px]"
        style={{
          color: "var(--ed-fg-muted)",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Every pin, a different AI
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
    overline: "At Coaches",
    statement:
      "Your field coaches are pasting franchisee reports into whatever AI they trust. Every coach, a different tool. Every insight, a different context.",
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
  index,
  total,
}: (typeof rows)[number] & { index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const last = index === total - 1;
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
      {!last && (
        <span className="ed-rule-draw" data-visible={inView} aria-hidden="true" />
      )}
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
            className="text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            <span className="ed-fg-muted">Whether you like it or not,</span>{" "}
            <span className="ed-fg">
              your teams are already building with AI.
            </span>
          </h2>
        </motion.div>

        <span className="ed-rule-draw" data-visible={headInView} aria-hidden="true" />

        {rows.map((row, i) => (
          <Row key={row.overline} {...row} index={i} total={rows.length} />
        ))}

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="ed-fg mt-16 md:mt-24 text-3xl md:text-4xl lg:text-5xl max-w-5xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          None of it is connected. None of it is governed. None of it knows
          your brand.{" "}
          <span className="ed-accent">All of it is happening anyway.</span>
        </motion.p>
      </div>
    </section>
  );
}
