import { Globe, Share2, Link2 } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Platform", href: "#platform" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Security", href: "/security" },
  ],
  Company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/ezeeassist", icon: Link2 },
  { label: "X / Twitter", href: "https://x.com/ezeeassist", icon: Share2 },
  { label: "Facebook", href: "https://facebook.com/ezeeassist", icon: Globe },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand column */}
          <div className="md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-[#0A0A0A]">
              EZee <span className="text-[#00AEEF]">Assist</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              AI-powered operational support for franchise and multi-location
              brands. Instant, accurate answers from your brand&apos;s own
              knowledge — 24/7.
            </p>

            {/* Contact info */}
            <div className="mt-5 space-y-1">
              <a
                href="mailto:sales@ezeeassist.com"
                className="block text-sm text-gray-500 hover:text-[#00AEEF] transition-colors"
              >
                sales@ezeeassist.com
              </a>
              <a
                href="tel:+18557773933"
                className="block text-sm text-gray-500 hover:text-[#00AEEF] transition-colors"
              >
                +1 855-777-3933
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-gray-400 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors shadow-sm"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#00AEEF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#E5E7EB] pt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400">
            &copy; {year} EZee Assist. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 flex gap-4">
            <a href="/privacy" className="hover:text-[#00AEEF] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-[#00AEEF] transition-colors">
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
