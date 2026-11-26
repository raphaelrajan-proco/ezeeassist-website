"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, MessageCircleCheck, MoveRight, Quote, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import MoreStories from "@/app/case-studies/MoreStories";
import { siblings } from "@/lib/data/case-studies";
import { EASE, Reveal } from "@/components/platform/shared";
import DkiRulebookGraphic from "./DkiRulebookGraphic";

/**
 * /case-studies/dki
 *
 * Bespoke, not the `[slug]` template: the design handoff calls for a
 * navy hero with a graphic, a numbers band, linked cards and a
 * two-column story, none of which the template has. Built from
 * `design_handoff_dki_case_study` at high fidelity.
 *
 * **Copy is approved by DKI's CEO and is verbatim.** No insurer or
 * client names anywhere, no em dashes, franchise owners are "members"
 * and the assistant is "Ki".
 *
 * Theme: the navy hero, the blue numbers band and the navy CTA are
 * literal colours and identical in both themes. The white sections read
 * the `--dki-*` tokens in globals.css, which hold the handoff's hexes in
 * light mode and map to the site's editorial dark tokens in dark mode.
 *
 * Type is Geist, loaded by the route and scoped to `<main>`, so the real
 * Navbar and Footer keep the site's fonts.
 *
 * Breakpoints follow the handoff: stacked to 1100px, two columns from
 * 1101px, and a slightly smaller headline and graphic from 1101 to
 * 1240px. 700px is the tablet step inside the stacked layout.
 */

const NAVY = "#0F2035";
const ACCENT = "#00AEEF";
const MONO = "var(--font-dki-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

const QUOTE =
  "Speed to estimate is a competitive advantage in restoration. Through our partnership with EZee Assist, we’re equipping our members to deliver accurate estimates faster, move jobs forward with confidence and better serve property owners.";

const NUMBERS = [
  { n: "24", label: "Insurer and client programs, each with its own rulebook" },
  { n: "53%", label: "Of questions to Ki focused on program-specific rules" },
  { n: "2,800+", label: "Questions in the first 6 months, with monthly question volume tripling" },
];

const CARDS: { title: string; body: string; Icon: LucideIcon; speed?: boolean }[] = [
  {
    title: "Complexity",
    body: "Each program has its own fees, estimating guidelines, approval and documentation requirements.",
    Icon: Layers,
  },
  {
    title: "Clarity",
    body: "Ki delivers actionable, program-specific guidance with sources, right when members need it.",
    Icon: MessageCircleCheck,
  },
  {
    title: "Speed",
    body: "Faster estimates, a faster path to approval and a better experience for property owners.",
    Icon: Zap,
    speed: true,
  },
];

const FACTS = [
  { label: "Client", value: "DKI Canada" },
  { label: "Network", value: "Property restoration" },
  { label: "Year", value: "2026" },
  { label: "Focus", value: "Speed to estimate" },
];

const SECTIONS = [
  {
    id: "challenge",
    n: "01",
    title: "The challenge",
    body: "DKI Canada’s restoration network works across 24 insurer and client programs. Each program has its own fees, estimating guidelines, approval and documentation requirements. Getting an estimate right means finding the right rule for the right program while the estimate is being written.",
  },
  {
    id: "solution",
    n: "02",
    title: "What EZee Assist changed",
    body: "DKI launched Ki, its AI assistant built on EZee Assist and grounded in DKI’s own program documents. Ki delivers actionable, program-specific guidance with sources, right when members need it, from the office or the job site.",
  },
  {
    id: "results",
    n: "03",
    title: "The results",
    body: "Members asked Ki more than 2,800 questions in the first 6 months, with monthly question volume tripling. 53% of those questions focused on program-specific rules. The outcome is faster estimates, a faster path to approval and a better experience for property owners.",
  },
];

/* Page container: 1280px, 24px gutters on phones and 32px from 700px. */
const WRAP = "mx-auto w-full max-w-[1280px] px-6 min-[700px]:px-8";

