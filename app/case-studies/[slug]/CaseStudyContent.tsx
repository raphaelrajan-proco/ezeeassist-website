"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import type { CaseStudy } from "@/lib/data/case-studies";
import { HERO_GRADIENT } from "@/lib/data/hero-backgrounds";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";

/**
 * /case-studies/[slug]
 *
 * The format for every story, built from the supplied design handoff with
 * WSI as the worked example. One templated route rather than a page per
 * story: everything that varies lives in `lib/data/case-studies.ts`, so a
 * new story is a record plus a committed logo.
 *
 * **The hero blue is the ocean family**, shared with the landing page and
 * deliberately not the homepage's. See `HERO_GRADIENT.ocean`.
 *
 * Three fields are optional because the facts behind them were not
 * supplied for every story, and a case study is the last place to invent
 * one: `quote` (DivaDance has no approved quote), `channels` (only WSI's
 * were documented), and the Year row in `meta`. Each is omitted rather
 * than filled with a plausible guess.
 *
 * The rail is sticky from `lg` up. Below that it unsticks and stacks
 * above the prose, and the jump links come with it.
 */

const OC = HERO_GRADIENT.ocean;

const SECTIONS = [
  { id: "challenge", n: "01", title: "The challenge" },
  { id: "solution", n: "02", title: "What EZee Assist changed" },
  { id: "results", n: "03", title: "What it returned" },
] as const;

