"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "EZee Assist's solution and desire to solve problems has made them a key partner for EverLine. Our franchisees have embraced this technology and we are looking forward to expanding its use in the future.",
    name: "John Evans",
    title: "Founder & CEO",
    company: "EverLine Coatings & Services",
    initials: "JE",
  },
  {
    quote:
      "AI is now an expectation in franchisee support. With EZee Assist, our owners get accurate, brand-specific answers 24/7 — not generic internet advice — while our team focuses on bigger initiatives.",
    name: "Troy McCullen",
    title: "Vice President of Operations",
    company: "DekaLash",
    initials: "TM",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white dark:bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Customer Stories
          </p>
          <h2
            className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            What franchise leaders{" "}
            <span className="text-[#00AEEF]">are saying.</span>
          </h2>
        </motion.div>

        {/* 2-column grid — both visible simultaneously */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.12 }}
              className="card-hover-blue flex flex-col rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden"
              style={{ borderLeft: "4px solid #00AEEF" }}
            >
              {/* Quote area */}
              <div className="flex-1 px-8 pt-8 pb-6 sm:px-10 sm:pt-10">
                <span
                  className="block text-6xl font-extrabold leading-none text-[#00AEEF] select-none -mt-2 mb-3"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-lg leading-8 text-[#0A0A0A] dark:text-[#F0F0F0] font-medium">
                  {t.quote}
                </p>
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-4 border-t border-[#E5E7EB] dark:border-white/[0.08] px-8 py-5 sm:px-10">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15 text-sm font-bold text-[#00AEEF]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0]">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.title},{" "}
                    <span className="font-medium text-[#0A0A0A] dark:text-[#F0F0F0]">
                      {t.company}
                    </span>
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
