"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import {
  ACCENT_TINT, Band, CARD, EASE, Eyebrow, JAKARTA, MONO, Meta, Reveal, SectionHead,
} from "@/components/platform/shared";
import PlayFanOut from "./PlayFanOut";
import ContextRows from "./ContextRows";

/**
 * /platform/workflows
 *
 * **Vocabulary.** The route and the nav item stay "Workflows" because that
 * is what a franchisor searches for. The page's own word is "play". One
 * line after the hero does the handoff — "Most tools call these workflows.
 * A coach calls them plays" — and after it the body copy says play
 * consistently. Do not alternate, do not write "workflow (play)". The only
 * other places the word workflow appears are the metadata and the nav.
 *
 * **What the page has to prove: a play is not a broadcast.** The same play
 * reaches forty locations and behaves differently at each, because it reads
 * each location's numbers before acting. §5 is where that is proven and it
 * gets the strongest treatment on the page.
 *
 * Band sequence, part of the spec: dark, light, light, light, dark, light,
 * light, light, light, dark. The light sections alternate `ed-bg` and
 * `ed-bg-alt` so neighbours still separate (DESIGN.md §4.1), and no two
 * adjacent sections share a device: prose, then a split, then a grid, then
 * divergence rows, then a two-column comparison, then a timeline.
 *
 * **No builder UI anywhere**, including as decoration. No canvas, no node
 * graph, no if-then blocks, no drag handles. §3's right panel is a summary
 * of what the system understood, not an editor: no fields, no toggles, no
 * edit affordances.
 *
 * Deviations from the brief:
 *
 * - The hero is the **photographic** treatment, not the
 *   flat gradient the brief describes. Requested directly.
 * - The nav's Always On group is left as **Workflows alone**. The brief
 *   allows adding Compliance "if it exists"; it does not, and the stub
 *   created here for §9's card is a ComingSoon page. Putting a stub in the
 *   nav is the thing the Automations entry was already doing wrong.
 *
 * This page's route was unreachable until this shipped: `next.config.ts`
 * 308'd `/platform/workflows` to `/solution/agents`. That redirect is gone
 * and `/platform/automations` now redirects here instead.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

/* Assignment and the revert switch live in lib/data/platform-heroes.ts. */
const HERO = platformHero("workflows");

/* ── §3 ─────────────────────────────────────────────────────
   What the system understood, not an editor. The AUTHOR row stays: a play
   having a named author is what makes a coach willing to write a second. */
const SUMMARY: { label: string; value: string }[] = [
  { label: "Trigger",  value: "Bookings for next week below 70%" },
  { label: "Reads",    value: "Scheduling · active campaigns · lapsed client list" },
  { label: "Drafts",   value: "Reactivation offer, brand template" },
  { label: "Approval", value: "Owner, before send" },
  { label: "Notifies", value: "Territory coach on send" },
  { label: "Scope",    value: "All locations · adjustable per region" },
  { label: "Author",   value: "Dana R., field coach" },
];

/* ── §4 ─────────────────────────────────────────────────────
   Schedule is listed first and the closing line demotes it: every tool a
   franchisor has already evaluated is schedule-based, so leading with it
   and then dismissing it is the positioning move. Drift carries the accent
   because it is the differentiated one — a threshold needs someone to know
   what to watch, drift does not. No per-location examples here; that is §5
   and putting it here collapses the section the page rests on. */
const TRIGGERS: { name: string; when: string; example: string; accent?: boolean }[] = [
  { name: "Schedule",         when: "A fixed clock you set",                    example: "Nightly compliance sweep across every location, 2am" },
  { name: "Threshold",        when: "A number crosses a line",                  example: "Bookings for next week fall below 70%" },
  { name: "Date approaching", when: "Something expires or comes due",           example: "Insurance lapses in 14 days" },
  { name: "Event",            when: "Something happens in a connected system",  example: "A new hire is added to the schedule" },
  { name: "Inbound",          when: "Someone asks or submits something",        example: "An owner requests an out-of-policy refund" },
  { name: "Drift",            when: "A number moves quietly over time",         example: "Rebook rate declines three weeks running", accent: true },
];

/* ── §6 ─────────────────────────────────────────────────────
   Two columns and one line. The last row on the right is the point, and
   this must not grow into a permissions matrix: Control Center carries
   governance depth, this page is about capability. */
