"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * The short KPI band between the always-on wall and the control center,
 * rebuilt from a supplied handoff: four stats on a single brand-blue
 * ramp, each bar fused to its card (ada-style, not floating beside it),
 * cards rising in, bars drawing down, numerals counting up on first
 * scroll into view. Deliberately half a section: one headline, four
 * cards, nothing else. The handoff's theme-toggle button is a preview
 * affordance and is not shipped.
 *
 * Tokens, the blue ramp, and the entrance keyframe live on `.ed-impact`
 * in globals.css.
 */

const JAKARTA = "var(--font-editorial)";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * TODO: source these four publicly before launch.
 *
 * This band previously carried only figures already published elsewhere
 * on the site — 67% from WSI's case study, 94% from DekaLash's, 650+
 * from DivaDance's, and the locations line from the hero trust strip —
 * and this comment said so, precisely so nobody swapped in an unsourced
 * number by accident. The four below were supplied directly and are not
 * published anywhere on this site yet.
 *
 * They sit under a headline that reads "proven AI", which is the part
 * that makes sourcing them matter: a prospect who asks "proven where?"
 * needs somewhere to land. Each one needs either a case study, a named
 * methodology (what a base case is measured against, over what period,
 * across how many networks), or a footnote.
 *
 * Do not add a fifth figure without a source.
 */
const STATS: { end: number; suffix: string; label: string }[] = [
  { end: 9,   suffix: "X",  label: "increased productivity" },
  { end: 354, suffix: "%",  label: "ROI on AI investment" },
  { end: 150, suffix: "%+", label: "increase in CSAT scores" },
  { end: 75,  suffix: "%+", label: "AI-automated resolutions" },
];

export default function ImpactStats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) setReduced(true);

    let fired = false;
    const reveal = () => {
      if (fired) return;
      fired = true;
      setRevealed(true);
      if (prefersReduced) return;
      /* Count up from 0, cubic ease-out, textContent through refs so
         nothing re-renders at animation rate. toLocaleString keeps
         5,000's comma mid-count; tabular numerals stop the jitter. */
      STATS.forEach((s, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const t0 = performance.now(), dur = 1200 + i * 100;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(s.end * e).toLocaleString("en-US");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); reveal(); }
    }, { threshold: 0.35 });
    io.observe(grid);
    /* Failsafe from the handoff: the stats must never stay invisible if
       the observer never fires. */
    const failsafe = setTimeout(reveal, 2500);

    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  /* Reduced motion renders everything revealed at final values. */
  const shown = revealed || reduced;

  return (
    /* The hero's hazy blue, brought back by request so the band stands
       out: the same photograph and scrim treatment the closing section
       uses, dark in both themes, with the cards keeping their own
       per-theme surfaces on top of it. */
    <section
      id="impact"
      className="ed-impact relative w-full scroll-mt-24 overflow-hidden"
      style={{ backgroundColor: "#0B2C48" }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "left center" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(4, 32, 54, 0.42)" }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-12 md:py-16 flex flex-col items-center gap-9 md:gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="m-stats-h2 text-center leading-[1.12] tracking-[-0.028em] max-w-[860px]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 700,
            fontSize: "clamp(1.375rem, 0.66rem + 2.4vw, 2.875rem)",
            textWrap: "pretty",
            color: "#FFFFFF",
          }}
        >
          {/* Two lines exactly, per request; the highlight is the hero's
              accent, the shade tuned for this same scrimmed backdrop. */}
          <span className="block">
            Boost your coaching with <span style={{ color: "#9FE0F8" }}>proven AI</span>
          </span>
          <span className="block">that scales your system&rsquo;s growth.</span>
        </motion.h2>

        <div ref={gridRef} className="m-stats grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            /* The unit is two fused pieces: the bar is part of the box. */
            <div
              key={s.label}
              className="flex items-stretch"
              style={{
                opacity: shown ? 1 : 0,
                animation: shown && !reduced ? `ed-imp-in .6s cubic-bezier(.2,.8,.2,1) both ${i * 0.09}s` : "none",
              }}
            >
              <span
                aria-hidden="true"
                className="flex-none"
                style={{
                  width: 9,
                  borderRadius: "6px 0 0 6px",
                  background: `var(--imp-s${i + 1})`,
                  transformOrigin: "top",
                  transform: shown ? "scaleY(1)" : "scaleY(0)",
                  transition: reduced ? "none" : `transform .8s cubic-bezier(.2,.8,.2,1) ${0.25 + i * 0.09}s`,
                }}
              />
              <div
                className="m-stat-body flex min-h-[195px] flex-1 flex-col justify-between"
                style={{
                  padding: "26px 22px 24px",
                  backgroundColor: "var(--imp-card)",
                  border: "1px solid var(--ed-rule)",
                  borderLeft: "none",
                  borderRadius: "0 14px 14px 0",
                  boxShadow: "var(--imp-shadow)",
                }}
              >
                <div className="m-stat-num ed-fg flex items-baseline whitespace-nowrap">
                  {/* Suffix matches the digits exactly: same size, same
                      weight, inherited colour, not superscript. */}
                  <span
                    ref={(el) => { numRefs.current[i] = el; }}
                    style={{
                      fontFamily: JAKARTA, fontSize: 48, fontWeight: 700,
                      letterSpacing: "-0.04em", lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.end.toLocaleString("en-US")}
                  </span>
                  <span
                    style={{
                      fontFamily: JAKARTA, fontSize: 48, fontWeight: 700,
                      letterSpacing: "-0.04em", lineHeight: 1,
                    }}
                  >
                    {s.suffix}
                  </span>
                </div>
                <div className="m-stat-label ed-fg-muted max-w-[200px] text-[14.5px]" style={{ lineHeight: 1.55, textWrap: "pretty" }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
