"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";

/**
 * The 16-second build loop in the Apps hero.
 *
 * It is the product argument compressed: someone types a request, it
 * generates, the app appears, they extend it in a follow-up, it goes
 * live. **Keep that order.** Timings come from the prototype and live in
 * globals as `ap-*` keyframes.
 *
 * Every element here is styled at its **finished** state and the
 * keyframes impose the hidden start. That is what lets the reduced-motion
 * rule be one line: with the animations off, the complete card is what
 * remains rather than an empty frame.
 *
 * All fixed hex, no tokens: this is a white app card on a dark
 * photographic band, and it stays light in both themes.
 */

const INK = "#0A0A0A";
const INK_MUTED = "#52525B";
const GOLD = "#F2DE8A";
const BRONZE = "#8A5A0F";

const CHECKS = [
  { label: "Front desk",      note: "4 photos", cls: "ap-row1" },
  { label: "Treatment rooms", note: "6 photos", cls: "ap-row2" },
  { label: "Retail floor",    note: "3 photos", cls: "ap-row3" },
];

function Check({ open = false }: { open?: boolean }) {
  return (
    <span
      className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full"
      style={open ? { border: `1.5px solid #C88A2E` } : { background: BRONZE }}
      aria-hidden="true"
    >
      {!open && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      )}
    </span>
  );
}

export default function HeroBuildLoop() {
  return (
    <div data-hero-anim className="flex flex-col gap-3" aria-hidden="true">
      {/* 1. The request, typed in two chunks. */}
      <div
        className="ap-a ap-prompt flex flex-col gap-2 rounded-xl px-4 py-3.5"
        style={{ background: "#171509", border: `1px solid rgba(242,222,138,.28)` }}
      >
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(242,222,138,.75)" }}>
          WHAT YOU TYPE · STORE #214 · 3:45PM
        </span>
        <span className="text-[13.5px] leading-[1.55]" style={{ color: "#F7F1DC" }}>
          <span className="ap-a ap-line1">&ldquo;Build a daily closing audit.</span>
          <span className="ap-a ap-line2"> Photo checklist per station, auto-score it, flag anything that fails to my coach.&rdquo;</span>
          <span className="ap-a ap-caretwin inline-block">
            <span className="ap-blink ml-0.5 inline-block h-3.5 w-[2px] align-middle" style={{ background: GOLD }} />
          </span>
        </span>
      </div>

      {/* 2. The follow-up, halfway through the loop. */}
      <div
        className="ap-a ap-iter flex flex-col gap-1.5 rounded-xl px-4 py-3"
        style={{ background: "#171509", border: `1px solid rgba(242,222,138,.28)` }}
      >
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(242,222,138,.75)" }}>
          3:52PM · FOLLOW-UP
        </span>
        <span className="text-[13.5px]" style={{ color: "#F7F1DC" }}>&ldquo;Add the back of house.&rdquo;</span>
      </div>

      {/* 3. The connector. GENERATING sits over the standing label and
             crossfades out of it, so the row never changes height. */}
      <div className="relative flex h-4 items-center justify-center">
        <span className="ap-a ap-gen absolute inset-0 flex items-center justify-center gap-2">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="ap-dot h-1 w-1 rounded-full" style={{ background: GOLD }} />
            ))}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: GOLD }}>GENERATING</span>
        </span>
        <span className="ap-a ap-done" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(247,241,220,.6)" }}>
          20 MINUTES · NO DEVELOPER
        </span>
      </div>

      {/* 4. The app itself. */}
      <div className="ap-a ap-card relative">
        <div className="overflow-hidden rounded-xl" style={{ background: "#FFFFFF", boxShadow: "0 26px 60px -28px rgba(20,16,4,.8)" }}>
          <div className="flex items-center gap-2.5 px-4 py-3" style={{ background: BRONZE }}>
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-md" style={{ background: "rgba(255,255,255,.9)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={BRONZE} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
            <span className="text-[13.5px] font-semibold" style={{ color: "#FFFFFF" }}>Daily closing audit</span>
            <span className="ml-auto flex-none" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,.8)" }}>
              STORE #214 · TONIGHT
            </span>
          </div>

          <div className="ap-a ap-score flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #EFEFF1" }}>
            <span className="text-[13.5px]" style={{ color: INK_MUTED }}>Auto-score</span>
            <span style={{ fontFamily: JAKARTA, fontSize: 21, fontWeight: 800, color: INK }}>
              92<span style={{ fontSize: 12, fontWeight: 600, color: INK_MUTED }}>/100</span>
            </span>
          </div>

          {CHECKS.map((c) => (
            <div key={c.label} className={`ap-a ${c.cls} flex items-center gap-2.5 px-4 py-2.5`} style={{ borderBottom: "1px solid #EFEFF1" }}>
              <Check />
              <span className="text-[13px]" style={{ color: INK }}>{c.label}</span>
              <span className="ml-auto flex-none text-[12px]" style={{ color: INK_MUTED }}>{c.note}</span>
            </div>
          ))}

          {/* Grows the card rather than appearing inside it. */}
          <div className="ap-a ap-row4 flex items-center gap-2.5 px-4" style={{ borderBottom: "1px solid #EFEFF1", paddingTop: 10, paddingBottom: 10 }}>
            <Check open />
            <span className="text-[13px]" style={{ color: INK }}>Back of house</span>
            <span className="ml-auto flex-none text-[12px] font-semibold" style={{ color: "#B45309" }}>2 photos needed</span>
          </div>

          <div className="ap-a ap-foot px-4 py-2.5">
            <span className="text-[12px]" style={{ color: INK_MUTED }}>Fails flag to your coach automatically</span>
          </div>
        </div>

        <span
          className="ap-a ap-live absolute -right-2 -top-3 rounded-full"
          style={{
            background: "#0077A8", border: "2px solid #FDF8E7", color: "#FFFFFF",
            fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "5px 12px",
          }}
        >
          LIVE · 20 MIN LATER
        </span>
      </div>
    </div>
  );
}
