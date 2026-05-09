"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "EZee Assist's solution and desire to solve problems has made them a key partner for EverLine. Our franchisees have embraced this technology and we are looking forward to expanding its use in the future.",
    name: "John Evans",
    title: "Founder & CEO",
    company: "EverLine Coatings & Services",
  },
  {
    quote:
      "AI is now an expectation in franchisee support. With EZee Assist, our owners get accurate, brand-specific answers 24/7 — not generic internet advice — while our team focuses on bigger initiatives.",
    name: "Troy McCullen",
    title: "Vice President of Operations",
    company: "DekaLash",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export default function TestimonialsSection() {
  return (
    <section className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">

        {/* Heading */}
        <motion.div {...fadeUp(0)} className="max-w-4xl mb-20 md:mb-28">
          <p className="ed-overline mb-8">Customer Stories</p>
          <h2
            className="ed-fg text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            What franchise leaders{" "}
            <span className="ed-accent">are saying.</span>
          </h2>
        </motion.div>

        {/* Style C — typography only, separated by horizontal rules */}
        <div
          className="border-t ed-rule"
          style={{ borderTopWidth: "1px", borderTopStyle: "solid" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp(0.05 + i * 0.1)}
              className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8"
              style={
                i !== testimonials.length - 1
                  ? {
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderColor: "var(--ed-rule)",
                    }
                  : {}
              }
            >
              <div className="md:col-span-9">
                <p
                  className="ed-fg text-3xl md:text-4xl lg:text-5xl"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    fontStyle: "italic",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="md:col-span-3 flex md:items-end">
                <div>
                  <p
                    className="ed-fg text-base md:text-lg"
                    style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="ed-fg-muted text-sm md:text-base mt-1"
                    style={{ lineHeight: 1.4 }}
                  >
                    {t.title}
                  </p>
                  <p
                    className="ed-fg-muted text-sm md:text-base"
                    style={{ lineHeight: 1.4 }}
                  >
                    {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
