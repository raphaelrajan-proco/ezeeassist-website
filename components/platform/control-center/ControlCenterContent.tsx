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
import RoleAnswers from "./RoleAnswers";

/**
 * /platform/control-center
 *
 * **The split with Trust Center is the most important rule here.**
 *
 *   Control Center (this page)  what HQ configures — policies,
 *                               permissions, approval gates, the activity
 *                               log, model choice
 *   Trust Center (/security)    what EZee guarantees — SOC 2, encryption,
 *                               subprocessors, DPA, incident response,
 *                               data residency
 *
 * **No certifications, encryption detail, subprocessor lists or compliance
 * badges belong on this page.** One pointer to Trust Center, no more.
 * Duplicating that content makes both pages weaker and confuses which one
 * a security reviewer should read.
 *
 * **The argument is consolidation, not deficiency.** AI adoption in a
 * franchise network happened in a dozen places at once. That is an
 * architectural condition, not a failure of anyone's IT function.
 * **Nothing here may imply the franchisor lacks IT capability or control** —
 * this page's whole job is being forwarded, and a page that reads as an
 * accusation does not get forwarded. §2's left panel names the situation;
 * only the HQ row carries a warning tint, and even that names the
 * condition rather than blaming anyone.
 *
 * **Governance is a reason to buy, not reassurance.** The page reads as
 * capability, not as a compliance appendix.
 *
 * Band sequence, part of the spec: dark, light, light, dark, light, light,
 * dark, light, light, dark. §5 and §6 are adjacent and both light, so §5
 * is a dense log artifact and §6 is a single diagram plus three points.
 * They must not both read as lists.
 *
 * Deviations: the hero is the **photographic** treatment on
 * `HERO_BG.haze2`, not the flat gradient the brief describes. Requested
 * directly.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const WARN = "#B45309";

const HERO = HERO_BG.haze2;

/* ── §1 ─────────────────────────────────────────────────────
   The last row renders OFF, and that is deliberate. A surface where every
   toggle is ON reads as marketing; one switch off, and it being the one
   about training on their content, reads as a real settings screen. Do not
   "fix" this to all-ON. */
const POLICY_SURFACE: { label: string; on: boolean }[] = [
  { label: "Answers from approved sources only",       on: true },
  { label: "Cite the source on every answer",          on: true },
  { label: "Scope by role and location",               on: true },
  { label: "Customer-facing sends require approval",   on: true },
  { label: "Franchisee-built tools require HQ review", on: true },
  { label: "Model training on your content",           on: false },
];

/* ── §2 ─────────────────────────────────────────────────────
   Every row is neutral. Only the HQ row is tinted, and it names the
   situation rather than blaming anyone. */
const SEPARATE: { who: string; what: string; warn?: boolean }[] = [
  { who: "Franchisees", what: "Their own tools, their own prompts, their own data" },
  { who: "Coaches",     what: "Whatever helps, chosen individually" },
  { who: "Marketing",   what: "One assistant" },
  { who: "IT",          what: "A different one" },
  { who: "Support",     what: "Something built into the helpdesk" },
  { who: "HQ",          what: "A policy document nobody can enforce", warn: true },
];

const ONE_SYSTEM: { who: string; what: string }[] = [
  { who: "One policy set",       what: "Written once, applied everywhere" },
  { who: "One permission model", what: "Role and location, enforced on every response" },
  { who: "One activity log",     what: "Every question, answer, and action, in one place" },
  { who: "One approval line",    what: "The same rule in every channel" },
  { who: "One place to change",  what: "Move something, and every location follows" },
];

/* ── §3 ─────────────────────────────────────────────────────
   A settings surface, not a capability list. A franchisor reading a list
   of what a product won't do feels constrained; one reading a dial they
   control feels equipped. Illustration only — deliberately not
   interactive. */
