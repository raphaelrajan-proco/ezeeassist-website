"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import {
  INTEGRATION_CATEGORIES,
  groupedIntegrations,
  type IntegrationCategory,
} from "@/lib/data/integrations";

// TODO: Once SVG files land in /public/logos/integrations/, replace the initials tile with:
//   import Image from "next/image";
//   <Image src={integration.src} alt={integration.name} width={32} height={32} className="object-contain" />

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

// Category accent colours — matches brand palette
const categoryMeta: Record<IntegrationCategory, { color: string; bg: string }> = {
  "Knowledge Sources":     { color: "#00AEEF", bg: "rgba(0,174,239,0.08)" },
  "Communication Channels":{ color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  "File Storage":          { color: "#059669", bg: "rgba(5,150,105,0.08)" },
  "Collaboration Tools":   { color: "#D97706", bg: "rgba(217,119,6,0.08)" },
  "Learning & Training":   { color: "#DB2777", bg: "rgba(219,39,119,0.08)" },
  "CRM & Support":         { color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
  "Automation":            { color: "#DC2626", bg: "rgba(220,38,38,0.08)" },
  "Other":                 { color: "#6B7280", bg: "rgba(107,114,128,0.08)" },
};

function IntegrationCard({
  name,
  description,
  category,
  index,
}: {
  name: string;
  description: string;
  category: IntegrationCategory;
  index: number;
}) {
  const { color, bg } = categoryMeta[category];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      {...fadeUp(index * 0.04)}
      className="card-hover-blue flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_24px_rgba(0,0,0,0.4)]"
    >
      {/* Logo tile — replace with <Image> once SVG exists */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border"
        style={{ background: bg, borderColor: `${color}30` }}
      >
        <span className="text-xs font-bold" style={{ color }}>
          {initials}
        </span>
      </div>
      <div>
        <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-0.5">{name}</p>
        <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}

export default function IntegrationsContent() {
  const grouped = groupedIntegrations();
  // Only render categories that have items and are not "Other" placeholder group
  const visibleCategories = INTEGRATION_CATEGORIES.filter(
    (cat) => grouped[cat].length > 0 && cat !== "Other"
  );
  const otherItems = grouped["Other"];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-hero-gradient">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.10) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/solution" className="hover:text-[#00AEEF] transition-colors">Solution</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Integrations</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              250+ Integrations
            </p>
            <h1
              className="text-5xl font-extrabold leading-[1.05] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Connects to all your{" "}
              <span className="text-[#00AEEF]">data and systems.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl">
              EZee connects to your entire tech stack — no migration, no manual uploads.
              Your content and data stay where they live.
            </p>
            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-[#00AEEF]" style={{ letterSpacing: "-0.02em" }}>250+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">integrations</span>
              </div>
              <div className="w-px h-8 bg-[#E5E7EB] dark:bg-white/[0.08] self-center" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-[#00AEEF]" style={{ letterSpacing: "-0.02em" }}>8</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">categories</span>
              </div>
              <div className="w-px h-8 bg-[#E5E7EB] dark:bg-white/[0.08] self-center" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-[#00AEEF]" style={{ letterSpacing: "-0.02em" }}>0</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">migration required</span>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/solution">
                <Button size="lg" variant="secondary">
                  Explore the Solution
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Integrations by category ──────────────────────── */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">

          {visibleCategories.map((category, ci) => (
            <div key={category} className={ci > 0 ? "mt-16" : ""}>
              <motion.div className="mb-7" {...fadeUp(0)}>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: categoryMeta[category].bg,
                      color: categoryMeta[category].color,
                    }}
                  >
                    {category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {grouped[category].length} integration{grouped[category].length !== 1 ? "s" : ""}
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {grouped[category].map((integration, i) => (
                  <IntegrationCard
                    key={integration.name}
                    name={integration.name}
                    description={integration.description}
                    category={category}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* "More coming" row — shows placeholder entries if any exist */}
          {otherItems.length > 0 && (
            <div className="mt-16">
              <motion.div className="mb-7" {...fadeUp(0)}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                    More Coming Soon
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {otherItems.length} additional integration{otherItems.length !== 1 ? "s" : ""} in development
                  </span>
                </div>
              </motion.div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {otherItems.map((integration, i) => (
                  <IntegrationCard
                    key={integration.name}
                    name={integration.name}
                    description={integration.description}
                    category="Other"
                    index={i}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Don't see your tool ───────────────────────────── */}
      <section className="w-full bg-white dark:bg-[#0D0D0D] border-y border-[#E5E7EB] dark:border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3
                className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                Don&apos;t see your tool?
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg">
                We&apos;re adding new integrations regularly. If your team uses a tool
                that isn&apos;t listed, let us know — we&apos;ll prioritize it.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <Button variant="secondary">
                Request an Integration
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-final-cta-gradient">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              See how EZee Assist connects{" "}
              <span className="text-[#00AEEF]">to your stack.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Book a demo and we&apos;ll walk through exactly how we&apos;d connect to your
              existing tools and have you live in under a week.
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
