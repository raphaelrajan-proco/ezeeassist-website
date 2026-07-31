"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * The closing ask, and the top of the closing band. This section carries
 * the hero's background so the page bookends on the same blue, and its
 * bottom fade lands on solid CLOSING_BASE, which the footer continues.
 * Change one and change the other, or a seam appears between them.
 *
 * TODO: the secondary CTA, "Build a workflow yourself", is held back
 * until the interactive generator exists. It is deliberately not
 * wired to /demo, which is an empty noindex stub, because shipping a
 * button to a blank page costs more than shipping one button.
 */

/** Shared with the footer. The bottom fade resolves to exactly this. */
export const CLOSING_BASE = "#042036";

export default function FinalCTA() {
  return (
    <section
      id="book"
      className="relative w-full scroll-mt-24 overflow-hidden"
      style={{ backgroundColor: "#0B2C48" }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "left center" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.30)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(4,32,54,0.15) 0%, rgba(4,32,54,0) 35%)" }}
        />
        {/* Resolves to solid CLOSING_BASE so the footer picks it up cleanly. */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24"
      >
        <h2
          className="leading-[1.05] tracking-[-0.03em] max-w-4xl"
          style={{
            color: "#FFFFFF",
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            /* Two lines, one per span. The longer line needs 14.8px of width
               per 1px of font size, so one line each allows 23.1px at 390,
               45.4 at 768 and 60.5 from 1024 up. */
            fontSize: "clamp(1.375rem, 0.02rem + 5.56vw, 3.25rem)",
          }}
        >
          <span className="block">Bring us one franchise workflow.</span>
          <span className="block">We&rsquo;ll show you how EZee runs it.</span>
        </h2>

        <div className="mt-10">
          {/* Identical to the hero CTA. */}
          <Link
            href="/contact"
            className="ed-btn ed-btn-arrow inline-flex"
            style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
          >
            Speak to an expert
            <span className="ed-btn-arrow-badge" aria-hidden="true">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
