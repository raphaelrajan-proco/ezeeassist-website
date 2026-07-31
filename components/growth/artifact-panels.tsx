"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
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
          <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
            {ezee ? "Guardrailed Support Agent" : "AI chat"}
          </span>
        </span>
        {ezee && (
          <span className="rounded-full px-1.5 py-0.5 text-[8px] flex-shrink-0 whitespace-nowrap" style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 700 }}>
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

function SpreadsheetTile({ governed = false }: { governed?: boolean } = {}) {
  return (
    <div className="rounded-xl overflow-hidden w-[220px]" style={MOCK_SURFACE}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span aria-hidden="true" className="block h-2 w-2 rounded-sm flex-shrink-0" style={{ backgroundColor: "#188038" }} />
        <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          {governed ? "Coaching Analytics" : "coach's macro.xlsx"}
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

function PromptDocTile({ governed = false }: { governed?: boolean } = {}) {
  return (
    <div className="rounded-xl overflow-hidden w-[210px]" style={MOCK_SURFACE}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <FileText aria-hidden="true" className="w-3 h-3 flex-shrink-0" strokeWidth={2} style={{ color: "#4285F4" }} />
        <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          {governed ? "HQ's benchmarks and standards" : "HQ's prompt doc v7"}
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

function FlowTile({ governed = false }: { governed?: boolean } = {}) {
  return (
    <div className="rounded-xl overflow-hidden w-[200px]" style={MOCK_SURFACE}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <Zap aria-hidden="true" className="w-3 h-3 flex-shrink-0" strokeWidth={2} style={{ color: "#FF4F00" }} />
        <span className="text-[10px] truncate" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          {governed ? "Personalized automations" : "someone's flow"}
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

export function ScatteredPanel({ bare = false }: { bare?: boolean } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className={bare ? "h-full" : undefined}>
      <div
        className={bare ? "relative overflow-hidden h-full" : "relative rounded-2xl overflow-hidden"}
        style={bare
          ? undefined
          : { backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)", height: "360px" }}
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

/* The spine is drawn with positioned divs rather than an SVG. An SVG with
 * preserveAspectRatio="none" stretched its 100x100 viewBox into a box about
 * 1330 wide by 26 tall, so x scaled ~13x and y scaled ~0.26x. That thinned
 * every horizontal stroke to under a pixel while fattening the verticals,
 * and the rail rendered as broken fragments. Divs keep the stroke a real
 * 2px at every width. */
const SPINE_COLOR = "#00AEEF";
const SPINE_W = 2;          /* line thickness, px */
const SPINE_H = 44;         /* total spine block height, px */
const RAIL_Y = 24;          /* rail distance from the top of the block, px */
const COLS = [12.5, 37.5, 62.5, 87.5];  /* column centres, % */

function Spine({ inView }: { inView: boolean }) {
  const still = useReducedMotion();
  /* Reduced motion gets the finished spine with no draw-on. */
  const draw = (axis: "x" | "y", delay: number) =>
    still
      ? {}
      : {
          initial: { transform: axis === "x" ? "scaleX(0)" : "scaleY(0)" },
          animate: inView ? { transform: "scaleX(1) scaleY(1)" } : {},
          transition: { duration: axis === "x" ? 0.55 : 0.3, ease: "easeOut" as const, delay },
        };

  const line: React.CSSProperties = {
    position: "absolute",
    backgroundColor: SPINE_COLOR,
    borderRadius: SPINE_W / 2,
  };

  return (
    <div className="relative w-full mt-3" style={{ height: SPINE_H }} aria-hidden="true">
      {/* A stub down from each column centre */}
      {COLS.map((x, i) => (
        <motion.div
          key={x}
          {...draw("y", 0.5 + i * 0.06)}
          style={{
            ...line,
            left: `${x}%`,
            top: 0,
            width: SPINE_W,
            height: RAIL_Y,
            marginLeft: -SPINE_W / 2,
            transformOrigin: "top",
          }}
        />
      ))}

      {/* One rail across, from the first column centre to the last */}
      <motion.div
        {...draw("x", 0.76)}
        style={{
          ...line,
          left: `${COLS[0]}%`,
          right: `${100 - COLS[COLS.length - 1]}%`,
          top: RAIL_Y - SPINE_W / 2,
          height: SPINE_W,
          transformOrigin: "left",
        }}
      />

      {/* A single drop into the layer bar */}
      <motion.div
        {...draw("y", 1.05)}
        style={{
          ...line,
          left: "50%",
          top: RAIL_Y - SPINE_W / 2,
          width: SPINE_W,
          height: SPINE_H - RAIL_Y + SPINE_W / 2,
          marginLeft: -SPINE_W / 2,
          transformOrigin: "top",
        }}
      />
    </div>
  );
}

export function OrderedPanel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  /* Governed names. The scattered panel renders these same components
     without the flag, where the ad-hoc names are the whole point. */
  const tiles = [
    <ConsumerChatTile key="a" ezee />,
    <SpreadsheetTile key="b" governed />,
    <PromptDocTile key="c" governed />,
    <FlowTile key="d" governed />,
  ];

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden px-5 pt-5 pb-5"
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      <p className="sr-only">
        The same artifacts, upright and aligned, connected into a unified
        operating system with role-scoped, source-cited chrome.
      </p>

      {/* Four artifacts across, each sized to its own column */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-start" aria-hidden="true">
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 + i * 0.08 }}
            className="ed-tile-fluid flex justify-center"
          >
            {tile}
          </motion.div>
        ))}
      </div>

      {/* Left-to-right spine: a stub down from each column, one rail
          across, then a single drop into the layer bar. */}
      <Spine inView={inView} />

      <motion.div
        initial={{ opacity: 0, scaleX: 0.94 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
        className="rounded-lg py-2 text-center"
        style={{
          backgroundColor: "rgba(0,174,239,0.10)",
          border: "1px solid rgba(0,174,239,0.45)",
        }}
      >
        <span
          className="text-sm"
          style={{ fontFamily: "var(--font-editorial)", fontWeight: 600, color: "var(--ed-accent-text)" }}
        >
          Unified Operating System
        </span>
      </motion.div>
    </div>
  );
}
