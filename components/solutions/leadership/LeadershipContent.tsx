"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG, SCRIM } from "@/lib/data/hero-backgrounds";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import { Flywheel, NetworkConsole } from "./artifacts";
import { ASKERS, GOV, PLAYS, RELATED, TONE } from "./data";

/**
 * /solutions/leadership
 *
 * Rebuilt from the supplied design handoff. Nine sections: hero with the
 * network console, visibility, leverage, the owner flywheel, governance,
 * the approval kit, the quote, related, closing.
 *
 * Deleted deliberately: the "keep the systems you chose" no-migration
 * section (**we do not talk against other vendors on this page**), the
 * `{{TBD:leadership-proof-*}}` quote block, the "Illustrative. Figures
 * show the shape of the view" disclaimers, and every section eyebrow.
 *
 * **Voice rule, every line:** never call the product "it", "this", or
 * "this one". Name it, EZee Assist or EZee.
 *
 * ── Deviation from the handoff, on request ──────────────────
 * The handoff specifies an evergreen gradient hero (`#1B4638`, accent
 * `#9FE8C8`) and says not to normalise it. **The existing hazy
 * photographic hero is kept instead**, per direct instruction, as on
 * Answers, Workflows, Compliance, Control Center and Coaches. The
 * on-band accent is `#9FE0F8`, what the other photographic bands use.
 * Evergreen survives as `--ever` for the Operations icon tile.
 *
 * Two loops: the 18s network console and the 12s flywheel. Both resolve
 * to their finished state under reduced motion.
 */

const HERO = HERO_BG.haze2;
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

