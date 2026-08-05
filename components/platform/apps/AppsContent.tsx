"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import {
  Band, CARD, EASE, Eyebrow, JAKARTA, MONO, Meta, Reveal, SectionHead,
} from "@/components/platform/shared";
import DescribePanel from "./DescribePanel";
import AuthorshipLoop from "./AuthorshipLoop";

/**
 * /platform/apps
 *
 * **This page is capability, not governance.** An earlier draft of the
 * brief led with permissions tables and a wall of "no app can", which read
 * as a page apologising for itself. Governance is stated exactly twice, one
 * line each: step 4 of §3, and the 13px line beneath that timeline. There
 * is deliberately no permissions section, no can/can't table, no
 * publishing-rights matrix and no guardrails band. The Control Center page
 * carries that load. **If this page looks like it is missing a governance
 * section, that is the design.**
 *
 * Band sequence, which the brief calls part of the spec: dark, light,
 * light, light, light, dark, light, light, dark. The four light sections in
 * the middle alternate `ed-bg` and `ed-bg-alt` so neighbours still separate
 * (DESIGN.md §4.1), and no two adjacent sections share a layout device:
 * request log, then a timeline, then a gallery grid, then three bare facts.
 *
 * **No builder UI anywhere**, including as decoration. No nodes, no canvas,
 * no drag handles. A sentence typed in plain language is the whole claim;
 * a reader who infers an interface to learn has read the opposite.
 *
 * Deviations from the brief:
 *
 * - The hero is the **photographic** treatment, not the
 *   flat gradient the brief describes. Requested directly.
 * - The brief's nav/footer/tile item 3 says to "update the homepage tile's
 *   link". That tile is a `<button role="tab">` with no link at all, so
 *   there was nothing to repoint; a link was added beneath the rail on that
 *   tab instead. See the comment in Capabilities.tsx.
 *
 * The closing-audit sentence in §1, the twenty minutes in §3 and Store #214
 * in §6 are one story, and the same one the homepage's on-demand section
 * already tells at 3:45pm. That continuity is deliberate. Do not renumber
 * the store or reword the ask in one place only.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

/* Assignment and the revert switch live in lib/data/platform-heroes.ts. */
const HERO = platformHero("apps");

/* ── §2 ─────────────────────────────────────────────────────
   The dates are the artifact. A request from March 2023 still marked Open
   is the entire point, so do not convert these to relative labels and do
   not drop the years. */
const BACKLOG: { date: string; item: string }[] = [
  { date: "Mar 2023", item: "Closing checklist with photo verification" },
  { date: "Jun 2023", item: "P&L digest managers can actually read" },
  { date: "Sep 2023", item: "Winter prep checklist, scheduled" },
  { date: "Nov 2023", item: "Quote sanity-check against brand pricing" },
  { date: "Feb 2024", item: "New-hire first-week tracker" },
  { date: "Aug 2024", item: "Weekly numbers card for the morning huddle" },
];

/* ── §3 ─────────────────────────────────────────────────────
   Keep the timestamps irregular. 3:45 → 3:47 → 3:52 → 3:58 → 4:05 reads as
   a real twenty minutes; even five-minute intervals read as a diagram.
   Step 4 is the governance argument stated as a non-event. Do not expand
   it, do not link it, do not give it a tooltip. */
const STEPS: { time: string; label: string; body: string }[] = [
  { time: "3:45pm", label: "Described", body: "Your ops lead types what the network needs, in plain language" },
  { time: "3:47pm", label: "Generated", body: "A working tool, not a mockup. Stations, photo capture, scoring, routing." },
  { time: "3:52pm", label: "Adjusted",  body: "“Add the back of house”, changed by asking, not by editing" },
  { time: "3:58pm", label: "Scoped",    body: "Already inside the rules you set. Nothing to configure." },
  { time: "4:05pm", label: "Live",      body: "Running at every location you chose" },
];

/* ── §4 ─────────────────────────────────────────────────────
   The varied scopes are deliberate: network-wide, regional, territory. Do
   not normalise them. A set that all read "All locations" would argue
   these are features rather than things a particular brand needed. */
const GALLERY: { name: string; line: string; scope: string }[] = [
  { name: "Daily closing audit",     line: "Photo checklist per station, auto-scored, failures routed to the coach", scope: "214 locations" },
  { name: "New-hire first week",     line: "Day-by-day sequence, tracked, escalates if it stalls",                   scope: "All locations" },
  { name: "Quote sanity-check",      line: "Flags a quote outside brand pricing before it goes out",                 scope: "68 locations" },
  { name: "P&L digest for managers", line: "Monthly numbers in plain language, emailed to store managers",           scope: "140 locations" },
  { name: "Winter prep checklist",   line: "Site-by-site steps, scheduled every October",                            scope: "Northern region" },
  { name: "Morning huddle card",     line: "Yesterday's numbers and today's bookings, one screen",                   scope: "West territory" },
];

