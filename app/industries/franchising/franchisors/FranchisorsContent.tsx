"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  TrendingDown, ShieldCheck, Zap, BarChart2, GitBranch, Wifi,
  CheckCircle2, ArrowRight,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const features = [
  { icon: TrendingDown, title: "Slash repetitive questions",        body: "AI handles the questions your team answers 100x. FBCs focus on complex, high-value work." },
  { icon: ShieldCheck,  title: "Brand consistency at scale",        body: "Every franchisee gets the same accurate, brand-approved answer. No more inconsistent advice." },
  { icon: Zap,          title: "Onboard new locations instantly",   body: "New franchisees get immediate access to all brand knowledge from day one. No waiting for training." },
  { icon: BarChart2,    title: "See what your network needs",       body: "Dashboard shows top questions, content gaps, and usage patterns across every location." },
  { icon: GitBranch,    title: "Smart escalation to your team",     body: "Questions AI can't answer become tickets with full context — routed to the right FBC automatically." },
  { icon: Wifi,         title: "Zero behavior change for franchisees", body: "They text, email, Slack, or Teams — whatever they already do. No new apps to learn." },
];

const stats = [
  { value: "67%",       label: "Reduction in support questions", sub: "WSI" },
  { value: "40%+",      label: "Reduction in support team burden", sub: "" },
  { value: "< 30s",     label: "Average franchisee response time", sub: "" },
];

const testimonials = [
  {
    quote: "EZee Assist's solution and desire to solve problems has made them a key partner for EverLine. Our franchisees have embraced this technology and we are looking forward to expanding its use in the future.",
    name: "John Evans", title: "Founder & CEO", company: "EverLine Coatings & Services", initials: "JE",
  },
  {
    quote: "AI is now an expectation in franchisee support. With EZee Assist, our owners get accurate, brand-specific answers 24/7 — not generic internet advice — while our team focuses on bigger initiatives.",
    name: "Troy McCullen", title: "Vice President of Operations", company: "DekaLash", initials: "TM",
  },
];

export default function FranchisorsContent() {
  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-hero-gradient">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px]" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.08) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/industries" className="hover:text-[#00AEEF] transition-colors">Industries</Link>
              <span>/</span>
              <Link href="/industries/franchising" className="hover:text-[#00AEEF] transition-colors">Franchising</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">For Franchisors</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">For Franchisors & Brand Teams</p>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em" }}>
              Scale franchise support{" "}
              <span className="text-[#00AEEF]">without scaling your team.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee Assist gives your franchise brand 24/7 AI-powered support that answers franchisee questions from your own knowledge base — reducing support volume, improving satisfaction, and freeing your FBCs for strategic work.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/case-studies"><Button size="lg" variant="secondary">See Case Studies <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The Problem</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Your support team is the bottleneck.{" "}
              <span className="text-[#00AEEF]">It doesn&apos;t have to be.</span>
            </h2>
          </motion.div>

          <div ref={problemRef} className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-5">
                As your franchise grows, support demand grows faster. Every new location adds questions — about operations, vendors, marketing, compliance. Your FBCs spend their days answering the same things over and over instead of coaching, training, and growing the network.
              </p>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-5">
                You&apos;ve tried knowledge bases, FAQs, and portals. Franchisees don&apos;t use them. They text, email, or call — because that&apos;s what&apos;s easiest.
              </p>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 font-medium text-[#0A0A0A] dark:text-[#F0F0F0]">
                EZee Assist meets them where they are.
              </p>
              <div className="mt-8 space-y-3">
                {["67% fewer support tickets on average","FBCs reclaim hours of their week","Franchisees get answers in under 30 seconds"].map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15">
                      <CheckCircle2 size={12} className="text-[#00AEEF]" strokeWidth={2.5} />
                    </div>
                    <span className="text-base text-gray-700 dark:text-gray-300">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative w-full overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#161616] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)]" style={{ paddingBottom: "62%" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-white/[0.08] shadow-sm">
                    <BarChart2 size={22} className="text-[#00AEEF]" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Franchisor Dashboard Preview</p>
                  <p className="text-[10px] text-gray-300 dark:text-gray-600">Screenshot coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Capabilities</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Built for <span className="text-[#00AEEF]">franchisor teams.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.07)} className="card-hover-blue group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#161616] p-7">
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Customer Stories</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              What franchise leaders <span className="text-[#00AEEF]">are saying.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map(({ quote, name, title, company, initials }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.1)} className="rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.05)]" style={{ borderLeft: "4px solid #00AEEF" }}>
                <span className="text-5xl font-extrabold leading-none text-[#00AEEF] select-none">&ldquo;</span>
                <p className="mt-2 mb-6 text-base leading-7 text-[#0A0A0A] dark:text-[#F0F0F0]">{quote}</p>
                <div className="flex items-center gap-4 pt-5 border-t border-[#E5E7EB] dark:border-white/[0.08]">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15 text-sm font-bold text-[#00AEEF]">{initials}</div>
                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0]">{name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}, <span className="font-medium text-[#0A0A0A] dark:text-[#F0F0F0]">{company}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI stats ─────────────────────────────────────── */}
      <section className="relative w-full bg-[#00AEEF]/[0.04] dark:bg-[#0D0D0D]">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div ref={statsRef} className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.02em" }}>The business case for AI-powered franchise support.</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map(({ value, label, sub }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }} className="flex flex-col items-center text-center rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-sm">
                <span className="text-5xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.03em" }}>{value}</span>
                <span className="mt-2 text-base text-gray-600 dark:text-gray-400">{label}</span>
                {sub && <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">{sub}</span>}
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
            <h2 className="text-4xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              See how top franchise brands{" "}
              <span className="text-[#00AEEF]">use EZee Assist.</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/case-studies"><Button size="lg" variant="secondary">See Case Studies <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
