"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, FileText, Zap } from "lucide-react";
import {
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";

/**
 * The two artifact panels. The opening is a market observation, never a
 * diagnosis of the reader. The resolution contrasts real scattered
 * artifacts against the same artifacts snapped into one layer.
 */
// TODO: Replace with real product screen recording

/* ── Artifact tiles (shared by both panels) ────────────── */

function ConsumerChatTile({ ezee = false }: { ezee?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden w-[240px]" style={MOCK_SURFACE}>
      <div className="flex items-center justify-between px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span className="flex items-center gap-1.5">
          <Sparkles aria-hidden="true" className="w-3 h-3" strokeWidth={2} style={{ color: ezee ? "#00AEEF" : "#10A37F" }} />
          <span className="text-[10px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
            {ezee ? "Brand AI" : "AI chat"}
          </span>
        </span>
        {ezee && (
          <span className="rounded-full px-1.5 py-0.5 text-[8px]" style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 700 }}>
            Franchisee · Store #214
          </span>
        )}
      </div>
      <div className="px-2.5 py-2 space-y-1.5">
        <div className="ml-auto max-w-[90%] rounded-xl rounded-br-sm px-2 py-1" style={{ backgroundColor: ezee ? "#00AEEF" : "rgba(10,10,10,0.06)" }}>
          <p className="text-[10px]" style={{ color: ezee ? "#FFFFFF" : MOCK_TEXT, lineHeight: 1.3 }}>
            write a refund policy for my swim school
          </p>
        </div>
        <div className="max-w-[92%] rounded-xl rounded-bl-sm px-2 py-1" style={{ backgroundColor: "rgba(10,10,10,0.04)" }}>
          <p className="text-[10px]" style={{ color: MOCK_MUTED, lineHeight: 1.3 }}>
            {ezee
              ? "Your brand refund policy, section 4.2, applies. Summary below."
              : "Sure! A common refund policy might include..."}
          </p>
          {ezee && (
            <span className="mt-1 inline-block rounded-full px-1.5 py-0.5 text-[8px]" style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 700 }}>
              BRAND-POLICY.PDF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SpreadsheetTile() {
  return (
    <div className="rounded-xl overflow-hidden w-[220px]" style={MOCK_SURFACE}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span aria-hidden="true" className="block h-2 w-2 rounded-sm flex-shrink-0" style={{ backgroundColor: "#188038" }} />
        <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          coach&apos;s macro.xlsx
        </span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}`, backgroundColor: "rgba(10,10,10,0.03)" }}>
        <span className="text-[9px] font-mono" style={{ color: MOCK_MUTED }}>fx</span>
        <span className="text-[9px] font-mono truncate" style={{ color: MOCK_TEXT }}>
          =IF(VLOOKUP(B2,Sales!A:C,3)&lt;Target...
        </span>
      </div>
      <div className="grid grid-cols-3" aria-hidden="true">
        {["Store", "Sales", "Δ", "#052", "18.2k", "-4%", "#118", "22.9k", "+2%"].map((v, i) => (
          <span key={i} className="text-[9px] px-1.5 py-1 font-mono truncate" style={{ color: i < 3 ? MOCK_MUTED : MOCK_TEXT, borderBottom: `1px solid ${MOCK_HAIRLINE}`, borderRight: `1px solid ${MOCK_HAIRLINE}` }}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function PromptDocTile() {
  return (
    <div className="rounded-xl overflow-hidden w-[210px]" style={MOCK_SURFACE}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <FileText aria-hidden="true" className="w-3 h-3 flex-shrink-0" strokeWidth={2} style={{ color: "#4285F4" }} />
        <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          HQ&apos;s prompt doc v7
        </span>
      </div>
      <div className="px-2.5 py-2 space-y-1">
        {[
          "“Act as a franchise ops expert...”",
          "“Summarize this P&L like a coach...”",
          "“NEVER mention competitors!!”",
        ].map((l) => (
          <p key={l} className="text-[9.5px] truncate" style={{ color: MOCK_MUTED, lineHeight: 1.4 }}>
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function FlowTile() {
  return (
    <div className="rounded-xl overflow-hidden w-[200px]" style={MOCK_SURFACE}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <Zap aria-hidden="true" className="w-3 h-3 flex-shrink-0" strokeWidth={2} style={{ color: "#FF4F00" }} />
        <span className="text-[10px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          someone&apos;s flow
        </span>
      </div>
      <div className="px-2.5 py-2 space-y-1">
        {[
          { step: "1. New Google review", dot: "#FBBC04" },
          { step: "2. Ask AI to reply", dot: "#10A37F" },
          { step: "3. Post it (unreviewed)", dot: "#DC2626" },
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-1.5 rounded-md px-1.5 py-1" style={{ border: `1px solid ${MOCK_HAIRLINE}` }}>
            <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.dot }} />
            <span className="text-[9.5px] truncate" style={{ color: MOCK_TEXT }}>{s.step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StickyTile() {
  return (
    <div
      className="w-[120px] rounded-sm px-2.5 py-2"
      style={{ backgroundColor: "#FEF3C7", border: "1px solid rgba(10,10,10,0.08)", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}
    >
      <p className="text-[10px]" style={{ color: "#78716C", lineHeight: 1.35, fontFamily: "cursive" }}>
        ask chatgpt first, then text me!!
      </p>
    </div>
  );
}

/* ── Left panel: genuine sprawl ────────────────────────── */

/** Hand-placed. Odd positions, rotations from -7 to +8, two tiles
 *  bleeding past the panel edge, nothing on a grid. */
const SCATTER: { el: React.ReactNode; x: string; y: string; rot: number; z: number; label?: string }[] = [
  { el: <ConsumerChatTile />, x: "-6%",  y: "8%",  rot: -7, z: 3, label: "franchisee's own GPT" },
  { el: <SpreadsheetTile />,  x: "52%",  y: "-4%", rot: 5,  z: 2, label: "coach's spreadsheet macro" },
  { el: <PromptDocTile />,    x: "30%",  y: "42%", rot: -3, z: 4 },
  { el: <FlowTile />,         x: "68%",  y: "56%", rot: 8,  z: 1, label: "someone's Zapier flow" },
  { el: <StickyTile />,       x: "8%",   y: "72%", rot: -6, z: 5 },
];

export function ScatteredPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref}>
      <p className="ed-fg-muted text-sm uppercase tracking-[0.2em] mb-4" style={{ fontWeight: 600 }}>
        Today
      </p>
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)", height: "360px" }}
      >
        <p className="sr-only">
          Five disconnected AI artifacts scattered across a franchise
          network with no connections between them: a franchisee&apos;s own
          consumer AI chat, a coach&apos;s spreadsheet macro, HQ&apos;s
          prompt doc, an unreviewed automation flow, and a sticky note.
        </p>
        {SCATTER.map((m, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + i * 0.08 }}
            className="absolute"
            style={{ left: m.x, top: m.y, zIndex: m.z }}
          >
            {/* Rotation lives on an inner div so framer's entrance
                transform on the motion wrapper cannot clobber it. */}
            <div style={{ transform: `rotate(${m.rot}deg)`, filter: "grayscale(0.55) opacity(0.92)" }}>
              {m.el}
              {m.label && (
                <p className="mt-1 text-[9.5px]" style={{ color: "var(--ed-fg-muted)", fontWeight: 500 }}>
                  {m.label}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Right panel: the same artifacts, one layer ────────── */

export function OrderedPanel({ compact = false }: { compact?: boolean } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref}>
      <p className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}>
        What it needs to be
      </p>
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col justify-between px-5 pt-5 pb-5"
        style={{
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          minHeight: compact ? "168px" : "360px",
        }}
      >
        <p className="sr-only">
          The same artifacts, upright and aligned, connected into a single
          execution layer with role-scoped, source-cited chrome.
        </p>

        {/* Aligned artifacts, scaled to fit two per row */}
        <div
          className={compact ? "grid grid-cols-2 lg:grid-cols-4 gap-2 items-start" : "grid grid-cols-1 sm:grid-cols-2 gap-3 items-start"}
          aria-hidden="true"
        >
          {[<ConsumerChatTile key="a" ezee />, <SpreadsheetTile key="b" />, <PromptDocTile key="c" />, <FlowTile key="d" />].map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 + i * 0.08 }}
              className="flex justify-center"
              style={{ transform: `scale(${compact ? 0.58 : 0.82})`, transformOrigin: "top center" }}
            >
              {tile}
            </motion.div>
          ))}
        </div>

        {/* Connecting lines into the layer */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={compact ? "w-full -mt-16" : "w-full -mt-6"} style={{ height: compact ? "22px" : "34px" }} aria-hidden="true">
          {[25, 75].map((x, i) => (
            <motion.line
              key={x}
              x1={x} y1={0} x2={x} y2={100}
              stroke="#00AEEF" strokeOpacity="0.45" strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 + i * 0.08 }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.92 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.95 }}
          className="rounded-xl py-4 text-center"
          style={{
            backgroundColor: "rgba(0,174,239,0.10)",
            border: "1px solid rgba(0,174,239,0.45)",
            boxShadow: "0 0 32px rgba(0,174,239,0.10)",
          }}
        >
          <span
            className="text-lg md:text-xl"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 600, color: "var(--ed-accent-text)" }}
          >
            One execution layer
          </span>
        </motion.div>
      </div>
      <p
        className="mt-4 text-center uppercase"
        style={{ fontSize: "14px", letterSpacing: "0.18em", fontWeight: 500, color: "var(--ed-fg-muted)" }}
      >
        People, playbooks, and tools on one layer.
      </p>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */
