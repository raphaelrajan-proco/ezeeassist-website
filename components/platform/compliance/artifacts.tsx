"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import { LADDER, NETWORK_STATE, REGIONS, WRITE_BACK } from "./data";

/**
 * The Compliance page's three artifacts.
 *
 * The hero card and the chase ladder sit on dark bands and use the
 * dark-band colour contract, not the `--ed-*` tokens. The chat mock is a
 * product mockup and stays **light in both themes**, because it depicts a
 * product UI rather than the page.
 */

const ON_DARK      = "rgba(238,242,248,0.92)";
const ON_DARK_MUTE = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const SKY          = "#9FE0F8";

const MONO_META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

/** ── Hero: the network's compliance state ── */
export function NetworkStateCard() {
  return (
    <div
      className="overflow-hidden rounded-[14px]"
      style={{ background: "#0B3848", border: "1px solid rgba(159,224,248,0.22)", boxShadow: "0 18px 44px rgba(4,32,54,0.34)" }}
    >
      <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(238,242,248,0.14)", ...MONO_META, color: ON_DARK_MUTE }}>
        Network · 214 locations · Live
      </div>

      {NETWORK_STATE.map((r, i) => (
        <div
          key={r.label}
          className="flex items-center justify-between gap-4 px-5 py-3.5"
          style={{ borderBottom: i === NETWORK_STATE.length - 1 ? "none" : "1px solid rgba(238,242,248,0.1)" }}
        >
          <span className="flex min-w-0 items-start gap-3">
            {/* Shape, colour and label all carry the state, so it
                survives greyscale and colour blindness. */}
            <span
              className="mt-1 h-2 w-2 flex-none rounded-full"
              style={
                r.marker === "full" ? { background: r.hue }
                : r.marker === "half" ? { background: `linear-gradient(90deg, ${r.hue} 50%, transparent 50%)`, boxShadow: `inset 0 0 0 1.5px ${r.hue}` }
                : { boxShadow: `inset 0 0 0 1.5px ${r.hue}` }
              }
              aria-hidden="true"
            />
            <span className="flex min-w-0 flex-col gap-1">
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: r.marker === "full" ? ON_DARK : r.hue }}>
                {r.label}
              </span>
              <span className="text-[12.5px]" style={{ color: ON_DARK_MUTE }}>{r.sub}</span>
            </span>
          </span>
          <span className="flex-none" style={{ fontFamily: MONO, fontSize: 20, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "#FFFFFF" }}>
            {r.figure}
          </span>
        </div>
      ))}

      <div className="p-3.5">
        <div className="rounded-[10px] p-3.5" style={{ background: "rgba(238,242,248,0.05)" }}>
          {REGIONS.map(([region, loc, note]) => (
            <div
              key={region}
              className="grid grid-cols-[64px_56px_1fr] gap-3 py-1"
              style={{ fontFamily: MONO, fontSize: 12, fontVariantNumeric: "tabular-nums", color: "rgba(238,242,248,0.72)" }}
            >
              <span>{region}</span>
              <span>{loc}</span>
              <span style={{ color: "rgba(238,242,248,0.5)" }}>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Required. These are not customer data. */}
      <div className="px-5 pb-3.5" style={{ ...MONO_META, color: "rgba(238,242,248,0.38)" }}>Illustrative</div>
    </div>
  );
}

