"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §6's four-stage loop: an operator builds something, it proves out, HQ
 * reviews it, the network gets it — and the return path puts the next idea
 * back at stage 1.
 *
 * **The return path is the section.** Four stages in a row is a pipeline,
 * and a pipeline says this happens once. The arc is what makes it an
 * operating practice, so it is drawn rather than implied, and it carries a
 * label rather than being a bare line.
 *
 * Stage 2 must stay: HQ is not publishing an untested idea, it is
 * publishing one with two weeks of evidence. Stage 4's "still the author"
 * must stay: it is what makes an operator build a second one.
 *
 * At 375 the stages stack and the arc becomes a labelled vertical return
 * rather than a shrunken curve, per the brief — a 4-across diagram scaled
 * to a phone is unreadable, and this argument is worth more than the
 * drawing.
 */

const ACCENT = "#9FE0F8";
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const RULE = "rgba(238,242,248,0.18)";

const STAGES: { n: string; label: string; body: string }[] = [
  { n: "1", label: "Built",     body: "Store #214 builds a closing audit for their own team" },
  { n: "2", label: "Proven",    body: "Two weeks. Their failure rate drops from 14% to 3%." },
  { n: "3", label: "Reviewed",  body: "You see it, check what it reaches, adjust the wording" },
  { n: "4", label: "Published", body: "Live at 214 locations. Store #214 is still the author." },
];

export default function AuthorshipLoop() {
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
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setShown(true); }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const failsafe = setTimeout(() => setShown(true), 2200);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  const step = (i: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(10px)",
    transition: reduced ? "none" : `opacity .5s ease ${i * 0.15}s, transform .5s cubic-bezier(.22,1,.36,1) ${i * 0.15}s`,
  });

  return (
    <div ref={ref}>
      {/* ── Desktop: four across, connected, with the arc returning ── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-5">
          {STAGES.map((s, i) => (
            <div key={s.n} style={step(i)}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full"
                  style={{
                    fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#062334",
                    backgroundColor: ACCENT,
                  }}
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                {/* The rule runs to the next stage; the last one stops, so
                    the row does not look like it continues off-screen. */}
                {i < STAGES.length - 1 && (
                  <span aria-hidden="true" className="h-px flex-1" style={{ backgroundColor: RULE }} />
                )}
              </div>
              <p
                className="mt-4 uppercase"
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700, color: ACCENT }}
              >
                {s.label}
              </p>
              <p className="mt-2.5 text-[14.5px] leading-relaxed" style={{ color: ON_DARK }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* The return path, drawn last. */}
        <div className="relative mt-7">
          <svg
            viewBox="0 0 1000 56"
            preserveAspectRatio="none"
            className="h-14 w-full"
            role="img"
            aria-labelledby="loop-t loop-d"
            style={{ opacity: shown ? 1 : 0, transition: reduced ? "none" : "opacity .5s ease .75s" }}
          >
            <title id="loop-t">The loop returns</title>
            <desc id="loop-d">
              A path from stage four, published, back to stage one, built: the next idea starts at a
              location again.
            </desc>
            <defs>
              <marker id="loop-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3.5" orient="auto">
                <path d="M0 0 L7 3.5 L0 7 z" fill={ACCENT} />
              </marker>
            </defs>
            <path
              d="M 968 2 C 968 34, 940 44, 880 44 L 120 44 C 60 44, 32 34, 32 6"
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.25"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#loop-arrow)"
              opacity="0.75"
            />
          </svg>
          {/* Above the arc, not on it. Sitting on the line needs a solid
              background to knock the dashes out, and the band is a
              gradient, so any fixed colour shows as a lighter patch at
              this height. */}
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap uppercase"
            style={{
              fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 600,
              color: ON_DARK_DIM,
              opacity: shown ? 1 : 0, transition: reduced ? "none" : "opacity .5s ease .9s",
            }}
          >
            And the next one starts at a location again
          </span>
        </div>
      </div>

      {/* ── Below lg: a vertical spine, arc replaced by a labelled return ── */}
      <div className="lg:hidden">
        {STAGES.map((s, i) => (
          <div key={s.n} className="relative flex gap-4 pb-7 last:pb-0" style={step(i)}>
            <div className="flex flex-none flex-col items-center">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#062334", backgroundColor: ACCENT }}
                aria-hidden="true"
              >
                {s.n}
              </span>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="mt-1.5 w-px flex-1" style={{ backgroundColor: RULE }} />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700, color: ACCENT }}
              >
                {s.label}
              </p>
              <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: ON_DARK }}>
                {s.body}
              </p>
            </div>
          </div>
        ))}
        <div
          className="mt-5 flex items-center gap-3 pt-4"
          style={{ borderTop: `1px solid ${RULE}`, opacity: shown ? 1 : 0, transition: reduced ? "none" : "opacity .5s ease .7s" }}
        >
          <span aria-hidden="true" style={{ color: ACCENT, fontFamily: MONO, fontSize: 13 }}>&#8593;</span>
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, color: ON_DARK_DIM }}
          >
            And the next one starts at a location again
          </span>
        </div>
      </div>
    </div>
  );
}
