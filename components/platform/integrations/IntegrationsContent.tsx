"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CLOSING_BASE } from "@/components/growth/closing-band";
import {
  ACCENT, ACCENT_TINT, CARD, EASE, JAKARTA, MONO,
  Band, Eyebrow, GovernanceBand, Meta, Reveal, SectionHead, TextChip,
} from "@/components/platform/shared";

/**
 * /platform/integrations
 *
 * Built on the editorial system (DESIGN.md), same section pattern as
 * /platform/answers.
 *
 * **Every system name is a text chip, not a logo.** Only nine
 * integration SVGs are committed, and none of them are the
 * franchise-native systems this page leads with — FranConnect,
 * ServiceTitan, Mindbody, Zenoti, ServiceMinder, Thryv. Mixing nine
 * real logos with forty text chips would put generic SaaS in colour and
 * the franchise systems in grey, inverting the emphasis the page is
 * built on. Uniform chips until the assets exist; never reference a CDN.
 *
 * Order is fixed everywhere franchise-native systems appear. They lead
 * because they prove domain fit before a generic logo shows up. Do not
 * alphabetise §3 or §5.
 */

/* ── §1 hero strip ───────────────────────────────────────
   A thin moving band, deliberately different in form from §5's static
   grid so the page does not show the same logo wall twice. */
const STRIP = [
  "FranConnect", "ServiceTitan", "Mindbody", "Zenoti", "ServiceMinder", "Thryv",
  "Toast", "Square", "QuickBooks", "Xero", "SharePoint", "Google Drive",
  "Trainual", "Docebo", "Salesforce", "HubSpot", "Microsoft Teams", "Slack",
  "Mailchimp", "Stripe", "Notion", "Dropbox", "Airtable", "Canva",
];

/* ── §2 ─────────────────────────────────────────────────
   Four refusals. Each card names the migration step a competitor asks
   for, struck out, above what happens instead. The fourth is the
   strategic argument; do not compress this to three. */
