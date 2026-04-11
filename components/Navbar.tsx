"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ThemeToggle";

const platformLinks = [
  { label: "Platform Overview",     href: "/platform" },
  { label: "AI Agent",              href: "/platform/ai-agent" },
  { label: "Intelligent Ticketing", href: "/platform/ticketing" },
  { label: "Knowledge & Insights",  href: "/platform/insights" },
  { label: "Workflow Builder",      href: "/platform/workflows" },
  { label: "Integrations",          href: "/platform/integrations" },
];

const industriesLinks = [
  { label: "All Industries",            href: "/industries" },
  { label: "Franchising",               href: "/industries/franchising" },
  { label: "Multi-Location Businesses", href: "/industries/multi-location" },
  { label: "Universities",              href: "/industries/universities" },
];

const resourcesLinks = [
  { label: "Blog",              href: "/blog" },
  { label: "Why EZee Assist",   href: "/why-ezeeassist" },
  { label: "ROI Calculator",    href: "/roi-calculator" },
  { label: "Changelog",         href: "/changelog" },
];

const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Security",     href: "/security" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

type DropdownKey = "platform" | "industries" | "resources" | null;

export default function Navbar() {
  const [mobileOpen, setMobileOpen]                 = useState(false);
  const [activeDropdown, setActiveDropdown]         = useState<DropdownKey>(null);
  const [mobilePlatformOpen, setMobilePlatformOpen]   = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen]  = useState(false);
  const [scrolled, setScrolled]                     = useState(false);
  const navRef                                      = useRef<HTMLDivElement>(null);

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

  function renderDropdown(
    key: DropdownKey,
    links: { label: string; href: string }[],
    overviewLabel?: string,
  ) {
    const open = activeDropdown === key;
    return (
      <div className={`absolute left-0 top-full pt-3 transition-all duration-200 ${open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}>
        <div className="w-60 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.40)]">
          {overviewLabel && (
            <div className="border-b border-[#E5E7EB] dark:border-white/[0.08] px-2 pt-2 pb-2">
              <Link href={links[0].href} onClick={() => setActiveDropdown(null)}
                className="flex items-center gap-3 rounded-xl bg-[#00AEEF]/[0.06] px-4 py-3 hover:bg-[#00AEEF]/[0.10] transition-colors duration-150">
                <span className="text-sm font-semibold text-[#00AEEF]">{overviewLabel}</span>
              </Link>
            </div>
          )}
          <div className="px-2 py-2">
            {(overviewLabel ? links.slice(1) : links).map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setActiveDropdown(null)}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors duration-150">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-md transition-all duration-300 ${scrolled ? "border-b border-black/[0.06] dark:border-white/[0.06] shadow-sm dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]" : "border-b border-transparent"}`}>
      <nav ref={navRef} className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#0A0A0A] dark:text-[#F0F0F0]">
            EZee <span className="text-[#00AEEF]">Assist</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {/* Platform */}
          <li className="relative"
            onMouseEnter={() => setActiveDropdown("platform")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors duration-150"
              onClick={() => setActiveDropdown(activeDropdown === "platform" ? null : "platform")}
              aria-expanded={activeDropdown === "platform"}
            >
              Platform
              <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "platform" ? "rotate-180" : ""}`} />
            </button>
            {renderDropdown("platform", platformLinks, "Platform Overview")}
          </li>

          {/* Industries */}
          <li className="relative"
            onMouseEnter={() => setActiveDropdown("industries")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors duration-150"
              onClick={() => setActiveDropdown(activeDropdown === "industries" ? null : "industries")}
              aria-expanded={activeDropdown === "industries"}
            >
              Industries
              <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "industries" ? "rotate-180" : ""}`} />
            </button>
            {renderDropdown("industries", industriesLinks, "All Industries")}
          </li>

          {/* Case Studies — standalone */}
          <li>
            <Link href="/case-studies" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors duration-150">
              Case Studies
            </Link>
          </li>

          {/* Resources */}
          <li className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors duration-150"
              onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
              aria-expanded={activeDropdown === "resources"}
            >
              Resources
              <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>
            {renderDropdown("resources", resourcesLinks)}
          </li>

          {/* Other links */}
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors duration-150">
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
        <div className="md:hidden border-t border-[#E5E7EB] dark:border-white/[0.06] bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4">
            {/* Platform accordion */}
            <li>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] transition-colors"
                onClick={() => setMobilePlatformOpen((v) => !v)}>
                Platform
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobilePlatformOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePlatformOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4">
                  {platformLinks.map(({ label, href }) => (
                    <Link key={href} href={href} className="py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
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
                    <Link key={href} href={href} className="py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobileIndustriesOpen(false); }}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Case Studies */}
            <li>
              <Link href="/case-studies" className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
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
                    <Link key={href} href={href} className="py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobileResourcesOpen(false); }}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#F7F8FA] dark:hover:bg-white/[0.05] hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
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
