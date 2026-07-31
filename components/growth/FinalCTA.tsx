"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * The closing ask. One workflow, not three locations: the problem
 * section argues that the locations at 98 and 101 percent are the
 * opportunity, so asking for the worst three contradicted it.
 *
 * TODO: the secondary CTA, "Build a workflow yourself", is held back
 * until the interactive generator exists. It is deliberately not
 * wired to /demo, which is an empty noindex stub, because shipping a
 * button to a blank page costs more than shipping one button.
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
        <SectionHeadline>
          Bring us one franchise workflow. We&rsquo;ll show you how EZee would run it.
        </SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          ...and what it frees your coaches to do with the time back.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="ed-btn ed-btn-blue">
            Speak to an expert
          </Link>
        </div>
      </motion.div>
    </SectionShell>
  );
}
