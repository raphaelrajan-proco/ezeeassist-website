"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

const badges = [
  "WSI Partner",
  "IFA Supplier Forum",
  "Canadian Franchise Association",
  "SOC 2",
];

export default function SecurityStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#F7F8FA]">
      <div
        ref={ref}
        className="mx-auto max-w-4xl px-6 py-16 lg:px-8 text-center"
      >
        {/* Icon + headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00AEEF]/10">
            <ShieldCheck size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
          </div>
          <p className="text-lg font-bold text-[#0A0A0A] sm:text-xl">
            Enterprise-grade security.{" "}
            <span className="text-gray-500 font-normal">
              Your data never trains third-party models.
            </span>
          </p>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-gray-500 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Learn more link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          className="mt-6"
        >
          <a
            href="/security"
            className="text-sm font-semibold text-[#00AEEF] hover:underline underline-offset-4 transition-all"
          >
            Learn more about our security →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
