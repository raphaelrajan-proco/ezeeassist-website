"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Eye, ShieldHalf } from "lucide-react";

/**
 * Section 6 — Governance. The enterprise moment: turns "shadow AI
 * everywhere" into "AI we can let run our business." Deep-black section
 * (CIO/CFO gravitas), three governance cards, closing line.
 */

const cards = [
  {
    icon: ShieldCheck,
    kicker: "Role-based access",
    title: "Every role. Every location. Every rule.",
    body: "HQ Admin, Coach, Franchisee, Location Staff — each with their own view, their own permissions, their own guardrails. Configure once. Apply everywhere.",
  },
  {
    icon: Eye,
    kicker: "Full observability",
    title: "Every action logged. Every interaction visible.",
    body: "Every question asked, action taken, agent triggered, app deployed — captured in a central admin log. Your CISO asks what's running. You answer in a minute.",
  },
  {
    icon: ShieldHalf,
    kicker: "Approve before execute",
    title: "AI proposes. You approve. Then it runs.",
    body: "Configure which actions need human approval and which run autonomously. High-stakes actions loop your team in. Routine actions just work.",
  },
];

export default function GovernanceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="governance" className="relative w-full overflow-hidden scroll-mt-24" style={{ backgroundColor: "#0A0A0A" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,237,224,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p
            className="mb-8 text-xs"
            style={{
              color: "#00AEEF",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Governance
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              color: "#F5EDE0",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Governed by <span style={{ color: "#00AEEF" }}>your rules</span>.
            Visible to <span style={{ color: "#00AEEF" }}>your leadership</span>.
            Trusted by <span style={{ color: "#00AEEF" }}>your CIO</span>.
          </h2>
          <p
            className="mt-10 max-w-3xl text-xl md:text-2xl"
            style={{ color: "#A89B86", lineHeight: 1.5, fontWeight: 400 }}
          >
            Every AI action across your network — logged, permissioned, and
            role-aware. Franchisors decide what HQ sees. Coaches see their
            territory. Franchisees see their locations. Staff see what they
            need. Nothing more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map(({ icon: Icon, kicker, title, body }, i) => (
            <motion.div
              key={kicker}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 + i * 0.12,
              }}
              className="rounded-3xl p-8 md:p-10 flex flex-col"
              style={{
                backgroundColor: "#141414",
                border: "1px solid #2A2A2A",
              }}
            >
              <div
                className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(0,174,239,0.10)" }}
              >
                <Icon size={22} strokeWidth={1.75} style={{ color: "#00AEEF" }} />
              </div>
              <p
                className="mb-3 text-[10px]"
                style={{
                  color: "#00AEEF",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {kicker}
              </p>
              <h3
                className="mb-4 text-2xl md:text-3xl"
                style={{
                  color: "#F5EDE0",
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </h3>
              <p
                className="text-base"
                style={{ color: "#A89B86", lineHeight: 1.55 }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 text-lg md:text-xl"
          style={{ color: "#F5EDE0", fontWeight: 400 }}
        >
          Shadow AI becomes visible AI.{" "}
          <span style={{ color: "#00AEEF" }}>
            Scattered experiments become governed execution.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
