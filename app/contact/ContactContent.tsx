"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Globe, Share2, Link2 } from "lucide-react";
import Button from "@/components/ui/Button";

// TODO: Set NEXT_PUBLIC_HUBSPOT_MEETINGS_URL in .env.local and Vercel env variables
// Find your meetings URL in HubSpot → Sales → Meetings → your meeting link
const MEETINGS_URL = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL;

const inputClass =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:border-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/20 transition-all";

const labelClass = "block text-sm font-semibold text-[#0A0A0A] mb-1.5";

const unitOptions = [
  "Select number of units",
  "1–10", "11–50", "51–100", "100–500", "500+",
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/ezeeassist", icon: Link2 },
  { label: "X / Twitter", href: "https://x.com/ezeeassist", icon: Share2 },
  { label: "Facebook", href: "https://facebook.com/ezeeassist", icon: Globe },
];

export default function ContactContent() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden border-b border-[#E5E7EB]"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(0,174,239,0.06) 0%, transparent 55%)" }}
        />
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Contact</p>
            <h1
              className="text-5xl font-bold tracking-tight text-[#0A0A0A] sm:text-6xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Get in{" "}
              <span className="text-[#00AEEF]">touch</span> with our team
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              We look forward to connecting to learn about how we can help your
              brand amplify operations with EZee Assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form + Info ───────────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA]">
        <div ref={bodyRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={bodyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.06)]"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00AEEF]/10">
                    <Mail size={24} className="text-[#00AEEF]" strokeWidth={1.75} />
                  </div>
                  <h2
                    className="text-2xl font-bold text-[#0A0A0A]"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Message received!
                  </h2>
                  <p className="text-sm leading-6 text-gray-600 max-w-sm">
                    Thanks for reaching out. Someone from our team will be in
                    touch within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-semibold text-[#00AEEF] hover:underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2
                    className="text-xl font-bold text-[#0A0A0A] mb-6"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Book a Demo
                  </h2>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>First name</label>
                      <input type="text" placeholder="Jane" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last name</label>
                      <input type="text" placeholder="Smith" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email <span className="text-[#00AEEF]">*</span>
                    </label>
                    <input type="email" placeholder="jane@yourfranchise.com" required className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Phone</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Company</label>
                      <input type="text" placeholder="Franchise Brand Inc." className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Your role</label>
                      <input type="text" placeholder="VP of Operations" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Number of units</label>
                    <select className={inputClass}>
                      {unitOptions.map((opt) => (
                        <option key={opt} value={opt === unitOptions[0] ? "" : opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>How did you hear about us?</label>
                    <textarea rows={3} placeholder="Google, LinkedIn, a colleague..." className={`${inputClass} resize-none`} />
                  </div>

                  <div className="pt-2">
                    <Button size="lg" className="w-full" type="submit">Send message</Button>
                    <p className="mt-3 text-center text-xs text-gray-400">
                      We&apos;ll respond within one business day.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Info card */}
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={bodyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-2xl border-2 border-[#00AEEF] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,174,239,0.08)]">
                <h3
                  className="text-base font-bold text-[#0A0A0A] mb-6"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Contact information
                </h3>

                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#00AEEF]/10">
                    <Mail size={16} className="text-[#00AEEF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
                    <a href="mailto:sales@ezeeassist.com" className="text-sm font-semibold text-[#0A0A0A] hover:text-[#00AEEF] transition-colors">
                      sales@ezeeassist.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#00AEEF]/10">
                    <Phone size={16} className="text-[#00AEEF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Phone</p>
                    <a href="tel:+18557773933" className="text-sm font-semibold text-[#0A0A0A] hover:text-[#00AEEF] transition-colors">
                      +1 (855) 777-3933
                    </a>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Follow us</p>
                  <div className="flex gap-2">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-gray-400 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors"
                      >
                        <Icon size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <p className="text-sm font-bold text-[#0A0A0A] mb-1">Fast response guaranteed</p>
                <p className="text-sm leading-6 text-gray-600">
                  Our team typically responds within one business day. For urgent inquiries, call us directly.
                </p>
              </div>
            </motion.aside>

          </div>
        </div>
      </section>

      {/* ── Calendar embed ────────────────────────────────── */}
      {MEETINGS_URL && (
        <section className="w-full border-t border-[#E5E7EB] bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
                Or book directly
              </p>
              <h2
                className="text-2xl font-bold text-[#0A0A0A]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Pick a time that works for you
              </h2>
            </div>
            <iframe
              src={`${MEETINGS_URL}?embed=true`}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-xl border border-[#E5E7EB] shadow-sm min-h-[600px] lg:min-h-[700px]"
              title="Book a Demo with EZee Assist"
            />
          </div>
        </section>
      )}
    </>
  );
}
