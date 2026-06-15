"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PILLARS: { label: string; href: string }[] = [
  { label: "Answers", href: "#answers" },
  { label: "Actions", href: "#actions" },
  { label: "Agents",  href: "#agents"  },
  { label: "Apps",    href: "#apps"    },
];

/**
 * AEO-optimised "Introducing EZee Assist" definition block — editorial.
 * Server-rendered HTML still contains the full definition (motion only
 * animates opacity/y), so AI crawlers can still cite the canonical answer.
 */
export default function WhatIsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          Introducing EZee Assist
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
          <span className="ed-accent">EZee AI</span> turns what
          you&apos;ve built into{" "}
          <span className="ed-accent">results at every location.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.35 }}
          className="ed-fg-muted mt-12 text-xl md:text-2xl max-w-4xl"
          style={{ lineHeight: 1.5, fontWeight: 400 }}
        >
          Every tool you&apos;ve bought. Every SOP you&apos;ve written.
          Every coach you&apos;ve hired. Finally compounding through one
          conversational layer.
        </motion.p>

        {/* AEO definition — kept for crawlers, visually muted */}
        <p className="sr-only">
          EZee Assist is an AI agent purpose-built for franchise and
          multi-location brands. It connects to your entire tech stack —
          250+ native integrations across drives, CRMs, POS, ERP, LMS,
          marketing, accounting, and comms tools — and delivers four core
          capabilities through one conversational layer: Answers (instant
          responses sourced from every connected system), Actions
          (executing tasks across CRM, ERP, scheduling, anywhere), Agents
          (autonomous multi-step workflows triggered on schedule or
          signal), and Apps (custom mini-apps built from a single
          natural-language prompt). Available across SMS, WhatsApp, Slack,
          Teams, Google Chat, Email, Web Portal, and Mobile App. Available
          24/7. Used by 60+ franchise brands across 4,500+ locations.
        </p>

        {/* Larger pillar pills with staggered entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {PILLARS.map((p, i) => (
            <motion.span
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.7 + i * 0.12,
              }}
              className="inline-block"
            >
              <Link
                href={p.href}
                className="ed-pillar-pill ed-pillar-pill-lg"
              >
                {p.label}
              </Link>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
