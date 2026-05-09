"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroPhoneMockup from "./HeroPhoneMockup";

const ACCENT_TEXT = "for multi-location execution.";

export default function HeroSection() {
  const accentRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(accentRef, { once: true, margin: "-80px" });
  const [accentVisible, setAccentVisible] = useState(false);

  // Trigger the blue-wipe shortly after the headline lines have arrived,
  // so the accent fills in last — gives the hero its "arrival" beat.
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAccentVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, [inView]);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="ed-overline mb-10"
            >
              AI-Powered Multi-Location Execution
            </motion.p>

            {/* Headline — each line ARRIVES separately, slower, ease-out */}
            <h1
              className="ed-fg max-w-[18ch] text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem]"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.045em",
                lineHeight: 0.95,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="block"
              >
                Your AI support agent
              </motion.span>

              <motion.span
                ref={accentRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                className="block ed-blue-wipe"
                data-visible={accentVisible}
                data-text={ACCENT_TEXT}
              >
                {ACCENT_TEXT}
              </motion.span>
            </h1>

            {/* Subheadline — clause-staggered fade */}
            <p
              className="ed-fg-muted mt-10 max-w-2xl text-xl md:text-2xl"
              style={{ lineHeight: 1.4, fontWeight: 400 }}
            >
              {[
                "Automatically resolve repetitive questions.",
                "Coach operators on driving business performance.",
                "Ensure brand compliance at scale.",
              ].map((clause, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: 1.0 + i * 0.18,
                  }}
                  className="block"
                >
                  {clause}
                </motion.span>
              ))}
            </p>

            {/* CTAs — scale + fade entrance after headline finishes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.7 }}
              className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
                Book a Demo
              </Link>
              <Link href="/case-studies" className="ed-btn ed-btn-secondary">
                See Case Studies
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 2.0 }}
              className="ed-fg-muted mt-16 text-base"
              style={{ fontWeight: 400 }}
            >
              Available on SMS, Email, Slack, Teams, Google Chat, Chrome Extension, and Web.
              <span className="block mt-2 text-sm" style={{ opacity: 0.7 }}>
                Trusted by 60+ brands across 4,000+ locations.
              </span>
            </motion.p>
          </div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.9 }}
            className="lg:col-span-5"
          >
            <HeroPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
