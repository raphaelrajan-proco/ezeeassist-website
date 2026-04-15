"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  Brain,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Globe,
  Mail,
  Smartphone,
  FileText,
  Video,
  Database,
  FolderOpen,
  Hash,
} from "lucide-react";

/* ─── Helpers ──────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

/* ─── 4 Pillars ──────────────────────────────────────── */

const pillars = [
  {
    icon: Brain,
    title: "AI Knowledge Engine",
    description:
      "Connects to every document, video, and SOP your brand owns. Delivers instant, brand-accurate answers — not generic AI guesses.",
    bullets: [
      "Ingests PDFs, Word docs, Google Drive, SharePoint",
      "Understands context across your entire knowledge base",
      "Answers grounded in your content, cited back to source",
      "Updates automatically when your content changes",
    ],
    accent: "#00AEEF",
  },
  {
    icon: MessageCircle,
    title: "Omnichannel Delivery",
    description:
      "Franchisees get answers wherever they already work — no new apps, no training, no behavior change.",
    bullets: [
      "SMS / text message (most popular)",
      "Slack & Microsoft Teams",
      "Email & web portal",
      "Embeddable chat widget for your intranet",
    ],
    accent: "#0A0A0A",
  },
  {
    icon: TrendingUp,
    title: "Intelligent Escalation",
    description:
      "When AI can't answer, it doesn't just shrug. It opens a ticket with full conversation context pre-attached and routes to the right person.",
    bullets: [
      "Zero-friction handoff from AI to human",
      "Full conversation history attached to every ticket",
      "Smart routing by topic, location, or urgency",
      "SLA tracking and response-time reporting",
    ],
    accent: "#00AEEF",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description:
      "See exactly what your network is asking, where knowledge gaps exist, and how to fix them — before they become problems.",
    bullets: [
      "Top questions by location and category",
      "Deflection rate and resolution time",
      "Knowledge gap detection",
      "Exportable reports for leadership",
    ],
    accent: "#0A0A0A",
  },
];

/* ─── Flow steps ───────────────────────────────────────── */

const flowSteps = [
  {
    number: "01",
    label: "Franchisee asks a question",
    sub: "Via SMS, Slack, Teams, email, or web portal",
    color: "border-[#00AEEF] text-[#00AEEF] shadow-[0_0_0_6px_rgba(0,174,239,0.08)]",
  },
  {
    number: "02",
    label: "AI searches your knowledge base",
    sub: "Across all connected sources in under 2 seconds",
    color: "border-[#00AEEF] text-[#00AEEF] shadow-[0_0_0_6px_rgba(0,174,239,0.08)]",
  },
  {
    number: "03",
    label: "Brand-accurate answer delivered",
    sub: "With source citation — no hallucination risk",
    color: "border-[#00AEEF] text-[#00AEEF] shadow-[0_0_0_6px_rgba(0,174,239,0.08)]",
  },
  {
    number: "04",
    label: "If needed, ticket auto-created",
    sub: "Routed to the right team with full context",
    color: "border-gray-200 text-gray-400",
  },
];

/* ─── Integrations ─────────────────────────────────────── */

const integrations = [
  { icon: FolderOpen, label: "Google Drive" },
  { icon: Database,   label: "SharePoint" },
  { icon: FileText,   label: "Dropbox" },
  { icon: Video,      label: "YouTube" },
  { icon: Hash,       label: "Slack" },
  { icon: Globe,      label: "Microsoft Teams" },
  { icon: Mail,       label: "Email / Outlook" },
  { icon: Smartphone, label: "SMS" },
  { icon: Globe,      label: "WordPress" },
  { icon: FileText,   label: "Confluence" },
  { icon: Database,   label: "Notion" },
  { icon: Globe,      label: "Web Portal" },
];

// Duplicate for seamless marquee
const integrationsDup = [...integrations, ...integrations];

/* ─── Component ────────────────────────────────────────── */