const POLICY_ROWS: { action: string; alone: boolean }[] = [
  { action: "Answering from approved material",        alone: true },
  { action: "Opening a ticket and routing it",         alone: true },
  { action: "Compliance checks and evidence collection", alone: true },
  { action: "Assembling briefs and reports",           alone: true },
  { action: "Nudging an internal deadline",            alone: true },
  { action: "Drafting a customer message",             alone: false },
  { action: "Sending to a customer",                   alone: false },
  { action: "Posting to a public channel",             alone: false },
  { action: "Anything touching pricing or the books",  alone: false },
  { action: "Publishing a tool network-wide",          alone: false },
];

const POLICY_POINTS: { title: string; body: string }[] = [
  { title: "One policy, everywhere",     body: "The line applies in Teams, SMS, the app, and every workflow. There is no channel where it's looser." },
  { title: "Different by brand or region", body: "Multi-brand and multi-jurisdiction networks can set a different line per brand, per region, or per location." },
  { title: "Changeable in a sentence",   body: "Move something across the line and every future action follows immediately. Nothing needs rebuilding." },
];

/* ── §4 ───────────────────────────────────────────────────── */
const PERMISSION_POINTS: { title: string; body: string }[] = [
  { title: "Inherited, not rebuilt",  body: "You don't re-model your org in here. It reads what your systems already enforce and layers your rules on top." },
  { title: "Enforced per response",   body: "Scoping applies to every answer, every report, every action, not once at sign-in." },
  { title: "Independent owners stay independent", body: "An owner's numbers are commercially sensitive and contractually theirs. That boundary is structural, not a setting someone could turn off." },
];

/* ── §5 ─────────────────────────────────────────────────────
   The log must include human actions, not only system ones: entries 3 and
   5 have named people approving and publishing, which is what a dispute
   would actually need. */
const LOG: { time: string; actor: string; action: string; detail: string }[] = [
  { time: "09:14", actor: "Store #118 · shift lead · asked",  action: "Promo stacking rules",           detail: "Answered from summer-promo-guide.pdf, loyalty-policy.pdf" },
  { time: "10:05", actor: "Store #214 · owner · asked",       action: "National retail pricing",        detail: "Answered · peer range surfaced from 4 locations" },
  { time: "11:40", actor: "Store #263 · system · drafted",    action: "Review response",                detail: "Held for owner approval · approved 11:52 by Maria S." },
  { time: "14:20", actor: "Store #087 · system · escalated",  action: "Refund outside policy",          detail: "Ticket #4471 · routed to Dana R. · replied 34m" },
  { time: "16:02", actor: "HQ · Priya N. · published",        action: "Partner promo standing rule",    detail: "Applied to 214 locations" },
];

const LOG_POINTS: { title: string; body: string }[] = [
  { title: "Shadow AI becomes visible AI", body: "Everything your network does with AI happens in one place, and you can see all of it." },
  { title: "Attributable",                 body: "Person, location, role, channel, timestamp, and the sources used." },
  { title: "Searchable and exportable",    body: "By location, by person, by topic, by date. Out in a format your counsel can use." },
  { title: "Retained on your terms",       body: "You set the retention period." },
];

/* ── §6 ─────────────────────────────────────────────────────
   No model vendor is named. The list dates fast, and the claim is about
   swappability rather than about who is in the slot today. */
const MODEL_POINTS: { title: string; body: string }[] = [
  { title: "Chosen per task",         body: "Different models are better at different things. You're not locked to one for everything." },
  { title: "Swapped without rebuilding", body: "Nothing you've configured, published, or authored has to change when the underlying model does." },
  { title: "Constrained the same way", body: "Whichever model runs, your policy set, permissions, and approval gates apply identically." },
];

/* ── §7 ─────────────────────────────────────────────────────
   IT and Security first: security review is where enterprise deals stall.
   The Franchisees row stays — including the person being governed in a
   list of stakeholders signals the rollout survives contact with owners.
   One line per row; this is a routing table, not seven arguments. */
