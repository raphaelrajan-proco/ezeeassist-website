"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { HERO_GRADIENT } from "@/lib/data/hero-backgrounds";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";

/**
 * /case-studies
 *
 * Built from the supplied design handoff. Three sections and no more:
 * an ocean hero, the story cards, and the WSI quote. The page ends on the
 * quote rather than a CTA band, which is why the quote strip carries the
 * resolve to CLOSING_BASE itself.
 *
 * **The hero blue is deliberately not the homepage's.** Ocean is
 * registered as `HERO_GRADIENT.ocean` with its own base, gradients and
 * accent. Trust Center is `#0B2C48`, Why EZee is azure `#0C4A8C`, this is
 * `#083A54`; a visitor should see the room change page to page.
 *
 * The hero is deliberately minimal: no eyebrow above the H1 and no stat
 * strip, both removed as repetitive against the cards below. Do not
 * reintroduce them.
 *
 * Card content comes from `lib/data/case-studies.ts`, the same record the
 * detail route reads, so a story is never described two different ways.
 */

const OC = HERO_GRADIENT.ocean;

/* Fixed inks for the brand panels, which stay light in both themes
   because all three logos are dark-on-light artwork. */
const PANEL_INK = "#0A0A0A";
const PANEL_INK_MUTED = "#52525B";

const QUOTE = {
  text:
    "EZee Assist is much more than just a chatbot. It truly made universal search possible at WSI, levelling the playing field for our franchisees across geographies and languages.",
  name: "Jeffrey Grant",
  role: "Systems Manager, WSI World",
};

/* ── Hero artwork ───────────────────────────────────────────
   Three curves rising from one baseline dot, the boldest ending in an
   arrowhead. They must stay concave up: the point is acceleration, and an
   S-curve or a plateau argues the opposite. Copied from the prototype. */
function GrowthCurves() {
  return (
    <svg viewBox="0 0 360 300" aria-hidden="true" className="h-auto w-full max-w-[360px]">
      <g stroke="rgba(127,224,255,.22)" strokeWidth="1.5" fill="none">
        <path d="M52 60 H316" />
        <path d="M52 124 H316" />
        <path d="M52 188 H316" />
      </g>
      <path d="M52 252 H316" stroke="rgba(127,224,255,.45)" strokeWidth="1.5" fill="none" />
      <path
        d="M52 252 C 150 250, 220 240, 268 196 C 292 174, 304 140, 310 96"
        fill="none" stroke="rgba(127,224,255,.35)" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round"
      />
      <path
        d="M52 252 C 140 250, 204 244, 248 212 C 278 190, 296 148, 304 74"
        fill="none" stroke="rgba(127,224,255,.6)" strokeWidth="1.5" strokeLinecap="round"
      />
      <path
        d="M52 252 C 130 250, 190 246, 232 224 C 272 203, 292 156, 298 52"
        fill="none" stroke="#7FE0FF" strokeWidth="2.5" strokeLinecap="round"
      />
      <path d="M286 66 L298 46 L306 68" fill="none" stroke="#7FE0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="#7FE0FF">
        <circle cx="52" cy="252" r="4.5" />
        <circle cx="176" cy="245" r="3.5" />
        <circle cx="244" cy="217" r="3.5" />
      </g>
      <path d="M298 96 l8 4.6 v9.2 l-8 4.6 -8 -4.6 v-9.2 Z" fill="rgba(127,224,255,.18)" stroke="#7FE0FF" strokeWidth="1.5" />
    </svg>
  );
}

export default function CaseStudiesContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: OC.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: OC.hero }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.15fr_.85fr] lg:gap-16"
        >
          <div className="flex flex-col items-start gap-5">
            <h1
              className="leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(2rem, 0.9rem + 2.9vw, 3.5rem)",
              }}
            >
              Case studies
            </h1>
            <p className="max-w-[440px] text-base md:text-[18px] leading-[1.6]" style={{ color: OC.body }}>
              Stories, playbooks, and results from the field.
            </p>
            {/* Both buttons are flex items and wrap their labels without
                nowrap and flex-none. */}
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href="/speak-to-an-expert"
                className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap"
                style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
              >
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#stories" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">
                Read the stories
              </a>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <GrowthCurves />
          </div>
        </motion.div>
      </section>

      {/* ── 2. Stories ────────────────────────────────────
          No section heading; the cards follow the hero directly. Each
          card is one link, with the headline as its accessible name. */}
      <section id="stories" className="ed-bg w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="ed-card ed-border ed-story-card grid grid-cols-1 overflow-hidden rounded-[18px] border sm:grid-cols-[240px_1fr] lg:grid-cols-[340px_1fr]"
              >
                {/* Brand panel. Light in both themes: the logo is
                    dark-on-light artwork. */}
                <div
                  className="flex min-h-[168px] flex-col justify-between gap-6 p-7 sm:p-8 lg:min-h-[210px]"
                  style={{ backgroundColor: c.panel }}
                >
                  <Image
                    src={c.logo.src}
                    alt={c.logo.alt}
                    width={220}
                    height={c.logoH.card}
                    className="w-auto self-start object-contain"
                    style={{ height: c.logoH.card }}
                  />
                  <div className="flex gap-6">
                    {c.cardStats.map((s) => (
                      <div key={s.label} className="flex flex-col gap-0.5">
                        <span
                          className="tracking-[-0.02em]"
                          style={{ fontFamily: JAKARTA, fontSize: 19, fontWeight: 800, color: PANEL_INK }}
                        >
                          {s.value}
                        </span>
                        <span style={{ fontSize: 12, color: PANEL_INK_MUTED }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-3 p-7 sm:p-8 lg:px-10">
                  <span
                    className="ed-accent-text uppercase"
                    style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.15em" }}
                  >
                    {c.kicker}
                  </span>
                  <span
                    className="ed-fg leading-[1.15] tracking-[-0.025em]"
                    style={{ fontFamily: JAKARTA, fontSize: 26, fontWeight: 700 }}
                  >
                    {c.headline}
                  </span>
                  <p className="ed-fg-muted max-w-[560px] text-[14.5px] leading-[1.6]">{c.summary}</p>
                  <span
                    className="ed-accent-text mt-1 inline-flex items-center gap-2"
                    style={{ fontFamily: JAKARTA, fontSize: 14, fontWeight: 600 }}
                  >
                    Read the story
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3. Quote ──────────────────────────────────────
          The page's last section, so it carries the resolve to
          CLOSING_BASE itself. There is no CTA band after it. */}
      <section className="relative w-full" style={{ backgroundColor: "#0B1220" }}>
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 55%, ${CLOSING_BASE} 100%)` }}
        />
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative m-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-[72px] lg:grid-cols-[1fr_auto] lg:gap-14"
        >
          <blockquote
            className="m-0 leading-[1.4] tracking-[-0.02em]"
            style={{
              fontFamily: JAKARTA, fontWeight: 600, color: "#EEF2F8", textWrap: "pretty",
              fontSize: "clamp(1.25rem, 0.85rem + 1vw, 1.625rem)",
            }}
          >
            &ldquo;{QUOTE.text}&rdquo;
          </blockquote>
          <figcaption
            className="flex flex-col gap-1 border-t pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
            style={{ borderColor: "rgba(238,242,248,0.18)" }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "#EEF2F8" }}>{QUOTE.name}</span>
            <span style={{ fontSize: 13, color: "rgba(238,242,248,0.65)" }}>{QUOTE.role}</span>
          </figcaption>
        </motion.figure>
      </section>
    </>
  );
}
