"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Article = {
  label: string;
  /** 2-letter badge (e.g. "BK") for newsroom outlets */
  badge?: string;
  /** Use podcast icon instead of letter badge */
  isPodcast?: boolean;
  title: string;
  cta: string;
  href: string;
};

const articles: Article[] = [
  {
    label: "BetaKit",
    badge: "BK",
    title:
      "EZee Assist Reveals $1.85 Million in Funding to Help Franchises Manage Institutional Memory",
    cta: "Read article",
    href: "#",
  },
  {
    label: "Emerging Franchise Brands Podcast",
    isPodcast: true,
    title:
      "CEO Raphael Rohit Rajan on the EZee Assist Journey and AI in Franchising",
    cta: "Listen",
    href: "#",
  },
  {
    label: "Modern Business Podcast",
    isPodcast: true,
    title:
      "The Origin Story of EZee Assist — AI, Franchising, and the Future of Support",
    cta: "Listen",
    href: "#",
  },
];

function PodcastWaveIcon() {
  // Simple editorial podcast/audio wave glyph
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="4"  y1="9"  x2="4"  y2="15" />
        <line x1="9"  y1="6"  x2="9"  y2="18" />
        <line x1="14" y1="3"  x2="14" y2="21" />
        <line x1="19" y1="8"  x2="19" y2="16" />
      </g>
    </svg>
  );
}

function Badge({ article }: { article: Article }) {
  if (article.isPodcast) {
    return (
      <span
        className="flex items-center justify-center rounded-full"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          color: "var(--ed-accent)",
        }}
        aria-hidden="true"
      >
        <PodcastWaveIcon />
      </span>
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-full text-xs"
      style={{
        width: "44px",
        height: "44px",
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
        color: "var(--ed-fg)",
        fontFamily: "var(--font-editorial)",
        fontWeight: 500,
        letterSpacing: "0.04em",
      }}
      aria-hidden="true"
    >
      {article.badge}
    </span>
  );
}

export default function PressSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
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

        <span
          className="ed-rule-draw"
          data-visible={inView}
          aria-hidden="true"
        />

        {articles.map((a, i) => (
          <motion.a
            key={`${a.label}-${i}`}
            href={a.href}
            target={a.href === "#" ? undefined : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2 + i * 0.12,
            }}
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
            <div className="md:col-span-3 flex items-center gap-4">
              <Badge article={a} />
              <p
                className="ed-fg-muted text-xs"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {a.label}
              </p>
            </div>
            <p
              className="ed-fg md:col-span-7 text-2xl md:text-3xl"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              {a.title}
            </p>
            <p className="md:col-span-2 self-start md:self-end">
              <span className="ed-link text-base">{a.cta} →</span>
            </p>
          </motion.a>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
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
