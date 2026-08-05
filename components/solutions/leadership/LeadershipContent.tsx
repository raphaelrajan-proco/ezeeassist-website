"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG, SCRIM } from "@/lib/data/hero-backgrounds";
import { ACCENT_TINT, Band, CARD, EASE, Eyebrow, JAKARTA, MONO, Meta, Reveal, SectionHead } from "@/components/platform/shared";
import NetworkView from "./NetworkView";
import Flywheel from "./Flywheel";

/**
 * /solutions/leadership — replaces the HQ team page.
 *
 * **The reader is the buyer**: CEO, COO, President, VP Operations, or in a
 * PE-backed brand the operating partner.
 *
 * **Five anchors, in this order, and the order is the spec.** Visibility,
 * leverage, owner experience, risk, no disruption. Two upside, one
 * flywheel, two risk-removal — the order a leadership conversation runs
 * in. Do not reorder §2 through §6.
 *
 * Three copy rules that are load-bearing:
 *
 * 1. **Never lead with cost savings.** Headcount is a second-order point
 *    inside §3, not the page's claim. Leading with cost signals a cost
 *    product to the one reader who could buy a growth product.
 * 2. **Never explain feature mechanics.** Every section states an outcome
 *    and links to a Platform page. Explaining how something works here is
 *    a sign the link is missing.
 * 3. **Never assert their franchisees have already adopted AI.** §5's
 *    hedge — some have, the rest will — is deliberate. Roughly half of
 *    prospects have not seen AI sprawl and an assertion loses them.
 *
 * §4 is about what owner experience *produces for the business*, not what
 * owners receive. The Franchisees page carries that.
 *
 * Band sequence: dark, light, dark, light, light, light, dark, light,
 * light, dark. §4, §5 and §6 are three consecutive light sections and use
 * three different devices on purpose — a flywheel, a plain line stack, and
 * a two-column comparison. Two of them becoming card grids would flatten
 * the page.
 *
 * Deviation: the hero is the **photographic** treatment on
 * `HERO_BG.haze2`, not the flat gradient the brief describes. Requested
 * directly.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const WARN_ON_DARK = "#F5B26B";

const HERO = HERO_BG.haze2;

/* The franchisees page lives on the industries route; there is no
   /solutions/franchisees. Linking the real page rather than stubbing a
   new one. */
const FRANCHISEES = "/industries/franchising/multi-unit-franchisees";

/* ── §2 ───────────────────────────────────────────────────── */
const VISIBILITY_POINTS: { title: string; body: string }[] = [
  { title: "Nobody built a report for this", body: "Ask for a different cut in plain language and get it. No analyst, no request queue." },
  { title: "Current, not last night's sync", body: "Read at the source when the question is asked." },
  { title: "Yours to scope",                 body: "Territory, brand, region, or a single location, with the permissions your systems already enforce." },
];

/* ── §3 beat 2 ─────────────────────────────────────────────
   One acts, one declines, one adapts, one escalates. Uniform rows make
   this a broadcast product and undercut §4's satisfaction claim. */
const ROWS: { store: string; found: string; did: string; tone: "act" | "none" | "adapt" | "escalate" }[] = [
  { store: "#331", found: "62% booked, third soft week",    did: "Reactivation draft ready",                  tone: "act" },
  { store: "#052", found: "58% booked, seasonal",           did: "No action, below your regional threshold",  tone: "none" },
  { store: "#118", found: "66% booked, promo running",      did: "Suggested extending it instead",            tone: "adapt" },
  { store: "#402", found: "51% booked, new owner week six", did: "Escalated to the coach",                    tone: "escalate" },
];
const TONE: Record<string, string> = {
  act: ON_DARK_ACCENT, none: ON_DARK_DIM, adapt: ON_DARK, escalate: WARN_ON_DARK,
};

/* ── §4 ───────────────────────────────────────────────────── */
const OWNER_LINES = [
  "Answered in seconds, at the hour they actually work, not a callback on Thursday.",
  "Reached before something goes wrong, not after.",
  "Able to build the tool they've been asking for, themselves.",
];

