"use client";

import { motion } from "framer-motion";
import { MOCK_SURFACE } from "@/components/growth/shared";

/**
 * The Monday coach brief. The centrepiece of the field-coaches page and
 * the one artifact the homepage does not have.
 *
 * Two variants off one data set, per the handoff: `full` renders the three
 * triage tiers plus the "since you last spoke" block, and `compact` renders
 * the header and the three Tier 1 rows for the hero. The brief is built
 * once and read twice; do not fork a second copy of this markup.
 *
 * The tiers must stay distinguishable without relying on colour: each one
 * carries a different edge weight, a different marker glyph, and its own
 * label, so the ranking survives greyscale and colour-blind viewing.
 *
 * Numbers are illustrative and labelled as such in the caption. Do not
 * swap them for a customer's real figures without permission.
 */

const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

/* Accent that carries white text and reads on white at small sizes.
   #00AEEF fails both tests; see DESIGN.md. */
const ACCENT = "#0077A8";

type Row = {
  id: string;
  finding: string;
  note: string;
  /** The recommended next move, rendered secondary to the row it belongs to. */
  action?: string;
};

const NEEDS_YOU: Row[] = [
  {
    id: "#402",
    finding: "Ramp behind cohort, week 6",
    note: "New owner · first coaching call",
    action: "What the fastest 10 openings did in week 6",
  },
  {
    id: "#331",
    finding: "Bookings 62% vs 80% target",
    note: "Third soft week",
    action: "Reactivation draft ready, 340 lapsed clients",
  },
  { id: "#519", finding: "Labour 14% over standard", note: "Two weeks running" },
];

const WATCH: Row[] = [
  { id: "#118", finding: "Attach rate down 6%", note: "Trending, not yet material" },
  { id: "#263", finding: "Insurance expires in 14 days", note: "Owner notified, task open" },
];

const HOLDING: Row[] = [
  { id: "#052", finding: "All current", note: "Last contact 9 days ago" },
];

const SINCE_YOU_LAST_SPOKE: { id: string; text: string }[] = [
  { id: "#331", text: "Owner approved and sent the reactivation offer Friday" },
  { id: "#214", text: "Built a closing audit, now running at 214 locations" },
  { id: "#087", text: "Refund escalation resolved, policy cited" },
];

/** Tier marker: filled, half, and hollow, so rank survives greyscale. */
function Marker({ tier }: { tier: 1 | 2 | 3 }) {
  const size = tier === 3 ? 6 : 8;
  return (
    <span
      aria-hidden="true"
      className="inline-block flex-none"
      style={{
        width: size,
        height: size,
        borderRadius: 2,
        border: `1.5px solid ${tier === 1 ? ACCENT : "#52525B"}`,
        backgroundColor: tier === 1 ? ACCENT : tier === 2 ? "#A1A1AA" : "transparent",
      }}
    />
  );
}

function TierLabel({ tier, children }: { tier: 1 | 2 | 3; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Marker tier={tier} />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: tier === 1 ? ACCENT : "#52525B",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function BriefRow({ row, tier }: { row: Row; tier: 1 | 2 | 3 }) {
  /* Edge weight is the second, non-colour signal of rank. */
  const edge =
    tier === 1
      ? { borderLeft: `3px solid ${ACCENT}` }
      : tier === 2
        ? { borderLeft: "3px solid #D4D4D8" }
        : { borderLeft: "1px dashed #D4D4D8" };

  return (
    <div className="py-2.5 pl-3" style={edge}>
      <div className="flex items-baseline gap-3">
        <span
          className="flex-none"
          style={{
            fontFamily: MONO,
            fontSize: 12.5,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            color: tier === 3 ? "#71717A" : "#0A0A0A",
          }}
        >
          {row.id}
        </span>
        {/* Finding and note share a line from md up and stack below it, a
            deliberate two-line layout rather than an accidental wrap. */}
        <div className="flex flex-1 flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4">
          <span
            style={{
              fontSize: 13.5,
              fontWeight: tier === 1 ? 600 : 500,
              lineHeight: 1.4,
              color: tier === 3 ? "#71717A" : "#0A0A0A",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.finding}
          </span>
          <span
            className="md:text-right"
            style={{
              fontSize: 12,
              lineHeight: 1.4,
              color: "#71717A",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.note}
          </span>
        </div>
      </div>

      {row.action && (
        <div className="mt-1.5 flex items-baseline gap-1.5 pl-[3.15rem]">
          <span aria-hidden="true" style={{ fontSize: 11, color: ACCENT, lineHeight: 1.4 }}>
            &rarr;
          </span>
          <span style={{ fontSize: 12, lineHeight: 1.4, color: ACCENT, fontWeight: 500 }}>
            {row.action}
          </span>
        </div>
      )}
    </div>
  );
}

export default function CoachBrief({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      style={MOCK_SURFACE}
      className={compact ? "w-full p-4 md:p-5" : "w-full p-5 md:p-7"}
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center gap-x-2 gap-y-1 pb-3"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: compact ? 9.5 : 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#0A0A0A",
          }}
        >
          West Territory
        </span>
        <span aria-hidden="true" style={{ color: "#A1A1AA", fontSize: 10 }}>·</span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: compact ? 9.5 : 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#52525B",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          Monday 7:00am
        </span>
        <span aria-hidden="true" style={{ color: "#A1A1AA", fontSize: 10 }}>·</span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: compact ? 9.5 : 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#52525B",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          12 Locations
        </span>
      </div>

      {/* Tier 1 */}
      <div className="pt-4">
        <TierLabel tier={1}>Needs you this week</TierLabel>
        <div className="flex flex-col gap-1">
          {NEEDS_YOU.map((r) => (
            <BriefRow key={r.id} row={r} tier={1} />
          ))}
        </div>
      </div>

      {!compact && (
        <>
          {/* Tier 2 */}
          <div className="pt-5">
            <TierLabel tier={2}>Watch</TierLabel>
            <div className="flex flex-col gap-1">
              {WATCH.map((r) => (
                <BriefRow key={r.id} row={r} tier={2} />
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div className="pt-5">
            <TierLabel tier={3}>Holding</TierLabel>
            <div className="flex flex-col gap-1">
              {HOLDING.map((r) => (
                <BriefRow key={r.id} row={r} tier={3} />
              ))}
              <p className="py-1.5 pl-[1.05rem]" style={{ fontSize: 12, color: "#A1A1AA" }}>
                + 6 more
              </p>
            </div>
          </div>

          {/* Its own block below the tiers, with its own divider. This is not
              a fourth tier and must never be merged into Holding. */}
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid #E5E7EB" }}>
            <div className="mb-2.5">
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
                Since you last spoke
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {SINCE_YOU_LAST_SPOKE.map((r) => (
                <div key={r.id} className="flex items-baseline gap-3">
                  <span
                    className="flex-none"
                    style={{
                      fontFamily: MONO,
                      fontSize: 12.5,
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                      color: "#0A0A0A",
                    }}
                  >
                    {r.id}
                  </span>
                  <span style={{ fontSize: 13, lineHeight: 1.45, color: "#52525B" }}>
                    {r.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
