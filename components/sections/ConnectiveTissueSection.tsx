"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Section 5 — The Connective Tissue (Integrations & Access).
 *
 * Left column: 250+ integrations proof + compact hub-and-spoke diagram
 * (EZee at centre, category boxes with tool pills, dotted connectors
 * that draw themselves on scroll).
 * Right column: the 3×3 delivery-channel grid.
 */

/* ─── Hub-and-spoke diagram ────────────────────────────── */

type HubNode = {
  label: string;
  tools: string[];
  x: number;
  y: number;
};

// Radial arrangement — clockwise from 12 o'clock
const NODES: HubNode[] = [
  { label: "Accounting",    tools: ["QuickBooks", "Xero", "Stripe"],            x: 50, y: 7  },
  { label: "POS",           tools: ["Square", "Toast", "Lightspeed"],           x: 84, y: 20 },
  { label: "CRM",           tools: ["Salesforce", "HubSpot", "HighLevel"],      x: 92, y: 50 },
  { label: "ERP / FMS",     tools: ["NetSuite", "FranConnect", "ServiceTitan"], x: 84, y: 80 },
  { label: "Drives",        tools: ["Google Drive", "SharePoint", "Dropbox"],   x: 50, y: 93 },
  { label: "Marketing",     tools: ["Mailchimp", "Canva", "Constant Contact"],  x: 16, y: 80 },
  { label: "LMS",           tools: ["Trainual", "Docebo", "LearnUpon"],         x: 8,  y: 50 },
  { label: "Video / Comms", tools: ["YouTube", "Slack", "Zoom"],                x: 16, y: 20 },
];

const CX = 50;
const CY = 50;
// Approximate half-extents in viewBox units: category cards (~120×52px in
// a 560px canvas) and the hub (~150×72px). Lines start/stop at these edges
// so they never pass under or through a card.
const CARD_RX = 12;
const CARD_RY = 6;
const HUB_RX = 15;
const HUB_RY = 8.5;

function connector(n: HubNode) {
  const dx = CX - n.x;
  const dy = CY - n.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // Leave the card at its edge, arrive at the hub's edge
  const x1 = n.x + ux * CARD_RX * Math.abs(ux) + ux * CARD_RY * Math.abs(uy);
  const y1 = n.y + uy * CARD_RX * Math.abs(ux) + uy * CARD_RY * Math.abs(uy);
  const x2 = CX - (ux * HUB_RX * Math.abs(ux) + ux * HUB_RY * Math.abs(uy));
  const y2 = CY - (uy * HUB_RX * Math.abs(ux) + uy * HUB_RY * Math.abs(uy));
  return { x1, y1, x2, y2 };
}

function CategoryCard({ node }: { node: HubNode }) {
  return (
    <>
      <p
        className="ed-fg text-[11px] mb-0.5"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        {node.label}
      </p>
      <p className="ed-fg-muted text-[8.5px]" style={{ lineHeight: 1.35 }}>
        {node.tools.join(" · ")}
      </p>
    </>
  );
}

