"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  RefreshCw, Users, AlertCircle, Wifi, Zap, ShieldCheck, TrendingUp, MessageCircle, Search, CheckCircle2, ArrowRight,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const painPoints = [
  { icon: RefreshCw, title: "Staff turnover means constant retraining", body: "Every time a location hires someone new, they need to learn the brand's operations from scratch. Manuals go unread. Questions pile up." },
  { icon: AlertCircle, title: "You're the bottleneck", body: "Your managers call or text you for answers because it's faster than digging through a manual. That doesn't scale." },
  { icon: Users, title: "Inconsistency across locations", body: "Different locations doing things different ways — because they got different answers or couldn't find the right procedure." },
];

const benefits = [
  { icon: Zap, title: "Instant answers for every staff member", body: "From day-one hires to veteran managers — anyone can ask a question and get an accurate, brand-specific answer in seconds." },
  { icon: TrendingUp, title: "Faster staff onboarding", body: "New hires get up to speed by asking EZee Assist instead of waiting for training sessions or shadowing." },
  { icon: ShieldCheck, title: "Consistency across all your locations", body: "Every location gets the same answer to the same question. No more one location doing it right and another doing it wrong." },
  { icon: Wifi, title: "You stay focused on growth", body: "Stop being the human knowledge base. Let AI handle the day-to-day operational questions so you can focus on running and growing your locations." },
];

const howItWorks = [
  { icon: CheckCircle2, step: "01", title: "Your franchisor connects the brand's knowledge to EZee Assist", sub: "All manuals, SOPs, training materials, and policies — indexed automatically." },
  { icon: MessageCircle, step: "02", title: "Your staff asks questions through text, email, or the app", sub: "In natural language, the way they'd ask a colleague. No new tools to learn." },
  { icon: Search, step: "03", title: "They get instant, accurate answers — day or night", sub: "Sourced from the brand's own content, with citations. Not generic AI guesses." },
];

export default function MultiUnitContent() {
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
              <Link href="/industries/franchising" className="hover:text-[#00AEEF] transition-colors">Franchising</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Multi-Unit Franchisees</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">For Multi-Unit Operators</p>
            <h1 className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em" }}>
              Run every location with confidence.{" "}
              <span className="text-[#00AEEF]">Get answers instantly.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              You operate multiple franchise locations. Your staff has questions every day — about procedures, vendors, policies, marketing assets. EZee Assist gives every one of your locations instant access to the brand&apos;s knowledge base, 24/7.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/industries/franchising"><Button size="lg" variant="secondary">Learn More <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pain points ──────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The Challenge</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              More locations. More questions.{" "}
              <span className="text-[#00AEEF]">Same small team.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {painPoints.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="card-hover group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.04)]">
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The Solution</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Your operations co-pilot{" "}
              <span className="text-[#00AEEF]">across every location.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)} className="card-hover group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#161616] p-8">
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

      {/* ── How it works ─────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Simple by Design</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Three steps. <span className="text-[#00AEEF]">That&apos;s it.</span>
            </h2>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-medium">No setup on your end. No new tools for your team to learn.</p>
          </motion.div>
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] hidden h-px bg-gradient-to-r from-[#00AEEF]/30 via-[#00AEEF]/60 to-[#00AEEF]/30 md:block" aria-hidden="true" />
            {howItWorks.map(({ icon: Icon, step, title, sub }, i) => (
              <motion.div key={step} {...fadeUp(i * 0.12)} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative z-10 mb-6 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white dark:bg-[#161616] shadow-[0_0_0_6px_rgba(0,174,239,0.08)]">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#00AEEF] mb-2">{step}</p>
                <h3 className="text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{sub}</p>
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
              Ready to give every location an{" "}
              <span className="text-[#00AEEF]">instant knowledge advantage?</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo Directly</Button></Link>
              <Link href="/industries/franchising"><Button size="lg" variant="secondary">Ask Your Franchisor <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
