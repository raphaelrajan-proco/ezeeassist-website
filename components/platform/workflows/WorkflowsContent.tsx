"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import HeroDemo from "./HeroDemo";
import IndustryPlays from "./IndustryPlays";
import { BUILD_ROWS, TIMELINE, TRIGGERS } from "./data";

/**
 * /platform/workflows
 *
 * Rebuilt from the supplied design handoff. Six sections: hero with the
 * animated demo, the industry library, authoring, triggers, over time,
 * and the closing band. The handoff also specs a navbar and a footer;
 * those are the prototype standing in for this repo's shared ones and
 * are not rebuilt here.
 *
 * The page argues one idea end to end: a coach writes a judgment call
 * down once, in plain language, and it then runs at every location the
 * coach covers, reading each location's own numbers before it acts.
 *
 * ── Deviation from the handoff, on request ──────────────────
 * The handoff specifies its own deep-green band (`#1F3630`) with a photo
 * that was never chosen. **The existing hazy forest hero is kept**, per
 * direct instruction: it belongs to the platform variant set in
 * `lib/data/platform-heroes.ts`. That also settles the handoff's open
 * item about the hero and CTA photos, since both bands now use a
 * committed image. The on-band accent stays `#8CC5DC`, the handoff's,
 * which sits correctly on forest.
 *
 * **The hero demo is the only animated thing on the page.** Everything
 * else is a `whileInView` entrance. Do not add a second loop here; the
 * demo carries the argument and a competing animation would dilute it.
 *
 * Every count on this page is illustrative, which is why the Over time
 * section carries a visible line saying so. That line stays until real
 * figures replace them.
 */

const HERO = platformHero("workflows");
const SKY = "#8CC5DC";
const ON_IMAGE = "rgba(240,246,243,0.92)";

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)",
  letterSpacing: "-0.03em", lineHeight: 1.08,
  textWrap: "pretty" as const,
};

const EYEBROW = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.16em", textTransform: "uppercase" as const,
};

const LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

