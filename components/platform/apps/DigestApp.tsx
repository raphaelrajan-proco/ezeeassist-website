import { JAKARTA, MONO } from "@/components/platform/shared";

/**
 * The daily upsell digest, the app that went live at 4:05.
 *
 * The timeline on the left says an app got built; this is that app. The
 * old five-column layout never showed it, which is what the rebuild is
 * for.
 *
 * **Fixed light palette in both themes**, same rule as the hero build mock
 * and the swim-school phone on this page: it is a screenshot of somebody
 * else's product, and that product does not follow this site's dark mode.
 * Every hex here is literal on purpose. Do not swap them for `--ed-*`.
 *
 * **The teal is deliberate and is not the site accent.** The whole point
 * of the section is that a franchise brand describes a tool and gets its
 * own tool, so the screen reads as a white-labeled spa brand rather than
 * as EZee blue. Do not recolour it to the accent.
 *
 * The header name stays generic ("Spa & Wellness"). It is a stand-in for
 * any brand, not a customer, and naming a real one would make the mock a
 * claim about that customer.
 *
 * Wholly decorative: `aria-hidden` at the root, nothing focusable, no
 * announced controls. Every fact it shows is stated in the timeline copy
 * beside it.
 *
 * ── Deviation from the handoff ──────────────────────────────
 * The handoff specifies 8.5px and 10.5px mono labels. **This system
 * enforces a 12px type floor**, globally, with `!important`, over inline
 * styles as well as classes, so those sizes cannot render as written; they
 * would silently arrive as 12px anyway. They are authored at 12px here so
 * the file says what ships. The card is laid out around that: tracking is
 * eased off the mono labels and the footer is allowed to wrap, which is
 * what pays for the extra width. Do not reintroduce the smaller numbers.
 */

const TEAL_DEEP = "#0B5B54";
const TEAL = "#14877C";
const TEAL_INK = "#0F766E";
const TEAL_WASH = "#E5F2F0";
const INK = "#101418";
const INK_MUTED = "#6B7480";
const INK_BODY = "#3D4652";
const RULE = "#EDF0F2";

const GUESTS = [
  {
    initials: "MK",
    name: "Maya K.",
    meta: "10:30 · Deep tissue 60",
    visits: "6 VISITS",
    point: "Due for monthly membership, saves her 18% on today's service",
  },
  {
    initials: "JR",
    name: "Jordan R.",
    meta: "1:15 · Signature facial",
    visits: "8 VISITS",
    point: "Suggest the LED add-on, booked it in March and rated it 5 stars",
  },
  {
    initials: "AS",
    name: "Alicia S.",
    meta: "4:00 · Hot stone 90",
    visits: "4 VISITS",
    point: "Package expires this month, two sessions left to schedule",
  },
];

export default function DigestApp() {
  return (
    <div
      className="w-full overflow-hidden rounded-[18px]"
      style={{
        maxWidth: 420,
        background: "#FFFFFF",
        boxShadow: "0 30px 64px -30px rgba(12,20,36,.5)",
      }}
      aria-hidden="true"
    >
      {/* App header */}
      <div
        className="flex items-center gap-[11px] px-[18px] py-4"
        style={{ background: `linear-gradient(120deg, ${TEAL_DEEP}, ${TEAL})` }}
      >
        {/* The brand's own initial, not EZee's. This mock belongs to the
            spa, so an EZee mark here would misread it as our product. */}
        <span
          className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px]"
          style={{ background: "rgba(255,255,255,.16)", color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 800, fontSize: 14 }}
        >
          S
        </span>
        <span className="flex min-w-0 flex-col">
          <span style={{ fontFamily: JAKARTA, fontSize: 14.5, fontWeight: 700, color: "#FFFFFF" }}>
            Spa &amp; Wellness
          </span>
          <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,.75)" }}>
            DAILY UPSELL DIGEST
          </span>
        </span>
        <span
          className="ml-auto flex-none whitespace-nowrap rounded-full px-2.5 py-1"
          style={{ background: "rgba(255,255,255,.18)", color: "#FFFFFF", fontFamily: MONO, fontSize: 12, fontWeight: 700 }}
        >
          TODAY · 7:00AM
        </span>
      </div>

      {/* Summary row */}
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-4 py-[13px]">
        <span style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 800, color: INK }}>3 of 9</span>
        <span className="text-[12.5px]" style={{ color: INK_MUTED }}>
          appointments today are members due for an upsell
        </span>
      </div>

      {/* Guest rows */}
      {GUESTS.map((g) => (
        <div key={g.initials} className="flex flex-col gap-[7px] px-4 py-3" style={{ borderTop: `1px solid ${RULE}` }}>
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 flex-none items-center justify-center rounded-full"
              style={{ background: TEAL_WASH, color: TEAL_INK, fontFamily: JAKARTA, fontSize: 12, fontWeight: 700 }}
            >
              {g.initials}
            </span>
            {/* min-w-0 so the meta line is what wraps under 360px, never
                the pill. The pill stays on the name's line by contract. */}
            <span className="flex min-w-0 flex-col">
              <span className="text-[13px] font-semibold" style={{ color: INK }}>{g.name}</span>
              <span className="text-[12px]" style={{ color: INK_MUTED }}>{g.meta}</span>
            </span>
            <span
              className="ml-auto flex-none whitespace-nowrap rounded-full px-2 py-[3px]"
              style={{ background: TEAL_WASH, color: TEAL_INK, fontFamily: MONO, fontSize: 12, fontWeight: 700 }}
            >
              {g.visits}
            </span>
          </div>
          <span
            className="block text-[12px] leading-[1.5]"
            style={{
              color: INK_BODY,
              background: "#F6F9F8",
              borderLeft: `2px solid ${TEAL_INK}`,
              borderRadius: "0 8px 8px 0",
              padding: "7px 10px",
            }}
          >
            {g.point}
          </span>
        </div>
      ))}

      {/* Footer */}
      <div
        className="flex items-start gap-2 px-4 py-[11px]"
        style={{ borderTop: `1px solid ${RULE}`, background: "#FAFBFC" }}
      >
        <span className="mt-[5px] h-[7px] w-[7px] flex-none rounded-full" style={{ background: "#12A150" }} />
        <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em", lineHeight: 1.45, color: INK_MUTED }}>
          LIVE AT 12 LOCATIONS · SENT TO EACH MANAGER DAILY
        </span>
      </div>
    </div>
  );
}