const ALONE = [
  "Checks, sweeps, and evidence collection",
  "Assembling a brief or a report",
  "Opening a task or a ticket",
  "Nudging an internal deadline",
  "Surfacing what a location should look at",
];
const WAITS = [
  "Anything reaching a customer",
  "Anything reaching a channel or a public page",
  "Anything touching money, pricing, or the books",
  "Anything a location hasn't seen yet",
  "Anything you decide belongs on this side of the line",
];

/* ── §7 ─────────────────────────────────────────────────────
   Counts are illustrative and labelled as such: they are a shape of
   accumulation, not a customer's number. */
const LIBRARY: { period: string; count: string; body: string }[] = [
  { period: "Month 1",  count: "4",   body: "HQ publishes the first four" },
  { period: "Month 3",  count: "19",  body: "Coaches add territory-specific ones" },
  { period: "Month 6",  count: "47",  body: "Owners submit their own; HQ publishes the best" },
  { period: "Month 12", count: "90+", body: "Most of the recurring work in the network runs without anyone starting it" },
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Compliance",     title: "The flagship play, with evidence and escalation built in", href: "/platform/compliance" },
  { eyebrow: "Apps",           title: "When the play needs a tool your locations open",           href: "/platform/apps" },
  { eyebrow: "Control Center", title: "How the human line is set",                                href: "/platform/control-center" },
];

