"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG, SCRIM } from "@/lib/data/hero-backgrounds";
import { Band, CARD, EASE, JAKARTA, MONO, Meta, Reveal, SectionHead } from "@/components/platform/shared";

/**
 * /case-studies
 *
 * Migrated off the legacy styling (raw Tailwind, hardcoded hex, the old
 * `bg-hero-gradient` band) onto the editorial system, per DESIGN.md §2:
 * legacy pages migrate when next touched.
 *
 * **Every figure here is already published**, on the detail page each card
 * links to. Nothing on this page is new or unsourced, and no fourth card
 * gets added without a story behind it. The three per-brand accent colours
 * the old page used (#C2185B, #7B1FA2) are gone: brand colour on a card
 * that is not that brand's own surface reads as decoration, and the site's
 * accent discipline is one blue used sparingly.
 *
 * The section forms, per DESIGN.md §1.1: the hero is *proof at scale*, so
 * it carries the three headline figures as an artifact rather than
 * describing them; the index is *a report* of what each network changed,
 * so it is one row per story with the number set large and the logo
 * carrying the brand rather than a coloured panel.
 */

const ON_DARK_ACCENT = "#9FE0F8";
const ON_DARK_DIM = "rgba(245,237,224,0.55)";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const RULE = "rgba(245,237,224,0.16)";

const HERO = HERO_BG.default;

/* The three headline figures, each one lifted from the detail page it
   links to. Order is by size of network, not by size of number. */
const HEADLINE: { stat: string; label: string; brand: string }[] = [
  { stat: "67%",    label: "fewer repetitive questions reaching the team", brand: "WSI" },
  { stat: "93%",    label: "resolved without a person, through a cutover", brand: "DekaLash" },
  { stat: "650+",   label: "hours of support time returned in six months", brand: "DivaDance" },
];

const STORIES: {
  brand: string;
  logo: string;
  slug: string;
  problem: string;
  stat: string;
  statLabel: string;
  secondary: { value: string; label: string }[];
  body: string;
}[] = [
  {
    brand: "WSI",
    logo: "/logos/stories/wsi.svg",
    slug: "/case-studies/wsi",
    problem: "Questions piled up overnight, in every time zone",
    stat: "67%",
    statLabel: "fewer repetitive questions",
    secondary: [
      { value: "Global", label: "network served" },
      { value: "24/7",   label: "across time zones" },
    ],
    body: "A global network of digital marketing consultants, spread across countries and time zones. Every morning started with a backlog of questions that already had documented answers. The knowledge existed; it just was not reachable at the hour anyone needed it.",
  },
  {
    brand: "DekaLash",
    logo: "/logos/stories/dekalash.png",
    slug: "/case-studies/dekalash",
    problem: "A technology cutover across 400 locations",
    stat: "93%",
    statLabel: "resolved without a person",
    secondary: [
      { value: "430+",  label: "questions deflected" },
      { value: "< 30s", label: "average response" },
    ],
    body: "A cutover is the worst possible week to be short-staffed on support, because every location has the same question at the same time. Franchisees started telling each other to use it, which is the adoption number nobody plans for.",
  },
  {
    brand: "DivaDance",
    logo: "/logos/stories/divadance.png",
    slug: "/case-studies/divadance",
    problem: "A small team, and a network that asks at nine at night",
    stat: "2,600+",
    statLabel: "queries answered in six months",
    secondary: [
      { value: "650+",     label: "hours returned" },
      { value: "6 months", label: "to get there" },
    ],
    body: "Scheduling, marketing, music licensing, event coordination. A passionate network asks a lot of questions, and a small team answering them one at a time is a ceiling on how fast the brand can grow.",
  },
];

