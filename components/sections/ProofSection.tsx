"use client";

import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef } from "react";
import { customerLogos } from "@/lib/data/customer-logos";

/**
 * Section 8 — Proof. Franchise credibility: a static logo grid (not a
 * marquee, for maximum trust), three stat callouts, and a marquee
 * Paul Preston pull-quote.
 */

const stats = [
  { end: 67, suffix: "%", label: "Ticket reduction in 30 days", brand: "WSI · 500+ locations" },
  { end: 94, suffix: "%", label: "AI deflection during Mindbody migration", brand: "DekaLash · 120 locations" },
  { end: 650, suffix: "+", label: "Support hours saved in 6 months", brand: "DivaDance · 50 locations" },
];

function StatCallout({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <p
        className="ed-accent text-6xl md:text-7xl lg:text-8xl"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
        }}
      >
        <CountUp
          end={stat.end}
          suffix={stat.suffix}
          duration={2.5}
          useEasing
          enableScrollSpy
          scrollSpyOnce
          separator=","
        />
      </p>
      <p
        className="ed-fg mt-5 text-lg md:text-xl max-w-xs"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25 }}
      >
        {stat.label}
      </p>
      <p
        className="ed-fg-muted mt-2 text-xs"
        style={{ fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}
      >
        {stat.brand}
      </p>
    </motion.div>
  );
}

export default function ProofSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-100px" });

  // Named customers only for the credibility grid
  const logos = customerLogos.filter((l) => !l.name.startsWith("Customer "));

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p className="ed-overline mb-8">Proof</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            60+ brands. 4,500+ locations.{" "}
            <span className="ed-accent">All building on EZee.</span>
          </h2>
        </motion.div>

        {/* Logo grid — static */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mb-24 md:mb-32">
          {logos.map((logo, i) => (
            <motion.span
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.55, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (i % 5) * 0.05 }}
              className="ed-fg text-xl md:text-2xl text-center"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
              title={logo.alt}
            >
              {logo.name}
            </motion.span>
          ))}
        </div>

        {/* Stat callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 md:mb-32">
          {stats.map((s, i) => (
            <StatCallout key={s.brand} stat={s} index={i} />
          ))}
        </div>

        {/* Marquee testimonial */}
        <div ref={quoteRef} className="max-w-5xl">
          <span
            aria-hidden="true"
            className="ed-accent block"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontSize: "6rem",
              lineHeight: 0.5,
              opacity: 0.35,
            }}
          >
            &ldquo;
          </span>
          <motion.blockquote
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={
              quoteInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="ed-fg text-5xl md:text-6xl mt-4"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            EZee Assist has transformed our business.
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="ed-fg-muted mt-10 text-base md:text-lg"
          >
            <span className="ed-fg" style={{ fontWeight: 500 }}>
              Paul Preston
            </span>{" "}
            — CEO, Aqua-Tots Swim School{" "}
            <span style={{ opacity: 0.7 }}>· 160 locations</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
