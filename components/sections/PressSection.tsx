"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const articles = [
  {
    label: "BetaKit",
    title: "EZee Assist Reveals $1.85 Million in Funding to Help Franchises Manage Institutional Memory",
    cta: "Read article",
    href: "#",
  },
  {
    label: "Emerging Franchise Brands Podcast",
    title: "CEO Raphael Rohit Rajan on the EZee Assist Journey and AI in Franchising",
    cta: "Listen",
    href: "#",
  },
  {
    label: "Modern Business Podcast",
    title: "The Origin Story of EZee Assist — AI, Franchising, and the Future of Support",
    cta: "Listen",
    href: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

export default function PressSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">In the news</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            EZee Assist in the press.
          </h2>
        </motion.div>

        {/* Magazine-style article list */}
        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {articles.map(({ label, title, cta, href }, i) => (
            <motion.a
              key={`${label}-${i}`}
              href={href}
              target={href === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-12 transition-opacity hover:opacity-80"
              style={
                i !== articles.length - 1
                  ? {
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderColor: "var(--ed-rule)",
                    }
                  : {}
              }
            >
              <p
                className="ed-fg-muted md:col-span-3 text-xs"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </p>
              <p
                className="ed-fg md:col-span-7 text-2xl md:text-3xl"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                {title}
              </p>
              <p className="md:col-span-2 self-start md:self-end">
                <span className="ed-link text-base">{cta} →</span>
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <a
            href="https://linkedin.com/company/ezeeassist"
            target="_blank"
            rel="noopener noreferrer"
            className="ed-link text-base"
          >
            Follow us on LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
