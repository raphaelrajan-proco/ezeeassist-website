"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_GRADIENT } from "@/lib/data/hero-backgrounds";
import { Band, EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";

/**
 * /why-ezeeassist
 *
 * Built from the supplied design handoff. Every section takes a different
 * form so the sub-pages stop looking identical: gradient hero with the
 * constellation, a split narrative against a 2x2 of failed tools, a
 * hairline quadrant with no boxes, three stepped-wash cards, a grouped
 * comparison ledger, a dark investor strip, five animated value rows, and
 * a split closing band.
 *
 * **The hero blue is deliberately not the homepage's.** Each sub-page
 * carries its own so a visitor sees a visible change page to page. This
 * one is azure, registered as `HERO_GRADIENT.azure` with its own base,
 * gradients and accent rather than reusing a photographic variant. The
 * handoff calls out that the previous page silently normalised its blue
 * back to the homepage's; that is the thing not to repeat.
 *
 * Copy is final and approved, carried verbatim, including the investor
 * name **10VC** (not 10x, which the old version of this page had). No
 * em-dashes.
 *
 * The prototype's floating theme toggle is a preview affordance and is
 * not shipped, nor is its 1240px min-width.
 */

const AZ = HERO_GRADIENT.azure;

const ON_SOLID = "#EEF2F8";
const ON_SOLID_RULE = "rgba(238,242,248,0.22)";

/* ── §2 ─────────────────────────────────────────────────────
   The four semantic families used decoratively, deliberately not blue so
   the failed tools read apart from the EZee sections. Dark values are the
   handoff's. */
const FAILED: { title: string; body: string; light: [string, string, string]; dark: [string, string, string] }[] = [
  {
    title: "General assistant", body: "Answers from Google and YouTube, not your playbook.",
    light: ["rgba(180,83,9,.06)", "rgba(180,83,9,.2)", "#B45309"],
    dark:  ["rgba(251,191,36,.08)", "rgba(251,191,36,.28)", "#FBBF24"],
  },
  {
    title: "Document portal", body: "The policy is in there. Nobody opens it during a shift.",
    light: ["rgba(180,35,24,.05)", "rgba(180,35,24,.18)", "#B42318"],
    dark:  ["rgba(249,112,102,.08)", "rgba(249,112,102,.26)", "#F97066"],
  },
  {
    title: "BI stack", body: "Shows the number, not what to do about it.",
    light: ["rgba(124,58,237,.05)", "rgba(124,58,237,.18)", "#7C3AED"],
    dark:  ["rgba(167,139,250,.08)", "rgba(167,139,250,.26)", "#A78BFA"],
  },
  {
    title: "Compliance tracker", body: "A spreadsheet somebody has to chase.",
    light: ["rgba(13,124,88,.06)", "rgba(13,124,88,.2)", "#0D7C58"],
    dark:  ["rgba(52,211,153,.08)", "rgba(52,211,153,.26)", "#34D399"],
  },
];

/* ── §3 ─────────────────────────────────────────────────────
   Bodies cover answers, reports, automations and deadlines. Keep the
   breadth: narrowing any of them back to "answers" makes the page an
   Answers page. */
const DECISIONS: { title: string; body: string }[] = [
  {
    title: "Your knowledge, not the internet's",
    body: "Answers, reports, and workflows all run on the material your brand approved, with the source attached. Nothing reaches for the open internet and sounds right by accident.",
  },
  {
    title: "It knows which location is asking",
    body: "Nashville has different vendors than Denver, and a shift lead is not an owner. Role and location scope every answer, every report, and every automation, on every run.",
  },
  {
    title: "Nothing gets stuck",
    body: "An unanswered question becomes a ticket with the location's context attached. A missed deadline chases itself. A workflow that needs sign-off waits for a named approver, not in a queue.",
  },
  {
    title: "No new behaviour to teach",
    body: "Answers, reports, and approvals arrive in Teams, Slack, SMS, or the app your locations already open. A tool that needs a login and a training plan does not get used at nine at night.",
  },
];

/* ── §4 ─────────────────────────────────────────────────────
   Stepped washes, light to deep left to right, so the trio reads as one
   system deepening rather than three unrelated products. */
const TRIO: { label: string; title: string; body: string; href: string; bg: string; bd: string }[] = [
  {
    label: "On demand", title: "Answers", href: "/platform/answers",
    body: "Every question answered from your own material, scoped to the person asking, in the channel they already work in.",
    bg: "rgba(0,174,239,.05)", bd: "rgba(0,119,168,.16)",
  },
  {
    label: "Always on", title: "Workflows", href: "/platform/workflows",
    body: "A coach describes what they would do. It runs everywhere your numbers say it should, and waits for a human before anything sends.",
    bg: "rgba(0,174,239,.1)", bd: "rgba(0,119,168,.24)",
  },
  {
    label: "Foundation", title: "Control Center", href: "/platform/control-center",
    body: "One policy set, one permission model, one log. Set once at HQ, applied everywhere, with nothing that can be worked around.",
    bg: "rgba(0,119,168,.16)", bd: "rgba(0,119,168,.32)",
  },
];

/* ── §5 ─────────────────────────────────────────────────────
   Deliberately a third answers, a third workflows, a third control and
   apps, so the table argues breadth rather than depth in one area. The
   marks differ in shape as well as colour. */
type Mark = "full" | "part" | "none";
const COMPARISON: ({ head: string } | { cap: string; a: Mark; b: Mark; c: Mark })[] = [
  { head: "Answers" },
  { cap: "Answers at any hour, in plain language", a: "full", b: "part", c: "full" },
  { cap: "From your brand's approved material, scoped by role and location", a: "none", b: "part", c: "full" },
  { head: "Workflows" },
  { cap: "Automations triggered by your own numbers, held for approval", a: "none", b: "part", c: "full" },
  { cap: "Runs across the 250+ systems your network already uses", a: "none", b: "none", c: "full" },
  { head: "Control Center & Apps" },
  { cap: "One policy, permission, and audit layer over everything", a: "none", b: "none", c: "full" },
  { cap: "Owner-built apps, reviewed by HQ, published network-wide", a: "none", b: "none", c: "full" },
];
const GLYPH: Record<Mark, string> = { full: "●", part: "◐", none: "–" };
const MARK_LABEL: Record<Mark, string> = { full: "Covered", part: "Partly", none: "Not covered" };

const INVESTORS = ["N49P", "10VC", "Antler", "Hustle Fund"];

/* ── §7 ─────────────────────────────────────────────────────
   Icons carried from the handoff verbatim, each with its own small loop.
   All freeze under reduced motion via the shared classes in globals. */
const VALUES: { text: string; icon: React.ReactNode }[] = [
  {
    text: "We are honest and compassionate with all stakeholders",
    icon: (
      <>
        <circle cx="18" cy="23" r="10" />
        <circle cx="28" cy="23" r="10" className="ed-v-pulse" style={{ transformOrigin: "28px 23px" }} />
        <circle cx="23" cy="23" r="3" fill="var(--ed-accent-text)" stroke="none" />
      </>
    ),
  },
  {
    text: "We have strong opinions, but they are loosely held",
    icon: (
      <>
        <g className="ed-v-tilt" style={{ transformOrigin: "23px 23px" }}>
          <polygon points="34 23 28.5 32.5 17.5 32.5 12 23 17.5 13.5 28.5 13.5" />
        </g>
        <circle cx="23" cy="40" r="2.5" fill="var(--ed-accent-text)" stroke="none" />
      </>
    ),
  },
  {
    text: "We act like owners",
    icon: (
      <>
        <g className="ed-v-bob">
          <polygon points="33 18 28 9.3 18 9.3 13 18 18 26.7 28 26.7" fill="var(--ed-accent-text)" stroke="none" />
        </g>
        <path d="M10 37c3.5-6 8-9 13-9s9.5 3 13 9" />
      </>
    ),
  },
  {
    text: "We communicate clearly and in a timely manner",
    icon: (
      <>
        <path d="M38 21c0 6.6-6.7 12-15 12-2 0-3.8-.3-5.5-.8L9 35l2.2-5.6C9.2 27.3 8 24.3 8 21c0-6.6 6.7-12 15-12s15 5.4 15 12z" />
        <circle cx="16.5" cy="21" r="2" fill="var(--ed-accent-text)" stroke="none" className="ed-v-dot" />
        <circle cx="23" cy="21" r="2" fill="var(--ed-accent-text)" stroke="none" className="ed-v-dot" style={{ animationDelay: ".25s" }} />
        <circle cx="29.5" cy="21" r="2" fill="var(--ed-accent-text)" stroke="none" className="ed-v-dot" style={{ animationDelay: ".5s" }} />
      </>
    ),
  },
  {
    text: "We execute with urgency, without compromising excellence",
    icon: (
      <>
        <path d="M12 13l10 10-10 10" className="ed-v-chev" />
        <path d="M24 13l10 10-10 10" className="ed-v-chev" style={{ animationDelay: ".3s" }} />
      </>
    ),
  },
];

export default function WhyEZeeAssistContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: AZ.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: AZ.hero }} />

        <div className="ed-hero-pad relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col items-start gap-6"
            >
              <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: AZ.accent }}>
                Why EZee Assist
              </p>
              <h1
                className="max-w-[880px] leading-[1.08] tracking-[-0.03em]"
                style={{
                  color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                  fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                  textWrap: "pretty",
                }}
              >
                General-purpose AI was never going to run your franchise.{" "}
                <span style={{ color: AZ.accent }}>EZee Assist is built for one.</span>
              </h1>
              <p className="max-w-[600px] text-base md:text-[17px] leading-relaxed" style={{ color: AZ.body }}>
                A network is not one company. It is hundreds of owners running the same brand under
                different conditions. Every answer, report, workflow, and compliance deadline has to
                know which location it belongs to.
              </p>
              {/* Both buttons are flex items and will wrap their labels
                  without nowrap and flex-none. */}
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
                <a href="#system" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">
                  How it works
                </a>
              </div>
              <p
                className="mt-4 uppercase"
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 600, color: "rgba(159,217,255,0.75)" }}
              >
                Purpose-built for franchising · Live in multi-location networks · Venture-backed
              </p>
            </motion.div>

            {/* The constellation: a solid centre hexagon (the platform),
                six ring hexagons (locations), one of them filled with a
                dark dot on a brighter spoke (the location being asked
                from), and five faded outer hexagons on dashed connectors
                (locations not yet on). Carried from the handoff verbatim. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="hidden justify-center lg:flex"
              aria-hidden="true"
            >
              <svg width="330" height="330" viewBox="0 0 400 400" fill="none">
                <path d="M200 160v-62M200 240v62" stroke="rgba(159,217,255,.35)" strokeWidth="1.5" />
                <path d="M234.6 220 288.3 251M165.4 180 111.7 149M165.4 220 111.7 251" stroke="rgba(159,217,255,.35)" strokeWidth="1.5" />
                <path d="M234.6 180 288.3 149" stroke={AZ.accent} strokeWidth="2" />
                <path d="M155 40 187 69M317 63 308 125M354 205 314 245M252 356 216 328M55 313 86 272" stroke="rgba(159,217,255,.18)" strokeWidth="1.2" strokeDasharray="3 5" />
                <polygon points="216 80 208 93.86 192 93.86 184 80 192 66.14 208 66.14" stroke="rgba(159,217,255,.6)" strokeWidth="1.5" />
                <polygon points="320 260 312 273.86 296 273.86 288 260 296 246.14 312 246.14" stroke="rgba(159,217,255,.6)" strokeWidth="1.5" />
                <polygon points="216 320 208 333.86 192 333.86 184 320 192 306.14 208 306.14" stroke="rgba(159,217,255,.6)" strokeWidth="1.5" />
                <polygon points="112 260 104 273.86 88 273.86 80 260 88 246.14 104 246.14" stroke="rgba(159,217,255,.6)" strokeWidth="1.5" />
                <polygon points="112 140 104 153.86 88 153.86 80 140 88 126.14 104 126.14" stroke="rgba(159,217,255,.6)" strokeWidth="1.5" />
                <polygon points="320 140 312 153.86 296 153.86 288 140 296 126.14 312 126.14" fill={AZ.accent} />
                <circle cx="304" cy="140" r="4" fill={AZ.base} />
                <polygon points="161 30 155.5 39.53 144.5 39.53 139 30 144.5 20.47 155.5 20.47" stroke="rgba(159,217,255,.3)" strokeWidth="1.2" />
                <polygon points="323 52 317.5 61.53 306.5 61.53 301 52 306.5 42.47 317.5 42.47" stroke="rgba(159,217,255,.3)" strokeWidth="1.2" />
                <polygon points="375 200 369.5 209.53 358.5 209.53 353 200 358.5 190.47 369.5 190.47" stroke="rgba(159,217,255,.3)" strokeWidth="1.2" />
                <polygon points="269 364 263.5 373.53 252.5 373.53 247 364 252.5 354.47 263.5 354.47" stroke="rgba(159,217,255,.3)" strokeWidth="1.2" />
                <polygon points="55 316 49.5 325.53 38.5 325.53 33 316 38.5 306.47 49.5 306.47" stroke="rgba(159,217,255,.3)" strokeWidth="1.2" />
                <polygon points="234 200 217 229.4 183 229.4 166 200 183 170.6 217 170.6" fill={AZ.accent} />
                <g className="ed-orbit" style={{ transformOrigin: "200px 200px", animationDuration: "26s" }}>
                  <circle cx="200" cy="80" r="4" fill={AZ.accent} />
                  <circle cx="200" cy="320" r="2.5" fill="rgba(159,217,255,.55)" />
                </g>
                <g className="ed-orbit" style={{ transformOrigin: "200px 200px", animationDuration: "40s", animationDirection: "reverse" }}>
                  <circle cx="80" cy="200" r="3" fill="rgba(159,217,255,.7)" />
                </g>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. Narrative ──────────────────────────────────── */}
      <Band>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <h2
              className="ed-fg leading-[1.14] tracking-[-0.03em]"
              style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.7rem + 2vw, 2.5rem)", textWrap: "pretty" }}
            >
              Multi-location execution should not depend on who happens to pick up the phone.
            </h2>
            <p className="ed-fg-muted mt-5 max-w-[440px] text-[17px] leading-[1.55]">
              The tools your team already tried were built for a different problem. So the real
              system stays manual, and coaching gets whatever time is left.
            </p>
            <p
              className="ed-fg mt-5 tracking-[-0.015em]"
              style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 19, textWrap: "pretty" }}
            >
              A franchise system is not one company. It is hundreds, running the same brand.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FAILED.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div
                  className="ed-tint flex h-full flex-col gap-2 rounded-[14px] p-5 md:px-[22px]"
                  style={{
                    ["--t-bg" as string]: f.light[0], ["--t-bd" as string]: f.light[1], ["--t-fg" as string]: f.light[2],
                    ["--t-bg-d" as string]: f.dark[0], ["--t-bd-d" as string]: f.dark[1], ["--t-fg-d" as string]: f.dark[2],
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="ed-fg text-[15.5px] tracking-[-0.015em]" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
                      {f.title}
                    </span>
                    <span className="ed-tint-fg" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700 }} aria-hidden="true">
                      &#10005;
                    </span>
                  </div>
                  <p className="ed-fg-muted text-[13.5px] leading-[1.5]">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ── 3. Four decisions ─────────────────────────────
          A hairline cross, no boxes. Below md it stacks to one column and
          the cross becomes a single rule between rows. */}
      <Band alt>
        <Reveal>
          <h2
            className="ed-fg max-w-[720px] leading-[1.12] tracking-[-0.03em]"
            style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.25rem)", textWrap: "pretty" }}
          >
            Four decisions that follow from taking that seriously.
          </h2>
        </Reveal>

        {/* Rules, padding and the two-column cross all live in .ed-quad so
            the stacked case degrades to one rule per row. */}
        <div className="ed-quad mt-10 grid max-w-[1040px] grid-cols-1 md:mt-12 md:grid-cols-2">
          {DECISIONS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.07}>
              <p className="ed-fg text-[19px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
                {d.title}
              </p>
              <p className="ed-fg-muted mt-3 text-[14.5px] leading-[1.6]">{d.body}</p>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 4. System trio ────────────────────────────────── */}
      <Band id="system">
        <Reveal>
          <h2
            className="ed-fg max-w-[640px] leading-[1.12] tracking-[-0.03em]"
            style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.25rem)" }}
          >
            Three things, on one system.{" "}
            <span className="lg:block" style={{ color: "var(--ed-accent-text)" }}>Governed the same way.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TRIO.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link
                href={c.href}
                className="group flex h-full min-h-[230px] flex-col gap-3.5 rounded-[14px] p-7 transition-transform hover:-translate-y-0.5"
                style={{ background: c.bg, border: `1px solid ${c.bd}` }}
              >
                <span className="uppercase" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--ed-accent-text)" }}>
                  {c.label}
                </span>
                <span className="ed-fg text-[27px] tracking-[-0.022em]" style={{ fontFamily: JAKARTA, fontWeight: 700 }}>
                  {c.title}
                </span>
                <p className="ed-fg-muted flex-1 text-[14.5px] leading-[1.6]">{c.body}</p>
                <span
                  className="flex h-[34px] w-[34px] items-center justify-center self-end rounded-full"
                  style={{ backgroundColor: "var(--ed-fg)", color: "var(--ed-bg)" }}
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 5. Comparison ─────────────────────────────────
          Grouped so the table argues breadth: a third answers, a third
          workflows, a third control and apps. The marks differ in shape as
          well as colour, and each carries a label for screen readers. */}
      <Band alt>
        <Reveal>
          <h2
            className="ed-fg max-w-[760px] leading-[1.14] tracking-[-0.03em]"
            style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.25rem)", textWrap: "pretty" }}
          >
            What a general assistant and an in-platform AI each leave on the table.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-11 max-w-[980px] overflow-hidden"
            style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-border)", borderRadius: 14 }}
          >
            <div
              className="hidden grid-cols-[1fr_96px_96px_96px] px-6 py-3 md:grid md:grid-cols-[1fr_130px_130px_130px] md:px-7"
              style={{ backgroundColor: "var(--ed-card-alt)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.13em", color: "var(--ed-fg-muted)" }}
            >
              <span>CAPABILITY</span>
              <span className="text-center">GENERAL AI</span>
              <span className="text-center">IN-PLATFORM AI</span>
              <span className="text-center" style={{ color: "var(--ed-accent-text)" }}>EZEE</span>
            </div>

            {COMPARISON.map((r, i) =>
              "head" in r ? (
                <div
                  key={r.head}
                  className="px-6 py-3 uppercase md:px-7"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)",
                    fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "var(--ed-accent-text)",
                  }}
                >
                  {r.head}
                </div>
              ) : (
                <div
                  key={r.cap}
                  /* Stacked below md: the capability reads first, then the
                     three marks as labelled pairs. Never a scroll. */
                  className="grid grid-cols-1 gap-y-2 px-6 py-4 md:grid-cols-[1fr_130px_130px_130px] md:items-center md:gap-y-0 md:px-7"
                  style={{ borderTop: "1px solid var(--ed-rule)" }}
                >
                  <span className="ed-fg text-[14.5px]" style={{ fontWeight: 500 }}>{r.cap}</span>
                  {([["General AI", r.a], ["In-platform AI", r.b], ["EZee", r.c]] as [string, Mark][]).map(([who, m]) => (
                    <span key={who} className="flex items-center gap-2 md:justify-center">
                      <span className="md:hidden" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: "var(--ed-fg-muted)", width: 104 }}>
                        {who.toUpperCase()}
                      </span>
                      <span
                        className={m === "part" ? "ed-mark-warn" : undefined}
                        style={{
                          fontSize: m === "none" ? 15 : 13, fontWeight: 700,
                          color: m === "full" ? "var(--ed-accent-text)" : m === "none" ? "var(--ed-fg-muted)" : undefined,
                        }}
                      >
                        {GLYPH[m]}
                      </span>
                      <span className="sr-only">{`${who}: ${MARK_LABEL[m]}`}</span>
                    </span>
                  ))}
                </div>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="ed-fg-muted mt-3.5 flex max-w-[980px] flex-wrap gap-x-6 gap-y-1 text-[12px]">
            <span><b style={{ color: "var(--ed-accent-text)" }}>●</b> Covered</span>
            <span><b className="ed-mark-warn">◐</b> Partly, inside its own walls</span>
            <span><b>–</b> Not covered</span>
          </div>
          <p
            className="ed-fg mt-6 max-w-[980px] tracking-[-0.018em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 19, textWrap: "pretty" }}
          >
            Each covers a slice. EZee sits across the whole stack, so one governed system covers
            all three.
          </p>
        </Reveal>
      </Band>

      {/* ── 6. Investors ──────────────────────────────────── */}
      {/* The hairlines are invisible against the fill in light mode and are
          what keeps the band readable as a band in dark mode, where
          #0B1220 sits a hair off the page's own #0A0A0A. */}
      <section
        className="w-full"
        style={{ backgroundColor: "#0B1220", borderTop: `1px solid ${ON_SOLID_RULE}`, borderBottom: `1px solid ${ON_SOLID_RULE}` }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <p
                className="max-w-[640px] leading-[1.45] tracking-[-0.018em]"
                style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 21, color: ON_SOLID, textWrap: "pretty" }}
              >
                Purpose-built for franchising from the first line of code, live in multi-location
                networks across North America, and backed by
              </p>
              {/* Text chips uniformly. No committed logo files exist for
                  all four, and a partial set puts the ones we have in
                  colour and the ones we care about in grey. */}
              <div className="flex flex-wrap gap-2.5">
                {INVESTORS.map((n) => (
                  <span
                    key={n}
                    className="whitespace-nowrap rounded-lg px-4 py-2"
                    style={{ fontFamily: JAKARTA, fontSize: 13, fontWeight: 700, color: ON_SOLID, border: `1px solid ${ON_SOLID_RULE}` }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Team values ────────────────────────────────── */}
      <Band>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[.9fr_1.5fr] lg:gap-16">
          <Reveal>
            <h2
              className="ed-fg leading-[1.14] tracking-[-0.03em]"
              style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.125rem)", textWrap: "pretty" }}
            >
              A remote-first team, and five things we hold each other to.
            </h2>
            <p className="ed-fg-muted mt-4 text-[15px] leading-relaxed">
              With decades of strategy consulting, tech transformation, machine learning,
              operations, and venture-scale experiences.
            </p>
          </Reveal>

          <div className="flex flex-col">
            {VALUES.map((v, i) => (
              <Reveal key={v.text} delay={i * 0.06}>
                <div className="flex items-center gap-5 py-6 md:gap-[26px]" style={{ borderTop: "1px solid var(--ed-rule)" }}>
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" stroke="var(--ed-accent-text)" strokeWidth={i === 4 ? 2 : 1.7} aria-hidden="true" className="flex-none">
                    {v.icon}
                  </svg>
                  <span className="ed-fg text-[18px] tracking-[-0.018em] md:text-[22px]" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
                    {v.text}
                  </span>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid var(--ed-rule)" }} />
          </div>
        </div>
      </Band>

      {/* ── 8. Closing ────────────────────────────────────
          Same azure family as the hero, resolving to CLOSING_BASE so it
          seams into the footer. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: AZ.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: AZ.closing }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-24 md:py-[104px] lg:grid-cols-[1.2fr_.8fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              className="leading-[1.12] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 2.625rem)", textWrap: "pretty" }}
            >
              You&rsquo;ve read the why.{" "}
              <span className="lg:block" style={{ color: AZ.accent }}>Now watch it run.</span>
            </h2>
            <p className="max-w-[520px] text-base leading-[1.65]" style={{ color: AZ.body }}>
              Bring your playbook and one busy week. We&rsquo;ll show you the same week with the
              answers, reports, and follow-ups already handled, on your own material, scoped the way
              your network actually runs.
            </p>
          </div>
          {/* Bottom-aligned against the copy block, no secondary. */}
          <div className="flex items-start self-stretch lg:items-end">
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
