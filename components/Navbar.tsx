"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ThemeToggle";

/* ─── Nav data ─────────────────────────────────────────────
   Five top-level items, hard maximum, plus the CTA.
   Menu items are name + one-line description, no icons.
   ───────────────────────────────────────────────────────── */

type NavItem = { label: string; href: string; desc: string };
type NavGroup = { heading: string; items: NavItem[] };

/* Three groups by *when the work happens*, not by what the software is
   called: what a person asks for in the moment, what runs without being
   asked, and what everything else stands on.

   TODO: Apps, Automations and Control Center have no real pages yet.
   Automations is a stub; Apps and Control Center point at the homepage
   sections that already cover them, the same fallback the old Compliance
   Agent item used.

   Note Control Center is inconsistent right now: this entry points at
   `/#trust`, while the Reporting page links to `/platform/control-center`,
   a stub created for it. The reporting brief authorised the stub but
   explicitly forbade restructuring the nav, so the two were left
   disagreeing. Repoint this entry when that page is real. */
const platformGroups: NavGroup[] = [
  {
    heading: "On Demand",
    items: [
      { label: "Answers",          href: "/platform/answers",   desc: "Every question answered from your own material, scoped to who asks." },
      { label: "Reporting", href: "/platform/reporting", desc: "Any number, rendered however you ask." },
      { label: "Apps",             href: "/#capabilities",      desc: "Purpose-built tools your locations open on a phone." },
    ],
  },
  {
    heading: "Always On",
    items: [
      { label: "Workflows",   href: "/platform/workflows",   desc: "Recurring work runs on a schedule or a trigger." },
      { label: "Automations", href: "/platform/automations", desc: "Plays that fire the moment something changes." },
    ],
  },
  {
    heading: "Foundation",
    items: [
      { label: "Integrations",   href: "/platform/integrations", desc: "Connect what you already run. Nothing migrates." },
      { label: "Control Center", href: "/#trust",                desc: "Set who sees what and what runs without a human." },
      { label: "Trust Center",   href: "/security",              desc: "How your data is handled, stored, and kept yours." },
    ],
  },
];

const solutionsGroups: NavGroup[] = [
  {
    heading: "By role",
    items: [
      { label: "HQ team",     href: "/industries/franchising/franchisors",            desc: "Publish the standard, then watch it hold." },
      { label: "Coaches",     href: "/solutions/coaches",                             desc: "Walk into every call already prepared." },
      { label: "Franchisees", href: "/industries/franchising/multi-unit-franchisees", desc: "Answers and tools at the hour you work." },
    ],
  },
];

/* TODO: per-vertical industry pages do not exist yet; every vertical
   points at the /industries hub until they do. Universities and the
   multi-brand entry have real pages. */
const industriesGroups: NavGroup[] = [
  {
    heading: "By industry",
    items: [
      { label: "Home Services",          href: "/industries", desc: "Trades and route-based brands with crews in the field." },
      { label: "Health & Wellness",      href: "/industries", desc: "Studios, gyms, salons, and med-spa networks." },
      { label: "Senior Care",            href: "/industries", desc: "In-home care and community operators." },
      { label: "Child-care & Education", href: "/industries", desc: "Early learning, enrichment, and tutoring brands." },
      { label: "Food & Beverage",        href: "/industries", desc: "QSR, fast casual, and cafe networks." },
    ],
  },
  {
    heading: "Also serving",
    items: [
      { label: "Real-Estate",              href: "/industries",                desc: "Brokerages and property service networks." },
      { label: "Universities",             href: "/industries/universities",   desc: "Campus operations and student services." },
      { label: "Multi-brand and PE-backed", href: "/industries/multi-location", desc: "Platform companies running several concepts." },
      { label: "All Industries",           href: "/industries",                desc: "Every network we serve, in one place." },
    ],
  },
];

/* TODO: no pricing page exists yet; Pricing books the conversation
   instead of shipping a 404. */
const resourcesItems: NavItem[] = [
  { label: "Case Studies",   href: "/case-studies",       desc: "What brands changed, and what it returned." },
  { label: "Blog",           href: "/blog",               desc: "Franchise operations insights and product news." },
  { label: "Pricing",        href: "/speak-to-an-expert", desc: "Talk through plans with the team." },
  { label: "ROI Calculator", href: "/roi-calculator",     desc: "See what your network could recover." },
  { label: "Trust Center",   href: "/security",           desc: "Security, privacy, and how your data is handled." },
];

