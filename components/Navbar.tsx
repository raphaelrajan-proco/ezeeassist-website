"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const platformLinks = [
  { label: "Platform Overview",    href: "/platform" },
  { label: "AI Agent",             href: "/platform/ai-agent" },
  { label: "Intelligent Ticketing",href: "/platform/ticketing" },
  { label: "Knowledge & Insights", href: "/platform/insights" },
  { label: "Workflow Builder",     href: "/platform/workflows" },
  { label: "Integrations",         href: "/platform/integrations" },
];

const industriesLinks = [
  { label: "All Industries",            href: "/industries" },
  { label: "Franchising",               href: "/industries/franchising" },
  { label: "Multi-Location Businesses", href: "/industries/multi-location" },
  { label: "Universities",              href: "/industries/universities" },
];

const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog",         href: "/blog" },
  { label: "Security",     href: "/security" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]             = useState(false);
  const [platformOpen, setPlatformOpen]         = useState(false);
  const [industriesOpen, setIndustriesOpen]     = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen]   = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [scrolled, setScrolled]                 = useState(false);
  const dropdownRef                             = useRef<HTMLLIElement>(null);
  const industriesRef                           = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setPlatformOpen(false);
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) setIndustriesOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-b border-black/[0.06] shadow-sm" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#0A0A0A]">
            EZee <span className="text-[#00AEEF]">Assist</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {/* Platform dropdown */}
          <li
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#00AEEF] transition-colors duration-150"
              onClick={() => setPlatformOpen((v) => !v)}
              aria-expanded={platformOpen}
            >
              Platform
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                className={`transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                platformOpen
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-1"
              }`}
            >
              <div className="w-64 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                {/* Overview — highlighted */}
                <div className="border-b border-[#E5E7EB] px-2 pt-2 pb-2">
                  <Link
                    href="/platform"
                    onClick={() => setPlatformOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-[#00AEEF]/[0.06] px-4 py-3 hover:bg-[#00AEEF]/[0.10] transition-colors duration-150"
                  >
                    <span className="text-sm font-semibold text-[#00AEEF]">Platform Overview</span>
                  </Link>
                </div>

                {/* Sub-pages */}
                <div className="px-2 py-2">
                  {platformLinks.slice(1).map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setPlatformOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#F7F8FA] hover:text-[#00AEEF] transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          {/* Industries dropdown */}
          <li
            ref={industriesRef}
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#00AEEF] transition-colors duration-150"
              onClick={() => setIndustriesOpen((v) => !v)}
              aria-expanded={industriesOpen}
            >
              Industries
              <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-0 top-full pt-3 transition-all duration-200 ${industriesOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}>
              <div className="w-60 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                <div className="border-b border-[#E5E7EB] px-2 pt-2 pb-2">
                  <Link href="/industries" onClick={() => setIndustriesOpen(false)} className="flex items-center gap-3 rounded-xl bg-[#00AEEF]/[0.06] px-4 py-3 hover:bg-[#00AEEF]/[0.10] transition-colors duration-150">
                    <span className="text-sm font-semibold text-[#00AEEF]">All Industries</span>
                  </Link>
                </div>
                <div className="px-2 py-2">
                  {industriesLinks.slice(1).map(({ label, href }) => (
                    <Link key={href} href={href} onClick={() => setIndustriesOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-[#F7F8FA] hover:text-[#00AEEF] transition-colors duration-150">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          {/* Other links */}
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#00AEEF] transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button size="sm">Book a Demo</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#0A0A0A] hover:bg-[#F7F8FA] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white/95 backdrop-blur-md px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4">
            {/* Platform accordion */}
            <li>
              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#F7F8FA] transition-colors"
                onClick={() => setMobilePlatformOpen((v) => !v)}
              >
                Platform
                <ChevronDown
                  size={14}
                  strokeWidth={2.5}
                  className={`transition-transform duration-200 ${mobilePlatformOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobilePlatformOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4">
                  {platformLinks.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="py-2 text-sm text-gray-600 hover:text-[#00AEEF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobilePlatformOpen(false); }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Industries accordion */}
            <li>
              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#F7F8FA] transition-colors"
                onClick={() => setMobileIndustriesOpen((v) => !v)}
              >
                Industries
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${mobileIndustriesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[#00AEEF]/20 pl-4">
                  {industriesLinks.map(({ label, href }) => (
                    <Link key={href} href={href} className="py-2 text-sm text-gray-600 hover:text-[#00AEEF] transition-colors" onClick={() => { setMobileOpen(false); setMobileIndustriesOpen(false); }}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#F7F8FA] hover:text-[#00AEEF] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <Button size="md" className="w-full">Book a Demo</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
