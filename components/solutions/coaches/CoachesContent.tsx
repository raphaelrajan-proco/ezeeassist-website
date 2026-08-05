"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeadline, SectionShell } from "@/components/growth/shared";
import { CLOSING_BASE } from "@/components/growth/closing-band";
import CoachBrief from "./CoachBrief";
import PlayGrid from "./PlayGrid";

/**
 * The field-coaches page, written from inside the role. Two readers: a VP
 * of Operations buys it, and the coaching team can quietly kill it, so
 * nothing here may read as though the software does the coaching.
 *
 * Built on the editorial system (see DESIGN.md). The homepage's own section
 * components are content-hardcoded singletons with no props, so this page
 * reuses the shared primitives and the ed-* classes rather than refactoring
 * homepage sections, which are out of scope and would put the homepage at
 * risk.
 *
 * Copy is verbatim from the handoff except where it used em-dashes, which
 * the house style forbids; those became full stops. Section 8's figures are
 * unsourced and ship as visible {{TBD:...}} tokens by design. Do not
 * substitute plausible numbers.
 */

const JAKARTA = "var(--font-editorial)";
const EASE = [0.22, 1, 0.36, 1] as const;
const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const ACCENT_TINT = "rgba(0,119,168,0.05)";

/* ── Section 2 ─────────────────────────────────────────── */
const WEEK_CARDS: { title: string; body: string }[] = [
  {
    title: "The same five questions",
    body: "Five locations, five channels, one morning. You answer each of them personally.",
  },
  {
    title: "The chase",
    body: "Insurance, training, audit docs, P&L. Each on its own clock, each needing a nudge.",
  },
  {
    title: "The prep tax",
    body: "Two hours pulling numbers from four systems before a one-hour call.",
  },
  {
    title: "The triage",
    body: "Thirty locations, one calendar. Whoever is loudest gets the hour.",
  },
];

/* ── Section 3 ─────────────────────────────────────────── */
const CHANGES: { before: string; after: string }[] = [
  {
    before: "You answer the same question from five locations",
    after: "The answer arrives from your playbook, cited, in six seconds. You still see what was asked.",
  },
  {
    before: "You chase seven deadlines across seven stores",
    after: "Each one chases itself, and reaches you only if it doesn't close.",
  },
  {
    before: "You rebuild the numbers before every call",
    after: "The brief is ready Monday, ranked by which locations need you.",
  },
  {
    before: "Your best play reaches your thirty locations",
    after: "Build it once. It runs at every location in the network.",
  },
];

/* ── Section 4 ─────────────────────────────────────────── */
const WEEK_WITH_IT: { label: string; body: string; paired?: boolean }[] = [
  {
    label: "Monday 7am",
    body: "Your brief is ready. Twelve locations ranked by need, what changed since you last spoke, and what to open with on each call.",
  },
  {
    label: "Tuesday",
    /* Handoff had an em-dash after "ask"; house style takes a full stop. */
    body: "Store #402's ramp is behind cohort. You didn't ask. It surfaced, with what the fastest ten openings did in week six.",
  },
  {
    label: "Wednesday",
    body: "Your call with #331. You already know bookings are soft, the reactivation draft is waiting, and the owner has seen it. The hour goes to why, not what.",
  },
  {
    label: "Thursday",
    body: "You build a play: when a location drops below 70% booked, check campaigns and lapsed clients, draft the offer, hold it for approval.",
    paired: true,
  },
  {
    label: "Friday 6am",
    body: "It ran at 214 locations overnight. Nine drafts waiting for owner approval. You didn't touch it.",
    paired: true,
  },
];

/* ── Section 7 ─────────────────────────────────────────── */
const HANDLES = [
  "The repeated question",
  "The deadline chase",
  "Pulling and formatting the numbers",
  "Running the play at every location",
  "Drafting what goes out",
];
const YOU_DECIDE = [
  "Which of the three problems to fix first",
  "Whether a number is noise or the start of something",
  "How to say it to an owner who's defensive",
  "What the play should be",
  "Whether it goes out",
];

/* ── Section 8 ─────────────────────────────────────────
   Every value is a placeholder. These render as visible tokens on
   purpose: an unsourced coverage number is worse than an empty slot to
   this audience. Replace only with a figure that has a source. */
