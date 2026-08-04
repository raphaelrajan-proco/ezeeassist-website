"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §5: one certificate followed from detection to closure. The page rests
 * on this section.
 *
 * **The escalation reads as a ladder.** Each stage steps further in and
 * gains weight — owner, then coach, then HQ — so the sequence feels like
 * four weeks of somebody's job rather than a status list. Day 24 breaks
 * the pattern deliberately: it steps back out and resolves rather than
 * continuing the climb.
 *
 * **Do not compress five stages to three.** "Still outstanding" repeating
 * across three escalations is what makes the chase legible; three stages
 * reads as a process diagram.
 *
 * **Day 7's detail stays** — sent to the channel they actually use. It is
 * the reason the second reminder works where the email did not.
 */

const ACCENT = "#9FE0F8";
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const RULE = "rgba(238,242,248,0.16)";
const RESOLVED = "#7FD4A8";

type Stage = {
  day: string;
  status: string;
  action: string;
  /** Rungs 0-3 climb; the resolution steps back to 0. */
  rung: number;
  resolved?: boolean;
};

const STAGES: Stage[] = [
  { day: "Day 0",  rung: 0, status: "Expires in 30 days", action: "Owner notified · renewal contact attached · task opened" },
  { day: "Day 7",  rung: 1, status: "Still outstanding",  action: "Second reminder · sent to the channel they actually use" },
  { day: "Day 14", rung: 2, status: "Still outstanding",  action: "Territory coach notified · added to their Monday brief" },
  { day: "Day 21", rung: 3, status: "Still outstanding",  action: "Escalated to HQ · flagged in the network state" },
  { day: "Day 24", rung: 0, status: "Renewed", resolved: true, action: "Certificate captured, dated, filed, and verified against the policy requirement" },
];

const STAGGER = 160;

/** One class per rung. Indexed by `Stage.rung`, so the ladder cannot drift
    out of step with the data. */
const RUNG = ["sm:pl-0", "sm:pl-[22px]", "sm:pl-[44px]", "sm:pl-[66px]"];

export default function ChaseLadder() {
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
    <div ref={ref} className="overflow-hidden rounded-[14px]" style={{ backgroundColor: "rgba(238,242,248,0.04)", border: `1px solid ${RULE}` }}>
      <div className="px-5 py-3.5 md:px-6" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span
          className="uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_DIM }}
        >
          Store #263 · General liability insurance
        </span>
      </div>

      <div className="px-5 py-2 md:px-6">
        {STAGES.map((s, i) => (
          <div
            key={s.day}
            className="py-4"
            style={{
              borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(8px)",
              transition: reduced
                ? "none"
                : `opacity .45s ease ${(i * STAGGER) / 1000}s, transform .45s cubic-bezier(.22,1,.36,1) ${(i * STAGGER) / 1000}s`,
            }}
          >
            {/* The indent is the ladder. Applied from sm up only: on a
                phone the rungs would eat the text column, so there the
                climb is carried by weight and the day label alone.
                Literal classes rather than a computed value, because
                Tailwind only generates what it can see in the source. */}
            <div className={RUNG[s.rung]}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span
                  className="flex-none uppercase"
                  style={{
                    fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.13em",
                    fontWeight: 700, width: 58,
                    color: s.resolved ? RESOLVED : ACCENT,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.day}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] leading-snug"
                    style={{
                      color: s.resolved ? RESOLVED : "#FFFFFF",
                      /* Weight climbs with the rung, so the escalation is
                         legible without colour. */
                      fontWeight: s.resolved ? 700 : 500 + s.rung * 50,
                    }}
                  >
                    {s.status}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: ON_DARK_DIM }}>
                    {s.action}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
