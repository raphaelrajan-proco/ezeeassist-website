"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import {
  ACCENT, ACCENT_TINT, ACCENT_TINT_STRONG, CARD, DANGER, EASE, JAKARTA, MONO, WARN,
  Band, Eyebrow, GovernanceBand, Meta, Reveal, SectionHead, SourceChip, TextChip,
} from "@/components/platform/shared";

/**
 * /platform/answers — the Answers capability page.
 *
 * Built on the editorial system (DESIGN.md) and the section pattern the
 * homepage set: mono eyebrow, bold H2, one supporting line, then the
 * visual.
 *
 * Two rules from the brief are load-bearing and easy to undo by
 * accident:
 *
 *   1. **No accuracy percentage anywhere on this page.** It is
 *      unverifiable and it invites a demo designed to disprove it.
 *      Sections 5 and 8 make the stronger case by describing limits.
 *      The brief's own §6 row carried a "96% first-pass" figure; it is
 *      dropped here, both because of that rule and because the figure
 *      is not published anywhere on this site.
 *   2. **Ticketing is linked four times** — step 04, the won't-do list,
 *      the handoff, and Related. Not-answering is a designed path, and
 *      one link makes it look like a footnote.
 *
 * The §4 asymmetry is the argument: same question, same timestamp, one
 * card visibly longer with an extra source. Never equalise them.
 */

/* ── §2 ─────────────────────────────────────────────────
   Scattered, not tabulated. The copy says five questions arrive in five
   places and the answers drift; a sorted table would show that problem
   already solved. Offsets, widths and a fraction of a degree of
   rotation vary per message so the group reads as a pile someone has to
   work through. The offsets are desktop-only classes written out in
   full, because Tailwind scans source text and would not see them
   assembled at runtime. */
const INBOX: {
  time: string; store: string; channel: string; q: string;
  offset: string; width: string; rot: number; gap: string;
}[] = [
  { time: "8:41am", store: "#052", channel: "SMS",   q: "Refund policy on a cancelled booking?",
    offset: "md:ml-[1%]",  width: "md:max-w-[430px]", rot: -0.5, gap: "mt-0" },
  { time: "8:47am", store: "#118", channel: "Slack", q: "whats the refund rule for cancellations",
    offset: "md:ml-[19%]", width: "md:max-w-[405px]", rot: 0.6,  gap: "mt-2.5" },
  { time: "8:53am", store: "#331", channel: "Email", q: "Which report shows deposits?",
    offset: "md:ml-[6%]",  width: "md:max-w-[360px]", rot: -0.3, gap: "mt-1.5" },
  { time: "9:01am", store: "#402", channel: "Teams", q: "New hire Monday, what do I send?",
    offset: "md:ml-[27%]", width: "md:max-w-[390px]", rot: 0.7,  gap: "mt-3" },
  { time: "9:06am", store: "#214", channel: "SMS",   q: "Approval needed for a local promo?",
    offset: "md:ml-[11%]", width: "md:max-w-[420px]", rot: -0.45, gap: "mt-2" },
];

/* One hue per channel, so five arrivals read as five places rather than
   one list. Carried by a dot and the channel name, never by colour
   alone. */
const CHANNEL_HUE: Record<string, string> = {
  SMS: "#0E9F6E", Slack: "#7C3AED", Email: "#B45309", Teams: "#0077A8",
};

/* ── §3 ─────────────────────────────────────────────────── */
const STEPS: { n: string; title: string; body: string; difference?: boolean }[] = [
  { n: "01", title: "Asked",    body: "In SMS, WhatsApp, Slack, Teams, email, web, or mobile" },
  { n: "02", title: "Resolved", body: "Who is asking, what role, which locations", difference: true },
  { n: "03", title: "Searched", body: "Only material your brand has approved, at its current version" },
  { n: "04", title: "Answered", body: "In plain language, with the source cited" },
  { n: "05", title: "Logged",   body: "Question, answer, sources, and who asked — searchable", difference: true },
];

/* ── §5 ─────────────────────────────────────────────────
   The brief's category lines verbatim, each carrying a real artifact so
   the section reads as a system inventory rather than a bullet list.
   Every answer names its document, and this is what that looks like. */
