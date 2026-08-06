"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG } from "@/lib/data/hero-backgrounds";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { Band, EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";

/**
 * /security — the Trust Center.
 *
 * Built from the supplied design handoff. **Every section takes a
 * different shape on purpose** (DESIGN.md §1.4), because the sub-pages had
 * converged on one template: photographic hero, three top-ruled columns,
 * a sticky-headline ledger, a before/after artifact, a hairline accordion,
 * a full-bleed marquee, a dark label/value grid, a photographic close. No
 * form repeats and adjacent surfaces alternate.
 *
 * **Copy is the live security page, verbatim**, as it has been since this
 * page was migrated. New copy is limited to the standards intro, the PII
 * body, the mechanism chips and the FAQ answers.
 *
 * **The four FAQ answers need review before launch.** The old page showed
 * only the questions. These were composed from facts already published
 * here (EC2 compartments, vector indexing, TLS 1.2/1.3, AES-256, PII
 * redaction, no third-party training) plus one cautious generality about
 * foundation models. The LLM answer in particular names no vendor, and
 * should not until the company decides that is public.
 *
 * This page is the *guarantee* half of the split with Control Center,
 * which carries what HQ configures. Certifications, encryption detail and
 * subprocessors belong here and nowhere else.
 *
 * The prototype's floating theme toggle is a preview affordance and is not
 * shipped. Its `min-width: 1240px` is not either; this is responsive.
 */

const ACCENT_ON_DARK = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const ON_SOLID = "#EEF2F8";
const ON_SOLID_DIM = "rgba(238,242,248,0.55)";
const ON_SOLID_RULE = "rgba(238,242,248,0.16)";

/* The handoff pins the original photograph and a 0.45 scrim for this
   band, rather than one of the haze variants the Platform pages use. */
const HERO = HERO_BG.default;
const HERO_SCRIM = 0.45;

const CHIP_BG = "rgba(0,119,168,0.06)";
const CHIP_BD = "rgba(0,119,168,0.22)";
const DANGER = "#B42318";
const DANGER_SOFT = "rgba(180,35,24,0.08)";

/* ── §2 ─────────────────────────────────────────────────────
   Icons are drawn from the brand's hexagon, circle and capsule
   vocabulary rather than pulled from a library, so they sit with the logo
   instead of beside it. Carried over from the handoff verbatim. */
const PRINCIPLES: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Customer-defined access controls",
    body: "You are in full control of your content. You can determine who should have access and the level of access.",
    icon: (
      <>
        <polygon points="58 38 48 20.7 28 20.7 18 38 28 55.3 48 55.3" fill="none" />
        <circle cx="38" cy="34" r="6.5" fill="var(--ed-accent-text)" stroke="none" />
        <path d="M27 52c2.5-5.5 6.5-8 11-8s8.5 2.5 11 8" />
      </>
    ),
  },
  {
    title: "No third-party training",
    body: "Your content will never be shared with or used by third parties for any software or LLM training purposes.",
    icon: (
      <>
        <rect x="12" y="30" width="26" height="16" rx="8" />
        <path d="M44 38h9M59 38h5" strokeDasharray="3 4" />
        <polygon points="70 38 64.5 28.5 53.5 28.5 48 38 53.5 47.5 64.5 47.5" fill="none" opacity=".45" />
        <path d="M52 33l14 10M66 33 52 43" opacity=".8" />
      </>
    ),
  },
  {
    title: "Enterprise-grade Infrastructure",
    body: "All data processing and computations are completed in secured and encrypted AWS cloud systems.",
    icon: (
      <>
        <polygon points="53 21 23 21 8 38 23 55 53 55 68 38" fill="none" />
        <polygon points="47 31.5 29 31.5 22.5 38 29 44.5 47 44.5 53.5 38" fill="var(--ed-accent-text)" stroke="none" opacity=".18" />
        <path d="M30 38h4M36 38h4M42 38h4" strokeLinecap="round" />
      </>
    ),
  },
];

/* ── §3 ─────────────────────────────────────────────────────
   All six bodies verbatim from the live page. The mechanism chip is the
   new part: naming what enforces each control is what separates this from
   a policy document. */
