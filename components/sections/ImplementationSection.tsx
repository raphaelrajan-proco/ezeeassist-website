"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link2, Flag, MapPin, RefreshCw } from "lucide-react";

/**
 * Section 9 — Implementation. The ~10-week, four-phase rollout from the
 * deck. Horizontal timeline on desktop (with a connecting line that
 * draws itself), vertical on mobile.
 */

const phases = [
  {
    icon: Link2,
    duration: "6 weeks",
    title: "Integration & planning",
    body: "We connect your stack and define your escalation and governance logic.",
  },
  {
    icon: Flag,
    duration: "2 weeks",
    title: "Corporate launch",
    body: "HQ goes live, tests, and evangelizes internally.",
  },
  {
    icon: MapPin,
    duration: "2 weeks",
    title: "Locations onboarded",
    body: "In-product onboarding, live sessions, recordings — every franchisee up to speed.",
  },
  {
    icon: RefreshCw,
    duration: "Ongoing",
    title: "Continuous support",
    body: "New capability launches, ongoing onboarding, forward-deployed engineering.",
  },
];

const inclusions = [
  "Full white-labelling to your brand",
  "Multi-lingual",
  "Forward-deployed engineering to support your launch",
];

export default function ImplementationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg-alt">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">Implementation</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Live across your entire network in{" "}
            <span className="ed-accent">~10 weeks.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden md:block absolute left-0 right-0"
            style={{ top: "26px" }}
            aria-hidden="true"
          >
            <motion.span
              className="block h-px origin-left"
              style={{ backgroundColor: "var(--ed-accent)", opacity: 0.4 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {phases.map(({ icon: Icon, duration, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3 + i * 0.15,
                }}
                className="relative"
              >
                <div
                  className="flex h-13 w-13 items-center justify-center rounded-2xl mb-6"
                  style={{
                    width: "52px",
                    height: "52px",
                    backgroundColor: "var(--ed-card)",
                    border: "1px solid var(--ed-rule)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.75} className="ed-accent" />
                </div>
                <p
                  className="ed-accent text-xs mb-3"
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {duration}
                </p>
                <h3
                  className="ed-fg text-2xl md:text-3xl mb-3"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="ed-fg-muted text-base"
                  style={{ lineHeight: 1.5 }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Inclusions strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.0 }}
          className="mt-20 md:mt-28 pt-10"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          <p
            className="ed-fg-muted text-xs mb-6"
            style={{
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Every rollout includes
          </p>
          <div className="flex flex-wrap gap-3">
            {inclusions.map((inc) => (
              <span key={inc} className="ed-channel-pill">
                {inc}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
