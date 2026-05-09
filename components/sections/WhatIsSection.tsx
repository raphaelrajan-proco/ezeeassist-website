"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * AEO-optimised "What is EZee Assist?" definition block — editorial pull-quote.
 *
 * Server-rendered HTML still contains the full definition (the motion wrappers
 * only animate opacity/y, the text is in the DOM on first paint), so AI
 * crawlers (ChatGPT, Perplexity, Claude, Google AI Overviews) can still cite
 * the canonical "What is EZee Assist?" answer.
 */
export default function WhatIsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Pre-split the long definition into clauses so we can fade each in turn —
  // gives the section a "thoughtful read" cadence instead of arriving as a wall.
  const clauses: React.ReactNode[] = [
    "EZee Assist is an AI support agent purpose-built for franchise and multi-location brands.",
    <>
      It connects to your entire tech stack —{" "}
      <Link href="/solution/integrations" className="ed-link">
        250+ integrations across drives, CRMs, POS, LMS, and marketing tools
      </Link>{" "}
      — and becomes your business&apos;s AI coach.
    </>,
    "Operators receive instant support, perform actions, and trigger automated workflows directly through the channels they already use: SMS, email, Slack, Microsoft Teams, WhatsApp, and web.",
    <>
      When human expertise is needed, EZee&apos;s{" "}
      <Link href="/solution/ticketing" className="ed-link">
        intelligent ticketing system
      </Link>{" "}
      loops in the right team member with full context.
    </>,
  ];

  return (
    <section
      ref={ref}
      aria-label="What is EZee Assist"
      className="w-full ed-bg-alt"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="ed-overline mb-10"
        >
          What is EZee Assist?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="ed-fg text-4xl md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          The AI operating system for franchise and multi-location businesses.
        </motion.h2>

        <p
          className="ed-fg-muted mt-12 text-xl md:text-2xl max-w-4xl"
          style={{ lineHeight: 1.5, fontWeight: 400 }}
        >
          {clauses.map((clause, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.4 + i * 0.18,
              }}
              className="block mb-2"
            >
              {clause}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