const STANDARDS: { title: string; body: string; spec: string }[] = [
  {
    title: "Secured Cloud System",
    body: "All data processing occurs within EZee Assist's AWS EC2 cloud infrastructure. No customer data is utilized for training any language models by third parties.",
    spec: "AWS EC2 · ISOLATED",
  },
  {
    title: "Indexing Logic",
    body: "All customer data and metadata are indexed and stored in machine-readable vector format in a secured cloud system.",
    spec: "VECTOR · ENCRYPTED",
  },
  {
    title: "Individualized Data Compartments",
    body: "No cross-pollination of data. Every customer's data is secured in its own AWS EC2 servers. Customer data cannot be mixed with other customers' data.",
    spec: "PER-CUSTOMER SERVERS",
  },
  {
    title: "User Defined Permissions",
    body: "All users must authenticate their access to EZee Assist. Our system can synchronize with the current access controls to match the user permission levels across customers' tech stack.",
    spec: "SSO · ROLE-SYNCED",
  },
  {
    title: "PII Redaction Controls",
    body: "Advanced AI models used by EZee Assist automatically censor Personally Identifiable Information from various data sources wherever possible.",
    spec: "AUTOMATIC",
  },
  {
    title: "Secured Encryption",
    body: "All data encryption follows industry-leading standards, employing TLS 1.2/1.3 for transit encryption and AES 256-bit encryption for data at rest.",
    spec: "TLS 1.2/1.3 · AES-256",
  },
];

/* ── §5 ─────────────────────────────────────────────────────
   Questions verbatim. **Answers pending review** — see the note at the
   top of this file. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "Which Large Language Models (LLMs) are utilized by EZee Assist?",
    a: "EZee Assist orchestrates leading enterprise-grade foundation models through encrypted APIs. Your content is never used to train them, and every model call runs inside the same permission and logging layer as the rest of the platform.",
  },
  {
    q: "How is customer data stored and encrypted?",
    a: "Customer data lives in individualized compartments on AWS EC2 servers, indexed in vector format. Everything is encrypted with TLS 1.2/1.3 in transit and AES 256-bit at rest.",
  },
  {
    q: "What procedures do you follow for managing Personally Identifiable Information (PII)?",
    a: "PII is automatically redacted from data sources before indexing wherever possible, so personal details never reach the stored index. Redaction runs on every source the system reads.",
  },
  {
    q: "How is customer data used with AI models?",
    a: "Your content is retrieved at answer time, scoped to the person asking, and never shared with or used by third parties for any software or LLM training purposes.",
  },
];

/* ── §7 ───────────────────────────────────────────────────── */
const DISCLOSURE: { label: string; value: string; mono?: boolean }[] = [
  { label: "Report to",         value: "security@ezeeassist.com", mono: true },
  { label: "Acknowledged",      value: "Promptly, by a human" },
  { label: "Scope",             value: "Any part of the EZee Assist environment" },
  { label: "General inquiries", value: "Any security question, any time" },
];

