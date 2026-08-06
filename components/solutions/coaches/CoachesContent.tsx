"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG } from "@/lib/data/hero-backgrounds";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import { BriefConsole, PlayArtifact, WeekCalendar } from "./artifacts";
import { DECIDES, FAQS, HANDLES, RELATED, TAXES, TONE } from "./data";

/**
 * /solutions/coaches
 *
 * Rebuilt from the supplied design handoff. Nine sections: hero with the
 * Monday brief, what reaches you first, the week, the play, EZee clears
 * the way, the quote, the FAQ, related, closing.
 *
 * Deleted deliberately: the before/after toggle table, the
 * `{{TBD:touchpoints/*}}` stat wall, every section eyebrow, and the
 * duplicated brief artifact. **The brief appears once, in the hero.**
 *
 * **Voice rule, every line:** never call the product "it" or "this".
 * Name it, EZee Assist or EZee. Keep that for anything added.
 *
 * **No lettermark "E" tile anywhere on this page.** Product console
 * headers carry the EZee flower mark, committed at
 * `public/logos/ezee-flower-black.png`.
 *
 * ── Deviation from the handoff, on request ──────────────────
 * The handoff specifies a wine gradient hero (`#4E1B26`). **The hazy
 * photographic `mauve` variant is used instead**, per direct
 * instruction: it is the rose-family recolour of the homepage
 * photograph, so the page keeps a hazy hero while still reading warm
 * rather than blue. It carries its own measured scrim and its own
 * rose-tinted scrim colour from the registry. Wine survives as `--wine`
 * for the brief's ranking badges and section marks.
 *
 * Three loops: the 16s hero brief, the 18s play typing, and the icon
 * micro-loops. The week is a state machine rather than a loop because
 * its day columns are click-seekable. All resolve to their finished
 * state under reduced motion.
 */

const HERO = HERO_BG.mauve;
const SKY = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)",
  letterSpacing: "-0.03em", lineHeight: 1.1, textWrap: "pretty" as const,
};

const META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