export default function LeadershipContent() {
  return (
    <div className="ed-leadership">
      {/* ── 1. Hero ───────────────────────────────────────
          The hazy photograph, kept on request rather than the handoff's
          evergreen gradient. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${SCRIM.heroSubPage})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="ed-hero-pad relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.02fr_.98fr] lg:gap-14"
        >
          <div className="flex flex-col items-start">
            <p style={{ ...META, letterSpacing: "0.16em", color: SKY }}>For franchisor leadership</p>
            <h1
              className="mt-5"
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1,
                fontSize: "clamp(1.75rem, 0.9rem + 2.5vw, 2.9375rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              The whole network, current as of this morning.{" "}
              <span style={{ color: SKY }}>And a team that reaches all of it.</span>
            </h1>
            <p className="mt-5 max-w-[500px] text-base md:text-[17.5px] leading-[1.6]" style={{ color: ON_IMAGE }}>
              One layer across the systems you already run. Your coaches reach every location instead
              of the loudest ones, your owners get answers in seconds, and every AI output your
              network generates follows your rules.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              <a href="#visibility" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">See the network view</a>
            </div>
          </div>

          <NetworkConsole />
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. Visibility ─────────────────────────────────── */}
      <section id="visibility" className="ed-bg w-full scroll-mt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20 lg:grid-cols-[.84fr_1.16fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg" style={H2}>
              You&rsquo;re proactively on top of the key performance indicators{" "}
              <span className="ed-accent-text">you&rsquo;d want to know.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Where the network is, who is getting attention, and what moved. Assembled from the
              systems you already run, current when you ask, and scoped to territory, region, or a
              single location.
            </p>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              EZee Assist is not another dashboard nobody opens:{" "}
              <b className="ed-fg">you see whether what you&rsquo;re doing is working, not just
              what&rsquo;s wrong.</b>
            </p>
            <Link href="/platform/reporting" className="ed-accent-text inline-flex w-fit items-center gap-2 text-[14px] font-semibold">
              How reporting works
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border flex flex-col gap-3 rounded-3xl border p-4 sm:p-6" style={{ background: "var(--wash)" }}>
              <span className="ed-fg-muted" style={META}>Network · 214 locations · this quarter</span>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="ed-card ed-border flex flex-col gap-2 rounded-xl border p-4">
                  <span className="ed-fg text-[14px] font-semibold">Where the network is</span>
                  {[["Top decile", "+8.2%", "var(--ok)"], ["Median", "+3.1%", "var(--ok)"], ["Bottom quartile", "−1.4%", "var(--bad)"]].map(([l, v, c]) => (
                    <span key={l} className="flex items-baseline justify-between gap-3">
                      <span className="ed-fg-muted text-[13.5px]">{l}</span>
                      <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: c }}>{v}</span>
                    </span>
                  ))}
                  <span className="ed-rule ed-fg-muted border-t pt-2 text-[12.5px]">
                    Spread narrowed from 11.2 to <b className="ed-fg">9.6 points</b>
                  </span>
                </div>

                <div className="ed-card ed-border flex flex-col gap-2 rounded-xl border p-4">
                  <span className="ed-fg text-[14px] font-semibold">Who is getting attention</span>
                  <span className="ed-fg-muted text-[13px] leading-[1.45]">Locations with proactive contact this month</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="ed-fg" style={{ fontFamily: JAKARTA, fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>198</span>
                    <span className="ed-fg-muted text-[13px]">of 214</span>
                  </span>
                  <span className="ed-rule ed-fg-muted mt-auto border-t pt-2 text-[12.5px]">
                    Same period last year: <b className="ed-fg">64 of 214</b>
                  </span>
                </div>
              </div>

              <div className="ed-card ed-border flex flex-col gap-2 rounded-xl border p-4">
                <span className="ed-fg text-[14px] font-semibold">What moved, and why</span>
                <span className="ed-fg-muted text-[13.5px] leading-[1.55]">
                  Attach rate <b className="ed-fg">+2.1% network-wide</b>: 34 locations adopted the
                  add-on script already working in the top quartile. Compliance completion{" "}
                  <b className="ed-fg">94%, from 71%</b>. New units to competence:{" "}
                  <b className="ed-fg">14 weeks, from 19</b>.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Leverage ───────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20 lg:grid-cols-[.84fr_1.16fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg" style={H2}>
              Your current team&rsquo;s expertise, <span className="ed-accent-text">reaching further.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Coaching has always scaled with headcount: every twenty locations buys another coach,
              and what any one location receives stays flat. With plays running, coverage per
              location rises while the team stays the size you chose.
            </p>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Your field team&rsquo;s time moves from answering and chasing to the work you hired
              them for, and <b className="ed-fg">adding units stops adding proportional G&amp;A.</b>
            </p>
            <Link href="/solutions/coaches" className="ed-accent-text inline-flex w-fit items-center gap-2 text-[14px] font-semibold">
              What your coaches&rsquo; week becomes
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-card ed-border overflow-hidden rounded-2xl border">
              <div className="ed-card-alt ed-fg-muted flex flex-wrap items-baseline justify-between gap-3 px-5 py-3" style={META}>
                <span>One play · soft bookings · ran overnight</span>
                <span>214 locations</span>
              </div>
              {PLAYS.map((p, i) => {
                const [bg, fg] = TONE[p.tone];
                return (
                  <div key={p.store} className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 ${i === 0 ? "" : "ed-rule border-t"}`}>
                    <span className="w-12 flex-none" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "var(--ed-fg)" }}>{p.store}</span>
                    <span className="flex min-w-0 flex-col">
                      <span className="ed-fg text-[14px] font-semibold">{p.state}</span>
                      <span className="ed-fg-muted text-[12.5px]">{p.context}</span>
                    </span>
                    <span
                      className="ml-auto flex-none whitespace-nowrap rounded-md px-2.5 py-1"
                      style={{ background: bg, color: fg, fontFamily: MONO, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}
                    >
                      {p.action}
                    </span>
                  </div>
                );
              })}
              <div className="ed-rule ed-fg-muted border-t px-5 py-3.5 text-[15px] leading-[1.55]">
                One play, four locations, none of them treated the same. Your owners are independent
                businesses, and EZee Assist is the first thing that treats them that way at scale.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Owner flywheel ─────────────────────────────
          Four nodes and a return line, not four text columns. The loop
          closing is the argument. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>
              With supported owners validating,{" "}
              <span className="ed-accent-text">your next location sale just became easier.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              The most expensive thing in a franchise system is an owner who feels alone. What they
              tell a prospect on a validation call is the single biggest input to your development
              pipeline.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-9"><Flywheel /></Reveal>

          <Reveal delay={0.1}>
            <p className="ed-fg-muted mt-7 max-w-[760px] text-[16.5px] leading-[1.6]">
              An owner who feels supported is a renewal, a second unit, and a good validation call.
              An owner who doesn&rsquo;t is a transfer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Governance ─────────────────────────────────── */}
      <section className="w-full" style={{ background: "#0B1220" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-2 lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 style={{ ...H2, color: "#FFFFFF" }}>
              Your brand is on every output{" "}
              <span style={{ color: SKY }}>your network generates.</span>
            </h2>
            <p className="text-[18px] leading-[1.7]" style={{ color: "rgba(238,242,248,.72)" }}>
              Some of your owners have already started using AI on their own. The rest will.
              Different tools, different prompts, different data, no admin panel, and everything
              generated carries your name.
            </p>
            <p className="text-[18px] leading-[1.7]" style={{ color: "rgba(238,242,248,.72)" }}>
              Ungoverned AI is a brand risk.{" "}
              <b style={{ color: "#FFFFFF" }}>EZee Assist is the layer that removes it.</b>
            </p>
            <Link href="/platform/control-center" className="inline-flex w-fit items-center gap-2 text-[14px] font-semibold" style={{ color: SKY }}>
              Inside the Control Center
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-3">
            {GOV.map(([label, body]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-x-4 gap-y-1.5 rounded-xl px-4 py-3.5 sm:grid-cols-[120px_1fr]"
                style={{ background: "rgba(238,242,248,.04)", border: "1px solid rgba(238,242,248,.12)" }}
              >
                <span style={{ ...META, color: SKY }}>{label}</span>
                <span className="text-[15px] leading-[1.5]" style={{ color: "rgba(238,242,248,.85)" }}>{body}</span>
              </div>
            ))}
            <p className="mt-1 text-[15px] leading-[1.55]" style={{ color: "rgba(238,242,248,.65)" }}>
              One policy set, one permission model, one log, across every location, every channel,
              and every department.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Approval kit ───────────────────────────────
          Light grey cards with colourful icon tiles. Do not tint the
          whole cards; that was tried and rejected as too colourful. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>
              You already know who&rsquo;s going to ask.{" "}
              <span className="ed-accent-text">Here&rsquo;s what each of them wants to see.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Most of this decision happens in rooms we&rsquo;re not in. This is the material for
              those rooms. Send this page to whichever of them asks first.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ASKERS.map((a, i) => {
              const [bg, fg] = TONE[a.tone];
              return (
                <Reveal key={a.who} delay={(i % 4) * 0.05}>
                  <Link href={a.href} className="ed-card-alt ed-border ed-story-card flex h-full flex-col gap-2.5 rounded-2xl border p-5">
                    <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px]" style={{ background: bg, color: fg }} aria-hidden="true">
                      <Glyph d={a.d} size={18} />
                    </span>
                    <span className="ed-fg text-[15.5px] font-semibold">{a.who}</span>
                    <span className="ed-fg-muted text-[13.5px] leading-[1.5]">{a.q}</span>
                    <span className="ed-accent-text mt-auto inline-flex items-center gap-1.5 pt-2 text-[13px] font-semibold">
                      {a.link}
                      <ArrowRight className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Quote ──────────────────────────────────────── */}
      <section className="w-full" style={{ background: "#0B1220" }}>
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="m-0 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[1fr_auto] lg:gap-14"
        >
          <blockquote
            className="m-0 leading-[1.45] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontSize: "clamp(1.125rem, 0.7rem + 1.1vw, 1.5rem)", fontWeight: 600, color: "#EEF2F8", textWrap: "pretty" }}
          >
            &ldquo;EZee Assist has increased owner retention and topline revenue, and given our team
            back the hours we were spending answering the same questions.&rdquo;
          </blockquote>
          <figcaption
            className="flex flex-col gap-1 border-t pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
            style={{ borderColor: "rgba(238,242,248,.18)" }}
          >
            {/* Cut-out portrait, sized to sit with the attribution rather
                than compete with the quote. Decorative beside her name,
                so the alt is empty and she is not announced twice. */}
            <Image
              src="/photos/jami-stigliano-cut.png"
              alt=""
              width={52}
              height={52}
              className="mb-2 flex-none rounded-full object-cover"
              style={{ width: 52, height: 52, background: "rgba(238,242,248,.08)" }}
            />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#EEF2F8" }}>Jami Stigliano</span>
            <span style={{ fontSize: 13, color: "rgba(238,242,248,.65)" }}>Founder &amp; CEO, DivaDance</span>
            <Link href="/case-studies" className="mt-2 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold" style={{ color: SKY }}>
              Read the case studies
              <ArrowRight className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </figcaption>
        </motion.figure>
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
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${SCRIM.closing})` }} />
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
              Bring us your <span style={{ color: SKY }}>bottom quartile.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              We&rsquo;ll show you what would have surfaced for each of those locations this week,
              and what your top decile is already doing that they aren&rsquo;t.
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
