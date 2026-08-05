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
import LiveQueryBar from "./LiveQueryBar";
import OverlapChart from "./OverlapChart";

/**
 * /platform/reporting
 *
 * Built from the reporting brief. Two things about it are load-bearing and
 * should survive a copy pass:
 *
 * 1. **The band sequence.** dark, dark, light, light, dark, light, light,
 *    light, light, light, light, dark. The brief calls this the spec rather
 *    than a styling preference, and it is what stops the page reading like
 *    the other Platform pages, which run white card grid into white card
 *    grid. §3, §6 and §7 deliberately use no cards at all.
 *
 * 2. **No two adjacent sections share a layout device.** Spectrum bar,
 *    then a container card, then overlap charts, then a timeline spine,
 *    then nesting, then a concession pair. Convert any of those into a
 *    card grid and the rhythm is gone.
 *
 * Deviations from the brief, both deliberate:
 *
 * - The hero is the **photographic** treatment, not the
 *   flat gradient the brief describes. Requested directly, and it makes §2
 *   and §5 read as their own dark moments rather than three of a kind.
 * - **§9 is light.** The brief contradicts itself — its rhythm table and
 *   its verify step both say LIGHT, its section body says to reuse the
 *   governance band, which is dark. The rhythm table wins because the
 *   brief names it as the spec twice. The four-column label/value *form*
 *   is kept, per DESIGN.md §1.1; only the surface changed.
 *
 * Against DESIGN.md this page runs three dark moments where §4.1 allows
 * two, and the first two are adjacent. That is the brief's rhythm and it
 * was built as specified. The opening is treated as one extended dark
 * region rather than two separate bands, which is why §2 carries no
 * photograph and no second scrim.
 */

/* On-dark palette (DESIGN.md §4.4). The page tokens assume a light or dark
   *page* surface and do not apply over a photograph or these bands. */
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
/* #B45309 does not clear contrast on these bands; same warning role. */
const WARN_ON_DARK = "#F5B26B";

/* Assignment and the revert switch live in lib/data/platform-heroes.ts. */
const HERO = platformHero("reporting");

/* ── §3 ─────────────────────────────────────────────────────
   Eight inputs. Widths vary so the spectrum does not read as an even
   split; the ramp descends from full accent to pale. */
const INPUTS: { label: string; line: string; flex: number; alpha: number }[] = [
  { label: "Sales & transactions",  line: "Tickets, services, discounts, refunds",       flex: 1.4, alpha: 1.00 },
  { label: "Bookings & capacity",   line: "Appointments, utilization, open slots",       flex: 1.2, alpha: 0.88 },
  { label: "Labour",                line: "Hours, cost against revenue, variance",       flex: 1.0, alpha: 0.76 },
  { label: "Customers",             line: "Retention, lapse, frequency, LTV",            flex: 1.1, alpha: 0.64 },
  { label: "Financials",            line: "P&L lines, invoices, payments, royalties",    flex: 1.0, alpha: 0.52 },
  { label: "Compliance & training", line: "Certification, completion, open items",       flex: 0.9, alpha: 0.40 },
  { label: "Onboarding",            line: "Ramp progress against cohort",                flex: 0.7, alpha: 0.30 },
  { label: "Support",               line: "Questions asked, tickets, content gaps",      flex: 0.8, alpha: 0.22 },
];

/* ── §5 ─────────────────────────────────────────────────────
   Opportunity questions lead, the diagnostic one is last. Do not reorder,
   and do not normalise the widths: the short "Both" bar is the claim. */
