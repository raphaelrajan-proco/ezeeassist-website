"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §4's flywheel: supported owners validate, validation sells the next
 * unit, growth funds the support.
 *
 * **The return arc is the argument.** Four stages in a row is a funnel,
 * and a funnel happens once. The arc is what makes it compounding, so it
 * is drawn and labelled rather than implied.
 *
 * Stage 3 is why this section exists on a leadership page: what an owner
 * says on a validation call is the largest single input to the
 * development pipeline. Do not compress it.
 *
 * Kin to the Apps page's `AuthorshipLoop`, deliberately not shared with
 * it. That one is a publishing sequence on a dark band with its own
 * copy; generalising the two into one component would leave a props bag
 * wider than either use.
 *
 * Below `lg` the ring becomes a vertical sequence with the return stated
 * as a labelled row, per the brief: a four-way cycle scaled to a phone is
 * unreadable, and the argument outlives the drawing.
 */

const ACCENT = "var(--ed-accent-text)";

const STAGES: { n: string; label: string; body: string }[] = [
  {
    n: "1", label: "Supported",
    body: "Answers in seconds, on the channel they already use. Proactive contact instead of a quarterly call. Advice built on their numbers, not the network average.",
  },
  {
    n: "2", label: "Performing",
    body: "The gap closes faster. Ramp is shorter. Fewer avoidable mistakes.",
  },
  {
    n: "3", label: "Validating",
    body: "What they tell a prospect on a validation call is the single biggest input to your development pipeline.",
  },
  {
    n: "4", label: "Expanding",
    body: "Renewals, additional units, referrals.",
  },
];

export default function Flywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true); setShown(true); return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setShown(true); } },
      { threshold: 0.25 },
    );
    io.observe(el);
    const failsafe = setTimeout(() => setShown(true), 2200);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  const step = (i: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(10px)",
    transition: reduced ? "none" : `opacity .5s ease ${i * 0.14}s, transform .5s cubic-bezier(.22,1,.36,1) ${i * 0.14}s`,
  });

  return (
    <div ref={ref}>
      {/* ── lg and up: four across, then the arc returning ── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-5">
          {STAGES.map((s, i) => (
            <div key={s.n} style={step(i)}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full"
                  style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#FFFFFF", backgroundColor: ACCENT }}
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                {i < STAGES.length - 1 && (
                  <span aria-hidden="true" className="h-px flex-1" style={{ backgroundColor: "var(--ed-border)" }} />
                )}
              </div>
              <p className="mt-4 uppercase" style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700, color: ACCENT }}>
                {s.label}
              </p>
              <p className="ed-fg mt-2.5 text-[14.5px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-7">
          <svg
            viewBox="0 0 1000 56"
            preserveAspectRatio="none"
            className="h-14 w-full"
            role="img"
            aria-labelledby="fw-t fw-d"
            style={{ opacity: shown ? 1 : 0, transition: reduced ? "none" : "opacity .5s ease .7s" }}
          >
            <title id="fw-t">The flywheel returns</title>
            <desc id="fw-d">
              A path from stage four, expanding, back to stage one, supported: growth funds the
              support that produced it.
            </desc>
            <defs>
              <marker id="fw-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3.5" orient="auto">
                <path d="M0 0 L7 3.5 L0 7 z" fill="currentColor" />
              </marker>
            </defs>
            <path
              d="M 968 2 C 968 34, 940 44, 880 44 L 120 44 C 60 44, 32 34, 32 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#fw-arrow)"
              style={{ color: ACCENT, opacity: 0.7 }}
            />
          </svg>
          {/* Above the arc rather than on it: knocking the dashes out
              needs a solid background, and this band is not one colour. */}
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap uppercase"
            style={{
              fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 600,
              color: "var(--ed-fg-muted)",
              opacity: shown ? 1 : 0, transition: reduced ? "none" : "opacity .5s ease .85s",
            }}
          >
            Growth funds the support that produced it
          </span>
        </div>
      </div>

      {/* ── Below lg: a vertical sequence, arc stated ── */}
      <div className="lg:hidden">
        {STAGES.map((s, i) => (
          <div key={s.n} className="relative flex gap-4 pb-7 last:pb-0" style={step(i)}>
            <div className="flex flex-none flex-col items-center">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#FFFFFF", backgroundColor: ACCENT }}
                aria-hidden="true"
              >
                {s.n}
              </span>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="mt-1.5 w-px flex-1" style={{ backgroundColor: "var(--ed-border)" }} />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="uppercase" style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700, color: ACCENT }}>
                {s.label}
              </p>
              <p className="ed-fg mt-2 text-[14.5px] leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
        <div
          className="mt-5 flex items-center gap-3 pt-4"
          style={{ borderTop: "1px solid var(--ed-rule)", opacity: shown ? 1 : 0, transition: reduced ? "none" : "opacity .5s ease .7s" }}
        >
          <span aria-hidden="true" style={{ color: ACCENT, fontFamily: MONO, fontSize: 13 }}>&#8593;</span>
          <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
            Growth funds the support that produced it
          </span>
        </div>
      </div>
    </div>
  );
}
