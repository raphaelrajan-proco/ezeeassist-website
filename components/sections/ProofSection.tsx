"use client";

import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import Image from "next/image";
import { useRef, useState } from "react";
import { customerLogos, type CustomerLogo } from "@/lib/data/customer-logos";

/**
 * Section 8 — Proof. Franchise credibility: a static logo grid (not a
 * marquee, for maximum trust), three stat callouts, and a marquee
 * Paul Preston pull-quote.
 */

/**
 * Logo tile — renders the customer SVG via next/image, falling back to a
 * quiet grey text pill until the real logo file lands in
 * /public/logos/customers/.
 */
function LogoTile({ logo }: { logo: CustomerLogo }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="inline-flex items-center rounded-full px-4 py-1.5 text-sm"
        style={{
          backgroundColor: "var(--ed-bg-alt)",
          border: "1px solid var(--ed-rule)",
          color: "var(--ed-fg-muted)",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
        title={logo.alt}
      >
        {logo.name}
      </span>
    );
  }

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={160}
      height={48}
      className="max-h-12 w-auto object-contain"
      style={{ opacity: 0.7 }}
      onError={() => setFailed(true)}
    />
  );
}

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
        className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em]"
        style={{
          color: "#00AEEF",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 0.95,
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
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            60+ brands. 4,500+ locations.{" "}
            <span className="ed-accent">All building on EZee.</span>
          </h2>
        </motion.div>

        {/* Logo marquee — seamless loop, image-based with text fallback */}
        <div
          className="relative mb-24 md:mb-32"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="ed-logo-marquee flex w-max items-center gap-10">
            {[...logos, ...logos].map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="flex-shrink-0">
                <LogoTile logo={logo} />
              </div>
            ))}
          </div>
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