const LEDGER: { category: string; artifact: string; system: string; state: string }[] = [
  { category: "SOPs, playbooks, and brand standards",     artifact: "brand-standards-2026.pdf", system: "SharePoint",   state: "v11 · current" },
  { category: "Training material and certification content", artifact: "new-hire-week-one.docx", system: "Trainual",   state: "v7 · current" },
  { category: "Policy documents and compliance rules",    artifact: "refund-policy-v4.pdf",     system: "Google Drive", state: "v4 · current" },
  { category: "Approved FAQs and past resolved tickets",  artifact: "ticket #4471",             system: "Resolved",     state: "approved by HQ" },
  { category: "Connected systems, where permitted",       artifact: "Toast · QuickBooks",       system: "Read-only",    state: "at the source" },
];

const WONT_DO: { text: string; link?: { label: string; href: string } }[] = [
  { text: "Answer from general internet knowledge" },
  { text: "Guess when your material doesn't cover it", link: { label: "it opens a ticket instead", href: "/platform/ticketing" } },
  { text: "Surface a document a person's role doesn't permit" },
  { text: "Serve a superseded version of a policy" },
  { text: "Use your content to train a model" },
];

/* ── §6 ─────────────────────────────────────────────────
   Illustrative, and labelled as such. No accuracy figure: the brief's
   own "96% first-pass" is dropped, per the rule at the top of this file. */
const INSIGHTS: { freq: string; topic: string; verdict: string; tone: "warn" | "ok" | "danger" }[] = [
  { freq: "Asked 340×", topic: "Refund edge cases",   verdict: "Policy covers 3 of 5 scenarios", tone: "warn" },
  { freq: "Asked 210×", topic: "New-hire first week", verdict: "Material is two versions old",   tone: "warn" },
  { freq: "Asked 190×", topic: "Promo stacking rules", verdict: "Answered cleanly, first pass",  tone: "ok" },
  { freq: "Asked 84×",  topic: "Lease renewal terms", verdict: "No approved content exists",     tone: "danger" },
];

/* ── §7 ─────────────────────────────────────────────────
   Two of the three timestamps are outside business hours on purpose.
   Do not move them into the working day; that is the whole point. */
const CHANNELS = ["SMS", "WhatsApp", "Slack", "Teams", "Google Chat", "Email", "Web", "Mobile"];
const OFF_HOURS: { when: string; channel: string; q: string }[] = [
  { when: "7:02am", channel: "SMS",      q: "What's the opening checklist for a stat holiday?" },
  { when: "1:40pm", channel: "Teams",    q: "Can I comp a service for a complaint without approval?" },
  { when: "9:20pm", channel: "WhatsApp", q: "Where does the cash count go after close?" },
];

/* ── §8 ─────────────────────────────────────────────────── */
const HANDOFF_CARDS = [
  { title: "Nothing is re-explained", body: "The person picking it up doesn't ask the location to start over." },
  { title: "Routed, not queued",      body: "By topic, territory, and load, not into a shared inbox." },
  { title: "It doesn't happen twice", body: "The resolution becomes approved content. The next person gets an answer." },
];

/* ── §10 ─────────────────────────────────────────────────
   Both figures are published in the case studies these cards link to.
   Do not add a third card with an unsourced number. */
const PROOF = [
  {
    stat: "94%", label: "AI deflection during the Mindbody migration",
    quote: "Our owners get accurate, brand-specific answers 24/7, not generic internet advice, while our team focuses on bigger initiatives. It's become part of daily operations, with franchisees telling each other, “Use Alpha!”",
    name: "Troy McCullen", role: "Vice President of Operations, DekaLash",
    logo: "/logos/stories/dekalash.png", alt: "DekaLash", href: "/case-studies/dekalash",
  },
  {
    stat: "67%", label: "ticket reduction in 30 days",
    quote: "EZee Assist is much more than just a chatbot. It truly made universal search possible at WSI, levelling the playing field for our franchisees across geographies and languages.",
    name: "Jeffrey Grant", role: "Systems Manager, WSI World",
    logo: "/logos/stories/wsi.svg", alt: "WSI", href: "/case-studies/wsi",
  },
];

