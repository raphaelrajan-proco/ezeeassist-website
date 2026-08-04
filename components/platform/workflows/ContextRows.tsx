"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §5: one play, four locations, four different outcomes. The page rests on
 * this section, so it gets the strongest treatment on the page.
 *
 * **The four outcomes must stay different.** One acts, one declines, one
 * adapts, one escalates. Rows 2 and 4 are the most persuasive and must not
 * be cut for length: a play that declines because a region set its own
 * threshold, and one that escalates rather than acting because the owner is
 * six weeks in, are what prove this carries a coach's judgment rather than
 * a rule. Uniform outcomes turn the product into mass email.
 *
 * Row heights are deliberately unequal. Normalising them would flatten the
 * thing the section is showing.
 */

const ACCENT = "#9FE0F8";
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const RULE = "rgba(238,242,248,0.16)";
const WARN = "#F5B26B";

type Row = { store: string; found: string; did: string; tone: "act" | "none" | "adapt" | "escalate" };

const ROWS: Row[] = [
  {
    store: "Store #331", tone: "act",
    found: "62% booked · third soft week · 340 lapsed clients",
    did: "Draft ready. Owner approved Friday. Sent to 340.",
  },
  {
    store: "Store #052", tone: "none",
    found: "58% booked · seasonal dip · HQ threshold set to 55%",
    did: "No action taken. Below threshold for this region.",
  },
  {
    store: "Store #118", tone: "adapt",
    found: "66% booked · promo already running",
    did: "Suggested extending the current promo instead of launching a second one.",
  },
  {
    store: "Store #402", tone: "escalate",
    found: "51% booked · new owner, week six",
    did: "Escalated to the coach with full context. Too early for an automated offer.",
  },
];

/* The arrow colour is the outcome's only colour cue, so each row also
   states its outcome in words. Colour alone would fail greyscale. */
const TONE: Record<Row["tone"], string> = {
  act: ACCENT,
  none: ON_DARK_DIM,
  adapt: ON_DARK,
  escalate: WARN,
};

const STAGGER = 180;

export default function ContextRows() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setShown(true); } },
      { threshold: 0.2 },
    );
    io.observe(el);
    const failsafe = setTimeout(() => setShown(true), 2200);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  return (
    <div ref={ref}>
      {ROWS.map((r, i) => (
        <div
          key={r.store}
          className="py-6 first:pt-0"
          style={{
            borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(10px)",
            transition: reduced
              ? "none"
              : `opacity .5s ease ${(i * STAGGER) / 1000}s, transform .5s cubic-bezier(.22,1,.36,1) ${(i * STAGGER) / 1000}s`,
          }}
        >
          {/* The store label sits above the two lines below lg rather than
              beside them: a fixed label column on a phone truncates either
              the label or what it found, and both carry meaning. */}
          <div className="lg:flex lg:gap-8">
            <div className="lg:w-[168px] lg:flex-none">
              <span
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", fontWeight: 700, color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}
              >
                {r.store}
              </span>
            </div>
            <div className="mt-2 min-w-0 flex-1 lg:mt-0">
              <p className="text-[13.5px] leading-relaxed" style={{ color: ON_DARK_DIM, fontVariantNumeric: "tabular-nums" }}>
                {r.found}
              </p>
              <div className="mt-2.5 flex gap-2.5">
                <span aria-hidden="true" className="flex-none" style={{ color: TONE[r.tone], fontFamily: MONO, fontSize: 14, lineHeight: 1.5 }}>
                  &rarr;
                </span>
                <p className="text-[15px] leading-relaxed" style={{ color: r.tone === "none" ? ON_DARK_DIM : "#FFFFFF" }}>
                  {r.did}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
