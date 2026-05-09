"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.18 },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40 lg:py-48">

        {/* Overline */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="ed-overline mb-10"
        >
          AI-Powered Multi-Location Execution
        </motion.p>

        {/* Headline — editorial, left-aligned, massive */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="ed-fg max-w-[18ch] text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
          }}
        >
          <span className="block">Your AI support agent</span>
          <span className="block ed-accent">for multi-location execution.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="ed-fg-muted mt-10 max-w-2xl text-xl md:text-2xl"
          style={{ lineHeight: 1.4, fontWeight: 400 }}
        >
          Automatically resolve repetitive questions. Coach operators on driving
          business performance. Ensure brand compliance at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/contact" className="ed-btn ed-btn-primary">
            Book a Demo
          </Link>
          <Link href="/case-studies" className="ed-btn ed-btn-secondary">
            See Case Studies
          </Link>
        </motion.div>

        {/* Trust line — replaces channel pills */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="ed-fg-muted mt-16 text-base"
          style={{ fontWeight: 400 }}
        >
          Available on SMS, Email, Slack, Teams, Google Chat, Chrome Extension, and Web.
          <span className="block mt-2 text-sm" style={{ opacity: 0.7 }}>
            Trusted by 60+ brands across 4,000+ locations.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
