"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { label: "WSI", sub: "Partner" },
  { label: "SFN", sub: "Verified Member" },
  { label: "IFA", sub: "Supplier Forum" },
  { label: "CFA", sub: "Member" },
];

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <p className="ed-overline mb-8">Our Community</p>
            <h2
              className="ed-fg text-5xl md:text-6xl"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              In good{" "}
              <span className="ed-accent">company.</span>
            </h2>
            <p
              className="ed-fg-muted mt-8 max-w-xl text-lg md:text-xl"
              style={{ lineHeight: 1.5 }}
            >
              EZee Assist works alongside the franchise industry&apos;s most
              trusted networks and associations — because great support is built
              on great relationships.
            </p>
          </motion.div>

          {/* Partner names — typography only, no cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="md:col-span-5 grid grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12"
          >
            {partners.map(({ label, sub }) => (
              <div key={label}>
                <p
                  className="ed-fg text-4xl md:text-5xl"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {label}
                </p>
                <p
                  className="ed-fg-muted text-sm mt-2"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
