"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Lock, Server, Eye } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const pillars = [
  {
    icon: Lock,
    title: "Data isolation",
    body: "Your content never touches shared infrastructure. Each client environment is fully isolated.",
  },
  {
    icon: Server,
    title: "No model training",
    body: "Your data is never used to train third-party AI models — ever. It stays yours.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 aligned",
    body: "Built on security practices aligned with SOC 2 Type II controls and enterprise requirements.",
  },
  {
    icon: Eye,
    title: "Full audit trail",
    body: "Every query, every response, every escalation — logged and available for your review.",
  },
];

export default function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-white dark:bg-[#0D0D0D]">
      <div ref={ref} className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Security</p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Security is the{" "}
            <span className="text-[#00AEEF]">backbone</span> of our product.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            We follow best-in-class security practices to ensure your data is
            completely protected and in line with your privacy policies.
          </p>
        </motion.div>

        {/* 4 pillars */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 + i * 0.1 }}
              className="card-hover rounded-xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),_0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00AEEF]/10">
                <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2">{title}</h3>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="text-center"
        >
          <Link href="/security">
            <Button variant="secondary" size="md">Learn More About Security</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
