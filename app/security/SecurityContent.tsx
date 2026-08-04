"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { HERO_BG, SCRIM } from "@/lib/data/hero-backgrounds";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { Band, CARD, EASE, JAKARTA, MONO, Meta, Reveal, SectionHead } from "@/components/platform/shared";

/**
 * /security — the Trust Center.
 *
 * **The copy is the live ezeeassist.com/security page, verbatim**, by
 * request. Rebuilt on the editorial system rather than rewritten, so the
 * only thing that changed is how it looks. Two things about that:
 *
 * - The previous local version had *paraphrased* the live copy and every
 *   FAQ answer read "Details coming soon." The real answers are restored
 *   here, so this is a content fix as much as a visual one.
 * - Two house-style rules are knowingly broken because the instruction was
 *   to keep the wording exactly: "Quality and security is ingrained"
 *   (subject/verb), and the dash in the Individualized Data Compartments
 *   body. Fix them at the source and they can be fixed here.
 *
 * This page is the *guarantee* half of the split with Control Center,
 * which carries what HQ configures. Certifications, encryption detail and
 * subprocessors belong here and nowhere else.
 */

const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

const HERO = HERO_BG.default;

/* ── Verbatim from the live page ───────────────────────── */

const RESPONSIBLE: { title: string; body: string }[] = [
  {
    title: "Customer-defined access controls",
    body: "You are in full control of your content. You can determine who should have access and the level of access.",
  },
  {
    title: "No third-party training",
    body: "Your content will never be shared with or used by third parties for any software or LLM training purposes.",
  },
  {
    title: "Enterprise-grade Infrastructure",
    body: "All data processing and computations are completed in secured and encrypted AWS cloud systems.",
  },
];

const STANDARDS: { title: string; body: string }[] = [
  {
    title: "Secured Cloud System",
    body: "All data processing occurs within EZee Assist's AWS EC2 cloud infrastructure. No customer data is utilized for training any language models by third parties.",
  },
  {
    title: "Indexing Logic",
    body: "All customer data and metadata are indexed and stored in machine-readable vector format in a secured cloud system.",
  },
  {
    title: "Individualized Data Compartments",
    body: "No cross-pollination of data. Every customer's data is secured in its own AWS EC2 servers. Customer data cannot be mixed with other customers' data.",
  },
  {
    title: "User Defined Permissions",
    body: "All users must authenticate their access to EZee Assist. Moreover, our system can synchronize with the current access controls to match the user permission levels across customers' tech stack.",
  },
  {
    title: "PII Redaction Controls",
    body: "Advanced AI models used by EZee Assist automatically censor Personally Identifiable Information (PII) from various data sources wherever possible.",
  },
  {
    title: "Secured Encryption",
    body: "All data encryption follows industry-leading standards, employing TLS 1.2/1.3 for transit encryption and AES 256-bit encryption for data at rest.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Which Large Language Models (LLMs) are utilized by EZee Assist?",
    a: "Our services utilize a combination of proprietary AI models developed by EZee Assist, open-source models, and specific models sourced from third parties.",
  },
  {
    q: "How is customer data stored and encrypted?",
    a: "All data is encrypted to industry-leading standards, employing TLS 1.2/1.3 during transit and AES 256-bit encryption while at rest. Furthermore, your data is compartmentalized into dedicated AWS EC2 instances, ensuring complete separation to prevent any inadvertent access or interaction with content from other customers.",
  },
  {
    q: "What procedures do you follow for managing Personally Identifiable Information (PII)?",
    a: "During the integration process, you have full control to specify the data sources and fields integrated into EZee Assist, as well as manage user permissions accordingly. Moreover, EZee Assist utilizes advanced AI models to automatically sanitize and redact customer PII from multiple data sources wherever possible.",
  },
  {
    q: "How is customer data used with AI models?",
    a: "All handling of customer data takes place within EZee Assist's secure AWS cloud environment. There is no sharing of customer data with third-party vendors, and it is never employed in the training of Large Language Models (LLMs).",
  },
];