const RELATED = [
  { eyebrow: "Ticketing", title: "What happens when it stops, and how it gets to the right person", href: "/platform/ticketing" },
  { eyebrow: "Reporting", title: "When the question is about numbers", href: "/platform/reporting" },
  { eyebrow: "Control Center", title: "How scoping and permissions are set", href: "/platform/control-center" },
];

/* ── Chat card, the page's signature artifact ─────────── */
function ChatCard({ meta, question, answer, extra, sources, timing, accent = false }: {
  meta: string;
  question: string;
  answer: string;
  extra?: string;
  sources: string[];
  timing: string;
  accent?: boolean;
}) {
  return (
    <div
      className="flex h-full flex-col p-5 md:p-6"
      style={{
        ...CARD,
        ...(accent
          ? { border: `1.5px solid ${ACCENT}`, boxShadow: "0 12px 40px -24px rgba(0,119,168,0.5)" }
          : {}),
      }}
    >
      <Meta>{meta}</Meta>

      <p
        className="ed-fg mt-4 text-[15px] md:text-base"
        style={{ fontWeight: 600, lineHeight: 1.45 }}
      >
        {question}
      </p>

      <div className="my-4" style={{ borderTop: "1px solid var(--ed-rule)" }} />

      <p className="ed-fg text-[15px] leading-relaxed">{answer}</p>
      {extra && <p className="ed-fg-muted mt-3 text-[15px] leading-relaxed">{extra}</p>}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        {sources.map((s) => <SourceChip key={s}>{s}</SourceChip>)}
        <span className="ed-fg-muted ml-auto" style={{ fontSize: 11.5 }}>{timing}</span>
      </div>
    </div>
  );
}

/* Photographic hero, matching the treatment the newer Platform pages use.
   `haze3` by request, so Answers, Integrations and Reporting each carry a
   different frame from the same hazy-blue family. The scrim is the
   sub-page value rather than the variant's own baseline: this band holds
   an eyebrow, an H1, a subhead, two CTAs and a product card. */
/* Assignment and the revert switch live in lib/data/platform-heroes.ts. */
const HERO = platformHero("answers");
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

