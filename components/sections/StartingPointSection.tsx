"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * The Starting Point — narrative-setup section that frames the customer's
 * existing investment (stack + assets + people) BEFORE EZee is introduced.
 *
 * Mirrors slide 2 of the deck. Pill chips group into three categories:
 * tech stack tools, knowledge assets, and a final highlighted people pill.
 */

type Chip = { label: string; emoji?: string };

const TECH_STACK: Chip[] = [
  { label: "Salesforce",   emoji: "☁️" },
  { label: "HubSpot",      emoji: "🟠" },
  { label: "Slack",        emoji: "🔷" },
  { label: "Teams",        emoji: "🔵" },
  { label: "WhatsApp",     emoji: "🟢" },
  { label: "QuickBooks",   emoji: "📒" },
  { label: "Xero",         emoji: "🔷" },
  { label: "Mindbody",     emoji: "🧘" },
  { label: "ServiceTitan", emoji: "🔧" },
  { label: "FranConnect",  emoji: "🔗" },
  { label: "SharePoint",   emoji: "📁" },
  { label: "YouTube",      emoji: "▶️" },
  { label: "Mailchimp",    emoji: "✉️" },
  { label: "Canva",        emoji: "🎨" },
];

const ASSETS: Chip[] = [
  { label: "Operating Manual",   emoji: "📘" },
  { label: "Brand SOPs",         emoji: "📐" },
  { label: "Training videos",    emoji: "🎬" },
  { label: "Compliance rules",   emoji: "✅" },
  { label: "Historical tickets", emoji: "🗂️" },
];

function ChipRow({
  title,
  chips,
  delay,
}: {
  title: string;
  chips: Chip[];
  delay: number;
}) {
  return (
    <div className="mb-10">
      <p
        className="ed-fg-muted text-xs mb-4"
        style={{
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {chips.map((c, i) => (
          <motion.span
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: delay + i * 0.03,
            }}
            className="ed-channel-pill"
          >
            {c.emoji && <span aria-hidden="true">{c.emoji}</span>}
            {c.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function StartingPointSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg-alt">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16"
        >
          <p className="ed-overline mb-8">The Starting Point</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            You&apos;ve built a{" "}
            <span className="ed-accent">powerful system.</span>
          </h2>
          <p
            className="ed-fg-muted mt-8 text-xl md:text-2xl max-w-3xl"
            style={{ lineHeight: 1.45, fontWeight: 400 }}
          >
            A critical tech stack. Essential playbooks. An HQ team to coach
            and drive system performance.
          </p>
        </motion.div>

        <ChipRow title="Tech Stack" chips={TECH_STACK} delay={0.25} />
        <ChipRow title="Knowledge Assets" chips={ASSETS} delay={0.55} />

        {/* Final highlighted people pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
          className="mt-6"
        >
          <p
            className="ed-fg-muted text-xs mb-4"
            style={{
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            And your people
          </p>
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5"
            style={{
              backgroundColor: "rgba(0,174,239,0.12)",
              border: "1px solid rgba(0,174,239,0.35)",
              color: "var(--ed-accent)",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontSize: "0.95rem",
              letterSpacing: "-0.005em",
            }}
          >
            <span aria-hidden="true">👥</span>
            + Your coaches &amp; field teams
          </span>
        </motion.div>
      </div>
    </section>
  );
}
