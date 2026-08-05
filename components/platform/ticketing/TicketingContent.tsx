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
import DepartmentMap from "./DepartmentMap";

/**
 * /platform/ticketing
 *
 * **This page is not franchisee support. It is the whole HQ request
 * system.** A franchisee raises a ticket by asking, in whatever channel
 * they already use, and it is classified, given the location's context,
 * and routed to whichever of nine departments owns it.
 *
 * The pain being removed: today a franchisee has to know the franchisor's
 * org chart before they can ask for help. Is a joint promo with a partner
 * gym marketing, legal, or their coach? They guess.
 *
 * What gets displaced is not just a helpdesk. It is the helpdesk *plus*
 * eight or nine departmental aliases, the per-department forms, the portal
 * nobody opens, and every request that went to a coach's mobile and left
 * no record.
 *
 * **Three copy rules that are load-bearing:**
 *
 * 1. **No competitor is named anywhere.** §7 says "a helpdesk" and lets
 *    the reader supply the name. Naming one invites a rebuttal we do not
 *    control and dates the page.
 * 2. **It never claims to replace external customer support.** §7 concedes
 *    that explicitly, and the concession is what makes the internal claim
 *    credible.
 * 3. **No form, portal, or category picker appears in any section.** The
 *    entire intake claim is that none of those exist; a form mockup
 *    anywhere contradicts the hero.
 *
 * No section leads with agent productivity, which is where every helpdesk
 * vendor's page leads.
 *
 * Band sequence, part of the spec: dark, light, light, dark, light, light,
 * dark, light, light, dark. §5 and §6 are adjacent and both data-heavy, so
 * §5 is a record plus a light list and §6 is three deliberately different
 * devices — a table, a ranked list, and a two-column prescription. They
 * must not both read as tables.
 *
 * Deviations: the hero is the **photographic** treatment on
 * photographic, not the flat gradient the brief describes. Requested
 * directly. This route was also unreachable before now — `next.config.ts`
 * 308'd it to `/solution/ticketing`, the same shadowing that hid
 * `/platform/workflows`.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const WARN = "#B45309";
const WARN_ON_DARK = "#F5B26B";

/* Assignment and the revert switch live in lib/data/platform-heroes.ts. */
const HERO = platformHero("ticketing");

/* ── §2 ───────────────────────────────────────────────────── */
const GUESSES = ["Is that marketing?", "Legal, because it's a partnership?", "My coach?"];
const TRACE = [
  "marketing@ · no reply for 3 days",
  "Asked the coach instead",
  "Coach forwards it to marketing",
  "Marketing says legal has to see it",
  "Legal asks which entity signs",
];
const DESTINATIONS: { where: string; what: string; warn?: boolean }[] = [
  { where: "marketing@",           what: "a shared inbox" },
  { where: "it@",                  what: "a shared inbox" },
  { where: "legal@",               what: "one person's inbox" },
  { where: "franchisesupport@",    what: "the helpdesk" },
  { where: "realestate@",          what: "a shared inbox" },
  { where: "Coach's mobile",       what: "nowhere", warn: true },
  { where: "A form on the portal", what: "nobody uses it" },
];

/* ── §3 ─────────────────────────────────────────────────────
   Row three is the only one that did not become a ticket. Its presence
   among three that did is the deflection claim made without a statistic,
   which is why it gets its own treatment. */
const INTAKE: { typed: string; result: string; answered?: boolean }[] = [
  { typed: "Can someone approve a promo with the gym next door?", result: "Ticket raised · Marketing + Legal" },
  { typed: "My POS won't take the new discount code",             result: "Ticket raised · IT · marked urgent" },
  { typed: "What's the refund window again?",                     result: "Answered from policy. No ticket.", answered: true },
  { typed: "I need the landlord letter for my renewal",           result: "Ticket raised · Real Estate" },
];

/* ── §4 ───────────────────────────────────────────────────── */
const ROUTING_POINTS: { title: string; body: string }[] = [
  { title: "Classified, not keyword-matched", body: "It reads what the request is actually about. A “promo” question can be marketing, legal, or both." },
  { title: "Routed by your rules",            body: "Which team owns what is set once at HQ. Change it and every future request follows." },
  { title: "More than one owner when it needs it", body: "A request can reach two departments with one of them named as the owner." },
];

