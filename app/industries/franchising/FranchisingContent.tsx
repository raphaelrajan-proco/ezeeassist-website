"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import TrustBar from "@/components/sections/TrustBar";
import {
  Building,
  MapPin,
  MessageSquare,
  FolderSearch,
  TrendingDown,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const painPoints = [
  {
    icon: MessageSquare,
    title: "Repetitive operational questions",
    body: "Your FBCs answer the same questions about hours, procedures, vendors, and policies — hundreds of times across locations.",
  },
  {
    icon: FolderSearch,
    title: "Scattered institutional knowledge",
    body: "Operating manuals live in Google Drive. Training videos on YouTube. Policies in SharePoint. Tribal knowledge in people's heads.",
  },
  {
    icon: TrendingDown,
    title: "Franchisee satisfaction at risk",
    body: "When franchisees can't get fast answers, satisfaction drops, NPS declines, and relationships erode.",
  },
  {
    icon: Users,
    title: "Scaling support is expensive",
    body: "Every new location means more questions. Hiring more support staff doesn't scale. You need a force multiplier.",
  },
];

const caseStudies = [
  { brand: "WSI",        stat: "67% support reduction globally",      initials: "WSI" },
  { brand: "DekaLash",   stat: "93% AI resolution rate",              initials: "DL"  },
  { brand: "DivaDance",  stat: "2,600+ queries answered, 650+ hrs saved", initials: "DD" },
];

const communityPartners = ["IFA Supplier Forum", "Canadian Franchise Association", "Franchise Supplier Network", "WSI Partner"];

export default function FranchisingContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px]" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.08) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
              <Link href="/industries" className="hover:text-[#00AEEF] transition-colors">Industries</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Franchising</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Franchise Brands</p>
            <h1 className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em" }}>
              The AI support platform built{" "}
              <span className="text-[#00AEEF]">exclusively for franchise brands.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              EZee Assist helps franchise systems centralize brand knowledge, reduce repetitive support questions by over 60%, and give every franchisee instant answers — 24/7, through the channels they already use.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/case-studies"><Button size="lg" variant="secondary">See Case Studies <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Audience selector ────────────────────────────── */}
      <section style={{ background: "linear-gradient(to bottom, #F7F8FA 0%, #ffffff 100%)" }} className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Who It&apos;s For</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Built for every role in the{" "}
              <span className="text-[#00AEEF]">franchise ecosystem.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              {
                icon: Building,
                label: "For Franchisors & Brand Teams",
                desc: "Reduce support burden, maintain brand consistency, and scale your support operations as you grow — without growing your team.",
                href: "/industries/franchising/franchisors",
                linkLabel: "See the franchisor solution",
              },
              {
                icon: MapPin,
                label: "For Multi-Unit Franchisee Operators",
                desc: "Get instant answers for every location you operate. Onboard new staff faster. Stay aligned with the brand without waiting on hold.",
                href: "/industries/franchising/multi-unit-franchisees",
                linkLabel: "See the franchisee solution",
              },
            ].map(({ icon: Icon, label, desc, href, linkLabel }, i) => (
              <motion.div
                key={label}
                {...fadeUp(i * 0.1)}
                className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.05)]"
                style={{ borderLeft: "4px solid #00AEEF" }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00AEEF]/10">
                  <Icon size={26} className="text-[#00AEEF]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.02em" }}>{label}</h3>
                <p className="mb-8 flex-1 text-base leading-7 text-gray-600">{desc}</p>
                <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#00AEEF] hover:gap-3 transition-all duration-150">
                  {linkLabel} <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pain points ──────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">The Challenge</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              The support challenges every{" "}
              <span className="text-[#00AEEF]">franchise brand faces.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {painPoints.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)} className="card-hover group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-8">
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                <p className="text-base leading-7 text-gray-600">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case study highlights ─────────────────────────── */}
      <section style={{ background: "linear-gradient(to bottom, #F7F8FA 0%, #ffffff 100%)" }} className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Results</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Trusted by franchise brands{" "}
              <span className="text-[#00AEEF]">across North America.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
            {caseStudies.map(({ brand, stat, initials }, i) => (
              <motion.div key={brand} {...fadeUp(i * 0.1)} className="card-hover flex flex-col items-start rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.05)]" style={{ borderTop: "3px solid #00AEEF" }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00AEEF]/10 text-sm font-bold text-[#00AEEF]">{initials}</div>
                <p className="mb-2 text-lg font-bold text-[#0A0A0A]" style={{ letterSpacing: "-0.01em" }}>{brand}</p>
                <p className="mb-6 flex-1 text-base text-gray-600">{stat}</p>
                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00AEEF] hover:gap-2.5 transition-all duration-150">
                  Read case study <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
          <TrustBar />
        </div>
      </section>

      {/* ── Community proof ───────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] border-y border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.div {...fadeUp(0)}>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
              Proud member of the franchise community
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {communityPartners.map((name) => (
                <div key={name} className="flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 shadow-sm">
                  <span className="text-sm font-semibold text-gray-400">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #F0F9FF 100%)" }}>
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-4xl font-bold text-[#0A0A0A] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Give your franchise network the{" "}
              <span className="text-[#00AEEF]">support it deserves.</span>
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
