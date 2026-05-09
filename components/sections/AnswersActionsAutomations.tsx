"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Example = {
  request: string;
  /** Short status line that confirms the example */
  status: string;
  /** Status colour — green = action, blue = info, amber = scheduled */
  statusColor: string;
};

type Stage = {
  label: string;
  stat: string;
  description: string;
  example: Example;
};

const stages: Stage[] = [
  {
    label: "Answers",
    stat: "Slash support burden by 70%",
    description:
      "Instant answers from all your content, wherever it lives — with one universal AI.",
    example: {
      request:
        "How do I troubleshoot this Airtable error before opening?",
      status: "Cited: Ops Playbook · pg. 22",
      statusColor: "#00AEEF",
    },
  },
  {
    label: "Actions",
    stat: "Coach your coaches and operators",
    description:
      "Take actions directly inside your tech stack with one universal AI. Proactively address training gaps.",
    example: {
      request:
        "Add this website inquiry to ServiceTitan, tag it as HVAC replacement, and assign to sales.",
      status: "Action complete · 2 minutes saved",
      statusColor: "#16A34A",
    },
  },
  {
    label: "Automations",
    stat: "Ensure brand compliance. Drive unstoppable execution.",
    description:
      "Always-on workflows across the value chain, running at scale. You dream it up, EZee executes it.",
    example: {
      request:
        "Run weekly KPI reviews for every location and send each coach a prioritised action plan.",
      status: "Workflow scheduled · 132 locations",
      statusColor: "#D97706",
    },
  },
];

function ExampleCard({ example, delay }: { example: Example; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className="mt-10 rounded-2xl px-5 py-4"
      style={{
        backgroundColor: "rgba(10,10,10,0.04)",
        border: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      <p
        className="text-xs mb-3"
        style={{
          color: "#1B5A6E",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Operator request
      </p>
      <p
        className="text-base mb-4"
        style={{
          color: "#0A0A0A",
          fontFamily: "var(--font-editorial)",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        &ldquo;{example.request}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: example.statusColor }}
        />
        <p
          className="text-xs"
          style={{
            color: "#6B6358",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          {example.status}
        </p>
      </div>
    </motion.div>
  );
}

function ArrowConnector({ delay, visible }: { delay: number; visible: boolean }) {
  return (
    <svg
      viewBox="0 0 80 24"
      preserveAspectRatio="none"
      className="hidden md:block absolute top-[40px] h-6 pointer-events-none"
      style={{ width: "80px", overflow: "visible" }}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="12"
        x2="62"
        y2="12"
        stroke="#00AEEF"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
      />
      <motion.polyline
        points="55,5 65,12 55,19"
        fill="none"
        stroke="#00AEEF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
      />
    </svg>
  );
}

export default function AnswersActionsAutomations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="w-full" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-40 md:py-48">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-20 md:mb-28"
        >
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
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="block"
            >
              Answers.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="block"
            >
              Actions.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="block"
              style={{ color: "#00AEEF" }}
            >
              Automations.
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
            className="mt-10 text-xl md:text-2xl max-w-2xl"
            style={{ color: "#A89B86", lineHeight: 1.45, fontWeight: 400 }}
          >
            EZee evolves with your network — from instant answers to full
            workflow automation, all through one AI agent connected to your
            entire tech stack.
          </motion.p>
        </motion.div>

        {/* Three cream cards on black, with arrows drawn between */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {stages.map((s, i) => {
            // Sequential reveal: 0.3s gap between stages
            const headerDelay = 0.2 + i * 0.45;
            return (
              <div key={s.label} className="relative">
                {/* Connector arrow before this card (skip first) */}
                {i > 0 && (
                  <div
                    className="absolute"
                    style={{
                      left: "-44px",
                      top: 0,
                    }}
                  >
                    <ArrowConnector
                      delay={headerDelay - 0.1}
                      visible={inView}
                    />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                    delay: headerDelay,
                  }}
                  className="rounded-3xl p-10 md:p-12 flex flex-col h-full"
                  style={{
                    backgroundColor: "#F5EDE0",
                    color: "#0A0A0A",
                    minHeight: "520px",
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

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                      delay: headerDelay + 0.25,
                    }}
                    className="text-lg mb-6"
                    style={{
                      color: "#0A0A0A",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.stat}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                      delay: headerDelay + 0.4,
                    }}
                    className="text-base"
                    style={{ color: "#6B6358", lineHeight: 1.55 }}
                  >
                    {s.description}
                  </motion.p>

                  <ExampleCard
                    example={s.example}
                    delay={headerDelay + 0.55}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