function Faq({ q, a, first }: { q: string; a: string; first: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: first ? "1px solid var(--ed-border)" : "1px solid var(--ed-rule)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span className="ed-fg text-[16px] leading-snug" style={{ fontFamily: JAKARTA, fontWeight: 600 }}>
          {q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 flex-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--ed-accent-text)" }}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      {open && <p className="ed-fg-muted -mt-1 max-w-[760px] pb-6 text-[14.5px] leading-relaxed">{a}</p>}
    </div>
  );
}

export default function SecurityContent() {
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
              Trust Center
            </p>
            <h1
              className="mt-5 max-w-[880px] leading-[1.06] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700,
                fontSize: "clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)",
                textWrap: "balance",
              }}
            >
              Industry-grade{" "}
              <span className="lg:block" style={{ color: ON_DARK_ACCENT }}>AI standards</span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
              EZee Assist&rsquo;s AI engine is meticulously developed to surpass the current AI
              security, privacy, and compliance protocols. Quality and security is ingrained in
              our foundation.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {/* The live page carries only "Read more". A primary is added
                  because every other page has one and a security page with
                  no way to start a conversation is a miss; the live label
                  is kept as the secondary. */}
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#standards" className="ed-btn ed-btn-secondary-dark inline-flex">Read more</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Responsible AI ─────────────────────────────── */}
      <Band>
        <SectionHead
          eyebrow="Responsible AI"
          title="Responsible AI. Deployed with an unwavering focus on security and safety."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {RESPONSIBLE.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="flex h-full flex-col p-6 md:p-7" style={CARD}>
                <p className="ed-fg text-[17px] tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontWeight: 600, lineHeight: 1.25 }}>
                  {r.title}
                </p>
                <p className="ed-fg-muted mt-3 text-[14.5px] leading-relaxed">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 3. Standards ──────────────────────────────────
          Hairline-topped cells rather than a fourth card grid: §2 above and
          §5's marquee already carry the card and strip forms. */}
      <Band alt id="standards">
        <SectionHead eyebrow="Standards" title="State-of-the-art security and compliance standards" />

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div style={{ borderTop: "1px solid var(--ed-border)", paddingTop: 15 }}>
                <p className="ed-fg text-[15px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>{c.title}</p>
                <p className="ed-fg-muted mt-2 text-[14px] leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 4. FAQ ────────────────────────────────────────── */}
      <Band>
        <SectionHead eyebrow="Questions" title="Frequently asked questions" />
        <Reveal>
          <div className="mt-9 max-w-[880px]">
            {FAQS.map((f, i) => (
              <Faq key={f.q} q={f.q} a={f.a} first={i === 0} />
            ))}
          </div>
        </Reveal>
      </Band>

      {/* ── 5. Trusted by ─────────────────────────────────
          The shared marquee, so this strip cannot drift from the homepage's
          and every logo stays a committed local file. */}
      <Band alt>
        <SectionHead eyebrow="Customers" title="Trusted by" />
        <Reveal>
          <div className="mt-9">
            <LogoMarquee />
          </div>
        </Reveal>
      </Band>

      {/* ── 6. Feedback ───────────────────────────────────── */}
      <Band>
        <SectionHead title="We value your feedback" />
        <Reveal>
          <div className="mt-8 max-w-[820px] p-6 md:p-8" style={CARD}>
            <Meta>Responsible disclosure</Meta>
            <p className="ed-fg mt-4 text-[15px] md:text-base leading-relaxed">
              If you come across any vulnerabilities within the EZee Assist environment, please
              reach out to us at{" "}
              <a href="mailto:security@ezeeassist.com" className="ed-link" style={{ color: "var(--ed-accent-text)" }}>
                security@ezeeassist.com
              </a>
              . Additionally, for any inquiries regarding EZee Assist&rsquo;s security measures,
              you can also email us. Your security is our top priority, and we are committed to
              addressing any concerns promptly and effectively.
            </p>
          </div>
        </Reveal>
      </Band>

      {/* ── 7. CTA ────────────────────────────────────────
          The live page closes on "We look forward to connecting to learn
          about how we can help your brand amplify operations with EZee
          Assist." plus a Contact us button, kept here on the house band. */}
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
            We look forward to connecting.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed" style={{ color: ON_IMAGE }}>
            To learn about how we can help your brand amplify operations with EZee Assist.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Contact us
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
            <Link href="/platform/control-center" className="ed-btn ed-btn-secondary-dark inline-flex">
              What you configure
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
