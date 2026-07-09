"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Shield, Lock, KeyRound, Server, EyeOff, Ban, Fingerprint, ScrollText,
  Cable, MessageSquare, Zap, Users, Eye, ShieldCheck,
  Search, MessageCircle, Hash, Mail, Globe, Smartphone, CheckCircle2,
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

/* ─── Part B: shared card + mockup primitives ──────────── */

/** Soft gradient wash that the white product mockups float on. */
function GradientFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-8 rounded-2xl p-5 md:p-7 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #17242F 0%, #101820 48%, #0B0E13 100%)",
        border: "1px solid #232A31",
      }}
    >
      {children}
    </div>
  );
}

/** Floating white product surface. Consistent chrome for all mockups. */
const MOCK_SURFACE: React.CSSProperties = {
  backgroundColor: "#FCFBF8",
  border: "1px solid rgba(10,10,10,0.06)",
  boxShadow: "0 18px 44px -14px rgba(0,0,0,0.55), 0 4px 12px -4px rgba(0,0,0,0.35)",
};
const MOCK_TEXT = "#1D1D1B";
const MOCK_MUTED = "#8A8578";
const MOCK_HAIRLINE = "rgba(10,10,10,0.07)";

function MockAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] flex-shrink-0"
      style={{ backgroundColor: color, color: "#FFFFFF", fontWeight: 600 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function ElementCard({
  id,
  overline,
  headline,
  body,
  linkHref,
  linkLabel,
  children,
}: {
  id: string;
  overline: string;
  headline: string;
  body: string;
  linkHref: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 rounded-3xl p-8 md:p-10 flex flex-col"
      style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
    >
      {/* Square marker + overline */}
      <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#00AEEF", fontWeight: 500 }}>
        <span aria-hidden="true" className="block h-2 w-2 flex-shrink-0" style={{ backgroundColor: "#00AEEF" }} />
        {overline}
      </p>
      <h3
        className="text-2xl md:text-3xl tracking-[-0.02em] mb-4"
        style={{
          color: "#F5EDE0",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 1.15,
        }}
      >
        {headline}
      </h3>
      <p className="text-base md:text-lg leading-relaxed" style={{ color: "#A89B86", fontWeight: 400 }}>
        {body}
      </p>
      <div className="flex-1">{children}</div>
      <Link
        href={linkHref}
        className="inline-block mt-6 text-sm transition-opacity hover:opacity-70 self-start"
        style={{
          color: "#F5EDE0",
          fontWeight: 500,
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          textDecorationThickness: "1px",
        }}
      >
        {linkLabel}
      </Link>
    </motion.div>
  );
}

/* ─── Card 1 visual: integrations picker ───────────────── */
// TODO: Replace with real product screen recording

const PICKER_ROWS = [
  { name: "Salesforce",   color: "#00A1E0", connected: true },
  { name: "HubSpot",      color: "#FF7A59", connected: false },
  { name: "Mindbody",     color: "#F9423A", connected: true, highlighted: true },
  { name: "ServiceTitan", color: "#F05A28", connected: false },
  { name: "QuickBooks",   color: "#2CA01C", connected: true },
  { name: "SharePoint",   color: "#036C70", connected: false },
  { name: "Slack",        color: "#611F69", connected: false },
  { name: "Toast",        color: "#FF4C00", connected: false },
];

function IntegrationsPickerVisual() {
  const reduceMotion = useReducedMotion();
  return (
    <GradientFrame>
      <div className="rounded-xl overflow-hidden mx-auto max-w-[360px]" style={MOCK_SURFACE}>
        {/* Search field */}
        <div className="px-3.5 pt-3.5 pb-2.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ backgroundColor: "rgba(10,10,10,0.045)" }}
          >
            <Search aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} style={{ color: MOCK_MUTED }} />
            <span className="text-[11px]" style={{ color: MOCK_MUTED }}>
              Search 250+ integrations
            </span>
          </div>
        </div>

        {/* List, gently auto-scrolling */}
        <div className="overflow-hidden" style={{ height: "218px" }}>
          <motion.div
            animate={reduceMotion ? {} : { y: [0, -54, 0] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          >
            {PICKER_ROWS.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between px-3.5 py-2"
                style={{
                  borderBottom: `1px solid ${MOCK_HAIRLINE}`,
                  backgroundColor: r.highlighted ? "rgba(0,174,239,0.07)" : "transparent",
                }}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] flex-shrink-0"
                    style={{ backgroundColor: r.color, color: "#FFFFFF", fontWeight: 600 }}
                  >
                    {r.name[0]}
                  </span>
                  <span className="text-[12px] truncate" style={{ color: MOCK_TEXT, fontWeight: 500 }}>
                    {r.name}
                  </span>
                </span>
                {r.connected && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] flex-shrink-0"
                    style={{ backgroundColor: "rgba(22,163,74,0.12)", color: "#15803D", fontWeight: 600 }}
                  >
                    Connected
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* +242 more */}
        <div className="px-3.5 py-2.5 text-center" style={{ borderTop: `1px solid ${MOCK_HAIRLINE}` }}>
          <span className="text-[11px]" style={{ color: "#00AEEF", fontWeight: 600 }}>
            +242 more
          </span>
        </div>
      </div>
    </GradientFrame>
  );
}

/* ─── Card 2 visual: one conversation, every surface ───── */
// TODO: Replace with real product screen recording

const CHANNEL_ICONS: LucideIcon[] = [
  MessageSquare, MessageCircle, Hash, Users, Mail, Globe, Smartphone,
];

function AgentSurfacesVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  // Re-run the message entrance every 9s
  useEffect(() => {
    if (!inView || reduceMotion) return;
    const t = setInterval(() => setCycle((c) => c + 1), 9000);
    return () => clearInterval(t);
  }, [inView, reduceMotion]);

  const show = reduceMotion || inView;

  return (
    <GradientFrame>
      <div ref={ref} className="relative mx-auto max-w-[360px]" style={{ minHeight: "270px" }}>
        {/* Slack-style frame, behind left */}
        <div
          className="absolute left-0 top-3 w-[200px] rounded-xl overflow-hidden"
          style={{ ...MOCK_SURFACE, opacity: 0.85, transform: "rotate(-3deg)" }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
            <Hash className="w-3 h-3" strokeWidth={2} style={{ color: "#611F69" }} />
            <span className="text-[10px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
              franchise-support
            </span>
          </div>
          <div className="px-3 py-2.5 flex items-start gap-2">
            <MockAvatar initials="EZ" color="#00AEEF" />
            <span className="text-[10px]" style={{ color: MOCK_MUTED, lineHeight: 1.4 }}>
              Here it is, with start date and terms.
            </span>
          </div>
        </div>

        {/* Teams-style frame, behind right */}
        <div
          className="absolute right-0 top-0 w-[190px] rounded-xl overflow-hidden"
          style={{ ...MOCK_SURFACE, opacity: 0.8, transform: "rotate(2.5deg)" }}
          aria-hidden="true"
        >
          <div className="h-1.5" style={{ backgroundColor: "#6264A7" }} />
          <div className="px-3 py-2.5 flex items-start gap-2">
            <MockAvatar initials="EZ" color="#00AEEF" />
            <span className="text-[10px]" style={{ color: MOCK_MUTED, lineHeight: 1.4 }}>
              Same answer, same agent, in Teams.
            </span>
          </div>
        </div>

        {/* Phone SMS frame, foreground */}
        <div
          className="relative mx-auto mt-10 w-[230px] rounded-2xl overflow-hidden"
          style={MOCK_SURFACE}
        >
          <div className="flex items-center justify-center py-2" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
            <span className="text-[10px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
              EZee Assist
            </span>
          </div>
          <div className="px-3 py-3 space-y-2" key={cycle}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-md px-3 py-2"
              style={{ backgroundColor: "#00AEEF" }}
            >
              <p className="text-[11px]" style={{ color: "#FFFFFF", lineHeight: 1.35 }}>
                Where&apos;s the new BOGO flyer?
              </p>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1.0 }}
              className="max-w-[90%] rounded-2xl rounded-bl-md px-3 py-2"
              style={{ backgroundColor: "rgba(10,10,10,0.05)" }}
            >
              <p className="text-[11px] mb-1.5" style={{ color: MOCK_TEXT, lineHeight: 1.35 }}>
                Here it is, with start date and terms.
              </p>
              <div className="flex flex-wrap gap-1">
                {["BOGO-FLYER.PDF", "TERMS.PDF"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-1.5 py-0.5 text-[8px]"
                    style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 600 }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Channel icon row */}
        <div className="relative mt-4 flex justify-center gap-2">
          {CHANNEL_ICONS.map((Icon, i) => (
            <span
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{
                backgroundColor: i === 0 ? "#00AEEF" : "rgba(245,237,224,0.06)",
                border: `1px solid ${i === 0 ? "#00AEEF" : "#2A2A2A"}`,
              }}
            >
              <Icon
                aria-hidden="true"
                className="w-3.5 h-3.5"
                strokeWidth={1.75}
                style={{ color: i === 0 ? "#FFFFFF" : "#A89B86" }}
              />
            </span>
          ))}
        </div>
      </div>
    </GradientFrame>
  );
}

