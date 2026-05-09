"use client";

import { motion } from "framer-motion";

const stages = [
  {
    label: "Answers",
    stat: "Slash support burden by 70%",
    description:
      "Instant answers from all your content, wherever it lives — with one universal AI.",
  },
  {
    label: "Actions",
    stat: "Coach your coaches and operators",
    description:
      "Take actions directly inside your tech stack with one universal AI. Proactively address training gaps.",
  },
  {
    label: "Automations",
    stat: "Ensure brand compliance. Drive unstoppable execution.",
    description:
      "Always-on workflows across the value chain, running at scale. You dream it up, EZee executes it.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export default function AnswersActionsAutomations() {
  return (
    <section className="w-full" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-40 md:py-48">

        {/* Heading */}
        <motion.div {...fadeUp(0)} className="max-w-5xl mb-20 md:mb-28">
          <p
            className="mb-10 text-xs"
            style={{
              color: "#00AEEF",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            The Product Arc
          </p>
          <h2
            className="text-6xl md:text-7xl lg:text-8xl"
            style={{
              color: "#F5EDE0",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
            }}
          >
            Answers.<br />
            Actions.<br />
            <span style={{ color: "#00AEEF" }}>Automations.</span>
          </h2>
          <p
            className="mt-10 text-xl md:text-2xl max-w-2xl"
            style={{ color: "#A89B86", lineHeight: 1.45, fontWeight: 400 }}
          >
            EZee evolves with your network — from instant answers to full
            workflow automation, all through one AI agent connected to your
            entire tech stack.
          </p>
        </motion.div>

        {/* Three cream cards on black — the deck's signature treatment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(0.1 + i * 0.15)}
              className="rounded-3xl p-10 md:p-12 flex flex-col"
              style={{
                backgroundColor: "#F5EDE0",
                color: "#0A0A0A",
                minHeight: "380px",
              }}
            >
              <p
                className="text-xs mb-8"
                style={{
                  color: "#1B5A6E",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Stage {String(i + 1).padStart(2, "0")}
              </p>

              <h3
                className="text-5xl md:text-6xl mb-8"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.label}
              </h3>

              <p
                className="text-lg mb-6"
                style={{
                  color: "#0A0A0A",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {s.stat}
              </p>

              <p
                className="text-base flex-1"
                style={{ color: "#6B6358", lineHeight: 1.55 }}
              >
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
