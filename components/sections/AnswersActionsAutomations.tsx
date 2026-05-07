"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, GitBranch, ArrowRight } from "lucide-react";

const stages = [
  {
    icon: MessageSquare,
    label: "Answers",
    stat: "Slash support burden by 70%",
    description:
      "Instant answers from all your content, wherever it lives — with one universal AI.",
    color: "#00AEEF",
    bgClass: "bg-[#00AEEF]/10 border-[#00AEEF]/25",
    iconBgClass: "bg-[#00AEEF]/15 border-[#00AEEF]/30",
  },
  {
    icon: Zap,
    label: "Actions",
    stat: "Coach your coaches and operators",
    description:
      "Take actions directly inside your tech stack with one universal AI. Proactively address training gaps.",
    color: "#0077A8",
    bgClass: "bg-[#0077A8]/10 border-[#0077A8]/25",
    iconBgClass: "bg-[#0077A8]/15 border-[#0077A8]/30",
  },
  {
    icon: GitBranch,
    label: "Automations",
    stat: "Ensure brand compliance. Drive unstoppable execution.",
    description:
      "Always-on workflows across the value chain, running at scale. You dream it up, EZee executes it.",
    color: "#004F70",
    bgClass: "bg-[#004F70]/10 border-[#004F70]/25",
    iconBgClass: "bg-[#004F70]/15 border-[#004F70]/30",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

export default function AnswersActionsAutomations() {
  return (
    <section className="w-full bg-white dark:bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Heading */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
            The Product Arc
          </p>
          <h2
            className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Answers{" "}
            <span className="text-[#00AEEF]">→</span>{" "}
            Actions{" "}
            <span className="text-[#00AEEF]">→</span>{" "}
            Automations
          </h2>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-8">
            EZee evolves with your network — from instant answers to full workflow automation,
            all through one AI agent connected to your entire tech stack.
          </p>
        </motion.div>

        {/* Three columns */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Connecting arrows — desktop only */}
          <div className="absolute hidden md:flex items-center" style={{ top: "40px", left: "calc(33.33% - 12px)", right: "calc(33.33% - 12px)", pointerEvents: "none" }}>
            <div className="flex-1 flex items-center justify-center">
              <ArrowRight size={22} className="text-[#00AEEF]/50 mx-auto" strokeWidth={1.5} />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ArrowRight size={22} className="text-[#00AEEF]/50 mx-auto" strokeWidth={1.5} />
            </div>
          </div>

          {stages.map(({ icon: Icon, label, stat, description, color, bgClass, iconBgClass }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.12)}
              className={`relative flex flex-col rounded-2xl border-2 p-8 ${bgClass} shadow-[0_2px_8px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1`}
            >
              {/* Stage number */}
              <span
                className="text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{ color }}
              >
                Stage {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 mb-6 ${iconBgClass}`}
              >
                <Icon size={26} style={{ color }} strokeWidth={1.75} />
              </div>

              {/* Label */}
              <h3
                className="text-3xl font-extrabold mb-2"
                style={{ color, letterSpacing: "-0.02em" }}
              >
                {label}
              </h3>

              {/* Stat / hook */}
              <p
                className="text-sm font-semibold mb-3"
                style={{ color }}
              >
                {stat}
              </p>

              {/* Description */}
              <p className="text-base leading-7 text-gray-600 dark:text-gray-400 flex-1">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
