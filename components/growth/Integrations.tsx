"use client";

import { motion } from "framer-motion";
import {
  MessageSquare, MessageCircle, Hash, Users, MessagesSquare,
  Mail, Globe, Smartphone, Plus, type LucideIcon,
} from "lucide-react";
import { integrations } from "@/lib/data/integrations";
import { Overline, SectionHeadline, SectionShell, TOOL_COLORS } from "./shared";

/**
 * Section 13: integrations and channels, two columns. Left is the
 * dense identity-dotted pill cloud, franchise-native systems first.
 * Right restores the canonical 3x3 channel grid.
 */

/* ── Left: pill cloud ──────────────────────────────────── */

/** Franchise-native systems render before everything else. */
const NATIVE_FIRST = [
  "FranConnect", "Naranga", "ClientTether", "ServiceTitan",
  "Mindbody", "Zenoti", "Thryv", "Toast",
];

const FALLBACK_DOTS = ["#0072CE", "#7A3BFF", "#188038", "#D97706", "#DB2777", "#0AB4FF", "#F05A28", "#611F69"];

function dotColor(name: string, i: number): string {
  if (TOOL_COLORS[name]) return TOOL_COLORS[name];
  const key = Object.keys(TOOL_COLORS).find(k => name.includes(k));
  if (key) return TOOL_COLORS[key];
  return FALLBACK_DOTS[i % FALLBACK_DOTS.length];
}

function buildPillList(): string[] {
  const seen = new Set<string>(NATIVE_FIRST);
  const rest: string[] = [];
  for (const it of integrations) {
    if (!seen.has(it.name)) {
      seen.add(it.name);
      rest.push(it.name);
    }
  }
  return [...NATIVE_FIRST, ...rest];
}

function PillCloud() {
  const names = buildPillList();
  return (
    <div className="flex flex-wrap gap-2">
      {names.map((name, i) => (
        <motion.span
          key={name}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(i * 0.02, 0.6) }}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px]"
          style={{
            backgroundColor: "var(--ed-card)",
            border: "1px solid var(--ed-rule)",
            color: "var(--ed-fg)",
            fontWeight: 500,
          }}
        >
          <span
            aria-hidden="true"
            className="block h-[8px] w-[8px] rounded-full flex-shrink-0"
            style={{ backgroundColor: dotColor(name, i) }}
          />
          {name}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.65 }}
        className="inline-flex items-center rounded-full px-3 py-1.5 text-[13px]"
        style={{
          backgroundColor: "rgba(0,174,239,0.08)",
          border: "1px solid rgba(0,174,239,0.30)",
          color: "#0077A8",
          fontWeight: 600,
        }}
      >
        + 220 more
      </motion.span>
    </div>
  );
}

/* ── Right: channel grid ───────────────────────────────── */

const CHANNELS: { label: string; icon: LucideIcon; extensible?: boolean }[] = [
  { label: "SMS",           icon: MessageSquare },
  { label: "WhatsApp",      icon: MessageCircle },
  { label: "Slack",         icon: Hash },
  { label: "Teams",         icon: Users },
  { label: "Google Chat",   icon: MessagesSquare },
  { label: "Email",         icon: Mail },
  { label: "Web Portal",    icon: Globe },
  { label: "Mobile App",    icon: Smartphone },
  { label: "+ anywhere else", icon: Plus, extensible: true },
];

function ChannelGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CHANNELS.map(({ label, icon: Icon, extensible }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
          className="flex items-center gap-2.5 rounded-xl px-4 py-3.5"
          style={{
            backgroundColor: extensible ? "transparent" : "var(--ed-card)",
            border: extensible ? "1.5px solid rgba(0,174,239,0.55)" : "1px solid var(--ed-rule)",
            boxShadow: extensible ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.07)",
          }}
        >
          <Icon
            aria-hidden="true"
            className="w-5 h-5 flex-shrink-0"
            strokeWidth={1.75}
            style={{ color: "#00AEEF" }}
          />
          <span
            className="text-sm"
            style={{
              color: extensible ? "var(--ed-accent-text)" : "var(--ed-fg)",
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function Integrations() {
  return (
    <SectionShell alt id="integrations">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>Integrations</Overline>
        <SectionHeadline>It connects to what you already run.</SectionHeadline>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
        {/* Left: integrations */}
        <div>
          <p
            className="ed-fg text-3xl md:text-4xl tracking-[-0.03em] mb-5"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
          >
            <span style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>250+</span>{" "}
            native integrations
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["No data migration", "Always up to date", "Guardrailed to your brand"].map((q) => (
              <span
                key={q}
                className="rounded-full px-3 py-1.5 text-[12.5px]"
                style={{
                  backgroundColor: "var(--ed-card-alt)",
                  border: "1px solid var(--ed-rule)",
                  color: "var(--ed-fg-muted)",
                  fontWeight: 600,
                }}
              >
                {q}
              </span>
            ))}
          </div>
          <PillCloud />
          <p className="ed-fg-muted mt-8 text-sm">
            Plus content in any format, wherever it already lives.
          </p>
        </div>

        {/* Right: channels */}
        <div>
          <p
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}
          >
            Every channel
          </p>
          <p
            className="ed-fg text-2xl md:text-3xl tracking-[-0.02em] mb-8 max-w-md"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.15 }}
          >
            Deployed in the channels your teams already work in
          </p>
          <ChannelGrid />
          <p className="ed-fg-muted mt-8 text-sm md:text-base max-w-md leading-relaxed">
            Embedded in your tools and workflows. One platform, every surface.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