/* ─── Card 3 visual: instruction resolving into steps ──── */
// TODO: Replace with real product screen recording

const AGENT_STEPS = ["Pull sales vs target", "Rank locations slipping", "Draft action plan"];

function InstructionToStepsVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setLit(AGENT_STEPS.length); // all steps + deploy button
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (lit < AGENT_STEPS.length) {
      timer = setTimeout(() => setLit((v) => v + 1), lit < 0 ? 600 : 550);
    } else {
      timer = setTimeout(() => setLit(-1), 3500);
    }
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, lit]);

  return (
    <GradientFrame>
      <div ref={ref} className="relative mx-auto max-w-[360px] pb-2">
        {/* Instruction card */}
        <div className="rounded-xl px-4 py-3.5 w-[88%]" style={MOCK_SURFACE}>
          <p className="text-[9px] uppercase tracking-[0.14em] mb-1.5" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
            Instructions to follow
          </p>
          <p
            className="text-[11px]"
            style={{ color: MOCK_TEXT, fontFamily: "var(--font-editorial)", fontStyle: "italic", lineHeight: 1.45 }}
          >
            &ldquo;Every Monday at 8am, pull each location&apos;s sales vs
            target, rank the ones slipping, and email each coach a short
            action plan.&rdquo;
          </p>
        </div>

        {/* Resolved steps panel, overlapping */}
        <div className="relative ml-auto -mt-4 w-[74%] rounded-xl px-3.5 py-3.5 space-y-2" style={MOCK_SURFACE}>
          {AGENT_STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={i <= lit - 1 || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
              style={{ border: `1px solid ${MOCK_HAIRLINE}`, backgroundColor: "rgba(10,10,10,0.02)" }}
            >
              <CheckCircle2 aria-hidden="true" className="w-3 h-3 flex-shrink-0" strokeWidth={2} style={{ color: "#00AEEF" }} />
              <span className="text-[10.5px]" style={{ color: MOCK_TEXT, fontWeight: 500 }}>
                {s}
              </span>
            </motion.div>
          ))}
          <motion.button
            type="button"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={lit >= AGENT_STEPS.length || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full rounded-lg py-1.5 text-[10.5px]"
            style={{ backgroundColor: "#00AEEF", color: "#FFFFFF", fontWeight: 600 }}
          >
            Deploy agent
          </motion.button>
        </div>

        <p className="mt-4 text-[11px]" style={{ color: "#A89B86", fontWeight: 500 }}>
          <span aria-hidden="true" style={{ color: "#16A34A" }}>● </span>
          Running · 214 locations
        </p>
      </div>
    </GradientFrame>
  );
}

