"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  CheckCircle2,
  Workflow,
  Users,
  ClipboardList,
  Bell,
  PackageCheck,
  ArrowRight,
  Zap,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const evolution = [
  {
    icon: CheckCircle2,
    title: "Answers",
    body: "Instant answers from all your content and systems.",
    tag: "Available now",
    tagStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    done: true,
  },
  {
    icon: CheckCircle2,
    title: "Actions",
    body: "Take actions directly inside your tech stack through AI.",
    tag: "Available now",
    tagStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    done: true,
  },
  {
    icon: Zap,
    title: "Automations",
    body: "Always-on workflows running at scale across the value chain.",
    tag: "Available now",
    tagStyle: "bg-[#00AEEF]/10 text-[#00AEEF]",
    done: true,
  },
];

const quoteWorkflows = [
  {
    icon: ClipboardList,
    title: "Live KPI Reports",
    quote: "EZee, every Friday, send me a live KPI report by location from QuickBooks, Mindbody, and Google Business Profile.",
  },
  {
    icon: Bell,
    title: "Proactive Escalation",
    quote: "Build a workflow that proactively flags issues needing escalation, like poor reviews, expired insurance, or missing financials.",
  },
  {
    icon: Users,
    title: "Staffing Optimization",
    quote: "EZee, optimize my staffing and schedule for this unit based on demand, bookings, and performance trends.",
  },
];

const featureWorkflows = [
  {
    icon: PackageCheck,
    title: "New Location Onboarding",
    body: "Automatically trigger onboarding sequences when a new location is added — system access, training modules, compliance checks.",
  },
  {
    icon: Workflow,
    title: "Compliance Monitoring",
    body: "Continuously monitor that each location meets required certifications, insurance, and documentation standards. Flag issues before they become problems.",
  },
  {
    icon: Bell,
    title: "Brand Standard Enforcement",
    body: "When you update an SOP or policy, automatically notify affected locations and track acknowledgment.",
  },
];

// Legacy alias for the existing code below
const workflows = featureWorkflows;

export default function WorkflowsContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-hero-gradient">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.10) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/solution" className="hover:text-[#00AEEF] transition-colors">Solution</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Agentic Workflows</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-5">Agentic Workflows</p>

            <h1
              className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              AI-powered workflows.{" "}
              <span className="text-[#00AEEF]">Dream it up. EZee executes it.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              Build any use case across the tech stack. Describe what you want in plain language — EZee maps it out and runs automations at scale.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="#examples">
                <Button size="lg" variant="secondary">
                  See Examples
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Evolution: Answers → Actions → Automations ───── */}
      <section
        className="w-full bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              The Roadmap
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              From Answers →{" "}
              <span className="text-[#00AEEF]">Actions → Automations.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {evolution.map(({ icon: Icon, title, body, tag, tagStyle, done }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className={`relative overflow-hidden rounded-2xl border p-8 ${
                  !done
                    ? "border-[#00AEEF] bg-[#00AEEF]/[0.03] shadow-[0_0_0_4px_rgba(0,174,239,0.07)]"
                    : "border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616]"
                }`}
              >
                {!done && (
                  <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/40 via-[#00AEEF] to-[#00AEEF]/40" />
                )}
                <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${done ? "bg-green-100 dark:bg-green-900/30" : "bg-[#00AEEF]/10"}`}>
                  <Icon size={20} className={done ? "text-green-600 dark:text-green-400" : "text-[#00AEEF]"} strokeWidth={1.75} />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.01em" }}>
                    {title}
                  </h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagStyle}`}>
                    {tag}
                  </span>
                </div>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example workflows ────────────────────────────── */}
      <section id="examples" className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Example Workflows
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              What you can automate{" "}
              <span className="text-[#00AEEF]">with EZee.</span>
            </h2>
          </motion.div>

          {/* Quote-style cards — operator requests */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
            {quoteWorkflows.map(({ icon: Icon, title, quote }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.08)}
                className="card-hover-blue group relative overflow-hidden rounded-2xl border-2 border-[#00AEEF]/20 bg-[#F7F8FA] dark:bg-[#111111] p-7"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0]">{title}</h3>
                <p className="text-sm leading-6 text-[#00AEEF] font-medium italic">&ldquo;{quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
            {workflows.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.08)}
                className="card-hover-blue group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] p-7"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0]">{title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.3)} className="text-center text-sm text-[#00AEEF] font-semibold">
            +++ and more — any workflow you can describe, EZee can build and execute.
          </motion.p>
        </div>
      </section>

      {/* ── Early access CTA ─────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-final-cta-gradient"
      >
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ready to automate your{" "}
              <span className="text-[#00AEEF]">operations?</span>
            </h2>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-8">
              Describe any workflow. EZee builds and executes it at scale across your entire network.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/solution"><Button size="lg" variant="secondary">Explore the Solution <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
            <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
              We&apos;re onboarding design partners now. Get early access and help shape the product.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
