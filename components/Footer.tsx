"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Share2, Link2 } from "lucide-react";
import { usePathname } from "next/navigation";

const footerLinks = {
  Platform: [
    { label: "Platform Overview", href: "/solution" },
    { label: "Answers",           href: "/#answers" },
    { label: "Workflows",         href: "/#workflows" },
    { label: "Reporting",         href: "/#reporting" },
    { label: "AI Apps",           href: "/#ai-apps" },
    { label: "Ticketing",         href: "/solution/ticketing" },
    { label: "Integrations",      href: "/#connections" },
    { label: "Governance",        href: "/#trust" },
  ],
  Industries: [
    { label: "Franchising",         href: "/industries/franchising" },
    { label: "Multi-Location",      href: "/industries/multi-location" },
    { label: "Universities",        href: "/industries/universities" },
  ],
  Resources: [
    { label: "Blog",           href: "/blog" },
    { label: "Case Studies",   href: "/case-studies" },
    { label: "Why EZee Assist",href: "/why-ezeeassist" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "Changelog",      href: "/changelog" },
    { label: "Security",       href: "/security" },
  ],
  Company: [
    { label: "Careers",       href: "/careers" },
    { label: "Contact",       href: "/contact" },
    { label: "Privacy Policy",href: "/privacy" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

/* ── Editorial (homepage) footer: six columns ──────────────
   TODO: Build the dedicated comparison pages. The Compare column points at
   /why-ezeeassist for now rather than shipping three empty routes.
   ───────────────────────────────────────────────────────── */
const editorialFooterColumns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Overview",       href: "/solution" },
      { label: "Unified Answers",href: "/#capabilities" },
      { label: "Compliance",     href: "/#capabilities" },
      { label: "Workflows",      href: "/solution/agents" },
      { label: "Reporting",      href: "/#capabilities" },
      { label: "AI Apps",        href: "/#capabilities" },
      { label: "Control Plane",  href: "/#trust" },
      { label: "Integrations",   href: "/#connections" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Coaches and FBCs",      href: "/industries/franchising" },
      { label: "Franchisor HQ",         href: "/industries/franchising/franchisors" },
      { label: "Franchisees and Teams", href: "/industries/franchising/multi-unit-franchisees" },
      { label: "Support deflection",    href: "/#capabilities" },
      { label: "Compliance",            href: "/#capabilities" },
      { label: "Growth coaching",       href: "/#the-week" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Franchising",    href: "/industries/franchising" },
      { label: "Multi-Location", href: "/industries/multi-location" },
      { label: "Universities",   href: "/industries/universities" },
    ],
  },
  {
    heading: "Compare",
    links: [
      { label: "vs generic AI assistants",   href: "/why-ezeeassist" },
      { label: "vs franchise ops platforms", href: "/why-ezeeassist" },
      { label: "vs building it yourself",    href: "/why-ezeeassist" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",     href: "/about" },
      { label: "Customers", href: "/case-studies" },
      { label: "Careers",   href: "/careers" },
      { label: "Contact",   href: "/contact" },
      { label: "Blog",      href: "/blog" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy",  href: "/privacy" },
      { label: "Terms",    href: "/terms" },
    ],
  },
];

/**
 * Launch gate. The AEO block is built and kept, but stays off until
 * after publish. Flip to true to restore it.
 */
const SHOW_AEO_BLOCK = false;

/* Both marks share viewBox 0 0 583.2 151.2. */
const FOOTER_LOGO_H = 64;
const FOOTER_LOGO_W = Math.round((583.2 / 151.2) * FOOTER_LOGO_H);

/** Pre-filled queries so answer engines can summarize the product. */
const AEO_QUERY =
  "What is EZee Assist and how do franchise and multi-location brands use it?";
const aeoLinks = [
  { label: "Ask ChatGPT",    href: `https://chatgpt.com/?q=${encodeURIComponent(AEO_QUERY)}` },
  { label: "Ask Claude",     href: `https://claude.ai/new?q=${encodeURIComponent(AEO_QUERY)}` },
  { label: "Ask Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(AEO_QUERY)}` },
];

const socialLinks = [
  { label: "LinkedIn",   href: "https://www.linkedin.com/company/ez-assist", icon: Link2  },
  { label: "X / Twitter",href: "https://x.com/ezeeassist",               icon: Share2 },
  { label: "Facebook",   href: "https://facebook.com/ezeeassist",         icon: Globe  },
];

export default function Footer() {
  const pathname = usePathname();
  const isEditorial = pathname === "/";

  if (isEditorial) {
    return <FooterEditorial />;
  }

  return (
    <footer className="w-full border-t border-[#E5E7EB] dark:border-white/[0.06] bg-[#F7F8FA] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.6fr_repeat(4,_1fr)]">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0]">
                EZee <span className="text-[#00AEEF]">Assist</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[260px] text-sm leading-6 text-gray-500 dark:text-gray-400">
              The AI platform franchise and multi-location brands build on.
            </p>

            <div className="mt-5 space-y-1">
              <a
                href="mailto:sales@ezeeassist.com"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
              >
                sales@ezeeassist.com
              </a>
              <a
                href="tel:+18557773933"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
              >
                +1 855-777-3933
              </a>
            </div>

            <div className="mt-6 flex gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-gray-400 hover:border-[#00AEEF] hover:text-[#00AEEF] dark:hover:border-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors shadow-sm"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-[#E5E7EB] dark:border-white/[0.06] pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} EZee Assist. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/privacy"       className="hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors">Privacy Policy</Link>
            <Link href="/terms"         className="hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────────────────────────────
   Editorial footer — newspaper-style, generous whitespace,
   typography-driven. Used only on the homepage today.
   ─────────────────────────────────────────────────────────── */
function FooterEditorial() {
  return (
    <footer className="w-full ed-bg" style={{ borderTop: "1px solid var(--ed-rule)" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-12">

        {/* Wordmark + tagline. Both marks ship; the swap is pure CSS. */}
        <Link href="/" className="inline-block" aria-label="EZee Assist home">
          <Image
            src="/logo-black.svg"
            alt="EZee Assist"
            width={FOOTER_LOGO_W}
            height={FOOTER_LOGO_H}
            unoptimized
            className="block dark:hidden h-14 md:h-16 w-auto"
          />
          <Image
            src="/logo-white.svg"
            alt=""
            aria-hidden="true"
            width={FOOTER_LOGO_W}
            height={FOOTER_LOGO_H}
            unoptimized
            className="hidden dark:block h-14 md:h-16 w-auto"
          />
        </Link>

        <p
          className="ed-fg-muted mt-10 max-w-md text-lg md:text-xl"
          style={{ lineHeight: 1.5, fontWeight: 400 }}
        >
          The execution layer for franchise networks.
        </p>

        {/* Six columns */}
        <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-8">
          {editorialFooterColumns.map((col) => (
            <div key={col.heading}>
              <p
                className="ed-fg-muted text-[10px] mb-5"
                style={{
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="ed-fg text-sm transition-opacity hover:opacity-60"
                      style={{ fontWeight: 400 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AEO block: hand the page to answer engines. Behind SHOW_AEO_BLOCK. */}
        {SHOW_AEO_BLOCK && (
        <div
          className="mt-20 md:mt-24 pt-12"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          <p
            className="ed-fg text-lg md:text-xl tracking-[-0.02em] mb-2"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
          >
            Request an AI summary
          </p>
          <p className="ed-fg-muted text-sm mb-5 max-w-xl leading-relaxed">
            Ask your assistant what EZee Assist does and how franchise networks use it.
          </p>
          <div className="flex flex-wrap gap-3">
            {aeoLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-4 py-2 text-sm transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: "var(--ed-card)",
                  border: "1px solid var(--ed-rule)",
                  color: "var(--ed-fg)",
                  fontWeight: 500,
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        )}

        {/* Contact + social */}
        <div
          className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 pt-12"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          <div className="md:col-span-6">
            <a href="mailto:sales@ezeeassist.com" className="ed-link block text-lg mb-2">
              sales@ezeeassist.com
            </a>
            <a href="tel:+18557773933" className="ed-fg-muted block text-base">
              +1 855-777-3933
            </a>
          </div>
          <div className="md:col-span-6 flex items-end gap-6 md:justify-end">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-link text-base"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom legal */}
        <div
          className="mt-16 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          <p className="ed-fg-muted text-sm">
            &copy; {new Date().getFullYear()} EZee Assist. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy"       className="ed-fg-muted hover:opacity-60 transition-opacity">Privacy Policy</Link>
            <Link href="/terms"         className="ed-fg-muted hover:opacity-60 transition-opacity">Terms of Use</Link>
            <Link href="/accessibility" className="ed-fg-muted hover:opacity-60 transition-opacity">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