const companyItems: NavItem[] = [
  { label: "Why EZee?", href: "/why-ezeeassist", desc: "How purpose-built AI differs from a general assistant." },
  { label: "Careers",   href: "/careers",        desc: "Open roles across engineering and go to market." },
  { label: "Contact",   href: "/contact",        desc: "Talk to our team." },
];

/* Both marks share viewBox 0 0 583.2 151.2. Sized to the pill: 40px in a
   56px bar, 48px in a 64px bar, leaving 8px of breathing above and below.
   The intrinsic width/height below is only the aspect hint; the rendered
   size comes from the h-10/md:h-12 classes. */
const LOGO_H = 48;
const LOGO_W = Math.round((583.2 / 151.2) * LOGO_H);

type DropdownKey = "platform" | "solutions" | "industries" | "resources" | "company" | null;

/* ─── Menu primitives ──────────────────────────────────── */

function MenuLink({ item, onClose }: { item: NavItem; onClose: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
    >
      <span className="block text-[13.5px] text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ fontWeight: 500 }}>
        {item.label}
      </span>
      <span className="block text-[12px] mt-0.5 text-gray-500 dark:text-gray-400 leading-snug">
        {item.desc}
      </span>
    </Link>
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500" style={{ fontWeight: 600 }}>
      {children}
    </p>
  );
}