function HubCardInner() {
  return (
    <div>
      <p
        className="text-[8px] mb-0.5"
        style={{
          color: "#00AEEF",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        The Hub
      </p>
      <p
        className="text-lg"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        EZee Assist
      </p>
    </div>
  );
}

function HubDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* ── Desktop: radial diagram ── */}
      <div
        ref={ref}
        className="relative mx-auto w-full hidden md:block"
        style={{ maxWidth: "560px", aspectRatio: "1 / 1" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {NODES.map((n, i) => {
            const { x1, y1, x2, y2 } = connector(n);
            const segLen = Math.hypot(x2 - x1, y2 - y1);
            return (
              <g key={n.label}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0,174,239,0.35)"
                  strokeWidth="0.25"
                  strokeDasharray="1 1.4"
                  strokeLinecap="round"
                  className="ed-hub-line"
                  data-visible={inView}
                  style={
                    {
                      ["--dash-len" as string]: `${segLen * 2.5}`,
                      animationDelay: `${0.3 + i * 0.08}s`,
                    } as React.CSSProperties
                  }
                />
                {/* Connection-point dots */}
                <circle cx={x1} cy={y1} r="0.7" fill="rgba(0,174,239,0.55)" />
                <circle cx={x2} cy={y2} r="0.7" fill="rgba(0,174,239,0.55)" />
                {/* Data-flow pulse on two of the lines — slow, subtle */}
                {(i === 1 || i === 5) && (
                  <circle r="0.8" fill="#00AEEF" opacity="0.8">
                    <animateMotion
                      dur={i === 1 ? "4.5s" : "6s"}
                      repeatCount="indefinite"
                      path={`M ${x1} ${y1} L ${x2} ${y2}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Outer category cards */}
        {NODES.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5 + i * 0.07,
            }}
            className="absolute rounded-xl px-3 py-2 text-center"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--ed-card)",
              border: "1px solid var(--ed-rule)",
              minWidth: "108px",
              maxWidth: "130px",
            }}
          >
            <CategoryCard node={n} />
          </motion.div>
        ))}

        {/* Centre hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="absolute rounded-2xl flex items-center justify-center px-6 py-5 text-center"
          style={{
            left: `${CX}%`,
            top: `${CY}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "#0A0A0A",
            color: "#F5EDE0",
            minWidth: "150px",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.25), 0 0 0 6px rgba(0,174,239,0.10)",
          }}
        >
          <HubCardInner />
        </motion.div>
      </div>

      {/* ── Mobile: hub on top, 2-col card grid, no lines ── */}
      <div className="md:hidden">
        <div
          className="rounded-2xl flex items-center justify-center px-6 py-5 text-center mb-4"
          style={{
            backgroundColor: "#0A0A0A",
            color: "#F5EDE0",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.25), 0 0 0 6px rgba(0,174,239,0.10)",
          }}
        >
          <HubCardInner />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {NODES.map((n) => (
            <div
              key={n.label}
              className="rounded-xl px-3 py-3 text-center"
              style={{
                backgroundColor: "var(--ed-card)",
                border: "1px solid var(--ed-rule)",
              }}
            >
              <CategoryCard node={n} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Channel grid ─────────────────────────────────────── */

const CHANNELS: { label: string; emoji: string; extensible?: boolean }[] = [
  { label: "SMS",           emoji: "💬" },
  { label: "WhatsApp",      emoji: "🟢" },
  { label: "Slack",         emoji: "🔷" },
  { label: "Teams",         emoji: "🔵" },
  { label: "Google Chat",   emoji: "💙" },
  { label: "Email",         emoji: "📧" },
  { label: "Web Portal",    emoji: "🖥️" },
  { label: "Mobile App",    emoji: "📱" },
  { label: "Anywhere else", emoji: "✨", extensible: true },
];

/* ─── Section ──────────────────────────────────────────── */

export default function ConnectiveTissueSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section id="integrations" className="w-full ed-bg-alt scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p className="ed-overline mb-8">The Connective Tissue</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Wired into <span className="ed-accent">the stack</span> you
            already run on.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — integrations */}
          <div>
            <p
              className="ed-fg text-4xl md:text-5xl mb-6"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="ed-accent">250+</span> native integrations
            </p>
            <div className="flex flex-wrap gap-2.5 mb-12">
              {["No data migration", "Always up to date", "Guardrailed to your brand"].map(
                (p) => (
                  <span key={p} className="ed-channel-pill">
                    {p}
                  </span>
                )
              )}
            </div>
            <HubDiagram />
          </div>

          {/* Right — channels */}
          <div>
            <p
              className="mb-3 text-xs"
              style={{
                color: "var(--ed-accent)",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Every Channel
            </p>
            <p
              className="ed-fg text-2xl md:text-3xl mb-8 max-w-md"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Deployed in the channels your teams already work in
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CHANNELS.map(({ label, emoji, extensible }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3.5"
                  style={{
                    backgroundColor: extensible
                      ? "rgba(0,174,239,0.08)"
                      : "var(--ed-card)",
                    border: extensible
                      ? "1px solid rgba(0,174,239,0.25)"
                      : "1px solid var(--ed-rule)",
                  }}
                >
                  <span aria-hidden="true" className="text-base">
                    {emoji}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: extensible ? "var(--ed-accent)" : "var(--ed-fg)",
                      fontWeight: 500,
                      fontFamily: "var(--font-editorial)",
                    }}
                  >
                    {extensible ? `+ ${label}` : label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p
              className="ed-fg-muted mt-8 text-base md:text-lg max-w-md"
              style={{ lineHeight: 1.5 }}
            >
              Embedded in your tools and workflows. One platform, every
              surface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
