"use client";

import { motion } from "framer-motion";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * Section 15: shell only.
 *
 * TODO: Phase 2. One gated original artifact beats four blog posts. A franchise AI maturity
 * model positions us as the endpoint of the category. Ada anchors this slot with original
 * research.
 *
 * Hidden behind SHOW_RESOURCES until content is ready. Flip to true once
 * there is a real artifact to put in the first card. Single row, three
 * cards maximum.
 */
const SHOW_RESOURCES = false;

export default function Resources() {
  if (!SHOW_RESOURCES) return null;

  return (
    <SectionShell alt id="resources">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-12"
      >
        <Overline>Resources</Overline>
        <SectionHeadline>Written for operators, not for search engines.</SectionHeadline>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          className="rounded-3xl p-7 md:p-8"
          style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
        >
          <p className="ed-fg-muted text-sm uppercase tracking-[0.2em] mb-4" style={{ fontWeight: 600 }}>
            Placeholder
          </p>
          <p
            className="ed-fg text-xl tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
          >
            Franchise AI maturity model
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