/* ─── The section body ─────────────────────────────────── */

export default function SolutionBento() {
  return (
    <>
      <PlatformDiagram />

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        <ElementCard
          id="el-connections"
          overline="Connections"
          headline="Plugged into everything you already run on."
          body="250+ native integrations across drives, CRMs, POS, ERP, LMS, marketing, accounting, and comms. No migration. Your data stays where it lives and stays current."
          linkHref="#integrations"
          linkLabel="See all integrations ↓"
        >
          <IntegrationsPickerVisual />
        </ElementCard>

        <ElementCard
          id="el-agent"
          overline="The AI Agent"
          headline="One conversation, on every surface your teams work."
          body="The same brand-grounded AI agent in SMS, WhatsApp, Slack, Teams, Google Chat, email, web, and mobile. Franchisees and staff ask where they already are. No new app to learn."
          linkHref="#answers"
          linkLabel="See how Answers works ↓"
        >
          <AgentSurfacesVisual />
        </ElementCard>

        <ElementCard
          id="el-actions"
          overline="Actions & Agents"
          headline="AI that does the work, and workflows that run themselves."
          body="Ask EZee to take an action across your stack, or describe an agent that runs autonomously on a schedule or trigger. Weekly KPI reviews, review responses, lead follow-up, compliance sweeps."
          linkHref="#agents"
          linkLabel="See what agents run ↓"
        >
          <InstructionToStepsVisual />
        </ElementCard>

        {/* Cards 4-6 land in build step 3 */}
      </div>
    </>
  );
}
