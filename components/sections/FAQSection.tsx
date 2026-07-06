"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { faqs } from "@/lib/data/faqs";

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full ed-bg-alt">
      <div ref={ref} className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">FAQ</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Frequently asked.
          </h2>
        </motion.div>

        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
              style={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderColor: "var(--ed-rule)",
              }}
            >
              <button
                className="flex w-full items-center justify-between gap-6 py-6 md:py-8 text-left transition-opacity hover:opacity-70"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="ed-fg text-2xl md:text-3xl"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {q}
                </span>
                <span
                  className="ed-fg-muted text-2xl md:text-3xl flex-shrink-0 transition-transform duration-300"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 400,
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="ed-fg-muted pb-8 max-w-3xl text-lg md:text-xl"
                      style={{ lineHeight: 1.55 }}
                    >
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
