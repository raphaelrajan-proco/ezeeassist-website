"use client";

import { MONO } from "@/components/platform/shared";

/**
 * §2's dashboard artifact: the three things a franchisor would ask about
 * if they could ask.
 *
 * **The third block attributes causes.** Attach rate rising *because 34
 * locations adopted a script that was already working in the top
 * quartile* is the argument; the same number with no cause is a
 * dashboard, and every competitor has one of those. Do not strip the
 * because-clauses for length.
 *
 * Two figures carry the section and get accent treatment: the spread
 * narrowing, and the year-over-year jump in locations receiving proactive
 * contact. Everything else is context for those two.
 *
 * Deliberately not a card grid. §8 and §9 already carry cards, and this
 * is one artifact rather than three findings.
 */

const ACCENT = "var(--ed-accent-text)";

type Row = { label: string; value: string; accent?: boolean; note?: string };

const WHERE: Row[] = [
  { label: "Top decile",      value: "+8.2%" },
  { label: "Median",          value: "+3.1%" },
  { label: "Bottom quartile", value: "−1.4%" },
  { label: "Spread",          value: "9.6 points", accent: true, note: "Narrowed from 11.2" },
];

const WHO: Row[] = [
  { label: "Locations with proactive contact this month", value: "198 of 214", accent: true },
  { label: "Same period last year",                        value: "64 of 214" },
];

const MOVED: { headline: string; cause?: string }[] = [
  {
    headline: "Attach rate +2.1% network-wide",
    cause: "34 locations adopted the add-on script that was already working in the top quartile",
  },
  { headline: "Compliance completion 94%, from 71%" },
  { headline: "New units to competence: 14 weeks, from 19" },
];

function BlockHead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase"
      style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: "var(--ed-fg-muted)" }}
    >
      {children}
    </p>
  );
}

export default function NetworkView() {
  return (
    <div className="overflow-hidden" style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-border)", borderRadius: 14 }}>
      <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
        <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
          Network · 214 locations · this quarter
        </span>
      </div>

      {/* Where the network is */}
      <div className="px-5 py-6 md:px-6">
        <BlockHead>Where the network is</BlockHead>
        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {WHERE.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4">
              <span className="ed-fg-muted text-[13.5px]">{r.label}</span>
              <span className="flex items-baseline gap-2.5">
                {r.note && (
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: ACCENT }}>{r.note}</span>
                )}
                <span
                  style={{
                    fontFamily: MONO, fontSize: 14, fontVariantNumeric: "tabular-nums",
                    fontWeight: r.accent ? 700 : 500,
                    color: r.accent ? ACCENT : "var(--ed-fg)",
                  }}
                >
                  {r.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Who is getting attention */}
      <div className="px-5 py-6 md:px-6" style={{ borderTop: "1px solid var(--ed-rule)" }}>
        <BlockHead>Who is getting attention</BlockHead>
        <div className="mt-4 flex flex-col gap-3">
          {WHO.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-6">
              <span className="ed-fg-muted min-w-0 text-[13.5px] leading-snug">{r.label}</span>
              <span
                className="flex-none"
                style={{
                  fontFamily: MONO, fontSize: r.accent ? 16 : 14, fontVariantNumeric: "tabular-nums",
                  fontWeight: r.accent ? 700 : 500,
                  color: r.accent ? ACCENT : "var(--ed-fg-muted)",
                }}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* What moved, and why */}
      <div className="px-5 py-6 md:px-6" style={{ borderTop: "1px solid var(--ed-rule)" }}>
        <BlockHead>What moved, and why</BlockHead>
        <div className="mt-4 flex flex-col gap-4">
          {MOVED.map((m) => (
            <div key={m.headline}>
              <p className="ed-fg text-[14.5px] leading-snug" style={{ fontWeight: 600 }}>{m.headline}</p>
              {/* The cause is the point. A number on its own is a dashboard. */}
              {m.cause && <p className="ed-fg-muted mt-1 text-[13.5px] leading-relaxed">{m.cause}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 md:px-6">
        <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--ed-fg-muted)", opacity: 0.75 }}>
          Illustrative
        </span>
      </div>
    </div>
  );
}
