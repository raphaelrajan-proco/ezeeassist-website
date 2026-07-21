"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * The Shift: full-bleed dark section, high contrast against The Gap.
 * Playbooks become a working team.
 */
export default function TheShift() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(245,237,224,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: "820px",
          height: "560px",
          top: "-180px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,174,239,0.10) 0%, transparent 65%)",
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
          className="text-xs uppercase tracking-[0.2em] mb-8"
          style={{ color: "#00AEEF", fontWeight: 500 }}
        >
          The Shift
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="max-w-4xl text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
          style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", fontWeight: 500 }}
        >
          Your playbooks become{" "}
          <span style={{ color: "#00AEEF" }}>a team that works every location</span>
          , every day.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.35 }}
          className="mt-10 max-w-3xl text-xl md:text-2xl leading-relaxed"
          style={{ color: "#A89B86" }}
        >
          EZee turns what you have already written, recorded, and measured
          into working AI. It answers your operators, watches how each
          location is performing, prepares your coaches, and runs the
          recurring work in the background. A team behind your team.
        </motion.p>

        <div className="mt-12 flex flex-wrap gap-3">
          {["Better support", "Better coaching", "Better unit economics"].map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.12 }}
              className="rounded-full px-5 py-2.5 text-sm"
              style={{
                backgroundColor: "rgba(0,174,239,0.10)",
                border: "1px solid rgba(0,174,239,0.30)",
                color: "#00AEEF",
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
              }}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
