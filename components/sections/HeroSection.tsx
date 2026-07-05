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

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="ed-overline mb-6"
            >
              The AI Platform for Franchise &amp; Multi-Location Brands
            </motion.p>

            {/* Headline — single flowing block, natural wrapping */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="max-w-[24ch] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
              }}
            >
              <span className="ed-fg">Your teams are already using AI.</span>{" "}
              <span className="ed-accent">
                Give them one your brand can trust.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
              className="ed-fg-muted mt-8 max-w-2xl text-lg md:text-xl"
              style={{ lineHeight: 1.45, fontWeight: 400 }}
            >
              AI answers, actions, agents, and apps. Connected to your
              stack, governed by your rules, deployed across HQ, coaches,
              franchisees, and location staff. Purpose-built for franchise
              and multi-location operations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.45 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
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
              className="ed-fg-muted mt-8 text-sm md:text-base"
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