const COVERAGE: { value: string; label: string; source: string }[] = [
  {
    value: "{{TBD:touchpoints}}",
    label: "Coaching touchpoints per location, per month",
    source: "{{TBD:touchpoints-source}}",
  },
  {
    value: "{{TBD:locations-per-coach}}",
    label: "Locations supported per coach",
    source: "{{TBD:locations-per-coach-source}}",
  },
  {
    value: "{{TBD:hours-returned}}",
    label: "Hours returned per coach, per week",
    source: "{{TBD:hours-returned-source}}",
  },
  {
    value: "{{TBD:ramp-weeks}}",
    label: "Weeks cut from new franchisee ramp",
    source: "{{TBD:ramp-weeks-source}}",
  },
];

/* ── Section 10 ────────────────────────────────────────
   Three, in this order. Visibility first: it is the fear a coach does not
   say out loud. A fourth question reads defensive. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Will I still know what's happening at my locations?",
    a: "You see every question asked and every answer given, by location. More visibility than you have today, not less.",
  },
  {
    q: "What if it tells an owner the wrong thing?",
    /* Handoff had an em-dash before "the question"; house style takes a full stop. */
    a: "It answers only from material your brand has approved, and it cites the source every time. When it isn't confident, it stops. The question becomes a ticket routed to you with the full conversation attached.",
  },
  {
    q: "Do I have to build these plays myself?",
    a: "You can. Most teams start from what HQ has already published and adjust from there.",
  },
];

/* ── Section 11 ────────────────────────────────────────
   The handoff asked for /solutions/hq and /solutions/franchisees. Those
   routes do not exist, and the equivalent pages already do, so these point
   at the real pages rather than at new stubs. */
const RELATED: { eyebrow: string; title: string; href: string }[] = [
  {
    eyebrow: "Franchisor / HQ",
    title: "What your leadership sees",
    href: "/solutions/leadership",
  },
  {
    eyebrow: "Franchisees",
    title: "What your owners get",
    href: "/industries/franchising/multi-unit-franchisees",
  },
  {
    eyebrow: "Coaching Agent",
    title: "How the brief is assembled",
    href: "/platform/insights",
  },
];

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p
      className="text-xs uppercase mb-5"
      style={{
        letterSpacing: "0.2em",
        fontWeight: 500,
        /* #9FE0F8 is the accent that clears contrast on the scrimmed hero
           photograph, where --ed-accent-text would sink into the blue. */
        color: onDark ? "#9FE0F8" : "var(--ed-accent-text)",
      }}
    >
      {children}
    </p>
  );
}

