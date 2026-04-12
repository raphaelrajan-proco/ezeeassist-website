"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Utensils, ShoppingBag, Wrench, Heart, Database, Zap, BarChart2, ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const segments = [
  { icon: Utensils,    label: "Restaurant groups" },
  { icon: ShoppingBag, label: "Retail chains" },
  { icon: Wrench,      label: "Service businesses" },
  { icon: Heart,       label: "Healthcare networks" },
];

const benefits = [
  { icon: Database, title: "One source of truth", body: "Connect all your operational documents, training materials, and policies into one AI-powered knowledge engine." },
  { icon: Zap,      title: "Instant support for every team member", body: "Staff at any location can ask questions and get accurate answers immediately — reducing manager burden and training time." },
  { icon: BarChart2,title: "Operational visibility", body: "See what's being asked across locations, identify training gaps, and spot operational issues before they escalate." },
];

export default function MultiLocationContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0D0D0D]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px]" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.08) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/industries" className="hover:text-[#00AEEF] transition-colors">Industries</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Multi-Location</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Multi-Location Businesses</p>
            <h1 className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em" }}>
              Centralized knowledge. Consistent operations.{" "}
              <span className="text-[#00AEEF]">Every location.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee Assist helps multi-location businesses standardize operations and give every team member instant access to company knowledge — SOPs, procedures, training materials, and policies — 24/7.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/platform"><Button size="lg" variant="secondary">Explore the Platform <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Who It&apos;s For</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Built for businesses operating{" "}
              <span className="text-[#00AEEF]">across multiple locations.</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {segments.map(({ icon: Icon, label }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.08)} className="card-hover flex items-center gap-4 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] px-8 py-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={22} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <span className="text-base font-semibold text-[#0A0A0A] dark:text-[#F0F0F0]">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Key Benefits</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              What you <span className="text-[#00AEEF]">get.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="card-hover group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#161616] p-8">
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={22} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#F0F9FF] dark:bg-[#0D0D0D] border-t border-[#E5E7EB] dark:border-white/[0.06]">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              See how EZee Assist works for{" "}
              <span className="text-[#00AEEF]">multi-location businesses.</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/industries"><Button size="lg" variant="secondary">All Industries <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
