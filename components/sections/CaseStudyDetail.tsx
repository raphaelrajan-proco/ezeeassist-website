"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Button from "@/components/ui/Button";

interface RelatedCard {
  brand: string;
  slug: string;
  stat: string;
  bg: string;
  accent: string;
}

interface CaseStudyDetailProps {
  brand: string;
  companyFull: string;
  tag: string;
  accent: string;
  bg: string;
  headline: string;
  results: { value: string; label: string }[];
  challenge: string;
  solution: string;
  results_text: string;
  quote: string | null;
  quoteName: string | null;
  quoteTitle: string | null;
  quoteCompany: string | null;
  quoteInitials: string | null;
  related: RelatedCard[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

export default function CaseStudyDetail({
  brand,
  companyFull,
  tag,
  accent,
  bg,
  headline,
  results,
  challenge,
  solution,
  results_text,
  quote,
  quoteName,
  quoteTitle,
  quoteCompany,
  quoteInitials,
  related,
}: CaseStudyDetailProps) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });
  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0,174,239,0.05) 0%, transparent 60%)",
          }}
        />
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#00AEEF] transition-colors mb-8"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              Back to Case Studies
            </Link>
          </motion.div>

          {/* Grid: text + results card */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
            {/* Left: brand mark + headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            >
              {/* Brand pill */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`${bg} flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 shadow-sm flex-shrink-0`}
                >
                  <span className="text-xl font-extrabold" style={{ color: accent }}>
                    {brand[0]}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF]">
                    Case Study
                  </p>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{companyFull}</p>
                </div>
              </div>

              {/* Tag */}
              <span
                className="inline-flex items-center rounded-full border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-5"
              >
                {tag}
              </span>

              {/* Headline */}
              <h1
                className="text-3xl font-bold leading-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-4xl lg:text-5xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                {headline}
              </h1>
            </motion.div>

            {/* Right: Results card (visible on desktop, stacked top on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
              className="lg:self-center"
            >
              <div className="rounded-2xl border border-[#00AEEF]/25 bg-[#00AEEF]/[0.05] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,174,239,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-5">
                  Key Results
                </p>
                <div className="divide-y divide-[#E5E7EB] dark:divide-white/[0.08]">
                  {results.map(({ value, label }) => (
                    <div key={label} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                      <span className="text-xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.02em" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div ref={bodyRef} className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">

          {/* The Challenge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-12"
          >
            <h2
              className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              The Challenge
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">{challenge}</p>
          </motion.div>

          {/* The Solution */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-12"
          >
            <h2
              className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              The Solution
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">{solution}</p>
          </motion.div>

          {/* The Results */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-12"
          >
            <h2
              className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              The Results
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">{results_text}</p>
          </motion.div>

          {/* Optional quote block */}
          {quote && (
            <motion.div
              custom={3}
              initial="hidden"
              animate={bodyInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="mb-12"
            >
              <blockquote className="relative rounded-2xl border border-[#00AEEF]/20 bg-[#00AEEF]/[0.04] px-8 py-7">
                <Quote
                  size={32}
                  className="absolute -top-4 left-6 text-[#00AEEF] opacity-30"
                  fill="#00AEEF"
                  strokeWidth={0}
                />
                <p className="text-lg leading-8 text-gray-700 dark:text-gray-300 italic mb-6">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00AEEF]/10 flex-shrink-0">
                    <span className="text-sm font-bold text-[#00AEEF]">{quoteInitials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0]">{quoteName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {quoteTitle}
                      {quoteCompany ? `, ${quoteCompany}` : ""}
                    </p>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            custom={quote ? 4 : 3}
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] px-8 py-8 text-center"
          >
            <p
              className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              Want results like these?
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how EZee Assist can transform support for your brand.
            </p>
            <Link href="/contact">
              <Button size="lg">Book a Demo</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Related case studies ───────────────────────────── */}
      <section className="w-full border-t border-[#E5E7EB] dark:border-white/[0.06] bg-[#F7F8FA] dark:bg-[#111111]">
        <div ref={relatedRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-8"
          >
            More Case Studies
          </motion.p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map(({ brand: rb, slug, stat, bg: rbg, accent: ra }, i) => (
              <motion.div
                key={rb}
                custom={i}
                initial="hidden"
                animate={relatedInView ? "visible" : "hidden"}
                variants={fadeUp}
              >
                <Link
                  href={slug}
                  className="group flex items-center gap-5 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)]"
                >
                  <div
                    className={`${rbg} flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 shadow-sm flex-shrink-0`}
                  >
                    <span className="text-xl font-extrabold" style={{ color: ra }}>
                      {rb[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0] group-hover:text-[#00AEEF] transition-colors">
                      {rb}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: ra }}>{stat}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-gray-300 dark:text-gray-600 group-hover:text-[#00AEEF] transition-colors flex-shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
