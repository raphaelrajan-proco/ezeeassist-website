"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck, Plug, Rocket } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    day: "Day 1",
    title: "Kickoff & discovery",
    body: "We map your knowledge sources, support workflows, and team structure. No IT department required.",
  },
  {
    icon: Plug,
    day: "Days 2–5",
    title: "Connect & configure",
    body: "We connect to your existing systems — Google Drive, SharePoint, Slack, Teams, and more. Your content stays where it lives.",
  },
  {
    icon: Rocket,
    day: "Day 7",
    title: "Live for your network",
    body: "Your franchisees get instant, brand-accurate answers from day one. No training required on their end.",
  },
];

export default function OnboardingTimeline() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Onboarding
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Live in{" "}
            <span className="text-[#00AEEF]">7 days.</span> Seriously.
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 max-w-xl mx-auto">
            Our implementation process is designed to be painless. Most customers
            go live in under a week — with zero disruption to their operations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={stepsRef} className="relative">
          {/* Connector line — desktop only */}
          <div
            className="absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] hidden h-0.5 bg-gradient-to-r from-[#00AEEF]/20 via-[#00AEEF] to-[#00AEEF]/20 md:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map(({ icon: Icon, day, title, body }, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 28 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                {/* Icon circle */}
                <div className="relative z-10 mb-6 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white shadow-[0_0_0_6px_rgba(0,174,239,0.08)]">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>

                {/* Day pill */}
                <span className="mb-2 inline-flex items-center rounded-full bg-[#00AEEF]/10 px-3 py-1 text-xs font-bold text-[#00AEEF]">
                  {day}
                </span>

                <h3
                  className="text-lg font-bold text-[#0A0A0A] mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-7 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
