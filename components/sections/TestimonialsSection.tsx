"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

function Testimonial({
  t,
  index,
  total,
}: {
  t: (typeof testimonials)[number];
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const last = index === total - 1;

  return (
    <div
      ref={ref}
      className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8"
      style={
        !last
          ? {
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: "var(--ed-rule)",
            }
          : {}
      }
    >
      <div className="md:col-span-9">
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(8px)" }
          }
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
        className="md:col-span-3 flex md:items-end"
      >
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
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-20 md:mb-28"
        >
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

        <span
          className="ed-rule-draw"
          data-visible={headInView}
          aria-hidden="true"
        />

        {testimonials.map((t, i) => (
          <Testimonial
            key={t.name}
            t={t}
            index={i}
            total={testimonials.length}
          />
        ))}
      </div>
    </section>
  );
}
