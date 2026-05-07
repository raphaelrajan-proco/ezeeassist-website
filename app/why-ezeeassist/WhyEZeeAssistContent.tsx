"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const genericFails = [
  {
    title: "Generic AI answers from the internet",
    body: "ChatGPT, Copilot, and other horizontal AI tools pull answers from public data. Your franchisees don't need Wikipedia — they need your SOP for handling a gas leak at 2am.",
  },
  {
    title: "No multi-location awareness",
    body: "Generic tools don't understand that Location A in Nashville has different vendors than Location B in Denver. They can't scope answers to the right context.",
  },
  {
    title: "No escalation or accountability",
    body: "When a generic chatbot can't answer, the question disappears. There's no ticket, no routing, no follow-up. Your franchisee just gets stuck.",
  },
];

const differentiators = [
  { title: "250+ integrations, not just documents",       body: "EZee doesn't just read your manuals. It connects to your CRM, POS, LMS, accounting, marketing, and scheduling tools — enabling actions and workflows across your entire tech stack." },
  { title: "Conversational workflow builder",             body: "Describe any workflow in plain language. EZee maps it out and executes it. Weekly KPI reports, compliance monitoring, staffing optimization — you dream it up." },
  { title: "Support + Coaching + Compliance in one agent", body: "Not just a support bot. EZee coaches operators on performance gaps, monitors compliance proactively, and ensures brand standards don't drift." },
  { title: "Multi-tenant, role-based access",             body: "Franchisors see everything. Franchisees see only what's relevant to their location and role. Regional managers see their territory." },
  { title: "Hub-and-spoke deployment",                    body: "Corporate deploys once. Every location gets instant access. No per-location setup, no per-location training." },
  { title: "Channel-native delivery",                     body: "SMS, email, Slack, Teams, WhatsApp, web — your operators don't install anything new. Zero behavior change." },
];

const comparisonRows = [
  { capability: "Answers from your brand's knowledge", generic: false, wiki: false,  ezee: true },
  { capability: "Available 24/7",                      generic: true,  wiki: true,   ezee: true },
  { capability: "Multi-channel delivery",              generic: false, wiki: false,  ezee: true },
  { capability: "Smart escalation when stuck",         generic: false, wiki: false,  ezee: true },
  { capability: "Franchise-aware (roles, locations)",  generic: false, wiki: false,  ezee: true },
  { capability: "Content gap insights",                generic: false, wiki: false,  ezee: true },
  { capability: "Implementation time",                 generic: "N/A", wiki: "Already exists (poorly)", ezee: "Under 7 days" },
];

const timeline = [
  { label: "Answers",     done: true,  description: "Instant answers from all your content and systems.",                             tag: "Available now" },
  { label: "Actions",     done: true,  description: "Take actions directly inside your tech stack through AI.",                       tag: "Available now" },
  { label: "Automations", done: true,  description: "Always-on workflows running at scale across the value chain.",                   tag: "Available now" },
];

