"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  { title: "Your brand's knowledge only", body: "Every answer comes from your connected documents, videos, and communications — never from the open internet." },
  { title: "Multi-tenant, role-based access", body: "Franchisors see everything. Franchisees see only what's relevant to their location and role. Regional managers see their territory." },
  { title: "Network-wide resolution memory", body: "When a question gets answered anywhere in the network, that answer is available everywhere. Your knowledge compounds." },
  { title: "Franchise-specific escalation logic", body: "Tickets route based on topic, region, and urgency — not just to a generic inbox. FBCs get questions that match their expertise." },
  { title: "Hub-and-spoke deployment", body: "Corporate deploys once. Every location gets instant access. No per-location setup, no per-location training." },
  { title: "Channel-native delivery", body: "SMS, email, Slack, Teams, WhatsApp, web — your franchisees don't install anything new. Zero behavior change." },
];

const comparisonRows = [
  { capability: "Answers from your brand's knowledge", generic: false, wiki: false, ezee: true },
  { capability: "Available 24/7", generic: true, wiki: true, ezee: true },
  { capability: "Multi-channel delivery", generic: false, wiki: false, ezee: true },
  { capability: "Smart escalation when stuck", generic: false, wiki: false, ezee: true },
  { capability: "Franchise-aware (roles, locations)", generic: false, wiki: false, ezee: true },
  { capability: "Content gap insights", generic: false, wiki: false, ezee: true },
  { capability: "Implementation time", generic: "N/A", wiki: "Already exists (poorly)", ezee: "Under 7 days" },
];

const timeline = [
  { label: "Answers", done: true, description: "AI answers franchisee questions instantly from your knowledge base.", tag: "Available now" },
  { label: "Actions", done: true, description: "Smart ticketing routes unanswered questions to the right person with full context.", tag: "Available now" },
  { label: "Automations", done: false, description: "AI agents execute multi-step workflows: onboarding, compliance, vendor coordination.", tag: "Coming soon" },
];

export default function WhyEZeeAssistContent() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const failsRef = useRef(null);
  const failsInView = useInView(failsRef, { once: true, margin: "-60px" });
  const diffRef = useRef(null);
  const diffInView = useInView(diffRef, { once: true, margin: "-60px" });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });
  const arcRef = useRef(null);
  const arcInView = useInView(arcRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative w-full border-b border-[#E5E7EB]"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(0,174,239,0.06) 0%, transparent 55%)" }}
        />
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Why EZee Assist</p>
            <h1 className="text-4xl font-bold text-[#0A0A0A] sm:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.02em" }}>
              The model is not the product.{" "}
              <span className="text-[#00AEEF]">The context is the product.</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Any company can plug into an LLM. What makes EZee Assist different is everything around it — the franchise-specific context, the multi-tenant architecture, the channel flexibility, and the operational intelligence that makes AI actually useful for franchise teams.
            </p>
            <div className="mt-8">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why generic AI fails ── */}
      <section className="w-full bg-[#F7F8FA]">
        <div ref={failsRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={failsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The problem</p>
            <h2 className="text-3xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.02em" }}>
              Why generic AI fails for franchises
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {genericFails.map(({ title, body }, i) => (
              <motion.div key={title} custom={i} initial="hidden" animate={failsInView ? "visible" : "hidden"} variants={fadeUp}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 border border-red-100 mb-5">
                  <X size={16} className="text-red-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-bold text-[#0A0A0A] mb-3" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes EZee Assist purpose-built ── */}
      <section className="w-full bg-white">
        <div ref={diffRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={diffInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The solution</p>
            <h2 className="text-3xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.02em" }}>
              Built for franchise, not adapted from something else.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map(({ title, body }, i) => (
              <motion.div key={title} custom={i} initial="hidden" animate={diffInView ? "visible" : "hidden"} variants={fadeUp}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-6"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00AEEF]/10 mb-4">
                  <Check size={15} className="text-[#00AEEF]" strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-[#0A0A0A] mb-2" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="w-full bg-[#F7F8FA] border-y border-[#E5E7EB]">
        <div ref={tableRef} className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={tableInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Comparison</p>
            <h2 className="text-3xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.02em" }}>
              EZee Assist vs. the alternatives
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={tableInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Capability</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">Generic AI</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">Shared Drive / Wiki</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-[#00AEEF]" style={{ borderLeft: "3px solid #00AEEF" }}>EZee Assist</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ capability, generic, wiki, ezee }, i) => (
                    <tr key={capability} className={`border-b border-[#E5E7EB] last:border-0 ${i % 2 === 0 ? "" : "bg-[#F7F8FA]"}`}>
                      <td className="px-6 py-4 font-medium text-[#0A0A0A]">{capability}</td>
                      <td className="px-6 py-4 text-center text-gray-400">
                        {typeof generic === "boolean"
                          ? generic ? <Check size={16} className="inline text-green-500" /> : <X size={16} className="inline text-red-400" />
                          : <span className="text-xs text-gray-500">{generic}</span>}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400">
                        {typeof wiki === "boolean"
                          ? wiki ? <Check size={16} className="inline text-green-500" /> : <X size={16} className="inline text-red-400" />
                          : <span className="text-xs text-gray-500">{wiki}</span>}
                      </td>
                      <td className="px-6 py-4 text-center bg-[#00AEEF]/[0.03]" style={{ borderLeft: "3px solid #00AEEF" }}>
                        {typeof ezee === "boolean"
                          ? ezee ? <Check size={16} className="inline text-[#00AEEF]" strokeWidth={2.5} /> : <X size={16} className="inline text-red-400" />
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
      <section className="w-full bg-white">
        <div ref={arcRef} className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={arcInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Product vision</p>
            <h2 className="text-3xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.02em" }}>Where we&apos;re going</h2>
          </motion.div>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-green-400 via-green-400 to-[#00AEEF]" />
            {timeline.map(({ label, done, description, tag }, i) => (
              <motion.div key={label} custom={i} initial="hidden" animate={arcInView ? "visible" : "hidden"} variants={fadeUp}
                className={`relative rounded-2xl border p-7 text-center ${
                  !done ? "border-[#00AEEF]/40 bg-[#00AEEF]/[0.04] shadow-[0_0_32px_rgba(0,174,239,0.12)]" : "border-[#E5E7EB] bg-white"
                }`}
              >
                <div className={`mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  done ? "border-green-400 bg-green-50" : "border-[#00AEEF] bg-[#00AEEF]/10"
                }`}>
                  {done
                    ? <Check size={18} className="text-green-500" strokeWidth={2.5} />
                    : <span className="text-sm font-bold text-[#00AEEF]">3</span>
                  }
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3" style={{ letterSpacing: "-0.01em" }}>{label}</h3>
                <p className="text-sm leading-6 text-gray-600 mb-4">{description}</p>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  done ? "bg-green-50 text-green-600" : "bg-[#00AEEF]/10 text-[#00AEEF]"
                }`}>{tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full border-t border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to see what purpose-built franchise AI looks like?
          </h2>
          <p className="text-gray-600 mb-8">See EZee Assist live in 30 minutes.</p>
          <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
        </div>
      </section>
    </>
  );
}