const CROSS: {
  a: { label: string; width: number };
  b: { label: string; width: number };
  both: { label: string; width: number };
  count: number;
  tone?: "accent" | "warn";
  question: string;
}[] = [
  {
    a: { label: "Scheduling", width: 70 }, b: { label: "CRM", width: 52 },
    both: { label: "Both", width: 31 }, count: 47,
    question: "Which locations have open capacity next week and a lapsed client list over 200?",
  },
  {
    a: { label: "POS", width: 64 }, b: { label: "Peers", width: 44 },
    both: { label: "Both", width: 21 }, count: 31,
    question: "Which locations sell the anchor service well but never attach the add-on their peers do?",
  },
  {
    a: { label: "Quotes", width: 58 }, b: { label: "Win rate", width: 47 },
    both: { label: "Both", width: 17 }, count: 18,
    question: "Where are we quoting below the network average and still winning the job?",
  },
  {
    a: { label: "POS", width: 42 }, b: { label: "Compliance", width: 36 },
    both: { label: "Both", width: 8 }, count: 6, tone: "warn",
    question: "Of my bottom quartile, which have open compliance items?",
  },
];

/* ── §6 ─────────────────────────────────────────────────────
   The warning-tinted third dot is deliberate: unprompted anomaly detection
   is the strongest claim here and the colour marks it. */
const TIMELINE: { tone: "accent" | "muted" | "warn"; meta: string; title: string; body: string }[] = [
  {
    tone: "accent", meta: "Mon 4:00am · Teams",
    title: "The brief is assembled before you start",
    body: "Twelve locations, ranked by need. Not by who asked.",
  },
  {
    tone: "muted", meta: "Tue 6:12am · SMS",
    title: "A threshold broke overnight",
    body: "Store #331 dropped below 70% booked. You hear this morning, not at month end.",
  },
  {
    tone: "warn", meta: "Thu 9:04am · Slack",
    title: "Something you weren't watching",
    body: "Store #087's rebook rate has drifted for three weeks. Nobody set an alert for it.",
  },
  {
    tone: "muted", meta: "Quarter close · Email",
    title: "The pack, on whatever clock you set",
    body: "Any report, any cadence, any channel.",
  },
];

/* ── §7 ─────────────────────────────────────────────────────
   Nested, not tabulated: each level sits inside the one above it, which is
   the shape of the entitlement itself. */
const SCOPES: { role: string; scope: string }[] = [
  { role: "HQ",           scope: "The whole network. Every location, every cut." },
  { role: "Field coach",  scope: "Their territory. Twelve locations, compared." },
  { role: "Franchisee",   scope: "Their locations. Their P&L, bookings, team." },
  { role: "Store manager", scope: "Their store. Today, this week, against target." },
];

/* ── §9 ─────────────────────────────────────────────────────
   Four guarantees. "Scoped" is deliberately absent: §7 owns scoping and
   restating it here would be the same idea shown twice. */
const CONTROL: { label: string; body: string }[] = [
  { label: "Sourced",    body: "Every number traced to the system it came from" },
  { label: "Live",       body: "Read at the source. Not a copy, not last night's sync." },
  { label: "Logged",     body: "Every question asked and every number returned" },
  { label: "Exportable", body: "Any answer, out in a format your team already uses" },
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Integrations",   title: "Where the numbers come from",           href: "/platform/integrations" },
  { eyebrow: "Workflows",      title: "When the answer should trigger an action", href: "/platform/workflows" },
  { eyebrow: "Control Center", title: "How scoping is set",                    href: "/platform/control-center" },
];

