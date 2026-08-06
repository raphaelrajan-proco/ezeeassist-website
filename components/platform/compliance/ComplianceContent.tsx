"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { BLIND_WINDOW, SCOPE, WEEK, WRITE_BLOCKS } from "./data";
import { ChaseLadderCard, ChatMock, NetworkStateCard, ScopeTile } from "./artifacts";

/**
 * /platform/compliance
 *
 * Rebuilt from the supplied design handoff. Seven sections plus a
 * closing band: hero, the gap, scope, continuity, the chase, closing it,
 * evidence.
 *
 * The page makes one argument: a network's compliance state can be known
 * continuously rather than sampled at audits, gaps can be chased to close
 * without a person sending reminders, and every close leaves verifiable
 * evidence.
 *
 * ── Three decisions the handoff asked to be made ────────────
 *
 * **The hero stays the existing hazy teal variant**, per direct
 * instruction. The handoff wanted a variant registered with its own base
 * and scrim and said the committed image should be the teal one, which
 * is what `platformHero("compliance")` already resolves to, so the two
 * agree.
 *
 * **The dark band is `#0B1220`**, not the prototype's teal-leaning
 * `#0C2633`. The handoff flagged the conflict and asked which was
 * canonical: `#0B1220` is what every other dark solid on this site uses.
 *
 * **A closing CTA band is appended.** The handoff's reference stopped
 * before one and asked for confirmation. DESIGN.md puts a dark
 * photographic CTA at the end of every sub-page and every sibling has
 * one.
 *
 * Two copy lines were replaced rather than shipped. The handoff itself
 * flags its §7 H2 and one column title as the "not X, it's Y"
 * construction the house style bans, and supplies plain replacements.
 * Those are used, and the originals are recorded in HANDOFF.md.
 *
 * Every figure here is illustrative. The hero card and the chat mock
 * both carry a visible "Illustrative" footer and those must ship.
 */

const HERO = platformHero("compliance");
const SKY = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.9)";

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)",
  letterSpacing: "-0.03em", lineHeight: 1.08, textWrap: "pretty" as const,
};

const STATEMENT = {
  fontSize: "clamp(1.0625rem, 0.5rem + 0.9vw, 1.25rem)",
  letterSpacing: "-0.02em", lineHeight: 1.35,
};

const EYEBROW = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.16em", textTransform: "uppercase" as const,
};

const META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

const ON_DARK_MUTE = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";

