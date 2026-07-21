"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Zap, RefreshCw, MessageSquareReply,
  type LucideIcon,
} from "lucide-react";
import { MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE } from "./shared";

/**
 * Growth hero: playbooks to AI team, with a live command center as the
 * hero artifact. It shows insights (wins and flags), actions taken
 * autonomously, and automations run, not just a passive brief. Fits
 * with its visual in one viewport at 1440x900.
 */

/* ── Command center card ───────────────────────────────── */
// TODO: Replace with real product screen recording

type Tone = "win" | "flag" | "action" | "auto";

const TONE: Record<Tone, { color: string; tint: string; icon: LucideIcon; tag: string }> = {
  win:    { color: "#15803D", tint: "rgba(22,163,74,0.10)",  icon: TrendingUp,        tag: "Win" },
  flag:   { color: "#B45309", tint: "rgba(217,119,6,0.10)",  icon: TrendingDown,      tag: "Flag" },
  action: { color: "#0077A8", tint: "rgba(0,174,239,0.10)",  icon: Zap,               tag: "Action" },
  auto:   { color: "#5B21B6", tint: "rgba(124,58,237,0.10)", icon: RefreshCw,         tag: "Automation" },
};

const RIBBON = [
  { value: "127", label: "answers" },
  { value: "18",  label: "actions" },
  { value: "6",   label: "workflows" },
  { value: "3",   label: "flags" },
];

const FEED: { tone: Tone; title: string; outcome: string }[] = [
  {
    tone: "flag",
    title: "Store #214 · Conversion down 12% vs target",
    outcome: "Coaching brief drafted, ready for your 9am call",
  },
  {
    tone: "win",
    title: "Store #052 · Retention up 9%, best in territory",
    outcome: "What worked packaged and shared to 6 lagging locations",
  },
  {
    tone: "action",
    title: "New lead from Google · Store #118",
    outcome: "Added to ServiceTitan, tagged, routed to sales. Done",
  },
  {
    tone: "auto",
    title: "Nightly compliance sweep",
    outcome: "42 of 42 locations checked, 1 certificate flagged",
  },
  {
    tone: "win",
    title: "Store #087 · 12 new reviews answered",
    outcome: "Brand-approved responses sent, 2 held for a human",
  },
];

function CommandCenter() {
  return (
    <div className="rounded-2xl overflow-hidden w-full max-w-[440px] mx-auto" style={MOCK_SURFACE}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}
      >
        <span className="flex items-center gap-2 text-[12px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          <span aria-hidden="true" className="block h-2 w-2 rounded-full" style={{ backgroundColor: "#00AEEF" }} />
          Command center · West territory · 42 locations
        </span>
        <span className="text-[10px]" style={{ color: MOCK_MUTED, fontWeight: 500 }}>
          Today
        </span>
      </div>

      {/* Summary ribbon */}
      <div
        className="grid grid-cols-4 divide-x px-1"
        style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}`, borderColor: MOCK_HAIRLINE }}
      >
        {RIBBON.map((r) => (
          <div key={r.label} className="py-2.5 text-center" style={{ borderColor: MOCK_HAIRLINE }}>
            <p className="text-[15px]" style={{ color: MOCK_TEXT, fontFamily: "var(--font-editorial)", fontWeight: 600, lineHeight: 1 }}>
              {r.value}
            </p>
            <p className="text-[8.5px] uppercase tracking-[0.1em] mt-1" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
              {r.label}
            </p>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div>
        {FEED.map((item, i) => {
          const t = TONE[item.tone];
          const Icon = t.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.15 }}
              className="flex items-start gap-2.5 px-4 py-2.5"
              style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                style={{ backgroundColor: t.tint }}
              >
                <Icon aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} style={{ color: t.color }} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span
                    className="text-[8px] uppercase tracking-[0.08em] rounded px-1 py-0.5 flex-shrink-0"
                    style={{ backgroundColor: t.tint, color: t.color, fontWeight: 700 }}
                  >
                    {t.tag}
                  </span>
                  <span className="text-[11px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
                    {item.title}
                  </span>
                </span>
                <span className="block text-[10.5px] mt-0.5 leading-snug" style={{ color: MOCK_MUTED }}>
                  {item.outcome}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 px-4 py-2.5">
        <MessageSquareReply aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} style={{ color: "#00AEEF" }} />
        <span className="text-[10px]" style={{ color: MOCK_MUTED, fontWeight: 500 }}>
          EZee worked 42 locations overnight. Ready for your call at 9am.
        </span>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */

export default function GrowthHero() {
  return (
    <section className="relative w-full ed-bg overflow-hidden">
      <div
        className="ed-hero-blob"
        style={{ width: "700px", height: "700px", top: "-140px", left: "-160px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.2em] mb-6"
              style={{ color: "#00AEEF", fontWeight: 500 }}
            >
              For Franchise and Multi-Location Brands
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
            >
              <span className="ed-fg">Turn your franchise playbooks into</span>{" "}
              <span style={{ color: "#00AEEF" }}>
                an AI team that drives franchisee growth
              </span>
              <span className="ed-fg">
                , while scaling coaching and support, without adding
                headcount.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
              className="ed-fg-muted mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
            >
              EZee connects your knowledge, performance data, and systems so
              coaches guide better, high-impact work runs itself, and revenue
              improves at every location.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.2 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="ed-btn ed-btn-blue ed-cta-pulse">
                Book a Demo
              </Link>
              <Link href="#ai-team" className="ed-btn ed-btn-secondary">
                See how it works
              </Link>
            </motion.div>
          </div>

          {/* Command center */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="lg:col-span-6"
          >
            <CommandCenter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