export default function ReportingContent() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────
          Photographic, per the direct request. The scrim
          is the sub-page value (0.45) rather than the variant's own 0.36:
          that baseline was measured for white body copy alone, and this
          band also carries a monospace query bar and its caption at 10.5px. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={HERO.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "left center" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimRgba})` }} />
          {/* The soft highlight the brief asks for, top right, away from
              the copy column. */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(58% 52% at 82% 12%, rgba(159,224,248,0.16) 0%, rgba(159,224,248,0) 70%)" }}
          />
        </div>

        {/* Single column, with the query bar under the CTAs where the brief
            puts it. Built two-up first, which squeezed the copy column to
            461px at 1205 and broke the H1 across four lines instead of the
            two the brief asks for. Full width the first clause needs ~603px
            at the 40px ceiling and clears it easily. */}
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
              >
                Reporting
              </p>
              <h1
                className="mt-5 max-w-[860px] leading-[1.06] tracking-[-0.03em]"
                style={{
                  color: "#FFFFFF",
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  /* Ceiling derived at 1440: the longer clause, "However you
                     want to see it.", measures ~640px at 40px, inside the
                     860px cap. Below lg the explicit break is dropped and
                     both clauses wrap naturally. */
                  fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                  textWrap: "balance",
                }}
              >
                Every number your network has.{" "}
                <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                  However you want to see it.
                </span>
              </h1>
              <p className="mt-6 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
                Ask in plain language and get it back the way the question demands. Not the
                way someone built a dashboard three years ago.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/speak-to-an-expert"
                  className="ed-btn ed-btn-arrow inline-flex"
                  style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
                >
                  Speak to an expert
                  <span className="ed-btn-arrow-badge" aria-hidden="true">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                </Link>
                <a href="#cross-system" className="ed-btn ed-btn-secondary-dark inline-flex">
                  See what it can answer
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
              className="mt-12"
            >
              <LiveQueryBar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. The cost today ───────────────────────────────
          The second half of one extended dark opening, not a second dark
          moment: no photograph, no second scrim, just the hero's base
          deepened. This is the only section on the page that discusses
          current cost — nothing later restates the pain. */}
      <section
        className="w-full"
        style={{ background: "linear-gradient(180deg, #0B2C48 0%, #071B29 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_DIM }}
            >
              What it costs now
            </p>
            <h2
              className="mt-4 max-w-[900px] leading-[1.08] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty",
              }}
            >
              Twelve versions of the same spreadsheet. And the two hours before every call.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <Reveal>
              <ScrapPanel />
            </Reveal>
            <Reveal delay={0.1}>
              <PrepPanel />
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-10 max-w-[720px]">
              <p
                className="tracking-[-0.02em]"
                style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 600, fontSize: 24, lineHeight: 1.3 }}
              >
                The report isn&rsquo;t faster. It doesn&rsquo;t get built.
              </p>
              <p className="mt-3 text-base leading-relaxed" style={{ color: ON_DARK_DIM }}>
                The prep was never the coaching. By the time the numbers were ready, the call
                was a recap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Inputs ───────────────────────────────────────
          No cards, by spec. One continuous spectrum, then plain text. The
          section's job is coverage, and a card grid would make eight
          categories look like eight features. */}
      <Band>
        <SectionHead
          eyebrow="Inputs"
          title="Everything your systems already hold. Nothing you have to move."
          sub="It reads at the source when a question needs an answer. No warehouse to load, no model to build first."
        />

        <Reveal>
          <div className="mt-10 flex h-[10px] w-full overflow-hidden" style={{ borderRadius: 5 }} aria-hidden="true">
            {INPUTS.map((c) => (
              <span key={c.label} style={{ flex: c.flex, backgroundColor: `rgba(0,119,168,${c.alpha})` }} />
            ))}
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {INPUTS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                {c.label}
              </p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{c.line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="ed-fg-muted mt-10 max-w-[640px] text-base leading-relaxed">
            Nothing to model, nothing to migrate, nothing to clean up first. If it&rsquo;s
            connected, you can ask about it.{" "}
            <Link href="/platform/integrations" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              See what connects
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 4. Renderings ───────────────────────────────────
          One card holding four sub-cards, not four freestanding cards: the
          header says "one dataset", and four separate cards would argue
          four datasets. Every render is a different shape on purpose. */}
      <Band alt>
        <SectionHead
          eyebrow="Ask anything"
          title="The same numbers. However the question needs them."
          sub="Nobody built a dashboard first."
        />

        <Reveal>
          <div className="mt-10 overflow-hidden" style={CARD}>
            <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <Meta>One dataset · Twelve locations · Six weeks</Meta>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 md:p-6">
              <SubCard ask="Rank my territory by attach rate">
                <RankBars />
              </SubCard>
              <SubCard ask="Show me that as a trend instead">
                <TrendMini />
              </SubCard>
              <SubCard ask="Just the ones behind plan">
                <BehindRows />
              </SubCard>
              <SubCard ask="Send me this every Monday at 7">
                <DeliveryCard />
              </SubCard>
            </div>

            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div style={{ borderTop: "1px solid var(--ed-rule)" }} className="pt-4">
                <p className="ed-fg-muted text-[13.5px]">
                  Four questions. One dataset. Nobody configured anything.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Band>

      {/* ── 5. Across systems ───────────────────────────────
          The section the page rests on. Deeper and warmer than the hero so
          it reads as its own moment rather than a repeat of §2. */}
      <section
        id="cross-system"
        className="w-full scroll-mt-24"
        style={{ background: "linear-gradient(180deg, #0E2A38 0%, #0A1D26 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}
            >
              Across systems
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty",
              }}
            >
              The opportunity is usually sitting{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                between two systems.
              </span>
            </h2>
            <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Your POS knows what sold. Your scheduler knows what&rsquo;s empty. Neither one
              knows you have a soft week and four hundred people who haven&rsquo;t been back.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            {CROSS.map((c, i) => (
              <Reveal key={c.question} delay={i * 0.08}>
                <div
                  className="flex h-full flex-col p-5 md:p-6"
                  style={{
                    backgroundColor: "rgba(238,242,248,0.04)",
                    border: `1px solid ${ON_DARK_RULE}`,
                    borderRadius: 14,
                  }}
                >
                  <OverlapChart
                    a={c.a}
                    b={c.b}
                    both={c.both}
                    count={c.count}
                    tone={c.tone}
                    title={`${c.a.label} ${c.a.width} percent, ${c.b.label} ${c.b.width} percent, both ${c.both.width} percent: ${c.count} locations.`}
                  />
                  <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${ON_DARK_RULE}` }}>
                    <p className="text-[15px] leading-relaxed" style={{ color: "#FFFFFF" }}>
                      &ldquo;{c.question}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <p className="mt-6 text-[12px]" style={{ color: ON_DARK_DIM }}>
              Counts are illustrative.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 max-w-[820px] pt-8" style={{ borderTop: `1px solid ${ON_DARK_RULE}` }}>
              <p
                className="tracking-[-0.02em]"
                style={{
                  color: ON_DARK, fontFamily: JAKARTA, fontWeight: 500,
                  fontSize: "clamp(1.125rem, 0.5rem + 1.4vw, 1.625rem)", lineHeight: 1.3,
                }}
              >
                Every one of the first three is revenue that already exists, sitting in a gap
                between two systems.{" "}
                <span style={{ color: ON_DARK_ACCENT, fontWeight: 700 }}>
                  In a BI tool, each of these is a modeling request. Here it&rsquo;s a sentence.
                </span>
              </p>
              <Link
                href="/platform/integrations"
                className="mt-6 inline-block text-sm"
                style={{ color: ON_DARK_ACCENT, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}
              >
                The connections this rests on
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Always on ────────────────────────────────────
          A spine, not cards. Scheduled digests live in this section only:
          §2 says the artifact stops being built, this says a different one
          arrives unasked, and those are compatible only while they stay
          apart. */}
      <Band>
        <SectionHead
          eyebrow="Always on"
          title="You stop checking. It tells you."
          sub="A dashboard waits to be opened. Most weeks nobody opens it."
        />

        <div className="mt-10 max-w-[760px]">
          {TIMELINE.map((t, i) => {
            const dot =
              t.tone === "accent" ? "var(--ed-accent-text)"
              : t.tone === "warn" ? "#B45309"
              : "var(--ed-fg-muted)";
            const last = i === TIMELINE.length - 1;
            return (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="relative flex gap-5 pb-9 last:pb-0">
                  {/* The rule runs behind the dots and stops at the last
                      one, so the sequence reads as finished rather than
                      trailing off. */}
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
                    style={{ backgroundColor: dot, outline: "3px solid var(--ed-bg)" }}
                  />
                  <div className="min-w-0 flex-1">
                    <Meta color={t.tone === "warn" ? "#B45309" : undefined}>{t.meta}</Meta>
                    <p className="ed-fg mt-2 text-[17px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.3 }}>
                      {t.title}
                    </p>
                    <p className="ed-fg-muted mt-1.5 text-[14.5px] leading-relaxed">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p
            className="ed-fg mt-10 max-w-[640px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            Having a pulse on the network isn&rsquo;t a dashboard you check. It&rsquo;s knowing
            without having to look.
          </p>
          <Link href="/platform/workflows" className="ed-link mt-5 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            How a workflow turns that into an action
          </Link>
        </Reveal>
      </Band>

      {/* ── 7. Who can ask ──────────────────────────────────
          Nested containers, one level per role. The nesting *is* the
          argument, so at 375 the padding steps shrink but the nesting
          never flattens. This section owns scoping; §9 must not repeat it. */}
      <Band alt>
        <SectionHead
          eyebrow="Everyone"
          title="Your franchisees can ask too. About their own locations."
          sub={<>Not a viewer seat on a report someone built for them. The same capability, bounded by what they&rsquo;re entitled to see.</>}
        />

        <Reveal>
          <div className="mt-10 max-w-[860px]">
            <ScopeNest depth={0} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="ed-fg-muted mt-9 max-w-[620px] text-base leading-relaxed">
            Nobody sees another owner&rsquo;s numbers. Not by policy, by the permissions your
            systems already enforce.{" "}
            <Link href="/platform/control-center" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              How scoping is set
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 8. Alongside your BI ────────────────────────────
          The concession. Six bullets and a line, no more: any longer and
          it becomes a comparison table, which invites a feature fight.
          Nothing here claims a capability §4-§7 has not already shown. */}
      <Band>
        <SectionHead
          eyebrow="Alongside what you run"
          title="Your BI answers the questions someone anticipated."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <Reveal>
            <ConcessionCard
              label="Your BI is still right for"
              items={[
                "Board reporting on a fixed set of measures",
                "Financial consolidation and audit",
                "Anything with a defined, unchanging format",
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ConcessionCard
              accent
              label="This is for"
              items={[
                "The question that came up in the meeting",
                "The cut nobody modeled",
                "Everyone who was never going to get a seat",
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p
            className="ed-fg mt-9 tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
          >
            It reads your BI too. Nothing gets replaced.
          </p>
        </Reveal>
      </Band>

      {/* ── 9. Control ──────────────────────────────────────
          Light, per the brief's rhythm table. The governance *form* is
          kept — four label/value columns over hairline rules, no cards —
          so it still reads as a guarantee band rather than a fifth grid. */}
      <Band alt>
        <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {CONTROL.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div style={{ borderTop: "1px solid var(--ed-border)", paddingTop: 15 }}>
                <Meta>{c.label}</Meta>
                <p className="ed-fg mt-2.5 text-[15px] leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <Link href="/platform/control-center" className="ed-link mt-10 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            Inside the Control Center
          </Link>
        </Reveal>
      </Band>

      {/* ── 10. Proof ───────────────────────────────────────
          Placeholders render visibly rather than the section being
          omitted. Do not substitute a deflection metric from another
          customer: deflection is a support number and argues for Answers,
          not for this page. */}
      <Band>
        <SectionHead title="What changed when the reporting stopped being a job." />

        <Reveal>
          <div className="mt-9 max-w-[820px] p-6 md:p-8" style={CARD}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              {/* Deliberately not <Meta>: it force-uppercases, and the
                  placeholder rule says render the token exactly as
                  written. Swap in <Meta> when a real brand name lands. */}
              <span
                style={{
                  fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em",
                  fontWeight: 600, color: "var(--ed-fg-muted)",
                }}
              >
                {"{{TBD:reporting-proof-brand}}"}
              </span>
              <span
                style={{
                  fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1,
                  letterSpacing: "-0.03em", color: "var(--ed-accent-text)",
                }}
              >
                {"{{TBD:reporting-proof-metric}}"}
              </span>
            </div>
            <blockquote
              className="ed-fg mt-6 text-[15px] md:text-base leading-relaxed"
              style={{ fontFamily: JAKARTA, fontWeight: 500 }}
            >
              &ldquo;{"{{TBD:reporting-proof-quote}}"}&rdquo;
            </blockquote>
            <p className="ed-fg-muted mt-5 text-sm">{"{{TBD:reporting-proof-attribution}}"}</p>
          </div>
        </Reveal>
      </Band>

      {/* ── 11. Related ─────────────────────────────────── */}
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

      {/* ── 12. CTA ─────────────────────────────────────────
          Matches the hero's photograph, resolving to CLOSING_BASE so the
          editorial footer continues the band with no seam. No `priority`
          here; that belongs to the hero image only. */}
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
            Send us the report your team rebuilds every week.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll show you what it looks like when nobody has to build it, and three
            questions you&rsquo;d never have been able to ask.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <a href="#cross-system" className="ed-btn ed-btn-secondary-dark inline-flex">
              See what it can answer
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}

/* ── §2 panels ─────────────────────────────────────────────
   Both sit on the dark opening, so they run a translucent white surface
   rather than --ed-card, which would be a light card on light in dark
   mode and a white slab here. */

const DARK_PANEL: React.CSSProperties = {
  backgroundColor: "rgba(238,242,248,0.05)",
  border: "1px solid rgba(238,242,248,0.14)",
  borderRadius: 14,
};

function PanelHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-3.5" style={{ borderBottom: "1px solid rgba(238,242,248,0.14)" }}>
      <span
        className="uppercase"
        style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_DIM }}
      >
        {children}
      </span>
    </div>
  );
}

/* The by-hand reporting pile. Scattered rather than gridded, the same
   argument the homepage's version makes: a tidy grid would say the problem
   is already solved. Tilts come from the index so the server and the
   client agree. */
/* Twelve, because the headline above says twelve versions. A pile of ten
   under that line is the contradiction check in DESIGN.md §1.3 failing in
   the least visible way. */
const SCRAPS: { name: string; tone?: "warn" }[] = [
  { name: "week-42-v7.xlsx" },
  { name: "rollup-FINAL.xlsx" },
  { name: "regional-rollup.xlsx" },
  { name: "labour-hours.xlsx" },
  { name: "FW: which version?", tone: "warn" },
  { name: "Q3-numbers-v3.xlsx" },
  { name: "P&L-chart.png" },
  { name: "RE: RE: numbers" },
  { name: "attach-by-store.csv" },
  { name: "rollup-v11.xlsx" },
  { name: "deck-v2-final.pptx" },
  { name: "sending mine over" },
];

const TILT = [-3.2, 2.4, 3.0, -2.0, 1.8, -3.6, 2.8, -1.6, 3.4, -2.6];

function ScrapPanel() {
  return (
    <div className="flex h-full flex-col" style={DARK_PANEL}>
      <PanelHead>HQ · This week&rsquo;s numbers, by hand</PanelHead>
      <div className="flex flex-wrap content-start gap-x-2 gap-y-2 p-5" aria-hidden="true">
        {SCRAPS.map((s, i) => (
          <span
            key={s.name}
            className="inline-flex items-center px-2.5 py-[7px]"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              lineHeight: 1.25,
              borderRadius: 8,
              transform: `rotate(${TILT[i % TILT.length]}deg)`,
              backgroundColor: s.tone === "warn" ? "rgba(245,178,107,0.14)" : "rgba(238,242,248,0.08)",
              border: `1px solid ${s.tone === "warn" ? "rgba(245,178,107,0.38)" : "rgba(238,242,248,0.16)"}`,
              color: s.tone === "warn" ? WARN_ON_DARK : ON_DARK,
            }}
          >
            {s.name}
          </span>
        ))}
      </div>
      <p className="mt-auto px-5 pb-5 text-[13px]" style={{ color: ON_DARK_DIM }}>
        Nobody is sure which one is current.
      </p>
    </div>
  );
}

const PREP: { time: string; task: string }[] = [
  { time: "7:40am", task: "Pull six weeks of bookings" },
  { time: "7:55am", task: "Pull labour against target" },
  { time: "8:10am", task: "Attach rate vs territory" },
  { time: "8:25am", task: "Check open compliance items" },
  { time: "8:40am", task: "Build the deck" },
];

function PrepPanel() {
  return (
    <div className="flex h-full flex-col" style={DARK_PANEL}>
      <PanelHead>One coach · Before one call</PanelHead>
      <div className="flex flex-col px-5 py-2">
        {PREP.map((p) => (
          <div key={p.time} className="flex items-baseline gap-4 py-[9px]">
            <span
              className="flex-none"
              style={{ fontFamily: MONO, fontSize: 11.5, color: ON_DARK_DIM, width: 58, fontVariantNumeric: "tabular-nums" }}
            >
              {p.time}
            </span>
            <span className="text-[14px] leading-snug" style={{ color: ON_DARK }}>{p.task}</span>
          </div>
        ))}
        {/* The 2px rule sets the last row apart as the conclusion: every
            line above it was spent getting to this one. */}
        <div className="mt-2 flex items-baseline gap-4 pt-3" style={{ borderTop: "2px solid rgba(238,242,248,0.22)" }}>
          <span
            className="flex-none"
            style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: WARN_ON_DARK, width: 58, fontVariantNumeric: "tabular-nums" }}
          >
            9:00am
          </span>
          <span className="text-[14px] leading-snug" style={{ color: "#FFFFFF", fontWeight: 600 }}>Call starts</span>
        </div>
      </div>
      <p className="mt-auto px-5 pb-5 pt-4 text-[13px]" style={{ color: ON_DARK_DIM }}>
        Thirty locations. Every month.
      </p>
    </div>
  );
}

