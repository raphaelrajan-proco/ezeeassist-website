"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";

/**
 * The hero's phone chat mock, replacing the flat answer card.
 *
 * Fixed light palette in both themes: it is a white phone sitting on a
 * dark band, and a phone does not follow this site's dark mode.
 *
 * Decorative throughout. Nothing here is a real control, so the send
 * glyph and battery are `aria-hidden` and the "input" is a styled span
 * rather than an `<input>`, which keeps it out of the tab order and off
 * the accessibility tree as a form field.
 *
 * **Type sizes are the site's 12px floor, not the prototype's.** The
 * handoff draws this at 8.5 to 10.5px for the meta lines and chips.
 * Those are below the floor the regression guard enforces, and the floor
 * exists because that text is still read. Everything is at 12px or above
 * and the shell grew from 310px to 330px to absorb it; the proportions
 * and the stacking order are otherwise the handoff's.
 */

const INK = "#0A0A0A";
const FAINT = "#A1A1AA";
const RULE = "#E5E7EB";
const ACCENT = "#0077A8";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="whitespace-nowrap rounded-md"
      style={{
        fontFamily: MONO, fontSize: 12, padding: "4px 8px",
        background: "rgba(0,119,168,.06)", border: "1px solid rgba(0,119,168,.22)", color: ACCENT,
      }}
    >
      {children}
    </span>
  );
}

export default function PhoneMock() {
  return (
    <div className="flex justify-center">
      <div
        className="w-full max-w-[330px] rounded-[30px] p-3.5"
        style={{ background: "#FFFFFF", boxShadow: "0 34px 80px -30px rgba(3,16,40,.8)" }}
      >
        <div className="flex items-center justify-between px-2.5 pb-2.5 pt-1">
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: INK }}>9:14</span>
          <span
            className="inline-block h-2 w-4 rounded-[2.5px]"
            style={{ border: `1.5px solid ${FAINT}` }}
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center gap-2.5 px-2.5 pb-3" style={{ borderBottom: "1px solid #EEF0F4" }}>
          <span
            className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9px]"
            style={{ background: ACCENT, color: "#FFFFFF", fontFamily: JAKARTA, fontSize: 14, fontWeight: 800 }}
            aria-hidden="true"
          >
            E
          </span>
          <span className="flex flex-col">
            <span style={{ fontFamily: JAKARTA, fontSize: 14, fontWeight: 700, color: INK }}>EZee Assist</span>
            <span className="flex items-center gap-1.5" style={{ fontSize: 12, color: "#0D7C58" }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#0D7C58" }} aria-hidden="true" />
              Always on
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-2.5 rounded-b-[18px] px-3 py-3.5" style={{ background: "#F6F8FB" }}>
          <span className="text-center" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: FAINT }}>
            STORE #118 · SHIFT LEAD · 9:14AM
          </span>

          <p
            className="max-w-[240px] self-end px-3 py-2.5 text-[12.5px] leading-[1.5]"
            style={{ background: INK, color: "#FFFFFF", borderRadius: "15px 15px 4px 15px" }}
          >
            Can I run the summer promo alongside the loyalty offer?
          </p>

          <div
            className="flex max-w-[262px] flex-col gap-2 self-start px-3 py-2.5"
            style={{ background: "#FFFFFF", border: `1px solid ${RULE}`, borderRadius: "15px 15px 15px 4px" }}
          >
            <span className="text-[12.5px] leading-[1.55]" style={{ color: INK }}>
              No. Promotions don&rsquo;t stack with loyalty redemptions. Apply the higher of the two
              and note it at close.
            </span>
            <span className="flex flex-wrap gap-1.5">
              <Chip>summer-promo-guide.pdf</Chip>
              <Chip>loyalty-policy.pdf</Chip>
            </span>
          </div>

          <span className="self-start pl-1" style={{ fontSize: 12, color: FAINT }}>answered in 6s</span>

          <p
            className="max-w-[240px] self-end px-3 py-2.5 text-[12.5px] leading-[1.5]"
            style={{ background: INK, color: "#FFFFFF", borderRadius: "15px 15px 4px 15px" }}
          >
            Perfect, thanks!
          </p>

          {/* A styled span, not an input: the mock must not land in the
              tab order or read as a form field. */}
          <div
            className="mt-1 flex items-center gap-2.5 rounded-full py-2 pl-4 pr-2"
            style={{ background: "#FFFFFF", border: `1px solid ${RULE}` }}
          >
            <span className="flex-1" style={{ fontSize: 12, color: FAINT }}>Ask anything&hellip;</span>
            <span
              className="flex h-[27px] w-[27px] flex-none items-center justify-center rounded-full"
              style={{ background: ACCENT, color: "#FFFFFF" }}
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5" />
                <path d="M6 11l6-6 6 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
