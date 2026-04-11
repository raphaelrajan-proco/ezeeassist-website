"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Newspaper, Mic } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    icon: Newspaper,
    label: "BetaKit",
    title: "EZee Assist Reveals $1.85 Million in Funding to Help Franchises Manage Institutional Memory",
    cta: "Read article →",
    href: "#",
  },
  {
    icon: Mic,
    label: "Emerging Franchise Brands Podcast",
    title: "CEO Raphael Rohit Rajan on the EZee Assist Journey and AI in Franchising",
    cta: "Listen now →",
    href: "#",
  },
  {
    icon: Mic,
    label: "Modern Business Podcast",
    title: "The Origin Story of EZee Assist — AI, Franchising, and the Future of Support",
    cta: "Listen now →",
    href: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

export default function PressSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#F7F8FA] dark:bg-[#111111] border-y border-[#E5E7EB] dark:border-white/[0.06]">
      <div ref={ref} className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            In the news
          </p>
          <h2
            className="text-3xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
            style={{ letterSpacing: "-0.02em" }}
          >
            EZee Assist in the news
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {articles.map(({ icon: Icon, label, title, cta, href }, i) => (
            <motion.div
              key={label}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <a
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00AEEF]/10 mb-4 flex-shrink-0">
                  <Icon size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  {label}
                </p>
                <p
                  className="text-sm font-semibold leading-snug text-[#0A0A0A] dark:text-[#F0F0F0] flex-1 mb-4 group-hover:text-[#00AEEF] dark:group-hover:text-[#00AEEF] transition-colors"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </p>
                <span className="text-sm font-semibold text-[#00AEEF]">{cta}</span>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href="https://linkedin.com/company/ezeeassist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-500 hover:text-[#00AEEF] transition-colors"
          >
            Follow us on LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