export default function PlatformContent() {
  const flowRef  = useRef<HTMLDivElement>(null);
  const [flowVisible, setFlowVisible]   = useState(false);
  const [lineVisible, setLineVisible]   = useState(false);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    const stepsObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFlowVisible(true); stepsObs.disconnect(); } },
      { threshold: 0.1 }
    );
    const lineObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLineVisible(true);  lineObs.disconnect();  } },
      { threshold: 0.3 }
    );
    stepsObs.observe(el);
    lineObs.observe(el);
    return () => { stepsObs.disconnect(); lineObs.disconnect(); };
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-hero-gradient"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,174,239,0.09) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div
            className="max-w-3xl"
            {...fadeUp(0)}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              The Platform
            </p>
            <h1
              className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Everything your
              <br />
              network needs.{" "}
              <span className="text-[#00AEEF]">Nothing it doesn&apos;t.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee Assist combines an AI knowledge engine, omnichannel delivery,
              intelligent escalation, and real-time analytics into one platform
              built exclusively for franchise and multi-location brands.
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

      {/* ── 4 Pillars ────────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div
            className="text-center mb-16"
            {...fadeUp(0)}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Core Capabilities
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Four pillars.{" "}
              <span className="text-[#00AEEF]">One platform.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, description, bullets }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="card-hover-lift group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#1A1A1A] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={22} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>

                <h3
                  className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400 mb-6">{description}</p>

                <ul className="space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-[#00AEEF]"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it flows ─────────────────────────────────── */}
      <section
        className="w-full relative overflow-hidden bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Under the Hood
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              How a question becomes{" "}
              <span className="text-[#00AEEF]">an answer.</span>
            </h2>
          </motion.div>

          {/* Flow diagram */}
          <div ref={flowRef} className="relative">
            {/* Animated connector line — draws left-to-right on scroll */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
              className="absolute top-[28px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] hidden h-px origin-left bg-gradient-to-r from-[#00AEEF]/20 via-[#00AEEF]/60 to-[#00AEEF]/20 lg:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {flowSteps.map(({ number, label, sub, color }, i) => (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, y: 28 }}
                  animate={flowVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle — pulses when in view */}
                  <div
                    className={`relative z-10 mb-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white dark:bg-[#161616] text-sm font-bold ${color} ${
                      flowVisible ? "animate-pulse-ring" : ""
                    }`}
                    style={flowVisible ? { animationDelay: `${i * 0.35}s` } : {}}
                  >
                    {number}
                  </div>

                  <h3
                    className="text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {label}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Visual flow card */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-14 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)]"
            >
              {/* Mock chat UI */}
              <div className="border-b border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#1A1A1A] px-6 py-4 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 ml-2">EZee Assist — Chat Portal</span>
              </div>

              <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] dark:divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
                {/* Question */}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Franchisee</p>
                  <div className="inline-block rounded-2xl rounded-tl-none bg-[#F7F8FA] dark:bg-[#1A1A1A] px-4 py-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">What&apos;s the approved vendor list for HVAC repairs in the Southwest region?</p>
                  </div>
                  <p className="mt-3 text-[10px] text-gray-300 dark:text-gray-600">Sent via SMS — 11:42 PM</p>
                </div>

                {/* Processing */}
                <div className="p-6 flex flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">AI Processing</p>
                  <div className="space-y-2.5">
                    {[
                      "Searching Operations Manual v4...",
                      "Scanning Vendor Approval Policy...",
                      "Checking Regional SOP — Southwest...",
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#00AEEF] flex-shrink-0" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-[10px] text-[#00AEEF] font-semibold">Answer found in 1.4s</div>
                </div>

                {/* Answer */}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">EZee Assist</p>
                  <div className="inline-block rounded-2xl rounded-tr-none bg-[#00AEEF]/[0.08] px-4 py-3 border border-[#00AEEF]/20">
                    <p className="text-sm text-[#0A0A0A] dark:text-[#F0F0F0]">
                      The approved HVAC vendors for the Southwest region are listed in the Regional SOP, Section 7.2.
                      Your three approved vendors are <span className="font-semibold">AirPro Services</span>,{" "}
                      <span className="font-semibold">Desert HVAC Co.</span>, and{" "}
                      <span className="font-semibold">SunState Mechanical</span>.
                    </p>
                  </div>
                  <p className="mt-3 text-[10px] text-gray-400 dark:text-gray-500">
                    Source: <span className="text-[#00AEEF]">Regional SOP — Southwest, §7.2</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Integrations ─────────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-12" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Works With What You Already Use
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Plug in.{" "}
              <span className="text-[#00AEEF]">No migration required.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              EZee Assist connects to your existing tools in minutes. Your content
              stays exactly where it is — we just make it instantly findable.
            </p>
          </motion.div>

          {/* Scrolling integrations bar */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative"
          >
            {/* Edge fades */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white dark:from-[#0D0D0D] to-transparent"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white dark:from-[#0D0D0D] to-transparent"
            />

            <div className="overflow-hidden">
              <div className="flex gap-4 animate-marquee w-max">
                {integrationsDup.map(({ icon: Icon, label }, i) => (
                  <div
                    key={`${label}-${i}`}
                    className="flex flex-shrink-0 items-center gap-3 rounded-xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#1A1A1A] px-5 py-3.5 shadow-sm"
                  >
                    <Icon size={18} className="text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Security callout ──────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col items-center gap-10 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] md:flex-row"
          >
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#00AEEF]/10">
              <ShieldCheck size={28} className="text-[#00AEEF]" strokeWidth={1.75} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3
                className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2"
                style={{ letterSpacing: "-0.01em" }}
              >
                Built with enterprise security from day one.
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                SOC 2 Type II certified, GDPR compliant, and role-based access controls
                throughout. Your data never trains public AI models.
              </p>
            </div>
            <Link href="/security" className="flex-shrink-0">
              <Button variant="secondary">
                Security Overview
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-final-cta-gradient"
      >
        {/* Dot grid */}
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0"
          style={{ opacity: 0.35 }}
          aria-hidden="true"
        />
        {/* Radial glow */}
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

        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-36">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Ready to Scale?
            </p>
            <h2
              className="text-4xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              See it live in{" "}
              <span className="text-[#00AEEF]">your network.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Book a 30-minute demo and we&apos;ll walk through exactly how EZee Assist
              would work with your team, your systems, and your franchisees.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="secondary">
                  Read Case Studies
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
              Not sure if it fits your industry?{" "}
              <Link href="/industries" className="font-semibold text-[#00AEEF] hover:underline">
                See how it works for your industry →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