function useIO(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

export default function WhyEZeeAssistContent() {
  const [heroRef,  heroVisible]  = useIO(0.05);
  const [failsRef, failsVisible] = useIO();
  const [diffRef,  diffVisible]  = useIO();
  const [tableRef, tableVisible] = useIO();
  const [arcRef,   arcVisible]   = useIO();
  const [lineRef,  lineVisible]  = useIO(0.3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(0,174,239,0.06) 0%, transparent 55%)" }}
        />
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Why EZee Assist
            </p>
            <h1
              className="text-4xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              The model is not the product.{" "}
              <span className="text-[#00AEEF]">The context is the product.</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">
              Any company can plug into an LLM. What makes EZee different is the deep
              integration with your tech stack, the franchise-specific intelligence, and
              the ability to go beyond answers — into actions and automations.
            </p>
            <div className="mt-8">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why generic AI fails ── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div ref={failsRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={failsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The problem</p>
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.02em" }}>
              Why generic AI fails for franchises
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {genericFails.map(({ title, body }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                animate={failsVisible ? "visible" : "hidden"}
                variants={fadeUp}
                className="card-hover-blue rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 mb-5">
                  <X size={16} className="text-red-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-3" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes EZee Assist purpose-built ── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div ref={diffRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={diffVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The solution</p>
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.02em" }}>
              Built for franchise, not adapted from something else.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map(({ title, body }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                animate={diffVisible ? "visible" : "hidden"}
                variants={fadeUp}
                className="card-hover-blue rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#161616] p-6"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00AEEF]/10 mb-4">
                  <Check size={15} className="text-[#00AEEF]" strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111] border-y border-[#E5E7EB] dark:border-white/[0.06]">
        <div ref={tableRef} className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={tableVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Comparison</p>
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.02em" }}>
              EZee Assist vs. the alternatives
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={tableVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB] dark:border-white/[0.08]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Capability</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Generic AI</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Shared Drive / Wiki</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-[#00AEEF]" style={{ borderLeft: "3px solid #00AEEF" }}>
                      EZee Assist
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ capability, generic, wiki, ezee }, i) => (
                    <tr
                      key={capability}
                      className={`border-b border-[#E5E7EB] dark:border-white/[0.06] last:border-0 transition-colors duration-150 hover:bg-[#F0F9FF] dark:hover:bg-[#00AEEF]/[0.04] ${
                        i % 2 === 0 ? "" : "bg-[#F7F8FA] dark:bg-[#1A1A1A]"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-[#0A0A0A] dark:text-[#F0F0F0]">{capability}</td>
                      <td className="px-6 py-4 text-center text-gray-400 dark:text-gray-500">
                        {typeof generic === "boolean"
                          ? generic
                            ? <Check size={16} className="inline text-green-500" />
                            : <X size={16} className="inline text-red-400" />
                          : <span className="text-xs text-gray-500 dark:text-gray-400">{generic}</span>}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400 dark:text-gray-500">
                        {typeof wiki === "boolean"
                          ? wiki
                            ? <Check size={16} className="inline text-green-500" />
                            : <X size={16} className="inline text-red-400" />
                          : <span className="text-xs text-gray-500 dark:text-gray-400">{wiki}</span>}
                      </td>
                      <td className="px-6 py-4 text-center bg-[#00AEEF]/[0.03] dark:bg-[#00AEEF]/[0.06]" style={{ borderLeft: "3px solid #00AEEF" }}>
                        {typeof ezee === "boolean"
                          ? ezee
                            ? <Check size={16} className="inline text-[#00AEEF]" strokeWidth={2.5} />
                            : <X size={16} className="inline text-red-400" />
                          : <span className="text-xs font-semibold text-[#00AEEF]">{ezee}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Answers → Actions → Automations arc ── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div ref={arcRef} className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={arcVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Product vision</p>
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.02em" }}>
              Where we&apos;re going
            </h2>
          </motion.div>
          <div ref={lineRef} className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Animated connector line — draws left-to-right */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 origin-left bg-gradient-to-r from-green-400 via-green-400 to-[#00AEEF]"
              aria-hidden="true"
            />
            {timeline.map(({ label, done, description, tag }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                animate={arcVisible ? "visible" : "hidden"}
                variants={fadeUp}
                className={`relative rounded-2xl border p-7 text-center ${
                  !done
                    ? "border-[#00AEEF]/40 bg-[#00AEEF]/[0.04] dark:bg-[#00AEEF]/[0.06] shadow-[0_0_32px_rgba(0,174,239,0.12)]"
                    : "border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616]"
                }`}
              >
                <div
                  className={`mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    done
                      ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                      : "border-[#00AEEF] bg-[#00AEEF]/10"
                  } ${arcVisible ? "animate-pulse-ring" : ""}`}
                  style={arcVisible ? { animationDelay: `${i * 0.5}s` } : {}}
                >
                  {done
                    ? <Check size={18} className="text-green-500" strokeWidth={2.5} />
                    : <span className="text-sm font-bold text-[#00AEEF]">3</span>}
                </div>
                <h3
                  className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {label}
                </h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 mb-4">{description}</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    done
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                      : "bg-[#00AEEF]/10 text-[#00AEEF]"
                  }`}
                >
                  {tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full border-t border-[#E5E7EB] dark:border-white/[0.06] bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 text-center">
          <h2
            className="text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0] mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to see what purpose-built franchise AI looks like?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            See EZee Assist live in 30 minutes.
          </p>
          <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
        </div>
      </section>
    </>
  );
}
