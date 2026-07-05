"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * Section 4 — The Use Case Matrix.
 *
 * Desktop: a 2D matrix — rows are functional domains, columns are the
 * four capability types. Every cell is a hoverable, clickable example
 * phrased as what a real operator would ask or say.
 *
 * Mobile: four capability tabs; tapping shows the six domain use cases
 * as a vertical list.
 */

const CAPABILITIES = ["Answers", "Actions", "Agents", "Apps"] as const;
type Capability = (typeof CAPABILITIES)[number];

type DomainRow = {
  domain: string;
  cells: Record<Capability, string>;
};

const MATRIX: DomainRow[] = [
  {
    domain: "Support",
    cells: {
      Answers: "Where's the current BOGO flyer?",
      Actions: "Log this issue in the ticketing system",
      Agents: "Auto-triage incoming questions",
      Apps: "Franchisee support portal, built to your brand",
    },
  },
  {
    domain: "Growth Coaching",
    cells: {
      Answers: "What are my location's top three drop-off points?",
      Actions: "Draft a coaching plan for this franchisee",
      Agents: "Weekly KPI review, emailed to coaches Monday 8am",
      Apps: "Growth playbook app, personalized per location",
    },
  },
  {
    domain: "Compliance",
    cells: {
      Answers: "Are all my locations current on insurance?",
      Actions: "Flag missing docs to the compliance team",
      Agents: "Nightly compliance sweep across the network",
      Apps: "Compliance dashboard, live per location",
    },
  },
  {
    domain: "Operations",
    cells: {
      Answers: "What's the SOP for a walk-in HVAC repair?",
      Actions: "Reschedule tomorrow's install and notify the customer",
      Agents: "Auto-order inventory when par levels drop",
      Apps: "Daily closing audit app, built from one prompt",
    },
  },
  {
    domain: "Marketing",
    cells: {
      Answers: "Which promo performed best across the network?",
      Actions: "Push the new brand asset to all locations",
      Agents: "Local campaign personalization, weekly",
      Apps: "Location-specific landing page generator",
    },
  },
  {
    domain: "Training",
    cells: {
      Answers: "How do I run the new onboarding checklist?",
      Actions: "Assign this training to new hires at Store 214",
      Agents: "Ongoing skills gap analysis per location",
      Apps: "Interactive training modules from your SOPs",
    },
  },
];

/* ─── Matrix cell (desktop) ────────────────────────────── */

function MatrixCell({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="h-full"
    >
      <Link
        href="#book-demo"
        className="group flex h-full items-start justify-between gap-2 rounded-xl px-4 py-4 transition-colors duration-200"
        style={{
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
        }}
      >
        <span
          className="ed-fg text-[13px]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          &ldquo;{text}&rdquo;
        </span>
        <span
          className="ed-accent text-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function UseCaseMatrix() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Capability>("Answers");

  return (
    <section id="use-cases" className="w-full ed-bg scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p className="ed-overline mb-8">Use Cases</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            The AI work living in scattered tabs today.{" "}
            <span className="ed-accent">
              Now built once, used across your network.
            </span>
          </h2>
        </motion.div>

        {/* ── Desktop matrix (md+) ─────────────────────── */}
        <div className="hidden md:block">
          {/* Column headers */}
          <div className="grid grid-cols-[140px_repeat(4,1fr)] gap-3 mb-3">
            <div />
            {CAPABILITIES.map((c, i) => (
              <motion.p
                key={c}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="ed-accent text-xs px-1"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {c}
              </motion.p>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {MATRIX.map((row, ri) => (
              <div
                key={row.domain}
                className="grid grid-cols-[140px_repeat(4,1fr)] gap-3 items-stretch"
              >
                <motion.p
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: ri * 0.06 }}
                  className="ed-fg text-sm self-center"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {row.domain}
                </motion.p>
                {CAPABILITIES.map((c, ci) => (
                  <MatrixCell
                    key={c}
                    text={row.cells[c]}
                    delay={ri * 0.06 + ci * 0.04}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile tabs (< md) ───────────────────────── */}
        <div className="md:hidden">
          {/* Tab strip */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 mb-6"
            style={{ scrollbarWidth: "none" }}
          >
            {CAPABILITIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveTab(c)}
                className="flex-shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-200"
                style={
                  activeTab === c
                    ? {
                        backgroundColor: "var(--ed-accent)",
                        color: "#FFFFFF",
                        fontWeight: 500,
                      }
                    : {
                        backgroundColor: "var(--ed-card)",
                        border: "1px solid var(--ed-rule)",
                        color: "var(--ed-fg-muted)",
                        fontWeight: 500,
                      }
                }
              >
                {c}
              </button>
            ))}
          </div>

          {/* Use case list for active tab */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-2.5"
            >
              {MATRIX.map((row) => (
                <Link
                  key={row.domain}
                  href="#book-demo"
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                  style={{
                    backgroundColor: "var(--ed-card)",
                    border: "1px solid var(--ed-rule)",
                  }}
                >
                  <span
                    className="ed-fg-muted text-[10px] mt-1 flex-shrink-0"
                    style={{
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      minWidth: "72px",
                    }}
                  >
                    {row.domain}
                  </span>
                  <span
                    className="ed-fg text-sm"
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontStyle: "italic",
                      lineHeight: 1.4,
                    }}
                  >
                    &ldquo;{row.cells[activeTab]}&rdquo;
                  </span>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="ed-fg-muted mt-10 text-sm md:text-base"
        >
          Every cell is an example.{" "}
          <span className="ed-fg" style={{ fontWeight: 500 }}>
            Your brand builds what your network actually needs.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
