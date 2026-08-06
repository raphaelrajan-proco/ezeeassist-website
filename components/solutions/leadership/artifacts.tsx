"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import { FEED, STAGES, TONE } from "./data";

/**
 * The Leadership page's two animated artifacts.
 *
 * Both resolve to their finished state under reduced motion because the
 * base styles already are it: every KPI visible, every flywheel node lit
 * and every connector filled.
 */

const INK = "#0A0A0A";
const MUTED = "#52525B";
const RULE = "#EEF0F4";

const META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.12em", textTransform: "uppercase" as const,
};

/**
 * ── §1: the network command console, 18s ──
 *
 * The dot grid is decorative and `aria-hidden`; every number it stands
 * for also appears as text above it. Two amber dots flip to green
 * mid-loop, which is the "narrowing" claim shown rather than asserted.
 */
export function NetworkConsole() {
  const dots = Array.from({ length: 54 }, (_, i) => {
    if (i === 7 || i === 31) return "flip";
    if (i === 12 || i === 22 || i === 40 || i === 47) return "amber";
    if (i === 35) return "red";
    return "green";
  });

  return (
    <div
      data-anim
      className="w-full max-w-[520px] overflow-hidden rounded-2xl"
      style={{ background: "#FFFFFF", boxShadow: "0 30px 70px -30px rgba(6,26,19,.6)" }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span
          className="flex h-5 w-5 flex-none items-center justify-center rounded-md"
          style={{ background: "#0077A8", color: "#FFFFFF", fontFamily: JAKARTA, fontSize: 12, fontWeight: 800 }}
        >
          E
        </span>
        <span style={{ ...META, color: MUTED }}>Network · 214 locations</span>
        <span className="lc-live ml-auto flex flex-none items-center gap-1.5" style={{ ...META, color: "#0D7C58" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#0D7C58" }} />
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="lc lc-kpi rounded-xl px-3 py-2.5" style={{ background: "#F8FAFC" }}>
            {i === 0 && (
              <>
                <span className="flex items-baseline gap-1">
                  <span style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 800, color: INK }}>198</span>
                  <span className="text-[12px]" style={{ color: MUTED }}>/ 214</span>
                </span>
                <span className="mt-0.5 block text-[12px]" style={{ color: MUTED }}>reached this month</span>
              </>
            )}
            {i === 1 && (
              <>
                {/* The two figures are stacked and crossfade, so the row
                    never reflows as the spread narrows. */}
                <span className="relative block h-6">
                  <span className="lc lc-spread-a absolute left-0 top-0 flex items-baseline gap-1">
                    <span style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 800, color: INK }}>11.2</span>
                    <span className="text-[12px]" style={{ color: MUTED }}>pts</span>
                  </span>
                  <span className="lc lc-spread-b absolute left-0 top-0 flex items-baseline gap-1">
                    <span style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 800, color: "#0D7C58" }}>9.6</span>
                    <span className="text-[12px]" style={{ color: MUTED }}>pts</span>
                  </span>
                </span>
                <span className="mt-0.5 block text-[12px]" style={{ color: MUTED }}>performance spread</span>
              </>
            )}
            {i === 2 && (
              <>
                <span style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 800, color: INK }}>12</span>
                <span className="mt-0.5 block text-[12px]" style={{ color: MUTED }}>plays running</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 pb-3">
        <span className="flex items-baseline justify-between gap-3">
          <span style={{ ...META, fontSize: 12, color: MUTED }}>Top decile to bottom quartile</span>
          <span style={{ ...META, fontSize: 12, color: "#0D7C58" }}>Narrowing</span>
        </span>
        <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#E7E9EF" }}>
          <span className="lc lc-spread block h-full rounded-full" style={{ width: "52%", background: "#19A97B" }} />
        </span>
      </div>

      <div className="grid grid-cols-[repeat(18,1fr)] gap-1 px-4 pb-3">
        {dots.map((k, i) => (
          <span
            key={i}
            className={`block aspect-square rounded-[2px] ${k === "amber" ? "lc-dot-pulse" : k === "flip" ? "lc-dot-flip" : ""}`}
            style={{ background: k === "red" ? "#B42318" : k === "amber" || k === "flip" ? "#B45309" : "rgba(25,169,123,.35)" }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5 px-4 pb-4" style={{ borderTop: `1px solid ${RULE}`, paddingTop: 12 }}>
        {FEED.map(([time, what], i) => (
          <span key={time} className={`lc lc-feed${i + 1} flex items-baseline gap-2.5`}>
            <span className="w-14 flex-none" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: "#1E6B4F" }}>{time}</span>
            <span className="text-[12.5px] leading-[1.4]" style={{ color: MUTED }}>{what}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * ── §4: the owner flywheel, 12s ──
 *
 * Four nodes, three drawing connectors, and a return line whose dot
 * travels right to left. **The loop closing is the argument**: growth
 * funds the support that produced it. Do not flatten this into four text
 * columns.
 */
export function Flywheel() {
  return (
    <div data-anim className="flex flex-col gap-5">
      <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_36px_1fr_36px_1fr_36px_1fr] lg:gap-0">
        {STAGES.map((s, i) => {
          const [bg, fg] = TONE[s.tone];
          return (
            <div key={s.name} className="contents">
              <div
                className="lf-stage ed-card flex h-full flex-col items-center gap-2.5 rounded-2xl px-4 py-5 text-center"
                style={{ border: "1px solid var(--ed-border)" }}
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full" style={{ background: bg, color: fg }} aria-hidden="true">
                  <Glyph d={s.d} size={22} />
                </span>
                <span className="ed-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontSize: 19, fontWeight: 700 }}>{s.name}</span>
                <span className="ed-fg-muted text-[13.5px] leading-[1.45]">{s.line}</span>
              </div>
              {i < STAGES.length - 1 && (
                <span className="hidden items-center lg:flex" aria-hidden="true">
                  <span className="ed-rule block h-px w-full" style={{ background: "var(--ed-border)" }}>
                    <span className="lf-con block h-px w-full" style={{ background: "var(--ed-accent-text)" }} />
                  </span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* The return line. Its label is the argument, so it survives even
          when the connectors are dropped at narrow widths. */}
      <div className="relative flex items-center justify-center py-1">
        <span
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{ borderTop: "1px dashed var(--chip-bd)" }}
          aria-hidden="true"
        />
        <span
          className="lf-dot absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
          style={{ background: "var(--ed-accent-text)" }}
          aria-hidden="true"
        />
        <span className="ed-accent-text ed-bg-alt relative px-3 text-[13px] font-semibold">
          ↺ Growth funds the support that produced it
        </span>
      </div>
    </div>
  );
}
