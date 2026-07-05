"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const MEETINGS_URL = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL;

/**
 * Section 10 — Closing narrative + CTA. Full-bleed, high contrast.
 * Anchor #book-demo is the target for every Use Case Matrix cell and
 * the hero pillar links that route to conversion.
 */
export default function ClosingCTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="book-demo"
      className="relative w-full overflow-hidden scroll-mt-24"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Atmospheric blue glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "900px",
          height: "600px",
          bottom: "-250px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,174,239,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40 lg:py-48"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
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
            Ready when you are
          </p>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              color: "#F5EDE0",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Your teams are already building.{" "}
            <span style={{ color: "#00AEEF" }}>Let&apos;s build it right.</span>
          </h2>

          <p
            className="mt-12 max-w-3xl text-xl md:text-2xl"
            style={{ color: "#A89B86", lineHeight: 1.5, fontWeight: 400 }}
          >
            Consolidate the scattered AI work onto one platform. Connected,
            governed, and purpose-built for how franchise and multi-location
            brands actually operate.
          </p>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
              Book a Demo
            </Link>
            <Link href="/case-studies" className="ed-btn ed-btn-secondary-dark">
              See what leading brands are building →
            </Link>
          </div>
        </motion.div>

        {MEETINGS_URL ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-20 md:mt-24"
          >
            <iframe
              src={`${MEETINGS_URL}?embed=true`}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-3xl min-h-[600px] lg:min-h-[700px]"
              title="Book a Demo with EZee Assist"
              style={{ backgroundColor: "#141414" }}
            />
          </motion.div>
        ) : null}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 text-sm"
          style={{
            color: "#A89B86",
            fontWeight: 500,
            letterSpacing: "0.1em",
          }}
        >
          60+ brands · 4,500+ locations · 250+ integrations · One platform
        </motion.p>
      </div>
    </section>
  );
}