export default function CoachesContent() {
  return (
    <div className="ed-coaches">
      {/* ── 1. Hero ───────────────────────────────────────
          The hazy photograph, kept on request rather than the handoff's
          wine gradient. The brief appears here and nowhere else. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimTint},${HERO.scrim})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.02fr_.98fr] lg:gap-14"
        >
          <div className="flex flex-col items-start">
            <p style={{ ...META, letterSpacing: "0.16em", color: SKY }}>For field coaches and FBCs</p>
            <h1
              className="mt-5"
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1,
                fontSize: "clamp(1.75rem, 0.9rem + 2.5vw, 2.9375rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              Walk into every call already prepared.{" "}
              <span style={{ color: SKY }}>Then have your plays run where you can&rsquo;t be.</span>
            </h1>
            <p className="mt-5 max-w-[500px] text-base md:text-[17.5px] leading-[1.6]" style={{ color: ON_IMAGE }}>
              The questions, the chasing, and the report building stop reaching you. What each of
              your locations needs is waiting when you sit down, and the play you build once runs at
              all of them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              <a href="#week" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">See the week</a>
            </div>
          </div>

          <BriefConsole />
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. What reaches you first ─────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>
              You were hired to grow locations.{" "}
              <span className="ed-accent-text">Here is what gets to you first.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Thirty locations, one calendar, and your best work fits in what&rsquo;s left.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TAXES.map((t, i) => {
              const [bg, fg] = TONE[t.tone];
              return (
                <Reveal key={t.title} delay={(i % 4) * 0.06}>
                  <div className="ed-card ed-border flex h-full flex-col gap-3.5 rounded-2xl border p-5">
                    <span
                      className="flex h-[54px] w-[54px] flex-none items-center justify-center rounded-2xl"
                      style={{ background: bg, color: fg }}
                      aria-hidden="true"
                    >
                      <span className={t.anim}><Glyph d={t.d} size={26} /></span>
                    </span>
                    <span className="ed-fg text-[17px] font-semibold tracking-[-0.02em]">{t.title}</span>
                    <span className="ed-fg-muted text-[14px] leading-[1.55]">{t.body}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. The week ───────────────────────────────────
          The day columns are buttons: clicking jumps the sequence and
          restarts the timer, so skip-ahead and skip-back both work. */}
      <section id="week" className="ed-bg-alt w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>
              Monday to Friday, <span className="ed-accent-text">with EZee running.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              The same territory, the same twelve locations. What changes is what your hours go to.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-9"><WeekCalendar /></Reveal>
        </div>
      </section>

      {/* ── 4. The play ───────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20 lg:grid-cols-[.84fr_1.16fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg" style={H2}>
              The thing you&rsquo;d do for every location,{" "}
              <span className="ed-accent-text">done for every location.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Describe the play once, in plain language, no fields to configure. EZee Assist runs it
              wherever it applies, in each location&rsquo;s own context, and HQ approves anything
              that publishes network-wide.
            </p>
            <Link href="/platform/control-center" className="ed-accent-text inline-flex w-fit items-center gap-2 text-[14px] font-semibold">
              How publishing is governed
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}><PlayArtifact /></Reveal>
        </div>
      </section>

      {/* ── 5. EZee clears the way ────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>EZee clears the way, so your coaching gets amplified.</h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Nothing reaches an owner, a customer, or your books without a human approving it. The
              judgment was always the job. EZee handles everything else.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="ed-card ed-border flex h-full flex-col gap-3.5 rounded-2xl border p-6">
                <span className="ed-fg-muted" style={META}>EZee handles</span>
                {HANDLES.map((h) => (
                  <span key={h} className="ed-fg flex items-start gap-3 text-[16.5px] leading-[1.5]">
                    <span className="flex-none" style={{ color: "var(--ok)" }} aria-hidden="true">✓</span>{h}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div
                className="ed-card flex h-full flex-col gap-3.5 rounded-2xl p-6"
                style={{ border: "1.5px solid var(--chip-bd)" }}
              >
                <span className="ed-accent-text" style={META}>You decide</span>
                {DECIDES.map((d) => (
                  <span key={d} className="ed-fg flex items-start gap-3 text-[16.5px] leading-[1.5]">
                    <span className="ed-accent-text flex-none" aria-hidden="true">→</span>{d}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 6. Quote ──────────────────────────────────────── */}
      <section className="w-full" style={{ background: "#0B1220" }}>
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="m-0 mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20"
        >
          <blockquote
            className="m-0 max-w-[900px] leading-[1.45] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontSize: "clamp(1.125rem, 0.7rem + 1.1vw, 1.5rem)", fontWeight: 600, color: "#EEF2F8", textWrap: "pretty" }}
          >
            &ldquo;Since we implemented EZee Assist, my owners not only get faster answers to their
            questions and a shorter path to the resources we have for them, but my human-power has
            been reallocated to coaching, relationship building, and innovation. The impact of that
            has led to increased owner retention, more topline revenue, and happier employees at my
            HQ!&rdquo;
          </blockquote>
          <figcaption className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <span className="flex items-center gap-4">
              <Image src="/photos/jami-stigliano.jpg" alt="" width={52} height={52} className="h-[52px] w-[52px] flex-none rounded-full object-cover" />
              <span className="flex flex-col gap-0.5">
                <span style={{ fontSize: 15, fontWeight: 600, color: "#EEF2F8" }}>Jami Stigliano</span>
                <span style={{ fontSize: 13, color: "rgba(238,242,248,.65)" }}>Founder &amp; CEO, DivaDance</span>
              </span>
            </span>
            <Link
              href="/case-studies/divadance"
              className="inline-flex flex-none items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3"
              style={{ background: "#FFFFFF", color: "#0A0A0A", fontFamily: JAKARTA, fontSize: 14, fontWeight: 600 }}
            >
              Read the case study
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </figcaption>
        </motion.figure>
      </section>

      {/* ── 7. FAQ ────────────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20 lg:grid-cols-[.5fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="ed-fg" style={H2}>
              What coaches <span className="ed-accent-text">ask first.</span>
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {FAQS.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06}>
                <div className={`flex flex-col gap-2 py-5 ${i === 0 ? "ed-rule border-t" : "ed-rule border-t"}`}>
                  <span className="ed-fg text-[16px] font-semibold">{q}</span>
                  <span className="ed-fg-muted text-[14.5px] leading-[1.6]">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Related ────────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:px-12 lg:px-16 py-14 md:py-16 min-[1200px]:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.06}>
              <Link href={r.href} className="ed-card ed-border ed-story-card flex h-full flex-col gap-2 rounded-2xl border px-4 py-5 sm:px-6">
                <span className="ed-accent-text" style={{ ...META, letterSpacing: "0.14em" }}>{r.kicker}</span>
                <span className="ed-fg whitespace-nowrap text-[14.5px] font-semibold leading-[1.45]">{r.title}</span>
                <ArrowRight className="ed-accent-text h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 9. Closing ────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimTint},${(HERO.scrim + 0.04).toFixed(2)})` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1,
                fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.625rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              Bring us one of <span style={{ color: SKY }}>your territories.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              We&rsquo;ll build the Monday brief for it and show you what would have been waiting for
              you this week.
            </p>
          </div>
          <div className="flex items-start justify-start self-stretch lg:items-end lg:justify-end">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
