"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, FolderSearch, Clock } from "lucide-react";

/* ─── Inline UI mockups ────────────────────────────────── */

function RepetitiveQuestionsVisual() {
  const messages = [
    { user: "Jordan M.", q: "What are the brand guidelines for signage?" },
    { user: "Priya S.",  q: "What are the brand guidelines for signage?" },
    { user: "Carlos R.", q: "What are the brand guidelines for signage?" },
  ];
  return (
    <div className="w-full rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] p-6 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400 font-medium">Support Inbox</span>
      </div>
      {messages.map(({ user, q }, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl bg-[#F7F8FA] p-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15 text-xs font-bold text-[#00AEEF]">{user[0]}</div>
          <div>
            <p className="text-xs font-semibold text-[#0A0A0A] mb-0.5">{user}</p>
            <p className="text-xs text-gray-500">{q}</p>
          </div>
          <span className="ml-auto text-[10px] text-gray-300 whitespace-nowrap">just now</span>
        </div>
      ))}
      <div className="pt-1 text-center text-xs text-gray-300">+47 more identical questions today</div>
    </div>
  );
}

function ScatteredKnowledgeVisual() {
  const items = [
    { label: "Brand Guide v3 FINAL.pdf",    color: "bg-red-100 text-red-500",   ext: "PDF" },
    { label: "Ops Manual 2022.docx",         color: "bg-blue-100 text-blue-500", ext: "DOC" },
    { label: "Training Video — Onboarding",  color: "bg-purple-100 text-purple-500", ext: "VID" },
    { label: "Brand Guide v3 FINAL (1).pdf", color: "bg-red-100 text-red-500",   ext: "PDF" },
    { label: "SOP_v7_reviewed_jb.xlsx",      color: "bg-green-100 text-green-500", ext: "XLS" },
    { label: "Brand Guide v3 FINAL (2).pdf", color: "bg-red-100 text-red-500",   ext: "PDF" },
  ];
  return (
    <div className="w-full rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400 font-medium">Shared Drive</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map(({ label, color, ext }, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] p-2.5">
            <span className={`flex-shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${color}`}>{ext}</span>
            <span className="truncate text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[10px] text-gray-300">Spread across 4 drives, 2 SharePoints, 1 Dropbox</p>
    </div>
  );
}

function AfterHoursVisual() {
  return (
    <div className="w-full rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)] p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400 font-medium">Support Chat</span>
      </div>
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-4 text-center">
        <div className="text-2xl mb-1">🌙</div>
        <p className="text-xs font-semibold text-gray-500">Support is offline</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Available Mon–Fri, 9am–6pm EST</p>
      </div>
      <div className="space-y-2">
        {[
          { time: "11:42 PM", msg: "The fryer is making a strange noise — what do I do?" },
          { time: "12:14 AM", msg: "A customer is asking about our allergen policy, help?" },
          { time: "2:07 AM",  msg: "We're out of marketing materials for tomorrow's promo." },
        ].map(({ time, msg }, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg bg-[#F7F8FA] px-3 py-2">
            <span className="text-[10px] text-gray-300 whitespace-nowrap mt-0.5">{time}</span>
            <p className="text-[10px] text-gray-500">{msg}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-gray-300">3 unanswered messages piling up</p>
    </div>
  );
}

/* ─── Section data ─────────────────────────────────────── */

const rows = [
  {
    icon: MessageSquare,
    eyebrow: "The Problem",
    title: "Your team answers the same questions hundreds of times.",
    body: "Across dozens of locations, franchisees ask identical questions every day. Your support team handles them manually — one by one. It's expensive, demoralizing, and doesn't scale.",
    visual: <RepetitiveQuestionsVisual />,
    flip: false,
  },
  {
    icon: FolderSearch,
    eyebrow: "The Problem",
    title: "Your knowledge is scattered. Franchisees can't find it.",
    body: "Manuals, videos, SOPs, and tribal knowledge live across Google Drive, SharePoint, Dropbox, email threads, and people's heads. Franchisees give up and call you instead.",
    visual: <ScatteredKnowledgeVisual />,
    flip: true,
  },
  {
    icon: Clock,
    eyebrow: "The Problem",
    title: "When your team logs off, franchisees are on their own.",
    body: "Operational issues don't respect business hours. Questions pile up overnight. Franchisees make their best guess — or wait until morning. Either way, it costs you.",
    visual: <AfterHoursVisual />,
    flip: false,
  },
];

/* ─── Feature row ──────────────────────────────────────── */

function FeatureRow({ row, index }: { row: (typeof rows)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: row.flip ? 36 : -36 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="flex flex-col justify-center"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">{row.eyebrow}</p>
      <h3
        className="text-2xl font-bold leading-snug text-[#0A0A0A] sm:text-3xl mb-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        {row.title}
      </h3>
      <p className="text-base leading-7 text-gray-600">{row.body}</p>
    </motion.div>
  );

  const visualCol = (
    <motion.div
      initial={{ opacity: 0, x: row.flip ? -36 : 36 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      {row.visual}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-14 items-center md:grid-cols-2 ${
        index !== rows.length - 1 ? "pb-28 border-b border-[#E5E7EB]" : ""
      }`}
    >
      {row.flip ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function ProblemSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28 space-y-24">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Franchise support doesn&apos;t scale.{" "}
            <span className="text-[#00AEEF]">Until now.</span>
          </h2>
        </motion.div>

        {rows.map((row, i) => (
          <FeatureRow key={i} row={row} index={i} />
        ))}
      </div>
    </section>
  );
}
