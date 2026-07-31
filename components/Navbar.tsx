"use client";

import { useState, useEffect, useRef } from "react";
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

const platformGroups: NavGroup[] = [
  {
    heading: "Capabilities",
    items: [
      { label: "Overview",            href: "/solution",              desc: "The execution layer for franchise networks." },
      { label: "Unified Answers",     href: "/#capabilities",         desc: "One place operators ask, on the channel they use." },
      { label: "Compliance at Scale", href: "/#capabilities",         desc: "Locations checked continuously against your standard." },
      { label: "Workflows",           href: "/solution/agents",       desc: "Recurring work runs on a schedule or a trigger." },
      { label: "Reporting",           href: "/#capabilities",         desc: "Live performance without a request queue." },
      { label: "AI Apps",             href: "/#capabilities",         desc: "Describe the tool your network needs." },
    ],
  },
  {
    heading: "Control",
    items: [
      { label: "Control Plane",  href: "/#trust",                desc: "Set who sees what and what runs without a human." },
      { label: "Integrations",   href: "/solution/integrations", desc: "250+ native connections. No migration." },
      { label: "Security",       href: "/security",              desc: "Dedicated infrastructure, encrypted end to end." },
    ],
  },
];

const solutionsGroups: NavGroup[] = [
  {
    heading: "By role",
    items: [
      { label: "Coaches and FBCs",      href: "/industries/franchising",                           desc: "Walk into every call already prepared." },
      { label: "Franchisor HQ",         href: "/industries/franchising/franchisors",               desc: "Publish the standard, then watch it hold." },
      { label: "Franchisees and Teams", href: "/industries/franchising/multi-unit-franchisees",    desc: "Answers and tools at the hour you work." },
    ],
  },
  {
    heading: "By outcome",
    items: [
      { label: "Support deflection", href: "/#capabilities", desc: "Repetitive questions stop reaching your inbox." },
      { label: "Compliance",         href: "/#capabilities", desc: "Certifications and audits tracked nightly." },
      { label: "Growth coaching",    href: "/#the-week",     desc: "Coaching time back, at every location." },
    ],
  },
];

const resourcesItems: NavItem[] = [
  { label: "Case Studies",   href: "/case-studies",   desc: "What brands changed, and what it returned." },
  { label: "Blog",           href: "/blog",           desc: "Franchise operations insights and product news." },
  { label: "ROI Calculator", href: "/roi-calculator", desc: "See what your network could recover." },
  { label: "Comparisons",    href: "/why-ezeeassist", desc: "How purpose-built AI differs from a general assistant." },
  { label: "Changelog",      href: "/changelog",      desc: "New capabilities, fixes, and product updates." },
];

const companyItems: NavItem[] = [
  { label: "About",   href: "/about",   desc: "Who we are and why we build this." },
  { label: "Careers", href: "/careers", desc: "Open roles across engineering and go to market." },
  { label: "Contact", href: "/contact", desc: "Talk to our team." },
];

/* Both marks share viewBox 0 0 583.2 151.2. */
const LOGO_H = 40;
const LOGO_W = Math.round((583.2 / 151.2) * LOGO_H);

type DropdownKey = "platform" | "solutions" | "resources" | "company" | null;

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
    <div className={`grid grid-cols-2 gap-8 p-6 ${width}`}>
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
  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isEditorial = pathname === "/";

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

  const closeAll = () => setActiveDropdown(null);

  /** Ada-style panel shell: subtle border, no shadow. */
  function DropdownWrapper({ keyName, children }: { keyName: DropdownKey; children: React.ReactNode }) {
    const open = activeDropdown === keyName;
    return (
      <div
        className={`absolute left-0 top-full pt-3 z-50 transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.10] bg-white dark:bg-[#141414]">
          {children}
        </div>
      </div>
    );
  }

  const headerClasses = isEditorial
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
    { key: "platform",  label: "Platform",  panel: <GroupedPanel groups={platformGroups}  onClose={closeAll} width="w-[720px]" /> },
    { key: "solutions", label: "Solutions", panel: <GroupedPanel groups={solutionsGroups} onClose={closeAll} width="w-[680px]" /> },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerClasses}`}>
      <nav
        ref={navRef}
        className={`mx-auto flex max-w-7xl items-center justify-between py-4 ${
          isEditorial ? "px-6 md:px-12 lg:px-16" : "px-6 lg:px-8"
        }`}
      >
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
            className="block dark:hidden"
          />
          <Image
            src="/logo-white.svg"
            alt=""
            aria-hidden="true"
            width={LOGO_W}
            height={LOGO_H}
            priority
            unoptimized
            className="hidden dark:block"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {dropdowns.map(({ key, label, panel }) => (
            <li
              key={key}
              className="relative"
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
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
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact">
            <Button size="sm" className="ed-btn-arrow gap-2" style={{ paddingRight: "0.25rem", paddingLeft: "1.125rem" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge ed-btn-arrow-badge-sm" aria-hidden="true">
                <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#0A0A0A] dark:text-gray-300 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] dark:border-white/[0.06] bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4">
            {/* Platform + Solutions accordions */}
            {[
              { key: "platform"  as const, label: "Platform",  groups: platformGroups },
              { key: "solutions" as const, label: "Solutions", groups: solutionsGroups },
            ].map(({ key, label, groups }) => (
              <li key={key}>
                <button
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300"
                  style={{ fontWeight: 500 }}
                  onClick={() => setMobileSection(mobileSection === key ? null : key)}
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
                            onClick={() => { setMobileOpen(false); setMobileSection(null); }}
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

            {/* Customers folded into Resources as Case Studies. */}

            {/* Resources + Company accordions */}
            {[
              { key: "resources" as const, label: "Resources", items: resourcesItems },
              { key: "company"   as const, label: "Company",   items: companyItems },
            ].map(({ key, label, items }) => (
              <li key={key}>
                <button
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300"
                  style={{ fontWeight: 500 }}
                  onClick={() => setMobileSection(mobileSection === key ? null : key)}
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
                        onClick={() => { setMobileOpen(false); setMobileSection(null); }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full ed-btn-arrow gap-2" style={{ paddingRight: "0.25rem", paddingLeft: "1.125rem" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge ed-btn-arrow-badge-sm" aria-hidden="true">
                  <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
