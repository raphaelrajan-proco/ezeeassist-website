"use client";

import { motion } from "framer-motion";

/**
 * The short KPI band between the always-on wall and the control center.
 * Deliberately half a section: one headline, four cards, nothing else.
 *
 * Every figure is already published elsewhere on this site: 67% is WSI's
 * case study, 94% is DekaLash's, 650+ is DivaDance's, and the locations
 * line is the hero trust strip's claim. Each card's bar wears the edge
 * colour of the proof-deck story it comes from, which quietly ties this
 * band to the deck below. Do not invent a figure here; if a new KPI is
 * wanted, source it from a case study first.
 *
 * Tokens live on `.ed-impact` in globals.css.
 */

const JAKARTA = "var(--font-editorial)";
const EASE = [0.22, 1, 0.36, 1] as const;

const STATS: { value: string; label: string; bar: string }[] = [
  { value: "67%",    label: "ticket reduction in 30 days",        bar: "#00AEEF" },
  { value: "94%",    label: "AI deflection during a systems migration", bar: "oklch(0.55 0.16 350)" },
  { value: "650+",   label: "support hours saved in six months",  bar: "oklch(0.5 0.16 300)" },
  { value: "5,000+", label: "locations across 70+ brands",        bar: "oklch(0.55 0.13 145)" },
];

export default function ImpactStats() {
  return (
    <section id="impact" className="ed-impact w-full scroll-mt-24" style={{ backgroundColor: "var(--imp-bg)" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-12 md:py-16 flex flex-col items-center gap-9 md:gap-11">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="ed-fg text-center leading-[1.1] tracking-[-0.028em]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 700,
            fontSize: "clamp(1.375rem, 0.7rem + 2.2vw, 2.25rem)",
          }}
        >
          Impact you can measure.
        </motion.h2>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="relative flex flex-col justify-between gap-8 overflow-hidden p-6 pl-7 min-h-[168px]"
              style={{
                backgroundColor: "var(--imp-card)",
                border: "1px solid var(--ed-rule)",
                borderRadius: 16,
                boxShadow: "0 18px 44px -30px rgba(12, 20, 36, 0.25)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0"
                style={{ width: 6, background: s.bar }}
              />
              <div
                className="text-[34px] md:text-[38px]"
                style={{
                  fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.035em",
                  lineHeight: 1, color: "var(--ed-fg)", fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.value}
              </div>
              <div className="ed-fg-muted text-[14px]" style={{ lineHeight: 1.45 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
