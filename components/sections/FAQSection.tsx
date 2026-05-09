"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  { q: "How long does implementation take?", a: "Most customers go live in under 7 days. We connect to your existing systems and tech stack — 250+ integrations — with no migration required." },
  { q: "What channels do operators use?", a: "Operators interact with EZee through SMS, email, Slack, Microsoft Teams, WhatsApp, or our web portal — whichever channel they already use." },
  { q: "Is my data used to train AI models?", a: "Never. Your data is never shared with or used by third parties for any software or language model training. All data is encrypted, isolated in dedicated AWS infrastructure, and fully under your control." },
  { q: "How is this different from ChatGPT or a generic AI chatbot?", a: "Generic AI answers from the open internet. EZee answers exclusively from your brand's knowledge base, your systems, and your data. Every answer is brand-specific. Every action happens inside your tech stack. Every workflow is built for your operations." },
  { q: "What happens when AI can't answer a question?", a: "It automatically creates a support ticket with the full conversation context and routes it to the right person on your team. No question falls through the cracks." },
  { q: "How many locations can EZee support?", a: "We support networks from 10 to 4,000+ locations today. The platform scales with your network." },
  { q: "What does pricing look like?", a: "Pricing is based on your network size and usage. We offer flexible plans for growing brands and enterprise pricing for large networks. Book a demo for options that fit your budget." },
  { q: "What kind of workflows can EZee automate?", a: "Anything you can describe. Examples: weekly KPI reports pulled from QuickBooks and Mindbody, proactive compliance flags for expired insurance or missing financials, automated staffing optimization based on demand and bookings, onboarding checklists for new locations, and much more. You describe the workflow, EZee builds and executes it." },
];

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
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
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
