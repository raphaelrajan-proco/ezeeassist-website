"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, TrendingDown, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const caseStudies = [
  {
    brand: "WSI",
    slug: "/case-studies/wsi",
    tag: "Global support scale",
    tagIcon: TrendingDown,
    bg: "bg-[#00AEEF]/[0.08]",
    accent: "#00AEEF",
    title: "Breaking Down Global Barriers: WSI's 67% Support Reduction Success",
    stat: "67% reduction in support tickets",
    description:
      "WSI, the world's largest digital agency franchise, deployed EZee Assist across their global network to handle repetitive franchisee inquiries at scale.",
  },
  {
    brand: "DekaLash",
    slug: "/case-studies/dekalash",
    tag: "Cutover success",
    tagIcon: Sparkles,
    bg: "bg-[#F9E8F0]",
    accent: "#C2185B",
    title: "430+ questions deflected, 93% AI resolution: Deka Lash's Technology Launch and Cutover Success",
    stat: "93% AI resolution rate",
    description:
      "DekaLash used EZee Assist to manage a major technology cutover across 400+ locations — keeping every franchisee informed and supported in real time.",
  },
  {
    brand: "DivaDance",
    slug: "/case-studies/divadance",
    tag: "Real-time support",
    tagIcon: Clock,
    bg: "bg-[#F0E8F9]",
    accent: "#7B1FA2",
    title: "How DivaDance transformed franchisee support with CoCo — 2,600+ queries answered instantly with AI in just the first 6 months, saving 650+ hours of support time.",
    stat: "2,600+ queries in 6 months",
    description:
      "DivaDance gave every franchisee instant access to brand knowledge through their existing channels — no new tools, no training required.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.12 },
  }),
};

export default function CaseStudiesContent() {
  const heroRef  = useRef(null);
  const heroInView  = useInView(heroRef,  { once: true });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden border-b border-[#E5E7EB]"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(0,174,239,0.06) 0%, transparent 60%)" }}
        />
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Case Studies
            </p>
            <h1
              className="text-5xl font-bold tracking-tight text-[#0A0A0A] sm:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              How leading brands{" "}
              <span className="text-[#00AEEF]">strengthen support</span>{" "}
              with EZee Assist
            </h1>
            <p className="mt-5 text-xl leading-8 text-gray-600">
              Stories, Playbooks, and Results
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards + Sidebar ──────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">

            {/* Case study cards */}
            <div ref={cardsRef} className="flex flex-col gap-6">
              {caseStudies.map(({ brand, slug, tag, tagIcon: TagIcon, bg, accent, title, stat, description }, i) => (
                <motion.div
                  key={brand}
                  custom={i}
                  initial="hidden"
                  animate={cardsInView ? "visible" : "hidden"}
                  variants={fadeUp}
                >
                  <Link
                    href={slug}
                    className="group flex flex-col sm:flex-row gap-0 rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)]"
                  >
                    {/* Brand panel */}
                    <div className={`${bg} flex flex-col items-center justify-center p-8 sm:w-52 flex-shrink-0`}>
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-white/60">
                        <span className="text-lg font-extrabold" style={{ color: accent }}>{brand[0]}</span>
                      </div>
                      <span className="mt-3 text-sm font-bold" style={{ color: accent }}>{brand}</span>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-between p-7 flex-1">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-gray-500 mb-4">
                          <TagIcon size={11} />{tag}
                        </span>
                        <h2
                          className="text-lg font-bold leading-snug text-[#0A0A0A] group-hover:text-[#00AEEF] transition-colors"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {title}
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#00AEEF]">{stat}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-[#00AEEF] transition-colors">
                          Read story <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
                className="sticky top-24 rounded-2xl border border-[#00AEEF]/30 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,174,239,0.08)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00AEEF]/10 mb-5">
                  <Sparkles size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-[#0A0A0A] leading-snug mb-3" style={{ letterSpacing: "-0.01em" }}>
                  Amplify your support operations with AI
                </h3>
                <p className="text-sm leading-6 text-gray-600 mb-6">
                  AI-native support and ticketing platform purpose-built for
                  multi-location systems. See what EZee Assist can do for your brand.
                </p>
                <Link href="/contact">
                  <Button size="md" className="w-full">Book a Demo</Button>
                </Link>
                <div className="mt-5 pt-5 border-t border-[#E5E7EB] space-y-2">
                  {["67% average support reduction", "93% AI resolution rate", "< 30s average response time"].map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00AEEF] flex-shrink-0" />
                      <span className="text-xs text-gray-600">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
