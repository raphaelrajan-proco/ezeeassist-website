"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown,
  Bot, Ticket, BarChart2, Workflow, Plug2, LayoutGrid,
  Building2, Store, MapPin, GraduationCap,
  FileText, Lightbulb, Calculator, Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ThemeToggle";

/* ─── Nav data ─────────────────────────────────────────── */

const platformLinks = [
  { label: "Solution Overview",     href: "/solution",                  icon: LayoutGrid,  desc: "One AI agent. Your entire tech stack. Limitless execution." },
  { label: "Integrations",          href: "/solution/integrations",     icon: Plug2,       desc: "250+ integrations — drives, CRMs, POS, LMS, and more." },
  { label: "Intelligent Ticketing", href: "/solution/ticketing",        icon: Ticket,      desc: "Human guaranteed. Your team gets looped in when it matters." },
  { label: "Agentic Workflows",     href: "/solution/workflows",        icon: Workflow,    desc: "AI-powered workflows. You dream it up, EZee executes it." },
];

const industriesLinks = [
  { label: "All Industries",            href: "/industries",                            icon: Building2,      desc: "See how EZee Assist scales across every format." },
  { label: "Franchising",               href: "/industries/franchising",                icon: Store,          desc: "Purpose-built for franchise brands and their networks." },
  { label: "Multi-Location Businesses", href: "/industries/multi-location",             icon: MapPin,         desc: "Consistent support across every location, at scale." },
  { label: "Universities",              href: "/industries/universities",               icon: GraduationCap,  desc: "Instant answers for students, staff, and departments." },
];

const resourcesLinks = [
  { label: "Blog",              href: "/blog",            icon: FileText,   desc: "Franchise operations insights and product news." },
  { label: "Why EZee Assist",   href: "/why-ezeeassist",  icon: Lightbulb,  desc: "The case for AI-powered franchise support." },
  { label: "ROI Calculator",    href: "/roi-calculator",  icon: Calculator, desc: "See your support cost savings in 60 seconds." },
  { label: "Changelog",         href: "/changelog",       icon: Clock,      desc: "New features, fixes, and product updates." },
];

const caseStudyLinks = [
  { label: "WSI", sub: "67% ticket reduction globally", href: "/case-studies/wsi" },
  { label: "DekaLash", sub: "93% AI resolution rate", href: "/case-studies/dekalash" },
  { label: "DivaDance", sub: "2,600+ queries in 6 months", href: "/case-studies/divadance" },
];

type DropdownKey = "platform" | "industries" | "resources" | null;

/* ─── Shared icon badge ────────────────────────────────── */

function IconBadge({ icon: Icon, className = "" }: { icon: React.ElementType; className?: string }) {
  return (
    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#00AEEF]/10 ${className}`}>
      <Icon size={17} className="text-[#00AEEF]" strokeWidth={1.75} />
    </div>
  );
}

/* ─── Dropdown panels ──────────────────────────────────── */

