"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    brand: "WSI",
    bg: "bg-[#00AEEF]/[0.08]",
    accent: "#00AEEF",
    stat: "67%",
    statLabel: "Support reduction globally",
    quote: "Our franchisees have embraced this technology.",
    href: "/case-studies/wsi",
  },
  {
    brand: "DekaLash",
    bg: "bg-[#F9E8F0]",
    accent: "#C2185B",
    stat: "93%",
    statLabel: "AI resolution rate",
    quote: "AI is now an expectation in franchisee support.",
    href: "/case-studies/dekalash",
  },
  {
    brand: "DivaDance",
    bg: "bg-[#F0E8F9]",
    accent: "#7B1FA2",
    stat: "2,600+",
    statLabel: "Queries answered in 6 months",
    quote: "Saving 650+ hours of support time.",
    href: "/case-studies/divadance",
  },
];

export default function CaseStudyCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) setCurrent((c) => (c + (diff > 0 ? 1 : -1) + slides.length) % slides.length);
    touchStartX.current = null;
  }

  const slide = slides[current];

  return (
    <section className="w-full border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-8 text-center">
          Customer results
        </p>

        <div
          className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-[200px_1fr]"
            >
              {/* Brand panel */}
              <div className={`${slide.bg} flex flex-col items-center justify-center p-10 sm:p-12`}>
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-white/60 mb-3"
                >
                  <span className="text-2xl font-extrabold" style={{ color: slide.accent }}>
                    {slide.brand[0]}
                  </span>
                </div>
                <span className="text-sm font-bold" style={{ color: slide.accent }}>{slide.brand}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 sm:p-10 bg-white">
                <div
                  className="text-6xl font-extrabold leading-none mb-1"
                  style={{ color: slide.accent, letterSpacing: "-0.03em" }}
                >
                  {slide.stat}
                </div>
                <p className="text-base font-semibold text-gray-500 mb-5">{slide.statLabel}</p>
                <p className="text-lg font-medium text-[#0A0A0A] italic mb-6">
                  &ldquo;{slide.quote}&rdquo;
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: slide.accent }}
                >
                  Read case study <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-[#00AEEF]" : "w-2 bg-[#E5E7EB]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
