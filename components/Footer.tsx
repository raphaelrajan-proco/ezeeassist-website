"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Share2, Link2, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { CLOSING_BASE } from "@/components/growth/closing-band";

/* ── Link data ─────────────────────────────────────────────
   Mirrors the navbar's five buckets. Change the nav and change this, or
   the two drift. TODOs from the nav apply here too: Coaching and
   Compliance Agent pages, per-vertical industry pages and a pricing page
   do not exist yet, so those links point at the nearest live surface.
   ───────────────────────────────────────────────────────── */

/* ── Temporarily hidden ────────────────────────────────────
   Mirrors the nav's cut-down. **Nothing is deleted**: every link is still
   here in order, and restoring one is removing it from HIDDEN or, for a
   whole column, from HIDDEN_COLUMNS. Keep this in step with the matching
   block in Navbar.tsx.

   Trust Center leaves the Platform column only; it stays under Resources,
   which is where it now lives. Why EZee? was promoted out of Company to a
   standalone nav link, and lands in the footer's Resources column since a
   one-item column would read as a mistake. */
const HIDDEN = new Set<string>([
  "Platform:Trust Center",
  "Solutions:Franchisees",
  "Resources:Blog",
  "Resources:Pricing",
  "Resources:ROI Calculator",
]);
const HIDDEN_COLUMNS = new Set<string>(["Industries", "Company"]);

const shown = (heading: string, links: { label: string; href: string }[]) =>
  links.filter((l) => !HIDDEN.has(`${heading}:${l.label}`));
const notHidden = (heading: string) => !HIDDEN_COLUMNS.has(heading);

/* Track counts follow the visible columns. Hardcoding them left empty
   slots and a dead right half once Industries and Company were hidden.
   Literal classes rather than a template string, because Tailwind only
   generates what it can see in the source. */
const BANDED_GRID: Record<number, string> = {
  1: "lg:grid-cols-[1.6fr_repeat(1,_1fr)]",
  2: "lg:grid-cols-[1.6fr_repeat(2,_1fr)]",
  3: "lg:grid-cols-[1.6fr_repeat(3,_1fr)]",
  4: "lg:grid-cols-[1.6fr_repeat(4,_1fr)]",
};
const EDITORIAL_GRID: Record<number, string> = {
  3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6",
};

/* Mirrors the nav's three Platform groups in order: On Demand, then
   Always On, then Foundation. Keep the two in step. */
const platformLinks = [
  { label: "Answers",          href: "/platform/answers" },
  { label: "Reporting",        href: "/platform/reporting" },
  { label: "Apps",             href: "/platform/apps" },
  { label: "Workflows",        href: "/platform/workflows" },
  { label: "Compliance",       href: "/platform/compliance" },
  { label: "Ticketing",        href: "/platform/ticketing" },
  { label: "Integrations",     href: "/platform/integrations" },
  { label: "Control Center",   href: "/platform/control-center" },
  { label: "Trust Center",     href: "/security" },
];

const solutionsLinks = [
  { label: "HQ Leadership", href: "/solutions/leadership" },
  { label: "Coaches",     href: "/solutions/coaches" },
  { label: "Franchisees", href: "/industries/franchising/multi-unit-franchisees" },
];

const industriesLinks = [
  { label: "Home Services",           href: "/industries" },
  { label: "Health & Wellness",       href: "/industries" },
  { label: "Senior Care",             href: "/industries" },
  { label: "Child-care & Education",  href: "/industries" },
  { label: "Food & Beverage",         href: "/industries" },
  { label: "Real-Estate",             href: "/industries" },
  { label: "Universities",            href: "/industries/universities" },
  { label: "Multi-brand and PE-backed", href: "/industries/multi-location" },
  { label: "All Industries",          href: "/industries" },
];

const resourcesLinks = [
  { label: "Case Studies",   href: "/case-studies" },
  { label: "Why EZee?",      href: "/why-ezeeassist" },
  { label: "Blog",           href: "/blog" },
  { label: "Pricing",        href: "/speak-to-an-expert" },
  { label: "ROI Calculator", href: "/roi-calculator" },
  { label: "Trust Center",   href: "/security" },
];

const companyLinks = [
  { label: "Careers",   href: "/careers" },
  { label: "Contact",   href: "/contact" },
];

/* Banded footer (every route but the homepage): four columns, legal
   links live in the bottom bar. */
const footerLinks = {
  Platform: platformLinks,
  Industries: industriesLinks,
  Resources: resourcesLinks,
  Company: companyLinks,
};

/* ── Editorial (homepage) footer: six columns ──────────────
   The nav's five buckets plus Trust. Compare was dropped by request. */
const editorialFooterColumns: { heading: string; links: { label: string; href: string }[] }[] = [
  { heading: "Platform",   links: platformLinks },
  { heading: "Solutions",  links: solutionsLinks },
  { heading: "Industries", links: industriesLinks },
  { heading: "Resources",  links: resourcesLinks },
  { heading: "Company",    links: companyLinks },
  {
    heading: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy",  href: "/privacy" },
      { label: "Terms",    href: "/terms" },
    ],
  },
];

