"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Shield, Lock, KeyRound, Server, EyeOff, Ban, Fingerprint, ScrollText,
  Cable, MessageSquare, Zap, Users, Eye, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * The Solution section body: a full-width platform diagram (hub with
 * six element nodes and a stat strip) followed by a six-card bento,
 * each card holding a crafted product-style visual inside a soft
 * gradient frame. Lives inside the always-dark Pivot section.
 */

/* ─── Security badges (shared with the Governance strip) ── */

export const SECURITY_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Shield,      label: "SOC 2 Type II aligned" },
  { icon: Lock,        label: "TLS 1.2/1.3 in transit" },
  { icon: KeyRound,    label: "AES 256-bit at rest" },
  { icon: Server,      label: "Dedicated AWS per customer" },
  { icon: EyeOff,      label: "PII redaction" },
  { icon: Ban,         label: "No third-party model training" },
  { icon: Fingerprint, label: "SSO + SAML" },
  { icon: ScrollText,  label: "Full audit trail" },
];

export function SecurityBadge({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs"
      style={{
        backgroundColor: "rgba(245,237,224,0.04)",
        border: "1px solid #2A2A2A",
        color: "#F5EDE0",
        fontWeight: 500,
      }}
    >
      <Icon aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
      {label}
    </span>
  );
}

/* ─── Part A: the platform diagram ─────────────────────── */
// TODO: Replace with real product screen recording

type PlatformElement = {
  icon: LucideIcon;
  name: string;
  descriptor: string;
  href: string;
};

const LEFT_ELEMENTS: PlatformElement[] = [
  { icon: Cable,         name: "Connections",      descriptor: "250+ integrations",             href: "#el-connections" },
  { icon: MessageSquare, name: "AI Agent",         descriptor: "Omni-channel, one conversation", href: "#el-agent" },
  { icon: Zap,           name: "Actions & Agents", descriptor: "Autonomous, on triggers",        href: "#el-actions" },
];

const RIGHT_ELEMENTS: PlatformElement[] = [
  { icon: Users,       name: "Access",     descriptor: "Every role scoped",              href: "#el-access" },
  { icon: Eye,         name: "Visibility", descriptor: "Observable, human in the loop",  href: "#el-visibility" },
  { icon: ShieldCheck, name: "Security",   descriptor: "Secure by default",              href: "#el-security" },
];

const DIAGRAM_STATS = [
  { value: "250+",   label: "Integrations" },
  { value: "8",      label: "Channels covered" },
  { value: "4,500+", label: "Locations live" },
  { value: "1",      label: "Platform for all of it" },
];

function ElementNode({ el }: { el: PlatformElement }) {
  const Icon = el.icon;
  return (
    <Link
      href={el.href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-[#1A1A1A]"
      style={{
        backgroundColor: "#141414",
        border: "1px solid #2A2A2A",
      }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
        style={{ backgroundColor: "rgba(0,174,239,0.10)" }}
      >
        <Icon aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm truncate" style={{ color: "#F5EDE0", fontWeight: 500 }}>
          {el.name}
        </span>
        <span className="block text-[11px] truncate" style={{ color: "#A89B86" }}>
          {el.descriptor}
        </span>
      </span>
    </Link>
  );
}

function HubNode() {
  return (
    <div
      className="ed-cta-pulse rounded-2xl px-6 py-5 text-center"
      style={{
        backgroundColor: "#0A0A0A",
        border: "1px solid rgba(0,174,239,0.55)",
        boxShadow: "0 0 0 6px rgba(0,174,239,0.08)",
      }}
    >
      <p
        className="text-[9px] uppercase tracking-[0.2em] mb-1"
        style={{ color: "#00AEEF", fontWeight: 600 }}
      >
        The Platform
      </p>
      <p
        className="text-lg whitespace-nowrap"
        style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", fontWeight: 500 }}
      >
        EZee Assist
      </p>
    </div>
  );
}

/**
 * Connector column between an element stack and the hub. Lines span
 * only the gap, so they terminate exactly at the card edges and the
 * hub edge by construction. `direction` flips the curve.
 */
function ConnectorLines({
  visible,
  direction,
  pulse,
}: {
  visible: boolean;
  direction: "toHub" | "fromHub";
  pulse?: boolean;
}) {
  const ys = [16, 50, 84];
  return (
    <svg
      viewBox="0 0 48 100"
      preserveAspectRatio="none"
      className="h-full w-10 lg:w-14 flex-shrink-0"
      aria-hidden="true"
    >
      {ys.map((y, i) => {
        const d =
          direction === "toHub"
            ? `M 0 ${y} C 24 ${y}, 28 50, 48 50`
            : `M 0 50 C 20 50, 24 ${y}, 48 ${y}`;
        return (
          <g key={y}>
            <motion.path
              d={d}
              fill="none"
              stroke="rgba(0,174,239,0.35)"
              strokeWidth="1.3"
              strokeDasharray="3 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 + i * 0.15 }}
            />
            {/* Endpoint dots */}
            <motion.circle
              cx={direction === "toHub" ? 0 : 0}
              cy={direction === "toHub" ? y : 50}
              r="1.6"
              fill="rgba(0,174,239,0.55)"
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.15 }}
            />
            <motion.circle
              cx={48}
              cy={direction === "toHub" ? 50 : y}
              r="1.6"
              fill="rgba(0,174,239,0.55)"
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.15 }}
            />
            {/* Slow data pulse toward the hub on the middle line */}
            {pulse && i === 1 && visible && (
              <circle r="1.8" fill="#00AEEF" opacity="0.8">
                <animateMotion dur="5s" repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function PlatformDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const show = reduceMotion ? true : inView;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 rounded-3xl p-8 md:p-10"
      style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
    >
      <p className="sr-only">
        Diagram: the EZee Assist platform hub connected to its six
        elements: Connections, AI Agent, Actions and Agents, Access,
        Visibility, and Security.
      </p>

      {/* ── Desktop diagram ── */}
      <div className="hidden lg:flex items-stretch">
        <div className="flex flex-col justify-between gap-4 w-[280px] flex-shrink-0">
          {LEFT_ELEMENTS.map((el) => (
            <ElementNode key={el.name} el={el} />
          ))}
        </div>

        <ConnectorLines visible={show} direction="toHub" pulse={!reduceMotion} />

        <div className="flex items-center flex-1 justify-center">
          <HubNode />
        </div>

        <ConnectorLines visible={show} direction="fromHub" pulse={!reduceMotion} />

        <div className="flex flex-col justify-between gap-4 w-[280px] flex-shrink-0">
          {RIGHT_ELEMENTS.map((el) => (
            <ElementNode key={el.name} el={el} />
          ))}
        </div>
      </div>

      {/* ── Mobile: hub on top, 2-col node grid, no lines ── */}
      <div className="lg:hidden">
        <div className="flex justify-center mb-5">
          <HubNode />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...LEFT_ELEMENTS, ...RIGHT_ELEMENTS].map((el) => (
            <ElementNode key={el.name} el={el} />
          ))}
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div
        className="mt-10 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6"
        style={{ borderTop: "1px solid #2A2A2A" }}
      >
        {DIAGRAM_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="text-center"
          >
            <p
              className="text-4xl md:text-5xl tracking-[-0.03em]"
              style={{
                color: "#00AEEF",
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {s.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em]" style={{ color: "#A89B86", fontWeight: 500 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── The section body ─────────────────────────────────── */

export default function SolutionBento() {
  return (
    <>
      <PlatformDiagram />
      {/* Part B element cards land in build steps 2 and 3 */}
    </>
  );
}
