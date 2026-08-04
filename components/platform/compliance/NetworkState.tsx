"use client";

import { MONO } from "@/components/platform/shared";

/**
 * The hero artifact: the whole network's compliance state, right now.
 *
 * **`LIVE` in the header carries the page's central claim.** An audit app
 * shows you a report date; this shows a state, so the word gets accent
 * treatment and nothing else in the header competes with it.
 *
 * **The three tiers must be readable without colour.** Each carries a
 * distinct marker shape, its own type weight, and a count at its own size,
 * so the hierarchy survives greyscale and colour-blind reading
 * (DESIGN.md §4.3). Colour is the third signal, not the only one.
 *
 * Sits on the hero photograph, so colours are the on-photograph palette
 * from DESIGN.md §4.4 rather than the page tokens.
 */

const ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const ON_IMAGE_DIM = "rgba(245,237,224,0.55)";
const RULE = "rgba(245,237,224,0.16)";
const WARN = "#F5B26B";
const DANGER = "#FF9E8A";

type Tier = {
  label: string;
  count: number;
  detail: string;
  colour: string;
  /** Shape, not just colour: filled, half, hollow. */
  marker: "solid" | "half" | "hollow";
  weight: number;
};

const TIERS: Tier[] = [
  { label: "Holding",     count: 187, detail: "All current",                            colour: ACCENT, marker: "solid",  weight: 500 },
  { label: "At risk",     count: 19,  detail: "Due within 30 days · owners notified",   colour: WARN,   marker: "half",   weight: 600 },
  { label: "Not current", count: 8,   detail: "Chased 4 days · 2 escalated to HQ",      colour: DANGER, marker: "hollow", weight: 700 },
];

const TERRITORIES: { name: string; locations: number; note: string }[] = [
  { name: "West",    locations: 42, note: "3 at risk" },
  { name: "Central", locations: 58, note: "7 at risk · 2 not current" },
  { name: "East",    locations: 61, note: "5 at risk" },
  { name: "South",   locations: 53, note: "4 at risk · 6 not current" },
];

function Marker({ kind, colour }: { kind: Tier["marker"]; colour: string }) {
  if (kind === "solid") {
    return <span aria-hidden="true" className="h-[10px] w-[10px] flex-none rounded-full" style={{ backgroundColor: colour }} />;
  }
  if (kind === "half") {
    return (
      <span
        aria-hidden="true"
        className="h-[10px] w-[10px] flex-none overflow-hidden rounded-full"
        style={{ border: `1.5px solid ${colour}` }}
      >
        <span className="block h-full w-1/2" style={{ backgroundColor: colour }} />
      </span>
    );
  }
  return <span aria-hidden="true" className="h-[10px] w-[10px] flex-none rounded-full" style={{ border: `1.5px solid ${colour}` }} />;
}

export default function NetworkState() {
  return (
    <div
      className="w-full max-w-[620px] overflow-hidden rounded-[14px]"
      style={{
        backgroundColor: "rgba(4,26,44,0.55)",
        border: `1px solid ${RULE}`,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div className="flex items-baseline gap-2 px-5 py-3.5" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span
          className="uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_IMAGE_DIM }}
        >
          Network · 214 locations ·
        </span>
        {/* The state claim, in one word. */}
        <span
          className="uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", fontWeight: 700, color: ACCENT }}
        >
          Live
        </span>
      </div>

      <div className="px-5 py-1">
        {TIERS.map((t, i) => (
          <div
            key={t.label}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3.5"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${RULE}` }}
          >
            <span className="flex items-center gap-2.5">
              <Marker kind={t.marker} colour={t.colour} />
              <span
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.13em", fontWeight: t.weight, color: t.colour }}
              >
                {t.label}
              </span>
            </span>
            <span
              className="ml-auto"
              style={{
                fontFamily: MONO, fontSize: 19, fontWeight: 700, lineHeight: 1,
                color: t.colour, fontVariantNumeric: "tabular-nums",
              }}
            >
              {t.count}
            </span>
            <span className="w-full text-[12.5px] leading-snug" style={{ color: ON_IMAGE_DIM }}>
              {t.detail}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 pb-4 pt-3" style={{ borderTop: `1px solid ${RULE}` }}>
        {TERRITORIES.map((t) => (
          <div key={t.name} className="flex items-baseline gap-3 py-[5px]">
            <span
              className="flex-none"
              style={{ fontFamily: MONO, fontSize: 11, color: ON_IMAGE, width: 62 }}
            >
              {t.name}
            </span>
            <span
              className="flex-none"
              style={{ fontFamily: MONO, fontSize: 11, color: ON_IMAGE_DIM, width: 84, fontVariantNumeric: "tabular-nums" }}
            >
              {t.locations} loc
            </span>
            <span className="min-w-0 flex-1 text-[12px] leading-snug" style={{ color: ON_IMAGE_DIM }}>
              {t.note}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 pb-4">
        <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(245,237,224,0.4)" }}>
          Illustrative
        </span>
      </div>
    </div>
  );
}
