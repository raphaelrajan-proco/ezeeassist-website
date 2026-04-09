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
    body: "AI answers franchisee questions instantly from your knowledge base.",
    tag: "Available now",
    tagStyle: "bg-green-100 text-green-700",
    done: true,
  },
  {
    icon: CheckCircle2,
    title: "Actions",
    body: "Smart ticketing routes unanswered questions to the right person with full context.",
    tag: "Available now",
    tagStyle: "bg-green-100 text-green-700",
    done: true,
  },
  {
    icon: Zap,
    title: "Automations",
    body: "AI agents execute multi-step workflows: onboarding sequences, compliance checks, vendor coordination, and more.",
    tag: "Coming Soon",
    tagStyle: "bg-[#00AEEF]/10 text-[#00AEEF]",
    done: false,
  },
];

const workflows = [
  {
    icon: Users,
    title: "New franchisee onboarding",
    body: "Automatically trigger a checklist sequence when a new location is added — from system access to training modules to initial compliance checks.",
  },
  {
    icon: Workflow,
    title: "Vendor coordination",
    body: "When a franchisee reports an equipment issue, AI identifies the right vendor, drafts the request, and tracks resolution.",
  },
  {
    icon: ClipboardList,
    title: "Compliance monitoring",
    body: "Automatically check that each location has completed required training, certifications, and documentation on schedule.",
  },
  {
    icon: Bell,
    title: "Content update propagation",
    body: "When you update an SOP or policy, automatically notify affected locations and track acknowledgment.",
  },
];

export default function WorkflowsContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.08) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
              <Link href="/platform" className="hover:text-[#00AEEF] transition-colors">Platform</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Workflow Builder</span>
            </div>

            {/* Coming soon pill */}
            <div className="mb-5 inline-flex items-center rounded-full border border-[#00AEEF]/30 bg-[#00AEEF]/[0.07] px-4 py-1.5">
              <span className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest">Coming Soon</span>
            </div>

            <h1
              className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Go beyond answers.{" "}
              <span className="text-[#00AEEF]">Automate franchise operations.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              EZee Assist&apos;s Agentic Workflow Builder lets you create multi-step
              operational workflows powered by AI — from onboarding checklists to
              vendor coordination to compliance tracking.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Join the Waitlist</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Book a Demo to Learn More
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Evolution: Answers → Actions → Automations ───── */}
      <section
        className="w-full"
        style={{ background: "linear-gradient(to bottom, #F7F8FA 0%, #ffffff 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              The Roadmap
            </p>
            <h2
              className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
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
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                {!done && (
                  <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/40 via-[#00AEEF] to-[#00AEEF]/40" />
                )}
                <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${done ? "bg-green-100" : "bg-[#00AEEF]/10"}`}>
                  <Icon size={20} className={done ? "text-green-600" : "text-[#00AEEF]"} strokeWidth={1.75} />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.01em" }}>
                    {title}
                  </h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagStyle}`}>
                    {tag}
                  </span>
                </div>
                <p className="text-base leading-7 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example workflows ────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Example Workflows
            </p>
            <h2
              className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              What you&apos;ll be able to{" "}
              <span className="text-[#00AEEF]">automate.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {workflows.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.08)}
                className="card-hover group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-8"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Coming soon badge */}
                <div className="absolute top-5 right-5">
                  <span className="rounded-full bg-[#00AEEF]/10 px-2.5 py-1 text-[10px] font-bold text-[#00AEEF] uppercase tracking-wide">
                    Coming Soon
                  </span>
                </div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.01em" }}>
                  {title}
                </h3>
                <p className="text-base leading-7 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Early access CTA ─────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <div className="mb-5 inline-flex items-center rounded-full border border-[#00AEEF]/30 bg-[#00AEEF]/[0.07] px-4 py-1.5">
              <span className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest">Early Access</span>
            </div>
            <h2
              className="text-4xl font-bold text-[#0A0A0A] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Be the first to automate your{" "}
              <span className="text-[#00AEEF]">franchise operations.</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Join the Waitlist</Button></Link>
              <Link href="/platform"><Button size="lg" variant="secondary">Explore the Platform <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              We&apos;re onboarding design partners now. Get early access and help shape the product.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
