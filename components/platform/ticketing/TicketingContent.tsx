"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HERO_GRADIENT } from "@/lib/data/hero-backgrounds";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import HeroThread from "./HeroThread";
import ConsoleApp from "./Console";
import { DEPARTMENTS, INBOXES, RECURRING, RELATED, RULES, TAKEAWAYS, TONES, TRAIL } from "./data";

/**
 * /platform/ticketing
 *
 * Rebuilt from the supplied design handoff. The old page had nine thin
 * sections; this has five plus related and closing, built around one
 * full-width animated console that does most of the work.
 *
 * Deleted deliberately, do not reintroduce: every section eyebrow, the
 * separate intake section, the "It arrives owned" detail cards (folded
 * into the console drawer), the department SLA table, the before/after
 * block, and the whole "The helpdesk was only ever half of it"
 * displacement section.
 *
 * **The hero is plum**, `HERO_GRADIENT.plum`, and this page left the
 * photographic variant map to take it. It is the warmest band in the
 * family and the furthest from the rest, which it needs to be: the
 * centrepiece is a long dark console, so the hero is the thing that says
 * which page you are on.
 *
 * Two loops: the 12s hero thread and the 22s console lifecycle. Both
 * freeze to their complete end-state under `prefers-reduced-motion`,
 * because in both the base styles are that state.
 */

const PL = HERO_GRADIENT.plum;

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.6rem + 2vw, 2.375rem)",
  textWrap: "pretty" as const,
};

const H2_SMALL = { ...H2, fontSize: "clamp(1.375rem, 0.7rem + 1.5vw, 2.125rem)" };

const MONO_LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.12em", color: "var(--ed-fg-muted)",
};