/* ── §4 sub-cards ──────────────────────────────────────────
   Bordered panels inside the one card, on the nested surface so they read
   as contained rather than as four cards that happen to be adjacent. */

function SubCard({ ask, children }: { ask: string; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col p-4 md:p-5"
      style={{ backgroundColor: "var(--ed-card-alt)", border: "1px solid var(--ed-border)", borderRadius: 12 }}
    >
      <p className="text-[13.5px] leading-snug" style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>
        &ldquo;{ask}&rdquo;
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const RANK = [
  { label: "#118", pct: 34, lead: true },
  { label: "#052", pct: 31, lead: true },
  { label: "#204", pct: 28, lead: true },
  { label: "#331", pct: 19, lead: false },
  { label: "#087", pct: 14, lead: false },
];

function RankBars() {
  const max = Math.max(...RANK.map((r) => r.pct));
  return (
    <div className="flex flex-col gap-2" role="img" aria-label="Five locations ranked by attach rate, from 34 percent down to 14 percent.">
      {RANK.map((r) => (
        <div key={r.label} className="flex items-center gap-2.5">
          <span className="flex-none ed-fg-muted" style={{ fontFamily: MONO, fontSize: 10.5, width: 30, fontVariantNumeric: "tabular-nums" }}>
            {r.label}
          </span>
          <span className="h-[8px] flex-1 overflow-hidden rounded-full" style={{ backgroundColor: "var(--ed-border)" }}>
            <span
              className="block h-full rounded-full"
              style={{ width: `${(r.pct / max) * 100}%`, backgroundColor: r.lead ? "var(--ed-accent-text)" : "var(--ed-fg-muted)", opacity: r.lead ? 1 : 0.45 }}
            />
          </span>
          <span
            className="flex-none text-right"
            style={{ fontFamily: MONO, fontSize: 10.5, width: 26, color: r.lead ? "var(--ed-accent-text)" : "var(--ed-fg-muted)", fontVariantNumeric: "tabular-nums" }}
          >
            {r.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

function TrendMini() {
  const pts = [18, 21, 20, 25, 27, 31];
  const median = 23;
  const W = 100, H = 42;
  const lo = 14, hi = 35;
  const x = (i: number) => (i / (pts.length - 1)) * W;
  const y = (v: number) => H - ((v - lo) / (hi - lo)) * H;
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ");
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-[86px] w-full" role="img" aria-labelledby="rnd-trend-t rnd-trend-d">
        <title id="rnd-trend-t">The same attach rate as a trend</title>
        <desc id="rnd-trend-d">Six weeks rising from 18 to 31 percent against a median of 23 percent.</desc>
        <line x1="0" y1={y(median)} x2={W} y2={y(median)} stroke="var(--ed-fg-muted)" strokeWidth="0.8" strokeDasharray="3 2.5" opacity="0.5" vectorEffect="non-scaling-stroke" />
        <path d={d} fill="none" stroke="var(--ed-accent-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex items-center justify-between">
        <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 10.5 }}>6 weeks</span>
        <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 10.5 }}>median {median}%</span>
      </div>
    </div>
  );
}

const BEHIND: { label: string; delta: string; tone: "danger" | "warn" }[] = [
  { label: "Store #331", delta: "-18%", tone: "danger" },
  { label: "Store #087", delta: "-12%", tone: "danger" },
  { label: "Store #219", delta: "-9%",  tone: "warn" },
];

function BehindRows() {
  return (
    <div>
      {BEHIND.map((r) => {
        const c = r.tone === "danger" ? "#B42318" : "#B45309";
        const tint = r.tone === "danger" ? "rgba(180,35,24,0.07)" : "rgba(180,83,9,0.08)";
        return (
          <div
            key={r.label}
            className="mb-1.5 flex items-center justify-between rounded-md px-2.5 py-2 last:mb-0"
            style={{ backgroundColor: tint, border: `1px solid ${c}22` }}
          >
            <span className="ed-fg" style={{ fontFamily: MONO, fontSize: 11.5, fontVariantNumeric: "tabular-nums" }}>
              {r.label}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: c, fontVariantNumeric: "tabular-nums" }}>
              {r.delta}
            </span>
          </div>
        );
      })}
      <p className="ed-fg-muted mt-3 text-[12px]">3 of 12</p>
    </div>
  );
}

function DeliveryCard() {
  return (
    <div className="rounded-md p-3.5" style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-border)" }}>
      <Meta>Teams · Mon 7:00am</Meta>
      <p className="ed-fg mt-2.5 text-[13.5px] leading-relaxed">
        Twelve locations ranked by attach rate. Three behind plan.
      </p>
      <div className="mt-3.5 flex items-center gap-2 pt-3" style={{ borderTop: "1px solid var(--ed-rule)" }}>
        <span
          className="inline-flex items-center rounded px-1.5 py-0.5"
          style={{ fontSize: 11, fontWeight: 600, color: "var(--ed-accent-text)", backgroundColor: ACCENT_TINT, border: "1px solid rgba(0,119,168,0.22)" }}
        >
          Scheduled
        </span>
        <span className="ed-fg-muted text-[12px]">no setup</span>
      </div>
    </div>
  );
}