export default function CaseStudiesContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────
          Photographic, matching every other sub-page. The three figures
          sit in the hero as an artifact rather than being described,
          because on a case-studies index the numbers are the argument. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${SCRIM.heroSubPage})` }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(58% 52% at 82% 12%, rgba(159,224,248,0.16) 0%, rgba(159,224,248,0) 70%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Case studies
            </p>
            <h1
              className="mt-5 max-w-[880px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                /* Ceiling derived at 1440: the longer clause measures
                   ~620px at 40px inside the 880px cap. Break is lg-only. */
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              The work stopped landing on a person.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                Here&rsquo;s what that returned.
              </span>
            </h1>
            <p className="mt-6 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              A global agency network, a four-hundred-location technology cutover, and a studio
              brand whose franchisees ask at nine at night. Three problems, three networks, and
              the number each one moved.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#stories" className="ed-btn ed-btn-secondary-dark inline-flex">Read the stories</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] sm:grid-cols-3"
            style={{ backgroundColor: RULE, border: `1px solid ${RULE}` }}
          >
            {HEADLINE.map((h) => (
              <div key={h.brand} className="px-5 py-5" style={{ backgroundColor: "rgba(4,26,44,0.55)" }}>
                <span
                  style={{
                    fontFamily: JAKARTA, fontWeight: 700, fontSize: 34, lineHeight: 1,
                    letterSpacing: "-0.03em", color: ON_DARK_ACCENT, fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {h.stat}
                </span>
                <p className="mt-2.5 text-[13.5px] leading-snug" style={{ color: ON_IMAGE }}>{h.label}</p>
                <p className="mt-3 uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_DIM }}>
                  {h.brand}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. The stories ────────────────────────────────
          One row per story rather than a card grid: three cards side by
          side make the networks look interchangeable, and the whole point
          is that each had a different problem. The number is set large
          and the logo carries the brand, so no per-brand accent colour is
          needed. */}
      <Band id="stories">
        <SectionHead
          eyebrow="Three networks"
          title="Different problems. The same thing stopped happening."
          sub="Every figure below is from the story it links to. Nothing here is a projection."
        />

        <div className="mt-10">
          {STORIES.map((s, i) => (
            <Reveal key={s.brand} delay={i * 0.08}>
              <Link
                href={s.slug}
                className="group grid grid-cols-1 gap-6 py-9 lg:grid-cols-[220px_1fr_auto] lg:gap-10"
                style={{ borderTop: i === 0 ? "1px solid var(--ed-border)" : "1px solid var(--ed-rule)" }}
              >
                {/* Brand. The logo does the identifying, so the old
                    coloured initial tile is gone. */}
                <div className="flex flex-col gap-4">
                  <Image
                    src={s.logo}
                    alt={s.brand}
                    width={160}
                    height={40}
                    className="h-auto w-[112px] object-contain object-left"
                  />
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {s.secondary.map((x) => (
                      <div key={x.label}>
                        <span className="ed-fg block text-[15px]" style={{ fontFamily: MONO, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                          {x.value}
                        </span>
                        <span className="ed-fg-muted block text-[12px] leading-snug">{x.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-w-0">
                  <Meta>{s.problem}</Meta>
                  <p
                    className="ed-fg mt-3 text-[19px] tracking-[-0.02em] transition-colors group-hover:text-[color:var(--ed-accent-text)]"
                    style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {s.stat} {s.statLabel}
                  </p>
                  <p className="ed-fg-muted mt-3 max-w-[560px] text-[14.5px] leading-relaxed">{s.body}</p>
                </div>

                <div className="flex items-end lg:items-center">
                  <span
                    className="inline-flex items-center gap-2 text-sm"
                    style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}
                  >
                    Read the story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 3. CTA ────────────────────────────────────────
          Replaces the old sticky sidebar. A sidebar that repeats the
          numbers already on the page is the same idea shown twice, and
          every other page closes on this band. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${SCRIM.closing})` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24"
        >
          <h2
            className="leading-[1.06] tracking-[-0.03em]"
            style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "820px" }}
          >
            Tell us what your network asks most.
          </h2>
          <p className="mt-5 max-w-[620px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll show you which of it never needed a person, using your own material.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <Link href="/platform/answers" className="ed-btn ed-btn-secondary-dark inline-flex">
              How answers work
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
