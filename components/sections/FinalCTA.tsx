"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// TODO: Set NEXT_PUBLIC_HUBSPOT_MEETINGS_URL in .env.local and Vercel env variables
// Find your meetings URL in HubSpot → Sales → Meetings → your meeting link
// e.g. https://meetings.hubspot.com/raphaelrajan/ezeeassist-demo
const MEETINGS_URL = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL;

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full overflow-hidden bg-final-cta-gradient">
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

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Give your franchisees the support{" "}
            <span className="text-[#00AEEF]">they deserve.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            See how leading brands use EZee Assist to reduce support volume,
            improve franchisee satisfaction, and keep every location running
            smoothly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg">Book a Demo</Button>
            </Link>
            <Link href="/industries">
              <Button size="lg" variant="secondary">
                See solutions by industry →
              </Button>
            </Link>
          </div>

          {/* HubSpot Calendar Embed */}
          {MEETINGS_URL ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-14"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#E5E7EB] dark:bg-white/[0.08]" />
                <p className="text-lg font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] whitespace-nowrap">
                  Pick a time that works for you
                </p>
                <div className="flex-1 h-px bg-[#E5E7EB] dark:bg-white/[0.08]" />
              </div>
              <div className="w-full mx-auto">
                <iframe
                  src={`${MEETINGS_URL}?embed=true`}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.08] shadow-sm min-h-[600px] lg:min-h-[700px]"
                  title="Book a Demo with EZee Assist"
                />
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
