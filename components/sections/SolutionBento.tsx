"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, Lock, KeyRound, Server, EyeOff, Ban, Fingerprint, ScrollText,
  type LucideIcon,
} from "lucide-react";

/**
 * The Solution bento grid: six cells mapping the platform. Each cell is
 * an overview that scroll-links to its deep-dive section further down
 * the homepage. Lives inside the always-dark Pivot section, so cells
 * use the dark treatment (#141414, hairline border).
 *
 * Layout: Cell 1 full width, Cells 2-3 half width, Cells 4-6 thirds.
 * Mobile: all six stack vertically.
 */

/* ─── Shared cell primitives ───────────────────────────── */

const CELL_STYLE: React.CSSProperties = {
  backgroundColor: "#141414",
  border: "1px solid #2A2A2A",
};

function CellOverline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.2em] mb-4"
      style={{ color: "#00AEEF", fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

function CellHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-2xl md:text-3xl tracking-[-0.02em] mb-4"
      style={{
        color: "#F5EDE0",
        fontFamily: "var(--font-editorial)",
        fontWeight: 500,
        lineHeight: 1.15,
      }}
    >
      {children}
    </h3>
  );
}

function CellBody({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base md:text-lg leading-relaxed"
      style={{ color: "#A89B86", fontWeight: 400 }}
    >
      {children}
    </p>
  );
}

function CellLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block mt-6 text-sm transition-opacity hover:opacity-70"
      style={{
        color: "#F5EDE0",
        fontWeight: 500,
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
      }}
    >
      {children}
    </Link>
  );
}

function Cell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl p-8 md:p-10 transition-colors duration-300 hover:bg-[#181818] ${className}`}
      style={CELL_STYLE}
    >
      {children}
    </motion.div>
  );
}

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

/* ─── Cell 1: The Core ─────────────────────────────────── */

const CORE_STATS = [
  "70%+ resolved by AI",
  "Under 30s average response",
  "100% of questions captured",
];

function CoreCell() {
  return (
    <Cell className="col-span-1 lg:col-span-6">
      <CellOverline>The Core</CellOverline>
      <CellHeadline>
        The AI support agent{" "}
        <span style={{ color: "#00AEEF" }}>is your ticketing system.</span>
      </CellHeadline>
      <div className="max-w-3xl">
        <CellBody>
          Not a chatbot bolted onto a helpdesk. Every question from every
          location lands in one queue. The AI resolves what it can,
          grounded in your brand&apos;s knowledge and citing its sources.
          What it cannot resolve becomes a ticket carrying the full
          conversation, the attempted answer, and the documents it
          checked. Routed to the right person, first time.
        </CellBody>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        {CORE_STATS.map((s, i) => (
          <span key={s} className="flex items-center gap-6">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden sm:block h-4 w-px"
                style={{ backgroundColor: "#2A2A2A" }}
              />
            )}
            <span className="text-sm" style={{ color: "#F5EDE0", fontWeight: 500 }}>
              {s}
            </span>
          </span>
        ))}
      </div>

      {/* Visual lands in build step 2 */}
    </Cell>
  );
}

/* ─── Cell 2: Connected ────────────────────────────────── */

function ConnectedCell() {
  return (
    <Cell className="col-span-1 lg:col-span-3">
      <CellOverline>Connected</CellOverline>
      <CellHeadline>Wired into the systems you already run on.</CellHeadline>
      <CellBody>
        250+ native integrations across drives, CRMs, POS, ERP, LMS,
        marketing, accounting, and comms. No data migration. Your content
        stays where it lives and stays current.
      </CellBody>
      {/* Visual lands in build step 3 */}
      <CellLink href="#integrations">See all integrations ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 3: Autonomous ───────────────────────────────── */

function AutonomousCell() {
  return (
    <Cell className="col-span-1 lg:col-span-3">
      <CellOverline>Autonomous</CellOverline>
      <CellHeadline>Agents that take action across your stack.</CellHeadline>
      <CellBody>
        Describe a workflow in plain language. EZee runs it on a schedule
        or a trigger, across the tools your network already uses. Weekly
        KPI reviews. Review responses. Lead follow-up. Compliance sweeps.
      </CellBody>
      {/* Visual lands in build step 3 */}
      <CellLink href="#agents">See what agents run ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 4: Access ───────────────────────────────────── */

function AccessCell() {
  return (
    <Cell className="col-span-1 lg:col-span-2">
      <CellOverline>Access</CellOverline>
      <CellHeadline>HQ, coaches, franchisees, staff. One platform, four views.</CellHeadline>
      <CellBody>
        Access is scoped by role and by location. Franchisors see the
        whole network. Coaches work their territory. Franchisees manage
        their locations. Staff access what their job requires. Configure
        once, apply across the network.
      </CellBody>
      {/* Visual lands in build step 4 */}
      <CellLink href="#governance">See governance ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 5: Visibility ───────────────────────────────── */

function VisibilityCell() {
  return (
    <Cell className="col-span-1 lg:col-span-2">
      <CellOverline>Visibility</CellOverline>
      <CellHeadline>See what the AI did, when, and why.</CellHeadline>
      <CellBody>
        Answers given, actions taken, agents triggered, apps deployed.
        All in one admin log with sources, timestamps, and outcomes. Your
        CISO asks what is running. You answer in a minute.
      </CellBody>
      {/* Visual lands in build step 4 */}
      <CellLink href="#governance">See governance ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 6: Secure ───────────────────────────────────── */

function SecureCell() {
  return (
    <Cell className="col-span-1 lg:col-span-2">
      <CellOverline>Secure</CellOverline>
      <CellHeadline>Security built into the foundation.</CellHeadline>
      <CellBody>
        Dedicated AWS infrastructure for each customer. TLS 1.2/1.3 in
        transit, AES 256-bit at rest. PII redaction before indexing. Your
        data never trains a third-party model.
      </CellBody>
      {/* Visual lands in build step 4 */}
      <CellLink href="/security">See security →</CellLink>
    </Cell>
  );
}

/* ─── The grid ─────────────────────────────────────────── */

export default function SolutionBento() {
  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-5">
      <CoreCell />
      <ConnectedCell />
      <AutonomousCell />
      <AccessCell />
      <VisibilityCell />
      <SecureCell />
    </div>
  );
}
