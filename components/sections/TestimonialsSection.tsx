"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const AUTOPLAY_DELAY = 5000;

export default function TestimonialsSection() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => goTo(current + 1, 1),  [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => next(), AUTOPLAY_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
    exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3, ease: "easeIn" as const } }),
  };

  const t = testimonials[current];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-28">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Customer Stories</p>
          <h2
            className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            What franchise leaders are saying
          </h2>
        </motion.div>

        {/* Carousel card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <div
            className="relative rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
            style={{ borderLeft: "4px solid #00AEEF" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Quote area */}
            <div className="relative min-h-[280px] px-10 pt-10 pb-8 sm:px-14 sm:pt-12">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 px-10 pt-10 pb-8 sm:px-14 sm:pt-12 flex flex-col"
                >
                  <span className="text-7xl font-extrabold leading-none text-[#00AEEF] select-none -mt-2 mb-2" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="flex-1 text-lg leading-8 text-[#0A0A0A] font-medium sm:text-xl">{t.quote}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Attribution + controls */}
            <div className="flex items-center justify-between gap-4 border-t border-[#E5E7EB] px-10 py-5 sm:px-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current + "-attr"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/15 text-sm font-bold text-[#00AEEF]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A]">{t.name}</p>
                    <p className="text-sm text-gray-500">
                      {t.title},{" "}
                      <span className="font-medium text-[#0A0A0A]">{t.company}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? 1 : -1)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-5 bg-[#00AEEF]" : "w-2 bg-[#E5E7EB] hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-gray-400 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-gray-400 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