export default function AnswersContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimRgba})` }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(58% 52% at 82% 12%, rgba(159,224,248,0.16) 0%, rgba(159,224,248,0) 70%)" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_minmax(0,480px)] lg:gap-14 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
                Answers
              </p>
              <h1
                className="mt-5 leading-[1.06] tracking-[-0.03em]"
                style={{
                  color: "#FFFFFF",
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  /* Two clauses, one line each from lg. Capped so the
                     longer clause clears the column at 1440. */
                  fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                  textWrap: "pretty",
                }}
              >
                Every question answered from your own material.{" "}
                <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Scoped to the person asking.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
                Your franchisees ask in the app they&rsquo;re already in. The answer comes
                back in seconds, from the document your brand approved, with the source
                attached.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                  Speak to an expert
                  <span className="ed-btn-arrow-badge" aria-hidden="true">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                </Link>
                {/* In-page anchor, not an external link: §4 is what this
                    reader wants to see. */}
                <a href="#scoping" className="ed-btn ed-btn-secondary-dark inline-flex">
                  See how scoping works
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            >
              <ChatCard
                meta="Store #118 · Shift lead · 9:14am"
                question="Can I run the summer promo alongside the loyalty offer?"
                answer="No. Promotions don't stack with loyalty redemptions. Apply the higher of the two and note it at close."
                sources={["summer-promo-guide.pdf", "loyalty-policy.pdf"]}
                timing="answered in 6s"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. What it replaces ───────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="The problem"
          title="The same five questions. Five channels. One inbox."
        />

        <div className="mt-8 flex items-baseline justify-between gap-4 md:mt-9">
          <Meta>Monday, 8:41 to 9:06 am</Meta>
          <Meta>5 questions · 1 person answering</Meta>
        </div>

        <div className="mt-5">
          {INBOX.map((m, i) => (
            <Reveal key={m.q} delay={i * 0.07} className={`${m.gap} ${m.offset} ${m.width}`}>
              <div
                className="px-4 py-3.5 md:px-5"
                style={{
                  ...CARD,
                  transform: `rotate(${m.rot}deg)`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 8px 24px -16px rgba(0,0,0,0.18)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block flex-none"
                    style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: CHANNEL_HUE[m.channel] }}
                  />
                  <Meta>{m.time} · Store {m.store} · {m.channel}</Meta>
                </div>
                <p className="ed-fg mt-2 text-[15px] leading-snug">{m.q}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-7" delay={0.1}>
          <div className="max-w-[620px]">
            <p className="ed-fg-muted text-[15px] leading-relaxed">
              Someone answers each one personally, and the answers drift.
            </p>
            <p className="ed-fg-muted text-[15px] leading-relaxed">
              The portal has it, in a PDF, from two versions ago.
            </p>
            <p className="ed-fg mt-1 text-base leading-relaxed" style={{ fontWeight: 500 }}>
              When nobody answers, the location decides anyway.
            </p>
          </div>
        </Reveal>
      </Band>

      {/* ── 3. How it works ───────────────────────────── */}
      <Band alt>
        <SectionHead
          eyebrow="How it works"
          title={<>Five steps, and two of them are the reason it&rsquo;s different.</>}
        />

        {/* A left-spined sequence rather than five stacked cards: the
            page already runs several row layouts, and a spine reads as
            a pipeline instead of another list. */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07} className="h-full">
              <div
                className="flex h-full flex-col p-5"
                style={{
                  ...CARD,
                  borderLeft: s.difference ? `3px solid ${ACCENT}` : "1px solid var(--ed-border)",
                  backgroundColor: s.difference ? ACCENT_TINT : "var(--ed-card)",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO, fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: s.difference ? ACCENT : "var(--ed-fg-muted)",
                  }}
                >
                  {s.n}
                </span>
                <p
                  className="ed-fg mt-3 text-[17px] tracking-[-0.02em]"
                  style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.2 }}
                >
                  {s.title}
                </p>
                <p className="ed-fg-muted mt-2 text-[14px] leading-relaxed">{s.body}</p>

                {s.difference && (
                  <span
                    className="mt-4 inline-flex w-fit items-center rounded-md px-2 py-0.5 uppercase"
                    style={{
                      fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", fontWeight: 700,
                      color: "#FFFFFF", backgroundColor: ACCENT,
                    }}
                  >
                    The difference
                  </span>
                )}

                {/* Step 04 forks here as well as in §8, so a reader who
                    never reaches the handoff still learns that
                    not-answering is designed rather than a failure. */}
                {s.n === "04" && (
                  <div className="mt-4 pt-4" style={{ borderTop: "1px dashed var(--ed-border)" }}>
                    <span
                      className="uppercase"
                      style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", fontWeight: 700, color: "var(--ed-fg-muted)" }}
                    >
                      Or handed off
                    </span>
                    <p className="ed-fg-muted mt-2 text-[13.5px] leading-relaxed">
                      Below your confidence threshold it becomes a{" "}
                      <Link href="/platform/ticketing" className="ed-link" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
                        ticket
                      </Link>
                      , with the full context attached.
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 4. Channels ─────────────────────────────────
          Sits directly under How it works on purpose: step 01 names the
          channels, and this elaborates that same fact. Seven sections
          apart they read as two separate enumerations of one list. */}
      <Band>
        <SectionHead eyebrow="Channels" title="Nobody logs in to ask a question." />

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((c) => <TextChip key={c} tone="accent">{c}</TextChip>)}
          </div>
        </Reveal>

        {/* Deliberately light chrome: the page already carries three
            card-heavy question layouts, so these are rules and text. */}
        <Reveal className="mt-9" delay={0.08}>
          <div style={{ borderTop: "1px solid var(--ed-rule)" }}>
            {OFF_HOURS.map((o) => (
              <div
                key={o.q}
                className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-6"
                style={{ borderBottom: "1px solid var(--ed-rule)" }}
              >
                <span className="flex-none md:w-[150px]">
                  <Meta>{o.when} · {o.channel}</Meta>
                </span>
                <span className="ed-fg text-[15px] md:text-base leading-snug">
                  &ldquo;{o.q}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-7" delay={0.12}>
          <p className="ed-fg max-w-[620px] text-[17px] leading-relaxed" style={{ fontWeight: 500 }}>
            The portal was never the problem. Nobody opens it during a shift.
          </p>
        </Reveal>
      </Band>

      {/* ── 5. Scoping ────────────────────────────────── */}
      <Band alt id="scoping">
        <SectionHead
          eyebrow="Scoping"
          accentEyebrow
          title="One question. Two roles. Two answers."
          sub="Role and location decide what comes back. Nobody sees a number they shouldn't."
        />

        {/* Identical question, identical timestamp. The right card runs
            longer and carries a third source. Do not equalise heights or
            normalise the chip counts: the asymmetry is the argument. */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 lg:items-start">
          <Reveal>
            <ChatCard
              meta="Store #118 · Shift lead · 9:14am"
              question="Can I run the summer promo alongside the loyalty offer?"
              answer="No. Promotions don't stack with loyalty redemptions. Apply the higher of the two and note it at close."
              sources={["summer-promo-guide.pdf", "loyalty-policy.pdf"]}
              timing="6s"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <ChatCard
              accent
              meta="West territory · District manager · 9:14am"
              question="Can I run the summer promo alongside the loyalty offer?"
              answer="No, they don't stack. Apply the higher of the two."
              extra="Across your 12 locations, stacking would cost about 4 points of margin on affected tickets. Three stores have applied it in error this month."
              sources={["summer-promo-guide.pdf", "loyalty-policy.pdf", "margin-by-location"]}
              timing="6s"
            />
          </Reveal>
        </div>

        <Reveal className="mt-8" delay={0.15}>
          <p className="ed-fg max-w-[760px] text-[17px] leading-relaxed" style={{ fontWeight: 500 }}>
            Same question, same source. The shift lead gets the rule. The district manager
            gets the rule and what it&rsquo;s costing them.
          </p>
        </Reveal>
      </Band>

      {/* ── 6. Sources ────────────────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="Sources"
          title="It answers from your material. Nothing else."
        />

        {/* A ledger, not a bullet list: the categories the brief names,
            each carrying the artifact it actually reads and where that
            artifact lives. "Every answer names its document" is easier
            to believe when the documents are on the page. */}
        <Reveal className="mt-9">
          <div style={CARD} className="overflow-hidden">
            <div
              className="flex flex-wrap items-center justify-between gap-2 px-5 py-3"
              style={{ borderBottom: "1px solid var(--ed-rule)", backgroundColor: "var(--ed-card-alt)" }}
            >
              <Meta>Reads from</Meta>
              <Meta>In place · nothing copied</Meta>
            </div>

            {LEDGER.map((r, i) => (
              <div
                key={r.category}
                className="grid grid-cols-1 gap-2 px-5 py-4 md:grid-cols-[1.25fr_1fr_auto] md:items-center md:gap-6"
                style={i > 0 ? { borderTop: "1px solid var(--ed-rule)" } : undefined}
              >
                <span className="ed-fg text-[15px] leading-snug">{r.category}</span>
                <span
                  className="ed-fg-muted"
                  style={{ fontFamily: MONO, fontSize: 12.5, wordBreak: "break-word" }}
                >
                  {r.artifact}
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  <TextChip>{r.system}</TextChip>
                  <Meta>{r.state}</Meta>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-4" delay={0.08}>
          <p className="ed-fg text-base leading-relaxed" style={{ fontWeight: 500 }}>
            Any format, wherever it already lives. Nothing migrates.
          </p>
        </Reveal>

        {/* The refusals get the opposite treatment: struck, muted, X'd.
            A capability page that only lists capabilities is not
            credible; the limits are the proof. */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="mb-4">
            <Eyebrow>Won&rsquo;t do</Eyebrow>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
            {WONT_DO.map((w) => (
              <li
                key={w.text}
                className="flex items-start gap-3 py-3"
                style={{ borderTop: "1px solid var(--ed-rule)" }}
              >
                <X
                  className="mt-0.5 h-3.5 w-3.5 flex-none"
                  strokeWidth={2.5}
                  style={{ color: DANGER }}
                  aria-hidden="true"
                />
                <span className="ed-fg-muted text-[15px] leading-snug">
                  {w.text}
                  {w.link && (
                    <>
                      {" — "}
                      <Link
                        href={w.link.href}
                        style={{ color: "var(--ed-accent-text)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}
                      >
                        {w.link.label}
                      </Link>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8" delay={0.12}>
          <p className="ed-fg max-w-[720px] text-[17px] leading-relaxed" style={{ fontWeight: 500 }}>
            Not another file management platform. It learns from your content wherever it
            already lives.
          </p>
          <p className="ed-fg-muted mt-2 max-w-[720px] text-[15px] leading-relaxed">
            Every answer names the document it came from. If the material is wrong, you can
            see exactly what to fix.
          </p>
        </Reveal>
      </Band>

      {/* ── 7. Content insights ───────────────────────── */}
      <Band alt id="content-insights">
        <SectionHead
          eyebrow="Content insights"
          title="Every question is a signal about your material."
          sub="You see what your network is asking, what your content answered well, and where it fell short."
        />

        <Reveal className="mt-9">
          <div style={CARD} className="overflow-hidden">
            <div
              className="px-5 py-3"
              style={{ borderBottom: "1px solid var(--ed-rule)", backgroundColor: "var(--ed-card-alt)" }}
            >
              <Meta>This month · 214 locations</Meta>
            </div>
            {INSIGHTS.map((r, i) => {
              const tone = r.tone === "ok" ? ACCENT : r.tone === "warn" ? WARN : DANGER;
              return (
                <div
                  key={r.topic}
                  className="grid grid-cols-1 gap-1.5 px-5 py-4 sm:grid-cols-[110px_1fr] md:grid-cols-[110px_240px_1fr] md:items-center md:gap-6"
                  style={i > 0 ? { borderTop: "1px solid var(--ed-rule)" } : undefined}
                >
                  <span
                    className="ed-fg-muted"
                    style={{ fontFamily: MONO, fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}
                  >
                    {r.freq}
                  </span>
                  <span className="ed-fg text-[15px]" style={{ fontWeight: 500 }}>{r.topic}</span>
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block flex-none"
                      style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: tone }}
                    />
                    <span style={{ color: tone, fontSize: 14, fontWeight: 500 }}>{r.verdict}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-5" delay={0.08}>
          <p className="ed-fg-muted text-xs">
            Illustrative. Figures show the shape of the report, not a customer&rsquo;s data.
          </p>
          <p className="ed-fg mt-4 max-w-[720px] text-[17px] leading-relaxed" style={{ fontWeight: 500 }}>
            Most brands find out their documentation has a gap when a location gets it
            wrong. This tells you before that happens.
          </p>
          <Link href="/platform/reporting" className="ed-link mt-5 inline-block text-sm" style={{ fontWeight: 500 }}>
            See the full picture &rarr;
          </Link>
        </Reveal>
      </Band>

      {/* ── 8. The handoff ────────────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="The handoff · powered by Ticketing"
          accentEyebrow
          title="It stops before it guesses. Then it gets you a person."
          sub={<>Below the confidence threshold you set, the question stops being an answer and becomes a ticket, with everything already attached.</>}
        />

        <Reveal className="mt-9">
          <div style={CARD} className="overflow-hidden">
            <div
              className="px-5 py-3"
              style={{ borderBottom: "1px solid var(--ed-rule)", backgroundColor: "var(--ed-card-alt)" }}
            >
              <Meta>Ticket #4471 · Opened 2:14pm · Store #087</Meta>
            </div>

            {[
              { label: "Question", value: <>Customer wants a refund outside the 14-day window. They&rsquo;re a 6-year member. What are my options?</> },
              { label: "Why it stopped", value: <>Confidence below threshold. Policy covers the window, not the tenure exception.</> },
              {
                label: "Attached",
                value: (
                  <span className="flex flex-col gap-1">
                    <span>Full conversation, including the two follow-ups</span>
                    <span>Sources checked &mdash; refund-policy-v4.pdf, membership-terms.pdf</span>
                    <span>Store #087, 6-year member, $2,400 lifetime value</span>
                    <span>Owner&rsquo;s approval limit and this month&rsquo;s exception count</span>
                  </span>
                ),
              },
              { label: "Routed to", value: <>Dana R. · West territory · replied in 34 minutes</> },
            ].map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1.5 px-5 py-4 md:grid-cols-[130px_1fr] md:gap-6"
                style={i > 0 ? { borderTop: "1px solid var(--ed-rule)" } : undefined}
              >
                <span className="pt-0.5"><Meta>{row.label}</Meta></span>
                <span className="ed-fg text-[15px] leading-relaxed">{row.value}</span>
              </div>
            ))}

            {/* The row that closes the loop from ticket back to answer.
                Its own divider, accent label, second sentence bold. This
                is the point of the section; do not cut it. */}
            <div
              className="grid grid-cols-1 gap-1.5 px-5 py-4 md:grid-cols-[130px_1fr] md:gap-6"
              style={{ borderTop: "2px solid var(--ed-border)", backgroundColor: ACCENT_TINT }}
            >
              <span className="pt-0.5"><Meta color={ACCENT}>After</Meta></span>
              <span className="ed-fg text-[15px] leading-relaxed">
                Resolution approved by HQ and added to the policy.{" "}
                <strong style={{ fontWeight: 700 }}>
                  Asked 11 more times since. Answered in 6 seconds each time.
                </strong>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {HANDOFF_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="h-full p-5" style={CARD}>
                <p className="ed-fg text-[16px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
                  {c.title}
                </p>
                <p className="ed-fg-muted mt-2 text-[14.5px] leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8" delay={0.1}>
          <p className="ed-fg text-[19px] leading-snug" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
            The same question doesn&rsquo;t reach a person twice.
          </p>
          <Link
            href="/platform/ticketing"
            className="mt-3 inline-block text-[15px]"
            style={{ color: "var(--ed-accent-text)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}
          >
            How escalation and routing work &rarr;
          </Link>
        </Reveal>
      </Band>

      {/* ── 9. Governance ─────────────────────────────── */}
      <GovernanceBand
        href="/platform/control-center"
        cta="How Control Center works →"
        items={[
          { label: "Set at HQ",  body: "What can be answered without a human, and by whom" },
          { label: "Logged",     body: "Every question, answer, and source — searchable, exportable" },
          { label: "Scoped",     body: "Role and location, enforced on every response" },
          { label: "Your data",  body: "No model training on your content. Ever.", emphasis: true },
        ]}
      />

      {/* ── 10. Proof ─────────────────────────────────── */}
      <Band alt>
        <SectionHead title="What it did in someone else's network." />

        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {PROOF.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <Link href={p.href} className="group flex h-full flex-col p-6 md:p-7 transition-transform hover:-translate-y-0.5" style={CARD}>
                <div className="flex items-center justify-between gap-4">
                  <Image src={p.logo} alt={p.alt} width={140} height={36} className="h-auto w-[110px] object-contain" />
                  <span
                    style={{
                      fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem",
                      lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ed-accent-text)",
                    }}
                  >
                    {p.stat}
                  </span>
                </div>
                <p className="ed-fg-muted mt-2 text-right text-[13.5px]">{p.label}</p>

                <blockquote
                  className="ed-fg mt-6 flex-1 text-[15px] md:text-base leading-relaxed"
                  style={{ fontFamily: JAKARTA, fontWeight: 500 }}
                >
                  &ldquo;{p.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="ed-fg text-sm" style={{ fontWeight: 600 }}>{p.name}</p>
                    <p className="ed-fg-muted text-sm">{p.role}</p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 flex-none transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--ed-accent-text)" }}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 11. Related ───────────────────────────────── */}
      <Band>
        {/* Ticketing first, deliberately: the fork out of this page
            matters more than the two adjacent capabilities. */}
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

      {/* ── 12. CTA ───────────────────────────────────── */}
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
            Send us the five questions you answer most.
          </h2>
          <p className="mt-5 max-w-[620px] text-base md:text-lg leading-relaxed" style={{ color: "rgba(245,237,224,0.92)" }}>
            We&rsquo;ll show you what comes back, from your own material, scoped the way your
            network is.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <Link href="/solutions/coaches" className="ed-btn ed-btn-secondary-dark inline-flex">
              See how brands set it up
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
