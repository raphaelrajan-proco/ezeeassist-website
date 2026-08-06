"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import Matrix from "./Matrix";
import {
  ACCESS_POINTS, LOG, MODEL_POINTS, POLICY, PROOF, RELATED, RESPONSES,
  ROLLOUT, ROUTING, SEPARATE, UNIFIED,
} from "./data";

/**
 * /platform/control-center
 *
 * Rebuilt from the supplied design handoff. Eleven sections, delivering
 * a promise the homepage makes: ungoverned AI is a brand risk, and this
 * is the system that removes it.
 *
 * **The page's real job is being forwarded**, so it is built to read
 * like a document rather than a brochure. Three readers use it: the ops
 * champion who needs material to hand to colleagues, the IT and security
 * reviewer who needs enough specificity to say yes, and Legal, Finance
 * and Marketing who each need one question answered fast.
 *
 * ── Decisions the handoff left open ─────────────────────────
 *
 * **The hero and closing bands stay the existing hazy indigo variant**,
 * per direct instruction, rather than the handoff's charcoal gradient.
 * The handoff itself offers this: it calls charcoal "a deliberate
 * departure" and names the closing band as the one to switch back for
 * continuity with other routes. The Capability band keeps its charcoal,
 * since that is a mid-page surface rather than the hero.
 *
 * **The three `/trust-center` links point at `/security`**, which is
 * where the live Trust Center is.
 *
 * **The four `{{TBD:control-center-proof-*}}` tokens are replaced** with
 * the already-published WSI material. The handoff also suggested "in 30
 * days"; nothing in the repo supports that timeframe, so the metric
 * ships as published. See `data.ts`.
 *
 * The prototype's `showUsagePanel` and `showRelated` toggles are
 * authoring affordances and are not carried across.
 *
 * Sections 5, 6 and 7 are three consecutive light surfaces and
 * deliberately use three different devices: a numbered spine, a dense
 * log, and a diagram. If any two become card grids the middle of the
 * page collapses.
 */

const HERO = platformHero("control-center");
const SKY = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.9)";

const CHARCOAL = "linear-gradient(158deg, #171717 0%, #101010 50%, #060606 100%)";
const CHARCOAL_GLOW = "radial-gradient(110% 80% at 82% -10%, rgba(159,224,248,0.07), transparent 60%)";

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)",
  letterSpacing: "-0.03em", lineHeight: 1.08, textWrap: "pretty" as const,
};

const EYEBROW = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.16em", textTransform: "uppercase" as const,
};

const META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

const ON_CHAR      = "rgba(245,245,247,0.92)";
const ON_CHAR_MUTE = "rgba(245,245,247,0.55)";
const ON_CHAR_RULE = "rgba(245,245,247,0.14)";

