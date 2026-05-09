"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    day: "Day 1",
    title: "Kickoff & discovery",
    body: "We map your knowledge sources, systems, workflows, and team structure. No IT department required.",
  },
  {
    day: "Days 2–5",
    title: "Connect & configure",
    body: "We connect to your entire tech stack — drives, CRMs, POS, LMS, marketing tools. Your content stays where it lives.",
  },
  {
    day: "Day 7",
    title: "Live for your network",
    body: "Operators get instant, brand-accurate answers and can trigger workflows from day one. No training required.",
  },
];

export default function OnboardingTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg-alt">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mb-20 md:mb-28"
        >
          <p className="ed-overline mb-8">Onboarding</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Seamless{" "}
            <span className="ed-accent">implementation.</span>
          </h2>
          <p
            className="ed-fg-muted mt-8 max-w-2xl text-lg md:text-xl"
            style={{ lineHeight: 1.5 }}
          >
            Most customers go live in under 7 days — with zero disruption to
            their operations and no migration required.
          </p>
        </motion.div>

        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16"
              style={
                i !== steps.length - 1
                  ? {
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderColor: "var(--ed-rule)",
                    }
                  : {}
              }
            >
              <div className="md:col-span-3">
                <p
                  className="ed-accent text-base"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {step.day}
                </p>
              </div>
              <div className="md:col-span-6">
                <h3
                  className="ed-fg text-3xl md:text-4xl"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p
                  className="ed-fg-muted text-base md:text-lg"
                  style={{ lineHeight: 1.5 }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
