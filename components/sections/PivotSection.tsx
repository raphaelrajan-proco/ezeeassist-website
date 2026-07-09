"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import SolutionBento from "./SolutionBento";

/**
 * Section 3 — The Pivot: "Now bring it home."
 * Full-bleed deep-black section, high contrast against the cream
 * Reality section above. Introduces EZee as the platform.
 */

const PILLARS = ["Answers", "Actions", "Agents", "Apps"];

export default function PivotSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Subtle dot grid atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,237,224,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      {/* Soft blue atmosphere behind headline */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "900px",
          height: "600px",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,174,239,0.10) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 text-xs"
          style={{
            color: "#00AEEF",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          The Platform
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="max-w-5xl text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
          style={{
            color: "#F5EDE0",
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#00AEEF" }}>One platform.</span>{" "}
          <span>
            Built for the way franchise and multi-location brands actually
            operate.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.8 }}
          className="mt-12 max-w-3xl text-xl md:text-2xl"
          style={{ color: "#A89B86", lineHeight: 1.5, fontWeight: 400 }}
        >
          Your teams have AI scattered across tabs and tools. EZee brings
          it onto one platform: connected to your stack, available on
          every surface, acting on your behalf, scoped to each role,
          fully observable, and secure by default.
        </motion.p>

        {/* Pillar pills */}
        <div className="mt-12 flex flex-wrap gap-3">
          {PILLARS.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.1 + i * 0.12,
              }}
              className="inline-block"
            >
              {/* Answers is solid (the foundation); the rest are outlined */}
              <Link
                href={`#${p.toLowerCase()}`}
                className={`ed-pillar-pill ed-pillar-pill-lg${
                  p === "Answers" ? "" : " ed-pillar-pill-outline"
                }`}
              >
                {p}
              </Link>
            </motion.span>
          ))}
        </div>

        {/* Platform bento grid */}
        <SolutionBento />

        {/* Closing beat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 text-center"
        >
          <p
            className="text-2xl md:text-3xl tracking-tight mx-auto max-w-3xl"
            style={{
              color: "#F5EDE0",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            All of it, one platform.{" "}
            <span style={{ color: "#00AEEF" }}>
              Live across your network in about ten weeks.
            </span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="ed-btn ed-btn-blue">
              Book a Demo
            </Link>
            <Link href="#use-cases" className="ed-btn ed-btn-secondary-dark">
              See what brands build ↓
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
