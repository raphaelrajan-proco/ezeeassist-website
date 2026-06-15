"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Inline editorial illustrations ──────────────────── */

function StackedQuestionsIllo() {
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
            Where do I find the new BOGO promo flyer?
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
        + 47 more this morning
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

function CoachingGapIllo() {
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
          Coaching · Last Quarter
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
        Lagging indicators only
      </p>
      <p className="ed-fg-muted text-xs mb-4">
        Reviewed weeks after the moment passed
      </p>

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

const pains = [
  {
    stat: "50%",
    title: "Repetitive questions",
    body:
      "Franchisees and teams can't find what they need across 10+ tools, so it all routes to people.",
    illo: <StackedQuestionsIllo />,
  },
  {
    stat: "30%",
    title: "Manual compliance work",
    body:
      "Pushing data between systems, chasing updates, audits and reporting.",
    illo: <ScatteredFilesIllo />,
  },
  {
    stat: "20%",
    title: "Real coaching",
    body:
      "And even this runs on lagging indicators. Not live signals and proactive loops.",
    illo: <CoachingGapIllo />,
  },
];

/* ─── Single pain column ───────────────────────────────── */

function PainColumn({
  stat,
  title,
  body,
  illo,
  index,
}: {
  stat: string;
  title: string;
  body: string;
  illo: React.ReactNode;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12,
      }}
      className="flex flex-col"
    >
      <p
        className="ed-accent text-7xl md:text-8xl lg:text-9xl mb-4"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
        }}
      >
        {stat}
      </p>
      <h3
        className="ed-fg text-2xl md:text-3xl mb-4"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
      <p
        className="ed-fg-muted text-base md:text-lg mb-10 max-w-md"
        style={{ lineHeight: 1.5, fontWeight: 400 }}
      >
        {body}
      </p>
      <div className="mt-auto">{illo}</div>
    </motion.div>
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
          className="max-w-5xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">The Reality Today</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Built to coach and drive revenue.{" "}
            <span className="ed-accent">
              But, massively underleveraged.
            </span>
          </h2>
        </motion.div>

        <span
          className="ed-rule-draw"
          data-visible={headInView}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-16 md:pt-24">
          {pains.map((p, i) => (
            <PainColumn
              key={p.title}
              stat={p.stat}
              title={p.title}
              body={p.body}
              illo={p.illo}
              index={i}
            />
          ))}
        </div>

        {/* Final emphasis line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="ed-fg mt-24 md:mt-32 text-3xl md:text-4xl lg:text-5xl max-w-5xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Four days in five go to support and admin.{" "}
          <span
            className="ed-accent"
            style={{
              borderBottom: "2px solid currentColor",
              paddingBottom: "0.1em",
            }}
          >
            Not to growth.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