/* ── §5 ─────────────────────────────────────────────────────
   The precedent row stays: prior similar decisions in front of the
   decision-maker is what turns a ticket into a decision. */
const ATTACHED = [
  "Store #214 · West territory · Dana R. is the coach",
  "Local marketing spend YTD and remaining budget",
  "Two similar partner promos approved in the last year",
  "The brand's co-promotion policy",
];

const QUEUE: { dept: string; open: number; note?: string; breach?: boolean }[] = [
  { dept: "Marketing",   open: 11, note: "2 approaching SLA" },
  { dept: "IT",          open: 6,  note: "1 breached", breach: true },
  { dept: "Legal",       open: 4 },
  { dept: "Real Estate", open: 3 },
  { dept: "Finance",     open: 2 },
  { dept: "Training",    open: 2 },
];

/* ── §6 ─────────────────────────────────────────────────────
   Three devices, deliberately: a table, a ranked list, a two-column
   prescription. Rendering all three as tables makes the section one long
   report. Panel 1 is never framed as performance management — the Legal
   line reframes the outlier as a capacity finding, which is both safer
   and more often true. */
const PERF: { dept: string; open: string; first: string; close: string; sla: string; flag?: boolean }[] = [
  { dept: "Marketing",   open: "11", first: "4h",       close: "2.1 days",  sla: "91%" },
  { dept: "IT",          open: "6",  first: "40m",      close: "6 hours",   sla: "98%" },
  { dept: "Legal",       open: "4",  first: "2.3 days", close: "9.4 days",  sla: "62%", flag: true },
  { dept: "Real Estate", open: "3",  first: "1.1 days", close: "4.2 days",  sla: "88%" },
  { dept: "Finance",     open: "2",  first: "6h",       close: "1.8 days",  sla: "95%" },
  { dept: "Training",    open: "2",  first: "3h",       close: "1.2 days",  sla: "100%" },
];

const RECURRING: { topic: string; count: string; avg: string }[] = [
  { topic: "Partner promo approvals",      count: "9×", avg: "avg 6.2 days to close" },
  { topic: "Refund tenure exceptions",     count: "7×", avg: "avg 1.1 days" },
  { topic: "POS discount code failures",   count: "6×", avg: "avg 4 hours" },
  { topic: "Lease renewal questions",      count: "5×", avg: "avg 8.8 days" },
  { topic: "Local marketing spend limits", count: "4×", avg: "avg 2.4 days" },
];

const PREVENT: { write: string; prevents: string }[] = [
  { write: "A standing rule on partner promotions",      prevents: "~9 tickets a month" },
  { write: "A refund policy that covers tenure",         prevents: "~7 tickets a month" },
  { write: "POS discount troubleshooting steps",         prevents: "~6 tickets a month" },
  { write: "Lease renewal FAQ with your standard terms", prevents: "~5 tickets a month" },
];

/* ── §7 ─────────────────────────────────────────────────────
   Two columns of what-you-get. Never a feature comparison against a named
   product, and never a competitor name: "a helpdesk" only. */
const DISPLACED: { now: string; instead: string }[] = [
  { now: "A helpdesk with per-agent seats, for one department",              instead: "One place to ask, in the channel they already use" },
  { now: "Eight or nine departmental email aliases with no tracking",        instead: "Classification and routing without a triager" },
  { now: "A request form per department, each one somewhere different",      instead: "Every department covered, not just support" },
  { now: "A portal your franchisees have to be told to use",                 instead: "Context attached before anyone opens it" },
  { now: "Requests on a coach's mobile that leave no record",                instead: "One view of what the whole network is waiting on" },
  { now: "Reporting on one department's queue, and nothing on the other eight", instead: "A list of what to write to stop the next hundred requests" },
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Answers",        title: "Where most of it gets resolved before a ticket exists",   href: "/platform/answers" },
  { eyebrow: "Reporting",      title: "When you want to ask about the queue rather than look at it", href: "/platform/reporting" },
  { eyebrow: "Control Center", title: "How routing rules and SLAs are set",                      href: "/platform/control-center" },
];

