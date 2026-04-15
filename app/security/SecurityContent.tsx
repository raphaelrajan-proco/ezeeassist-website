"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Lock, Server, Cloud, Database,
  Layers, UserCheck, EyeOff, ChevronDown, Mail,
} from "lucide-react";
import Button from "@/components/ui/Button";
import TrustBar from "@/components/sections/TrustBar";

const responsibleAI = [
  {
    icon: UserCheck,
    title: "Customer-defined access controls",
    body: "You are in full control of your content. You can determine who should have access and the level of access.",
  },
  {
    icon: ShieldCheck,
    title: "No third-party training",
    body: "Your content will never be shared with or used by third parties for any software or LLM training purposes.",
  },
  {
    icon: Server,
    title: "Enterprise-grade infrastructure",
    body: "All data processing and computations are completed in secured and encrypted AWS cloud systems.",
  },
];

const complianceItems = [
  { icon: Cloud,     title: "Secured Cloud System",             body: "AWS EC2 infrastructure. No data used for training models — ever." },
  { icon: Database,  title: "Indexing Logic",                   body: "Data indexed and stored in machine-readable vector format for fast, accurate retrieval." },
  { icon: Layers,    title: "Individualized Data Compartments", body: "No cross-pollination between clients. Each brand runs on dedicated AWS EC2 servers." },
  { icon: UserCheck, title: "User Defined Permissions",         body: "Authentication and access control sync ensures the right people see the right content." },
  { icon: EyeOff,    title: "PII Redaction Controls",           body: "Automatic PII censoring applied to all data sources before processing." },
  { icon: Lock,      title: "Secured Encryption",               body: "TLS 1.2/1.3 in transit. AES 256-bit encryption at rest. No exceptions." },
];

const faqs = [
  { q: "Which Large Language Models (LLMs) are utilized by EZee Assist?",                      a: "Details coming soon." },
  { q: "What procedures do you follow for managing Personally Identifiable Information (PII)?", a: "Details coming soon." },
  { q: "How is customer data stored and encrypted?",                                             a: "Details coming soon." },
  { q: "How is customer data used with AI models?",                                              a: "Details coming soon." },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      className="border-b border-[#E5E7EB] dark:border-white/[0.08] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] group-hover:text-[#00AEEF] transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-gray-400 dark:text-gray-500"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-base leading-7 text-gray-600 dark:text-gray-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SecurityContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
        {/* Dot-grid texture — gives a subtle tech / circuit feel */}
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        />
        {/* Radial glow — right side */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 90% at 100% 50%, rgba(0,174,239,0.07) 0%, transparent 55%)" }}
          aria-hidden="true"
        />
        {/* ShieldCheck watermark */}
        <div
          className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block select-none"
          aria-hidden="true"
        >
          <ShieldCheck
            size={220}
            className="text-[#00AEEF]"
            style={{ opacity: 0.04 }}
            strokeWidth={1}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Security</p>
            <h1
              className="text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Industry-grade{" "}
              <span className="text-[#00AEEF]">AI standards</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee Assist&apos;s AI engine is meticulously developed to surpass
              current AI security, privacy, and compliance protocols. Quality
              and security is ingrained in our foundation.
            </p>
            <div className="mt-8">
              <Button variant="secondary" size="md">Read more</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Responsible AI ───────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Responsible AI</p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl max-w-2xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Deployed with an{" "}
              <span className="text-[#00AEEF]">unwavering focus</span> on
              security and safety.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {responsibleAI.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
                className="card-hover-blue flex flex-col gap-5 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Circular icon badge */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00AEEF]/10 border-2 border-[#00AEEF]/20 shadow-[0_0_0_4px_rgba(0,174,239,0.06)]">
                  <Icon size={24} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2">{title}</h3>
                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Standards ─────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Standards</p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl max-w-2xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              State-of-the-art{" "}
              <span className="text-[#00AEEF]">security</span> and compliance standards
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {complianceItems.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
                className="card-hover-blue flex gap-5 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Circular icon badge — smaller for compact card */}
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20">
                  <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-1">{title}</h3>
                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">FAQ</p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Frequently asked <span className="text-[#00AEEF]">questions</span>
            </h2>
          </motion.div>
          <div className="rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] px-8 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={q} q={q} a={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────── */}
      <TrustBar />

      {/* ── Feedback ─────────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D] border-t border-[#E5E7EB] dark:border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 text-center">
          <motion.div {...fadeUp()} className="flex flex-col items-center gap-4">
            {/* Circular mail badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00AEEF]/10 border-2 border-[#00AEEF]/20 shadow-[0_0_0_4px_rgba(0,174,239,0.06)]">
              <Mail size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
            </div>
            <h3
              className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
              style={{ letterSpacing: "-0.01em" }}
            >
              We value your <span className="text-[#00AEEF]">feedback</span>
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-md">
              Have a question about our security practices or want to report a
              concern? We take every message seriously.
            </p>
            <a
              href="mailto:security@ezeeassist.com"
              className="text-sm font-semibold text-[#00AEEF] hover:underline underline-offset-4"
            >
              security@ezeeassist.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