const REVIEW: { fn: string; ask: string; where: string; href: string }[] = [
  { fn: "IT and Security", ask: "Where does our data sit, who processes it, is it used for training, how does SSO work?", where: "Trust Center", href: "/security" },
  { fn: "Legal",           ask: "What's logged, how long is it retained, and does this sit inside our franchise agreement?", where: "The log, above", href: "#the-log" },
  { fn: "Compliance",      ask: "Can we produce an audit trail if a location disputes something?", where: "The log, above", href: "#the-log" },
  { fn: "Operations",      ask: "What runs without a person, and can we change that line?", where: "Policy, above", href: "#policy" },
  { fn: "Marketing",       ask: "Does anything generated stay on brand, and who approves what goes out?", where: "Policy, above", href: "#policy" },
  { fn: "Franchisees",     ask: "What can HQ see about my business?", where: "Franchisees page", href: "/industries/franchising/multi-unit-franchisees" },
  { fn: "Finance",         ask: "What does this replace, and what does it avoid?", where: "ROI calculator", href: "/roi-calculator" },
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Trust Center", title: "How your data is handled, stored, and protected",  href: "/security" },
  { eyebrow: "Workflows",    title: "Where the approval line applies in practice",      href: "/platform/workflows" },
  { eyebrow: "Franchisees",  title: "What an owner sees on their side of the boundary", href: "/industries/franchising/multi-unit-franchisees" },
];

