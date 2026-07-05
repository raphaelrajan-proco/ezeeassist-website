"use client";

import Link from "next/link";
import { Globe, Share2, Link2 } from "lucide-react";
import { usePathname } from "next/navigation";

const footerLinks = {
  Platform: [
    { label: "Platform Overview", href: "/solution" },
    { label: "Integrations",      href: "/solution/integrations" },
    { label: "Ticketing",         href: "/solution/ticketing" },
    { label: "Agents",            href: "/solution/agents" },
    { label: "ROI Calculator",    href: "/roi-calculator" },
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

const socialLinks = [
  { label: "LinkedIn",   href: "https://linkedin.com/company/ezeeassist", icon: Link2  },
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

        {/* Massive wordmark */}
        <Link href="/" className="inline-block">
          <span
            className="ed-fg text-7xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
            }}
          >
            EZee <span className="ed-accent">Assist.</span>
          </span>
        </Link>

        <p
          className="ed-fg-muted mt-12 max-w-md text-lg md:text-xl"
          style={{ lineHeight: 1.5, fontWeight: 400 }}
        >
          The AI platform franchise and multi-location brands build on.
        </p>

        {/* Nav grid */}
        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p
                className="ed-fg-muted text-xs mb-6"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="ed-fg text-base md:text-lg transition-opacity hover:opacity-60"
                      style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + social */}
        <div
          className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 pt-12"
          style={{ borderTop: "1px solid var(--ed-rule)" }}
        >
          <div className="md:col-span-6">
            <a href="mailto:sales@ezeeassist.com" className="ed-link block text-lg md:text-xl mb-2">
              sales@ezeeassist.com
            </a>
            <a href="tel:+18557773933" className="ed-fg-muted block text-base md:text-lg">
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
