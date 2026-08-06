"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * The site footer. One component, every route.
 *
 * Three bands, each earning its row: identity and contact, AI summary,
 * legal.
 *
 * **The four-column link grid is deleted and must not come back.**
 * PLATFORM / SOLUTIONS / RESOURCES / TRUST held 17 links and every
 * destination is already in the primary nav, so the grid duplicated
 * navigation and was most of the footer's height. The only navigation
 * here now is the legal row, plus Trust Center, which is the one item
 * from that grid people go to a footer to find.
 *
 * **The footer is dark in both site themes**, so its colours are local
 * tokens rather than `--ed-*`: reading the theme tokens would flip it to
 * a light surface in dark mode, which is not what this band is.
 */

/* Footer-local palette. Dark in both themes, by design. */
const C = {
  bg: "#062033",
  fg: "#EAF2F8",
  muted: "#93A6B5",
  rule: "rgba(234,242,248,.1)",
  accent: "#38A9E5",
  chip: "rgba(234,242,248,.05)",
  chipBd: "rgba(234,242,248,.14)",
  chipBdHover: "rgba(234,242,248,.34)",
};

/**
 * **The white lockup, never a recreation.**
 *
 * `public/logo-white.svg` is the canonical vector: the real wordmark
 * with the ink in white and the blue mark preserved. Two wrong ways to
 * get here, both of which have been tried: hand-setting the wordmark in
 * Plus Jakarta Sans with a coloured "Zee" span, and applying
 * `filter: invert()` to the black lockup, which flattens the blue petals
 * to white and destroys the mark.
 *
 * The handoff asks for 34-38px. **Deliberately larger, on request.** The
 * SVG scales, so this is a single number.
 */
const LOGO_H = 60;
const LOGO_W = Math.round((583.2 / 151.2) * LOGO_H);

const AEO_QUERY =
  "What is EZee Assist and how do franchise and multi-location brands use it?";

/**
 * `icon` is a committed file under `public/logos/aeo/`, never hotlinked,
 * and each is the vendor's real mark rather than a drawing of it.
 *
 * The handoff asks for text-only pills OR real vendor marks as files,
 * specifically to stop anyone shipping hand-drawn approximations of
 * third-party trademarks. These are the real files, so the marks stay.
 *
 * Trademark: used unmodified, at small size, beside the vendor's own
 * name, implying no partnership or endorsement.
 */