/** Gate for the answer-engine + newsletter band under the tagline. */
const SHOW_AEO_BLOCK = true;

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

/* Routes whose last section fades to CLOSING_BASE, so they need the
   editorial footer to continue that band. Anything else gets the light
   footer, which would meet the fade as a hard seam. */
const EDITORIAL_FOOTER = new Set(["/", "/speak-to-an-expert"]);

/** The banded footer's visible link columns, used for both the grid
    template and the render, so they cannot drift apart. */
const bandedColumns = Object.entries(footerLinks).filter(([h]) => notHidden(h));
/** Same, for the editorial footer's six-column block. */
const editorialColumns = editorialFooterColumns.filter((c) => notHidden(c.heading));

export default function Footer() {
  const pathname = usePathname();

  if (EDITORIAL_FOOTER.has(pathname)) {
    return <FooterEditorial />;
  }

  return (
    <footer className="w-full border-t border-[#E5E7EB] dark:border-white/[0.06] bg-[#F7F8FA] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-8">

        {/* Top grid */}
        {/* Track count follows the visible columns. Hardcoding four left
            two empty slots and a dead right half once Industries and
            Company were hidden. */}
        <div className={`grid grid-cols-2 gap-10 ${BANDED_GRID[bandedColumns.length] ?? BANDED_GRID[4]}`}>

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
          {bandedColumns.map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {shown(heading, links).map((link) => (
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
    /* Continues the closing band: FinalCTA's bottom fade resolves to this
       exact colour, so there is no seam and no rule between them.
       ed-on-dark pins the dark token set for the light-mode page. */
    <footer className="ed-on-dark w-full" style={{ backgroundColor: CLOSING_BASE }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-14 md:pt-16 pb-12">

        {/* Wordmark + tagline. Both marks ship; the swap is pure CSS. */}
        <Link href="/" className="inline-block" aria-label="EZee Assist home">
          {/* Always the white mark: the band is dark in both themes. */}
          <Image
            src="/logo-white.svg"
            alt="EZee Assist"
            width={FOOTER_LOGO_W}
            height={FOOTER_LOGO_H}
            unoptimized
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        {/* One line at every width; nowrap plus a clamp rather than a
            wrapping paragraph. */}
        <p
          className="mt-8 whitespace-nowrap"
          style={{
            /* Brighter than the muted cream: near-white by request. */
            color: "#FFFFFF",
            lineHeight: 1.5,
            fontWeight: 400,
            fontSize: "clamp(0.8125rem, 0.36rem + 1.86vw, 1.25rem)",
          }}
        >
          AI Operating System for Franchisee Success
        </p>

        {/* Answer engines + newsletter, one band directly under the
            tagline and above the columns. No divider by request. */}
        {SHOW_AEO_BLOCK && (
          <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-12">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
              <p
                className="text-[15px] whitespace-nowrap flex-none"
                style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}
              >
                Request an AI summary
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-sm max-w-[19rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                  Ask your assistant what EZee Assist does and how franchise
                  networks use it.
                </p>
                {/* Chips measured 34px tall and are now 44, from min-height
                    rather than py, so the label keeps its 13px. Same for the
                    subscribe button below and the two link groups further
                    down: box only, no type changes. */}
                <div className="flex flex-wrap gap-2 max-w-none">
                  {aeoLinks.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center rounded-full px-3.5 text-[13px] transition-opacity hover:opacity-70"
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
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
              <p
                className="text-[15px] whitespace-nowrap flex-none"
                style={{ color: "var(--ed-accent-text)", fontWeight: 600 }}
              >
                Get the latest insights
              </p>
              {/* TODO: no subscribe endpoint exists yet. This matches the
                  blog's strip, which is also a no-op, and needs wiring to
                  the real list before launch. */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative w-full max-w-sm"
              >
                <label htmlFor="footer-email" className="sr-only">Business email</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Business Email"
                  className="w-full rounded-lg py-3 pl-4 pr-14 text-sm outline-none"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--ed-rule)",
                    color: "var(--ed-fg)",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  style={{ width: 44, height: 44, backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Six columns */}
        <div className={`mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 ${EDITORIAL_GRID[editorialColumns.length] ?? EDITORIAL_GRID[6]}`}>
          {editorialColumns.map((col) => (
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
                {shown(col.heading, col.links).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="ed-fg inline-flex min-h-[24px] items-center text-sm transition-opacity hover:opacity-60"
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

        {/* Contact + social */}
        <div
          className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 pt-10"
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
            <Link href="/privacy"       className="ed-fg-muted inline-flex min-h-[24px] items-center hover:opacity-60 transition-opacity">Privacy Policy</Link>
            <Link href="/terms"         className="ed-fg-muted inline-flex min-h-[24px] items-center hover:opacity-60 transition-opacity">Terms of Use</Link>
            <Link href="/accessibility" className="ed-fg-muted inline-flex min-h-[24px] items-center hover:opacity-60 transition-opacity">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