function PlatformPanel({ onClose }: { onClose: () => void }) {
  const [overview, ...items] = platformLinks;
  return (
    <div className="w-[580px]">
      {/* Overview highlight */}
      <div className="border-b border-[#E5E7EB] dark:border-white/[0.08] px-3 pt-3 pb-3">
        <Link
          href={overview.href}
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl bg-[#00AEEF]/[0.07] px-4 py-3 hover:bg-[#00AEEF]/[0.12] transition-colors group"
        >
          <IconBadge icon={overview.icon} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#00AEEF]">{overview.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{overview.desc}</p>
          </div>
          <ArrowRight size={14} className="text-[#00AEEF]/50 group-hover:text-[#00AEEF] transition-colors flex-shrink-0" />
        </Link>
      </div>
      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-1 px-3 py-3">
        {items.map(({ label, href, icon, desc }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors group"
          >
            <IconBadge icon={icon} className="mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] group-hover:text-[#00AEEF] transition-colors">{label}</p>
              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function IndustriesPanel({ onClose }: { onClose: () => void }) {
  const [overview, ...items] = industriesLinks;
  return (
    <div className="w-[340px]">
      <div className="border-b border-[#E5E7EB] dark:border-white/[0.08] px-3 pt-3 pb-3">
        <Link
          href={overview.href}
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl bg-[#00AEEF]/[0.07] px-4 py-3 hover:bg-[#00AEEF]/[0.12] transition-colors group"
        >
          <IconBadge icon={overview.icon} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#00AEEF]">{overview.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{overview.desc}</p>
          </div>
          <ArrowRight size={14} className="text-[#00AEEF]/50 group-hover:text-[#00AEEF] transition-colors flex-shrink-0" />
        </Link>
      </div>
      <div className="flex flex-col gap-1 px-3 py-3">
        {items.map(({ label, href, icon, desc }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors group"
          >
            <IconBadge icon={icon} className="mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] group-hover:text-[#00AEEF] transition-colors">{label}</p>
              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ResourcesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[480px] flex">
      {/* Left: resource links */}
      <div className="flex-1 flex flex-col gap-1 px-3 py-3">
        {resourcesLinks.map(({ label, href, icon, desc }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors group"
          >
            <IconBadge icon={icon} className="mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] group-hover:text-[#00AEEF] transition-colors">{label}</p>
              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Right: customer stories */}
      <div className="w-[176px] flex-shrink-0 border-l border-[#E5E7EB] dark:border-white/[0.08] px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3 mb-3">
          Customer Stories
        </p>
        <div className="flex flex-col gap-1">
          {caseStudyLinks.map(({ label, sub, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="rounded-xl px-3 py-2.5 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors group"
            >
              <p className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] group-hover:text-[#00AEEF] transition-colors">{label}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-4">{sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen]                    = useState(false);
  const [activeDropdown, setActiveDropdown]            = useState<DropdownKey>(null);
  const [mobilePlatformOpen, setMobilePlatformOpen]    = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen]  = useState(false);
  const [scrolled, setScrolled]                        = useState(false);
  const navRef                                         = useRef<HTMLDivElement>(null);

  // Editorial pass: only the homepage is on the editorial theme right now
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

  function DropdownWrapper({ keyName, children }: { keyName: DropdownKey; children: React.ReactNode }) {
    const open = activeDropdown === keyName;
    return (
      <div
        className={`absolute left-0 top-full pt-3 z-50 transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 -translate-y-2 scale-[0.97]"
        }`}
        style={{ transformOrigin: "top left" }}
      >
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </div>
    );
  }

  const navLinks = [
    { label: "Security", href: "/security" },
    { label: "About",    href: "/about" },
    { label: "Contact",  href: "/contact" },
  ];

  // Editorial palette overrides — applied only when isEditorial && on root
  const editorialHeaderClasses = isEditorial
    ? scrolled
      ? "bg-[var(--ed-bg)]/90 backdrop-blur-md border-b border-[var(--ed-rule)]"
      : "bg-transparent border-b border-transparent"
    : scrolled
      ? "bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06] shadow-sm dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]"
      : "bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-transparent";

  const linkColor = isEditorial
    ? "text-[var(--ed-fg)] hover:text-[#00AEEF]"
    : "text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05]";

  const linkFontWeight = isEditorial ? "font-normal" : "font-medium";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${editorialHeaderClasses}`}>
      <nav ref={navRef} className={`mx-auto flex max-w-7xl items-center justify-between py-4 ${isEditorial ? "px-6 md:px-12 lg:px-16" : "px-6 lg:px-8"}`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`tracking-tight ${isEditorial ? "text-lg" : "text-xl font-bold"} ${
              isEditorial ? "text-[var(--ed-fg)]" : "text-[#0A0A0A] dark:text-[#F0F0F0]"
            }`}
            style={isEditorial ? { fontFamily: "var(--font-editorial)", fontWeight: 500, letterSpacing: "-0.02em" } : {}}
          >
            EZee <span className="text-[#00AEEF]">Assist</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">

          {/* Solution */}
          <li className="relative"
            onMouseEnter={() => setActiveDropdown("platform")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                activeDropdown === "platform"
                  ? "text-[#00AEEF] bg-[#00AEEF]/[0.07]"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05]"
              }`}
              onClick={() => setActiveDropdown(activeDropdown === "platform" ? null : "platform")}
              aria-expanded={activeDropdown === "platform"}
            >
              Solution
              <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "platform" ? "rotate-180" : ""}`} />
            </button>
            <DropdownWrapper keyName="platform"><PlatformPanel onClose={closeAll} /></DropdownWrapper>
          </li>

          {/* Industries */}
          <li className="relative"
            onMouseEnter={() => setActiveDropdown("industries")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                activeDropdown === "industries"
                  ? "text-[#00AEEF] bg-[#00AEEF]/[0.07]"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05]"
              }`}
              onClick={() => setActiveDropdown(activeDropdown === "industries" ? null : "industries")}
              aria-expanded={activeDropdown === "industries"}
            >
              Industries
              <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "industries" ? "rotate-180" : ""}`} />
            </button>
            <DropdownWrapper keyName="industries"><IndustriesPanel onClose={closeAll} /></DropdownWrapper>
          </li>

          {/* Case Studies — standalone */}
          <li>
            <Link href="/case-studies" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors duration-150">
              Case Studies
            </Link>
          </li>

          {/* Resources */}
          <li className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                activeDropdown === "resources"
                  ? "text-[#00AEEF] bg-[#00AEEF]/[0.07]"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05]"
              }`}
              onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
              aria-expanded={activeDropdown === "resources"}
            >
              Resources
              <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>
            <DropdownWrapper keyName="resources"><ResourcesPanel onClose={closeAll} /></DropdownWrapper>
          </li>

          {/* Other links */}
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors duration-150">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact">
            <Button size="sm">Book a Demo</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#0A0A0A] dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors"
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

            {/* Solution accordion */}
            <li>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors"
                onClick={() => setMobilePlatformOpen((v) => !v)}>
                Solution
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobilePlatformOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePlatformOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4">
                  {platformLinks.map(({ label, href }) => (
                    <Link key={href} href={href}
                      className="py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobilePlatformOpen(false); }}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Industries accordion */}
            <li>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors"
                onClick={() => setMobileIndustriesOpen((v) => !v)}>
                Industries
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobileIndustriesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4">
                  {industriesLinks.map(({ label, href }) => (
                    <Link key={href} href={href}
                      className="py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobileIndustriesOpen(false); }}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Case Studies */}
            <li>
              <Link href="/case-studies"
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] hover:text-[#00AEEF] transition-colors"
                onClick={() => setMobileOpen(false)}>
                Case Studies
              </Link>
            </li>

            {/* Resources accordion */}
            <li>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors"
                onClick={() => setMobileResourcesOpen((v) => !v)}>
                Resources
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4">
                  {resourcesLinks.map(({ label, href }) => (
                    <Link key={href} href={href}
                      className="py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobileResourcesOpen(false); }}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] hover:text-[#00AEEF] transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile theme toggle + CTA */}
          <div className="mt-5 flex items-center gap-3">
            <ThemeToggle />
            <div className="flex-1">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <Button size="md" className="w-full">Book a Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
