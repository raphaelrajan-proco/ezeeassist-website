"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { platformHero } from "@/lib/data/platform-heroes";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import HeroBuildLoop from "./HeroBuildLoop";
import BookingApp from "./BookingApp";
import DigestApp from "./DigestApp";
import { APPS, INK, STEPS, TILE, TIMELINE, WISHLIST, type Tone } from "./data";

/**
 * /platform/apps
 *
 * Rebuilt from the supplied design handoff.
 *
 * **The framing is possibility, not neglect.** Earlier drafts argued
 * "these tools never get funded." That is gone. Every section now argues
 * what becomes buildable: the wish list is a build queue, apps ship the
 * week they are described, owners build and HQ publishes network-wide.
 * Do not reintroduce scarcity copy, and in particular do not revert the
 * five SHIPPED pills to OPEN. They are the argument in miniature.
 *
 * Deleted deliberately: the "Opened on a phone, between customers"
 * section (merged into Network authorship), the `{{TBD:apps-proof-*}}`
 * quote block, the governance strip, every section eyebrow, and the
 * closing line "Good ideas travel...".
 *
 * **The hero is a photo variant, not a gradient.** Where the other
 * sub-pages carry their own blue, Apps carries the yellow haze, which is
 * `HERO_BG.sunset` with the handoff's dark-olive **gradient** scrim
 * rather than a flat one. The flat 0.58 this image needs for white body
 * copy read olive-grey; the gradient sits heavy over the copy column and
 * light where the artwork is, so the gold survives.
 *
 * Two loops and no more: the 16s hero build sequence and the 14s booking
 * flow, plus the LIVE card's glow. All three resolve to their finished
 * state under `prefers-reduced-motion`, because in each case the base
 * styles already are that state.
 */

const HERO = platformHero("apps");
const GOLD = "#F2DE8A";
const ON_IMAGE = "rgba(247,243,224,0.92)";
/* The Network-authorship band's accent. It was a mint #8BE8DD; EZee blue
   by request, and #00AEEF is usable directly because this band is
   #0B1220, where the brand hue clears AA. One constant covers the
   headline highlight, the step pills and their labels, so they cannot
   drift apart. The name is kept so the diff reads as a colour change
   rather than a rename. */
const MINT = "#00AEEF";

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.6rem + 2vw, 2.375rem)",
  textWrap: "pretty" as const,
};

const MONO_LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.12em", color: "var(--ed-fg-muted)",
};

function Tile({ tone, d, size = 38, icon = 18 }: { tone: Tone; d: string; size?: number; icon?: number }) {
  const [bg, fg] = TILE[tone];
  return (
    <span className="flex flex-none items-center justify-center rounded-[10px]" style={{ width: size, height: size, background: bg, color: fg }}>
      <Glyph d={d} size={icon} />
    </span>
  );
}

