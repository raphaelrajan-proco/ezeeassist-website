"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * Section 16: two paths at different commitment levels. The secondary
 * path is the strategic one, it captures intent from buyers who would
 * never fill a form.
 *
 * TODO: No-form interactive demo. Pick vertical, walk one scenario, see a recommended action,
 * then the form appears. Highest-ROI item beyond the page itself and the most expensive.
 * /demo is currently a stub route.
 */
export default function FinalCTA() {
  return (
    <SectionShell id="book">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <Overline>Ready when you are</Overline>
        <SectionHeadline>Bring us your three worst-performing locations.</SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          We will show you what EZee would surface for each one: the gaps it
          finds, the actions it would take, the sources it reads, and where a
          human stays in the loop.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="ed-btn ed-btn-blue">
            Book a working session
          </Link>
          <Link href="/demo" className="ed-btn ed-btn-secondary">
            Walk a scenario yourself
          </Link>
        </div>
      </motion.div>
    </SectionShell>
  );
}