export default function TicketingContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimRgba})` }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(58% 52% at 82% 12%, rgba(159,224,248,0.16) 0%, rgba(159,224,248,0) 70%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Ticketing
            </p>
            <h1
              className="mt-5 max-w-[880px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                /* Ceiling derived at 1440: the longer clause measures
                   ~640px at 40px inside the 880px cap. Break is lg-only. */
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              One place to ask HQ for anything.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                It finds the right team on its own.
              </span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              Your franchisees raise a ticket by asking, in Teams, Slack, SMS, wherever they
              already are. It gets classified, routed to the department that owns it, and tracked
              until it closes. No portal, no form, no guessing who to email.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#routing" className="ed-btn ed-btn-secondary-dark inline-flex">See how it routes</a>
            </div>
          </motion.div>

          {/* The thread. All three messages share a timestamp: routing is
              instant, only the human response takes time. */}
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
                  Store #214 · Microsoft Teams
                </span>
              </div>
              <div className="flex flex-col gap-4 p-5">
                {[
                  { from: "owner" as const, text: "I want to run a joint promo with the gym next door. Can someone at HQ approve it?" },
                  { from: "ezee" as const,  text: "Raised as #4471. This one needs Marketing and a Legal check on the partner terms. Both notified, with your location and the promo details attached." },
                  { from: "ezee" as const,  text: "I’ll keep you posted here." },
                ].map((m, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-none pt-[3px]" style={{ fontFamily: MONO, fontSize: 10.5, color: ON_DARK_DIM, width: 52, fontVariantNumeric: "tabular-nums" }}>
                      10:04am
                    </span>
                    <p
                      className="min-w-0 flex-1 rounded-[10px] px-3.5 py-2.5 text-[13.5px] leading-relaxed"
                      style={
                        m.from === "ezee"
                          ? { backgroundColor: "rgba(159,224,248,0.10)", border: "1px solid rgba(159,224,248,0.24)", color: "#FFFFFF" }
                          : { backgroundColor: "rgba(245,237,224,0.07)", border: `1px solid ${ON_DARK_RULE}`, color: ON_IMAGE }
                      }
                    >
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 max-w-[560px]" style={{ fontFamily: MONO, fontSize: 11.5, lineHeight: 1.6, color: ON_DARK_DIM }}>
              No portal opened. No form filled. No idea required about who owns partner promotions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. The problem ────────────────────────────────
          The only section discussing current state. Nothing later restates
          the pain. */}
      <Band>
        <SectionHead
          eyebrow="The problem"
          title="Before a franchisee can ask for help, they have to know who owns the answer."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal>
            <div className="flex h-full flex-col overflow-hidden" style={CARD}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
                <Meta>What the franchisee does</Meta>
              </div>
              <div className="p-5 md:p-6">
                <p className="ed-fg text-[14.5px] leading-relaxed" style={{ fontFamily: JAKARTA, fontWeight: 500 }}>
                  &ldquo;I want to run a promo with the gym next door.&rdquo;
                </p>
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    {GUESSES.map((g) => (
                      <p key={g} className="ed-fg-muted mb-2 text-[13.5px] leading-snug last:mb-0">{g}</p>
                    ))}
                  </div>
                  <div>
                    {TRACE.map((t) => (
                      <p key={t} className="ed-fg-muted mb-2 text-[13.5px] leading-snug last:mb-0">{t}</p>
                    ))}
                    <p className="mt-3 pt-3 text-[14px]" style={{ borderTop: "2px solid var(--ed-border)", color: WARN, fontWeight: 700 }}>
                      Approved. Two weeks later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden" style={CARD}>
              <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
                <Meta>Where requests live today</Meta>
              </div>
              <div className="px-5 py-1 md:px-6">
                {DESTINATIONS.map((d, i) => (
                  <div
                    key={d.where}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
                  >
                    <span
                      style={{
                        fontFamily: MONO, fontSize: 12.5,
                        color: d.warn ? WARN : "var(--ed-fg)",
                        fontWeight: d.warn ? 700 : 500,
                      }}
                    >
                      {d.where}
                    </span>
                    <span
                      className="text-[13.5px]"
                      style={d.warn ? { color: WARN, fontWeight: 600 } : { color: "var(--ed-fg-muted)" }}
                    >
                      {d.what}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-9 max-w-[720px]">
            <p className="ed-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
              Nobody at HQ can tell you how many requests are open right now, or which department
              is the bottleneck.
            </p>
            <p className="ed-fg-muted mt-3 text-base leading-relaxed">
              The franchisee&rsquo;s problem is not knowing who to ask. Yours is not knowing what
              was asked.
            </p>
          </div>
        </Reveal>
      </Band>

      {/* ── 3. Intake ─────────────────────────────────────
          A fork, then a strip. No routing mechanics here: naming a
          destination department is fine, explaining how it decided is §4. */}
      <Band alt>
        <SectionHead
          eyebrow="Intake"
          title="They ask. If it needs a person, it becomes a ticket."
          sub="No form to find, no category to pick, no priority to guess at."
        />

        <Reveal>
          <div className="mt-10 max-w-[760px]">
            <span
              className="inline-flex items-center rounded-full px-4 py-2 uppercase"
              style={{
                fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700,
                color: "var(--ed-accent-text)", backgroundColor: ACCENT_TINT,
                border: "1px solid rgba(0,119,168,0.22)",
              }}
            >
              A franchisee asks
            </span>
            <div className="mt-0 flex">
              <span aria-hidden="true" className="ml-6 w-px" style={{ backgroundColor: "var(--ed-border)", minHeight: 24 }} />
            </div>
            <div className="flex flex-col gap-4">
              {[
                { cond: "The answer exists in your material", out: "Answered in seconds, with the source. No ticket.", accent: true },
                { cond: "It needs a decision, an approval, or a person", out: "Ticket raised. Classified. Routed. Tracked.", accent: false },
              ].map((f) => (
                <div key={f.cond} className="flex gap-4">
                  <span aria-hidden="true" className="ml-6 mt-[11px] h-px w-6 flex-none" style={{ backgroundColor: "var(--ed-border)" }} />
                  <div className="min-w-0 flex-1">
                    <p className="ed-fg text-[15px]" style={{ fontWeight: 600 }}>{f.cond}</p>
                    <p className="mt-1 text-[14px] leading-relaxed" style={{ color: f.accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)" }}>
                      {f.out}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 max-w-[860px]">
          {INTAKE.map((r, i) => (
            <Reveal key={r.typed} delay={i * 0.06}>
              <div
                className="flex flex-col gap-1.5 py-4 md:flex-row md:items-baseline md:gap-6"
                style={{ borderTop: i === 0 ? "1px solid var(--ed-border)" : "1px solid var(--ed-rule)" }}
              >
                <p className="ed-fg min-w-0 flex-1 text-[14.5px] leading-snug">&ldquo;{r.typed}&rdquo;</p>
                <p
                  className="flex-none text-[13.5px] md:w-[280px] md:text-right"
                  style={r.answered
                    ? { color: "var(--ed-accent-text)", fontWeight: 700 }
                    : { color: "var(--ed-fg-muted)" }}
                >
                  {r.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="ed-fg-muted mt-9 max-w-[680px] text-base leading-relaxed">
            Most of what arrives isn&rsquo;t a request. It&rsquo;s a question with an answer, and
            it never reaches your team at all.{" "}
            <Link href="/platform/answers" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              How answers work
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 4. Routing ────────────────────────────────────
          The section that carries the page. Deeper than the hero so it
          reads as its own moment. */}
      <section id="routing" className="w-full scroll-mt-24" style={{ background: "linear-gradient(180deg, #0D2836 0%, #091C26 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Routing
            </p>
            <h2
              className="mt-4 max-w-[860px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              Your franchisees don&rsquo;t need to know{" "}
              <span style={{ color: ON_DARK_ACCENT }}>your org chart.</span>
            </h2>
            <p className="mt-5 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Every request is classified by what it actually is, then sent to the team that owns
              it, with the location&rsquo;s context already attached.
            </p>
          </Reveal>

          <div className="mt-12">
            <DepartmentMap />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
            {ROUTING_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <p className="text-[15px]" style={{ color: "#FFFFFF", fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: ON_DARK_DIM }}>{p.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <p
              className="mt-10 max-w-[720px] tracking-[-0.02em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}
            >
              Nine departments. One thing a franchisee has to remember: ask.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. What HQ gets ───────────────────────────────
          A record plus a deliberately lighter list. The aggregate view
          belongs to §6, so the queue here must not read as a table. */}
      <Band>
        <SectionHead eyebrow="On the HQ side" title="It arrives owned, with the context already gathered." />

        <Reveal>
          <div className="mt-10 max-w-[820px] overflow-hidden" style={CARD}>
            <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <Meta>#4471 · Raised 10:04am · Store #214</Meta>
            </div>
            <div className="px-5 py-1 md:px-6">
              {[
                { label: "Request", value: "Approval to run a joint promotion with a neighbouring gym" },
                { label: "Owner", value: "Marketing · Priya N." },
                { label: "Also notified", value: "Legal · partner terms review" },
              ].map((r, i) => (
                <Row key={r.label} label={r.label} first={i === 0}>{r.value}</Row>
              ))}
              <Row label="Attached">
                <ul className="flex flex-col gap-1.5">
                  {ATTACHED.map((a) => (
                    <li key={a} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[8px] h-[4px] w-[4px] flex-none rounded-full" style={{ backgroundColor: "var(--ed-fg-muted)" }} />
                      <span className="ed-fg text-[14px] leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row label="Status">Open · 4 hours · SLA 2 business days</Row>
            </div>
          </div>
        </Reveal>

        {/* Lighter than the ticket on purpose: a list, not a table. */}
        <Reveal delay={0.1}>
          <div className="mt-8 max-w-[560px]">
            <Meta>Open requests · all departments</Meta>
            <div className="mt-3">
              {QUEUE.map((q) => (
                <div key={q.dept} className="flex items-baseline gap-4 py-2">
                  <span className="ed-fg flex-none text-[14px]" style={{ width: 120 }}>{q.dept}</span>
                  <span className="ed-fg-muted flex-none" style={{ fontFamily: MONO, fontSize: 12.5, width: 66, fontVariantNumeric: "tabular-nums" }}>
                    {q.open} open
                  </span>
                  {q.note && (
                    <span
                      className="text-[12.5px]"
                      style={q.breach ? { color: WARN, fontWeight: 700 } : { color: "var(--ed-fg-muted)" }}
                    >
                      {q.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="ed-fg mt-9 max-w-[720px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            For the first time, someone can answer the question &ldquo;what is our network waiting
            on?&rdquo;
          </p>
          <Link href="/platform/reporting" className="ed-link mt-5 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            Ask about the queue instead
          </Link>
        </Reveal>
      </Band>

      {/* ── 6. Analytics ──────────────────────────────────
          Three deliberately different devices: a table, a ranked list, a
          two-column prescription. Panel 3 is the differentiated one and is
          visually dominant — nobody else turns a support queue into a
          content roadmap. */}
      <Band alt>
        <SectionHead
          eyebrow="Analytics"
          title="Every ticket is a signal. About your teams, and about your material."
          sub="A helpdesk reports on one department. This reports on all of them, and tells you what to write to stop the next hundred."
        />

        {/* Panel 1 — a table. */}
        <Reveal>
          <div className="mt-10 overflow-hidden" style={CARD}>
            <div className="px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <Meta>Where the network is waiting</Meta>
            </div>
            {/* Below sm the same six rows stack label-above-value. The
                table needs 560px and a 375 viewport gives it 327, and
                DESIGN.md §8 takes stacking over a horizontal scroll on a
                narrative section. Forcing the scroll also grew the
                document to 565px, so this is a real overflow, not just a
                readability call. */}
            <div className="sm:hidden">
              {PERF.map((r, i) => (
                <div key={r.dept} className="px-5 py-4" style={{ borderBottom: "1px solid var(--ed-rule)" }}>
                  <p className="ed-fg text-[14px]" style={{ fontWeight: r.flag ? 700 : 600 }}>{r.dept}</p>
                  <div className="mt-2 flex flex-col gap-1">
                    {[["Open", r.open], ["First response", r.first], ["Time to close", r.close], ["Within SLA", r.sla]].map(([k, v]) => {
                      const isSla = k === "Within SLA";
                      return (
                        <div key={k} className="flex items-baseline justify-between gap-3">
                          <Meta>{k}</Meta>
                          <span
                            style={{
                              fontFamily: MONO, fontSize: 12.5, fontVariantNumeric: "tabular-nums",
                              color: isSla && r.flag ? WARN : "var(--ed-fg-muted)",
                              fontWeight: isSla && r.flag ? 700 : 500,
                            }}
                          >
                            {v}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[560px]" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Department", "Open", "First response", "Time to close", "Within SLA"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-3 md:px-6 ${i === 0 ? "text-left" : "text-right"}`}
                        style={{ borderBottom: "1px solid var(--ed-rule)" }}
                      >
                        <Meta>{h}</Meta>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERF.map((r) => (
                    <tr key={r.dept}>
                      <td className="ed-fg px-5 py-3 text-[14px] md:px-6" style={{ borderBottom: "1px solid var(--ed-rule)", fontWeight: r.flag ? 600 : 400 }}>
                        {r.dept}
                      </td>
                      {[r.open, r.first, r.close].map((v, i) => (
                        <td
                          key={i}
                          className="ed-fg-muted px-5 py-3 text-right md:px-6"
                          style={{ borderBottom: "1px solid var(--ed-rule)", fontFamily: MONO, fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}
                        >
                          {v}
                        </td>
                      ))}
                      <td
                        className="px-5 py-3 text-right md:px-6"
                        style={{
                          borderBottom: "1px solid var(--ed-rule)", fontFamily: MONO, fontSize: 12.5,
                          fontVariantNumeric: "tabular-nums",
                          color: r.flag ? WARN : "var(--ed-fg-muted)",
                          fontWeight: r.flag ? 700 : 500,
                        }}
                      >
                        {r.sla}{r.flag && <span aria-hidden="true"> &larr;</span>}
                        {r.flag && <span className="sr-only"> below target</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* The reframe. This is a capacity finding, not performance
            management, and a page that reads as surveillance will not get
            circulated. Do not cut. */}
        <Reveal delay={0.08}>
          <p className="ed-fg-muted mt-5 max-w-[720px] text-[15px] leading-relaxed">
            Legal isn&rsquo;t slow. Legal is two people covering nine hundred locations, and until
            now nobody could see it.
          </p>
        </Reveal>

        {/* Panel 2 — a ranked list, not a table. */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-[760px]">
            <Meta>What keeps coming back</Meta>
            <div className="mt-4">
              {RECURRING.map((r, i) => (
                <div
                  key={r.topic}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
                  style={{ borderTop: i === 0 ? "1px solid var(--ed-border)" : "1px solid var(--ed-rule)" }}
                >
                  <span className="ed-fg min-w-0 flex-1 text-[14.5px]">{r.topic}</span>
                  <span
                    className="flex-none"
                    style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: "var(--ed-accent-text)", fontVariantNumeric: "tabular-nums" }}
                  >
                    raised {r.count}
                  </span>
                  <span className="ed-fg-muted flex-none text-[12.5px] sm:w-[170px] sm:text-right">{r.avg}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Panel 3 — the prescriptive one, and visually dominant. */}
        <Reveal delay={0.12}>
          <div
            className="mt-10 overflow-hidden rounded-[14px]"
            style={{ backgroundColor: ACCENT_TINT, border: "1px solid rgba(0,119,168,0.22)", borderLeft: "3px solid #0077A8" }}
          >
            <div className="px-5 py-3.5 md:px-6" style={{ borderBottom: "1px solid rgba(0,119,168,0.18)" }}>
              <Meta color="var(--ed-accent-text)">What would stop it</Meta>
            </div>
            <div className="px-5 py-1 md:px-6">
              <div className="hidden py-3 sm:flex sm:gap-6" style={{ borderBottom: "1px solid rgba(0,119,168,0.18)" }}>
                <span className="flex-1"><Meta color="var(--ed-accent-text)">Write this</Meta></span>
                <span className="w-[180px] text-right"><Meta color="var(--ed-accent-text)">Prevents</Meta></span>
              </div>
              {PREVENT.map((p, i) => (
                <div
                  key={p.write}
                  className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,119,168,0.14)" }}
                >
                  <span className="ed-fg min-w-0 flex-1 text-[14.5px] leading-snug" style={{ fontWeight: 500 }}>{p.write}</span>
                  <span
                    className="flex-none sm:w-[180px] sm:text-right"
                    style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: "var(--ed-accent-text)" }}
                  >
                    {p.prevents}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* The payoff. The "2 raised because the terms were unusual" detail
            stays: not every request disappears, and claiming otherwise
            costs credibility. */}
        <Reveal delay={0.14}>
          <div className="mt-10 max-w-[820px]">
            <div className="py-4">
              <Meta>Before</Meta>
              <p className="ed-fg mt-2 text-[15px]" style={{ fontWeight: 600 }}>Partner promotion approvals</p>
              <p className="ed-fg-muted mt-1 text-[14px] leading-relaxed">
                Raised 9 times in six months · every one routed, reviewed, and decided from scratch
              </p>
            </div>
            <p
              className="my-2 py-3 text-[13.5px] leading-relaxed"
              style={{ borderTop: "1px solid var(--ed-rule)", borderBottom: "1px solid var(--ed-rule)", color: "var(--ed-accent-text)" }}
            >
              #4471 resolved. Marketing and Legal agree a standing rule. HQ publishes it.
            </p>
            <div className="py-4">
              <Meta color="var(--ed-accent-text)">After</Meta>
              <p className="ed-fg mt-2 text-[15px]" style={{ fontWeight: 600 }}>Partner promotion approvals</p>
              <p className="ed-fg-muted mt-1 text-[14px] leading-relaxed">
                Asked 14 times · 12 answered from the published rule · 2 raised as tickets because
                the terms were unusual
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="ed-fg mt-8 max-w-[760px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            Your team stops answering the same request. They start deciding the ones that are
            actually new.
          </p>
          <p className="ed-fg-muted mt-4 text-[12px]">Figures are illustrative.</p>
        </Reveal>
      </Band>

      {/* ── 7. Displacement ───────────────────────────────
          Two columns of what-you-get. No competitor is named, and the
          concession below is required: it is what makes the internal claim
          credible. */}
      <section className="w-full" style={{ background: "linear-gradient(180deg, #0B2C48 0%, #071B29 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_DIM }}>
              Displacement
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              The helpdesk was only ever half of it.
            </h2>
            <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Most franchisors run a support tool for one department and email for the other eight.
            </p>
          </Reveal>

          <div className="mt-10 max-w-[980px]">
            <div className="hidden gap-8 pb-3 md:flex" style={{ borderBottom: `1px solid ${ON_DARK_RULE}` }}>
              <span className="flex-1">
                <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_DIM }}>
                  What you&rsquo;re running now
                </span>
              </span>
              <span className="flex-1">
                <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_ACCENT }}>
                  What replaces it
                </span>
              </span>
            </div>
            {DISPLACED.map((d, i) => (
              <Reveal key={d.now} delay={i * 0.06}>
                <div className="flex flex-col gap-2 py-4 md:flex-row md:gap-8" style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_DARK_RULE}` }}>
                  <p className="flex-1 text-[14.5px] leading-relaxed" style={{ color: ON_DARK_DIM }}>{d.now}</p>
                  <p className="flex-1 text-[14.5px] leading-relaxed" style={{ color: "#FFFFFF" }}>{d.instead}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <p className="mt-9 max-w-[720px] text-[15px] leading-relaxed" style={{ color: ON_DARK_DIM }}>
              If you run external customer support, keep your helpdesk. It&rsquo;s built for that.
              This is for everything your locations need from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 8. Proof ──────────────────────────────────────── */}
      <Band>
        <SectionHead title="What happened to the inboxes." />
        <Reveal>
          <div className="mt-9 max-w-[820px] p-6 md:p-8" style={CARD}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              {/* Deliberately not <Meta>: it force-uppercases, and the
                  placeholder rule says render the token exactly as written. */}
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
                {"{{TBD:ticketing-proof-brand}}"}
              </span>
              <span style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ed-accent-text)" }}>
                {"{{TBD:ticketing-proof-metric}}"}
              </span>
            </div>
            <blockquote className="ed-fg mt-6 text-[15px] md:text-base leading-relaxed" style={{ fontFamily: JAKARTA, fontWeight: 500 }}>
              &ldquo;{"{{TBD:ticketing-proof-quote}}"}&rdquo;
            </blockquote>
            <p className="ed-fg-muted mt-5 text-sm">{"{{TBD:ticketing-proof-attribution}}"}</p>
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
            style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "860px" }}
          >
            Tell us the five things your franchisees email HQ about most.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll show you where each one would have gone, and how many would never have
            needed a person.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <a href="#routing" className="ed-btn ed-btn-secondary-dark inline-flex">See how it routes</a>
          </div>
        </motion.div>
      </section>
    </>
  );
}

/** Ticket row: label above value below sm, beside it above. */
function Row({ label, children, first = false }: {
  label: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-1.5 py-4 sm:flex-row sm:gap-5"
      style={{ borderTop: first ? "none" : "1px solid var(--ed-rule)" }}
    >
      <span className="flex-none sm:w-[130px]"><Meta>{label}</Meta></span>
      <div className="ed-fg min-w-0 flex-1 text-[14px] leading-relaxed">{children}</div>
    </div>
  );
}
