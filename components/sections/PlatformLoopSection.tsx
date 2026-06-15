"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Full human-AI loop across the platform.
 *
 * Three columns — Ticketing, Control Center, Observability & Analytics —
 * each with a mini mockup styled in the editorial cream-on-cream cards.
 * Mirrors the deck slide showing the platform's depth.
 */

/* ─── Shared primitives ────────────────────────────────── */

function CardOverline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] mb-3"
      style={{
        color: "#1B5A6E",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

/* ─── Mockup 1: Ticketing ──────────────────────────────── */

function TicketingMockup() {
  const tickets = [
    { id: "#18642", text: "Where do I find the latest brand assets?", tag: "AI resolved",  tagColor: "#16A34A" },
    { id: "#18640", text: "Update a member's billing details",        tag: "Escalated",   tagColor: "#D97706" },
    { id: "#18637", text: "POS isn't syncing at my location",          tag: "Open",        tagColor: "#1B5A6E" },
    { id: "#18633", text: "Quiz me on the new training module",        tag: "AI resolved", tagColor: "#16A34A" },
  ];
  return (
    <div
      className="rounded-3xl p-6"
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <CardOverline>My Tickets (16)</CardOverline>
        <span
          className="text-[10px] rounded-full px-2 py-0.5"
          style={{
            backgroundColor: "rgba(0,174,239,0.10)",
            color: "#00AEEF",
            fontWeight: 600,
          }}
        >
          ● Open (8)
        </span>
      </div>
      <div className="space-y-2">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5"
            style={{
              backgroundColor: "var(--ed-bg-alt)",
              border: "1px solid var(--ed-rule)",
            }}
          >
            <div className="flex items-start gap-2 min-w-0">
              <span
                className="ed-fg-muted text-[10px] mt-0.5"
                style={{ fontWeight: 600, letterSpacing: "0.08em" }}
              >
                {t.id}
              </span>
              <p
                className="ed-fg text-[12px] truncate"
                style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.4 }}
              >
                {t.text}
              </p>
            </div>
            <span
              className="text-[9px] flex-shrink-0"
              style={{
                color: t.tagColor,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup 2: Control Center ─────────────────────────── */

function ControlCenterMockup() {
  const toggles = [
    { text: "Approve AI actions before execution", on: true  },
    { text: "Role-based content access",            on: true  },
    { text: "Location-level permissions",            on: true  },
    { text: "Department routing & escalations",     on: false },
  ];
  return (
    <div
      className="rounded-3xl p-6"
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      <CardOverline>Admin &amp; Access</CardOverline>

      {/* Role pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {["HQ admin", "Coach", "Zee"].map((r) => (
          <span
            key={r}
            className="text-[10px] rounded-full px-2.5 py-0.5"
            style={{
              backgroundColor: "rgba(0,174,239,0.10)",
              color: "#00AEEF",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {r}
          </span>
        ))}
      </div>

      {/* Toggles */}
      <div className="space-y-2.5">
        {toggles.map((t) => (
          <div
            key={t.text}
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
            style={{
              backgroundColor: "var(--ed-bg-alt)",
              border: "1px solid var(--ed-rule)",
            }}
          >
            <p
              className="ed-fg text-[12px] flex-1"
              style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.35 }}
            >
              {t.text}
            </p>
            <span
              className="flex items-center justify-center h-5 w-9 rounded-full"
              style={{
                backgroundColor: t.on ? "#00AEEF" : "rgba(10,10,10,0.12)",
                transition: "background-color 0.2s ease",
              }}
            >
              <span
                className="block h-3.5 w-3.5 rounded-full bg-white"
                style={{
                  transform: t.on ? "translateX(8px)" : "translateX(-8px)",
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup 3: Observability ──────────────────────────── */

function ObservabilityMockup() {
  const bars = [40, 52, 48, 62, 70, 78, 88];
  const reco = [
    { text: "Refund policy SOP — asked 32×, no doc", action: "+ Add"  },
    { text: "Holiday hours playbook — trending",      action: "Update" },
  ];
  return (
    <div
      className="rounded-3xl p-6"
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <CardOverline>Weekly interactions</CardOverline>
        <span
          className="text-[11px] flex items-center gap-1"
          style={{ color: "#16A34A", fontWeight: 600, letterSpacing: "0.06em" }}
        >
          ▲ 23%
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-20 mb-5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1 + i * 0.06,
            }}
            className="flex-1 rounded-t"
            style={{
              backgroundColor: i === bars.length - 1 ? "#00AEEF" : "rgba(0,174,239,0.3)",
              height: `${h}%`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>

      <CardOverline>Recommended content</CardOverline>
      <div className="space-y-2">
        {reco.map((r) => (
          <div
            key={r.text}
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-2"
            style={{
              backgroundColor: "var(--ed-bg-alt)",
              border: "1px solid var(--ed-rule)",
            }}
          >
            <p
              className="ed-fg text-[12px]"
              style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.35 }}
            >
              {r.text}
            </p>
            <span
              className="text-[10px] rounded-full px-2 py-0.5 flex-shrink-0"
              style={{
                backgroundColor: "rgba(0,174,239,0.10)",
                color: "#00AEEF",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {r.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Column config ────────────────────────────────────── */

const columns = [
  {
    label: "Ticketing",
    mockup: <TicketingMockup />,
    caption: "Every interaction triaged. AI resolves, human in the loop.",
  },
  {
    label: "Control Center",
    mockup: <ControlCenterMockup />,
    caption: "You decide who sees what, and what AI can execute.",
  },
  {
    label: "Observability & Analytics",
    mockup: <ObservabilityMockup />,
    caption: "See usage live. EZee flags the content gaps to fill next.",
  },
];

/* ─── Section ──────────────────────────────────────────── */

export default function PlatformLoopSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">The Platform</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Full <span className="ed-accent">human-AI loop</span> across the platform.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
          {columns.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
              className="flex flex-col"
            >
              <p
                className="ed-fg-muted text-xs mb-5"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {c.label}
              </p>
              {c.mockup}
              <p
                className="ed-fg-muted mt-6 text-base md:text-lg"
                style={{ lineHeight: 1.45 }}
              >
                {c.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
