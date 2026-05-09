"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Inline editorial illustrations ──────────────────── */

function StackedQuestionsIllo() {
  // Three nearly-identical stacked chat bubbles, slightly offset, +47 below.
  const lines = [0, 1, 2];
  return (
    <div className="relative w-full max-w-[260px] mx-auto md:mx-0">
      {lines.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1 - i * 0.18, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.12 }}
          className="rounded-2xl px-5 py-4"
          style={{
            backgroundColor: "var(--ed-card)",
            border: "1px solid var(--ed-rule)",
            transform: `translate(${i * 10}px, ${i * -42}px)`,
            position: i === 0 ? "relative" : "absolute",
            top: i === 0 ? undefined : 0,
            left: i === 0 ? undefined : 0,
            right: i === 0 ? undefined : 0,
            zIndex: lines.length - i,
          }}
        >
          <p
            className="text-[13px] ed-fg"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            What are the brand guidelines for signage?
          </p>
        </motion.div>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="ed-fg-muted text-xs mt-8 text-center md:text-left"
        style={{
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        + 47 more identical questions today
      </motion.p>
    </div>
  );
}

function ScatteredFilesIllo() {
  const files = [
    { ext: "PDF", label: "Brand Guide v3 FINAL.pdf",     dx: -18, dy: -10, rot: -4 },
    { ext: "DOC", label: "Ops Manual 2022.docx",          dx:  18, dy: -16, rot:  3 },
    { ext: "MP4", label: "Onboarding training",            dx: -10, dy:  18, rot:  5 },
    { ext: "XLS", label: "SOP_v7_reviewed.xlsx",          dx:  20, dy:  20, rot: -6 },
  ];
  return (
    <div className="relative w-full max-w-[280px] mx-auto md:mx-0 h-[220px]">
      {files.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + i * 0.1 }}
          className="absolute flex items-center gap-3 rounded-xl px-3.5 py-2.5"
          style={{
            backgroundColor: "var(--ed-card)",
            border: "1px solid var(--ed-rule)",
            top: `${50 + f.dy * 1.8}%`,
            left: `${50 + f.dx * 1.5}%`,
            transform: `translate(-50%, -50%) rotate(${f.rot}deg)`,
            minWidth: "180px",
          }}
        >
          <span
            className="text-[10px] px-2 py-0.5 rounded"
            style={{
              backgroundColor: "var(--ed-bg-alt)",
              color: "var(--ed-fg)",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {f.ext}
          </span>
          <span
            className="text-[11px] ed-fg-muted truncate"
            style={{ fontWeight: 400 }}
          >
            {f.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function KpiAlertIllo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-[280px] mx-auto md:mx-0 rounded-2xl p-5"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[10px]"
          style={{
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ed-fg-muted)",
          }}
        >
          Compliance · Location 042
        </span>
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "#DC2626" }}
        />
      </div>

      <p
        className="ed-fg text-2xl mb-1"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        Insurance expired
      </p>
      <p className="ed-fg-muted text-xs mb-4">14 days ago · not renewed</p>

      {/* Tiny downward sparkline */}
      <svg
        viewBox="0 0 240 60"
        className="w-full h-12"
        style={{ overflow: "visible" }}
      >
        <motion.polyline
          points="0,15 40,18 80,28 120,32 160,40 200,48 240,55"
          fill="none"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── Section data ─────────────────────────────────────── */

const rows = [
  {
    title: "Support teams are buried in repetitive questions.",
    body: "Across dozens of locations, operators ask identical questions every day about procedures, vendors, marketing, compliance. Your team handles them manually — one by one. It's expensive, demoralizing, and unsustainable.",
    illo: <StackedQuestionsIllo />,
    illoSide: "right" as const,
  },
  {
    title: "Knowledge and systems are scattered everywhere.",
    body: "SOPs live in Google Drive. Training videos on YouTube. CRM data in HubSpot. Scheduling in Mindbody. Compliance docs in SharePoint. Operators can't find what they need — so they call you instead.",
    illo: <ScatteredFilesIllo />,
    illoSide: "left" as const,
  },
  {
    title: "Coaching and compliance don't scale with people alone.",
    body: "You can't have an FBC on every call, at every location, every hour. Training gaps go unnoticed. Compliance issues surface too late. Brand standards drift across the network.",
    illo: <KpiAlertIllo />,
    illoSide: "right" as const,
  },
];

/* ─── Single editorial row ─────────────────────────────── */

function Row({
  title,
  body,
  illo,
  illoSide,
  index,
  total,
}: {
  title: string;
  body: string;
  illo: React.ReactNode;
  illoSide: "left" | "right";
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const last = index === total - 1;
  const slideFromX = illoSide === "right" ? -40 : 40;

  const NumberCell = (
    <div className="md:col-span-2">
      <p
        className="ed-fg-muted text-7xl md:text-8xl"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          opacity: 0.35,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </p>
    </div>
  );

  const TextCell = (
    <div className="md:col-span-6">
      <h3
        className="ed-fg text-3xl md:text-4xl lg:text-5xl mb-6"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h3>
      <p
        className="ed-fg-muted text-lg md:text-xl max-w-xl"
        style={{ lineHeight: 1.55, fontWeight: 400 }}
      >
        {body}
      </p>
    </div>
  );

  const IlloCell = (
    <div className="md:col-span-4 flex items-center justify-center md:justify-start">
      {illo}
    </div>
  );

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: slideFromX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24 items-center"
      >
        {NumberCell}
        {illoSide === "right" ? (
          <>
            {TextCell}
            {IlloCell}
          </>
        ) : (
          <>
            {IlloCell}
            {TextCell}
          </>
        )}
      </motion.div>
      {!last && (
        <span
          className="ed-rule-draw"
          data-visible={inView}
          aria-hidden="true"
        />
      )}
    </>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function ProblemSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">The Challenge</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Multi-location execution{" "}
            <span className="ed-accent">breaks down at scale.</span>
          </h2>
        </motion.div>

        <span
          className="ed-rule-draw"
          data-visible={headInView}
          aria-hidden="true"
        />

        {rows.map((row, i) => (
          <Row
            key={i}
            title={row.title}
            body={row.body}
            illo={row.illo}
            illoSide={row.illoSide}
            index={i}
            total={rows.length}
          />
        ))}
      </div>
    </section>
  );
}