/* ── §6 ─────────────────────────────────────────────────────
   "Reorganize your documentation before anything works" stays. Every
   knowledge-tool evaluation stalls there and almost nobody names it. */
const STAYS = [
  "Your POS, scheduling, and booking systems",
  "Your LMS and your training library",
  "Your CRM and your marketing stack",
  "Your accounting and your BI",
  "Your franchise management platform",
  "Wherever your documents live today",
];
const AVOID = [
  "Migrate content into a new repository",
  "Reorganize your documentation before anything works",
  "Load data into a warehouse someone maintains",
  "Consolidate onto one vendor's suite",
  "Retrain your network on a new system",
];

/* ── §7 ─────────────────────────────────────────────────────
   IT and Security first: security review stalls more enterprise deals
   than pricing. The Training row answers "No" before the link, because
   ambiguity about LMS displacement produces a slow block from a function
   with no other reason to care. The franchisee row stays. */
const COMMITTEE: { fn: string; ask: string; lead?: string; where: string; href: string }[] = [
  { fn: "IT and Security",       ask: "Where does our data sit, who processes it, is it used for training?", where: "Trust Center",   href: "/security" },
  { fn: "Legal",                 ask: "What's logged, what's retained, and does this sit inside our franchise agreement?", where: "Control Center", href: "/platform/control-center" },
  { fn: "Finance",               ask: "What's the cost model, and what does it avoid?", where: "ROI calculator", href: "/roi-calculator" },
  { fn: "Franchise development", ask: "Does this improve validation and ramp? What do owners say?", where: "Case studies", href: "/case-studies" },
  { fn: "Marketing",             ask: "Does anything generated stay on brand, and who approves what goes out?", where: "Control Center", href: "/platform/control-center" },
  { fn: "Training",              ask: "Is this replacing our LMS?", lead: "No.", where: "Integrations", href: "/platform/integrations" },
  { fn: "Your franchisees",      ask: "Will they use it, and what can HQ see?", where: "Franchisees", href: FRANCHISEES },
];

const RELATED: { eyebrow: string; title: string; href: string }[] = [
  { eyebrow: "Field coaches", title: "What your team's week becomes", href: "/solutions/coaches" },
  { eyebrow: "Franchisees",   title: "What your owners get",          href: FRANCHISEES },
  { eyebrow: "Platform",      title: "How it's put together",         href: "/platform/answers" },
];

