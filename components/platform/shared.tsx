"use client";

import { motion } from "framer-motion";

/**
 * Section furniture shared by the Platform pages, built on the editorial
 * system (see DESIGN.md). The homepage's own sections are content-
 * hardcoded singletons with no props, so they cannot be reused directly;
 * this is the props-driven layer that carries their look across the
 * pages that came after.
 *
 * The house section pattern is: mono uppercase eyebrow, a bold H2, one
 * supporting line, then the visual. `SectionHead` renders exactly that.
 */

export const JAKARTA = "var(--font-editorial)";
export const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
export const EASE = [0.22, 1, 0.36, 1] as const;

/* Accent that carries white text and reads on white at small sizes.
   #00AEEF fails both tests at 2.53:1; this is 4.99:1. See DESIGN.md. */
export const ACCENT = "#0077A8";
export const ACCENT_TINT = "rgba(0,119,168,0.06)";
export const ACCENT_TINT_STRONG = "rgba(0,119,168,0.11)";
export const WARN = "#B45309";
export const DANGER = "#B42318";

/** Every product mockup on these pages: white, hairline, soft lift. */
export const CARD: React.CSSProperties = {
  backgroundColor: "var(--ed-card)",
  border: "1px solid var(--ed-border)",
  borderRadius: "14px",
};

export function Eyebrow({ children, accent = false }: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className="uppercase"
      style={{
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: "0.16em",
        fontWeight: 600,
        color: accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)",
      }}
    >
      {children}
    </p>
  );
}

/** Mono uppercase metadata, the STORE #118 · SHIFT LEAD · 9:14AM form. */
export function Meta({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="uppercase"
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.13em",
        fontWeight: 600,
        color: color ?? "var(--ed-fg-muted)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, accentEyebrow, title, sub, className = "" }: {
  eyebrow?: string;
  accentEyebrow?: boolean;
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div className="mb-4">
          <Eyebrow accent={accentEyebrow}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className="ed-fg leading-[1.08] tracking-[-0.03em]"
        style={{
          fontFamily: JAKARTA,
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)",
          textWrap: "pretty",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="ed-fg-muted mt-4 text-base md:text-lg leading-relaxed">{sub}</p>
      )}
    </motion.div>
  );
}

/** Standard band. `alt` gives the grey surface that separates neighbours. */
export function Band({ children, alt = false, id, className = "" }: {
  children: React.ReactNode;
  alt?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full scroll-mt-24 ${alt ? "ed-bg-alt" : "ed-bg"} ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
        {children}
      </div>
    </section>
  );
}

export function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A muted, uniformly sized text chip. Used wherever a brand logo would
    go: only nine integration SVGs are committed and none of the
    franchise-native ones, so text is the honest and consistent option.
    Never reference a CDN for a logo. */
export function TextChip({ children, tone = "muted" }: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  const accent = tone === "accent";
  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1"
      style={{
        fontSize: 12.5,
        fontWeight: 500,
        lineHeight: 1.3,
        color: accent ? "var(--ed-accent-text)" : "var(--ed-fg-muted)",
        backgroundColor: accent ? ACCENT_TINT : "var(--ed-card-alt)",
        border: `1px solid ${accent ? "rgba(0,119,168,0.22)" : "var(--ed-border)"}`,
      }}
    >
      {children}
    </span>
  );
}

/** Source chips under an answer: small, accent-tinted, accent text. */
export function SourceChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5"
      style={{
        fontFamily: MONO,
        fontSize: 10.5,
        fontWeight: 500,
        color: "var(--ed-accent-text)",
        backgroundColor: ACCENT_TINT,
        border: "1px solid rgba(0,119,168,0.2)",
      }}
    >
      {children}
    </span>
  );
}

/* ── Governance band ───────────────────────────────────────
   Four label/value pairs on the dark surface, the homepage's closing
   treatment. Shared by both Platform pages, which is why it takes its
   items and its link as props. */
export function GovernanceBand({ items, href, cta }: {
  items: { label: string; body: string; emphasis?: boolean }[];
  href: string;
  cta: string;
}) {
  return (
    <section className="w-full" style={{ backgroundColor: "#0B1220" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.08}>
              <div
                style={
                  it.emphasis
                    ? { borderTop: `2px solid ${"#4FC3F7"}`, paddingTop: 14 }
                    : { borderTop: "1px solid rgba(238,242,248,0.16)", paddingTop: 15 }
                }
              >
                <span
                  className="uppercase"
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    fontWeight: 600,
                    color: it.emphasis ? "#9FE0F8" : "rgba(238,242,248,0.55)",
                  }}
                >
                  {it.label}
                </span>
                <p
                  className="mt-2.5 text-[15px] leading-relaxed"
                  style={{ color: "rgba(238,242,248,0.92)" }}
                >
                  {it.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <a
          href={href}
          className="mt-10 inline-block text-sm"
          style={{ color: "#9FE0F8", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 4 }}
        >
          {cta}
        </a>
      </div>
    </section>
  );
}