function GroupedPanel({ groups, onClose, width }: { groups: NavGroup[]; onClose: () => void; width: string }) {
  return (
    /* One column per group: Solutions carries a single group, the others
       two, and a hardcoded two-column grid left it half empty. */
    <div
      className={`grid gap-8 p-6 ${width}`}
      style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}
    >
      {groups.map((g) => (
        <div key={g.heading}>
          <GroupHeading>{g.heading}</GroupHeading>
          <div className="flex flex-col gap-0.5">
            {g.items.map((item) => (
              <MenuLink key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ListPanel({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-0.5 p-6 w-[340px]">
      {items.map((item) => (
        <MenuLink key={item.label} item={item} onClose={onClose} />
      ))}
    </div>
  );
}

/* ─── Navbar ───────────────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileSection, setMobileSection] = useState<DropdownKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  /* Which trigger opened the current dropdown, so Escape can hand focus back. */
  const triggerRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({});

  const pathname = usePathname();
  const isEditorial = pathname === "/";
  /* The pill overlays the hero, which only the homepage has. Every other
     route keeps the banded header it already had. */
  const floating = isEditorial;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeAll = useCallback(() => setActiveDropdown(null), []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  /* Escape closes whatever is open and returns focus to what opened it. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        closeMobile();
        burgerRef.current?.focus();
      } else if (activeDropdown) {
        const trigger = triggerRefs.current[activeDropdown];
        closeAll();
        trigger?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, activeDropdown, closeAll, closeMobile]);

  /* The sheet is modal, so focus moves into it and the page stops scrolling. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  /** Floating panel beneath the pill, same shadow language as the pill. */
  function DropdownWrapper({ keyName, children }: { keyName: DropdownKey; children: React.ReactNode }) {
    const open = activeDropdown === keyName;
    /* The wrapper padding doubles as the hover bridge between trigger and
       panel. On the pill it also has to clear the pill's own bottom edge,
       since the trigger is centred inside a 64px bar. */
    return (
      <div
        className={`absolute left-0 top-full z-50 transition-all duration-200 ${
          floating ? "pt-[1.75rem]" : "pt-3"
        } ${
          open
            ? "pointer-events-auto visible opacity-100 translate-y-0"
            : "pointer-events-none invisible opacity-0 -translate-y-1"
        }`}
      >
        <div
          className={`overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.10] bg-white dark:bg-[#141414] ${
            floating ? "shadow-[0_2px_12px_rgba(0,20,50,0.10)]" : ""
          }`}
        >
          {children}
        </div>
      </div>
    );
  }

  const bandedClasses = isEditorial
    ? scrolled
      ? "bg-[var(--ed-bg)]/90 backdrop-blur-md border-b border-[var(--ed-rule)]"
      : "bg-transparent border-b border-transparent"
    : scrolled
      ? "bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06]"
      : "bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-transparent";

  const triggerBase =
    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors duration-150";
  const triggerIdle = isEditorial
    ? "text-[var(--ed-fg)] hover:text-[#00AEEF]"
    : "text-gray-600 dark:text-gray-300 hover:text-[#00AEEF]";
  const triggerActive = "text-[#00AEEF]";

  const dropdowns: { key: Exclude<DropdownKey, null>; label: string; panel: React.ReactNode }[] = [
    { key: "platform",   label: "Platform",   panel: <GroupedPanel groups={platformGroups}   onClose={closeAll} width="w-[720px]" /> },
    { key: "solutions",  label: "Solutions",  panel: <GroupedPanel groups={solutionsGroups}  onClose={closeAll} width="w-[360px]" /> },
    { key: "industries", label: "Industries", panel: <GroupedPanel groups={industriesGroups} onClose={closeAll} width="w-[720px]" /> },
  ];

  /* Accordion body shared by the mobile sheet. */
  const mobileAccordions = (
    <ul className="flex flex-col gap-1">
      {[
        { key: "platform"   as const, label: "Platform",   groups: platformGroups },
        { key: "solutions"  as const, label: "Solutions",  groups: solutionsGroups },
        { key: "industries" as const, label: "Industries", groups: industriesGroups },
      ].map(({ key, label, groups }) => (
        <li key={key}>
          <button
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300"
            style={{ fontWeight: 500 }}
            onClick={() => setMobileSection(mobileSection === key ? null : key)}
            aria-expanded={mobileSection === key}
          >
            {label}
            <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobileSection === key ? "rotate-180" : ""}`} />
          </button>
          {mobileSection === key && (
            <div className="mt-1 ml-3 flex flex-col gap-2 border-l-2 border-[#00AEEF]/20 pl-4 pb-2">
              {groups.map((g) => (
                <div key={g.heading}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1" style={{ fontWeight: 600 }}>
                    {g.heading}
                  </p>
                  {g.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] transition-colors"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </li>
      ))}

      {[
        { key: "resources" as const, label: "Resources", items: resourcesItems },
        { key: "company"   as const, label: "Company",   items: companyItems },
      ].map(({ key, label, items }) => (
        <li key={key}>
          <button
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300"
            style={{ fontWeight: 500 }}
            onClick={() => setMobileSection(mobileSection === key ? null : key)}
            aria-expanded={mobileSection === key}
          >
            {label}
            <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobileSection === key ? "rotate-180" : ""}`} />
          </button>
          {mobileSection === key && (
            <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4 pb-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] transition-colors"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const mobileCta = (
    <div className="mt-4 flex items-center gap-3">
      <ThemeToggle />
      <Link href="/speak-to-an-expert" className="flex-1" onClick={closeMobile}>
        <Button size="sm" className="w-full ed-btn-arrow gap-2" style={{ paddingRight: "0.25rem", paddingLeft: "1.125rem" }}>
          Speak to an expert
          <span className="ed-btn-arrow-badge ed-btn-arrow-badge-sm" aria-hidden="true">
            <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
          </span>
        </Button>
      </Link>
    </div>
  );

  /* The bar itself. Identical contents in both variants; only the shell
     around it changes. */
  const bar = (
    <>
      {/* Logo. Both marks ship in the markup and the theme swap is
          pure CSS, so there is no flash on load or on toggle. */}
      <Link href="/" className="flex items-center flex-shrink-0" aria-label="EZee Assist home">
        <Image
          src="/logo-black.svg"
          alt="EZee Assist"
          width={LOGO_W}
          height={LOGO_H}
          priority
          unoptimized
          className="block dark:hidden h-10 md:h-12 w-auto"
        />
        <Image
          src="/logo-white.svg"
          alt=""
          aria-hidden="true"
          width={LOGO_W}
          height={LOGO_H}
          priority
          unoptimized
          className="hidden dark:block h-10 md:h-12 w-auto"
        />
      </Link>

      {/* Desktop nav */}
      <ul className="hidden nav:flex items-center gap-1">
        {dropdowns.map(({ key, label, panel }) => (
          <li
            key={key}
            className="relative"
            onMouseEnter={() => setActiveDropdown(key)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              ref={(el) => { triggerRefs.current[key] = el; }}
              className={`${triggerBase} ${activeDropdown === key ? triggerActive : triggerIdle}`}
              onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
              aria-expanded={activeDropdown === key}
            >
              {label}
              <ChevronDown
                size={13}
                strokeWidth={2.5}
                className={`transition-transform duration-200 ${activeDropdown === key ? "rotate-180" : ""}`}
              />
            </button>
            <DropdownWrapper keyName={key}>{panel}</DropdownWrapper>
          </li>
        ))}

        {/* Customers folded into Resources as Case Studies. */}

        {/* Resources */}
        <li
          className="relative"
          onMouseEnter={() => setActiveDropdown("resources")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button
            ref={(el) => { triggerRefs.current.resources = el; }}
            className={`${triggerBase} ${activeDropdown === "resources" ? triggerActive : triggerIdle}`}
            onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
            aria-expanded={activeDropdown === "resources"}
          >
            Resources
            <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
          </button>
          <DropdownWrapper keyName="resources">
            <ListPanel items={resourcesItems} onClose={closeAll} />
          </DropdownWrapper>
        </li>

        {/* Company */}
        <li
          className="relative"
          onMouseEnter={() => setActiveDropdown("company")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button
            ref={(el) => { triggerRefs.current.company = el; }}
            className={`${triggerBase} ${activeDropdown === "company" ? triggerActive : triggerIdle}`}
            onClick={() => setActiveDropdown(activeDropdown === "company" ? null : "company")}
            aria-expanded={activeDropdown === "company"}
          >
            Company
            <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180" : ""}`} />
          </button>
          <DropdownWrapper keyName="company">
            <ListPanel items={companyItems} onClose={closeAll} />
          </DropdownWrapper>
        </li>
      </ul>

      {/* Desktop CTA */}
      <div className="hidden nav:flex items-center gap-3">
        <ThemeToggle />
        <Link href="/speak-to-an-expert">
          <Button size="sm" className="ed-btn-arrow gap-2" style={{ paddingRight: "0.25rem", paddingLeft: "1.125rem" }}>
            Speak to an expert
            <span className="ed-btn-arrow-badge ed-btn-arrow-badge-sm" aria-hidden="true">
              <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
            </span>
          </Button>
        </Link>
      </div>

      {/* Mobile hamburger. `nav:` (1120px), not `md:` — see the breakpoint
          comment in globals.css. It now carries the whole 768–1119 range,
          which is why it is a full 44px box: `p-2` around a 22px icon
          measured 38x38, under both the 44px iOS guideline and the 24px
          WCAG 2.2 floor. Box only; the icon is unchanged. */}
      <button
        ref={burgerRef}
        className="nav:hidden flex h-11 w-11 items-center justify-center rounded-lg text-[#0A0A0A] dark:text-gray-300 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </>
  );

  /* ── Floating pill (homepage) ───────────────────────────
     Sticky rather than fixed, so an announcement bar above it still
     pushes it down. The negative bottom margin cancels the header's
     flow height, which is what lets the hero start at the top of the
     document and sit behind the pill. */
  if (floating) {
    return (
      <>
        <header
          ref={navRef}
          className="ed-nav sticky z-50 w-full px-4 md:px-6"
          style={{
            top: "var(--nav-inset)",
            marginBottom: "calc(-1 * var(--nav-pill-h))",
          }}
        >
          <nav
            className="ed-nav-surface mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl md:rounded-full px-4 md:px-6"
            style={{ height: "var(--nav-pill-h)" }}
            aria-label="Main"
          >
            {bar}
          </nav>
        </header>

        {/* Mobile sheet overlay */}
        {mobileOpen && (
          <div className="nav:hidden ed-nav-sheet">
            <button
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
              onClick={closeMobile}
              aria-label="Close menu"
              tabIndex={-1}
            />
            <div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed z-50 overflow-y-auto rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-white dark:bg-[#141414] shadow-[0_2px_12px_rgba(0,20,50,0.10)] px-4 py-4"
              style={{
                top: "calc(var(--nav-inset) + var(--nav-pill-h) + 8px)",
                left: "var(--nav-inset)",
                right: "var(--nav-inset)",
                maxHeight: "calc(100dvh - var(--nav-block) - 24px)",
              }}
            >
              {mobileAccordions}
              {mobileCta}
            </div>
          </div>
        )}
      </>
    );
  }

  /* ── Banded header (every other route) ──────────────── */
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${bandedClasses}`}>
      <nav
        ref={navRef}
        className={`mx-auto flex max-w-7xl items-center justify-between py-4 ${
          isEditorial ? "px-6 md:px-12 lg:px-16" : "px-6 lg:px-8"
        }`}
        aria-label="Main"
      >
        {bar}
      </nav>

      {mobileOpen && (
        <div className="nav:hidden border-t border-[#E5E7EB] dark:border-white/[0.06] bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md px-6 pb-6">
          <div className="pt-4">{mobileAccordions}</div>
          {mobileCta}
        </div>
      )}
    </header>
  );
}
