"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DatabaseZap, MessageCircle, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: DatabaseZap,
    title: "Connect Your Knowledge",
    body: "We plug into your existing systems — Google Drive, SharePoint, Dropbox, WordPress, YouTube, and more. No migration required. Your content stays exactly where it is.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Franchisees Ask Questions",
    body: "Through text message, email, Slack, Microsoft Teams, or our web portal. No new tools to learn. No behavior change required from your network.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Instant, Accurate Answers",
    body: "AI delivers brand-specific answers in under 30 seconds, 24/7. If it can't answer, it creates a ticket and routes to your team — with full context already attached.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.15 },
  }),
};

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #F7F8FA 0%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            How It Works
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Up and running in{" "}
            <span className="text-[#00AEEF]">days, not months.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Connector line */}
          <div
            className="absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] hidden h-px bg-gradient-to-r from-[#00AEEF]/30 via-[#00AEEF]/60 to-[#00AEEF]/30 md:block"
            aria-hidden="true"
          />

          {steps.map(({ number, icon: Icon, title, body }, i) => (
            <motion.div
              key={number}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
            >
              {/* Step circle */}
              <div className="relative z-10 mb-6 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white shadow-[0_0_0_6px_rgba(0,174,239,0.08)]">
                <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AEEF] mb-2">{number}</p>
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
    </section>
  );
}
