"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does implementation take?",
    a: "Most customers go live in under 7 days. We connect to your existing systems and tech stack — 250+ integrations — with no migration required.",
  },
  {
    q: "What channels do operators use?",
    a: "Operators interact with EZee through SMS, email, Slack, Microsoft Teams, WhatsApp, or our web portal — whichever channel they already use.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your data is never shared with or used by third parties for any software or language model training. All data is encrypted, isolated in dedicated AWS infrastructure, and fully under your control.",
  },
  {
    q: "How is this different from ChatGPT or a generic AI chatbot?",
    a: "Generic AI answers from the open internet. EZee answers exclusively from your brand's knowledge base, your systems, and your data. Every answer is brand-specific. Every action happens inside your tech stack. Every workflow is built for your operations.",
  },
  {
    q: "What happens when AI can't answer a question?",
    a: "It automatically creates a support ticket with the full conversation context and routes it to the right person on your team. No question falls through the cracks.",
  },
  {
    q: "How many locations can EZee support?",
    a: "We support networks from 10 to 4,000+ locations today. The platform scales with your network.",
  },
  {
    q: "What does pricing look like?",
    a: "Pricing is based on your network size and usage. We offer flexible plans for growing brands and enterprise pricing for large networks. Book a demo for options that fit your budget.",
  },
  {
    q: "What kind of workflows can EZee automate?",
    a: "Anything you can describe. Examples: weekly KPI reports pulled from QuickBooks and Mindbody, proactive compliance flags for expired insurance or missing financials, automated staffing optimization based on demand and bookings, onboarding checklists for new locations, and much more. You describe the workflow, EZee builds and executes it.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-white dark:bg-[#0D0D0D]">
      <div ref={ref} className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">FAQ</p>
          <h2
            className="text-3xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
              className="rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] overflow-hidden"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] pr-4"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {q}
                </span>
                <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616]">
                  <Plus
                    size={14}
                    strokeWidth={2.5}
                    className={`text-[#00AEEF] transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="px-6 pb-5 text-sm leading-7 text-gray-600 dark:text-gray-400 border-t border-[#E5E7EB] dark:border-white/[0.08] pt-4">
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
