"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * The hero's product moment: one sentence, then four locations doing four
 * different things with it.
 *
 * **The divergence is the argument.** Four chips reading "sent" would make
 * this a scheduler, which is the category the page exists to escape, so the
 * four outcomes are hardcoded as four distinct states — acted, declined,
 * adapted, escalated — and each carries its own tint. Do not normalise them
 * and do not add a fifth.
 *
 * **The input panel must not resemble a builder.** No nodes, no canvas, no
 * dropdowns, no drag handles, not even as decoration. A coach typing a
 * sentence is the whole claim.
 *
 * Sits on the hero photograph, so colours are the on-photograph palette
 * from DESIGN.md §4.4, not the page tokens.
 */

const ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const ON_IMAGE_DIM = "rgba(245,237,224,0.55)";
const RULE = "rgba(245,237,224,0.16)";
const WARN = "#F5B26B";

const REQUEST =
  "When next week drops below 70% booked, check what campaigns are running and pull the lapsed client list. Draft the reactivation offer. Hold it for the owner to approve.";

/* One acts, one declines, one adapts, one escalates. `tone` is not
   decoration: it is what stops the four reading as four successes. */
const OUTCOMES: { store: string; outcome: string; tone: "act" | "none" | "adapt" | "escalate" }[] = [
  { store: "#331", outcome: "draft ready",              tone: "act" },
  { store: "#052", outcome: "no action · below threshold", tone: "none" },
  { store: "#118", outcome: "extend current promo",     tone: "adapt" },
  { store: "#402", outcome: "escalated to coach",       tone: "escalate" },
];

const TONE: Record<string, { fg: string; bg: string; bd: string }> = {
  act:      { fg: ACCENT,        bg: "rgba(159,224,248,0.12)", bd: "rgba(159,224,248,0.38)" },
  none:     { fg: ON_IMAGE_DIM,  bg: "rgba(245,237,224,0.05)", bd: "rgba(245,237,224,0.18)" },
  adapt:    { fg: ON_IMAGE,      bg: "rgba(245,237,224,0.08)", bd: "rgba(245,237,224,0.26)" },
  escalate: { fg: WARN,          bg: "rgba(245,178,107,0.12)", bd: "rgba(245,178,107,0.38)" },
};

const TYPE_MS = 40;
const CHIP_STAGGER = 150;

export default function PlayFanOut() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setStarted(true); } },
      { threshold: 0.25 },
    );
    io.observe(el);
    /* Never leave the panel empty if the observer never fires. */
    const failsafe = setTimeout(() => setStarted(true), 1800);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  useEffect(() => {
    if (reduced || !started || typed >= REQUEST.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [reduced, started, typed]);

  const done = reduced || typed >= REQUEST.length;
  const text = reduced ? REQUEST : REQUEST.slice(0, typed);

  return (
    <div ref={ref} className="w-full max-w-[720px]">
      {/* What the coach typed. */}
      <div
        className="rounded-[14px] p-5"
        style={{
          backgroundColor: "rgba(4,26,44,0.55)",
          border: `1px solid ${RULE}`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <span
          className="uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_IMAGE_DIM }}
        >
          What the coach typed
        </span>
        {/* The finished sentence is rendered invisibly underneath to hold
            the box open while the visible one types. A fixed min-height
            cannot do this: the sentence wraps to two lines at 1205 and
            four at 375, so any single value is either too short (the box
            grows mid-type) or too tall (dead space at the wide end). */}
        <div className="relative mt-3.5">
          <p aria-hidden="true" className="invisible" style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.65 }}>
            &ldquo;{REQUEST}&rdquo;
          </p>
          <p className="absolute inset-0" style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.65, color: "#FFFFFF" }}>
            &ldquo;{text}{done && <>&rdquo;</>}
            {!reduced && (
              <span
                aria-hidden="true"
                className="ed-caret ml-0.5 inline-block"
                style={{ width: 7, height: "1.05em", backgroundColor: ACCENT, verticalAlign: "-0.18em" }}
              />
            )}
          </p>
        </div>
      </div>

      {/* The fan-out. 2x2 below sm so four chips never compress to one
          unreadable line on a phone. */}
      <div className="mt-4">
        <p
          className="mb-3 uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_IMAGE_DIM }}
        >
          What happened at four locations
        </p>
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {OUTCOMES.map((o, i) => {
            const t = TONE[o.tone];
            return (
              <div
                key={o.store}
                className="rounded-[10px] px-3 py-2.5"
                style={{
                  backgroundColor: t.bg,
                  border: `1px solid ${t.bd}`,
                  opacity: done ? 1 : 0,
                  transform: done ? "none" : "translateY(6px)",
                  transition: reduced
                    ? "none"
                    : `opacity .45s ease ${(i * CHIP_STAGGER) / 1000}s, transform .45s cubic-bezier(.22,1,.36,1) ${(i * CHIP_STAGGER) / 1000}s`,
                }}
              >
                <span
                  className="block"
                  style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: t.fg, fontVariantNumeric: "tabular-nums" }}
                >
                  {o.store}
                </span>
                <span className="mt-1 block text-[12.5px] leading-snug" style={{ color: t.fg === ACCENT || t.fg === WARN ? t.fg : ON_IMAGE }}>
                  {o.outcome}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
