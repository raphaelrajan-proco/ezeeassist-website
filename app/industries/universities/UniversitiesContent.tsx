"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Users, BookOpen, Building2, ArrowRight, GraduationCap } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const useCases = [
  {
    icon: Users,
    title: "Administrative staff",
    body: "HR policies, procurement procedures, compliance requirements — instantly accessible instead of buried in shared drives.",
  },
  {
    icon: BookOpen,
    title: "Faculty support",
    body: "Course policies, grading procedures, technology guides, research administration — one question, one instant answer.",
  },
  {
    icon: Building2,
    title: "Campus operations",
    body: "Facilities procedures, safety protocols, event logistics, vendor contacts — available 24/7 to every team on every campus.",
  },
];

export default function UniversitiesContent() {
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
              <span className="font-semibold text-[#00AEEF]">Universities</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Universities & Campus Systems</p>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em" }}>
              Instant answers for every department,{" "}
              <span className="text-[#00AEEF]">campus, and team.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              Universities and campus systems generate enormous amounts of operational documentation across departments, faculties, and campuses. EZee Assist centralizes it all and gives staff instant access through the channels they already use.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/industries"><Button size="lg" variant="secondary">All Industries <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Use Cases</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Built for everyone{" "}
              <span className="text-[#00AEEF]">on campus.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {useCases.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="card-hover-blue group relative overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.04)]">
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

      {/* ── Why universities ─────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-2">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Why EZee Assist</p>
              <h2 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl mb-7" style={{ letterSpacing: "-0.02em" }}>
                Why universities need{" "}
                <span className="text-[#00AEEF]">purpose-built AI support.</span>
              </h2>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-5">
                Universities aren&apos;t short on documentation — they&apos;re short on findability. Knowledge lives in dozens of disconnected systems across departments and campuses. Staff waste hours searching for procedures that should take seconds to find.
              </p>
              <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
                EZee Assist connects to all of it and makes the entire institution&apos;s knowledge searchable and instantly answerable.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="flex flex-col gap-5">
              {[
                { stat: "72%", label: "of staff time spent searching for information could be eliminated" },
                { stat: "< 30s", label: "Average time to answer any operational question" },
                { stat: "24/7", label: "Support across all departments and campuses" },
              ].map(({ stat, label }) => (
                <div key={stat} className="flex items-center gap-5 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#161616] px-7 py-5">
                  <span className="text-3xl font-bold text-[#00AEEF] flex-shrink-0" style={{ letterSpacing: "-0.03em" }}>{stat}</span>
                  <span className="text-base text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#F0F9FF] dark:bg-[#0D0D0D] border-t border-[#E5E7EB] dark:border-white/[0.06]">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00AEEF]/10">
                <GraduationCap size={30} className="text-[#00AEEF]" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Explore EZee Assist{" "}
              <span className="text-[#00AEEF]">for your university.</span>
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