export default function ComplianceContent() {
  return (
    <div className="ed-compliance">
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ background: HERO.scrimCss ?? `rgba(${HERO.scrimRgba})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="ed-hero-pad relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-2 lg:gap-16"
        >
          <div className="flex flex-col items-start">
            <p style={{ ...EYEBROW, color: "rgba(255,255,255,0.62)" }}>Compliance</p>
            <h1
              className="mt-5"
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.04,
                fontSize: "clamp(1.75rem, 1rem + 2.4vw, 3.25rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              Know where your network stands, every day.
              <span className="block" style={{ color: SKY }}>Not four times a year.</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              Every licence, certificate, deadline, and standard, checked continuously against the
              systems and documentation that already hold them. Gaps get chased until they close.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              <a href="#the-chase" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">See how it closes</a>
            </div>
          </div>

          <NetworkStateCard />
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. The gap ────────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>You find out late. And someone spends their week asking.</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <div className="ed-card ed-border h-full overflow-hidden rounded-[14px] border">
                <div className="ed-card-alt ed-fg-muted px-5 py-3" style={META}>The blind window</div>
                <div className="flex flex-col gap-3.5 px-5 pb-5 pt-5">
                  <div className="flex gap-10">
                    {[["Last audit", "Q1"], ["Next audit", "Q3"]].map(([l, v]) => (
                      <span key={l} className="flex flex-col gap-1">
                        <span className="ed-fg-muted" style={META}>{l}</span>
                        <span className="ed-fg" style={{ fontFamily: JAKARTA, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{v}</span>
                      </span>
                    ))}
                  </div>
                  <p className="ed-fg text-[14px]">Between them, five months in which:</p>
                  <div className="flex flex-col gap-2.5">
                    {BLIND_WINDOW.map((t) => (
                      <span key={t} className="ed-fg-muted flex gap-2.5 text-[14px] leading-[1.5]">
                        <span className="flex-none" style={{ color: "var(--bad)" }} aria-hidden="true">–</span>{t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] font-medium" style={{ color: "var(--bad)" }}>all three surfaced at the Q3 audit</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="ed-card ed-border h-full overflow-hidden rounded-[14px] border">
                <div className="ed-card-alt ed-fg-muted px-5 py-3" style={META}>One person&rsquo;s week</div>
                <div>
                  {WEEK.map(([day, entry], i) => {
                    const friday = i === WEEK.length - 1;
                    return (
                      <div
                        key={day}
                        className={`grid grid-cols-1 gap-x-4 gap-y-1 px-5 py-3.5 sm:grid-cols-[56px_1fr] ${i === 0 ? "" : "ed-border border-t"}`}
                      >
                        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: friday ? 600 : 400, color: friday ? "var(--bad)" : "var(--ed-fg-muted)" }}>{day}</span>
                        <span className="text-[14px]" style={{ color: friday ? "var(--bad)" : "var(--ed-fg)", fontWeight: friday ? 500 : 400 }}>{entry}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="ed-fg mt-9 max-w-[640px] font-medium" style={STATEMENT}>
              An audit tells you what was true on the day of the audit. The rest of the year,
              you&rsquo;re guessing.
            </p>
            <p className="ed-fg-muted mt-3 text-[13.5px] leading-[1.55]">
              Meanwhile someone on your team is a full-time reminder service.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Scope ──────────────────────────────────────
          Seven cards, so the last row of four is short by one. That is
          intentional and matches the reference. */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[780px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>Everything with a deadline, a certificate, or a standard behind it.</h2>
            <p className="ed-fg-muted text-[15px] leading-[1.55]">Read from the systems that already hold it.</p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCOPE.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 0.07}>
                <div className="ed-card ed-border flex h-full flex-col gap-3.5 rounded-[14px] border px-5 pb-6 pt-5">
                  <ScopeTile hue={c.hue} d={c.d} />
                  <span className="ed-fg text-[16px] font-semibold leading-[1.25] tracking-[-0.02em]">{c.title}</span>
                  <span className="ed-fg-muted text-[14px] leading-[1.5]">{c.body}</span>
                  {/* One real check, so the card shows the work rather
                      than only naming the category. Tinted to the card's
                      own hue at low alpha, which keeps the grid reading as
                      seven different areas without seven loud blocks. */}
                  <span
                    className="ed-fg mt-1 rounded-[9px] px-3 py-2.5 text-[13px] leading-[1.45]"
                    style={{ background: `color-mix(in srgb, ${c.hue} 7%, transparent)` }}
                  >
                    {c.check}
                  </span>
                  <span className="mt-auto pt-2" style={{ ...META, color: "var(--ed-fg-muted)" }}>{c.source}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="ed-fg-muted mt-7 max-w-[560px] text-[14px] leading-[1.6]">
              If a system already knows it, the check reads it. If nobody&rsquo;s system knows it,
              the check asks for it.{" "}
              <Link href="/platform/integrations" className="ed-accent-text underline-offset-[3px] hover:underline">What connects</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. The chase ──────────────────────────────────
          The page's differentiator: closing, not detecting. */}
      <section id="the-chase" className="w-full scroll-mt-24" style={{ background: "#0B1220" }}>
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <h2 style={{ ...H2, color: "#FFFFFF" }}>
              Every compliance tool checks.
              <span className="block" style={{ color: SKY }}>Almost none chase.</span>
            </h2>
            <p className="text-[15px] leading-[1.55]" style={{ color: "rgba(238,242,248,0.72)" }}>
              Finding the gap was never the hard part. Closing it is.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10"><ChaseLadderCard /></Reveal>

          <Reveal delay={0.1} className="mt-9 flex flex-col gap-3">
            <p className="text-[14px]" style={{ color: "rgba(238,242,248,0.6)" }}>Twenty-four days. Four escalations.</p>
            <p className="font-semibold" style={{ ...STATEMENT, color: "#FFFFFF" }}>
              Nobody on your team sent a single message.
            </p>
            <span className="mt-4 block h-px max-w-[640px]" style={{ background: ON_DARK_RULE }} aria-hidden="true" />
            <p className="text-[13px]" style={{ color: ON_DARK_MUTE }}>
              Every hour a coach spends chasing a document is an hour not spent on the
              location&rsquo;s numbers.
            </p>
            <Link
              href="/platform/answers"
              className="w-fit text-[13px] underline-offset-[3px] hover:underline"
              style={{ color: SKY, textDecorationColor: "rgba(159,224,248,0.4)" }}
            >
              Compliance is the flagship play
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Closing it ─────────────────────────────────
          Scope is what the platform reads; this is what it writes.
          Do not let either drift into enumerating the other's systems. */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[740px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>The franchisee replies in a message. The systems get updated.</h2>
            <p className="ed-fg-muted max-w-[660px] text-[15px] leading-[1.55]">
              An owner holding a renewed certificate should not have to log into three portals to
              file it. They send it where they already talk to you, and the write happens on their
              behalf.
            </p>
            {/* Two points folded in rather than given their own bands.

                The first is the takeaway the section was missing: the
                argument is not that replying is convenient, it is that
                convenience is what makes the record stay true.

                The second absorbs the deleted Evidence section. That
                section existed to show a filed document, a photo and a
                submitter, which is one claim, not a band: everything that
                happens here is logged. */}
            <ul className="ed-fg-muted mt-1 flex max-w-[660px] flex-col gap-2 text-[15px] leading-[1.55]">
              <li className="flex gap-2.5">
                <span
                  className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full"
                  style={{ background: "var(--ed-accent-text)" }}
                  aria-hidden="true"
                />
                <span>
                  <b className="ed-fg">Updating has to be this easy or it stops happening.</b>{" "}
                  A renewal filed in the thread someone is already in is a renewal that gets
                  filed. That is what makes compliance stick between audits, rather than
                  arriving in a rush before one.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span
                  className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full"
                  style={{ background: "var(--ed-accent-text)" }}
                  aria-hidden="true"
                />
                <span>
                  <b className="ed-fg">Everything is logged.</b> The document, the photo, who
                  submitted it and when, held against the location it belongs to. When someone
                  asks for proof, you are not asking your locations for it.
                </span>
              </li>
            </ul>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-11">
            <Reveal><ChatMock /></Reveal>

            <Reveal delay={0.08} className="flex flex-col">
              <p className="ed-fg max-w-[520px] font-medium" style={STATEMENT}>
                The admin work happens in the conversation. The owner never opens a portal.
              </p>
              <div className="mt-7 flex max-w-[520px] flex-col">
                {WRITE_BLOCKS.map((b) => (
                  <div key={b.title} className="ed-rule border-t py-4">
                    <span className="ed-fg block text-[15px] font-semibold tracking-[-0.01em]">{b.title}</span>
                    <span className="ed-fg-muted mt-1.5 block text-[13.5px] leading-[1.5]">{b.body}</span>
                  </div>
                ))}
              </div>
              <p className="ed-fg-muted mt-5 text-[13.5px]">
                Which systems accept writes today:{" "}
                <Link href="/platform/integrations" className="ed-accent-text underline-offset-[3px] hover:underline">see the list</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 8. Closing ────────────────────────────────────
          Appended: the handoff's reference stopped before a CTA band and
          asked for confirmation. Every sibling sub-page has one. */}
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
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08,
                fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.625rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              Tell us what your network is behind on{" "}
              <span style={{ color: SKY }}>and how you find out.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              We&rsquo;ll show you the same week checked continuously, with the gaps already chased
              and the evidence already filed.
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
