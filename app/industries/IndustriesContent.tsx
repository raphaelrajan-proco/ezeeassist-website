"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Store, Building2, GraduationCap, Clock, Database, BarChart2, GitBranch, ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const industries = [
  {
    icon: Store,
    title: "Franchise Brands",
    description: "Give every franchisee instant access to operating manuals, SOPs, training materials, and brand guidelines — without overwhelming your support team.",
    stat: "67% average support reduction",
    href: "/industries/franchising",
    linkLabel: "Explore franchising",
  },
  {
    icon: Building2,
    title: "Multi-Location Businesses",
    description: "Standardize operations and support across every location. One knowledge base, consistent answers, centralized visibility.",
    stat: "24/7 support across every location",
    href: "/industries/multi-location",
    linkLabel: "Explore multi-location",
  },
  {
    icon: GraduationCap,
    title: "Universities & Campus Systems",
    description: "Help staff, faculty, and administrators find answers instantly across departments, campuses, and operational systems.",
    stat: "One platform for every campus",
    href: "/industries/universities",
    linkLabel: "Explore universities",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "24/7 instant answers",
    body: "Your teams get support whenever they need it — not just during business hours.",
  },
  {
    icon: Database,
    title: "Zero knowledge migration",
    body: "We connect to your existing tools. No uploading, no reformatting, no migration projects.",
  },
  {
    icon: BarChart2,
    title: "Centralized visibility",
    body: "See what every location is asking, where gaps exist, and how your knowledge base performs.",
  },
  {
    icon: GitBranch,
    title: "Smart escalation",
    body: "When AI can't answer, questions route to the right human with full context.",
  },
];

export default function IndustriesContent() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Industries</p>
            <h1 className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em" }}>
              Purpose-built AI support for{" "}
              <span className="text-[#00AEEF]">every multi-location business.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              Whether you operate a franchise network, multi-location service brand, or a university campus system — EZee Assist gives your teams instant answers from your own knowledge base, 24/7.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Industry cards ────────────────────────────────── */}
      <section style={{ background: "linear-gradient(to bottom, #F7F8FA 0%, #ffffff 100%)" }} className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Solutions</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Solutions by <span className="text-[#00AEEF]">industry.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {industries.map(({ icon: Icon, title, description, stat, href, linkLabel }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.05)]"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#00AEEF]/40 via-[#00AEEF] to-[#00AEEF]/40" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00AEEF]/10">
                  <Icon size={26} className="text-[#00AEEF]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="mb-6 flex-1 text-base leading-7 text-gray-600">{description}</p>
                <div className="mb-6 rounded-xl bg-[#00AEEF]/[0.06] border border-[#00AEEF]/20 px-4 py-3">
                  <p className="text-sm font-semibold text-[#00AEEF]">{stat}</p>
                </div>
                <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00AEEF] hover:gap-3 transition-all duration-150">
                  {linkLabel} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-industry benefits ───────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Universal Benefits</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              What every multi-location organization <span className="text-[#00AEEF]">gets.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.08)}
                className="card-hover group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-7"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #F0F9FF 100%)" }}>
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-4xl font-bold text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              See how EZee Assist works for{" "}
              <span className="text-[#00AEEF]">your industry.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Book a 30-minute demo and we&apos;ll walk through exactly how EZee Assist would work with your team, your systems, and your people.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/platform"><Button size="lg" variant="secondary">Explore the Platform <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
