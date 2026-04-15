"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  MessageCircle,
  Search,
  CheckCircle2,
  ArrowRight,
  Wifi,
  FileText,
  ShieldCheck,
  Languages,
  GitBranch,
  RefreshCw,
} from "lucide-react";

/* ─── Helpers ──────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

/* ─── Data ─────────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Franchisee asks a question",
    body: "Through text, email, Slack, Microsoft Teams, WhatsApp, or the web portal. In natural language, the way they'd ask a colleague.",
  },
  {
    number: "02",
    icon: Search,
    title: "AI searches your entire knowledge base",
    body: "Operating manuals, training videos, SOPs, policy documents, past communications — everything you've connected. Not the open internet.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Instant, sourced answer delivered",
    body: "A precise answer with citations back to the original source document. If the AI can't answer confidently, it creates a ticket and routes to your team.",
  },
];

const capabilities = [
  {
    icon: Wifi,
    title: "Multi-channel delivery",
    body: "SMS, email, Slack, Teams, WhatsApp, web portal — franchisees use whatever they prefer.",
  },
  {
    icon: FileText,
    title: "Source citations",
    body: "Every answer links back to the original document so franchisees can verify and go deeper.",
  },
  {
    icon: ShieldCheck,
    title: "Brand-specific knowledge only",
    body: "Answers come exclusively from your connected content. Never from the open internet or generic AI.",
  },
  {
    icon: Languages,
    title: "Multi-language support",
    body: "Franchisees can ask questions and receive answers in their preferred language.",
  },
  {
    icon: GitBranch,
    title: "Smart escalation",
    body: "When the AI can't answer, it auto-creates a ticket with the full conversation context and routes it to the right person.",
  },
  {
    icon: RefreshCw,
    title: "Continuous learning",
    body: "As your team answers new questions and adds content, the AI gets smarter over time.",
  },
];

const stats = [
  { value: "< 30s", label: "Average response time" },
  { value: "93%",   label: "AI resolution rate" },
  { value: "24/7",  label: "Always available" },
  { value: "0",     label: "Training required for franchisees" },
];

/* ─── Component ────────────────────────────────────────── */

export default function AIAgentContent() {
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-hero-gradient">
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.10) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/platform" className="hover:text-[#00AEEF] transition-colors">Platform</Link>
              <span>/</span>
              <span className="text-[#00AEEF] font-semibold">AI Agent</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Core Product
            </p>
            <h1
              className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Your franchisees&apos; first
              <br />
              line of support.{" "}
              <span className="text-[#00AEEF]">Always on.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee Assist&apos;s AI Agent delivers instant, accurate answers to any
              operational question — sourced from your brand&apos;s own knowledge,
              available 24/7, through the channels your team already uses.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="secondary">
                  See Case Studies
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-20" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              How It Works
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              From question to answer{" "}
              <span className="text-[#00AEEF]">in seconds.</span>
            </h2>
          </motion.div>

          {/* Steps */}
          <div ref={stepsRef} className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Connector */}
            <div
              className="absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] hidden h-px bg-gradient-to-r from-[#00AEEF]/30 via-[#00AEEF]/60 to-[#00AEEF]/30 md:block"
              aria-hidden="true"
            />

            {steps.map(({ number, icon: Icon, title, body }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 28 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="relative z-10 mb-6 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white dark:bg-[#0D0D0D] shadow-[0_0_0_6px_rgba(0,174,239,0.08)]">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#00AEEF] mb-2">{number}</p>
                <h3
                  className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>

          {/* Live chat mockup */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-2 border-b border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] px-6 py-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="ml-2 text-xs font-medium text-gray-400 dark:text-gray-500">EZee Assist — AI Agent</span>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] dark:divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
              {/* Step 1 */}
              <div className="p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">① Franchisee</p>
                <div className="inline-block rounded-2xl rounded-tl-none bg-[#F7F8FA] dark:bg-[#111111] px-4 py-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Do we have an approved vendor for deep-cleaning kitchen equipment in the Northeast region?
                  </p>
                </div>
                <p className="mt-3 text-[10px] text-gray-300 dark:text-gray-600">Sent via SMS — 11:18 PM</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col justify-center p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">② AI Processing</p>
                <div className="space-y-2.5">
                  {[
                    "Searching Vendor Approval Policy...",
                    "Scanning Regional SOPs — Northeast...",
                    "Checking Operations Manual §12.4...",
                  ].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="flex-shrink-0 text-[#00AEEF]" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{s}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] font-semibold text-[#00AEEF]">Answer found in 0.9s</p>
              </div>

              {/* Step 3 */}
              <div className="p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">③ EZee Assist</p>
                <div className="inline-block rounded-2xl rounded-tr-none border border-[#00AEEF]/20 bg-[#00AEEF]/[0.06] px-4 py-3">
                  <p className="text-sm text-[#0A0A0A] dark:text-[#F0F0F0]">
                    Yes — <span className="font-semibold">CleanPro Commercial Services</span> is your approved
                    vendor for deep-cleaning in the Northeast. Contact: 1-800-555-0192.
                  </p>
                </div>
                <p className="mt-3 text-[10px] text-gray-400 dark:text-gray-500">
                  Source:{" "}
                  <span className="text-[#00AEEF]">Vendor Approval Policy, §3.1 — Northeast Region</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Capabilities grid ─────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Capabilities
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Built for{" "}
              <span className="text-[#00AEEF]">franchise complexity.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.07)}
                className="card-hover-blue group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] p-7"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3
                  className="mb-2 text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics bar ───────────────────────────────────── */}
      <section className="relative w-full bg-[#F0F9FF] dark:bg-[#111111]">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0"
          style={{ opacity: 0.3 }}
          aria-hidden="true"
        />
        <div ref={statsRef} className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <span
                  className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {value}
                </span>
                <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-final-cta-gradient"
      >
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0"
          style={{ opacity: 0.3 }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              See the AI Agent{" "}
              <span className="text-[#00AEEF]">in action.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Book a 30-minute demo and see exactly how the AI Agent would work
              with your brand&apos;s content, your channels, and your franchisees.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/platform">
                <Button size="lg" variant="secondary">
                  Explore the Platform
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
