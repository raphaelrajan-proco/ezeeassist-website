"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #ffffff 0%, #F0F9FF 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,174,239,0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6 py-28 lg:px-8 lg:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Give your franchisees the support{" "}
            <span className="text-[#00AEEF]">they deserve.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            See how leading brands use EZee Assist to reduce support volume,
            improve franchisee satisfaction, and keep every location running
            smoothly.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg">Book a Demo</Button>
            </Link>
            <Link href="/industries">
              <Button size="lg" variant="secondary">
                See solutions by industry →
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