export default function CoachesContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────
          Carries the homepage's photograph so the page reads as the same
          site. The brief sits beneath the copy rather than beside it: at
          the review widths a side-by-side split starves the H1 and forces
          it below 30px. */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B2C48" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "left center" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.46)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24"
        >
          <Eyebrow onDark>For field coaches and franchise business consultants</Eyebrow>

          <h1
            className="leading-[1.06] tracking-[-0.03em]"
            style={{
              color: "#FFFFFF",
              fontFamily: JAKARTA,
              fontWeight: 700,
              /* Capped so the longer line clears 896px of measure at 1440
                 and above. Raising the ceiling wraps it to three lines. */
              fontSize: "clamp(1.625rem, 0.5rem + 2.6vw, 2.5rem)",
              maxWidth: "896px",
              textWrap: "pretty",
            }}
          >
            Walk into every call already prepared.{" "}
            {/* Hard break from lg up only; below that it wraps naturally. */}
            <span className="lg:block">Then have your plays run where you can&rsquo;t be.</span>
          </h1>

          <p
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(245,237,224,0.92)", maxWidth: "640px" }}
          >
            The questions, the chasing, and the report building stop reaching you. What
            each of your locations needs is waiting when you sit down. And the play you
            build once runs at all of them.
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
            {/* Anchors down the page, not out. Getting this reader to the
                brief is worth more than a form. */}
            <a href="#brief" className="ed-btn ed-btn-secondary-dark inline-flex">
              See a coach&rsquo;s brief
            </a>
          </div>

          <div className="mt-12 max-w-3xl">
            <CoachBrief variant="compact" />
          </div>
        </motion.div>
      </section>

      {/* ── 2. Your week ────────────────────────────── */}
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <SectionHeadline>You were hired to grow locations.</SectionHeadline>
          <p className="ed-fg-muted mt-3 text-lg md:text-xl" style={{ lineHeight: 1.4 }}>
            Here is what gets to you first.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WEEK_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
              className="ed-card rounded-2xl p-6"
              style={{ border: "1px solid var(--ed-border)" }}
            >
              <h3
                className="ed-fg text-lg tracking-[-0.02em]"
                style={{ fontFamily: JAKARTA, fontWeight: 500, lineHeight: 1.25 }}
              >
                {card.title}
              </h3>
              <p className="ed-fg-muted mt-2.5 text-[15px] leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="ed-fg mt-9 max-w-2xl"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 500,
            fontSize: "clamp(1.125rem, 0.7rem + 0.9vw, 1.375rem)",
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
          }}
        >
          Your best work is the part that fits in what&rsquo;s left.
        </motion.p>
      </SectionShell>

      {/* ── 3. What changes ─────────────────────────── */}
      <SectionShell alt>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-9"
        >
          <SectionHeadline>The same week, spent differently.</SectionHeadline>
        </motion.div>

        {/* Column headers once at desktop; each row carries its own labels
            below that, where the pair stacks. */}
        <div
          className="hidden md:grid md:grid-cols-2 md:gap-6 pb-3"
          style={{ borderBottom: "1px solid var(--ed-rule)" }}
        >
          {["Before", "After"].map((h) => (
            <span
              key={h}
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--ed-fg-muted)",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex flex-col">
          {CHANGES.map((row, i) => {
            /* Row four is the only one that is not about time. It is the
               argument of the page, so it gets the accent. */
            const emphasised = i === CHANGES.length - 1;
            return (
              <motion.div
                key={row.before}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className={`grid grid-cols-1 gap-2 py-5 md:grid-cols-2 md:gap-6 ${
                  emphasised ? "mt-2 rounded-2xl px-5 md:px-6" : ""
                }`}
                style={
                  emphasised
                    ? {
                        backgroundColor: ACCENT_TINT,
                        border: "1px solid var(--ed-accent-text)",
                      }
                    : { borderBottom: "1px solid var(--ed-rule)" }
                }
              >
                <div>
                  <span
                    className="md:hidden mb-1.5 block"
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "var(--ed-fg-muted)",
                    }}
                  >
                    Before
                  </span>
                  <p className="ed-fg-muted text-[15px] md:text-base leading-relaxed">
                    {row.before}
                  </p>
                </div>
                <div>
                  <span
                    className="md:hidden mb-1.5 block"
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "var(--ed-accent-text)",
                    }}
                  >
                    After
                  </span>
                  <p
                    className="ed-fg text-[15px] md:text-base leading-relaxed"
                    style={{ fontWeight: emphasised ? 600 : 500 }}
                  >
                    {row.after}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionShell>

      {/* ── 4. A week with it ───────────────────────── */}
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-9"
        >
          <SectionHeadline>Monday to Friday, with it running.</SectionHeadline>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {WEEK_WITH_IT.map((day, i) => (
            <motion.div
              key={day.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="rounded-2xl p-5"
              style={{
                /* Thursday and Friday are one thought split across two days.
                   The shared tint and accent top rule bracket them as a pair
                   without a caption explaining the join. */
                backgroundColor: day.paired ? ACCENT_TINT : "var(--ed-card)",
                border: "1px solid var(--ed-border)",
                borderTop: day.paired
                  ? "3px solid var(--ed-accent-text)"
                  : "1px solid var(--ed-border)",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: day.paired ? "var(--ed-accent-text)" : "var(--ed-fg-muted)",
                }}
              >
                {day.label}
              </span>
              <p className="ed-fg mt-3 text-[14px] leading-relaxed">{day.body}</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      {/* ── 5. Your call prep ───────────────────────── */}
      <SectionShell alt id="brief">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-9"
        >
          <Eyebrow>Coaching Agent</Eyebrow>
          <SectionHeadline>Every call starts with the diagnosis already done.</SectionHeadline>
          <p className="ed-fg-muted mt-4 text-base md:text-lg leading-relaxed">
            Assembled overnight from your locations&rsquo; live numbers, checked against
            your brand&rsquo;s standard.
          </p>
        </motion.div>

        {/* Capped: past ~1024px the right-aligned note drifts so far from the
            row it belongs to that the pairing stops reading. */}
        <div className="max-w-5xl">
          <CoachBrief />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          {[
            "Assembled overnight",
            "Ranked by need, not by who asked",
            "Every number traced to its source",
          ].map((point) => (
            <span key={point} className="ed-fg-muted text-sm">
              {point}
            </span>
          ))}
        </div>

        <p className="ed-fg-muted mt-5 text-xs">
          Illustrative. Location numbers and figures are examples, not a customer&rsquo;s data.
        </p>

        <Link
          href="/platform/insights"
          className="ed-link mt-6 inline-block text-sm"
          style={{ fontWeight: 500 }}
        >
          How the brief is assembled &rarr;
        </Link>
      </SectionShell>

      {/* ── 6. Build a play once ────────────────────── */}
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <Eyebrow>Workflows</Eyebrow>
          <SectionHeadline>
            The thing you&rsquo;d do for every location, done for every location.
          </SectionHeadline>
          <p className="ed-fg-muted mt-4 text-base md:text-lg leading-relaxed">
            Describe it once, in plain language. It runs wherever it applies, in each
            location&rsquo;s own context.
          </p>
        </motion.div>

        <PlayGrid />
      </SectionShell>

      {/* ── 7. What stays yours ─────────────────────── */}
      <SectionShell alt>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-9"
        >
          <SectionHeadline>It doesn&rsquo;t coach. It clears the way so you can.</SectionHeadline>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {[
            { heading: "It handles", items: HANDLES, accent: false },
            { heading: "You decide", items: YOU_DECIDE, accent: true },
          ].map((col) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: col.accent ? 0.1 : 0 }}
            >
              <h3
                className="pb-3"
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: col.accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)",
                  borderBottom: "1px solid var(--ed-rule)",
                }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className={`py-3.5 text-[15px] md:text-base leading-relaxed ${
                      col.accent ? "ed-fg" : "ed-fg-muted"
                    }`}
                    style={{
                      borderBottom: "1px solid var(--ed-rule)",
                      fontWeight: col.accent ? 500 : 400,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="ed-fg mt-9 max-w-3xl text-base leading-relaxed"
        >
          Nothing reaches an owner, a customer, or your books without a human approving
          it. The judgment was always the job. This is everything else.
        </motion.p>
      </SectionShell>

      {/* ── 8. What the team can carry ──────────────── */}
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-9"
        >
          <SectionHeadline>What the team can carry.</SectionHeadline>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          {COVERAGE.map((stat) => (
            <div
              key={stat.label}
              className="py-6 sm:pr-6"
              style={{ borderBottom: "1px solid var(--ed-rule)" }}
            >
              <p
                className="ed-fg-muted"
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  fontWeight: 600,
                  wordBreak: "break-word",
                }}
              >
                {stat.value}
              </p>
              <p className="ed-fg mt-3 text-[15px] leading-snug" style={{ fontWeight: 500 }}>
                {stat.label}
              </p>
              <p
                className="ed-fg-muted mt-2"
                style={{ fontFamily: MONO, fontSize: 11, wordBreak: "break-word" }}
              >
                {stat.source}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── 9. Proof ────────────────────────────────── */}
      <SectionShell alt>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-9"
        >
          <SectionHeadline>From a team that runs this.</SectionHeadline>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="ed-card overflow-hidden rounded-3xl"
          style={{ border: "1px solid var(--ed-border)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
            {/* Identity and metrics */}
            <div
              className="ed-card-alt flex flex-col gap-7 p-7 md:p-8"
              style={{ borderBottom: "1px solid var(--ed-border)" }}
            >
              <Image
                src="/logos/stories/divadance.png"
                alt="DivaDance"
                width={150}
                height={40}
                className="h-auto w-[130px] object-contain"
              />
              <div className="flex flex-col gap-1">
                <span
                  className="ed-fg-muted"
                  style={{ fontFamily: MONO, fontSize: 11.5, wordBreak: "break-word" }}
                >
                  {"{{TBD:divadance-network-size}}"}
                </span>
                <span className="ed-fg-muted text-sm">Dance fitness</span>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p
                    style={{
                      color: "var(--ed-accent-text)",
                      fontFamily: JAKARTA,
                      fontWeight: 500,
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    650+
                  </p>
                  <p className="ed-fg-muted mt-1.5 text-sm leading-snug">
                    support hours saved in six months
                  </p>
                </div>
                <div>
                  <p
                    className="ed-fg-muted"
                    style={{ fontFamily: MONO, fontSize: 12.5, wordBreak: "break-word" }}
                  >
                    {"{{TBD:divadance-metric-2}}"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="flex flex-col justify-between gap-7 p-7 md:p-9">
              <blockquote
                className="ed-fg"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 500,
                  fontSize: "clamp(1rem, 0.6rem + 0.85vw, 1.3125rem)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.015em",
                }}
              >
                &ldquo;Since we implemented EZee Assist, my owners not only get faster
                answers to their questions and a shorter path to the resources we have
                for them, but my human-power has been reallocated to coaching,
                relationship building, and innovation. The impact of that has led to
                increased owner retention, more topline revenue, and happier employees at
                my HQ!&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-3.5">
                  <Image
                    src="/photos/jami-stigliano-cut.png"
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-none rounded-full object-cover"
                    style={{ backgroundColor: "var(--ed-card-alt)" }}
                  />
                  <div>
                    <p className="ed-fg text-sm" style={{ fontWeight: 600 }}>
                      Jami Stigliano
                    </p>
                    <p className="ed-fg-muted text-sm">Founder &amp; CEO, DivaDance</p>
                  </div>
                </div>
                <Link
                  href="/case-studies/divadance"
                  className="ed-link text-sm"
                  style={{ fontWeight: 500 }}
                >
                  View the full case study &rarr;
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionShell>

      {/* ── 10. Questions coaches ask ───────────────── */}
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-8"
        >
          <SectionHeadline>What coaches ask first.</SectionHeadline>
        </motion.div>

        <div className="max-w-3xl" style={{ borderTop: "1px solid var(--ed-rule)" }}>
          {FAQ.map((item, i) => (
            <div key={item.q} style={{ borderBottom: "1px solid var(--ed-rule)" }}>
              <button
                className="flex w-full items-center justify-between gap-6 py-4 text-left transition-opacity hover:opacity-70"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span
                  className="ed-fg text-lg md:text-xl tracking-[-0.02em]"
                  style={{ fontFamily: JAKARTA, fontWeight: 500, lineHeight: 1.25 }}
                >
                  {item.q}
                </span>
                <span className="relative flex-shrink-0 block h-4 w-4" aria-hidden="true">
                  <span
                    className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: "var(--ed-fg-muted)" }}
                  />
                  <span
                    className="absolute left-1/2 top-0 h-4 w-[1.5px] rounded-full transition-transform duration-150"
                    style={{
                      backgroundColor: "var(--ed-fg-muted)",
                      transform:
                        openFaq === i
                          ? "translateX(-50%) rotate(90deg)"
                          : "translateX(-50%) rotate(0deg)",
                    }}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="ed-fg-muted pb-5 text-base md:text-lg leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── 11. Related ─────────────────────────────── */}
      <SectionShell alt>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {RELATED.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
            >
              <Link
                href={card.href}
                className="ed-card group flex h-full flex-col justify-between gap-8 rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
                style={{ border: "1px solid var(--ed-border)" }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "var(--ed-accent-text)",
                    }}
                  >
                    {card.eyebrow}
                  </span>
                  <p
                    className="ed-fg mt-3 text-lg tracking-[-0.02em]"
                    style={{ fontFamily: JAKARTA, fontWeight: 500, lineHeight: 1.25 }}
                  >
                    {card.title}
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--ed-accent-text)" }}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      {/* ── 12. Final CTA ───────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B2C48" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "left center" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.30)" }} />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(4,32,54,0.15) 0%, rgba(4,32,54,0) 35%)",
            }}
          />
          {/* Resolves to solid CLOSING_BASE so the footer picks it up with
              no seam. Change this and change the footer. */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)`,
            }}
          />
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
              color: "#FFFFFF",
              fontFamily: JAKARTA,
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)",
              maxWidth: "820px",
            }}
          >
            Bring us one of your territories.
          </h2>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(245,237,224,0.92)", maxWidth: "620px" }}
          >
            We&rsquo;ll build the Monday brief for it and show you what would have been
            waiting for you this week.
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
            <Link href="/contact" className="ed-btn ed-btn-secondary-dark inline-flex">
              See a sample brief
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
