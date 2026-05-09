"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const MEETINGS_URL = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL;

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-40 md:py-56">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="ed-overline mb-10">Ready when you are</p>

          <h2
            className="ed-fg text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
            }}
          >
            Book a demo{" "}
            <span className="ed-accent">with us.</span>
          </h2>

          <p
            className="ed-fg-muted mt-12 max-w-2xl text-xl md:text-2xl"
            style={{ lineHeight: 1.45, fontWeight: 400 }}
          >
            See how EZee can transform support, coaching, and compliance across
            your network.
          </p>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
              Book a Demo
            </Link>
            <Link href="/industries" className="ed-btn ed-btn-secondary">
              See solutions by industry →
            </Link>
          </div>
        </motion.div>

        {MEETINGS_URL ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-24"
          >
            <p
              className="ed-fg text-2xl md:text-3xl mb-8"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Pick a time that works for you
            </p>
            <iframe
              src={`${MEETINGS_URL}?embed=true`}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-3xl min-h-[600px] lg:min-h-[700px]"
              title="Book a Demo with EZee Assist"
              style={{ backgroundColor: "var(--ed-bg-alt)" }}
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
