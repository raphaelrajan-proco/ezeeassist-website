"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Overline, SectionHeadline, SectionShell, StatBlock } from "./shared";

const GAP_STATS = [
  {
    staticValue: "50%",
    label: "Repetitive questions",
    body: "Operators cannot find what they need across ten systems, so it routes to a person.",
  },
  {
    staticValue: "30%",
    label: "Manual admin and compliance",
    body: "Chasing documents, moving data between systems, assembling reports by hand.",
  },
  {
    staticValue: "20%",
    label: "Actual coaching",
    body: "And it runs on lagging indicators. Last month's numbers, last quarter's reviews.",
  },
];

export default function TheGap() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <SectionShell alt>
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mb-16 md:mb-20"
      >
        <Overline>The Gap</Overline>
        <SectionHeadline>
          You built the playbooks. They are not reaching the locations.
        </SectionHeadline>
        <p className="ed-fg-muted mt-8 text-base md:text-lg leading-relaxed max-w-3xl">
          Franchise systems invest years in SOPs, training, brand standards,
          and field coaching. Then the playbook sits in a drive nobody opens,
          the coaches spend their week answering questions they have answered
          a hundred times, and performance conversations happen quarterly
          against numbers that went stale weeks ago.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {GAP_STATS.map((s, i) => (
          <StatBlock
            key={s.label}
            staticValue={s.staticValue}
            label={s.label}
            body={s.body}
            index={i}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="mt-20 md:mt-28 text-3xl md:text-4xl lg:text-5xl max-w-4xl"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}
      >
        <span className="ed-fg-muted">
          Four days in five go to support and admin.
        </span>{" "}
        <span className="ed-fg">Not to growth.</span>
      </motion.p>
    </SectionShell>
  );
}
