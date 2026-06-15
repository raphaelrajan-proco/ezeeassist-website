"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroPhoneMockup from "./HeroPhoneMockup";

const PILLARS: { label: string; href: string }[] = [
  { label: "Answers",  href: "#answers"  },
  { label: "Actions",  href: "#actions"  },
  { label: "Agents",   href: "#agents"   },
  { label: "Apps",     href: "#apps"     },
];

const CHANNELS: { label: string; emoji: string; extensible?: boolean }[] = [
  { label: "SMS",            emoji: "💬" },
  { label: "WhatsApp",       emoji: "🟢" },
  { label: "Slack",          emoji: "🔷" },
  { label: "Teams",          emoji: "🔵" },
  { label: "Google Chat",    emoji: "💙" },
  { label: "Email",          emoji: "📧" },
  { label: "Web Portal",     emoji: "🖥️" },
  { label: "Mobile App",     emoji: "📱" },
  { label: "Anywhere else",  emoji: "✨", extensible: true },
];

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="ed-overline mb-10"
            >
              AI Purpose-Built for Franchising
            </motion.p>

            {/* Headline */}
            <h1
              className="ed-fg max-w-[15ch] text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem]"
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
                <span className="ed-accent">AI</span> purpose-built
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="block"
              >
                for franchising and
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
                className="block"
              >
                multi-location brands.
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
              className="ed-fg-muted mt-10 max-w-2xl text-xl md:text-2xl"
              style={{ lineHeight: 1.4, fontWeight: 400 }}
            >
              Answers, Actions, Agents, and Apps — through one conversational
              layer that connects to everything you already run on.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.5 }}
              className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
                Book a Demo
              </Link>
              <Link href="/case-studies" className="ed-btn ed-btn-secondary">
                See Case Studies
              </Link>
            </motion.div>

            {/* Four pillar pills — link to corresponding sections */}
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.8 }}
              className="mt-8 flex flex-wrap gap-2.5"
              aria-label="Capabilities"
            >
              {PILLARS.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  className="ed-pillar-pill"
                >
                  {p.label}
                </Link>
              ))}
            </motion.nav>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 2.1 }}
              className="ed-fg-muted mt-12 text-base"
              style={{ fontWeight: 400 }}
            >
              <span className="ed-fg" style={{ fontWeight: 500 }}>
                60+ brands. 4,500+ locations.
              </span>{" "}
              <span style={{ opacity: 0.75 }}>
                Trusted across franchise and multi-location networks.
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

        {/* Channel pill row — restored, with Mobile App + Anywhere else */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 md:mt-32"
        >
          <p className="ed-overline mb-6">Every Channel</p>
          <div className="flex flex-wrap gap-2.5 max-w-4xl">
            {CHANNELS.map(({ label, emoji, extensible }) => (
              <span
                key={label}
                className="ed-channel-pill"
                data-extensible={extensible ? "true" : undefined}
              >
                <span aria-hidden="true">{emoji}</span>
                {extensible ? <span>+ {label}</span> : label}
              </span>
            ))}
          </div>
          <p
            className="ed-fg-muted mt-6 text-sm md:text-base max-w-2xl"
            style={{ fontWeight: 400 }}
          >
            Embedded in your tools and workflows. One assistant, every surface.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
