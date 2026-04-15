"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  MessageCircle,
  Bot,
  Ticket,
  UserCheck,
  ArrowRight,
  Tag,
  BarChart2,
  FileText,
  CheckCircle2,
} from "lucide-react";

/* ─── Helpers ──────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

/* ─── Data ─────────────────────────────────────────────── */

const flowSteps = [
  {
    icon: MessageCircle,
    label: "Franchisee asks a question",
    sub: "Via SMS, Slack, Teams, email, or web portal",
    highlight: false,
  },
  {
    icon: Bot,
    label: "AI attempts to answer",
    sub: "Searches your entire knowledge base in under 2 seconds",
    highlight: false,
  },
  {
    icon: Ticket,
    label: "Can't answer confidently",
    sub: "Ticket automatically created with full context",
    highlight: true,
  },
  {
    icon: UserCheck,
    label: "Routed to the right person",
    sub: "With conversation history and source docs attached",
    highlight: false,
  },
];

const features = [
  {
    icon: Tag,
    title: "Auto-categorization",
    body: "Tickets are automatically tagged by topic (operations, marketing, finance, vendors) so they reach the right team.",
  },
  {
    icon: BarChart2,
    title: "Priority scoring",
    body: "Urgent issues get flagged and escalated. Routine questions queue normally. Your team focuses where it matters.",
  },
  {
    icon: FileText,
    title: "Full conversation context",
    body: "Every ticket includes the franchisee's original question, the AI's attempted answer, and the source documents referenced — so your team never starts from zero.",
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function TicketingContent() {
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-60px" });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-hero-gradient">
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
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/platform" className="hover:text-[#00AEEF] transition-colors">Platform</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Intelligent Ticketing</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Intelligent Ticketing
            </p>
            <h1
              className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Every unanswered question
              <br />
              becomes a{" "}
              <span className="text-[#00AEEF]">smart ticket.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              When AI doesn&apos;t have a confident answer, EZee Assist automatically
              creates a ticket — categorized, prioritized, and routed to the right
              person on your support team. No question falls through the cracks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/platform/ai-agent">
                <Button size="lg" variant="secondary">
                  See the AI Agent
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Flow diagram ─────────────────────────────────── */}
      <section
        className="w-full relative overflow-hidden bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-20" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              The Flow
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              From question to{" "}
              <span className="text-[#00AEEF]">resolution.</span>
            </h2>
          </motion.div>

          {/* Step cards with arrows */}
          <div ref={flowRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {flowSteps.map(({ icon: Icon, label, sub, highlight }, i) => (
              <div key={label} className="flex items-stretch lg:contents">
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={flowInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                  className={`relative flex flex-1 flex-col items-center rounded-2xl p-7 text-center transition-all duration-200 ${
                    highlight
                      ? "border-2 border-[#00AEEF] bg-[#00AEEF]/[0.04] shadow-[0_0_0_4px_rgba(0,174,239,0.08)]"
                      : "border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616]"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#00AEEF] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      AI handoff
                    </span>
                  )}
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${
                      highlight
                        ? "bg-[#00AEEF] text-white"
                        : "bg-[#F7F8FA] text-[#00AEEF]"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3
                    className="mb-2 text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {label}
                  </h3>
                  <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">{sub}</p>
                </motion.div>

                {/* Arrow between cards — desktop only */}
                {i < flowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={flowInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                    className="hidden items-center justify-center px-2 lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight size={18} className="text-[#00AEEF]/40" strokeWidth={2} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Ticket preview mockup */}
          <motion.div
            {...fadeUp(0.25)}
            className="mt-14 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-2 border-b border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] px-6 py-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="ml-2 text-xs font-medium text-gray-400 dark:text-gray-500">EZee Assist — Ticket #1047</span>
              <span className="ml-auto rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-[10px] font-bold text-orange-600 dark:text-orange-400">
                Needs Review
              </span>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] dark:divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
              {/* Original question */}
              <div className="p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Franchisee Question
                </p>
                <div className="rounded-xl bg-[#F7F8FA] dark:bg-[#111111] p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    &quot;We&apos;re planning a grand re-opening event next month. What&apos;s the
                    process for getting corporate to co-fund promotional materials?&quot;
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00AEEF]/10 text-[9px] font-bold text-[#00AEEF]">JM</div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">Jordan M. — Location #042, Austin TX</span>
                </div>
              </div>

              {/* AI attempt */}
              <div className="p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  AI Attempted Answer
                </p>
                <div className="rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-900/20 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I found information about standard marketing support but couldn&apos;t
                    locate a specific co-funding policy for re-opening events. I&apos;ve
                    created a ticket for your support team.
                  </p>
                </div>
                <p className="mt-3 text-[10px] text-orange-500 font-medium">
                  Confidence: Low — ticket auto-created
                </p>
              </div>

              {/* Ticket details */}
              <div className="p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Auto-Assigned Details
                </p>
                <div className="space-y-2.5">
                  {[
                    { k: "Category",  v: "Marketing & Promotions" },
                    { k: "Priority",  v: "Normal" },
                    { k: "Assigned",  v: "Sarah K. — Field Marketing" },
                    { k: "SLA",       v: "Respond within 4 hours" },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 dark:text-gray-500">{k}</span>
                      <span className="font-semibold text-[#0A0A0A] dark:text-[#F0F0F0]">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#00AEEF]/[0.06] px-3 py-2 border border-[#00AEEF]/20">
                  <CheckCircle2 size={13} className="text-[#00AEEF] flex-shrink-0" />
                  <span className="text-[11px] text-[#00AEEF] font-medium">Full conversation attached</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key features ─────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Key Features
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Tickets that{" "}
              <span className="text-[#00AEEF]">arrive ready to resolve.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="card-hover-blue group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] p-8"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3
                  className="mb-3 text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support team benefits ─────────────────────────── */}
      <section
        className="w-full bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              For Your Team
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Your support team gets{" "}
              <span className="text-[#00AEEF]">superpowers.</span>
            </h2>
          </motion.div>

          <div ref={benefitsRef} className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-8">
                FBCs and support staff only see the questions AI couldn&apos;t handle —
                the ones that actually need human judgment. No more drowning in
                repetitive queries.
              </p>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-8">
                Every ticket arrives with context, so resolution is faster. And as
                your team answers tickets, those answers feed back into the AI,
                making it smarter for next time.
              </p>
              <div className="space-y-4">
                {[
                  "Only see questions that need real judgment",
                  "Every ticket pre-loaded with full context",
                  "Responses feed back into AI knowledge",
                  "SLA tracking and performance dashboards",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15">
                      <CheckCircle2 size={12} className="text-[#00AEEF]" strokeWidth={2.5} />
                    </div>
                    <span className="text-base text-gray-700 dark:text-gray-400">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dashboard placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
                style={{ paddingBottom: "56.25%" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-[#161616] border border-[#E5E7EB] dark:border-white/[0.08] shadow-sm">
                    <Ticket size={22} className="text-[#00AEEF]" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Ticket Dashboard Preview
                  </p>
                  <p className="text-[10px] text-gray-300 dark:text-gray-600">Screenshot coming soon</p>
                </div>
              </div>
            </motion.div>
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
              See intelligent ticketing{" "}
              <span className="text-[#00AEEF]">in action.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Watch the full AI → ticket → resolution flow live in a 30-minute
              demo with your team&apos;s real content.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/platform">
                <Button size="lg" variant="secondary">
                  Back to Platform
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
