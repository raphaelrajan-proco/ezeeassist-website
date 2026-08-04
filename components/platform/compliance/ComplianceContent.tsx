"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG, SCRIM } from "@/lib/data/hero-backgrounds";
import {
  ACCENT_TINT, Band, CARD, EASE, Eyebrow, JAKARTA, MONO, Meta, Reveal, SectionHead,
} from "@/components/platform/shared";
import NetworkState from "./NetworkState";
import ContinuityTimeline from "./ContinuityTimeline";
import ChaseLadder from "./ChaseLadder";

/**
 * /platform/compliance
 *
 * **Compliance is a crowded claim.** Every franchisor already owns an audit
 * app or a compliance module, so this page cannot win on "we check
 * compliance". It wins on two things and every section serves one:
 *
 *   1. Compliance is a **state**, not a snapshot. An audit tells you what
 *      was true that day; between audits nobody knows. (§1, §4, §6)
 *   2. **The chase, not the check.** Every tool checks. Almost none chase,
 *      and the chase is what consumes a coach's week. (§2, §5)
 *
 * **Vocabulary discipline.** Present-tense and state-based: open, current,
 * at risk, not current, holding, closes, state. Audit language is
 * retrospective and pass/fail, so "passed", "failed", "audit score" and
 * "compliance rate" never appear as the page's own framing. The word
 * "audit" appears only where a customer's existing process is being
 * described, and in §6 where an auditor reads exported evidence.
 *
 * **Never claims to replace an existing compliance module.** It reads from
 * it, the same no-replacement position as every other page here.
 *
 * Band sequence, part of the spec: dark, light, light, light, dark, light,
 * light, light, light, dark. Light sections alternate `ed-bg`/`ed-bg-alt`,
 * and no two adjacent share a device: two panels, a category grid, a
 * comparison timeline, an escalation ladder, an evidence artifact, a
 * two-column comparison.
 *
 * §3's cells are hairline-topped rather than carded on purpose. Cards
 * already carry §7, §8 and §9, and DESIGN.md §1.4 caps a form at two
 * appearances per page.
 *
 * Deviations from the brief:
 *
 * - The hero is the **photographic** treatment on `HERO_BG.haze2`, not the
 *   flat gradient the brief describes. Requested directly.
 * - The brief says the nav points Compliance at `/#capabilities`. There was
 *   no Compliance nav item at all, so it was **added** rather than
 *   repointed, and the ComingSoon stub this page replaces was deliberately
 *   never in the nav.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const WARN = "#B45309";

const HERO = HERO_BG.haze2;

/* ── §2 ───────────────────────────────────────────────────── */
const BLIND: string[] = [
  "a certification lapsed at #263",
  "two locations missed a training deadline",
  "one insurance policy expired and renewed late",
];

const WEEK: { day: string; task: string; repeat?: boolean }[] = [
  { day: "Mon", task: "Emailed 7 locations about outstanding P&L" },
  { day: "Tue", task: "Called 3 that hadn't replied" },
  { day: "Wed", task: "Chased insurance certificates from 4" },
  { day: "Thu", task: "Followed up on training completions" },
  { day: "Fri", task: "Started again with the ones from Monday", repeat: true },
];

/* ── §3 ─────────────────────────────────────────────────────
   The READ FROM line is the differentiator here: a checklist app makes
   someone confirm what the LMS already knows. Do not drop it for visual
   tidiness. */
const SCOPE: { name: string; examples: string; readFrom: string }[] = [
  { name: "Licensing and insurance", examples: "Business licence, liability cover, bonding, vehicle insurance",        readFrom: "Document store, expiry dates" },
  { name: "Certification",           examples: "Staff credentials, practitioner licences, food safety, background checks", readFrom: "LMS, HR, certification bodies" },
  { name: "Training",                examples: "Required modules, refreshers, new-hire completion",                    readFrom: "LMS" },
  { name: "Documentation",           examples: "P&L submission, audit packs, incident reports, signed acknowledgements", readFrom: "Accounting, document store" },
  { name: "Operational standards",   examples: "Opening and closing procedures, cleanliness, presentation, photo evidence", readFrom: "Direct capture" },
  { name: "Brand standards",         examples: "Signage, uniform, menu, pricing, local marketing",                     readFrom: "Direct capture, marketing systems" },
  { name: "Regulatory",              examples: "Ratios, inspections, jurisdiction-specific requirements",              readFrom: "Varies by industry" },
];

