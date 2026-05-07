"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Plug, Rocket } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    day: "Day 1",
    title: "Kickoff & discovery",
    body: "We map your knowledge sources, systems, workflows, and team structure. No IT department required.",
  },
  {
    icon: Plug,
    day: "Days 2–5",
    title: "Connect & configure",
    body: "We connect to your entire tech stack — drives, CRMs, POS, LMS, marketing tools. Your content stays where it lives.",
  },
  {
    icon: Rocket,
    day: "Day 7",
    title: "Live for your network",
    body: "Operators get instant, brand-accurate answers and can trigger workflows from day one. No training required.",
  },
];

export default function OnboardingTimeline() {
  const headingRef  = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);

  const [headingVisible, setHeadingVisible] = useState(false);
  const [stepsVisible,   setStepsVisible]   = useState(false);
  const [lineVisible,    setLineVisible]     = useState(false);

  useEffect(() => {
    const observe = (
      el: Element | null,
      setter: (v: boolean) => void,
      threshold = 0.1
    ) => {
      if (!el) return () => {};
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };

    const cleanups = [
      observe(headingRef.current, setHeadingVisible),
      observe(stepsRef.current,   setStepsVisible),
      observe(stepsRef.current,   setLineVisible, 0.3),
    ];
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="w-full bg-white dark:bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Onboarding
          </p>
          <h2
            className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Seamless{" "}
            <span className="text-[#00AEEF]">implementation.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Most customers go live in under 7 days — with zero disruption to
            their operations and no migration required.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={stepsRef} className="relative">
          {/* Animated connector line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={lineVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="absolute top-[26px] left-[calc(16.67%+26px)] right-[calc(16.67%+26px)] hidden h-0.5 origin-left bg-gradient-to-r from-[#00AEEF]/20 via-[#00AEEF] to-[#00AEEF]/20 md:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map(({ icon: Icon, day, title, body }, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 28 }}
                animate={stepsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                {/* Icon circle — pulses when in view */}
                <div
                  className={`relative z-10 mb-6 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white dark:bg-[#161616] shadow-[0_0_0_6px_rgba(0,174,239,0.08)] ${
                    stepsVisible ? "animate-pulse-ring" : ""
                  }`}
                  style={stepsVisible ? { animationDelay: `${i * 0.5}s` } : {}}
                >
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>

                {/* Day pill */}
                <span className="mb-2 inline-flex items-center rounded-full bg-[#00AEEF]/10 px-3 py-1 text-xs font-bold text-[#00AEEF]">
                  {day}
                </span>

                <h3
                  className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