export default function ControlCenterContent() {
  return (
    <div className="ed-control-center">
      {/* ── 1. Hero ───────────────────────────────────────
          Hazy indigo, kept on request rather than the handoff's
          charcoal. The Capability band below still carries charcoal. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ background: HERO.scrimCss ?? `rgba(${HERO.scrimRgba})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-2 lg:gap-16"
        >
          <div className="flex flex-col items-start">
            <p style={{ ...EYEBROW, color: SKY }}>Control Center</p>
            <h1
              className="mt-5 max-w-[900px]"
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.04,
                fontSize: "clamp(1.75rem, 1rem + 2.6vw, 3.25rem)", color: "#FFFFFF", textWrap: "pretty",
              }}
            >
              Every AI your network touches, running under one set of rules.
            </h1>
            {/* The four clauses are the page's four arguments and work as
                a table of contents. Keep the sentence structure. */}
            <p className="mt-5 max-w-[660px] text-[17px] leading-[1.6]" style={{ color: ON_IMAGE }}>
              Who can see what. What the AI is allowed to do for them. What it costs, and what it
              did. Set once at HQ, applied at every location, in every channel, for every department.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              {/* Anchors at capability, not data access: data
                  permissions are expected, capability permissions are
                  what converts. */}
              <a href="#capability" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">
                See what each person can do
              </a>
            </div>
          </div>

          <div className="max-w-[620px] overflow-hidden rounded-[14px]" style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${ON_CHAR_RULE}` }}>
            <div className="px-5 py-3" style={{ background: "rgba(255,255,255,0.05)", ...META, color: "rgba(245,245,247,0.6)", fontVariantNumeric: "tabular-nums" }}>
              Network policy · 214 locations · applied
            </div>
            {POLICY.map((r, i) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid rgba(245,245,247,0.1)",
                  background: r.on ? undefined : "rgba(0,0,0,0.22)",
                }}
              >
                <span className="text-[14.5px]" style={{ color: r.on ? ON_CHAR : "rgba(245,245,247,0.55)" }}>{r.label}</span>
                <span
                  className="flex flex-none items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={
                    r.on
                      ? { background: "rgba(159,224,248,0.12)", border: "1px solid rgba(159,224,248,0.34)", color: SKY }
                      : { border: "1px solid rgba(245,245,247,0.24)", color: "rgba(245,245,247,0.6)" }
                  }
                >
                  <span
                    className="h-[7px] w-[7px] rounded-full"
                    style={r.on ? { background: SKY } : { boxShadow: "inset 0 0 0 1px rgba(245,245,247,0.6)" }}
                    aria-hidden="true"
                  />
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600 }}>{r.on ? "ON" : "OFF"}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. One system ─────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>One system</p>
            <h2 className="ed-fg" style={H2}>One AI across your whole network. Not a dozen, running separately.</h2>
            <p className="ed-fg-muted text-[15px] leading-[1.55]">
              Your locations, your departments, and your coaches are already using AI. Right now
              every one of them is a separate decision, with separate rules and no shared record.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="ed-card ed-border h-full overflow-hidden rounded-[14px] border">
                <div className="ed-card-alt ed-fg-muted px-5 py-3" style={META}>Separate decisions</div>
                {SEPARATE.map((r, i) => (
                  <div
                    key={r.who}
                    className={`grid grid-cols-1 gap-x-4 gap-y-1 px-5 py-3 sm:grid-cols-[minmax(96px,0.42fr)_1fr] ${i === 0 ? "" : "ed-border border-t"}`}
                    style={r.warn ? { background: "rgba(180,83,9,0.05)" } : undefined}
                  >
                    <span style={{ fontFamily: MONO, fontSize: 12.5, color: r.warn ? "var(--warn)" : "var(--ed-fg)", fontWeight: r.warn ? 600 : 400 }}>{r.who}</span>
                    <span className="text-[14.5px]" style={{ color: r.warn ? "var(--warn)" : "var(--ed-fg-muted)", fontWeight: r.warn ? 500 : 400 }}>{r.what}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                className="ed-card h-full overflow-hidden rounded-[14px]"
                style={{ border: "1px solid rgba(0,119,168,0.3)", borderLeft: "3px solid #0077A8" }}
              >
                <div className="px-5 py-3" style={{ background: "rgba(0,119,168,0.06)", ...META, color: "var(--ed-accent-text)" }}>One system</div>
                {UNIFIED.map(([k, v], i) => (
                  <div key={k} className={`grid grid-cols-1 gap-x-4 gap-y-1 px-5 py-3 sm:grid-cols-[minmax(140px,0.5fr)_1fr] ${i === 0 ? "" : "ed-border border-t"}`}>
                    <span className="ed-fg text-[14.5px] font-semibold">{k}</span>
                    <span className="ed-fg-muted text-[14.5px]">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. Data access ────────────────────────────────
          No capability language here: what a person can *do* belongs
          entirely to section 4. */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>Data access</p>
            <h2 className="ed-fg" style={H2}>The same question. Answered inside what each user is entitled to see.</h2>
            <p className="ed-fg-muted text-[15px] leading-[1.55]">
              Role and location decide what any answer, report, or action can include. Enforced every
              time.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p
              className="ed-fg mt-9 pl-[18px]"
              style={{ fontFamily: JAKARTA, fontSize: "clamp(1.125rem, 0.6rem + 1.3vw, 1.625rem)", fontWeight: 500, borderLeft: "3px solid #0077A8" }}
            >
              &ldquo;How did we do on attach rate last month?&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-7">
            <div className="ed-card ed-border overflow-hidden rounded-[14px] border">
              {RESPONSES.map((r, i) => (
                <div key={r.role} className={`grid grid-cols-1 gap-x-6 gap-y-2.5 px-5 py-5 lg:grid-cols-[minmax(260px,0.5fr)_1fr] ${i === 0 ? "" : "ed-border border-t"}`}>
                  <span className="flex flex-col gap-2">
                    <span style={{ ...META, color: "var(--ed-accent-text)" }}>{r.role}</span>
                    {/* The rule grows down the list; that growth is the
                        visual half of the argument. */}
                    <span className="block h-0.5" style={{ width: r.rule, background: "var(--ed-accent-text)" }} aria-hidden="true" />
                  </span>
                  <span className="ed-fg text-[15px] leading-[1.55]" style={{ fontVariantNumeric: "tabular-nums" }}>{r.text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border mt-8 grid grid-cols-1 gap-7 border-t pt-7 sm:grid-cols-2 lg:grid-cols-3">
              {ACCESS_POINTS.map((p) => (
                <span key={p.title} className="flex flex-col gap-1.5">
                  <span className="ed-fg text-[15px] font-semibold">{p.title}</span>
                  <span className="ed-fg-muted text-[14px] leading-[1.5]">{p.body}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Capability, the centrepiece ────────────────── */}
      <section id="capability" className="relative w-full scroll-mt-24 overflow-hidden" style={{ background: CHARCOAL }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: CHARCOAL_GLOW }} />
        <div className="relative mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <p style={{ ...EYEBROW, color: ON_CHAR_MUTE }}>Capability</p>
            <h2 style={{ ...H2, color: "#FFFFFF" }}>
              You control what each person sees.
              <span className="block" style={{ color: SKY }}>You also control what the AI does for them.</span>
            </h2>
            <p className="text-[15px] leading-[1.55]" style={{ color: "rgba(245,245,247,0.72)" }}>
              Every AI product controls what a person can see. This controls what the AI is allowed
              to do on their behalf.
            </p>
          </Reveal>

          <div className="mt-9"><Matrix /></div>
        </div>
      </section>

      {/* ── 5. Safe rollout ───────────────────────────────
          A numbered spine, not a card grid. Section 6 follows and is
          data dense; this is what keeps them distinct. */}
      <section id="sandbox" className="ed-bg w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>Safe rollout</p>
            <h2 className="ed-fg" style={H2}>Franchisees can build in a secured system.</h2>
            <p className="ed-fg-muted text-[15px] leading-[1.55]">
              Franchisees writing their own tools sounds like a risk. It stops being one when the
              environment is bounded, and every App or Workflow is inspectable before it moves.
            </p>
          </Reveal>

          <div className="ed-border mt-9 flex max-w-[900px] flex-col border-l">
            {ROLLOUT.map(([n, label, body], i) => (
              <Reveal key={n} delay={i * 0.07}>
                <div className="relative grid grid-cols-1 gap-x-8 gap-y-2 pb-8 pl-7 lg:grid-cols-[minmax(0,200px)_1fr]">
                  <span
                    className="absolute left-[-7px] top-1 h-[13px] w-[13px] rounded-full"
                    style={i === ROLLOUT.length - 1
                      ? { background: "var(--ed-accent-text)" }
                      : { background: "var(--ed-card)", boxShadow: "inset 0 0 0 2px var(--ed-accent-text)" }}
                    aria-hidden="true"
                  />
                  <span className="flex items-baseline gap-3">
                    <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 600, color: "var(--ed-accent-text)" }}>{n}</span>
                    <span className="ed-fg" style={{ fontFamily: JAKARTA, fontSize: 17, fontWeight: 600 }}>{label}</span>
                  </span>
                  <span className="ed-fg-muted text-[15px] leading-[1.55]">{body}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="ed-fg mt-2 max-w-[760px]" style={{ fontFamily: JAKARTA, fontSize: "clamp(1.0625rem, 0.6rem + 1.1vw, 1.375rem)", fontWeight: 600, lineHeight: 1.35 }}>
              The safest network is not the one where nobody builds anything. It&rsquo;s the one
              where building is bounded, visible, and reversible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. The record ─────────────────────────────────
          Keeps its human actions: entries 3 and 5 involve named people
          approving and publishing, which is what makes the record usable
          in a dispute. The odd minutes are deliberate. */}
      <section id="record" className="ed-bg-alt w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>The record</p>
            <h2 className="ed-fg" style={H2}>Every question, answer, action, and approval is logged and verifiable.</h2>
            <p className="ed-fg-muted text-[15px] leading-[1.55]">
              Searchable, exportable, attributable to a person and a location, with sources.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-9">
            <div
              className="ed-card ed-border overflow-hidden rounded-[14px] border"
              style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.04)" }}
            >
              <div className="ed-card-alt ed-fg-muted px-5 py-3" style={META}>Activity · West territory · last 24 hours</div>
              {LOG.map((e, i) => (
                <div key={e.time} className={`grid grid-cols-1 gap-x-4 gap-y-1.5 px-5 py-4 sm:grid-cols-[58px_1fr] ${i === 0 ? "" : "ed-border border-t"}`}>
                  <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}>{e.time}</span>
                  <span className="flex flex-col gap-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="ed-fg text-[14px] font-medium">{e.actor}</span>
                      <span className="ed-accent-text text-[13px]">{e.topic}</span>
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: e.hold ? "var(--warn)" : "var(--ed-fg-muted)" }}>{e.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Model choice ───────────────────────────────
          Do not name a model vendor: the claim is swappability and a
          vendor list dates fast. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <p className="ed-fg-muted" style={EYEBROW}>Model choice</p>
            <h2 className="ed-fg" style={H2}>The best model for a task changes every few months. Your platform shouldn&rsquo;t.</h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-9">
            <div className="mx-auto flex max-w-[620px] flex-col items-center">
              {[0, 1].map((half) => (
                <div key={half} className="contents">
                  {half === 1 && (
                    <>
                      <span className="ed-border block h-[22px] w-px border-l" aria-hidden="true" />
                      <div
                        className="flex w-full flex-col items-center gap-1 rounded-xl px-5 py-4"
                        style={{ border: "1px dashed rgba(0,119,168,0.5)", background: "rgba(0,119,168,0.06)" }}
                      >
                        <span style={{ ...META, color: "var(--ed-accent-text)" }}>Model provider</span>
                        <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--ed-accent-text)" }}>swappable</span>
                      </div>
                      <span className="ed-border block h-[22px] w-px border-l" aria-hidden="true" />
                    </>
                  )}
                  <div className="ed-card ed-border flex w-full flex-col items-center gap-1 rounded-xl border px-5 py-4 text-center">
                    <span className="ed-fg text-[14px] font-medium">
                      Your policies · your access model · your capabilities · your plays · your log
                    </span>
                    <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 12 }}>unchanged</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border mt-9 grid grid-cols-1 gap-7 border-t pt-7 sm:grid-cols-2 lg:grid-cols-3">
              {MODEL_POINTS.map((p) => (
                <span key={p.title} className="flex flex-col gap-1.5">
                  <span className="ed-fg text-[15px] font-semibold">{p.title}</span>
                  <span className="ed-fg-muted text-[14px] leading-[1.5]">{p.body}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. Review-ready ───────────────────────────────
          A routing table, not seven arguments. One line per row. */}
      <section className="w-full" style={{ background: "#0B1220" }}>
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <p style={{ ...EYEBROW, color: "rgba(238,242,248,0.55)" }}>Review-ready</p>
            <h2 style={{ ...H2, color: "#FFFFFF" }}>
              Everything here is linkable, so you can send the part that matters
            </h2>
          </Reveal>

          <div className="mt-9 flex flex-col">
            {ROUTING.map((r, i) => (
              <Reveal key={r.fn} delay={i * 0.05}>
                <div
                  className="grid grid-cols-1 gap-x-6 gap-y-1.5 py-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)_minmax(0,0.9fr)]"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(238,242,248,0.16)" }}
                >
                  <span className="text-[14.5px] font-semibold" style={{ color: "#FFFFFF" }}>{r.fn}</span>
                  <span className="text-[14px]" style={{ color: "rgba(238,242,248,0.7)" }}>{r.q}</span>
                  <Link href={r.href} className="inline-flex w-fit items-center gap-1.5 text-[13.5px]" style={{ color: SKY }}>
                    {r.to}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Proof ──────────────────────────────────────
          The prototype's four {{TBD}} tokens, replaced with published
          WSI material. See data.ts. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
          <Reveal className="flex flex-col gap-3.5">
            <h2 className="ed-fg" style={H2}>Rolled out across a governed network.</h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-7">
            <figure
              className="ed-card m-0 max-w-[720px] rounded-[14px] p-6"
              style={{ border: "1px solid var(--ed-border)", borderLeft: "3px solid #0077A8" }}
            >
              <span className="ed-fg-muted block" style={META}>{PROOF.brand}</span>
              <p
                className="mt-2"
                style={{ fontFamily: JAKARTA, fontSize: "clamp(1.375rem, 0.8rem + 1.2vw, 2rem)", fontWeight: 700, color: "var(--ed-accent-text)", letterSpacing: "-0.02em" }}
              >
                {PROOF.metric}
              </p>
              <blockquote className="ed-fg m-0 mt-4 text-[16px] leading-[1.6]">&ldquo;{PROOF.quote}&rdquo;</blockquote>
              <figcaption className="ed-fg-muted mt-4" style={{ fontFamily: MONO, fontSize: 12 }}>{PROOF.attribution}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── 10. Related ───────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.06}>
              <Link href={r.href} className="ed-card ed-border ed-story-card flex h-full flex-col gap-2 rounded-[14px] border p-6">
                <span className="ed-accent-text" style={{ ...META, letterSpacing: "0.14em" }}>{r.kicker}</span>
                <span className="ed-fg-muted text-[14.5px] leading-[1.5]">{r.title}</span>
                <ArrowRight className="ed-accent-text mt-1 h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 11. Closing ───────────────────────────────────── */}
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
              Send us the questions your security review always asks.
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              We&rsquo;ll answer them in writing before the first call.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-3 self-stretch lg:items-end lg:justify-end">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
            </Link>
            <a href="#capability" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">See what each person can do</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