export default function ControlCenterContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${SCRIM.heroSubPage})` }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(58% 52% at 82% 12%, rgba(159,224,248,0.16) 0%, rgba(159,224,248,0) 70%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Control Center
            </p>
            <h1
              className="mt-5 max-w-[880px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                /* Ceiling derived at 1440: the longer clause measures
                   ~680px at 40px inside the 880px cap. Break is lg-only. */
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              Your standards have always been contractual.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Now they&rsquo;re enforceable.</span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              One policy set, one permission model, one log, applied across every location, every
              channel, and every department. Set once at HQ. Nobody can work around it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#permissions" className="ed-btn ed-btn-secondary-dark inline-flex">See how permissions work</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-12 w-full max-w-[620px]"
          >
            <div
              className="overflow-hidden rounded-[14px]"
              style={{
                backgroundColor: "rgba(4,26,44,0.55)", border: `1px solid ${ON_DARK_RULE}`,
                backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <div className="px-5 py-3.5" style={{ borderBottom: `1px solid ${ON_DARK_RULE}` }}>
                <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_DIM }}>
                  Network policy · 214 locations · applied
                </span>
              </div>
              <div className="px-5 py-1">
                {POLICY_SURFACE.map((r, i) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-4 py-3"
                    style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_DARK_RULE}` }}
                  >
                    <span className="min-w-0 flex-1 text-[13.5px] leading-snug" style={{ color: r.on ? ON_IMAGE : ON_DARK_DIM }}>
                      {r.label}
                    </span>
                    {/* State by shape and label, not colour alone. */}
                    <span
                      className="flex flex-none items-center gap-2 rounded-full px-2 py-1"
                      style={{
                        backgroundColor: r.on ? "rgba(159,224,248,0.12)" : "rgba(245,237,224,0.06)",
                        border: `1px solid ${r.on ? "rgba(159,224,248,0.34)" : "rgba(245,237,224,0.18)"}`,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="h-[7px] w-[7px] rounded-full"
                        style={r.on ? { backgroundColor: ON_DARK_ACCENT } : { border: `1.5px solid ${ON_DARK_DIM}` }}
                      />
                      <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", fontWeight: 700, color: r.on ? ON_DARK_ACCENT : ON_DARK_DIM }}>
                        {r.on ? "ON" : "OFF"}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. One system ─────────────────────────────────
          The only section discussing the current state. Fragmentation, not
          failure: every row is neutral except the HQ one, and that names
          the condition rather than blaming anyone. */}
      <Band>
        <SectionHead
          eyebrow="One system"
          title="One AI across your whole network. Not a dozen, running separately."
          sub="Your locations, your departments, and your coaches are already using AI. Right now every one of them is a separate decision, with separate rules and no shared record."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal>
            <div className="flex h-full flex-col overflow-hidden" style={CARD}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
                <Meta>Separate decisions</Meta>
              </div>
              <div className="px-5 py-1 md:px-6">
                {SEPARATE.map((r, i) => (
                  <div key={r.who} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-5" style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}>
                    <span className="flex-none sm:w-[104px]" style={{ fontFamily: MONO, fontSize: 12, fontWeight: r.warn ? 700 : 500, color: r.warn ? WARN : "var(--ed-fg)" }}>
                      {r.who}
                    </span>
                    <span className="min-w-0 flex-1 text-[14px] leading-relaxed" style={r.warn ? { color: WARN, fontWeight: 600 } : { color: "var(--ed-fg-muted)" }}>
                      {r.what}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden" style={{ ...CARD, borderLeft: "3px solid #0077A8" }}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: ACCENT_TINT, borderBottom: "1px solid rgba(0,119,168,0.18)" }}>
                <Meta color="var(--ed-accent-text)">One system</Meta>
              </div>
              <div className="px-5 py-1 md:px-6">
                {ONE_SYSTEM.map((r, i) => (
                  <div key={r.who} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-5" style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}>
                    <span className="ed-fg flex-none text-[13.5px] sm:w-[150px]" style={{ fontWeight: 600 }}>{r.who}</span>
                    <span className="ed-fg-muted min-w-0 flex-1 text-[14px] leading-relaxed">{r.what}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="ed-fg mt-9 max-w-[760px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 22, lineHeight: 1.35 }}>
            Governing one system is a decision. Governing twelve is a project nobody finishes.
          </p>
        </Reveal>
      </Band>

      {/* ── 3. Policy ─────────────────────────────────────
          A settings surface, not a capability list, and deliberately not
          interactive: it is an illustration of a dial the reader controls. */}
      <Band alt id="policy">
        <SectionHead
          eyebrow="Policy"
          title="You draw the line. Everything on the far side stops for a person."
          sub="Set once at HQ, applied at every location, in every channel."
        />

        <Reveal>
          <div className="mt-10 max-w-[820px] overflow-hidden" style={CARD}>
            <div className="flex gap-4 px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <span className="flex-1"><Meta>Action</Meta></span>
              <span className="w-[86px] flex-none text-center"><Meta>Runs alone</Meta></span>
              <span className="w-[60px] flex-none text-center"><Meta>Waits</Meta></span>
            </div>
            <div className="px-5 md:px-6">
              {POLICY_ROWS.map((r, i) => (
                <div key={r.action} className="flex items-center gap-4 py-3" style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}>
                  <span className="ed-fg min-w-0 flex-1 text-[14px] leading-snug">{r.action}</span>
                  <span className="flex w-[86px] flex-none justify-center">
                    <Dot filled={r.alone} />
                  </span>
                  <span className="flex w-[60px] flex-none justify-center">
                    <Dot filled={!r.alone} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
          {POLICY_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <p className="ed-fg mt-9 max-w-[680px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            The defaults are conservative. The line is yours to move in either direction.
          </p>
        </Reveal>
      </Band>

      {/* ── 4. Permissions ────────────────────────────────
          The section that carries the page. Deeper than the hero. */}
      <section id="permissions" className="w-full scroll-mt-24" style={{ background: "linear-gradient(180deg, #0D2836 0%, #091C26 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Permissions
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              The same question. Four people.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Four different answers.</span>
            </h2>
            <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Role and location decide what any answer, report, or action can include. Enforced on
              every response, not at login.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              className="mt-10 max-w-[720px] tracking-[-0.02em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 500, fontSize: 20, lineHeight: 1.35 }}
            >
              &ldquo;How did we do on attach rate last month?&rdquo;
            </p>
          </Reveal>

          <div className="mt-9 max-w-[900px]">
            <RoleAnswers />
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 max-w-[820px] pt-8" style={{ borderTop: `1px solid ${ON_DARK_RULE}` }}>
              <p className="text-[15px] leading-relaxed" style={{ color: ON_DARK }}>
                Nobody sees another owner&rsquo;s numbers. Not by policy, by the permissions your
                systems already enforce, inherited at the connection.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
            {PERMISSION_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <p className="text-[15px]" style={{ color: "#FFFFFF", fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: ON_DARK_DIM }}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. The log ────────────────────────────────────
          Dense on purpose. Includes human actions, not only system ones:
          entries 3 and 5 have named people approving and publishing, which
          is what a dispute would actually need. */}
      <Band id="the-log">
        <SectionHead
          eyebrow="The log"
          title="Every question, answer, action, and approval. With its sources."
          sub="Searchable, exportable, and attributable to a person and a location."
        />

        <Reveal>
          <div className="mt-10 max-w-[880px] overflow-hidden" style={CARD}>
            <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <Meta>Activity · West territory · last 24 hours</Meta>
            </div>
            <div className="px-5 py-1 md:px-6">
              {LOG.map((e, i) => (
                <div key={e.time} className="py-4" style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}>
                  {/* Timestamp above the actor line below sm, beside it
                      above, so nothing truncates on a phone. */}
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
                    <span className="ed-fg-muted flex-none sm:w-[52px]" style={{ fontFamily: MONO, fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
                      {e.time}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-5">
                        <span className="ed-fg text-[14px]" style={{ fontWeight: 500 }}>{e.actor}</span>
                        <span className="ed-fg flex-none text-[14px] md:text-right" style={{ fontWeight: 600 }}>{e.action}</span>
                      </div>
                      <p className="ed-fg-muted mt-1.5 text-[13px] leading-relaxed">{e.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {LOG_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Aimed at legal. Keep it. */}
        <Reveal delay={0.14}>
          <p className="ed-fg mt-9 max-w-[720px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            If someone asks what your network has been asking an AI, you have an answer.
          </p>
        </Reveal>
      </Band>

      {/* ── 6. Model choice ───────────────────────────────
          §5 is dense, so this reads lighter and more open: one diagram and
          three points, not another list. No model vendor is named. */}
      <Band alt>
        <SectionHead
          eyebrow="Model choice"
          title="The best model for a task changes every few months. Your platform shouldn't."
        />

        <Reveal>
          <div className="mt-10 max-w-[640px]">
            {[0, 1].map((half) => (
              <div key={half}>
                {half === 1 && (
                  <div className="flex justify-center">
                    <span aria-hidden="true" className="h-6 w-px" style={{ backgroundColor: "var(--ed-border)" }} />
                  </div>
                )}
                {half === 1 && (
                  /* The only interchangeable part. Everything framing it
                     is repeated above and below to make that literal. */
                  <div
                    className="rounded-[12px] px-5 py-5 text-center"
                    style={{ backgroundColor: ACCENT_TINT, border: "1px dashed rgba(0,119,168,0.42)" }}
                  >
                    <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, color: "var(--ed-accent-text)" }}>
                      Model provider
                    </p>
                    <p className="ed-fg-muted mt-1.5 text-[13px]">swappable</p>
                  </div>
                )}
                <div className={half === 1 ? "flex justify-center" : ""}>
                  {half === 1 && <span aria-hidden="true" className="h-6 w-px" style={{ backgroundColor: "var(--ed-border)" }} />}
                </div>
                <div
                  className="rounded-[12px] px-5 py-4 text-center"
                  style={{ border: "1px solid var(--ed-border)", backgroundColor: "var(--ed-card)" }}
                >
                  <p className="ed-fg text-[13.5px]" style={{ fontWeight: 600 }}>
                    Your policies · your permissions · your plays · your log
                  </p>
                  <p className="ed-fg-muted mt-1 text-[12px]">unchanged</p>
                </div>
                {half === 0 && (
                  <div className="flex justify-center">
                    <span aria-hidden="true" className="h-6 w-px" style={{ backgroundColor: "var(--ed-border)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
          {MODEL_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <p className="ed-fg mt-9 max-w-[720px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            The question isn&rsquo;t which model is best today. It&rsquo;s whether you&rsquo;ll have
            to rebuild when that changes.
          </p>
        </Reveal>
      </Band>

      {/* ── 7. Review-ready ───────────────────────────────
          A routing table, one line per row. IT and Security first, because
          security review is where enterprise deals stall. */}
      <section className="w-full" style={{ background: "linear-gradient(180deg, #0B2C48 0%, #071B29 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_DIM }}>
              Review-ready
            </p>
            <h2
              className="mt-4 max-w-[860px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              You&rsquo;ll have to answer to six people.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Here&rsquo;s what each of them usually asks.</span>
            </h2>
            <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Most of this deal happens in rooms we&rsquo;re not in. This is the material for those
              rooms.
            </p>
          </Reveal>

          {/* Stacked rows rather than a scrolling table at narrow widths. */}
          <div className="mt-10 max-w-[980px]">
            {REVIEW.map((r, i) => (
              <Reveal key={r.fn} delay={i * 0.06}>
                <div className="flex flex-col gap-2 py-4 lg:flex-row lg:items-baseline lg:gap-8" style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_DARK_RULE}` }}>
                  <span className="flex-none text-[15px] lg:w-[160px]" style={{ color: "#FFFFFF", fontWeight: 600 }}>{r.fn}</span>
                  <span className="min-w-0 flex-1 text-[14px] leading-relaxed" style={{ color: ON_DARK_DIM }}>{r.ask}</span>
                  {r.href.startsWith("#") ? (
                    <a href={r.href} className="flex-none text-[13.5px] lg:w-[168px] lg:text-right" style={{ color: ON_DARK_ACCENT, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}>
                      {r.where} &rarr;
                    </a>
                  ) : (
                    <Link href={r.href} className="flex-none text-[13.5px] lg:w-[168px] lg:text-right" style={{ color: ON_DARK_ACCENT, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}>
                      {r.where} &rarr;
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <p className="mt-9 max-w-[720px] tracking-[-0.02em]" style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
              Send this page to whichever of them asks first.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 8. Proof ──────────────────────────────────────── */}
      <Band>
        <SectionHead title="Rolled out across a governed network." />
        <Reveal>
          <div className="mt-9 max-w-[820px] p-6 md:p-8" style={CARD}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              {/* Deliberately not <Meta>: it force-uppercases, and the
                  placeholder rule says render the token exactly as written. */}
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
                {"{{TBD:control-center-proof-brand}}"}
              </span>
              <span style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ed-accent-text)" }}>
                {"{{TBD:control-center-proof-metric}}"}
              </span>
            </div>
            <blockquote className="ed-fg mt-6 text-[15px] md:text-base leading-relaxed" style={{ fontFamily: JAKARTA, fontWeight: 500 }}>
              &ldquo;{"{{TBD:control-center-proof-quote}}"}&rdquo;
            </blockquote>
            <p className="ed-fg-muted mt-5 text-sm">{"{{TBD:control-center-proof-attribution}}"}</p>
          </div>
        </Reveal>
      </Band>

      {/* ── 9. Related ────────────────────────────────────── */}
      <Band alt>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.08}>
              <Link href={r.href} className="group flex h-full flex-col justify-between gap-8 p-6 transition-transform hover:-translate-y-0.5" style={CARD}>
                <div>
                  <Eyebrow accent>{r.eyebrow}</Eyebrow>
                  <p className="ed-fg mt-3 text-[17px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 500, lineHeight: 1.3 }}>
                    {r.title}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--ed-accent-text)" }} strokeWidth={2} aria-hidden="true" />
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
            style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "820px" }}
          >
            Send us the questions your security review always asks.
          </h2>
          <p className="mt-5 max-w-[620px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll answer them in writing before the first call.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <a href="#permissions" className="ed-btn ed-btn-secondary-dark inline-flex">See how permissions work</a>
          </div>
        </motion.div>
      </section>
    </>
  );
}

/** Two-state marker for §3. Filled or hollow, so the setting reads in
    greyscale; each one is also labelled for screen readers. */
function Dot({ filled }: { filled: boolean }) {
  return (
    <span
      className="h-[11px] w-[11px] rounded-full"
      style={filled
        ? { backgroundColor: "var(--ed-accent-text)" }
        : { border: "1.5px solid var(--ed-border)" }}
      role="img"
      aria-label={filled ? "yes" : "no"}
    />
  );
}
