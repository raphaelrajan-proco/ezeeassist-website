"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.12 },
  }),
};

const channels = [
  { label: "SMS",              emoji: "💬" },
  { label: "Email",            emoji: "📧" },
  { label: "Slack",            emoji: "🔷" },
  { label: "Teams",            emoji: "🔵" },
  { label: "Google Chat",      emoji: "💙" },
  { label: "Chrome Extension", emoji: "🌐" },
  { label: "Web Portal",       emoji: "🖥️" },
];

const bobClasses = [
  "animate-bob-0",
  "animate-bob-1",
  "animate-bob-2",
  "animate-bob-3",
  "animate-bob-4",
  "animate-bob-5",
  "animate-bob-0",
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-hero-gradient bg-noise">
      {/* Animated mesh gradient — slow breathing movement */}
      <div
        className="animate-mesh pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 25% 40%, rgba(0,174,239,0.10) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 75% 65%, rgba(0,174,239,0.07) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Radial glow — top center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,174,239,0.10) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-8 lg:py-40">
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00AEEF]/25 bg-[#00AEEF]/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00AEEF]">
            AI-Powered Multi-Location Execution
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Your AI support agent for
          <br />
          <span className="text-[#00AEEF]">multi-location execution.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl"
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
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/contact">
            <Button size="lg">Book a Demo</Button>
          </Link>
          <Link href="/case-studies">
            <Button size="lg" variant="secondary">See Case Studies</Button>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 text-sm text-gray-400 dark:text-gray-500"
        >
          Trusted by 60+ brands across 4,000+ locations
        </motion.p>

        {/* Floating channel pills */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {channels.map(({ label, emoji }, i) => (
            <span
              key={label}
              className={`${bobClasses[i]} inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] dark:border-white/[0.12] bg-white dark:bg-[#161616] px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 shadow-sm`}
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </span>
          ))}
        </motion.div>

        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 text-xs text-gray-400 dark:text-gray-500"
        >
          Available on every channel your team already uses
        </motion.p>
      </div>
    </section>
  );
}
