"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Overline, SectionHeadline, SectionShell, MockAvatar } from "./shared";
import OutcomesStats from "./outcomes-stats";

/**
 * Proof. The outcome band, then customer voices, then links out to
 * the full case studies. No mini case-study blocks live here, and no
 * brand or location counts: those are the hero eyebrow's job.
 */

// TODO: source a third named quote. Two voices is the floor for this section.
// TODO: replace the Aqua-Tots line with a quote describing an operational change,
// not product praise. Current line is praise-only per our own quote standard.

type Quote = {
  brand: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
  tint: string;
};

const QUOTES: Quote[] = [
  {
    brand: "DekaLash",
    quote:
      "AI is now an expectation in franchisee support. Our owners get accurate, brand-specific answers around the clock while our team focuses on bigger initiatives.",
    name: "Troy McCullen",
    title: "VP Operations, DekaLash",
    initials: "TM",
    tint: "#0072CE",
  },
  {
    brand: "Aqua-Tots",
    quote: "EZee Assist has transformed our business.",
    name: "Paul Preston",
    title: "CEO, Aqua-Tots Swim School",
    initials: "PP",
    tint: "#15803D",
  },
];

const CASE_STUDIES = [
  { label: "DekaLash", href: "/case-studies/dekalash" },
  { label: "WSI", href: "/case-studies/wsi" },
  { label: "DivaDance", href: "/case-studies/divadance" },
];

/** Stand-in for the customer wordmark until real logo SVGs land. */
function BrandMark({ name }: { name: string }) {
  return (
    <span
      className="ed-fg text-base tracking-[-0.02em]"
      style={{ fontFamily: "var(--font-editorial)", fontWeight: 600, opacity: 0.75 }}
    >
      {name}
    </span>
  );
}

function QuoteCard({ q, index }: { q: Quote; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="rounded-3xl p-7 md:p-8 flex flex-col"
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      {/* TODO: swap for the real customer logo SVG. */}
      <BrandMark name={q.brand} />

      <blockquote
        className="ed-fg mt-5 mb-6 text-lg md:text-xl leading-relaxed flex-1"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
      >
        &ldquo;{q.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3">
        {/* TODO: replace the initials avatar with a real headshot. */}
        <MockAvatar initials={q.initials} color={q.tint} />
        <p className="ed-fg-muted text-sm">
          <span className="ed-fg" style={{ fontWeight: 500 }}>{q.name}</span>
          {", "}
          {q.title}
        </p>
      </figcaption>
    </motion.figure>
  );
}

export default function CustomerProof() {
  return (
    <SectionShell id="proof">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-10 md:mb-12"
      >
        <Overline>Proof</Overline>
        <SectionHeadline>Here is where the week goes now.</SectionHeadline>
      </motion.div>

      {/* 1. The outcome band */}
      <OutcomesStats />

      {/* 2. Customer voices */}
      <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {QUOTES.map((q, i) => (
          <QuoteCard key={q.brand} q={q} index={i} />
        ))}
      </div>

      {/* 3. Out to the full stories */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        <span className="ed-fg-muted text-sm">Read the full stories:</span>
        {CASE_STUDIES.map((c) => (
          <Link key={c.href} href={c.href} className="ed-link text-sm" style={{ fontWeight: 500 }}>
            {c.label}
          </Link>
        ))}
        <Link href="/case-studies" className="ed-link text-sm" style={{ fontWeight: 500 }}>
          All case studies
        </Link>
      </motion.div>

      {/* Partner memberships */}
      {/* TODO: real partner badge images to replace text pills before publish. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 md:mt-16"
      >
        <p
          className="ed-fg-muted text-sm uppercase tracking-[0.2em] mb-6"
          style={{ fontWeight: 600 }}
        >
          Trusted across the franchise community
        </p>
        <div className="flex flex-wrap gap-3">
          {["IFA Supplier Forum", "CFA Member", "FSN Verified Member", "WSI Partner"].map((p) => (
            <span
              key={p}
              className="rounded-full px-5 py-2.5 text-sm"
              style={{
                backgroundColor: "var(--ed-card)",
                border: "1px solid var(--ed-rule)",
                color: "var(--ed-fg)",
                fontWeight: 500,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