/* ── §6 ─────────────────────────────────────────────────────
   The CHAIN row stays: it shows the trail includes the chase itself,
   which is what a franchisor needs if they have to demonstrate they
   enforced a standard. The EXPIRES row's second clause connects back to
   §4's continuity argument. */
const EVIDENCE: { label: string; value: string }[] = [
  { label: "Document",  value: "cert-liability-2026.pdf" },
  { label: "Submitted", value: "Mar 14, 2:41pm · Maria S., owner" },
  { label: "Verified",  value: "Policy number, coverage amount, and expiry read and matched against your requirement" },
  { label: "Expires",   value: "Mar 14, 2027 · next check scheduled Feb 12" },
  { label: "Chain",     value: "4 reminders, 1 escalation, 24 days to close" },
];

const EVIDENCE_POINTS: { title: string; body: string }[] = [
  { title: "Timestamped and attributed", body: "Who submitted it, when, and from where" },
  { title: "Verified, not just received", body: "The document is read and matched against the requirement, not filed unopened" },
  { title: "Exportable", body: "The whole network's evidence, in a pack an auditor or franchisor counsel can use" },
];

/* ── §7 ─────────────────────────────────────────────────────
   Two columns and one line. Control Center carries governance depth; do
   not grow this into a permissions matrix. */
const ALONE = [
  "Checking every location against every standard",
  "Notifying an owner and opening a task",
  "Reminding on the schedule you set",
  "Collecting and verifying evidence",
  "Updating the network state",
];
const REACHES = [
  "Anything still open past your escalation threshold",
  "Anything that fails verification",
  "Anything a location disputes",
  "Anything you decide belongs on this side of the line",
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Workflows",      title: "Compliance is the flagship play. Here's the engine.",        href: "/platform/workflows" },
  { eyebrow: "Reporting",      title: "When you want to ask about compliance rather than be told",  href: "/platform/reporting" },
  { eyebrow: "Control Center", title: "How thresholds and escalation are set",                      href: "/platform/control-center" },
];

