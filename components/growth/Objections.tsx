"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { objections } from "@/lib/data/objections";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * Section 14: three straight answers. One open at a time, smooth
 * height animation. Content lives in lib/data/objections so the
 * FAQPage schema cannot drift from what renders.
 */
export default function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="objections">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-12 md:mb-14"
      >
        <Overline>Straight answers</Overline>
        <SectionHeadline>Three questions worth asking.</SectionHeadline>
      </motion.div>

      <div
        className="max-w-3xl"
        style={{ borderTop: "1px solid var(--ed-rule)" }}
      >
        {objections.map((o, i) => (
          <div key={o.q} style={{ borderBottom: "1px solid var(--ed-rule)" }}>
            <button
              className="flex w-full items-center justify-between gap-6 py-6 md:py-7 text-left transition-opacity hover:opacity-70"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span
                className="ed-fg text-xl md:text-2xl tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25 }}
              >
                {o.q}
              </span>
              <span className="relative flex-shrink-0 block h-4 w-4" aria-hidden="true">
                <span
                  className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: "var(--ed-fg-muted)" }}
                />
                <span
                  className="absolute left-1/2 top-0 h-4 w-[1.5px] rounded-full transition-transform duration-150"
                  style={{
                    backgroundColor: "var(--ed-fg-muted)",
                    transform: open === i
                      ? "translateX(-50%) rotate(90deg)"
                      : "translateX(-50%) rotate(0deg)",
                  }}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-7 max-w-3xl">
                    <p className="ed-fg-muted text-base md:text-lg leading-relaxed">
                      {o.a}
                    </p>
                    {o.link && (
                      <Link
                        href={o.link.href}
                        className="ed-link inline-block mt-4 text-sm"
                        style={{ fontWeight: 500 }}
                      >
                        {o.link.label}
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