/* ── §7 nesting ────────────────────────────────────────────
   Recursive so the levels cannot drift out of step. Padding and tint step
   with depth; at 375 the steps get tighter but the nesting is never
   flattened, because the containment is the point. */
function ScopeNest({ depth }: { depth: number }) {
  const s = SCOPES[depth];
  if (!s) return null;
  const inner = depth > 0;
  return (
    <div
      className={inner ? "p-3 md:p-4" : "p-4 md:p-5"}
      style={{
        borderRadius: 12 - depth,
        border: `1px solid ${depth === 0 ? "var(--ed-border)" : "var(--ed-rule)"}`,
        backgroundColor: `rgba(10,10,10,${0.015 * (depth + 1)})`,
      }}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="ed-fg flex-none text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          {s.role}
        </p>
        <p className="ed-fg-muted text-[14px] leading-relaxed sm:text-right">{s.scope}</p>
      </div>
      {depth < SCOPES.length - 1 && (
        <div className="mt-3">
          <ScopeNest depth={depth + 1} />
        </div>
      )}
    </div>
  );
}

/* ── §8 concession ─────────────────────────────────────── */
function ConcessionCard({ label, items, accent = false }: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className="flex h-full flex-col p-6 md:p-7"
      style={{
        ...CARD,
        ...(accent
          ? { borderLeft: "3px solid #0077A8", backgroundColor: ACCENT_TINT }
          : {}),
      }}
    >
      <Meta color={accent ? "var(--ed-accent-text)" : undefined}>{label}</Meta>
      <ul className="mt-5 flex flex-col gap-3.5">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full"
              style={{ backgroundColor: accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)" }}
            />
            <span className="ed-fg text-[14.5px] leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