const AEO_LINKS = [
  { label: "Ask ChatGPT",    icon: "/logos/aeo/chatgpt.png",    href: `https://chatgpt.com/?q=${encodeURIComponent(AEO_QUERY)}` },
  { label: "Ask Claude",     icon: "/logos/aeo/claude.png",     href: `https://claude.ai/new?q=${encodeURIComponent(AEO_QUERY)}` },
  { label: "Ask Perplexity", icon: "/logos/aeo/perplexity.png", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(AEO_QUERY)}` },
];

/** Trust Center leads: it is the one destination from the deleted grid
    that people open a footer looking for. */
const LEGAL_LINKS = [
  { label: "Trust Center",   href: "/security" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use",   href: "/terms" },
  { label: "Accessibility",  href: "/accessibility" },
];

/**
 * The provider mark on an "Ask ..." button.
 *
 * Renders nothing if the file is missing, so a pill degrades to
 * label-only rather than showing a broken image. `onError` is the only
 * guard there is; nothing checks at build time that the path resolves.
 * Decorative, so `alt` is empty: the visible label already names the
 * provider and would otherwise be announced twice.
 */
function AeoIcon({ src }: { src: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      className="flex-none object-contain"
      style={{ width: 16, height: 16 }}
      onError={() => setMissing(true)}
    />
  );
}

/** Hover moves a link from muted to full contrast, with no underline. */
function FooterLink({ href, children, className = "", style }: {
  href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const props = {
    className: `transition-colors ${className}`,
    style: { color: hover ? C.fg : C.muted, ...style },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  return external
    ? <a href={href} {...props} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
    : <Link href={href} {...props}>{children}</Link>;
}

function Pill({ href, children, label }: { href: string; children: React.ReactNode; label?: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full transition-colors"
      style={{
        padding: "10px 18px",
        background: C.chip,
        border: `1px solid ${hover ? C.chipBdHover : C.chipBd}`,
        color: C.fg,
        fontSize: 13.5,
        fontWeight: 500,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [mailHover, setMailHover] = useState(false);
  const [inHover, setInHover] = useState(false);
  /* Generated, not hardcoded: a stale copyright year is the classic
     footer bug and nobody notices it until January. */
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: C.bg, color: C.fg }}>
      <div className="mx-auto max-w-[1280px] px-6 pt-12 md:px-12 md:pt-14 lg:px-16">
        {/* ── Band 1: identity and contact ──────────────────
            Contact sits on the logo's line from lg up. That is what
            collapses the height the old footer was carrying; stacking it
            below is only for narrow widths. */}
        <div className="grid grid-cols-1 items-center gap-8 pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 lg:pb-10">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="EZee Assist home" className="inline-flex">
              <Image
                src="/logo-white.svg"
                alt="EZee Assist"
                width={LOGO_W}
                height={LOGO_H}
                className="w-auto"
                style={{ height: LOGO_H }}
                priority={false}
              />
            </Link>
            <p className="text-[16px] leading-[1.5]" style={{ color: C.muted }}>
              AI Operating System for Franchisee Success
            </p>
          </div>

          <div className="flex flex-none flex-wrap items-center gap-x-9 gap-y-4">
            <a
              href="mailto:sales@ezeeassist.com"
              className="whitespace-nowrap text-[15px] transition-colors"
              style={{ color: mailHover ? C.accent : C.fg }}
              onMouseEnter={() => setMailHover(true)}
              onMouseLeave={() => setMailHover(false)}
            >
              sales@ezeeassist.com
            </a>
            <a href="tel:+18557773933" className="whitespace-nowrap text-[15px]" style={{ color: C.muted }}>
              +1 855-777-3933
            </a>
            {/* Icon-only, so the accessible name has to come from the
                button and the glyph must not repeat it. */}
            <a
              href="https://www.linkedin.com/company/ez-assist"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex flex-none items-center justify-center rounded-full transition-colors"
              style={{
                width: 38, height: 38,
                background: C.chip,
                border: `1px solid ${inHover ? C.chipBdHover : C.chipBd}`,
                color: C.fg,
              }}
              onMouseEnter={() => setInHover(true)}
              onMouseLeave={() => setInHover(false)}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Band 2: AI summary ────────────────────────────── */}
        <div
          className="flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-10"
          style={{ borderTop: `1px solid ${C.rule}` }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3.5">
            {/* The only accent-coloured text in the footer. */}
            <span className="whitespace-nowrap text-[14.5px] font-semibold" style={{ color: C.accent }}>
              Request an AI summary
            </span>
            <span className="text-[14px]" style={{ color: C.muted }}>
              Ask your assistant what EZee Assist does and how franchise networks use it.
            </span>
          </div>
          <div className="flex flex-none flex-wrap items-center gap-2.5">
            {AEO_LINKS.map(({ label, icon, href }) => (
              <Pill key={label} href={href}>
                <AeoIcon src={icon} />
                {label}
              </Pill>
            ))}
          </div>
        </div>

        {/* ── Band 3: legal ─────────────────────────────────── */}
        <div
          className="flex flex-col gap-4 pb-8 pt-5 md:flex-row md:items-center md:justify-between md:gap-8"
          style={{ borderTop: `1px solid ${C.rule}` }}
        >
          <p className="text-[13.5px]" style={{ color: C.muted }}>
            © {year} EZee Assist. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Legal">
            {LEGAL_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href} className="text-[13.5px]">
                {label}
              </FooterLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