/* ── §5 ───────────────────────────────────────────────────── */
const SURFACES: { label: string; line: string }[] = [
  { label: "On a phone",                 line: "In the browser or the app your locations already use" },
  { label: "In the channels they work in", line: "A link in Teams, Slack, or SMS opens it directly" },
  { label: "On a schedule",              line: "If it should arrive rather than be opened" },
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Workflows",      title: "When it should run on its own", href: "/platform/workflows" },
  { eyebrow: "Integrations",   title: "What an app can read from",     href: "/platform/integrations" },
  { eyebrow: "Control Center", title: "The rules every app inherits",  href: "/platform/control-center" },
];

export default function AppsContent() {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
            >
              Apps
            </p>
            <h1
              className="mt-5 max-w-[860px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF",
                fontFamily: JAKARTA,
                fontWeight: 700,
                /* Ceiling derived at 1440: the longer clause, "Describe the
                   tool your network needs.", measures ~620px at 40px inside
                   the 860px cap. The explicit break is lg-only; below that
                   both clauses wrap. */
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              Describe the tool your network needs.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                It&rsquo;s running this afternoon.
              </span>
            </h1>
            <p className="mt-6 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              Not a form builder. Not a request to someone&rsquo;s roadmap. Say what you need in
              plain language and it exists, connected to your systems, on your brand, in your
              locations&rsquo; hands.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#gallery" className="ed-btn ed-btn-secondary-dark inline-flex">
                See what brands ship
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-12"
          >
            <DescribePanel />
          </motion.div>
        </div>
      </section>

      {/* ── 2. The gap ────────────────────────────────────
          A request log, not cards. The section's job is to show a backlog
          that never moves, and six cards would make six wants look like six
          features rather than one queue. */}
      <Band>
        <SectionHead
          eyebrow="The gap"
          title="Every ops team has a list of tools that would help. Most of it never gets built."
        />

        <Reveal>
          <div className="mt-10 max-w-[880px] overflow-hidden" style={CARD}>
            <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <Meta>Ops backlog</Meta>
            </div>
            {BACKLOG.map((r, i) => (
              <div
                key={r.item}
                className="flex items-baseline gap-4 px-5 py-3.5 md:px-6"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
              >
                <span
                  className="ed-fg-muted flex-none"
                  style={{ fontFamily: MONO, fontSize: 11.5, width: 68, fontVariantNumeric: "tabular-nums" }}
                >
                  {r.date}
                </span>
                <span className="ed-fg min-w-0 flex-1 text-[14.5px] leading-snug">{r.item}</span>
                <span
                  className="ed-fg-muted flex-none text-right"
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  Open
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 max-w-[640px]">
            <p className="ed-fg-muted text-[15px] leading-relaxed">
              Too small for the roadmap. Too specific for the vendor. Too far down IT&rsquo;s list to
              reach this year. So it stays on the list, and every location improvises.
            </p>
            <p
              className="ed-fg mt-6 tracking-[-0.02em]"
              style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 22, lineHeight: 1.35 }}
            >
              The tools that would help most are the ones nobody will ever fund.
            </p>
          </div>
        </Reveal>
      </Band>

      {/* ── 3. Making one ─────────────────────────────────
          A timeline. Step 4 is the governance argument stated as a
          non-event, and the small line below is the only other governance
          mention on the page. Neither gets promoted. */}
      <Band alt>
        <SectionHead eyebrow="How one gets made" title="Described at 3:45. Running at 4:05." />

        <div className="mt-10 max-w-[760px]">
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1;
            return (
              <Reveal key={s.time} delay={i * 0.07}>
                <div className="relative flex gap-5 pb-8 last:pb-0">
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[5px] top-3 bottom-0 w-px"
                      style={{ backgroundColor: "var(--ed-rule)" }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative mt-[7px] h-[11px] w-[11px] flex-none rounded-full"
                    style={{
                      backgroundColor: last ? "var(--ed-accent-text)" : "var(--ed-fg-muted)",
                      outline: "3px solid var(--ed-bg-alt)",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className="ed-fg-muted"
                        style={{ fontFamily: MONO, fontSize: 12, fontVariantNumeric: "tabular-nums" }}
                      >
                        {s.time}
                      </span>
                      <Meta color={last ? "var(--ed-accent-text)" : undefined}>{s.label}</Meta>
                    </div>
                    <p className="ed-fg mt-2 text-[15px] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-9 max-w-[640px]">
            <p className="ed-fg text-[17px] leading-relaxed">
              Nobody wrote code. Nobody filed a ticket. Nobody waited for a release.
            </p>
            <p className="ed-fg-muted mt-3 text-[13px] leading-relaxed">
              Every app inherits the permissions, data boundaries, and approval rules already set
              in your{" "}
              <Link href="/platform/control-center" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
                Control Center
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Band>

      {/* ── 4. Breadth ────────────────────────────────────── */}
      <Band id="gallery">
        <SectionHead
          eyebrow="Across a network"
          title="Six things nobody would have put on a roadmap."
          sub="Each one specific to how that brand runs, and none of them worth a development cycle on their own."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.06}>
              <div className="flex h-full flex-col p-5 md:p-6" style={CARD}>
                <p className="ed-fg text-[17px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.25 }}>
                  {g.name}
                </p>
                <p className="ed-fg-muted mt-2.5 flex-1 text-[14px] leading-relaxed">{g.line}</p>
                <div className="mt-5 pt-3.5" style={{ borderTop: "1px solid var(--ed-rule)" }}>
                  <Meta>{g.scope}</Meta>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p
            className="ed-fg mt-9 max-w-[680px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            Six tools. None of them existed a month ago. None of them needed a developer.
          </p>
        </Reveal>
      </Band>

      {/* ── 5. Surface ────────────────────────────────────
          Three bare facts, no cards, and deliberately the lightest section
          on the page: it sits between a six-card grid and the dark loop, and
          its job is to let the eye rest before the differentiator. */}
      <Band alt>
        <SectionHead
          eyebrow="On the floor"
          title="Opened on a phone, between customers."
          sub="No portal, no login your team will forget, no training session."
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
          {SURFACES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                {s.label}
              </p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{s.line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="ed-fg-muted mt-10 max-w-[640px] text-base leading-relaxed">
            The closing audit is used at closing, on the phone in someone&rsquo;s pocket.
            That&rsquo;s the only reason it gets used at all.
          </p>
        </Reveal>
      </Band>

      {/* ── 6. Network authorship ─────────────────────────
          The differentiator. Deeper than the hero so it reads as its own
          moment. No prohibitions here: stage 3 is the entire control story,
          and a permissions list would turn leverage into risk management. */}
      <section className="w-full" style={{ background: "linear-gradient(180deg, #0C2334 0%, #081A26 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
            >
              Network authorship
            </p>
            <h2
              className="mt-4 max-w-[860px] leading-[1.08] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty",
              }}
            >
              Your best operators will start building things.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                You decide which ones everyone gets.
              </span>
            </h2>
            <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              The sharpest operational ideas in a franchise system have never come only from HQ.
              They just had no way to travel.
            </p>
          </Reveal>

          <div className="mt-12">
            <AuthorshipLoop />
          </div>

          <Reveal delay={0.12}>
            {/* Sentence order is fixed: upside first, control second.
                Reversed, the section reads as risk management. */}
            <p
              className="mt-12 max-w-[760px] leading-relaxed"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 600, fontSize: 18, lineHeight: 1.45 }}
            >
              Nothing good stays stuck at one location.{" "}
              <span style={{ color: ON_DARK_ACCENT }}>And nothing publishes without you.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Proof ──────────────────────────────────────
          One card, not a grid. Placeholders render visibly rather than the
          section being omitted. Do not substitute a deflection or support
          metric: those argue for the Answers page. */}
      <Band>
        <SectionHead title="Shipped in a live network." />

        <Reveal>
          <div className="mt-9 max-w-[820px] p-6 md:p-8" style={CARD}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              {/* Deliberately not <Meta>: it force-uppercases, and the
                  placeholder rule says render the token exactly as written. */}
              <span
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}
              >
                {"{{TBD:apps-proof-brand}}"}
              </span>
              <span
                style={{
                  fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1,
                  letterSpacing: "-0.03em", color: "var(--ed-accent-text)",
                }}
              >
                {"{{TBD:apps-proof-metric}}"}
              </span>
            </div>
            <blockquote
              className="ed-fg mt-6 text-[15px] md:text-base leading-relaxed"
              style={{ fontFamily: JAKARTA, fontWeight: 500 }}
            >
              &ldquo;{"{{TBD:apps-proof-quote}}"}&rdquo;
            </blockquote>
            <p className="ed-fg-muted mt-5 text-sm">{"{{TBD:apps-proof-attribution}}"}</p>
          </div>
        </Reveal>
      </Band>

      {/* ── 8. Related ────────────────────────────────────── */}
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
                  <p
                    className="ed-fg mt-3 text-[17px] tracking-[-0.02em]"
                    style={{ fontFamily: JAKARTA, fontWeight: 500, lineHeight: 1.3 }}
                  >
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

      {/* ── 9. CTA ────────────────────────────────────────
          TODO: "We'll build it on the call" promises a live build during a
          sales call. Flagged for the team to confirm it is deliverable; if
          it is not, this line needs a softer replacement before launch. */}
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
              fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "820px",
            }}
          >
            Tell us the tool that&rsquo;s been on your list for two years.
          </h2>
          <p className="mt-5 max-w-[620px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll build it on the call.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <a href="#gallery" className="ed-btn ed-btn-secondary-dark inline-flex">
              See what brands ship
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
