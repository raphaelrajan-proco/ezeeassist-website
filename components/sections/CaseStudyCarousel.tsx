"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  {
    brand: "WSI",
    stat: "67%",
    statLabel: "Support reduction globally",
    quote: "Our franchisees have embraced this technology.",
    href: "/case-studies/wsi",
  },
  {
    brand: "DekaLash",
    stat: "93%",
    statLabel: "AI resolution rate",
    quote: "AI is now an expectation in franchisee support.",
    href: "/case-studies/dekalash",
  },
  {
    brand: "DivaDance",
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
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [paused]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40)
      setCurrent((c) => (c + (diff > 0 ? 1 : -1) + slides.length) % slides.length);
    touchStartX.current = null;
  }

  const slide = slides[current];

  return (
    <section className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <p className="ed-overline mb-12">Customer results</p>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
            >
              <div className="md:col-span-3">
                <p
                  className="ed-fg-muted text-xs"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {slide.brand}
                </p>
              </div>
              <div className="md:col-span-9">
                <p
                  className="ed-fg text-7xl md:text-8xl lg:text-9xl mb-6"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.9,
                  }}
                >
                  <span className="ed-accent">{slide.stat}</span>
                </p>
                <p
                  className="ed-fg text-xl md:text-2xl mb-8 max-w-2xl"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {slide.statLabel}
                </p>
                <p
                  className="ed-fg-muted text-lg md:text-xl italic mb-10 max-w-2xl"
                  style={{ lineHeight: 1.4 }}
                >
                  &ldquo;{slide.quote}&rdquo;
                </p>
                <Link href={slide.href} className="ed-link text-base">
                  Read case study →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-3 mt-16">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "48px" : "16px",
                backgroundColor:
                  i === current ? "var(--ed-accent)" : "var(--ed-rule)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
