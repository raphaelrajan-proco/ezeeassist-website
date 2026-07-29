"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, ScrollText, Users, Boxes, Server, BadgeCheck, type LucideIcon,
} from "lucide-react";

/**
 * Section 09: the control plane. Dark regardless of theme, and the
 * densest block on the page. Governance presented as a reason to buy.
 */

// TODO: Confirm exact certification status before publish. List only what is formally current, and state what is in progress.
const ITEMS: { icon: LucideIcon; name: string; body: string }[] = [
  {
    icon: Shield,
    name: "One policy set",
    body: "Define what runs without a human and what waits for approval. Set it once at HQ, applied at every location.",
  },
  {
    icon: ScrollText,
    name: "One activity log",
    body: "Questions asked, actions taken, workflows run, apps deployed. Shadow AI becomes visible AI.",
  },
  {
    icon: Users,
    name: "One permission model",
    body: "Granular by capability. This role builds workflows, that role only runs them. Scoped by location and by region.",
  },
  {
    icon: Boxes,
    name: "Any model, no lock-in",
    body: "Model-agnostic by design. Swap the underlying model without rebuilding your workflows.",
  },
  {
    icon: Server,
    name: "Data boundaries",
    body: "Dedicated infrastructure per customer. Encrypted in transit and at rest. Never used to train a third-party model.",
  },
  // TODO: blocking before publish. Supply real security posture, either
  // "SOC 2 Type II audit in progress, report expected [date]" or an honest
  // alternative, plus the pentest firm if we name one.
  {
    icon: BadgeCheck,
    name: "Security posture",
    body: "SSO and SAML. Encrypted in transit and at rest.",
  },
];

export default function ControlPlane() {
  return (
    <section id="control-plane" className="relative w-full overflow-hidden scroll-mt-24" style={{ backgroundColor: "#0A0A0A" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(245,237,224,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "#00AEEF", fontWeight: 500 }}>
            Control
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", fontWeight: 500 }}
          >
            Ungoverned AI is brand risk. This is the layer that removes it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map(({ icon: Icon, name, body }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.1 }}
              className="rounded-2xl p-7"
              style={{ backgroundColor: "#141414", border: "1px solid #2A2A2A" }}
            >
              <Icon aria-hidden="true" className="w-7 h-7 mb-5" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
              <h3
                className="text-lg md:text-xl tracking-[-0.02em] mb-2.5"
                style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", fontWeight: 500 }}
              >
                {name}
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#A89B86" }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Activity-log ticker: the artifact behind "One activity log" */}
        {/* TODO: Replace with real product screen recording */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-10 rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#141414",
            border: "1px solid #2A2A2A",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid #2A2A2A" }}>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#A89B86", fontWeight: 600 }}>
              Activity log
            </span>
            <span className="text-[11px]" style={{ color: "#15803D", fontWeight: 600 }}>● Live</span>
          </div>
          {[
            { t: "09:41", body: "Store #214 · answer served · cited SUMMER-PROMO-GUIDE.PDF", hl: true },
            { t: "09:42", body: "workflow run · nightly compliance sweep", hl: false },
            { t: "09:44", body: "app deployed · closing audit · 214 locations", hl: false },
          ].map((row) => (
            <motion.div
              key={row.t}
              initial={false}
              whileInView={
                row.hl
                  ? { backgroundColor: ["rgba(0,174,239,0)", "rgba(0,174,239,0.12)", "rgba(0,174,239,0)"] }
                  : {}
              }
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.6, times: [0, 0.35, 1], delay: 0.5 }}
              className="flex items-baseline gap-3 px-4 py-2"
              style={{ borderBottom: "1px solid #1D1D1D" }}
            >
              <span className="text-[12px] font-mono flex-shrink-0" style={{ color: "#A89B86" }}>
                {row.t}
              </span>
              <span className="text-[13px] font-mono truncate" style={{ color: "#F5EDE0" }}>
                {row.body}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10"
        >
          <Link
            href="/security"
            className="text-sm"
            style={{
              color: "#F5EDE0",
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationThickness: "1px",
            }}
          >
            See the full trust page
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
