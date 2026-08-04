"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG, SCRIM } from "@/lib/data/hero-backgrounds";
import { ACCENT_TINT, Band, CARD, EASE, JAKARTA, MONO, Meta, Reveal, SectionHead } from "@/components/platform/shared";

/**
 * /why-ezeeassist
 *
 * Rebuilt on the editorial system, and restructured against the shape of
 * ada.cx/why-ada, which was supplied as the reference. **Structure and
 * device borrowed, nothing else** — every claim, number and value here is
 * EZee's own, from the existing /about page and the previous version of
 * this one.
 *
 * What was taken from that reference, and why each earns its place:
 *
 *   §2  a mission stated in one oversized line with trust markers under
 *       it, rather than a paragraph of positioning
 *   §3  the critique as flowing prose with no graphics, so the page has
 *       one section that is purely an argument
 *   §4  short, punchy operating-model cards rather than feature copy
 *   §5  a three-pillar triptych that links out to the real pages
 *   §7  a dense authority line carrying heritage and scale in one breath
 *
 * The founder photo-and-quote block from that page was deliberately **not**
 * taken, by request.
 *
 * Band sequence: dark, light, alt, light, dark, light, alt, light, dark.
 * No two adjacent sections share a device: an oversized statement, then
 * prose, then cards, then a triptych, then a comparison, then a stat line,
 * then values.
 *
 * **Numbers discipline.** The old version stated "250+ integrations" as
 * fact. The Integrations page deliberately ships `{{TBD:integration-count}}`
 * because that figure is not sourced, so the same token is used here
 * rather than contradicting it. Everything else is published: the three
 * case-study figures, and the named investors from /about.
 */

const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const ON_DARK_RULE = "rgba(238,242,248,0.16)";
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

const HERO = HERO_BG.default;

/* Same token the Integrations page uses. Resolve both together. */
const INTEGRATION_COUNT = "{{TBD:integration-count}}";

/* ── §2 ─────────────────────────────────────────────────────
   Ada states its mission in one oversized line and puts trust markers
   under it rather than a paragraph. Same device, our claim. */
const MARKERS = ["Purpose-built for franchising", "Live in multi-location networks", "Venture-backed"];

/* ── §4 ─────────────────────────────────────────────────────
   Short titles doing the work, in the register of Ada's "Own your
   agents / We handle the tech". Each one is a stance, not a feature. */
const MODEL: { title: string; body: string }[] = [
  {
    title: "Your knowledge, not the internet's",
    body: "Answers come from the document your brand approved, with the source attached. A generic assistant reaching for public data is worse than no answer, because it sounds right.",
  },
  {
    title: "It knows which location is asking",
    body: "Nashville has different vendors from Denver, and a shift lead is not an owner. Role and location decide what any answer can include, on every response.",
  },
  {
    title: "Nothing gets stuck",
    body: "When there is no approved answer, it becomes a ticket, routed to the team that owns it with the location's context attached. The question never just disappears.",
  },
  {
    title: "No new behaviour to teach",
    body: "It arrives in Teams, Slack, SMS, or the app your locations already open. A tool that needs a rollout plan does not get used at nine at night.",
  },
];

/* ── §5 ─────────────────────────────────────────────────────
   The triptych, mapped onto pages that actually exist. */
const PILLARS: { label: string; title: string; body: string; href: string }[] = [
  {
    label: "On demand",
    title: "Answers",
    body: "Every question answered from your own material, scoped to the person asking, in the channel they already work in.",
    href: "/platform/answers",
  },
  {
    label: "Always on",
    title: "Workflows",
    body: "A coach describes what they would do. It runs wherever it applies, reading each location's own numbers before it acts.",
    href: "/platform/workflows",
  },
  {
    label: "Foundation",
    title: "Control Center",
    body: "One policy set, one permission model, one log. Set once at HQ, applied everywhere, with nothing that can be worked around.",
    href: "/platform/control-center",
  },
];

/* ── §6 ─────────────────────────────────────────────────────
   Kept from the previous version, minus the row that scored a wiki as
   "already exists (poorly)": a comparison that sneers is less persuasive
   than one that concedes. */
const COMPARISON: { capability: string; generic: boolean; portal: boolean }[] = [
  { capability: "Answers from your brand's own material",    generic: false, portal: true },
  { capability: "Available at the hour your locations work", generic: true,  portal: false },
  { capability: "Scoped by role and location",               generic: false, portal: false },
  { capability: "Escalates when there is no answer",         generic: false, portal: false },
  { capability: "Arrives in the channel they already use",   generic: false, portal: false },
  { capability: "Tells you what your network keeps asking",  generic: false, portal: false },
];

/* ── §7 ─────────────────────────────────────────────────────
   Published figures only, each from the case study it names. */