/** The one-row product fragment on each of the six app cards. */
function Fragment({ id }: { id: string }) {
  const pill = (text: string, tone: Tone) => (
    <span
      key={text}
      className="rounded-full"
      style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", padding: "4px 10px", background: TILE[tone][0], color: INK[tone] }}
    >
      {text}
    </span>
  );
  switch (id) {
    case "closing":
      return (
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex h-4 w-4 items-center justify-center rounded-full" style={{ background: INK.ok }} aria-hidden="true">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>
            </span>
          ))}
          <span className="h-4 w-4 rounded-full" style={{ border: `1.5px solid ${INK.warn}` }} aria-hidden="true" />
          <span className="ed-fg-muted ml-1 text-[12.5px]">3 of 4 stations</span>
        </div>
      );
    case "newhire":
      return (
        <div className="flex flex-wrap gap-1.5">
          {["D1", "D2", "D3", "D4", "D5"].map((d) => (
            <span
              key={d}
              className="rounded-md"
              style={{
                fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: "4px 8px",
                background: d === "D3" ? INK.purple : TILE.purple[0],
                color: d === "D3" ? "#FFFFFF" : INK.purple,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      );
    case "quote":
      return (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="ed-fg" style={{ fontFamily: JAKARTA, fontSize: 17, fontWeight: 800 }}>$1,180</span>
          {pill("BELOW FLOOR", "bad")}
        </div>
      );
    case "pl":
      return (
        <div className="flex h-8 items-end gap-1.5" aria-hidden="true">
          {[38, 52, 44, 68, 88].map((h, i) => (
            <span key={i} className="w-3 rounded-sm" style={{ height: `${h}%`, background: i === 4 ? INK.accent : TILE.accent[0] }} />
          ))}
        </div>
      );
    case "swap":
      return <div className="flex flex-wrap gap-2">{pill("SAT PM · POSTED", "warn")}{pill("COVERED · 40 MIN", "ok")}</div>;
    default:
      return <div className="flex flex-wrap gap-2">{pill("YDAY $4.2K", "ok")}{pill("TODAY 31 BKD", "ok")}</div>;
  }
}

export default function AppsContent() {
  return (
    <div className="ed-apps">
      {/* ── 1. Hero ───────────────────────────────────────
          Yellow haze, gradient scrim. Not a blue, deliberately. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center" }} />
          <div className="absolute inset-0" style={{ background: HERO.scrimCss ?? `rgba(${HERO.scrimRgba})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="ed-hero-pad relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1fr_.96fr] lg:gap-14"
        >
          <div className="flex flex-col items-start gap-5">
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.16em", fontWeight: 600, color: GOLD }}>
              Apps
            </p>
            <h1
              className="leading-[1.1] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty", fontSize: "clamp(1.75rem, 0.6rem + 2.65vw, 2.9375rem)" }}
            >
              Describe the tool your network needs.{" "}
              <span style={{ color: GOLD }}>It&rsquo;s running this afternoon.</span>
            </h1>
            <p className="max-w-[480px] text-base md:text-[17.5px] leading-[1.6]" style={{ color: ON_IMAGE }}>
              Say what you need in plain language. Twenty minutes later it exists, connected to your
              systems, on your brand, in your locations&rsquo; hands.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              <a href="#ships" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">See what brands ship</a>
            </div>
          </div>

          <HeroBuildLoop />
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. The wish list ──────────────────────────────
          Copy is deliberately the narrower column so the ledger gets the
          room; the ledger is the section. */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={{ ...H2, fontSize: "clamp(1.5rem, 0.7rem + 1.7vw, 2.125rem)" }}>
              Everyone in the network keeps a list of tools that would help.{" "}
              <span className="ed-accent-text">Now it&rsquo;s a build queue.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              HQ, field coaches, marketing, FBCs, franchisees, everyone carries one. Some entries are
              a checklist, some are a full dashboard or a customer-facing app. Described in plain
              language, each is an afternoon of work. Below, what one
              brand&rsquo;s list looked like once they started clearing it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border rounded-3xl border p-4 sm:p-[34px]" style={{ background: "var(--wash2)" }}>
              <div className="ed-card ed-border overflow-hidden rounded-2xl border">
                <div className="ed-card-alt px-5 py-3" style={MONO_LABEL}>THE NETWORK&rsquo;S WISH LIST · SHARED DRIVE</div>
                {WISHLIST.map((w, i) => (
                  <div
                    key={w.title}
                    className={`grid grid-cols-1 items-center gap-x-4 gap-y-1.5 px-4 py-3.5 sm:px-[22px] md:grid-cols-[64px_1fr_auto_auto] ${i === 0 ? "" : "ed-rule border-t"}`}
                  >
                    <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 12 }}>{w.date}</span>
                    <span className="ed-fg text-[14.5px] leading-[1.45]" style={{ textWrap: "balance" }}>{w.title}</span>
                    <span className="ed-fg-muted whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12 }}>{w.tag}</span>
                    <span
                      className="w-fit whitespace-nowrap rounded-full"
                      style={{
                        fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 11px",
                        background: w.now ? "var(--chip-bg)" : TILE.ok[0],
                        color: w.now ? "var(--ed-accent-text)" : INK.ok,
                        border: w.now ? "1px solid var(--chip-bd)" : undefined,
                      }}
                    >
                      {w.now ? "THIS WEEK" : "SHIPPED"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Described at 3:45, in use at 4:20 ────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[860px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              {/* 4:20, not 4:05, by request. "in use" rather than
                  "running": the timeline still ships at 4:05 and the
                  section now ends on adoption, so "running at 4:20" would
                  contradict its own fifth step. */}
              Described at 3:45, in use at 4:20.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              No code to write, no ticket to file, no release to wait on. Every app inherits the
              permissions, data boundaries, and approval rules already set in your{" "}
              <Link href="/platform/control-center" className="ed-accent-text underline-offset-2 hover:underline">Control Center</Link>.
            </p>
          </Reveal>

          {/* Two columns: the steps on the left, the app they produced on
              the right. The old layout was five equal columns of cards
              over a horizontal hairline, which read as a flat process
              diagram and never showed the app that went live at 4:05.
              Below lg it stacks, timeline first. */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            {/* ── Left: the vertical timeline ── */}
            <div className="flex flex-col">
              {TIMELINE.map((t, i) => {
                const last = i === TIMELINE.length - 1;
                return (
                  <Reveal key={t.label} delay={i * 0.05}>
                    <div className="flex gap-4">
                      {/* The rail. Vertical at every width: the connector
                          is what makes five steps read as one sequence,
                          and dropping it on mobile loses that. */}
                      <div className="flex flex-none flex-col items-center self-stretch" aria-hidden="true">
                        <span
                          className="mt-1 h-3 w-3 flex-none rounded-full"
                          style={{ background: t.live ? "var(--ed-accent-text)" : "var(--ed-fg-muted)" }}
                        />
                        {!last && <span className="w-[1.5px] flex-1" style={{ background: "var(--ed-border)" }} />}
                      </div>

                      <div className={`flex flex-1 flex-col gap-1.5 ${last ? "pb-0" : "pb-[22px]"}`}>
                        {t.live ? (
                          /* Four signals separate this step and all four
                             are load-bearing: the accent dot above, the
                             accent border over a wash fill, the pulsing
                             glow, and bold full-contrast text. Colour
                             alone would not survive monochrome. */
                          <div
                            className="ap-glow flex flex-col gap-1.5 rounded-[14px] px-[18px] py-4"
                            style={{ background: "var(--wash)", border: "1.5px solid var(--ed-accent-text)" }}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className="flex h-7 w-7 flex-none items-center justify-center rounded-lg"
                                style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-bd)", color: "var(--ed-accent-text)" }}
                                aria-hidden="true"
                              >
                                <Glyph d={t.d} size={15} />
                              </span>
                              <span style={{ ...MONO_LABEL, color: "var(--ed-accent-text)" }}>{t.label}</span>
                            </div>
                            <span className="ed-fg text-[15px] font-bold leading-[1.6]">{t.body}</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2.5">
                              <span
                                className="ed-card ed-border flex h-7 w-7 flex-none items-center justify-center rounded-lg border"
                                style={{ color: "var(--ed-fg-muted)" }}
                                aria-hidden="true"
                              >
                                <Glyph d={t.d} size={15} />
                              </span>
                              <span style={MONO_LABEL}>{t.label}</span>
                            </div>
                            <span className="ed-fg-muted text-[15px] leading-[1.6]">{t.body}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* ── Right: the app that went live ── */}
            <Reveal delay={0.12} className="flex flex-col items-center gap-3">
              <span
                className="self-center"
                /* The handoff says 9.5px; the system's 12px type floor
                   would clamp it anyway, so it is authored at 12. */
                style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--ed-fg-muted)" }}
              >
                4:20PM · ALREADY IN USE
              </span>
              <DigestApp />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Six apps ───────────────────────────────────── */}
      <section id="ships" className="ed-bg w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[860px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              Tools that went from described to deployed in an afternoon.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Each one specific to how that brand runs, and none needed a development cycle. All six
              came off a list like the one above, the week someone finally wrote them down.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.06}>
                <div className="ed-card ed-border flex h-full flex-col gap-3 rounded-2xl border p-5">
                  <Tile tone={a.tone} d={a.d} />
                  <span className="ed-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontSize: 17.5, fontWeight: 700 }}>{a.title}</span>
                  <span className="ed-fg-muted text-[14.5px] leading-[1.5]">{a.body}</span>
                  <div className="py-1"><Fragment id={a.id} /></div>
                  <span className="ed-rule mt-auto border-t pt-3" style={MONO_LABEL}>{a.where}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* The list continues; the fade says so without a number. */}
          <Reveal delay={0.1}>
            <div
              className="text-right"
              style={{
                fontFamily: JAKARTA, fontSize: 30, fontWeight: 800, letterSpacing: "0.08em",
                background: "linear-gradient(90deg, var(--ed-fg), var(--ed-fg-muted) 55%, var(--ed-border))",
                backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
              }}
              aria-hidden="true"
            >
              +++
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Network authorship ─────────────────────────
          Absorbs the deleted "Opened on a phone" section: the phone mock
          is the proof, so the claim does not need its own band. */}
      <section className="w-full" style={{ background: "#0B1220" }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[900px] flex-col gap-3.5">
            <h2 className="leading-[1.12] tracking-[-0.03em]" style={{ ...H2, color: "#EEF2F8" }}>
              Your best operators will start building things.{" "}
              <span style={{ color: MINT }}>You decide which ones everyone gets.</span>
            </h2>
            <p className="text-[18px] leading-[1.7]" style={{ color: "rgba(238,242,248,.72)" }}>
              The sharpest tools start at one location, built from a real franchisee need, and reach
              the customer directly on a phone, no portal and no login. Each one runs inside the
              guardrails you already set: brand standards, data boundaries, and what that owner is
              approved to do. When one works, it travels to the whole network in an afternoon.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_.95fr] lg:gap-14">
            <div className="flex flex-col gap-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div
                    className="flex items-start gap-4 rounded-2xl px-5 py-4"
                    style={{
                      background: s.published ? "rgba(0,174,239,.09)" : "rgba(238,242,248,.04)",
                      border: `1px solid ${s.published ? "rgba(0,174,239,.35)" : "rgba(238,242,248,.12)"}`,
                    }}
                  >
                    <span
                      className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[12.5px] font-bold"
                      style={
                        s.published
                          ? { background: MINT, color: "#0B1220" }
                          : { border: `1px solid ${MINT}`, color: MINT }
                      }
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: MINT }}>{s.label}</span>
                      <span className="text-[15px] leading-[1.55]" style={{ color: "rgba(238,242,248,.9)" }}>{s.body}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}><BookingApp /></Reveal>
          </div>

          {/* The loop restarts; nothing follows this line. */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="h-px flex-1" style={{ borderTop: "1px dashed rgba(0,174,239,.4)" }} aria-hidden="true" />
              <span className="text-center" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(0,174,239,.85)" }}>
                AND THE NEXT ONE STARTS AT A LOCATION AGAIN
              </span>
              <span className="h-px flex-1" style={{ borderTop: "1px dashed rgba(0,174,239,.4)" }} aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Related ────────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:px-12 lg:px-16 py-14 md:py-16 min-[1200px]:grid-cols-3">
          {[
            { kicker: "Workflows", title: "When it should run on its own", href: "/platform/workflows" },
            { kicker: "Integrations", title: "What an app can read from", href: "/platform/integrations" },
            { kicker: "Control Center", title: "The rules every app inherits", href: "/platform/control-center" },
          ].map((r, i) => (
            <Reveal key={r.href} delay={i * 0.06}>
              <Link href={r.href} className="ed-border ed-story-card flex h-full flex-col gap-2 rounded-2xl border px-4 py-5 sm:px-6">
                <span className="ed-accent-text uppercase" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em" }}>{r.kicker}</span>
                <span className="ed-fg whitespace-nowrap text-[14.5px] font-semibold leading-[1.45]">{r.title}</span>
                <ArrowRight className="ed-accent-text h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 7. Closing ────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "center" }} />
          <div className="absolute inset-0" style={{ background: HERO.closingCss ?? `rgba(${HERO.closingRgba})` }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(33,29,12,0) 45%, #211D0C 100%)" }} />
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
              className="leading-[1.12] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty", fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.625rem)" }}
            >
              Tell us the tool that&rsquo;s been{" "}
              <span style={{ color: GOLD }}>on your list for two years.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              We&rsquo;ll build it on the call.
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