export default function LeadershipContent() {
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
              For franchisor leadership
            </p>
            {/* Three clauses, the third carrying both constraints and set
                apart. Breaks are lg-only; below that it wraps. */}
            <h1
              className="mt-5 max-w-[900px] leading-[1.08] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              See what&rsquo;s happening. Support every owner.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                Without adding headcount or changing systems.
              </span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              One layer across the tools you already run, so your coaches reach further, your
              owners get answers in seconds, and every AI your network touches follows your rules.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#visibility" className="ed-btn ed-btn-secondary-dark inline-flex">See the network view</a>
            </div>
          </motion.div>

          {/* A compressed version of §2, three rows only. The full
              artifact is the next section. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="mt-12 w-full max-w-[600px] overflow-hidden rounded-[14px]"
            style={{
              backgroundColor: "rgba(4,26,44,0.55)", border: `1px solid ${ON_DARK_RULE}`,
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: `1px solid ${ON_DARK_RULE}` }}>
              <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_DARK_DIM }}>
                Network · 214 locations
              </span>
            </div>
            <div className="px-5 py-1">
              {[
                { l: "Locations reached this month", v: "198 of 214", accent: true },
                { l: "Performance spread",           v: "9.6 pts",    note: "from 11.2" },
                { l: "Attach rate, network-wide",    v: "+2.1%",      note: "34 locations adopted the top-quartile script" },
              ].map((r, i) => (
                <div key={r.l} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5" style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_DARK_RULE}` }}>
                  <span className="text-[13.5px]" style={{ color: ON_IMAGE }}>{r.l}</span>
                  <span className="flex items-baseline gap-2.5">
                    {r.note && <span style={{ fontFamily: MONO, fontSize: 10.5, color: ON_DARK_DIM }}>{r.note}</span>}
                    <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: r.accent ? ON_DARK_ACCENT : "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>
                      {r.v}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Visibility ─────────────────────────────────
          This section owns visibility; §3 must not restate coverage. */}
      <Band id="visibility">
        <SectionHead
          eyebrow="Visibility"
          title="Not a dashboard nobody opens. The three things you'd ask about if you could."
          sub="Assembled from the systems you already run, current as of now."
        />

        <Reveal>
          <div className="mt-10 max-w-[860px]">
            <NetworkView />
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
          {VISIBILITY_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>{p.title}</p>
              <p className="ed-fg-muted mt-1.5 text-[14px] leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="ed-fg mt-10 max-w-[760px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            Every other view in this category tells you what&rsquo;s wrong. This one tells you
            whether what you&rsquo;re doing is working.
          </p>
          <Link href="/platform/reporting" className="ed-link mt-5 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            How reporting works
          </Link>
        </Reveal>
      </Band>

      {/* ── 3. Leverage ───────────────────────────────────
          Two beats with a visible break: beat 1 is the economics, beat 2
          is personalization. Beat 1 alone is a cost argument, which is
          the thing this page must not lead on. */}
      <section className="w-full" style={{ background: "linear-gradient(180deg, #0D2836 0%, #091C26 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Leverage
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              The same team, reaching further.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Not by working harder.</span>
            </h2>
            <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Coaching has always scaled with headcount. It doesn&rsquo;t have to.
            </p>
          </Reveal>

          {/* Beat 1 — the economics. */}
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <Reveal>
              <div className="h-full rounded-[14px] p-6 md:p-7" style={{ backgroundColor: "rgba(238,242,248,0.04)", border: `1px solid ${ON_DARK_RULE}` }}>
                <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: ON_DARK_DIM }}>
                  Today
                </span>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: ON_DARK }}>
                  Every twenty locations buys another coach. At 200 units, ten coaches. At 600,
                  thirty. What any one location receives: unchanged.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-[14px] p-6 md:p-7" style={{ backgroundColor: "rgba(159,224,248,0.08)", border: "1px solid rgba(159,224,248,0.30)" }}>
                <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: ON_DARK_ACCENT }}>
                  With plays running
                </span>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#FFFFFF" }}>
                  Coverage per location rises while the team stays the size you chose.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="mt-8 flex max-w-[720px] flex-col gap-2.5">
              {[
                "Support cost per unit falls as the network grows, instead of holding flat.",
                "Your field team's time moves from answering and chasing to the work you hired them for.",
                "Adding units stops adding proportional G&A.",
              ].map((l) => (
                <p key={l} className="text-[14.5px] leading-relaxed" style={{ color: ON_DARK_DIM }}>{l}</p>
              ))}
            </div>
          </Reveal>

          {/* The break between the beats. They are two different
              arguments and must not read as one list. */}
          <Reveal delay={0.16}>
            <div className="mt-14 pt-10" style={{ borderTop: `1px solid ${ON_DARK_RULE}` }}>
              <p className="max-w-[720px] tracking-[-0.02em]" style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 600, fontSize: 22, lineHeight: 1.35 }}>
                And none of it arrives as a broadcast.
              </p>
            </div>
          </Reveal>

          {/* Beat 2 — personalization. The differentiated half. */}
          <div className="mt-8 max-w-[880px]">
            {ROWS.map((r, i) => (
              <Reveal key={r.store} delay={i * 0.07}>
                <div className="flex flex-col gap-1.5 py-4 md:flex-row md:items-baseline md:gap-6" style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_DARK_RULE}` }}>
                  <span className="flex-none" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "#FFFFFF", width: 52, fontVariantNumeric: "tabular-nums" }}>
                    {r.store}
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px]" style={{ color: ON_DARK_DIM }}>{r.found}</span>
                  <span className="flex-none text-[14.5px] md:w-[300px]" style={{ color: TONE[r.tone] }}>{r.did}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <p className="mt-9 max-w-[820px] text-[17px] leading-relaxed" style={{ color: ON_DARK }}>
              Four locations. One play. None of them treated the same. Your owners are independent
              businesses, and this is the first thing that treats them that way at scale.
            </p>
            <Link href="/platform/workflows" className="mt-5 inline-block text-sm" style={{ color: ON_DARK_ACCENT, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}>
              How a play runs
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Owner experience ───────────────────────────
          A flywheel. What owner experience produces for the business, not
          a list of what owners receive. */}
      <Band>
        <SectionHead
          eyebrow="Owner experience"
          title="Supported owners validate. Validation is what sells the next unit."
          sub="The most expensive thing in a franchise system is an owner who feels alone."
        />

        <div className="mt-12">
          <Flywheel />
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 flex max-w-[680px] flex-col gap-2.5">
            {OWNER_LINES.map((l) => (
              <p key={l} className="ed-fg-muted text-[14.5px] leading-relaxed">{l}</p>
            ))}
          </div>
          <p className="ed-fg mt-8 max-w-[820px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            An owner who feels supported is a renewal, a second unit, and a good validation call.
            An owner who doesn&rsquo;t is a transfer.
          </p>
          <Link href={FRANCHISEES} className="ed-link mt-5 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            What your owners get
          </Link>
        </Reveal>
      </Band>

      {/* ── 5. Risk ───────────────────────────────────────
          Deliberately the plainest section on the page. No cards, no
          diagram: §4 is a flywheel and §6 is a two-column, and this
          section's plainness is what separates them. */}
      <Band alt>
        <SectionHead eyebrow="Risk" title="Your brand is on every output your network generates." />
        <Reveal>
          <div className="mt-9 flex max-w-[680px] flex-col gap-5">
            {/* The hedge in line one is deliberate. Roughly half of
                prospects have not seen AI sprawl, and asserting it loses
                them. Do not change it to an assertion. */}
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              Some of your owners have already started using AI on their own. The rest will.
            </p>
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              Different tools, different prompts, different data, and no admin panel. Everything
              generated carries your name.
            </p>
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              One policy set, one permission model, one log, across every location, every channel,
              and every department.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="ed-fg mt-9 max-w-[720px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            Ungoverned AI is a brand risk. This is the layer that removes it.
          </p>
          <Link href="/platform/control-center" className="ed-link mt-5 inline-block text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
            Inside the Control Center
          </Link>
        </Reveal>
      </Band>

      {/* ── 6. No disruption ──────────────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="No migration"
          title="Keep the systems you chose. Keep the vendors your team likes."
          sub="This reads what you already run. It doesn't ask you to consolidate onto it."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <Reveal>
            <div className="flex h-full flex-col p-6 md:p-7" style={CARD}>
              <Meta>What stays exactly as it is</Meta>
              <ul className="mt-5 flex flex-col gap-3.5">
                {STAYS.map((x) => (
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
              <Meta color="var(--ed-accent-text)">What you don&rsquo;t have to do</Meta>
              <ul className="mt-5 flex flex-col gap-3.5">
                {AVOID.map((x, i) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full" style={{ backgroundColor: "var(--ed-accent-text)" }} />
                    {/* Row two is the one every knowledge-tool evaluation
                        stalls on and almost nobody names. */}
                    <span className="ed-fg text-[14.5px] leading-relaxed" style={i === 1 ? { fontWeight: 600 } : undefined}>
                      {x}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          {/* The line a leader forwards, so it gets the weight. */}
          <p className="ed-fg mt-9 max-w-[820px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 20, lineHeight: 1.35 }}>
            You&rsquo;ve been asked to choose between the best tools and one system. That was
            always a false choice.
          </p>
          <p className="ed-fg-muted mt-3 max-w-[680px] text-base leading-relaxed">
            The coherence comes from the layer, not from the tools sharing a logo.{" "}
            <Link href="/platform/integrations" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
              What connects
            </Link>
            .
          </p>
        </Reveal>
      </Band>

      {/* ── 7. The committee ──────────────────────────────── */}
      <section className="w-full" style={{ background: "linear-gradient(180deg, #0B2C48 0%, #071B29 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_DIM }}>
              Getting it approved
            </p>
            <h2
              className="mt-4 max-w-[880px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              You already know who&rsquo;s going to ask.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Here&rsquo;s what each of them usually wants to see.</span>
            </h2>
            <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_DARK }}>
              Most of this decision happens in rooms we&rsquo;re not in. This is the material for
              those rooms.
            </p>
          </Reveal>

          <div className="mt-10 max-w-[980px]">
            {COMMITTEE.map((r, i) => (
              <Reveal key={r.fn} delay={i * 0.06}>
                <div className="flex flex-col gap-2 py-4 lg:flex-row lg:items-baseline lg:gap-8" style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_DARK_RULE}` }}>
                  <span className="flex-none text-[15px] lg:w-[184px]" style={{ color: "#FFFFFF", fontWeight: 600 }}>{r.fn}</span>
                  <span className="min-w-0 flex-1 text-[14px] leading-relaxed" style={{ color: ON_DARK_DIM }}>{r.ask}</span>
                  <span className="flex-none text-[13.5px] lg:w-[188px] lg:text-right">
                    {/* Training answers "No" before the link. Ambiguity
                        about LMS displacement produces a slow block from a
                        function with no other reason to care. */}
                    {r.lead && <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{r.lead} </span>}
                    <Link href={r.href} style={{ color: ON_DARK_ACCENT, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}>
                      {r.where} &rarr;
                    </Link>
                  </span>
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

      {/* ── 8. Proof ──────────────────────────────────────
          Two network sizes, so a 40-unit and a 400-unit reader each see
          themselves. **Not a deflection or hours-saved metric** — those
          argue for other pages and other readers. */}
      <Band>
        <SectionHead title="Brands running this at scale." />
        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col p-6 md:p-8" style={CARD}>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: "var(--ed-fg-muted)" }}>
                  {"{{TBD:leadership-proof-large-brand}}"}
                </span>
                <span style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "2rem", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ed-accent-text)" }}>
                  {"{{TBD:leadership-proof-large-metric}}"}
                </span>
              </div>
              <p className="ed-fg-muted mt-6 flex-1 text-[14.5px] leading-relaxed">
                {"{{TBD:leadership-proof-large-quote}}"}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/case-studies/divadance" className="group flex h-full flex-col p-6 md:p-8" style={CARD}>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <Image src="/logos/stories/divadance.png" alt="DivaDance" width={140} height={36} className="h-auto w-[104px] object-contain object-left" />
                <span style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "2rem", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ed-accent-text)" }}>
                  {"{{TBD:divadance-growth-metric}}"}
                </span>
              </div>
              <blockquote className="ed-fg mt-6 flex-1 text-[15px] leading-relaxed" style={{ fontFamily: JAKARTA, fontWeight: 500 }}>
                &ldquo;EZee Assist has increased owner retention and topline revenue, and given our
                team back the hours we were spending answering the same questions.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-end justify-between gap-4">
                <Meta>DivaDance</Meta>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--ed-accent-text)" }} strokeWidth={2} aria-hidden="true" />
              </div>
            </Link>
          </Reveal>
        </div>
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

      {/* ── 10. CTA ───────────────────────────────────────
          TODO: the ask requires a leader to name their weakest locations.
          If sales finds that creates friction, the softer replacement is
          "Bring us one territory." */}
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
            Bring us your bottom quartile.
          </h2>
          <p className="mt-5 max-w-[660px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll show you what would have surfaced for each of those locations this week,
            and what your top decile is already doing that they aren&rsquo;t.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <Link href="/roi-calculator" className="ed-btn ed-btn-secondary-dark inline-flex">
              See what your network could recover
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