export default function WorkflowsContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimRgba})` }} />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(58% 52% at 82% 12%, rgba(159,224,248,0.16) 0%, rgba(159,224,248,0) 70%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
            >
              Coaching orchestration
            </p>
            <h1
              className="mt-5 max-w-[900px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF",
                fontFamily: JAKARTA,
                fontWeight: 700,
                /* Ceiling derived at 1440: the second clause is the long
                   one at ~740px and sits inside the 900px cap. The break is
                   lg-only; below that both clauses wrap. */
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              Coach it once.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                It runs at every location, in that location&rsquo;s context.
              </span>
            </h1>
            <p className="mt-6 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              A coach describes what they&rsquo;d do, the check, the threshold, the next action. It
              runs wherever it applies, reading each location&rsquo;s own numbers before it acts.
              Not a broadcast. Not a reminder.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#in-context" className="ed-btn ed-btn-secondary-dark inline-flex">
                See it run at four locations
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-12"
          >
            <PlayFanOut />
          </motion.div>

          {/* The reframe. Everything after this line says "play". */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="mt-8 max-w-[620px] text-[15px] leading-relaxed"
            style={{ color: ON_IMAGE }}
          >
            Most tools call these workflows. A coach calls them plays, and that difference is
            the point.
          </motion.p>
        </div>
      </section>

      {/* ── 2. The ceiling ────────────────────────────────
          Three paragraphs and a statement, no cards. The homepage argues
          this at length; here it is assumed and the consequence stated. */}
      <Band>
        <SectionHead
          eyebrow="Why encode it"
          title="A coach's judgment has always died at the edge of their territory."
        />

        <Reveal>
          <div className="mt-9 max-w-[640px] flex flex-col gap-5">
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              One coach carries twenty to forty locations. That number hasn&rsquo;t moved in forty
              years.
            </p>
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              Everything they&rsquo;ve learned about which three things to fix first, when a number
              is noise, and what actually moves a struggling operator reaches those locations and
              stops.
            </p>
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              Franchising has tried to fix this with best-practice decks, annual conferences, and
              monthly coach calls. None of it executes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="ed-fg mt-9 max-w-[720px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 22, lineHeight: 1.35 }}
          >
            A play is the first thing that carries a coach&rsquo;s judgment somewhere the coach
            isn&rsquo;t.
          </p>
        </Reveal>
      </Band>

      {/* ── 3. Authoring ──────────────────────────────────
          Two panels: what was typed, and what the system understood. The
          right panel is a summary, not an editor. */}
      <Band alt>
        <SectionHead
          eyebrow="Authoring"
          title="Described in a sentence. Not built in a canvas."
          sub="A coach who has never configured anything can write one in a couple of minutes."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal>
            <div className="flex h-full flex-col p-5 md:p-6" style={CARD}>
              <Meta>What the coach typed</Meta>
              <p
                className="ed-fg mt-4"
                style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.7 }}
              >
                &ldquo;When next week drops below 70% booked, check what campaigns are running and
                pull the lapsed client list. Draft the reactivation offer, hold it for the owner to
                approve, and tell me it went out.&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden" style={CARD}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
                <Meta>Soft week recovery</Meta>
              </div>
              <div className="px-5 py-1 md:px-6">
                {SUMMARY.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4"
                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
                  >
                    <span className="flex-none sm:w-[84px]">
                      <Meta>{s.label}</Meta>
                    </span>
                    <span className="ed-fg min-w-0 flex-1 text-[14px] leading-snug">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="ed-fg-muted mt-9 max-w-[640px] text-base leading-relaxed">
            No canvas, no nodes, no if-then blocks. The coach described what they&rsquo;d do, and
            that&rsquo;s what runs.
          </p>
        </Reveal>
      </Band>

      {/* ── 4. Triggers ───────────────────────────────────
          Replaces the retired Automations page. */}
      <Band>
        <SectionHead
          eyebrow="Triggers"
          title="Some plays run on a clock. Most wait for something to happen."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRIGGERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div
                className="flex h-full flex-col p-5 md:p-6"
                style={
                  t.accent
                    ? { ...CARD, borderLeft: "3px solid #0077A8", backgroundColor: ACCENT_TINT }
                    : CARD
                }
              >
                <p className="ed-fg text-[17px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.25 }}>
                  {t.name}
                </p>
                <p className="ed-fg-muted mt-2 text-[14px] leading-relaxed">{t.when}</p>
                <p className="ed-fg-muted mt-4 flex-1 text-[12.5px] leading-relaxed" style={{ opacity: 0.85 }}>
                  {t.example}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <p
            className="ed-fg mt-9 max-w-[680px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            The clock is the least interesting one. Most of what matters doesn&rsquo;t happen on a
            schedule.
          </p>
        </Reveal>
      </Band>

      {/* ── 5. In context ─────────────────────────────────
          The section the page rests on. Deeper than the hero so it reads as
          its own moment. */}
      <section
        id="in-context"
        className="w-full scroll-mt-24"
        style={{ background: "linear-gradient(180deg, #0D2836 0%, #091C26 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
            >
              In context
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty",
              }}
            >
              One play. Four locations.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                Four different outcomes.
              </span>
            </h2>
            <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              It reads each location&rsquo;s numbers, timing, and history before it does anything.
              Which is why none of them get the same thing.
            </p>
          </Reveal>

          <div className="mt-12 max-w-[900px]">
            <ContextRows />
          </div>

          <Reveal delay={0.14}>
            <div className="mt-10 max-w-[760px] pt-8" style={{ borderTop: `1px solid ${ON_DARK_RULE}` }}>
              <p className="text-[17px] leading-relaxed" style={{ color: ON_DARK_DIM }}>
                Four locations. One play. None of them treated the same.
              </p>
              <p
                className="mt-4 tracking-[-0.02em]"
                style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 600, fontSize: 22, lineHeight: 1.35 }}
              >
                It ran at 210 more before anyone was awake.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. The human line ─────────────────────────────
          Two columns and one line. Not a permissions matrix: Control Center
          carries governance depth, this page is about capability. */}
      <Band>
        <SectionHead eyebrow="The human line" title="You decide what runs alone." />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <Reveal>
            <div className="flex h-full flex-col p-6 md:p-7" style={CARD}>
              <Meta>Runs on its own</Meta>
              <ul className="mt-5 flex flex-col gap-3.5">
                {ALONE.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full" style={{ backgroundColor: "var(--ed-fg-muted)" }} />
                    <span className="ed-fg text-[14.5px] leading-relaxed">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="flex h-full flex-col p-6 md:p-7"
              style={{ ...CARD, borderLeft: "3px solid #0077A8", backgroundColor: ACCENT_TINT }}
            >
              <Meta color="var(--ed-accent-text)">Waits for a person</Meta>
              <ul className="mt-5 flex flex-col gap-3.5">
                {WAITS.map((x, i) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full" style={{ backgroundColor: "var(--ed-accent-text)" }} />
                    {/* The last row is the point, so it carries weight as
                        well as position. */}
                    <span
                      className="ed-fg text-[14.5px] leading-relaxed"
                      style={i === WAITS.length - 1 ? { fontWeight: 600 } : undefined}
                    >
                      {x}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="ed-fg-muted mt-9 max-w-[620px] text-base leading-relaxed">
            The last row is the point. The line is yours to move.{" "}
            <Link href="/platform/control-center" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              How it&rsquo;s set
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 7. The library ────────────────────────────────
          An accumulation timeline, no cards. The counts are a shape, not a
          customer's number, and are labelled illustrative. */}
      <Band alt>
        <SectionHead
          eyebrow="Over time"
          title="Every play someone writes is one nobody has to think about again."
        />

        <div className="mt-10 max-w-[760px]">
          {LIBRARY.map((l, i) => (
            <Reveal key={l.period} delay={i * 0.08}>
              <div
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
              >
                <span className="flex-none sm:w-[92px]">
                  <Meta>{l.period}</Meta>
                </span>
                <span
                  className="flex-none sm:w-[92px]"
                  style={{
                    fontFamily: JAKARTA, fontWeight: 700, fontSize: 22, lineHeight: 1.1,
                    letterSpacing: "-0.02em", color: "var(--ed-accent-text)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {l.count} plays
                </span>
                <span className="ed-fg min-w-0 flex-1 text-[14.5px] leading-relaxed">{l.body}</span>
              </div>
            </Reveal>
          ))}
          <p className="ed-fg-muted mt-4 text-[12px]">Counts are illustrative.</p>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-9 max-w-[640px] flex flex-col gap-2">
            <p className="ed-fg-muted text-[15px] leading-relaxed">A play written for one problem keeps solving it.</p>
            <p className="ed-fg-muted text-[15px] leading-relaxed">A play that works in one territory gets published to the rest.</p>
            <p className="ed-fg-muted text-[15px] leading-relaxed">Nothing you encode has to be encoded twice.</p>
          </div>
          <p
            className="ed-fg mt-7 max-w-[720px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            Your library is the difference between a coaching team that repeats itself and one
            that compounds.
          </p>
          <Link href="/platform/apps" className="ed-link mt-5 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            A play and an app are both things a network authors
          </Link>
        </Reveal>
      </Band>

      {/* ── 8. Proof ──────────────────────────────────────
          This page needs an outcome, not an efficiency stat: a play count
          proves activity, a play count plus what changed proves the growth
          claim. Do not substitute a deflection metric. */}
      <Band>
        <SectionHead title="What a play did that a person couldn't have." />

        <Reveal>
          <div className="mt-9 max-w-[820px] p-6 md:p-8" style={CARD}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              {/* Deliberately not <Meta>: it force-uppercases, and the
                  placeholder rule says render the token exactly as written. */}
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
                {"{{TBD:workflows-proof-brand}}"}
              </span>
              <span
                style={{
                  fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1,
                  letterSpacing: "-0.03em", color: "var(--ed-accent-text)",
                }}
              >
                {"{{TBD:workflows-proof-metric}}"}
              </span>
            </div>
            <blockquote className="ed-fg mt-6 text-[15px] md:text-base leading-relaxed" style={{ fontFamily: JAKARTA, fontWeight: 500 }}>
              &ldquo;{"{{TBD:workflows-proof-quote}}"}&rdquo;
            </blockquote>
            <p className="ed-fg-muted mt-5 text-sm">{"{{TBD:workflows-proof-attribution}}"}</p>
          </div>
        </Reveal>
      </Band>

      {/* ── 9. Related ────────────────────────────────────── */}
      <Band alt>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.08}>
              <Link
                href={r.href}
                className="group flex h-full flex-col justify-between gap-8 p-6 transition-transform hover:-translate-y-0.5"
                style={CARD}
              >
                <div>
                  <Eyebrow accent>{r.eyebrow}</Eyebrow>
                  <p className="ed-fg mt-3 text-[17px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 500, lineHeight: 1.3 }}>
                    {r.title}
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--ed-accent-text)" }}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 10. CTA ───────────────────────────────────────
          TODO: the subline promises a live build during a sales call, and
          a run against four of the prospect's own locations. Flagged for
          the team to confirm both are deliverable; if not, it needs a
          softer replacement before launch. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.closingRgba})` }} />
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
            style={{
              color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
              fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "860px",
            }}
          >
            Tell us what your best coach does that nobody else does.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll write it as a play on the call and show you what it would have done at four
            of your locations this week.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <a href="#in-context" className="ed-btn ed-btn-secondary-dark inline-flex">
              See it run at four locations
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