/** ── §4: a schedule against a state ── */
export function ContinuityDiagram() {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div className="max-w-[900px]">
      <div className="grid grid-cols-12" aria-hidden="true">
        {MONTHS.map((m) => (
          <span key={m} className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em" }}>{m}</span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="ed-fg-muted" style={MONO_META}>Periodic</span>
        <div className="relative h-3.5" aria-hidden="true">
          <span
            className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2"
            style={{ background: "repeating-linear-gradient(to right, var(--ed-rule) 0 5px, transparent 5px 10px)" }}
          />
          {["2%", "49%", "95%"].map((left) => (
            <span key={left} className="absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full" style={{ left, background: "var(--ed-fg)" }} />
          ))}
        </div>
        <span className="ed-fg-muted text-[12px]">unknown between checks</span>
      </div>

      {/* The dashed track against the unbroken bar is the argument.
          Do not normalise the two treatments to match. */}
      <div className="mt-7 flex flex-col gap-2">
        <span className="ed-fg-muted" style={MONO_META}>Continuous</span>
        <span className="block h-1 w-full rounded-[2px]" style={{ background: "var(--ed-accent-text)" }} aria-hidden="true" />
        <span className="ed-fg-muted text-[12px]">Every location, against every standard, all year.</span>
      </div>
    </div>
  );
}

/** ── §5: 24 days, four escalations, nobody sent a message ── */
export function ChaseLadderCard() {
  return (
    <div
      className="max-w-[880px] overflow-hidden rounded-[14px]"
      style={{ background: "#142C38", border: `1px solid ${ON_DARK_RULE}` }}
    >
      <div className="px-5 py-3" style={{ borderBottom: `1px solid ${ON_DARK_RULE}`, ...MONO_META, color: ON_DARK_MUTE }}>
        Store #263 · General liability insurance
      </div>
      {LADDER.map((r, i) => (
        <div
          key={r.day}
          className="ed-chase-row grid grid-cols-1 gap-x-3.5 gap-y-1 px-5 py-3.5 sm:grid-cols-[76px_1fr]"
          style={{
            borderBottom: i === LADDER.length - 1 ? "none" : "1px solid rgba(238,242,248,0.1)",
            "--step": r.indent,
          } as React.CSSProperties}
        >
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: r.resolved ? SKY : ON_DARK_MUTE }}>
            {r.day}
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[14.5px] font-semibold" style={{ color: r.resolved ? SKY : "#FFFFFF" }}>{r.title}</span>
            <span className="text-[13px] leading-[1.5]" style={{ color: "rgba(238,242,248,0.6)" }}>{r.detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** ── §6: the owner replies, the systems get updated ── */
export function ChatMock() {
  return (
    <div
      className="overflow-hidden rounded-[14px]"
      style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 1px 2px rgba(10,10,10,0.04), 0 12px 28px rgba(10,10,10,0.06)" }}
    >
      <div className="px-5 py-3" style={{ background: "#F4F4F5", ...MONO_META, color: "#7A7A85" }}>
        Store #263 · Maria S., owner · 9:14am
      </div>

      <div className="flex flex-col gap-3.5 p-5">
        <p className="max-w-[88%] self-start rounded-xl px-3.5 py-3 text-[14px] leading-[1.5]" style={{ background: "#F7F7F8", border: "1px solid #E5E7EB", color: "#0A0A0A" }}>
          Your general liability policy expires Mar 14. Send me the renewal certificate and
          I&rsquo;ll file it against the requirement.
        </p>

        <div className="flex max-w-[88%] flex-col gap-2 self-end rounded-xl px-3.5 py-3" style={{ background: "#0077A8" }}>
          <span className="text-[14px] leading-[1.5]" style={{ color: "#FFFFFF" }}>Just got it from the broker. Here.</span>
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1.5"
            style={{ background: "rgba(255,255,255,0.16)", fontFamily: MONO, fontSize: 12, color: "#FFFFFF" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#FFFFFF" }} aria-hidden="true" />
            cert-liability-2026.pdf
          </span>
        </div>

        <div className="flex max-w-[92%] flex-col gap-3 self-start rounded-xl px-3.5 py-3.5" style={{ background: "#F7F7F8", border: "1px solid #E5E7EB" }}>
          <span className="text-[14px] leading-[1.5]" style={{ color: "#0A0A0A" }}>
            Read it. Policy number, coverage amount, and expiry match your requirement. Filed and
            closed.
          </span>
          <span className="flex flex-col gap-1.5 pt-3" style={{ borderTop: "1px solid #E5E7EB" }}>
            {WRITE_BACK.map((w) => (
              <span key={w} className="flex items-start gap-2" style={{ fontFamily: MONO, fontSize: 12, color: "#52525B" }}>
                <span className="flex-none" style={{ color: "#0077A8" }} aria-hidden="true">✓</span>
                {w}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="px-5 pb-3.5" style={{ ...MONO_META, color: "#9A9AA3" }}>Illustrative</div>
    </div>
  );
}

/** A tinted tile holding one category glyph. */
export function ScopeTile({ hue, d }: { hue: string; d: string }) {
  return (
    <span
      className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px]"
      style={{ background: `color-mix(in srgb, ${hue} 9%, transparent)`, color: hue }}
      aria-hidden="true"
    >
      <Glyph d={d} size={17} />
    </span>
  );
}

export { JAKARTA };