const REFUSALS: { asked: string; title: string; body: React.ReactNode }[] = [
  {
    asked: "Move your documents into our platform",
    title: "No content migration",
    body: <>Your SOPs stay in Drive, SharePoint, or your LMS. It reads them in place, at the version that&rsquo;s live today. Not another file management platform.</>,
  },
  {
    asked: "Copy your data into a warehouse we maintain",
    title: "No data warehouse",
    body: <>It reads performance data at the source when a question needs it. Nothing is copied, nothing goes stale, nothing needs a nightly sync.</>,
  },
  {
    asked: "Reorganise your documentation first",
    title: "No cleanup first",
    body: (
      <>
        You don&rsquo;t reorganize your documentation before anything works. It reads what
        you have, and{" "}
        <Link
          href="/platform/answers#content-insights"
          style={{ color: "var(--ed-accent-text)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          tells you where the gaps are
        </Link>
        .
      </>
    ),
  },
  {
    asked: "Replace the tools your team already runs",
    title: "No consolidation",
    body: <>Keep the POS your operators like, the LMS your training team built in, and the CRM your development team runs on. The coherence comes from the layer, not from the tools sharing a logo.</>,
  },
];

/* ── §3 ─────────────────────────────────────────────────
   Fixed order. ERP & FMS leads because those are the franchise-native
   systems. No read/write badges here — that distinction is deliberately
   not on this page at all. Card 7 stays limited to channels and meeting
   tools: no transcript, recording, or call-content language, pending a
   separate decision. */
const CATEGORIES: { name: string; line: string; systems: string[]; more?: boolean }[] = [
  { name: "ERP & FMS", line: "The franchise systems your network actually runs on.", systems: ["FranConnect", "ServiceTitan", "Mindbody", "Zenoti", "ServiceMinder", "Thryv"] },
  { name: "Drives & storage", line: "Every document your brand has written, wherever it lives.", systems: ["SharePoint", "Google Drive", "Dropbox", "Box", "OneDrive", "Notion", "Amazon S3"], more: true },
  { name: "LMS & training", line: "Courses, certifications, and brand standards, answered in the flow of work.", systems: ["TalentLMS", "Docebo", "Trainual", "Scribe", "Frontify", "LearningZen", "Knowhow"], more: true },
  { name: "POS & transactions", line: "What sold, when, at what ticket, and how it compares.", systems: ["Toast", "Square", "Lightspeed", "TouchBistro"] },
  { name: "Accounting", line: "P&L, invoices, and payments, without anyone rebuilding a rollup.", systems: ["QuickBooks", "Xero", "Stripe", "Qvinci", "ProfitKeeper"] },
  { name: "CRM", line: "Who your locations are talking to, and what happens next.", systems: ["Salesforce", "HubSpot", "Zoho", "HighLevel", "Airtable", "Monday"] },
  { name: "Video & comms", line: "The channels your locations already work in, and the tools your team meets in.", systems: ["Microsoft Teams", "Slack", "Zoom", "Google Meet", "Fireflies", "Loom", "Vimeo"], more: true },
  { name: "Marketing", line: "Campaigns and brand assets, drafted on brand and held for approval.", systems: ["Mailchimp", "ActiveCampaign", "Constant Contact", "Canva", "MediaValet"] },
];

/* ── §4 ─────────────────────────────────────────────────── */
const ROLES: { role: string; sees: string; doesnt: string }[] = [
  { role: "Shift lead, Store #118",  sees: "The policy, and their own location's schedule", doesnt: "Margin, labor cost, or any other location" },
  { role: "Owner, Store #118",       sees: "Everything above, plus their P&L and their team's hours", doesnt: "Any other location's numbers" },
  { role: "District manager, West",  sees: "All twelve locations in their territory, compared", doesnt: "Territories they don't manage" },
];

const ACCESS_CARDS = [
  { title: "Inherited, not rebuilt", body: "You don't re-model your permissions here. It reads what your systems already enforce." },
  { title: "Enforced per answer",    body: "Scoping applies to every response, every report, and every action, not at login." },
  { title: "Logged with the answer", body: "Who asked, what they could see, and which sources were used." },
];

/* ── §5 ─────────────────────────────────────────────────
   Twelve, franchise-native first. Fixed order; do not alphabetise. */
const GRID = [
  "FranConnect", "ServiceTitan", "Mindbody", "Zenoti", "ServiceMinder", "Toast",
  "Square", "QuickBooks", "SharePoint", "Trainual", "Salesforce", "Microsoft Teams",
];

const RELATED = [
  { eyebrow: "Answers", title: "What it does with your knowledge", href: "/platform/answers" },
  { eyebrow: "Reporting", title: "What it does with your data", href: "/platform/reporting" },
  { eyebrow: "Control Center", title: "How access is set", href: "/#trust" },
];

export default function IntegrationsContent() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────── */}
      <section className="ed-bg w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-16 pb-10 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-[820px]"
          >
            <Eyebrow accent>Integrations</Eyebrow>
            <h1
              className="ed-fg mt-5 leading-[1.06] tracking-[-0.03em]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 0.6rem + 2.6vw, 2.75rem)",
                textWrap: "pretty",
              }}
            >
              Connect what you already run.{" "}
              {/* Hard break from lg only; below that it wraps naturally. */}
              <span className="lg:block">Nothing migrates.</span>
            </h1>
            <p className="ed-fg-muted mt-6 max-w-[620px] text-base md:text-lg leading-relaxed">
              Your knowledge, your performance data, and the channels your locations work
              in, connected at the source with the permissions they already have. No
              copying, no cleanup, no new system to learn.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-primary ed-btn-arrow inline-flex">
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <Link href="/platform/integrations/directory" className="ed-btn ed-btn-secondary inline-flex">
                Browse all integrations
              </Link>
            </div>
          </motion.div>
        </div>

        {/* The strip runs edge to edge under the copy as texture. §5
            carries the real grid; two static walls would read as one
            section shown twice. Paused under reduced motion. */}
        <div className="pb-14 md:pb-16">
          <div
            className="ig-strip relative flex gap-2.5 overflow-hidden py-1"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="ig-strip-run flex flex-none gap-2.5">
                {STRIP.map((s) => <TextChip key={`${copy}-${s}`}>{s}</TextChip>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Nothing migrates ───────────────────────── */}
      <Band alt>
        <SectionHead
          eyebrow="Connected at the source"
          title="Your content stays where it is. So do your systems."
          sub="Most tools ask you to move your documents somewhere new, copy your data into a warehouse they maintain, or replace the tools you already run. None of that happens here."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {REFUSALS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col p-6" style={CARD}>
                {/* The ask, struck through: the page's argument is a
                    refusal, so the thing being refused has to be on
                    screen for the refusal to land. */}
                <span
                  className="ed-fg-muted"
                  style={{
                    fontSize: 13.5,
                    textDecoration: "line-through",
                    textDecorationThickness: "1.5px",
                    textDecorationColor: "rgba(180,35,24,0.55)",
                  }}
                >
                  {r.asked}
                </span>
                <p
                  className="ed-fg mt-3 text-[18px] tracking-[-0.02em]"
                  style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.25 }}
                >
                  {r.title}
                </p>
                <p className="ed-fg-muted mt-2.5 text-[14.5px] leading-relaxed">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8" delay={0.1}>
          <p className="ed-fg max-w-[740px] text-[20px] leading-snug" style={{ fontFamily: JAKARTA, fontWeight: 600, letterSpacing: "-0.02em" }}>
            You&rsquo;ve been asked to choose between the best tools and one system. That was
            always a false choice.
          </p>
          <p className="ed-fg-muted mt-3 max-w-[740px] text-base leading-relaxed">
            The document you fix on Tuesday is the answer your network gets on Wednesday.
          </p>
        </Reveal>
      </Band>

      {/* ── 3. Eight kinds of connection ──────────────── */}
      <Band>
        <SectionHead
          eyebrow="What connects"
          title="Knowledge, data, channels, and the systems where work gets done."
          sub="Eight categories, connected at the source. Nothing is copied and nothing migrates."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col p-5" style={CARD}>
                <p
                  className="ed-fg text-[17px] tracking-[-0.02em]"
                  style={{ fontFamily: JAKARTA, fontWeight: 700, lineHeight: 1.25 }}
                >
                  {c.name}
                </p>
                {/* The one-liners are what separate this from a logo
                    wall. Never ship these cards as chips alone. */}
                <p className="ed-fg-muted mt-2 text-[14px] leading-relaxed">{c.line}</p>
                <div className="my-4" style={{ borderTop: "1px solid var(--ed-rule)" }} />
                {/* Not bottom-pinned: `mt-auto` here opened a gap under
                    the divider on cards whose one-liner runs short. */}
                <div className="flex flex-wrap gap-1.5">
                  {c.systems.map((s) => <TextChip key={s}>{s}</TextChip>)}
                  {c.more && (
                    <span className="ed-fg-muted self-center" style={{ fontSize: 12.5 }}>
                      + more
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8" delay={0.1}>
          <p className="ed-fg max-w-[820px] text-[17px] leading-relaxed" style={{ fontWeight: 500 }}>
            Reading is what most platforms mean by &ldquo;integration.&rdquo; Writing back, a
            draft held for approval, a ticket opened, a task assigned, is what makes it an
            operating layer.
          </p>
        </Reveal>
      </Band>

      {/* ── 4. Permissions ────────────────────────────── */}
      <Band alt>
        <SectionHead
          eyebrow="Access"
          title="It can't show someone what their own system wouldn't."
          sub="Connections inherit the permissions already set in the systems they read from, and the role and location rules you set here."
        />

        <Reveal className="mt-9">
          <div style={CARD} className="overflow-hidden">
            <div
              className="px-5 py-3"
              style={{ borderBottom: "1px solid var(--ed-rule)", backgroundColor: "var(--ed-card-alt)" }}
            >
              <Meta>The same question · three people · one connection</Meta>
            </div>
            {ROLES.map((r, i) => (
              <div
                key={r.role}
                className="px-5 py-5"
                style={i > 0 ? { borderTop: "1px solid var(--ed-rule)" } : undefined}
              >
                <p className="ed-fg text-[15px]" style={{ fontWeight: 600 }}>{r.role}</p>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="grid grid-cols-1 gap-1 md:grid-cols-[92px_1fr] md:gap-5">
                    <span className="pt-0.5"><Meta color={ACCENT}>Sees</Meta></span>
                    <span className="ed-fg text-[14.5px] leading-snug">{r.sees}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 md:grid-cols-[92px_1fr] md:gap-5">
                    <span className="pt-0.5"><Meta>Doesn&rsquo;t</Meta></span>
                    <span className="ed-fg-muted text-[14.5px] leading-snug">{r.doesnt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ACCESS_CARDS.map((c, i) => (
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

        <Reveal className="mt-7" delay={0.1}>
          <Link href="/#trust" className="ed-link inline-block text-sm" style={{ fontWeight: 500 }}>
            How permissions are set &rarr;
          </Link>
        </Reveal>
      </Band>

      {/* ── 5. The grid ───────────────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="{{TBD:integration-count}} integrations"
          title="Your stack, already connected."
          sub="From POS to P&L, LMS to CRM. If your locations run it, it probably connects."
        />

        <Reveal className="mt-9">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GRID.map((g) => (
              <div
                key={g}
                className="flex items-center justify-center px-3 py-6 text-center"
                style={CARD}
              >
                <span className="ed-fg text-[14px]" style={{ fontWeight: 600, lineHeight: 1.25 }}>
                  {g}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-3" delay={0.08}>
          <span className="ed-fg-muted text-sm">
            Showing 12 of {"{{TBD:integration-count}}"} supported systems
          </span>
          <Link href="/platform/integrations/directory" className="ed-link text-sm" style={{ fontWeight: 500 }}>
            View all &rarr;
          </Link>
        </Reveal>
      </Band>

      {/* ── 6. Custom and API ─────────────────────────── */}
      <Band alt>
        <SectionHead
          eyebrow="Anything else"
          title="Don't see your system?"
          sub="Proprietary platforms, internal databases, and one-off systems connect through our API and custom pipelines."
        />

        <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { title: "Browse the full directory", body: "Every system we connect to, by category.", href: "/platform/integrations/directory", cta: "Open the directory" },
            { title: "Custom integrations", body: <>Proprietary or internal systems, connected through our API. Typical build time: {"{{TBD:custom-integration-timeline}}"}</>, href: "/contact", cta: "Talk to us" },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link href={c.href} className="group flex h-full flex-col justify-between gap-8 p-6" style={CARD}>
                <div>
                  <p className="ed-fg text-[18px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
                    {c.title}
                  </p>
                  <p className="ed-fg-muted mt-2.5 text-[14.5px] leading-relaxed">{c.body}</p>
                </div>
                <span className="flex items-center gap-2 text-sm" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 7. Governance ─────────────────────────────── */}
      {/* REVOCABLE carries the emphasis: it exists only because nothing
          migrates, and a competitor holding your data in their warehouse
          cannot make the claim at all. */}
      <GovernanceBand
        href="/security"
        cta="Read the Trust Center →"
        items={[
          { label: "Least privilege", body: "Read-only unless you grant write access, per system" },
          { label: "No training",     body: "Your data is never used to train a model" },
          { label: "Logged",          body: "Every read and every write, with its source and approver" },
          { label: "Revocable",       body: "Disconnect any system at any time. Nothing was copied.", emphasis: true },
        ]}
      />

      {/* ── 8. Proof ──────────────────────────────────── */}
      <Band>
        <SectionHead title="Connected in a live network." />

        <Reveal className="mt-9">
          <Link href="/case-studies/dekalash" className="group block p-6 md:p-8 transition-transform hover:-translate-y-0.5" style={CARD}>
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[240px_1fr] lg:gap-10">
              <div className="flex flex-col gap-5">
                <Image src="/logos/stories/dekalash.png" alt="DekaLash" width={160} height={40} className="h-auto w-[130px] object-contain" />
                <div>
                  <p
                    style={{
                      fontFamily: JAKARTA, fontWeight: 500, fontSize: "2.5rem",
                      lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ed-accent-text)",
                    }}
                  >
                    94%
                  </p>
                  <p className="ed-fg-muted mt-2 text-[13.5px] leading-snug">
                    AI deflection during the Mindbody migration
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <blockquote
                  className="ed-fg text-[15px] md:text-[17px] leading-relaxed"
                  style={{ fontFamily: JAKARTA, fontWeight: 500 }}
                >
                  &ldquo;AI is now an expectation in franchisee support. Our owners get
                  accurate, brand-specific answers 24/7, not generic internet advice, while
                  our team focuses on bigger initiatives. It&rsquo;s become part of daily
                  operations, with franchisees telling each other, &lsquo;Use
                  Alpha!&rsquo;&rdquo;
                </blockquote>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="ed-fg text-sm" style={{ fontWeight: 600 }}>Troy McCullen</p>
                    <p className="ed-fg-muted text-sm">Vice President of Operations, DekaLash</p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-none transition-transform group-hover:translate-x-1" style={{ color: "var(--ed-accent-text)" }} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        <Reveal className="mt-6" delay={0.08}>
          <p className="ed-fg max-w-[680px] text-[17px] leading-relaxed" style={{ fontWeight: 500 }}>
            The underlying system was being replaced. The answers kept working.
          </p>
        </Reveal>
      </Band>

      {/* ── 9. Related ────────────────────────────────── */}
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

      {/* ── 10. CTA ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0B2C48" }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src="/hero-bg.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.34)" }} />
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
            Send us your stack.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: "rgba(245,237,224,0.92)" }}>
            Tell us what your locations run and we&rsquo;ll show you exactly what connects,
            what it reads, and what it can do once it&rsquo;s connected.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <Link href="/platform/integrations/directory" className="ed-btn ed-btn-secondary-dark inline-flex">
              Browse all integrations
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
