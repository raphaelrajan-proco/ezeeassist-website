"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { JAKARTA, MONO } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import { DAYS, PLAY_CHUNKS, PLAYS, SINCE, TICKETS, TONE } from "./data";

/**
 * The Coaches page's three artifacts.
 *
 * All are white product cards with fixed light ink, so they read as
 * screenshots of a product rather than as page surfaces, and all resolve
 * to their finished state under reduced motion because the base styles
 * already are it.
 *
 * **The console headers carry the EZee flower mark, never a lettermark
 * "E" tile.** That was an explicit instruction in the handoff.
 */

const INK = "#0A0A0A";
const MUTED = "#52525B";
const RULE = "#EEF0F4";
const WINE = "#8C3A4B";

const META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.12em", textTransform: "uppercase" as const,
};

function Flower({ size = 22 }: { size?: number }) {
  return (
    <Image
      src="/logos/ezee-flower-black.png"
      alt=""
      width={size}
      height={size}
      className="flex-none object-contain"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

/** ── §1: the Monday brief, 16s ── */
export function BriefConsole() {
  return (
    <div
      data-anim
      className="w-full max-w-[520px] overflow-hidden rounded-2xl"
      style={{ background: "#FFFFFF", boxShadow: "0 30px 70px -30px rgba(10,10,10,.55)" }}
      aria-hidden="true"
    >
      <div className="cb cb-head flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: `1px solid ${RULE}` }}>
        <Flower />
        <span style={{ ...META, color: MUTED }}>West territory · Monday 7:00am · 12 locations</span>
        <span className="ml-auto flex-none" style={{ ...META, color: WINE }}>Your brief</span>
      </div>

      <div className="cb cb-scan flex items-center gap-2 px-4 py-2.5" style={{ background: "#F8FAFC" }}>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => <span key={i} className="cb-dot h-1 w-1 rounded-full" style={{ background: WINE }} />)}
        </span>
        <span style={{ ...META, fontSize: 12, color: MUTED }}>Assembled overnight · bookings · labour · ramp · compliance</span>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-3 pt-3">
        <span className="cb cb-row1" style={{ ...META, color: MUTED }}>Needs you this week</span>
        {TICKETS.map((t, i) => (
          <div
            key={t.store}
            className={`cb cb-row${i + 1} relative rounded-xl px-3.5 py-3`}
            style={{ background: "rgba(140,58,75,.06)", border: "1px solid rgba(140,58,75,.16)" }}
          >
            <span
              className={`cb cb-rank${i + 1} absolute -top-2 right-3 rounded-full px-2 py-0.5`}
              style={{ background: WINE, color: "#FFFFFF", fontFamily: MONO, fontSize: 12, fontWeight: 700 }}
            >
              {t.rank}
            </span>
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: INK }}>{t.store}</span>
              <span className="text-[13px] font-semibold" style={{ color: INK }}>{t.headline}</span>
              <span className="text-[12px]" style={{ color: MUTED }}>{t.note}</span>
            </span>
            <span className="mt-1 block text-[12.5px]" style={{ color: MUTED }}>→ {t.detail}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 px-4 pb-3" style={{ borderTop: `1px solid ${RULE}`, paddingTop: 12 }}>
        <span className="cb cb-since" style={{ ...META, color: MUTED }}>Since you last spoke</span>
        {SINCE.map(([store, what], i) => (
          <span key={store} className={`cb cb-check${i + 1} flex items-start gap-2 text-[12.5px]`} style={{ color: MUTED }}>
            <span className="flex-none" style={{ color: "#0D7C58" }}>✓</span>
            <span><b style={{ color: INK }}>{store}</b> {what}</span>
          </span>
        ))}
      </div>

      <div className="cb cb-foot px-4 pb-3.5" style={{ ...META, fontSize: 12, color: "#A1A1AA" }}>
        Ranked by need, not by who asked · every number traced to its source
      </div>
    </div>
  );
}

/**
 * ── §3: the week, click-seekable ──
 *
 * A state machine rather than a keyframe loop, because the day columns
 * have to be clickable and keyboard-actionable. Six seconds a day, and
 * clicking any day jumps there and restarts the timer, so skip-ahead and
 * skip-back both work.
 *
 * Under reduced motion the timer never starts, which leaves Monday
 * selected and everything legible.
 */
export function WeekCalendar() {
  const [day, setDay] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setDay((d) => (d + 1) % DAYS.length), 6000);
    return () => clearTimeout(t);
  }, [day, auto]);

  const pick = (i: number) => { setDay(i); setAuto(true); };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
      <div
        className="overflow-hidden rounded-2xl"
        style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 20px 50px -30px rgba(10,10,10,.35)" }}
      >
        <div className="flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: `1px solid ${RULE}` }}>
          <Flower />
          <span style={{ ...META, color: MUTED }}>West territory · this week</span>
          <span className="ml-auto flex-none" style={{ ...META, color: MUTED }}>12 locations</span>
        </div>

        {/* Three across at phone width, five from md. Five columns at
            375 leaves each ~60px, which cannot hold "Brief ready ·
            7:00" at the 12px type floor. Three still reads Monday to
            Friday in order. */}
        <div className="grid grid-cols-3 gap-2 p-3 md:grid-cols-5">
          {DAYS.map((d, i) => {
            const on = i === day;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={on}
                aria-label={`${d.day}: ${d.chip}`}
                className="flex min-h-[104px] min-w-0 flex-col gap-1.5 rounded-xl p-2 text-left transition-colors duration-300"
                style={{
                  background: on ? "var(--wine-tint)" : "transparent",
                  border: `1px solid ${on ? "var(--wine-bd)" : "#E5E7EB"}`,
                  opacity: on ? 1 : 0.55,
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#0077A8" }}>{d.day.toUpperCase()}</span>
                <span
                  className="break-words rounded-md px-2 py-1"
                  style={{
                    background: d.chipBg, color: d.chipInk, fontSize: 12, fontWeight: 600, lineHeight: 1.3,
                    boxShadow: d.glow ? "0 0 16px rgba(0,174,239,.65)" : undefined,
                  }}
                >
                  {d.chip}
                </span>
                <span className="text-[12px] leading-[1.3]" style={{ color: MUTED }}>{d.sub}</span>
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-3.5" style={{ ...META, fontSize: 12, color: "#A1A1AA" }}>
          Assembled overnight · ranked by need, not by who asked
        </div>
      </div>

      {/* One panel visible at a time. Rendering only the active day is
          what keeps motion-off from stacking all five, which the
          prototype shipped by accident once. */}
      <div className="flex flex-col gap-3" aria-live="polite">
        <span className="ed-accent-text" style={META}>{DAYS[day].tag}</span>
        <h3 className="ed-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontSize: 23, fontWeight: 700, lineHeight: 1.2 }}>
          {DAYS[day].headline}
        </h3>
        <p className="ed-fg-muted text-[16.5px] leading-[1.6]">{DAYS[day].body}</p>
      </div>
    </div>
  );
}

/** ── §4: the play typing in, and what it did ── */
export function PlayArtifact() {
  return (
    <div data-anim className="flex flex-col gap-4">
      <div className="rounded-2xl px-5 py-4" style={{ background: INK }}>
        <p className="text-[15.5px] leading-[1.6]" style={{ color: "#F7F1DC" }}>
          {PLAY_CHUNKS.map((c, i) => (
            <span key={i} className={`cp cp-${i + 1}`}>{c}</span>
          ))}
          <span className="cp cp-car inline-block">
            <span className="cp-blink ml-0.5 inline-block h-3.5 w-[2px] align-middle" style={{ background: "#F2A9B8" }} aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="ed-card ed-border overflow-hidden rounded-2xl border">
        <div className="ed-card-alt ed-fg-muted px-5 py-3" style={META}>What happened, location by location</div>
        {PLAYS.map((p, i) => {
          const [bg, fg] = TONE[p.tone];
          return (
            <div key={p.store} className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 ${i === 0 ? "" : "ed-rule border-t"}`}>
              <span className="w-12 flex-none" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "var(--ed-fg)" }}>{p.store}</span>
              <span className="flex min-w-0 flex-col">
                <span className="ed-fg text-[14px] font-semibold">{p.state}</span>
                <span className="ed-fg-muted text-[12.5px]">{p.context}</span>
              </span>
              <span
                className="ml-auto flex-none whitespace-nowrap rounded-md px-2.5 py-1"
                style={{ background: bg, color: fg, fontFamily: MONO, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}
              >
                {p.action}
              </span>
            </div>
          );
        })}
        <div className="ed-rule ed-fg-muted border-t px-5 py-3 text-[13px]">
          One play, four locations, none of them treated the same.
        </div>
      </div>
    </div>
  );
}

export { Glyph };
