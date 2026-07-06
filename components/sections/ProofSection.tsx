"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LogoMarquee from "./LogoMarquee";

/**
 * Section 8 — Proof. Franchise credibility: the logo marquee, three
 * stat callouts, the Paul Preston marquee quote with two supporting
 * quotes, and a partner badge strip.
 */

const stats = [
  { end: 67, suffix: "%", label: "Ticket reduction in 30 days", brand: "WSI · 500+ locations" },
  { end: 94, suffix: "%", label: "AI deflection during Mindbody migration", brand: "DekaLash · 120 locations" },
  { end: 650, suffix: "+", label: "Support hours saved in 6 months", brand: "DivaDance · 50 locations" },
];

const SUPPORTING_QUOTES = [
  {
    quote:
      "EZee Assist's solution and desire to solve problems has made them a key partner for EverLine. Our franchisees have embraced this technology.",
    name: "John Evans",
    title: "Founder & CEO, EverLine Coatings & Services",
  },
  {
    quote:
      "AI is now an expectation in franchisee support. Our owners get accurate, brand-specific answers 24/7 while our team focuses on bigger initiatives.",
    name: "Troy McCullen",
    title: "VP of Operations, DekaLash",
  },
];

const PARTNER_BADGES = [
  { name: "IFA Supplier Forum",  src: "/logos/partners/ifa-supplier-forum.svg" },
  { name: "CFA Member",          src: "/logos/partners/cfa-member.svg" },
  { name: "FSN Verified Member", src: "/logos/partners/fsn-verified-member.svg" },
  { name: "WSI Partner",         src: "/logos/partners/wsi-partner.svg" },
];

/**
 * Partner badge — next/image pointing at /logos/partners/, falling back
 * to a pill (matching the integrations pill-grid style) until the real
 * badge images are uploaded.
 */
function PartnerBadge({ badge }: { badge: (typeof PARTNER_BADGES)[number] }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="inline-flex items-center rounded-full px-4 py-2 text-sm"
        style={{
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          color: "var(--ed-fg)",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.005em",
        }}
      >
        {badge.name}
      </span>
    );
  }

  return (
    <Image
      src={badge.src}
      alt={badge.name}
      width={140}
      height={40}
      className="max-h-10 w-auto object-contain"
      style={{ opacity: 0.75 }}
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Server HTML contains the final value (SEO and AI crawlers see the real
 * number); on hydration + scroll-in the value animates 0 → end once.
 * prefers-reduced-motion skips the animation entirely.
 */
function AnimatedValue({
  end,
  suffix,
  inView,
}: {
  end: number;
  suffix: string;
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(end); // SSR renders the final value

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let raf: number;
    const duration = 2500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, end]);

  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
}

function StatCallout({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <p
        className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em]"
        style={{
          color: "#00AEEF",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          lineHeight: 0.95,
        }}
      >
        <AnimatedValue end={stat.end} suffix={stat.suffix} inView={inView} />
      </p>
      <p
        className="ed-fg mt-5 text-lg md:text-xl max-w-xs"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.25 }}
      >
        {stat.label}
      </p>
      <p
        className="ed-fg-muted mt-2 text-xs"
        style={{ fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}
      >
        {stat.brand}
      </p>
    </motion.div>
  );
}

export default function ProofSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-100px" });

  // Named customers only for the credibility grid

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p className="ed-overline mb-8">Proof</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            60+ brands. 4,500+ locations.{" "}
            <span className="ed-accent">All building on EZee.</span>
          </h2>
        </motion.div>

        {/* Logo marquee (shared component) */}
        <div className="mb-24 md:mb-32">
          <LogoMarquee />
        </div>

        {/* Stat callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 md:mb-32">
          {stats.map((s, i) => (
            <StatCallout key={s.brand} stat={s} index={i} />
          ))}
        </div>

        {/* Marquee testimonial */}
        <div ref={quoteRef} className="max-w-5xl">
          <span
            aria-hidden="true"
            className="ed-accent block"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontSize: "6rem",
              lineHeight: 0.5,
              opacity: 0.35,
            }}
          >
            &ldquo;
          </span>
          <motion.blockquote
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={
              quoteInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="ed-fg text-5xl md:text-6xl mt-4"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            EZee Assist has transformed our business.
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="ed-fg-muted mt-10 text-base md:text-lg"
          >
            <span className="ed-fg" style={{ fontWeight: 500 }}>
              Paul Preston
            </span>
            , CEO, Aqua-Tots Swim School{" "}
            <span style={{ opacity: 0.7 }}>· 160 locations</span>
          </motion.p>
        </div>

        {/* Supporting testimonials — quieter than the marquee */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl">
          {SUPPORTING_QUOTES.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className={i === 1 ? "md:pl-16 md:border-l" : ""}
              style={i === 1 ? { borderColor: "var(--ed-rule)" } : {}}
            >
              <blockquote
                className="ed-fg text-lg md:text-xl"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="ed-fg-muted mt-4 text-sm">
                <span className="ed-fg" style={{ fontWeight: 500 }}>
                  {t.name}
                </span>
                , {t.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner badge strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20 md:mt-24 pt-10"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          <p
            className="ed-fg-muted text-xs mb-6"
            style={{
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Trusted across the franchise community
          </p>
          <div className="flex flex-wrap gap-3">
            {PARTNER_BADGES.map((b) => (
              <PartnerBadge key={b.name} badge={b} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