export default function ComplianceContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${SCRIM.heroSubPage})` }} />
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
              Compliance
            </p>
            <h1
              className="mt-5 max-w-[880px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF",
                fontFamily: JAKARTA,
                fontWeight: 700,
                /* Ceiling derived at 1440: the longer clause, "Know where
                   every location stands.", measures ~600px at 40px inside
                   the 880px cap. Break is lg-only; below that it wraps. */
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              Know where every location stands.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                Without anyone having to ask.
              </span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              Certifications, insurance, training, audits, documentation, checked continuously
              against your standard, chased until they close, and evidenced without a single
              follow-up email.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#the-chase" className="ed-btn ed-btn-secondary-dark inline-flex">
                See what the chase looks like
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-12"
          >
            <NetworkState />
          </motion.div>
        </div>
      </section>

      {/* ── 2. The gap ────────────────────────────────────
          The only section that discusses current cost. Nothing later
          restates the pain. */}
      <Band>
        <SectionHead
          eyebrow="The gap"
          title="You find out late. And someone spends their week asking."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal>
            <div className="flex h-full flex-col overflow-hidden" style={CARD}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
                <Meta>The blind window</Meta>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex gap-8">
                  {[["Last audit", "Q1"], ["Next audit", "Q3"]].map(([k, v]) => (
                    <div key={k}>
                      <Meta>{k}</Meta>
                      <p className="ed-fg mt-1.5" style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700 }}>{v}</p>
                    </div>
                  ))}
                </div>
                <p className="ed-fg-muted mt-6 text-[14px] leading-relaxed">Between them, five months in which:</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {BLIND.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full" style={{ backgroundColor: "var(--ed-fg-muted)" }} />
                      <span className="ed-fg text-[14px] leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                {/* The line that lands. Weight as well as colour, so it
                    still reads as the conclusion in greyscale. */}
                <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: WARN, fontWeight: 600 }}>
                  nobody knew about any of it
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden" style={CARD}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
                <Meta>One person&rsquo;s week</Meta>
              </div>
              <div className="px-5 py-2 md:px-6">
                {WEEK.map((w, i) => (
                  <div
                    key={w.day}
                    className="flex items-baseline gap-4 py-3.5"
                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
                  >
                    <span
                      className="flex-none"
                      style={{
                        fontFamily: MONO, fontSize: 11.5, width: 34,
                        fontWeight: w.repeat ? 700 : 500,
                        color: w.repeat ? WARN : "var(--ed-fg-muted)",
                      }}
                    >
                      {w.day}
                    </span>
                    <span
                      className="min-w-0 flex-1 text-[14px] leading-snug"
                      style={w.repeat ? { color: WARN, fontWeight: 600 } : { color: "var(--ed-fg)" }}
                    >
                      {w.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-9 max-w-[720px]">
            <p
              className="ed-fg tracking-[-0.02em]"
              style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
            >
              An audit tells you what was true on the day of the audit. The rest of the year,
              you&rsquo;re guessing.
            </p>
            <p className="ed-fg-muted mt-3 text-base leading-relaxed">
              Meanwhile someone on your team is a full-time reminder service.
            </p>
          </div>
        </Reveal>
      </Band>

      {/* ── 3. Scope ──────────────────────────────────────
          Hairline-topped cells rather than cards: cards already carry §7,
          §8 and §9, and a fourth grid of them would read as a template. */}
      <Band alt>
        <SectionHead
          eyebrow="Scope"
          title="Everything with a deadline, a certificate, or a standard behind it."
          sub="Read from the systems that already hold it. Nobody re-enters anything."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {SCOPE.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div style={{ borderTop: "1px solid var(--ed-border)", paddingTop: 15 }}>
                <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {c.name}
                </p>
                <p className="ed-fg-muted mt-2 text-[14px] leading-relaxed">{c.examples}</p>
                <p className="mt-3">
                  <Meta>Read from · {c.readFrom}</Meta>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="ed-fg-muted mt-10 max-w-[680px] text-base leading-relaxed">
            If a system already knows it, the check reads it. If nobody&rsquo;s system knows it,
            the check asks for it.{" "}
            <Link href="/platform/integrations" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              What connects
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 4. Continuity ─────────────────────────────────
          No chase mechanics here. That is §5, and an escalation example in
          this section collapses the distinction. */}
      <Band>
        <SectionHead
          eyebrow="Continuity"
          title="An audit is a snapshot. Compliance is a state."
          sub="Checking on a schedule tells you what was true on the schedule."
        />

        <Reveal>
          <div className="mt-10 max-w-[820px]">
            <ContinuityTimeline />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p
            className="ed-fg mt-10 max-w-[720px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            The question stops being &ldquo;did we pass.&rdquo; It becomes &ldquo;what&rsquo;s open
            right now.&rdquo;
          </p>
        </Reveal>
      </Band>

      {/* ── 5. The chase ──────────────────────────────────
          The section the page rests on. Deeper than the hero so it reads as
          its own moment. */}
      <section
        id="the-chase"
        className="w-full scroll-mt-24"
        style={{ background: "linear-gradient(180deg, #0D2836 0%, #091C26 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
            >
              The chase
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty",
              }}
            >
              Every compliance tool checks.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                Almost none chase.
              </span>
            </h2>
            <p className="mt-5 max-w-[620px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Finding the gap was never the hard part. Closing it is.
            </p>
          </Reveal>

          <div className="mt-12 max-w-[900px]">
            <ChaseLadder />
          </div>

          <Reveal delay={0.14}>
            <div className="mt-10 max-w-[820px]">
              <p className="text-[17px] leading-relaxed" style={{ color: ON_DARK_DIM }}>
                Twenty-four days. Four escalations.
              </p>
              {/* The payoff, and the heaviest thing in the section. */}
              <p
                className="mt-4 tracking-[-0.02em]"
                style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: 24, lineHeight: 1.3 }}
              >
                Nobody on your team sent a single message.
              </p>

              <div className="mt-8 pt-7" style={{ borderTop: `1px solid ${ON_DARK_RULE}` }}>
                {/* The growth line appears once and is not elaborated. */}
                <p className="text-[15px] leading-relaxed" style={{ color: ON_DARK_DIM }}>
                  Every hour a coach spends chasing a document is an hour not spent on the
                  location&rsquo;s numbers.
                </p>
                {/* One line out. This page does not explain how plays work. */}
                <Link
                  href="/platform/workflows"
                  className="mt-5 inline-block text-sm"
                  style={{ color: ON_DARK_ACCENT, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}
                >
                  Compliance is the flagship play
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Evidence ───────────────────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="Evidence"
          title="Not a checkbox. The document, the photo, and who submitted it."
        />

        <Reveal>
          <div className="mt-10 max-w-[820px] overflow-hidden" style={CARD}>
            <div
              className="flex flex-wrap items-baseline gap-x-2 px-5 py-3.5 md:px-6"
              style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}
            >
              <Meta>Store #263 · General liability ·</Meta>
              {/* Success tint, with weight behind it so the state is not
                  carried by colour alone. */}
              <span
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: "#146C43" }}
              >
                Verified
              </span>
            </div>
            <div className="px-5 py-1 md:px-6">
              {EVIDENCE.map((r, i) => (
                <div
                  key={r.label}
                  className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-5"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
                >
                  <span className="flex-none sm:w-[110px]">
                    <Meta>{r.label}</Meta>
                  </span>
                  <span className="ed-fg min-w-0 flex-1 text-[14px] leading-relaxed">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
          {EVIDENCE_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                {p.title}
              </p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <p
            className="ed-fg mt-10 max-w-[680px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            When someone asks for proof, you&rsquo;re not asking your locations for it.
          </p>
        </Reveal>
      </Band>

      {/* ── 7. The line ───────────────────────────────────
          Two columns and one line. Not a permissions matrix. */}
      <Band alt>
        <SectionHead eyebrow="The line" title="You decide what escalates, and when." />

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
            <div className="flex h-full flex-col p-6 md:p-7" style={{ ...CARD, borderLeft: "3px solid #0077A8", backgroundColor: ACCENT_TINT }}>
              <Meta color="var(--ed-accent-text)">Reaches a person</Meta>
              <ul className="mt-5 flex flex-col gap-3.5">
                {REACHES.map((x, i) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full" style={{ backgroundColor: "var(--ed-accent-text)" }} />
                    {/* The last row is the point, so it carries weight as
                        well as position. */}
                    <span className="ed-fg text-[14.5px] leading-relaxed" style={i === REACHES.length - 1 ? { fontWeight: 600 } : undefined}>
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
            The last row is the point. The thresholds are yours.{" "}
            <Link href="/platform/control-center" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              How they&rsquo;re set
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 8. Proof ──────────────────────────────────────
          Time-to-close or completion rate is the right shape here: it
          proves the chase, not the check. Not a deflection metric. */}
      <Band>
        <SectionHead title="What changed when the chasing stopped." />

        <Reveal>
          <div className="mt-9 max-w-[820px] p-6 md:p-8" style={CARD}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              {/* Deliberately not <Meta>: it force-uppercases, and the
                  placeholder rule says render the token exactly as written. */}
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
                {"{{TBD:compliance-proof-brand}}"}
              </span>
              <span
                style={{
                  fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1,
                  letterSpacing: "-0.03em", color: "var(--ed-accent-text)",
                }}
              >
                {"{{TBD:compliance-proof-metric}}"}
              </span>
            </div>
            <blockquote className="ed-fg mt-6 text-[15px] md:text-base leading-relaxed" style={{ fontFamily: JAKARTA, fontWeight: 500 }}>
              &ldquo;{"{{TBD:compliance-proof-quote}}"}&rdquo;
            </blockquote>
            <p className="ed-fg-muted mt-5 text-sm">{"{{TBD:compliance-proof-attribution}}"}</p>
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

      {/* ── 10. CTA ───────────────────────────────────────── */}
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
            style={{
              color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
              fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "820px",
            }}
          >
            Tell us what your team chases every month.
          </h2>
          <p className="mt-5 max-w-[620px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll show you the same chase, running without them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <a href="#the-chase" className="ed-btn ed-btn-secondary-dark inline-flex">
              See what the chase looks like
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
