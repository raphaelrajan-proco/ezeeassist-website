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

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Radial glow — sits behind everything */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,174,239,0.07) 0%, transparent 65%)",
        }}
      />
      {/* Soft gradient fade to light blue at bottom of section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(240,249,255,0.6))",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-8 lg:py-40">
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00AEEF]/25 bg-[#00AEEF]/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00AEEF]">
            AI-Powered Franchise Support
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-5xl font-bold leading-[1.08] tracking-tight text-[#0A0A0A] sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Your franchisees have questions{" "}
          <span className="text-[#00AEEF]">at 2am.</span>
          <br className="hidden sm:block" />
          {" "}Now they get{" "}
          <span className="relative inline-block">
            answers.
            {/* Subtle underline accent */}
            <motion.span
              custom={2}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
              className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-[#00AEEF]/40"
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl"
        >
          EZee Assist is the AI support platform that gives every franchise
          location instant, accurate answers from your brand&apos;s own knowledge
          —&nbsp;24/7, through the channels they already use.
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
          className="mt-10 text-sm text-gray-400"
        >
          Trusted by 50+ franchise brands across North America
        </motion.p>
      </div>
    </section>
  );
}