/* The numbers band and the cards share this track so their columns line up. */
const TRACK = "grid grid-cols-1 min-[1101px]:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_56px_minmax(0,1fr)]";

const monoLabel: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 12,
  lineHeight: "16px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

function SpeakButton() {
  return (
    <Link
      href="/speak-to-an-expert"
      className="ed-btn ed-btn-blue dki-btn"
      style={{ padding: "14px 36px", fontSize: 16, lineHeight: "24px", fontWeight: 600, letterSpacing: 0 }}
    >
      Speak to an expert
    </Link>
  );
}

export default function DkiCaseStudy() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="w-full text-white" style={{ backgroundColor: NAVY }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`${WRAP} ed-hero-pad pb-14 min-[1101px]:pb-20`}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold leading-5 text-[#9FB4CB] transition-colors hover:text-[#00AEEF]"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
            Back to Case Studies
          </Link>

          {/* Lockup, label and chip. */}
          <div className="mt-7 mb-10 flex flex-wrap items-center gap-x-5 gap-y-3.5">
            <div className="flex h-12 flex-none items-center gap-3 rounded-xl bg-white px-4">
              <Image
                src="/logos/stories/dki.png"
                alt="DKI Canada"
                width={454}
                height={111}
                priority
                className="block w-auto"
                style={{ height: 16 }}
              />
              <span aria-hidden="true" className="text-[13px] leading-none text-[#8A98A8]">×</span>
              {/* The navbar's own EZee mark. The SVG carries padding around
                  its ink, so it is cropped to the ink box (519 x 87.9 of a
                  583.2 x 151.2 viewBox) at a 27.9px cap height, matching
                  the DKI mark. The tile is white in both themes, so the
                  dark-on-light version is the right one in both. */}
              <span className="relative block overflow-hidden" style={{ width: 164.8, height: 27.9 }}>
                <Image
                  src="/logo-black.svg"
                  alt="EZee Assist"
                  width={185}
                  height={48}
                  unoptimized
                  priority
                  className="absolute block max-w-none"
                  style={{ left: -10.13, top: -10.28, height: 48, width: "auto" }}
                />
              </span>
            </div>
            <span className="whitespace-nowrap text-[#9FB4CB]" style={monoLabel}>
              Case study · DKI Canada
            </span>
            <span
              className="whitespace-nowrap rounded-[6px] text-[#C9D6E4]"
              style={{ ...monoLabel, fontSize: 12, border: "1px solid rgba(201,214,228,0.45)", padding: "4px 10px" }}
            >
              Speed to estimate
            </span>
          </div>

          {/* Text, graphic, button. Stacked in that order to 1100px; from
              1101px the graphic takes the right column across both rows. */}
          <div
            className="grid grid-cols-1 min-[1101px]:grid-cols-[minmax(0,1fr)_428px] min-[1241px]:grid-cols-[minmax(0,1fr)_495px] min-[1101px]:gap-x-14
                       [--g:0.74] max-[380px]:[--g:0.64] min-[700px]:[--g:1] min-[1101px]:[--g:0.95] min-[1241px]:[--g:1.1]"
          >
            <div className="min-w-0">
              <p className="mb-3 text-[18px] font-semibold leading-[26px]" style={{ color: ACCENT }}>
                The hardest part of restoration isn’t the restoration.
              </p>
              <h1
                className="m-0 text-[32px] leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[28px] min-[700px]:text-[44px] min-[1101px]:text-[46px] min-[1241px]:text-[56px]"
                style={{ fontWeight: 700 }}
              >
                <span className="block whitespace-nowrap">Faster estimates,</span>
                <span className="block whitespace-nowrap">built on the right rules.</span>
              </h1>
              <p className="mt-[22px] max-w-[600px] text-[16px] leading-[26px] text-[#C9D6E4] min-[700px]:text-[18px] min-[700px]:leading-[30px]">
                Ki, DKI’s AI assistant built on EZee Assist, brings program-specific guidance directly into the
                estimating process, helping members move jobs forward faster and deliver accurate estimates to
                property owners sooner.
              </p>
            </div>

            <div className="mt-8 justify-self-start self-center min-[1101px]:col-start-2 min-[1101px]:row-span-2 min-[1101px]:row-start-1 min-[1101px]:mt-0 min-[1101px]:justify-self-end">
              <DkiRulebookGraphic />
            </div>

            <div className="mt-8 min-[1101px]:col-start-1 min-[1101px]:row-start-2">
              <SpeakButton />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Numbers band ───────────────────────────────── */}
      <section
        className="w-full text-white"
        style={{ background: "linear-gradient(100deg, #0879BA 0%, #06649F 100%)" }}
      >
        <div className={`${WRAP} py-11 min-[1101px]:py-14`}>
          <div className={TRACK}>
            {NUMBERS.map((s, i) => (
              <div key={s.n} className="contents">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="my-7 block h-px w-full justify-self-center min-[1101px]:my-0 min-[1101px]:h-auto min-[1101px]:w-px"
                    style={{ background: "rgba(255,255,255,0.32)" }}
                  />
                )}
                <div>
                  <div
                    className="whitespace-nowrap text-[60px] leading-none tracking-[-0.045em] min-[1101px]:text-[72px]"
                    style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
                  >
                    {s.n}
                  </div>
                  <p className="mt-3.5 max-w-[320px] text-[17px] font-medium leading-[26px]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How it works ───────────────────────────────── */}
      <section className="w-full" style={{ backgroundColor: "var(--dki-surface)" }}>
        <div className={`${WRAP} pt-14 min-[1101px]:pt-[88px]`}>
          <p className="mb-7" style={{ ...monoLabel, color: "var(--dki-label)" }}>
            How it works
          </p>
          <div className={`${TRACK} items-stretch`}>
            {CARDS.map((c, i) => (
              <div key={c.title} className="contents">
                {i > 0 && (
                  <div aria-hidden="true" className="flex min-h-9 items-center justify-center">
                    <MoveRight
                      size={28}
                      strokeWidth={1.8}
                      color={i === 1 ? "#7896B3" : ACCENT}
                      className="rotate-90 min-[1101px]:rotate-0"
                    />
                  </div>
                )}
                <Reveal delay={i * 0.08} className="flex">
                  <div
                    className="w-full rounded-2xl border p-7"
                    style={{
                      backgroundColor: c.speed ? "var(--dki-speed-bg)" : "var(--dki-card)",
                      borderColor: c.speed ? "var(--dki-speed-bd)" : "var(--dki-line)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <c.Icon
                        size={28}
                        strokeWidth={1.8}
                        className="flex-none"
                        style={{ color: c.speed ? "var(--dki-speed-ink)" : "var(--dki-icon)" }}
                        aria-hidden="true"
                      />
                      <h3
                        className="m-0 text-[24px] leading-[30px] tracking-[-0.025em]"
                        style={{ fontWeight: 700, color: c.speed ? "var(--dki-speed-ink)" : "var(--dki-ink)" }}
                      >
                        {c.title}
                      </h3>
                    </div>
                    <p
                      className="mt-3.5 text-[16px] leading-[26px]"
                      style={{ color: c.speed ? "var(--dki-speed-body)" : "var(--dki-body)" }}
                    >
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Two-column story ───────────────────────────── */}
      <section className="w-full" style={{ backgroundColor: "var(--dki-surface)" }}>
        <div
          className={`${WRAP} grid grid-cols-1 items-start gap-9 py-14 min-[1101px]:grid-cols-[320px_minmax(0,1fr)] min-[1101px]:gap-[72px] min-[1101px]:py-[88px]`}
        >
          {/* Rail. Sticky from 1101px; static and above the prose below. */}
          <aside className="flex min-w-0 flex-col gap-5 min-[1101px]:sticky min-[1101px]:top-24">
            <div
              className="flex items-center justify-center rounded-2xl border px-6 py-8"
              style={{ backgroundColor: "var(--dki-tint)", borderColor: "var(--dki-line)" }}
            >
              {/* White tile in both themes: the supplied logo has a white
                  background and is never recoloured. */}
              <div className="flex items-center rounded-xl bg-white px-5 py-3.5">
                <Image
                  src="/logos/stories/dki.png"
                  alt="DKI Canada"
                  width={454}
                  height={111}
                  className="block w-auto"
                  style={{ height: 40 }}
                />
              </div>
            </div>

            <dl
              className="m-0 rounded-2xl border px-6 py-1.5"
              style={{ backgroundColor: "var(--dki-card)", borderColor: "var(--dki-line)" }}
            >
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 py-3.5"
                  style={i > 0 ? { borderTop: "1px solid var(--dki-line)" } : undefined}
                >
                  <dt style={{ ...monoLabel, color: "var(--dki-muted)" }}>{f.label}</dt>
                  <dd className="m-0 text-right text-[15px] font-semibold leading-[22px]" style={{ color: "var(--dki-ink)" }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <nav aria-label="On this page" className="hidden flex-col gap-3 px-6 pt-2 min-[1101px]:flex">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-baseline gap-3 text-[15px] font-medium leading-[22px] text-[color:var(--dki-body)] transition-colors hover:text-[#00AEEF]"
                >
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: ACCENT }}>{s.n}</span>
                  <span>{s.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Prose. */}
          <div className="flex min-w-0 max-w-[760px] flex-col gap-[52px]">
            <Reveal>
              <figure
                className="relative m-0 mt-4 rounded-2xl border p-8"
                style={{ backgroundColor: "var(--dki-quote-bg)", borderColor: "var(--dki-quote-bd)" }}
              >
                <Quote
                  size={32}
                  fill={ACCENT}
                  strokeWidth={0}
                  aria-hidden="true"
                  className="absolute -top-4 left-6 opacity-30"
                />
                <blockquote
                  className="m-0 mb-6 text-[19px] leading-[1.5] tracking-[-0.012em] min-[1101px]:text-[22px]"
                  style={{ fontWeight: 500, color: "var(--dki-ink)" }}
                >
                  “{QUOTE}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Image
                    src="/photos/chris-schmidt.jpg"
                    alt="Chris Schmidt"
                    width={80}
                    height={80}
                    className="h-10 w-10 flex-none rounded-full object-cover"
                  />
                  <div>
                    <p className="m-0 text-[14px] font-bold leading-5" style={{ color: "var(--dki-ink)" }}>
                      Chris Schmidt, FCIP, MBA
                    </p>
                    <p className="m-0 text-[12px] leading-4" style={{ color: "var(--dki-muted)" }}>
                      CEO, DKI Canada
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>

            {SECTIONS.map((s) => (
              <Reveal key={s.id}>
                <div id={s.id} className="scroll-mt-28">
                  <p className="mb-2.5" style={{ ...monoLabel, color: ACCENT, textTransform: "none" }}>
                    {s.n}
                  </p>
                  <h2
                    className="m-0 mb-4 text-[26px] leading-[34px] tracking-[-0.025em]"
                    style={{ fontWeight: 700, color: "var(--dki-ink)" }}
                  >
                    {s.title}
                  </h2>
                  <p className="m-0 text-[18px] leading-8" style={{ color: "var(--dki-body)" }}>
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Closing CTA ────────────────────────────────── */}
      <section className="w-full text-white" style={{ backgroundColor: NAVY }}>
        <div className={`${WRAP} py-14 text-center min-[1101px]:py-[88px]`}>
          <h2
            className="mx-auto mb-7 max-w-[920px] text-[28px] leading-[1.15] tracking-[-0.03em] text-white min-[1101px]:text-[38px]"
            style={{ fontWeight: 700, textWrap: "balance" }}
          >
            See how EZee Assist works for your network.
          </h2>
          <SpeakButton />
        </div>
      </section>

      {/* ── 6. More stories: WSI, DivaDance, DekaLash ─────── */}
      <MoreStories more={siblings("dki")} />
    </>
  );
}