export default function WorkflowsContent() {
  return (
    <div className="ed-workflows">
      {/* ── 1. Hero ───────────────────────────────────────
          The hazy forest variant, kept on request rather than the
          handoff's own green band. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ background: HERO.scrimCss ?? `rgba(${HERO.scrimRgba})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-18 md:py-20 lg:grid-cols-2 lg:gap-16"
        >
          <div className="flex max-w-[500px] flex-col items-start">
            <p style={{ ...EYEBROW, color: SKY }}>Coaching orchestration</p>
            <h1
              className="mt-5"
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08,
                fontSize: "clamp(1.875rem, 1.2rem + 2.2vw, 3.25rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              Build the play once.
              <br />
              <span style={{ color: SKY }}>It runs at every location, on that location&rsquo;s numbers.</span>
            </h1>
            <p className="mt-5 max-w-[440px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              A coach writes down the check they&rsquo;d run, the number that would worry them, and
              the call they&rsquo;d make. It happens at every location.
            </p>
            <Link
              href="/speak-to-an-expert"
              className="ed-btn ed-btn-arrow mt-7 inline-flex flex-none whitespace-nowrap"
              style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
            >
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
            </Link>
          </div>

          <HeroDemo />
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. Industry plays ─────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="mx-auto flex max-w-[640px] flex-col items-center gap-3.5 text-center">
            <p className="ed-fg-muted" style={EYEBROW}>Written by coaches</p>
            <h2 className="ed-fg max-w-[19ch]" style={H2}>
              A coach&rsquo;s expertise, arriving the moment it matters
            </h2>
            <p className="ed-fg-muted max-w-[520px] text-[15.5px] leading-[1.6]">
              Every workflow here was written by a coach who knew where the growth was hiding. Each
              one now runs at every location that fits, on that location&rsquo;s own numbers, at the
              hour it matters.
            </p>
          </Reveal>

          <IndustryPlays />
        </div>
      </section>

      {/* ── 3. Authoring ──────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[620px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>Authoring</p>
            <h2 className="ed-fg" style={H2}>The coach types a play. The system builds the workflow.</h2>
            <p className="ed-fg-muted text-[15.5px] leading-[1.6]">
              A coach who has never configured anything can write one in a couple of minutes. Dana
              never opens a canvas.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            <Reveal>
              <div className="ed-card ed-border flex h-full flex-col rounded-2xl border px-6 py-6" style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.04)" }}>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full"
                    style={{ background: "#0A0A0A", color: "#FFFFFF", fontFamily: MONO, fontSize: 12, fontWeight: 700 }}
                    aria-hidden="true"
                  >
                    DR
                  </span>
                  <span className="ed-fg text-[13.5px] font-semibold">Dana R.</span>
                  <span className="ed-fg-muted" style={LABEL}>Field coach</span>
                  <span className="ed-fg-muted ml-auto" style={LABEL}>Step 1 · typed</span>
                </div>

                {/* The marks are what make this read as a sentence with
                    parameters in it rather than a form. */}
                <p className="ed-fg mt-5 text-[17px] leading-[1.65]" style={{ textWrap: "pretty" }}>
                  When next week drops below <Mark>70% booked</Mark>, check{" "}
                  <Mark>what campaigns are running</Mark> and pull the <Mark>lapsed client list</Mark>.
                  Draft the <Mark>reactivation offer</Mark>, hold it for the{" "}
                  <Mark>owner to approve</Mark>, and tell me it went out.
                </p>

                <div className="mt-auto flex items-center gap-3 pt-6">
                  <span className="ed-fg-muted flex-none" style={LABEL}>Plain language</span>
                  <span className="ed-rule h-px flex-1 border-t" aria-hidden="true" />
                  <span className="ed-fg-muted flex-none" style={LABEL}>2 min</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="ed-card ed-border flex h-full flex-col overflow-hidden rounded-2xl border" style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.04)" }}>
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4" style={{ background: "#0A0A0A" }}>
                  <span style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "#FFFFFF" }}>
                    Soft week recovery
                  </span>
                  <span style={{ ...LABEL, color: "rgba(255,255,255,0.65)" }}>Step 2 · what runs</span>
                </div>
                <div className="px-6 pb-5 pt-2">
                  {BUILD_ROWS.map(([k, val], i) => (
                    <div
                      key={k}
                      className={`grid grid-cols-1 items-baseline gap-x-4 gap-y-1 py-3 sm:grid-cols-[minmax(72px,88px)_1fr] ${i === BUILD_ROWS.length - 1 ? "" : "ed-rule border-b"}`}
                    >
                      <span className="ed-fg-muted" style={LABEL}>{k}</span>
                      <span className="ed-fg text-[14px] leading-[1.45]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Triggers ───────────────────────────────────
          Drift carries the accent ring because it is the one nobody
          catches by hand, which is the point of the section. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[620px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>Triggers</p>
            <h2 className="ed-fg" style={H2}>
              Knowing what to look for was never the problem. Watching for it everywhere was.
            </h2>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRIGGERS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.05}>
                <div
                  className="ed-card flex h-full flex-col rounded-[14px] px-5 py-5"
                  style={{
                    boxShadow: t.drift
                      ? "0 0 0 1.5px #0077A8, 0 6px 20px rgba(0,119,168,0.12)"
                      : "0 0 0 1px var(--ed-border), 0 4px 14px rgba(10,10,10,0.05)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-[7px] w-[7px] flex-none rounded-full"
                      style={{ background: t.drift ? "#0077A8" : "#D4D4D8" }}
                      aria-hidden="true"
                    />
                    <span style={{ ...LABEL, letterSpacing: "0.14em", color: t.drift ? "var(--ed-accent-text)" : "var(--ed-fg-muted)" }}>
                      {t.drift ? "Hardest to catch" : "Trigger"}
                    </span>
                  </span>
                  <span
                    className="ed-fg mt-3.5"
                    style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15 }}
                  >
                    {t.name}
                  </span>
                  <span className="ed-fg-muted mt-2 text-[14px] leading-[1.5]">{t.desc}</span>
                  <span
                    className="ed-fg mt-auto rounded-[10px] px-3.5 py-3"
                    style={{
                      marginTop: 18, fontFamily: MONO, fontSize: 12, lineHeight: 1.5,
                      background: t.drift ? "rgba(0,119,168,0.06)" : "var(--ed-card-alt)",
                    }}
                  >
                    {t.example}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Over time ──────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex max-w-[420px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>Over time</p>
            <h2 className="ed-fg" style={H2}>Every workflow developed is one nobody has to think about again.</h2>
            <p className="ed-fg-muted text-[15.5px] leading-[1.6]">
              A workflow written for one problem keeps solving it, and one that works in a single
              location can get published to the rest.
            </p>
            {/* Stays until real customer figures replace these. */}
            <p className="ed-fg-muted mt-2 text-[12px]">Counts are illustrative.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="ed-card ed-border rounded-2xl border px-5 pb-3.5 pt-1.5 sm:px-8">
              {TIMELINE.map((r, i) => (
                <div
                  key={r.month}
                  className={`grid grid-cols-1 items-start gap-x-6 gap-y-2 py-6 sm:grid-cols-[minmax(84px,96px)_minmax(70px,88px)_1fr] ${i === 0 ? "" : "ed-rule border-t"}`}
                >
                  <span className="ed-fg-muted pt-2" style={LABEL}>{r.month}</span>
                  <span
                    style={{
                      fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
                      fontSize: "clamp(1.75rem, 1.2rem + 1.4vw, 2.5rem)", fontVariantNumeric: "tabular-nums",
                      color: r.last ? "var(--ed-accent-text)" : "var(--ed-fg)",
                    }}
                  >
                    {r.count}
                  </span>
                  <span className="flex flex-col">
                    <span className="ed-fg text-[16px] font-semibold leading-[1.3] tracking-[-0.01em]">{r.headline}</span>
                    <span className="ed-fg-muted mt-1.5 max-w-[520px] text-[14px] leading-[1.5]">{r.body}</span>
                    <span className="mt-3.5 block h-1.5 overflow-hidden rounded-[3px]" style={{ background: "var(--ed-border)" }} aria-hidden="true">
                      <span
                        className="block h-full rounded-[3px]"
                        style={{ width: `${r.width}%`, background: r.last ? "var(--ed-accent-text)" : "rgba(0,119,168,0.35)" }}
                      />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Closing ────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ background: HERO.closingCss ?? `rgba(${HERO.closingRgba})` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto flex max-w-7xl flex-col items-start px-6 md:px-12 lg:px-16 py-20 md:py-24"
        >
          <h2
            className="max-w-[640px]"
            style={{
              fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08,
              fontSize: "clamp(1.625rem, 1rem + 1.8vw, 2.5rem)", color: "#FFFFFF", textWrap: "pretty",
            }}
          >
            Tell us what your best coach does that nobody else does.
          </h2>
          <p className="mt-4 max-w-[500px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
            We will write it as a play on the call and show you what it would have done at four of
            your locations this week.
          </p>
          <Link
            href="/speak-to-an-expert"
            className="ed-btn ed-btn-arrow mt-7 inline-flex flex-none whitespace-nowrap"
            style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
          >
            Speak to an expert
            <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

/** A parameter inside the coach's sentence. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="rounded-[3px]"
      style={{ background: "rgba(0,119,168,0.10)", color: "var(--ed-accent-text)", padding: "1px 4px" }}
    >
      {children}
    </mark>
  );
}