export default function SecurityContent() {
  /* One open at a time; clicking the open row closes it. */
  const [open, setOpen] = useState<number>(0);

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(4,32,54,${HERO_SCRIM})` }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(1100px 560px at 85% 120%, rgba(159,224,248,0.22), transparent 62%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col gap-5"
            >
              <p className="uppercase" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", fontWeight: 600, color: ACCENT_ON_DARK }}>
                Trust Center
              </p>
              <h1
                className="leading-[1.06] tracking-[-0.03em]"
                style={{
                  color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                  fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                  textWrap: "balance",
                }}
              >
                Industry-grade{" "}
                <span className="lg:block" style={{ color: ACCENT_ON_DARK }}>AI standards.</span>
              </h1>
              <p className="max-w-[520px] text-base md:text-[17px] leading-relaxed" style={{ color: ON_IMAGE }}>
                EZee Assist&rsquo;s AI engine is meticulously developed to surpass the current AI
                security, privacy, and compliance protocols. Quality and security is ingrained in
                our foundation.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                  Speak to an expert
                  <span className="ed-btn-arrow-badge" aria-hidden="true">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                </Link>
                <a href="#disclosure" className="ed-btn ed-btn-secondary-dark inline-flex">
                  Report a vulnerability
                </a>
              </div>
            </motion.div>

            {/* The shield is built from the logo's hexagon vocabulary, not
                a stock padlock. Two orbit groups counter-rotate; both hold
                still under reduced motion via the shared keyframe class. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="hidden justify-center lg:flex"
              aria-hidden="true"
            >
              <svg width="340" height="340" viewBox="0 0 400 400" fill="none">
                <polygon points="350 200 275 70.1 125 70.1 50 200 125 329.9 275 329.9" stroke="rgba(159,224,248,.28)" strokeWidth="1.5" />
                <polygon points="305 200 252.5 109.1 147.5 109.1 95 200 147.5 290.9 252.5 290.9" stroke="rgba(159,224,248,.5)" strokeWidth="1.5" />
                <polygon points="260 200 230 148 170 148 140 200 170 252 230 252" stroke={ACCENT_ON_DARK} strokeWidth="2" />
                <polygon points="226 200 213 177.5 187 177.5 174 200 187 222.5 213 222.5" fill={ACCENT_ON_DARK} />
                <path d="M192 200l6 6 11-12" stroke="#0B2C48" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                <g className="ed-orbit" style={{ transformOrigin: "200px 200px", animationDuration: "26s" }}>
                  <circle cx="200" cy="70" r="4.5" fill={ACCENT_ON_DARK} />
                  <circle cx="200" cy="330" r="3" fill="rgba(159,224,248,.55)" />
                </g>
                <g className="ed-orbit" style={{ transformOrigin: "200px 200px", animationDuration: "40s", animationDirection: "reverse" }}>
                  <circle cx="63" cy="200" r="3.5" fill="rgba(159,224,248,.7)" />
                </g>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Responsible AI ─────────────────────────────
          Three top-ruled columns and no card boxes. The rule is the whole
          structure; boxing these would make them the fourth card grid on
          the page. No eyebrow: this page drops them everywhere but the
          hero. */}
      <Band>
        <Reveal>
          <h2
            className="ed-fg max-w-[780px] leading-[1.1] tracking-[-0.03em]"
            style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)", textWrap: "pretty" }}
          >
            Responsible AI. Deployed with an unwavering focus on security and safety.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="flex flex-col gap-4" style={{ borderTop: "2px solid var(--ed-border)", paddingTop: 26 }}>
                <div className="flex items-center justify-between">
                  <svg width="52" height="52" viewBox="0 0 76 76" fill="none" stroke="var(--ed-accent-text)" strokeWidth="1.7" aria-hidden="true">
                    {p.icon}
                  </svg>
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", color: "var(--ed-fg-muted)" }}>
                    {`0${i + 1}`}
                  </span>
                </div>
                <p className="ed-fg text-[18px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
                  {p.title}
                </p>
                <p className="ed-fg-muted text-[14.5px] leading-[1.55]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 3. Standards ledger ───────────────────────────
          Sticky headline against a scrolling artifact. The mechanism
          column is the point: a control with its enforcement named is not
          a policy document. */}
      <Band alt>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[.9fr_1.5fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-20">
            <h2
              className="ed-fg leading-[1.12] tracking-[-0.03em]"
              style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.125rem)", textWrap: "pretty" }}
            >
              State-of-the-art security and compliance standards.
            </h2>
            <p className="ed-fg-muted mt-4 text-[15px] leading-relaxed">
              Not a policy document. Six controls, each enforced in production, each with the
              mechanism named.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden" style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-border)", borderRadius: 14 }}>
              <div
                className="flex justify-between px-5 py-3 md:px-6"
                style={{ backgroundColor: "var(--ed-card-alt)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.13em", color: "var(--ed-fg-muted)" }}
              >
                <span>CONTROL</span>
                <span>MECHANISM</span>
              </div>
              {STANDARDS.map((s, i) => (
                <div
                  key={s.title}
                  /* The chip drops below the body under sm rather than
                     squeezing the title column. */
                  className="grid grid-cols-[34px_1fr] items-start gap-x-4 gap-y-3 px-5 py-5 md:grid-cols-[34px_1fr_auto] md:px-6"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--ed-rule)" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: "var(--ed-fg-muted)", paddingTop: 3 }}>
                    {`0${i + 1}`}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="ed-fg text-[16px]" style={{ fontFamily: JAKARTA, fontWeight: 600, letterSpacing: "-0.015em" }}>
                      {s.title}
                    </span>
                    <span className="ed-fg-muted text-[13.5px] leading-[1.55]">{s.body}</span>
                  </div>
                  <span
                    className="col-start-2 justify-self-start whitespace-nowrap md:col-start-3 md:justify-self-end"
                    style={{
                      fontFamily: MONO, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em",
                      color: "var(--ed-accent-text)", background: CHIP_BG, border: `1px solid ${CHIP_BD}`,
                      borderRadius: 6, padding: "4px 9px",
                    }}
                  >
                    {s.spec}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ── 4. PII redaction ──────────────────────────────
          The page's product-evidence moment, and the one section that
          shows rather than states. */}
      <Band>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
          <Reveal>
            <h2
              className="ed-fg leading-[1.12] tracking-[-0.03em]"
              style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.125rem)", textWrap: "pretty" }}
            >
              Personal information never reaches the index.
            </h2>
            <p className="ed-fg-muted mt-4 max-w-[440px] text-[15.5px] leading-relaxed">
              Advanced AI models automatically censor Personally Identifiable Information from data
              sources before anything is stored. What the system remembers is the operational fact,
              not the person.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col">
              <div
                className="flex flex-col gap-2.5 p-5 md:px-6"
                style={{
                  backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-border)",
                  borderRadius: 14, boxShadow: "0 14px 34px -24px rgba(10,10,10,.35)",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.13em", color: "var(--ed-fg-muted)" }}>
                  AS RECEIVED · STORE #118 · SMS · 9:14AM
                </span>
                {/* The spans carry weight as well as colour, so the state
                    is not colour-only (DESIGN.md §4.3). */}
                <p className="ed-fg text-[14.5px]" style={{ lineHeight: 1.7 }}>
                  Client <Pii>Sarah Mitchell</Pii> at <Pii>(415) 555-0192</Pii> wants a refund on
                  invoice <Pii>#88231</Pii>, what&rsquo;s our policy for cancelled bookings?
                </p>
              </div>

              <div className="flex items-center gap-3 py-3.5 pl-6">
                <span aria-hidden="true" style={{ width: 1, height: 26, background: "var(--ed-border)" }} />
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.13em", color: "var(--ed-accent-text)" }}>
                  REDACTED BEFORE INDEXING
                </span>
              </div>

              <div
                className="flex flex-col gap-2.5 p-5 md:px-6"
                style={{ backgroundColor: "var(--ed-card)", border: `1px solid ${CHIP_BD}`, borderRadius: 14 }}
              >
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.13em", color: "var(--ed-fg-muted)" }}>
                  AS STORED
                </span>
                <p className="ed-fg text-[14.5px]" style={{ lineHeight: 1.7 }}>
                  Client <Redacted>[NAME]</Redacted> at <Redacted>[PHONE]</Redacted> wants a refund
                  on invoice <Redacted>[REF]</Redacted>, what&rsquo;s our policy for cancelled
                  bookings?
                </p>
              </div>

              <p className="ed-fg-muted pt-3 text-[12px]">
                Illustrative. Data shapes shown are not customer data.
              </p>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ── 5. FAQ ────────────────────────────────────────── */}
      <Band alt>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[.9fr_1.5fr] lg:gap-16">
          <Reveal>
            <h2
              className="ed-fg leading-[1.12] tracking-[-0.03em]"
              style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.125rem)" }}
            >
              Frequently asked questions.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} style={{ borderTop: "1px solid var(--ed-rule)" }}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-[22px] text-left"
                    >
                      <span className="ed-fg text-[16.5px]" style={{ fontFamily: JAKARTA, fontWeight: 600, letterSpacing: "-0.015em" }}>
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-full"
                        style={{
                          border: "1px solid var(--ed-border)", fontSize: 16, color: "var(--ed-fg-muted)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform .3s cubic-bezier(.22,1,.36,1)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    {/* 0fr to 1fr collapse. The inner element needs
                        min-height:0 and overflow:hidden or 0fr is ignored
                        and every answer renders expanded. */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows .35s cubic-bezier(.22,1,.36,1)",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ minHeight: 0, overflow: "hidden" }}>
                        <p className="ed-fg-muted max-w-[560px] pb-6 text-[14.5px] leading-relaxed">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid var(--ed-rule)" }} />
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ── 6. Customer logos ─────────────────────────────
          The "Trusted by." heading is deleted; the marquee carries the
          claim on its own and the heading was the section restating what
          the logos already say. Full-bleed, the site's own convention. */}
      <div className="py-14 md:py-16 lg:py-20">
        <LogoMarquee />
      </div>

      {/* ── 7. Responsible disclosure ─────────────────────
          Dark solid, the hero's second CTA anchors here. */}
      <section id="disclosure" className="w-full scroll-mt-24" style={{ backgroundColor: "#0B1220" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <Reveal>
              <h2
                className="leading-[1.15] tracking-[-0.028em]"
                style={{ color: ON_SOLID, fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.375rem, 0.8rem + 1.4vw, 2rem)" }}
              >
                We value your feedback.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: "rgba(238,242,248,0.92)" }}>
                If you come across any vulnerabilities within the EZee Assist environment, please
                reach out to us at{" "}
                <a href="mailto:security@ezeeassist.com" style={{ color: ACCENT_ON_DARK, textDecoration: "underline", textUnderlineOffset: 4 }}>
                  security@ezeeassist.com
                </a>
                . Your security is our top priority, and we are committed to addressing any concerns
                promptly and effectively.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ borderLeft: `1px solid ${ON_SOLID_RULE}` }}>
                {DISCLOSURE.map((d, i) => (
                  <div
                    key={d.label}
                    className="flex flex-col gap-2 pl-6 md:pl-9"
                    style={{
                      paddingTop: i < 2 ? 8 : 20,
                      paddingBottom: i < 2 ? 28 : 0,
                      borderTop: i >= 2 ? `1px solid ${ON_SOLID_RULE}` : "none",
                    }}
                  >
                    <span className="uppercase" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.13em", color: ON_SOLID_DIM }}>
                      {d.label}
                    </span>
                    <span
                      style={d.mono
                        ? { fontFamily: MONO, fontSize: 14, color: ACCENT_ON_DARK }
                        : { fontFamily: JAKARTA, fontSize: 15, fontWeight: 600, color: ON_SOLID }}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 8. Closing CTA ────────────────────────────────
          Centred, and resolving to CLOSING_BASE so it seams into the
          footer with no visible join. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.32)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 md:px-12 lg:px-16 py-24 md:py-[104px] text-center"
        >
          <h2
            className="leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, fontSize: "clamp(1.5rem, 0.4rem + 2.9vw, 2.625rem)" }}
          >
            We look forward to connecting.
          </h2>
          <p className="max-w-[480px] text-base leading-relaxed" style={{ color: ON_IMAGE }}>
            To learn about how we can help your brand amplify operations with EZee Assist.
          </p>
          <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow mt-3 inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
            Speak to an expert
            <span className="ed-btn-arrow-badge" aria-hidden="true">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </Link>
        </motion.div>
      </section>
    </>
  );
}

/** A PII span in the received message. Weight as well as tint. */
function Pii({ children }: { children: React.ReactNode }) {
  return (
    <mark style={{ background: DANGER_SOFT, color: DANGER, borderRadius: 4, padding: "1px 5px", fontWeight: 600 }}>
      {children}
    </mark>
  );
}

/** Its replacement in the stored copy. The brackets carry the meaning, so
    the swap is legible without colour. */
function Redacted({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: MONO, fontSize: 11, fontWeight: 600, background: CHIP_BG,
        border: `1px solid ${CHIP_BD}`, color: "var(--ed-accent-text)", borderRadius: 4, padding: "2px 6px",
      }}
    >
      {children}
    </span>
  );
}