export default function TicketingContent() {
  return (
    <div className="ed-ticketing">
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: PL.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: PL.hero }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:gap-14"
        >
          <div className="flex flex-col items-start gap-5">
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.16em", fontWeight: 600, color: PL.accent }}>
              Ticketing
            </p>
            <h1
              className="leading-[1.1] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty", fontSize: "clamp(1.75rem, 0.6rem + 2.65vw, 2.9375rem)" }}
            >
              One place to ask HQ for anything.{" "}
              <span style={{ color: PL.accent }}>It finds the right team on its own.</span>
            </h1>
            <p className="max-w-[490px] text-base md:text-[17.5px] leading-[1.6]" style={{ color: PL.body }}>
              A franchisee raises a ticket by asking, in Teams, Slack, or SMS, wherever they already
              are. It gets classified, routed to the department that owns it, and tracked until it
              closes.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              <a href="#console" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">See the queue</a>
            </div>
          </div>

          <HeroThread />
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. The problem ────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2_SMALL}>
              Before a franchisee can ask for help, they have to know who owns the answer.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              So the question goes to whichever inbox they remember, or to their coach&rsquo;s
              mobile, where it leaves no record.{" "}
              <b className="ed-fg">
                Nobody at HQ can say how many requests are open right now, or which department is the
                bottleneck.
              </b>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border rounded-[22px] border p-4 sm:p-[30px]" style={{ background: "var(--wash)" }}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="ed-card ed-border flex flex-col gap-3 rounded-2xl border p-5">
                  <span style={MONO_LABEL}>ONE REQUEST, SIX WEEKS AGO</span>
                  <span className="ed-fg text-[13.5px] font-semibold leading-[1.45]">
                    &ldquo;I want to run a promo with the gym next door.&rdquo;
                  </span>
                  {/* Dot trail. The connector is what makes it a journey
                      rather than a list; the last dot has none. */}
                  <div className="flex flex-col">
                    {TRAIL.map((t, i) => {
                      const last = i === TRAIL.length - 1;
                      return (
                        <div key={t} className="flex gap-2.5">
                          <span className="flex flex-none flex-col items-center" aria-hidden="true">
                            <span
                              className="mt-1.5 h-[9px] w-[9px] flex-none rounded-full"
                              style={{ border: `2px solid ${last ? "var(--bad)" : "var(--ed-border)"}` }}
                            />
                            {!last && <span className="w-px flex-1" style={{ background: "var(--ed-border)", minHeight: 14 }} />}
                          </span>
                          <span
                            className={`pb-2.5 text-[13.5px] leading-[1.35] ${last ? "" : "ed-fg-muted"}`}
                            style={last ? { color: "var(--bad)" } : undefined}
                          >
                            {t}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <span className="ed-rule mt-auto border-t pt-3 text-[13.5px] font-bold" style={{ color: "var(--bad)" }}>
                    Approved two weeks later
                  </span>
                </div>

                <div className="ed-card ed-border flex flex-col gap-3 rounded-2xl border p-5">
                  <span style={MONO_LABEL}>WHERE REQUESTS LIVE TODAY</span>
                  <div className="flex flex-col">
                    {INBOXES.map((r, i) => (
                      <div key={r.alias} className={`flex items-baseline justify-between gap-3 py-2.5 ${i === 0 ? "" : "ed-rule border-t"}`}>
                        <span
                          style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: r.bad ? 700 : 400, color: r.bad ? "var(--bad)" : "var(--ed-fg)" }}
                        >
                          {r.alias}
                        </span>
                        <span
                          className="text-right text-[13px]"
                          style={{ color: r.bad ? "var(--bad)" : "var(--ed-fg-muted)", fontWeight: r.bad ? 700 : 400 }}
                        >
                          {r.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. The console ────────────────────────────────── */}
      <section id="console" className="w-full scroll-mt-24" style={{ background: "#0B1220" }}>
        <div className="mx-auto flex max-w-[1560px] flex-col gap-8 px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <Reveal className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex max-w-[840px] flex-col gap-3.5">
              <h2 className="leading-[1.12] tracking-[-0.03em]" style={{ ...H2, color: "#EEF2F8" }}>
                Every request lands in one queue,{" "}
                <span style={{ color: PL.accent }}>already classified, owned, and timed.</span>
              </h2>
              <p className="text-[18px] leading-[1.7]" style={{ color: "rgba(238,242,248,.72)" }}>
                Watch #4471 arrive. It gets read for what it actually is, routed to the department
                that owns it, opened with the location&rsquo;s context already attached, and closed
                with a rule that stops the next nine.
              </p>
            </div>
            <div className="flex flex-none gap-10">
              {[{ n: "64", l: "open across HQ" }, { n: "9", l: "departments covered" }].map((s) => (
                <span key={s.l} className="flex flex-col gap-1">
                  <span style={{ fontFamily: JAKARTA, fontSize: 30, fontWeight: 800, color: "#EEF2F8", letterSpacing: "-0.03em" }}>{s.n}</span>
                  <span className="text-[13px]" style={{ color: "rgba(238,242,248,.6)" }}>{s.l}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}><ConsoleApp /></Reveal>

          <Reveal delay={0.1}>
            <div
              /* Four up only from xl. The titles are nowrap by design and the
                 longest, "Triaged automatically", needs 207px; at four
                 columns that is 2px short at 1024. */
              className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-9"
              style={{ borderTop: "1px solid rgba(238,242,248,.12)" }}
            >
              {TAKEAWAYS.map((t) => (
                <div key={t.title} className="flex flex-col gap-2">
                  <h3
                    className="whitespace-nowrap tracking-[-0.025em]"
                    style={{ fontFamily: JAKARTA, fontSize: 21, fontWeight: 700, color: t.accent ? PL.accent : "#EEF2F8" }}
                  >
                    {t.title}
                  </h3>
                  <p className="max-w-[270px] text-[16.5px] leading-[1.5]" style={{ color: "rgba(238,242,248,.7)", textWrap: "balance" }}>
                    {t.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Routing ────────────────────────────────────
          Every card is filled with its own tint, not just the icon: nine
          neutral cards would argue the departments are interchangeable,
          which is the opposite of the point. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[860px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              All departments. Only one thing a franchisee has to remember:{" "}
              <span className="ed-accent-text">simply ask.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Every department at HQ is covered, not just support. You set which team owns what once,
              and every request after that follows it.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((d, i) => {
              const [tint, ink] = TONES[d.tone];
              return (
                <Reveal key={d.name} delay={(i % 3) * 0.06}>
                  {/* Grey cards, colour only in the icon tile. Nine
                      fully tinted cards read as a paint chart and drown
                      the section's actual point, which is that every
                      department is covered by one thing. */}
                  <div className="ed-card-alt ed-border flex h-full flex-col gap-3 rounded-[14px] border p-5">
                    <span className="flex items-center gap-2.5">
                      <span
                        className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px]"
                        style={{ background: tint, color: ink }}
                      >
                        <Glyph d={d.d} size={17} />
                      </span>
                      <span className="ed-fg" style={{ fontFamily: JAKARTA, fontSize: 16.5, fontWeight: 700 }}>{d.name}</span>
                    </span>
                    <span className="ed-fg-muted text-[14px] leading-[1.5]">{d.examples}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Analytics and content health ───────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2_SMALL}>
              Analytics across every team, and{" "}
              <span className="ed-accent-text">a content health report that tells you what to
              write next.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Volume and response times by team, the requests that keep coming back, and where your
              material has a gap.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="ed-card ed-border overflow-hidden rounded-2xl border">
              <div className="ed-card-alt px-5 py-3" style={MONO_LABEL}>WHAT KEEPS COMING BACK · LAST SIX MONTHS</div>
              {RECURRING.map((r) => (
                <div
                  key={r.topic}
                  className="ed-rule grid grid-cols-1 items-baseline gap-x-4 gap-y-1 border-t px-5 py-3.5 sm:grid-cols-[minmax(0,1fr)_86px_132px]"
                >
                  <span className="ed-fg text-[14.5px]">{r.topic}</span>
                  <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "var(--plum)" }}>raised {r.count}</span>
                  <span className="ed-fg-muted sm:text-right" style={{ fontFamily: MONO, fontSize: 12 }}>{r.avg}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 rounded-2xl p-5" style={{ background: "var(--wash)", border: "1.5px solid var(--plum)" }}>
              <span style={MONO_LABEL}>WRITE THIS ONCE, AND IT STOPS ARRIVING</span>
              {RULES.map((r) => (
                <div key={r.rule} className="flex items-baseline justify-between gap-4">
                  <span className="ed-fg text-[14px] leading-[1.45]">{r.rule}</span>
                  <span className="flex-none whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "var(--ok)" }}>
                    {r.saving}
                  </span>
                </div>
              ))}
              <p className="ed-rule ed-fg-muted border-t pt-3 text-[13px] leading-[1.5]">
                After the partner promo rule was published, the same request came 14 times and 12
                answered themselves. Two reached a person, because those terms were genuinely
                unusual.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Related ────────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:px-12 lg:px-16 py-14 md:py-16 min-[1200px]:grid-cols-3">
          {RELATED.map((r, i) => (
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
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: PL.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: PL.closing }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(to bottom, rgba(30,14,32,0) 45%, ${PL.resolve} 100%)` }} />

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
              Tell us where your franchisees&rsquo; requests{" "}
              <span style={{ color: PL.accent }}>go today.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: PL.body }}>
              We&rsquo;ll show you the same week in one queue, classified and owned, with the five
              rules that would have stopped half of it.
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
