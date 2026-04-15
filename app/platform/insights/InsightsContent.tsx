"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  MessageSquare,
  Target,
  MapPin,
  PieChart,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const capabilities = [
  {
    icon: MessageSquare,
    title: "Most frequently asked questions",
    body: "See the top questions across all locations. Identify patterns and address issues before they escalate.",
  },
  {
    icon: Target,
    title: "Content gap analysis",
    body: "Discover what franchisees are asking that your knowledge base can't answer. Fill gaps proactively.",
  },
  {
    icon: MapPin,
    title: "Usage by location",
    body: "Track which locations use EZee Assist most, and which may need encouragement or additional training content.",
  },
  {
    icon: PieChart,
    title: "Topic & category trends",
    body: "See question volume by category (operations, marketing, finance, vendors) over time. Spot emerging issues early.",
  },
];

export default function InsightsContent() {
  const splitRef = useRef(null);
  const splitInView = useInView(splitRef, { once: true, margin: "-60px" });

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
              <span className="font-semibold text-[#00AEEF]">Knowledge & Insights</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Knowledge & Insights
            </p>
            <h1
              className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Know what your franchisees
              <br />
              need{" "}
              <span className="text-[#00AEEF]">before they ask.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee Assist&apos;s insights dashboard gives you real-time visibility into
              every question across your network — what&apos;s being asked, where content
              gaps exist, and how your knowledge base is performing.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/platform">
                <Button size="lg" variant="secondary">
                  Explore the Platform
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Dashboard capabilities ────────────────────────── */}
      <section
        className="w-full bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Dashboard
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Visibility across your{" "}
              <span className="text-[#00AEEF]">entire franchise network.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.08)}
                className="card-hover-blue group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={22} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3
                  className="mb-3 text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
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

      {/* ── Turn questions into strategy ─────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Strategic Value
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Turn questions into{" "}
              <span className="text-[#00AEEF]">strategy.</span>
            </h2>
          </motion.div>

          <div ref={splitRef} className="grid grid-cols-1 gap-14 items-center lg:grid-cols-2">
            {/* Dashboard placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={splitInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
                style={{ paddingBottom: "62%" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)",
                  }}
                />
                {/* Fake chart bars */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-10">
                  <div className="flex h-5 w-5 items-center justify-center">
                    <LineChart size={24} className="text-[#00AEEF]/40" />
                  </div>
                  <div className="w-full space-y-2">
                    {[85, 62, 54, 41, 38].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-28 truncate text-right text-[9px] text-gray-300 dark:text-gray-600">
                          {["Brand guidelines","Vendor approvals","Marketing SOPs","Onboarding docs","HR policies"][i]}
                        </div>
                        <div className="flex-1 rounded-full bg-[#E5E7EB] dark:bg-white/[0.08] h-2.5">
                          <div
                            className="h-2.5 rounded-full bg-[#00AEEF]/60"
                            style={{ width: `${w}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500">{w}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 dark:text-gray-600">
                    Insights Dashboard Preview
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={splitInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-7">
                Most franchise brands have no idea what questions their franchisees
                are actually asking. EZee Assist surfaces this data automatically —
                so you can improve your training materials, update your SOPs, and
                identify operational issues across the network before they become
                problems.
              </p>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-10">
                Your support team stops being reactive and starts being strategic.
              </p>
              <div className="space-y-4">
                {[
                  "Improve training materials based on real gaps",
                  "Update SOPs before problems compound",
                  "Identify which locations need more support",
                  "Track knowledge base performance over time",
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
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
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
            <h2 className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              See the insights dashboard{" "}
              <span className="text-[#00AEEF]">in action.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Book a demo and see exactly what your franchise network is asking — and what you can do about it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/platform"><Button size="lg" variant="secondary">Back to Platform <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
