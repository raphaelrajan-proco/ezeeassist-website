"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  {
    title: "Support teams are buried in repetitive questions.",
    body: "Across dozens of locations, operators ask identical questions every day about procedures, vendors, marketing, compliance. Your team handles them manually — one by one. It's expensive, demoralizing, and unsustainable.",
  },
  {
    title: "Knowledge and systems are scattered everywhere.",
    body: "SOPs live in Google Drive. Training videos on YouTube. CRM data in HubSpot. Scheduling in Mindbody. Compliance docs in SharePoint. Operators can't find what they need — so they call you instead.",
  },
  {
    title: "Coaching and compliance don't scale with people alone.",
    body: "You can't have an FBC on every call, at every location, every hour. Training gaps go unnoticed. Compliance issues surface too late. Brand standards drift across the network.",
  },
];

function Row({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const last = index === rows.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 md:py-24 ${
        last ? "" : "border-b ed-rule"
      }`}
      style={!last ? { borderBottomWidth: "1px", borderBottomStyle: "solid" } : {}}
    >
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
      <div className="md:col-span-6">
        <h3
          className="ed-fg text-3xl md:text-4xl lg:text-5xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h3>
      </div>
      <div className="md:col-span-4">
        <p
          className="ed-fg-muted text-lg md:text-xl"
          style={{ lineHeight: 1.55, fontWeight: 400 }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
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

        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {rows.map((row, i) => (
            <Row key={i} title={row.title} body={row.body} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
