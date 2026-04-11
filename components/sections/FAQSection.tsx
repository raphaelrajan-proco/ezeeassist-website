"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does implementation take?",
    a: "Most customers go live in under 7 days. We connect to your existing knowledge systems — Google Drive, SharePoint, YouTube, Dropbox, and more — with no migration required. Your franchisees can start asking questions on day one.",
  },
  {
    q: "What channels do franchisees use to ask questions?",
    a: "Franchisees can ask questions through SMS/text, email, Slack, Microsoft Teams, WhatsApp, or our web portal. They use whichever channel they already prefer — no new tools to learn.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your data is never shared with or used by third parties for any software or language model training. All data is encrypted, isolated in dedicated AWS infrastructure, and fully under your control.",
  },
  {
    q: "How is this different from ChatGPT or a generic AI chatbot?",
    a: "Generic AI tools answer from the open internet. EZee Assist answers exclusively from your brand's own knowledge base — operating manuals, SOPs, training videos, and communications. Every answer is brand-specific, accurate, and citable.",
  },
  {
    q: "What happens when the AI can't answer a question?",
    a: "It automatically creates a support ticket with the full conversation context and routes it to the right person on your team. No question falls through the cracks.",
  },
  {
    q: "How many locations can EZee Assist support?",
    a: "There's no limit. We support franchise networks from 10 locations to 1,000+. The platform scales with your network — adding a new location takes minutes, not weeks.",
  },
  {
    q: "What does pricing look like?",
    a: "Pricing is based on your network size and usage. We offer flexible plans for growing brands and enterprise pricing for large networks. Book a demo and we'll walk you through options that fit your budget.",
  },
  {
    q: "Is EZee Assist secure and compliant?",
    a: "Yes. We follow enterprise-grade security practices aligned with SOC 2 Type II controls. All data is encrypted with TLS 1.2/1.3 in transit and AES 256-bit at rest. Each customer's data is isolated in dedicated AWS EC2 instances.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-white">
      <div ref={ref} className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">FAQ</p>
          <h2
            className="text-3xl font-bold text-[#0A0A0A] sm:text-4xl"
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
              className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] overflow-hidden"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-sm font-semibold text-[#0A0A0A] pr-4"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {q}
                </span>
                <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white">
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
                    <div className="px-6 pb-5 text-sm leading-7 text-gray-600 border-t border-[#E5E7EB] pt-4">
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
