"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroAIStackVisual from "./HeroAIStackVisual";

export default function HeroSection() {
  return (
    <section className="relative w-full ed-bg overflow-hidden">
      {/* Ambient blue blob — slow drift behind headline */}
      <div
        className="ed-hero-blob"
        style={{
          width: "780px",
          height: "780px",
          top: "-120px",
          left: "-160px",
        }}
        aria-hidden="true"
      />
      <div
        className="ed-hero-blob"
        style={{
          width: "520px",
          height: "520px",
          bottom: "-80px",
          right: "-100px",
          animationDelay: "-3s",
          animationDuration: "11s",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="ed-overline mb-10"
            >
              The AI Platform for Franchise &amp; Multi-Location Brands
            </motion.p>

            {/* Headline — two lines */}
            <h1
              className="ed-fg max-w-[16ch] text-6xl md:text-7xl lg:text-8xl"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="block"
              >
                The AI your teams already use.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                className="block mt-4"
              >
                Now built on the platform{" "}
                <span className="ed-accent">your brand can trust.</span>
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
              className="ed-fg-muted mt-10 max-w-2xl text-xl md:text-2xl"
              style={{ lineHeight: 1.4, fontWeight: 400 }}
            >
              Every AI answer, action, agent, and app — connected to your
              stack, governed by your rules, deployed across HQ, coaches,
              franchisees, and every location. Purpose-built for franchise
              and multi-location operations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.45 }}
              className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
                Book a Demo
              </Link>
              <Link href="#use-cases" className="ed-btn ed-btn-secondary">
                See how brands build on EZee
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.75 }}
              className="ed-fg-muted mt-12 text-base"
              style={{ fontWeight: 400 }}
            >
              <span className="ed-fg" style={{ fontWeight: 500 }}>
                60+ brands. 4,500+ locations. 250+ integrations.
              </span>{" "}
              One platform.
            </motion.p>
          </div>

          {/* Right: scattered-AI → EZee visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
            className="lg:col-span-5"
          >
            <HeroAIStackVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
