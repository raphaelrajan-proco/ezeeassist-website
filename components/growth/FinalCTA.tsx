"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

        {/* HubSpot meetings embed lands here, replacing the old
            Speak-to-an-expert button. TODO: swap the placeholder body for
            the real embed snippet when it is supplied. The container is
            sized to the meetings widget's usual footprint so the section
            does not reflow when the embed drops in. */}
        <div
          id="book-a-time"
          className="mt-10 w-full max-w-[760px] rounded-2xl flex items-center justify-center"
          style={{
            minHeight: 480,
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1.5px dashed rgba(255,255,255,0.35)",
          }}
        >
          <div className="text-center px-8 py-12">
            <p
              className="text-white text-lg"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 600 }}
            >
              Calendar embed placeholder
            </p>
            <p className="mt-2 text-sm" style={{ color: "rgba(245,237,224,0.75)" }}>
              The HubSpot meetings widget replaces this block.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