const PROOF: { stat: string; label: string; brand: string; href: string }[] = [
  { stat: "67%",    label: "fewer repetitive questions", brand: "WSI",       href: "/case-studies/wsi" },
  { stat: "93%",    label: "resolved without a person",  brand: "DekaLash",  href: "/case-studies/dekalash" },
  { stat: "650+",   label: "hours returned in six months", brand: "DivaDance", href: "/case-studies/divadance" },
];

/* ── §8 ───────────────────────────────────────────────────── */
const VALUES = [
  "We are honest and compassionate with all stakeholders",
  "We have strong opinions, but they are loosely held",
  "We act like owners",
  "We communicate clearly and in a timely manner",
  "We execute with urgency, without compromising excellence",
];
const INVESTORS = ["N49P", "10vc", "Antler", "Hustle Fund"];

export default function WhyEZeeAssistContent() {
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
              Why EZee Assist
            </p>
            <h1
              className="mt-5 max-w-[880px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              General-purpose AI was never going to run a franchise.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>
                This was built for one.
              </span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              A network is not one company. It is hundreds of owners running the same brand under
              different conditions, and the thing that helps them has to know which one is asking.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#the-model" className="ed-btn ed-btn-secondary-dark inline-flex">How it works</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Mission ────────────────────────────────────
          One oversized line and markers, no card and no supporting
          paragraph. The section's whole job is to be read in one breath. */}
      <Band>
        <Reveal>
          <p
            className="ed-fg max-w-[980px] tracking-[-0.03em]"
            style={{
              fontFamily: JAKARTA, fontWeight: 700,
              fontSize: "clamp(1.75rem, 0.9rem + 2.6vw, 3rem)", lineHeight: 1.15, textWrap: "balance",
            }}
          >
            Multi-location execution should not depend on who happens to pick up the phone.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            {MARKERS.map((m, i) => (
              <span key={m} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="ed-fg-muted">·</span>}
                <Meta>{m}</Meta>
              </span>
            ))}
          </div>
        </Reveal>
      </Band>

      {/* ── 3. The critique ───────────────────────────────
          Prose, no graphics. The page needs one section that is purely an
          argument, and a card grid here would make three related failures
          look like three separate features. */}
      <Band alt>
        <SectionHead
          eyebrow="Why not a general assistant"
          title="The tools your team already tried were built for a different problem."
        />
        <Reveal>
          <div className="mt-9 flex max-w-[680px] flex-col gap-5">
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              A horizontal assistant answers from public data. Your franchisees do not need
              Wikipedia at two in the morning, they need your procedure for the thing that just
              happened, and an answer that sounds confident but came from the open internet is
              worse than no answer at all.
            </p>
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              It also has no idea that one location has different vendors, a different lease and a
              different regulator from the one next door, so it cannot scope what it says. And
              when it runs out of road, the question simply ends. No ticket, no owner, no
              follow-up. The franchisee is left where they started, having now also lost the time.
            </p>
            <p className="ed-fg-muted text-[15px] leading-[1.75]">
              None of that is a failure of the models. It is what happens when a tool built for
              everyone meets a business where the answer depends entirely on who is asking.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="ed-fg mt-9 max-w-[760px] tracking-[-0.02em]"
            style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: 22, lineHeight: 1.35 }}
          >
            A franchise system is not one company. It is hundreds, running the same brand.
          </p>
        </Reveal>
      </Band>

      {/* ── 4. The model ──────────────────────────────────
          Four stances rather than four features. Short titles carry it. */}
      <Band id="the-model">
        <SectionHead
          eyebrow="What we built instead"
          title="Four decisions that follow from taking that seriously."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {MODEL.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <div className="flex h-full flex-col p-6 md:p-7" style={CARD}>
                <p className="ed-fg text-[18px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.25 }}>
                  {m.title}
                </p>
                <p className="ed-fg-muted mt-3 text-[14.5px] leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 5. The three pillars ──────────────────────────
          A triptych that links out, so this page positions rather than
          re-explains. Each one goes to a page that actually exists. */}
      <section className="w-full" style={{ background: "linear-gradient(180deg, #0D2836 0%, #091C26 100%)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <Reveal>
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              How it fits together
            </p>
            <h2
              className="mt-4 max-w-[820px] leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
            >
              Three things, on one system.{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>Governed the same way.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.09}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col justify-between gap-8 rounded-[14px] p-6 md:p-7 transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "rgba(238,242,248,0.04)", border: `1px solid ${ON_DARK_RULE}` }}
                >
                  <div>
                    <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: ON_DARK_ACCENT }}>
                      {p.label}
                    </span>
                    <p className="mt-3 text-[22px] tracking-[-0.02em]" style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, lineHeight: 1.2 }}>
                      {p.title}
                    </p>
                    <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: ON_DARK }}>{p.body}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: ON_DARK_ACCENT }} strokeWidth={2} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <p className="mt-10 max-w-[760px] text-[15px] leading-relaxed" style={{ color: ON_DARK_DIM }}>
              It reads what you already run rather than replacing it, connecting to{" "}
              <span style={{ color: ON_DARK_ACCENT }}>{INTEGRATION_COUNT}</span> systems at the
              source with the permissions they already carry.{" "}
              <Link href="/platform/integrations" style={{ color: ON_DARK_ACCENT, textDecoration: "underline", textUnderlineOffset: 4 }}>
                What connects
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. The comparison ─────────────────────────────
          Two honest columns. The old version scored an internal wiki as
          "already exists (poorly)", which is a sneer rather than an
          argument, and it is gone. */}
      <Band>
        <SectionHead
          eyebrow="Against the alternatives"
          title="What a general assistant and a document portal each leave on the table."
        />
        <Reveal>
          <div className="mt-10 max-w-[880px] overflow-hidden" style={CARD}>
            <div className="flex gap-4 px-5 py-3.5 md:px-6" style={{ backgroundColor: "var(--ed-card-alt)", borderBottom: "1px solid var(--ed-border)" }}>
              <span className="flex-1"><Meta>Capability</Meta></span>
              <span className="w-[92px] flex-none text-center"><Meta>General AI</Meta></span>
              <span className="w-[92px] flex-none text-center"><Meta>A portal</Meta></span>
              <span className="w-[92px] flex-none text-center"><Meta color="var(--ed-accent-text)">EZee</Meta></span>
            </div>
            <div className="px-5 md:px-6">
              {COMPARISON.map((r, i) => (
                <div key={r.capability} className="flex items-center gap-4 py-3.5" style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}>
                  <span className="ed-fg min-w-0 flex-1 text-[14px] leading-snug">{r.capability}</span>
                  <span className="flex w-[92px] flex-none justify-center"><Mark on={r.generic} /></span>
                  <span className="flex w-[92px] flex-none justify-center"><Mark on={r.portal} /></span>
                  <span className="flex w-[92px] flex-none justify-center"><Mark on accent /></span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Band>

      {/* ── 7. Proof ──────────────────────────────────────
          Heritage and scale in one line, then the published numbers. */}
      <Band alt>
        <Reveal>
          <p className="ed-fg-muted max-w-[820px] text-[17px] leading-relaxed">
            Purpose-built for franchising from the first line of code, live in multi-location
            networks across North America, and backed by{" "}
            {INVESTORS.map((n, i) => (
              <span key={n}>
                <span className="ed-fg" style={{ fontWeight: 600 }}>{n}</span>
                {i < INVESTORS.length - 2 ? ", " : i === INVESTORS.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {PROOF.map((p, i) => (
            <Reveal key={p.brand} delay={i * 0.08}>
              <Link href={p.href} className="group flex h-full flex-col p-6" style={CARD}>
                <span
                  style={{
                    fontFamily: JAKARTA, fontWeight: 700, fontSize: 34, lineHeight: 1,
                    letterSpacing: "-0.03em", color: "var(--ed-accent-text)", fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.stat}
                </span>
                <p className="ed-fg mt-3 flex-1 text-[14.5px] leading-snug">{p.label}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Meta>{p.brand}</Meta>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--ed-accent-text)" }} strokeWidth={2} aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 8. How we work ────────────────────────────────
          From /about. A values list rather than cards: five short lines
          read as a set, five cards read as five products. */}
      <Band>
        <SectionHead
          eyebrow="How we work"
          title="A remote-first team, and five things we hold each other to."
          sub="Spanning enterprise software, machine learning, franchise operations and venture-backed startups."
        />
        <div className="mt-9 max-w-[760px]">
          {VALUES.map((v, i) => (
            <Reveal key={v} delay={i * 0.06}>
              <div className="flex items-baseline gap-5 py-4" style={{ borderTop: i === 0 ? "1px solid var(--ed-border)" : "1px solid var(--ed-rule)" }}>
                <span className="ed-fg-muted flex-none" style={{ fontFamily: MONO, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ed-fg text-[15.5px] leading-relaxed">{v}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 9. CTA ────────────────────────────────────────── */}
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
            style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 3rem)", maxWidth: "860px" }}
          >
            Bring us the question your network asks most.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            We&rsquo;ll answer it from your own material on the call, scoped the way your network
            is.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <Link href="/case-studies" className="ed-btn ed-btn-secondary-dark inline-flex">
              Read the case studies
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

/** Comparison marker. Filled or hollow, plus a label, so the table reads
    in greyscale and to a screen reader (DESIGN.md §4.3). */
function Mark({ on, accent = false }: { on: boolean; accent?: boolean }) {
  return (
    <span
      className="h-[11px] w-[11px] rounded-full"
      style={on
        ? { backgroundColor: accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)" }
        : { border: "1.5px solid var(--ed-border)" }}
      role="img"
      aria-label={on ? "yes" : "no"}
    />
  );
}
