"use client";

import { motion } from "framer-motion";
import { Link2, Heart, Lightbulb, KeyRound, MessageSquare, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const team = [
  { name: "Moshood Awari-Yusuf", title: "Sr. Software Engineer",  initials: "MA" },
  { name: "Gabe Cadamuro",       title: "Co-founder & CTO",       initials: "GC" },
  { name: "Samuel Chen",         title: "Software Engineer",       initials: "SC" },
  { name: "Greg Hatt",           title: "Sr. Software Engineer",  initials: "GH" },
  { name: "Gurkaran Kahlon",     title: "Sr. Software Engineer",  initials: "GK" },
  { name: "Shashwath Krishna",   title: "Sr. ML Engineer",        initials: "SK" },
  { name: "Shray Mehra",         title: "Co-founder & COO",       initials: "SM" },
  { name: "Bborie Park",         title: "Head of Engineering",    initials: "BP" },
  { name: "Raphael Rajan",       title: "Co-founder & CEO",       initials: "RR" },
  { name: "Jolomi Tosanwumi",    title: "ML Engineer",            initials: "JT" },
];

const values = [
  { icon: Heart,         text: "We are honest and compassionate with all stakeholders" },
  { icon: Lightbulb,    text: "We have strong opinions, but they are loosely held" },
  { icon: KeyRound,     text: "We act like owners" },
  { icon: MessageSquare, text: "We communicate clearly and in a timely manner" },
  { icon: Zap,          text: "We execute with urgency, without compromising excellence" },
];

const investors = ["N49P", "10vc", "Antler", "Hustle Fund"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

export default function AboutContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(0,174,239,0.05) 0%, transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">About Us</p>
            <h1
              className="text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              About our <span className="text-[#00AEEF]">company</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              Our team brings deep expertise in solving complex enterprise
              challenges with technology. Our combined experiences include
              strategy consulting, venture capital, AI and Machine Learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Team ───────────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              The Team
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Meet our <span className="text-[#00AEEF]">team</span>
            </h2>
          </motion.div>

          {/* Team grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {team.map(({ name, title, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Avatar */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00AEEF]/10 border-2 border-[#00AEEF]/20 text-base font-bold text-[#00AEEF] mb-3 transition-all duration-250 group-hover:border-[#00AEEF]/60 group-hover:bg-[#00AEEF]/18 group-hover:shadow-[0_0_0_6px_rgba(0,174,239,0.08)] group-hover:scale-105">
                  {initials}
                </div>
                <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0] leading-tight">
                  {name}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  {title}
                </p>
                <a
                  href="#"
                  aria-label={`${name} LinkedIn`}
                  className="mt-2 text-gray-300 dark:text-gray-600 hover:text-[#00AEEF] transition-colors"
                >
                  <Link2 size={13} />
                </a>
              </motion.div>
            ))}
          </div>

          {/* "We're hiring" card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-dashed border-[#00AEEF]/40 bg-[#00AEEF]/[0.03] dark:bg-[#00AEEF]/[0.05] px-8 py-6"
          >
            <div>
              <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-1">
                🚀 We&apos;re hiring
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join a high-growth team building the future of franchise AI. Remote-first, high-ownership culture.
              </p>
            </div>
            <Link href="/careers" className="flex-shrink-0">
              <Button variant="secondary" size="md">
                View open roles <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Our Values
            </p>
            <h2
              className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              What we <span className="text-[#00AEEF]">believe in</span>
            </h2>
          </motion.div>

          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-5">
            {values.slice(0, 3).map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
                className="card-hover-blue flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00AEEF]/10">
                  <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <p className="text-base font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] leading-snug">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Row 2 — 2 centered cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:max-w-2xl sm:mx-auto">
            {values.slice(3).map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
                className="card-hover-blue flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00AEEF]/10">
                  <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <p className="text-base font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] leading-snug">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── This is EZee Assist ─────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Our Culture</p>
              <h2
                className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl mb-5"
                style={{ letterSpacing: "-0.02em" }}
              >
                This is <span className="text-[#00AEEF]">EZee Assist</span>
              </h2>
              <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
                We are a digital-first, remote-first organization built on trust,
                autonomy, and a shared mission to transform how franchise systems
                operate. Our team spans multiple time zones and brings together
                diverse backgrounds — from enterprise software to machine
                learning, franchise operations to venture-backed startups.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                We move fast, care deeply, and hold ourselves to a high standard.
                Whether you&apos;re a franchisee at 2am or a support manager
                reviewing tickets on Monday morning, we&apos;re building for you.
              </p>
            </motion.div>

            {/* 5×2 photo placeholder grid */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="grid grid-cols-5 gap-2"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-[#F7F8FA] dark:bg-[#111111] border border-[#E5E7EB] dark:border-white/[0.08]"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Investors ───────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111] border-t border-[#E5E7EB] dark:border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 text-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
              Backed by leading investors
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {investors.map((name) => (
                <div
                  key={name}
                  className="card-hover flex items-center justify-center rounded-xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] px-8 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)] min-w-[120px]"
                >
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
