"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare, MessageCircle, Hash, Users, MessagesSquare,
  Mail, Globe, Smartphone, Plus, type LucideIcon,
} from "lucide-react";

/**
 * Section 5 — The Connective Tissue (Integrations & Access).
 *
 * Left column: 250+ integrations proof + pill grid of tools and
 * knowledge assets (deck slide 2 treatment).
 * Right column: the 3×3 delivery-channel grid.
 */

/* ─── Integration pill grid ───────────────────────────── */

type ToolPill = { name: string; color: string };

const TOOLS: ToolPill[] = [
  { name: "Salesforce",       color: "#00A1E0" },
  { name: "HubSpot",          color: "#FF7A59" },
  { name: "Slack",            color: "#611F69" },
  { name: "Teams",            color: "#6264A7" },
  { name: "WhatsApp",         color: "#25D366" },
  { name: "QuickBooks",       color: "#2CA01C" },
  { name: "Xero",             color: "#13B5EA" },
  { name: "Mindbody",         color: "#F9423A" },
  { name: "ServiceTitan",     color: "#F05A28" },
  { name: "FranConnect",      color: "#0072CE" },
  { name: "SharePoint",       color: "#036C70" },
  { name: "Google Drive",     color: "#FBBC04" },
  { name: "Dropbox",          color: "#0061FF" },
  { name: "YouTube",          color: "#FF0000" },
  { name: "Mailchimp",        color: "#F2C94C" },
  { name: "Canva",            color: "#8B3DFF" },
  { name: "Square",           color: "#4A4A4A" },
  { name: "Toast",            color: "#FF4C00" },
  { name: "Trainual",         color: "#7A3BFF" },
  { name: "Docebo",           color: "#0AB4FF" },
  { name: "Zoom",             color: "#2D8CFF" },
  { name: "NetSuite",         color: "#125580" },
  { name: "Stripe",           color: "#635BFF" },
  { name: "Constant Contact", color: "#1856ED" },
];

const KNOWLEDGE_ASSETS = [
  "Operating Manual",
  "Brand SOPs",
  "Training videos",
  "Compliance rules",
];

/**
 * Pill-grid integrations visual (deck slide 2 treatment): rows of rounded
 * pills, each with a small colored dot standing in for the tool logo until
 * real 20×20 SVGs land, followed by muted knowledge-asset pills and one
 * highlighted "+ 225 more" pill.
 */
function IntegrationPillGrid() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {TOOLS.map((t, i) => (
        <motion.span
          key={t.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.025 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--ed-card)",
            border: "1px solid var(--ed-rule)",
            color: "var(--ed-fg)",
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.005em",
          }}
        >
          <span
            aria-hidden="true"
            className="block h-[10px] w-[10px] rounded-full flex-shrink-0"
            style={{ backgroundColor: t.color }}
          />
          {t.name}
        </motion.span>
      ))}

      {KNOWLEDGE_ASSETS.map((a, i) => (
        <motion.span
          key={a}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
            delay: TOOLS.length * 0.025 + i * 0.025,
          }}
          className="inline-flex items-center rounded-full px-4 py-2 text-sm transition-transform duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--ed-bg-alt)",
            border: "1px solid var(--ed-rule)",
            color: "var(--ed-fg-muted)",
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
          }}
        >
          {a}
        </motion.span>
      ))}

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: (TOOLS.length + KNOWLEDGE_ASSETS.length) * 0.025,
        }}
        className="inline-flex items-center rounded-full px-4 py-2 text-sm transition-transform duration-200 hover:-translate-y-0.5"
        style={{
          backgroundColor: "rgba(0,174,239,0.10)",
          border: "1px solid rgba(0,174,239,0.30)",
          color: "var(--ed-accent)",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
        }}
      >
        + 225 more
      </motion.span>
    </div>
  );
}

/* ─── Channel grid ─────────────────────────────────────── */

const CHANNELS: {
  label: string;
  icon: LucideIcon;
  extensible?: boolean;
}[] = [
  { label: "SMS",           icon: MessageSquare },
  { label: "WhatsApp",      icon: MessageCircle },
  { label: "Slack",         icon: Hash },
  { label: "Teams",         icon: Users },
  { label: "Google Chat",   icon: MessagesSquare },
  { label: "Email",         icon: Mail },
  { label: "Web Portal",    icon: Globe },
  { label: "Mobile App",    icon: Smartphone },
  { label: "Anywhere else", icon: Plus, extensible: true },
];

/* ─── Section ──────────────────────────────────────────── */

export default function ConnectiveTissueSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section id="integrations" className="w-full ed-bg-alt scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p className="ed-overline mb-8">The Connective Tissue</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Wired into <span className="ed-accent">the stack</span> you
            already run on.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — integrations */}
          <div>
            <p
              className="ed-fg text-4xl md:text-5xl mb-6"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="ed-accent">250+</span> native integrations
            </p>
            <div className="flex flex-wrap gap-2.5 mb-12">
              {["No data migration", "Always up to date", "Guardrailed to your brand"].map(
                (p) => (
                  <span key={p} className="ed-channel-pill">
                    {p}
                  </span>
                )
              )}
            </div>
            <IntegrationPillGrid />
          </div>

          {/* Right — channels */}
          <div>
            <p
              className="mb-3 text-xs"
              style={{
                color: "var(--ed-accent)",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Every Channel
            </p>
            <p
              className="ed-fg text-2xl md:text-3xl mb-8 max-w-md"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Deployed in the channels your teams already work in
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CHANNELS.map(({ label, icon: Icon, extensible }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3.5"
                  style={{
                    backgroundColor: extensible
                      ? "rgba(0,174,239,0.08)"
                      : "var(--ed-card)",
                    border: extensible
                      ? "1px solid rgba(0,174,239,0.25)"
                      : "1px solid var(--ed-rule)",
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
                      color: extensible ? "var(--ed-accent)" : "var(--ed-fg)",
                      fontWeight: 500,
                      fontFamily: "var(--font-editorial)",
                    }}
                  >
                    {extensible ? `+ ${label}` : label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p
              className="ed-fg-muted mt-8 text-base md:text-lg max-w-md"
              style={{ lineHeight: 1.5 }}
            >
              Embedded in your tools and workflows. One platform, every
              surface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