export default function CaseStudyContent({ study, more }: { study: CaseStudy; more: CaseStudy[] }) {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: OC.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: OC.hero }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto flex max-w-7xl flex-col gap-7 px-6 md:px-12 lg:px-16 pt-14 pb-16 md:pt-16 md:pb-20"
        >
          <Link
            href="/case-studies"
            className="inline-flex w-fit items-center gap-2 text-[13.5px] font-medium transition-colors hover:text-white"
            style={{ color: "rgba(238,249,255,0.85)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            Back to case studies
          </Link>

          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3.5">
                <span
                  className="uppercase"
                  style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", color: OC.accent }}
                >
                  Case study · {study.brand}
                </span>
                <span
                  className="whitespace-nowrap rounded-full uppercase"
                  style={{
                    fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em",
                    color: "rgba(238,249,255,0.75)", border: "1px solid rgba(255,255,255,0.3)", padding: "5px 12px",
                  }}
                >
                  {study.pill}
                </span>
              </div>
              {/* The H1 carries the summary; there is no separate sub-line. */}
              <h1
                className="leading-[1.14] tracking-[-0.03em]"
                style={{
                  color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty",
                  fontSize: "clamp(1.5rem, 0.55rem + 2.5vw, 2.625rem)",
                }}
              >
                {study.h1.lead} <span style={{ color: OC.accent }}>{study.h1.accent}</span>
              </h1>
            </div>

            {/* Key results. Values differ in size and weight as well as
                colour, so the hierarchy survives without hue. */}
            <div
              className="flex flex-col rounded-2xl p-6 md:p-7"
              style={{
                backgroundColor: "rgba(4,28,42,0.4)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="pb-3.5 uppercase"
                style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: OC.accent }}
              >
                Key results
              </span>
              {study.keyResults.map((r, i) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between gap-4"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.14)",
                    padding: i === study.keyResults.length - 1 ? "13px 0 0" : "13px 0",
                  }}
                >
                  <span style={{ fontSize: 13.5, color: "rgba(238,249,255,0.85)" }}>{r.label}</span>
                  <span
                    className="tracking-[-0.02em]"
                    style={{ fontFamily: JAKARTA, fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Body ───────────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[320px_1fr] lg:gap-[72px]">
          {/* Rail. Sticky from lg; below that it stacks above the prose. */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-8">
            <div
              className="flex items-center justify-center rounded-2xl px-7 py-9"
              style={{ backgroundColor: study.panel }}
            >
              <Image
                src={study.logo.src}
                alt={study.logo.alt}
                width={240}
                height={study.logoH.rail}
                className="w-auto object-contain"
                style={{ height: study.logoH.rail }}
              />
            </div>

            <div className="ed-border flex flex-col rounded-2xl border px-6 py-5">
              {study.meta.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex justify-between gap-4 py-2.5 ${i === study.meta.length - 1 ? "" : "ed-rule border-b"}`}
                >
                  <span className="ed-fg-muted text-[13px]">{m.label}</span>
                  <span className="ed-fg text-right text-[13.5px] font-semibold">{m.value}</span>
                </div>
              ))}
            </div>

            <nav className="flex flex-col gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="ed-fg-muted hover:ed-accent-text text-[13.5px] font-medium transition-colors"
                >
                  {s.n} · {s.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Prose. */}
          <div className="flex max-w-[680px] flex-col gap-10">
            {/* The pull-quote leads, when there is one. DivaDance has no
                approved quote, so its prose starts at the challenge. */}
            {study.quote && (
              <Reveal>
                <figure className="ed-quote-card m-0 flex flex-col gap-3.5 rounded-2xl px-7 py-7 md:px-8">
                  <blockquote
                    className="ed-fg m-0 leading-[1.5] tracking-[-0.015em]"
                    style={{ fontFamily: JAKARTA, fontSize: 19.5, fontWeight: 600, textWrap: "pretty" }}
                  >
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="ed-fg-muted text-[13.5px]">
                    <b className="ed-fg">{study.quote.name}</b> · {study.quote.role}
                  </figcaption>
                </figure>
              </Reveal>
            )}

            <Reveal>
              <div id="challenge" className="flex scroll-mt-24 flex-col gap-3.5">
                <h2
                  className="ed-fg tracking-[-0.025em]"
                  style={{ fontFamily: JAKARTA, fontSize: 27, fontWeight: 700 }}
                >
                  The challenge
                </h2>
                {study.challenge.map((p) => (
                  <p key={p} className="ed-fg-muted text-[15.5px] leading-[1.75]">{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div id="solution" className="flex scroll-mt-24 flex-col gap-3.5">
                <h2
                  className="ed-fg tracking-[-0.025em]"
                  style={{ fontFamily: JAKARTA, fontSize: 27, fontWeight: 700 }}
                >
                  What EZee Assist changed
                </h2>
                {study.solution.map((p) => (
                  <p key={p} className="ed-fg-muted text-[15.5px] leading-[1.75]">{p}</p>
                ))}
                {study.channels && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {study.channels.map((ch) => (
                      <span
                        key={ch}
                        className="ed-card-alt ed-border ed-fg-muted rounded-full border uppercase"
                        style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", padding: "7px 13px" }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal>
              <div id="results" className="flex scroll-mt-24 flex-col gap-4.5">
                <h2
                  className="ed-fg tracking-[-0.025em]"
                  style={{ fontFamily: JAKARTA, fontSize: 27, fontWeight: 700 }}
                >
                  What it returned
                </h2>
                <p className="ed-fg-muted text-[15.5px] leading-[1.75]">{study.results}</p>
                <div className="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {study.resultStats.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col gap-1 pt-3.5"
                      style={{ borderTop: "2px solid var(--ed-accent-text)" }}
                    >
                      <span
                        className="ed-fg tracking-[-0.03em]"
                        style={{ fontFamily: JAKARTA, fontSize: 30, fontWeight: 800 }}
                      >
                        {s.value}
                      </span>
                      <span className="ed-fg-muted text-[12.5px] leading-[1.45]">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. More stories ───────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:px-12 lg:px-16 py-14 md:py-16">
          <h2
            className="ed-fg tracking-[-0.025em]"
            style={{ fontFamily: JAKARTA, fontSize: 28, fontWeight: 700 }}
          >
            More stories
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {more.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.08}>
                <Link
                  href={`/case-studies/${m.slug}`}
                  className="ed-card ed-border ed-story-card flex h-full items-center gap-6 rounded-2xl border px-7 py-6"
                >
                  <span
                    className="flex h-16 w-[110px] flex-none items-center justify-center rounded-[10px]"
                    style={{ backgroundColor: m.panel }}
                  >
                    <Image
                      src={m.logo.src}
                      alt={m.logo.alt}
                      width={110}
                      height={m.logoH.chip}
                      className="w-auto object-contain"
                      style={{ height: m.logoH.chip }}
                    />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span
                      className="ed-fg tracking-[-0.015em]"
                      style={{ fontFamily: JAKARTA, fontSize: 16.5, fontWeight: 700 }}
                    >
                      {m.headline}
                    </span>
                    <span className="ed-fg-muted text-[13px]">{m.kicker}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Closing ────────────────────────────────────
          Same ocean family as the hero, mirrored to 285deg and resolving
          to CLOSING_BASE so it seams into the footer. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: OC.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: OC.closing }} />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              className="leading-[1.12] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty",
                fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.5rem)",
              }}
            >
              Your network has a version <span style={{ color: OC.accent }}>of this story.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: OC.body }}>
              Bring the questions your team answers most. We&rsquo;ll show you the same week with
              them already handled, on your own material.
            </p>
          </div>
          {/* Bottom-right against the copy block, no secondary. */}
          <div className="flex items-start justify-start self-stretch lg:items-end lg:justify-end">
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
          </div>
        </motion.div>
      </section>
    </>
  );
}
