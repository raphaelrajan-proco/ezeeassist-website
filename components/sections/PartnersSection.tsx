"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { label: "WSI",  sub: "Partner" },
  { label: "SFN",  sub: "Verified Member" },
  { label: "IFA",  sub: "Supplier Forum" },
  { label: "CFA",  sub: "Member" },
];

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#F7F8FA]">
      <div ref={ref} className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-16 items-center md:grid-cols-2">

          {/* Logo grid */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {partners.map(({ label, sub }) => (
              <div
                key={label}
                className="card-hover flex flex-col items-center justify-center gap-1 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <span className="text-2xl font-extrabold text-[#0A0A0A]">{label}</span>
                <span className="text-xs text-gray-400 font-medium text-center">{sub}</span>
              </div>
            ))}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Our Community</p>
            <h2
              className="text-3xl font-bold leading-snug text-[#0A0A0A] sm:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Proud to be{" "}
              <span className="text-[#00AEEF]">collaborating</span> with our
              strategic partners and community.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              EZee Assist works alongside the franchise industry&apos;s most
              trusted networks and associations — because great support is built
              on great relationships.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
