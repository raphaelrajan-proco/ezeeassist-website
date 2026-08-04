"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_SURFACE } from "@/components/growth/shared";

/**
 * Section 6: one play described in a sentence, running differently at four
 * locations.
 *
 * The variation between the four rows is the entire argument. If they were
 * normalised into one uniform outcome the section would read as a mass
 * email, so each row ends on a different result and that result carries the
 * visual weight. Do not tidy them into a consistent shape.
 *
 * The left panel is deliberately a sentence, not a builder UI. A coach who
 * thinks they have to configure nodes and dropdowns stops reading.
 */

const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#0077A8";

const PLAY =
  "When next week drops below 70% booked, check what campaigns are running and pull the lapsed client list. Draft the reactivation offer. Hold it for the owner to approve, and tell me it went out.";

const LOCATIONS: { id: string; booked: string; context: string; outcome: string }[] = [
  { id: "#331", booked: "62% booked", context: "draft ready", outcome: "owner approved Friday" },
  { id: "#052", booked: "58% booked", context: "seasonal threshold set by HQ", outcome: "no action taken" },
  { id: "#118", booked: "66% booked", context: "promo already running", outcome: "suggested extending it" },
  { id: "#402", booked: "51% booked", context: "new owner, week six", outcome: "escalated to you with context" },
];

export default function PlayGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mt-10"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Left: what the coach types. A sentence, not an interface. */}
        <div style={MOCK_SURFACE} className="flex flex-col p-6 md:p-7">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#52525B",
            }}
          >
            You describe it once
          </span>
          <p
            className="mt-4 flex-1"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontSize: "clamp(1rem, 0.6rem + 0.8vw, 1.25rem)",
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              color: "#0A0A0A",
            }}
          >
            &ldquo;{PLAY}&rdquo;
          </p>
          <span
            className="mt-5"
            style={{ fontSize: 12.5, color: "#71717A", lineHeight: 1.5 }}
          >
            Plain language. No fields to configure.
          </span>
        </div>

        {/* Right: what it did at four locations. */}
        <div style={MOCK_SURFACE} className="flex flex-col p-6 md:p-7">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#52525B",
            }}
          >
            What happened, location by location
          </span>

          <div className="mt-4 flex flex-1 flex-col">
            {LOCATIONS.map((loc, i) => (
              <div
                key={loc.id}
                className="flex flex-col gap-1 py-3 md:flex-row md:items-baseline md:gap-3"
                style={i > 0 ? { borderTop: "1px solid #E5E7EB" } : undefined}
              >
                <span
                  className="flex-none"
                  style={{
                    fontFamily: MONO,
                    fontSize: 12.5,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    color: "#0A0A0A",
                    minWidth: "2.75rem",
                  }}
                >
                  {loc.id}
                </span>
                <span
                  className="flex-none"
                  style={{
                    fontFamily: MONO,
                    fontSize: 12.5,
                    fontVariantNumeric: "tabular-nums",
                    color: "#52525B",
                    minWidth: "5.5rem",
                  }}
                >
                  {loc.booked}
                </span>
                <span
                  className="flex-1"
                  style={{ fontSize: 13, lineHeight: 1.45, color: "#52525B" }}
                >
                  {loc.context}
                  <span aria-hidden="true" style={{ color: "#A1A1AA" }}> · </span>
                  {/* The outcome is what differs, so the outcome is what carries
                      the weight. */}
                  <span style={{ color: ACCENT, fontWeight: 600 }}>{loc.outcome}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The payoff, full width under both panels. */}
      <div className="mt-8 max-w-3xl">
        <p
          className="ed-fg"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            fontSize: "clamp(1.125rem, 0.5rem + 1.4vw, 1.625rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          Four locations. One play. None of them treated the same.
        </p>
        <p
          className="ed-fg mt-1"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            fontSize: "clamp(1.125rem, 0.5rem + 1.4vw, 1.625rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          It ran at 214 more before you were awake.
        </p>
        <p className="ed-fg-muted mt-5 text-sm">
          HQ approves what publishes network-wide.{" "}
          <Link href="/platform/control-center" className="ed-link" style={{ fontWeight: 500 }}>
            Control Center
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
