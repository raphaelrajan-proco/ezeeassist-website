"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const rows = [
  {
    topic: "Response time",
    before: "Hours to days",
    after: "Under 30 seconds, 24/7",
  },
  {
    topic: "Knowledge source",
    before: "Whoever picks up the phone",
    after: "Your entire brand knowledge base",
  },
  {
    topic: "After-hours support",
    before: "Unanswered messages piling up",
    after: "Instant answers around the clock",
  },
  {
    topic: "Ticket volume",
    before: "Every question becomes a ticket",
    after: "67% of tickets deflected automatically",
  },
  {
    topic: "Consistency",
    before: "Varies by person and shift",
    after: "Same brand-accurate answer every time",
  },
  {
    topic: "Onboarding new franchisees",
    before: "Weeks of hand-holding",
    after: "Day-one self-service access",
  },
  {
    topic: "Setup required",
    before: "New tools, migration, training",
    after: "Connects to your existing systems",
  },
];

export default function ComparisonSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#F7F8FA]">
      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Side by Side
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            The old way vs.{" "}
            <span className="text-[#00AEEF]">the EZee Assist way</span>
          </h2>
        </motion.div>

        {/* Table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 24 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)]"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#E5E7EB]">
            <div className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-400" />
            <div className="border-l border-[#E5E7EB] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Without EZee Assist
            </div>
            <div className="border-l border-[#00AEEF]/30 bg-[#00AEEF]/[0.03] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[#00AEEF]">
              With EZee Assist
            </div>
          </div>

          {/* Data rows */}
          {rows.map(({ topic, before, after }, i) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -16 }}
              animate={tableInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.07 }}
              className={`grid grid-cols-[1fr_1fr_1fr] ${
                i !== rows.length - 1 ? "border-b border-[#E5E7EB]" : ""
              }`}
            >
              {/* Topic */}
              <div className="flex items-center px-6 py-5">
                <span className="text-sm font-semibold text-[#0A0A0A]">{topic}</span>
              </div>

              {/* Before */}
              <div className="flex items-center gap-3 border-l border-[#E5E7EB] px-6 py-5">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <X size={11} className="text-red-500" strokeWidth={2.5} />
                </div>
                <span className="text-sm text-gray-500">{before}</span>
              </div>

              {/* After */}
              <div className="flex items-center gap-3 border-l border-[#00AEEF]/30 bg-[#00AEEF]/[0.03] px-6 py-5">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15">
                  <Check size={11} className="text-[#00AEEF]" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium text-[#0A0A0A]">{after}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
