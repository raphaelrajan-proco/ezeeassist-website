"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Connect your data and systems",
    body: "EZee connects to all your data and systems — 250+ integrations across drives, CRMs, POS, LMS, marketing, accounting, and more. No migration. Your content stays where it lives.",
  },
  {
    number: "02",
    title: "Build workflows conversationally",
    body: "Build support, coaching, and compliance workflows — and much more — conversationally with EZee. You dream it up, EZee maps it out, and executes automations at scale.",
  },
  {
    number: "03",
    title: "Operators get instant support and take action",
    body: "Operators receive instant support and perform actions directly in your tech stack through the channels they're already used to. When it matters most, your team gets intelligently looped in.",
  },
];

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const last = index === steps.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-24 ${
        last ? "" : "border-b ed-rule"
      }`}
      style={!last ? { borderBottomWidth: "1px", borderBottomStyle: "solid" } : {}}
    >
      <div className="md:col-span-3">
        <p
          className="ed-accent text-8xl md:text-[10rem]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
          }}
        >
          {step.number}
        </p>
      </div>
      <div className="md:col-span-9 flex flex-col justify-center">
        <h3
          className="ed-fg text-3xl md:text-4xl lg:text-5xl mb-6"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {step.title}
        </h3>
        <p
          className="ed-fg-muted text-lg md:text-xl max-w-2xl"
          style={{ lineHeight: 1.55, fontWeight: 400 }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">How It Works</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Connect everything.{" "}
            <span className="ed-accent">EZee handles the rest.</span>
          </h2>
        </motion.div>

        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
