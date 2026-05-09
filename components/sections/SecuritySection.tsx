"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const pillars = [
  { title: "Data isolation",   body: "Your content never touches shared infrastructure. Each client environment is fully isolated." },
  { title: "No model training", body: "Your data is never used to train third-party AI models — ever. It stays yours." },
  { title: "SOC 2 aligned",     body: "Built on security practices aligned with SOC 2 Type II controls and enterprise requirements." },
  { title: "Full audit trail",  body: "Every query, every response, every escalation — logged and available for your review." },
];

export default function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full ed-bg">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="ed-overline mb-8">Security</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Security is the{" "}
            <span className="ed-accent">backbone</span> of our product.
          </h2>
          <p
            className="ed-fg-muted mt-8 max-w-2xl text-lg md:text-xl"
            style={{ lineHeight: 1.5 }}
          >
            We follow best-in-class security practices to ensure your data is
            completely protected and in line with your privacy policies.
          </p>
        </motion.div>

        <div
          className="border-t ed-rule grid grid-cols-1 md:grid-cols-2"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {pillars.map(({ title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="py-12 md:py-16 md:px-12"
              style={{
                borderBottomWidth: i < pillars.length - 2 ? "1px" : "0",
                borderBottomStyle: "solid",
                borderColor: "var(--ed-rule)",
                ...(i % 2 === 1
                  ? {
                      borderLeftWidth: "1px",
                      borderLeftStyle: "solid",
                      borderColor: "var(--ed-rule)",
                    }
                  : {}),
              }}
            >
              <h3
                className="ed-fg text-3xl md:text-4xl mb-5"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </h3>
              <p
                className="ed-fg-muted text-base md:text-lg max-w-md"
                style={{ lineHeight: 1.55 }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Link href="/security" className="ed-btn ed-btn-secondary">
            Learn more about security
          </Link>
        </div>
      </div>
    </section>
  );
}
