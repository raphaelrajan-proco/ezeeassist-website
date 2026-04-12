import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Accessibility Statement — EZee Assist",
  description: "EZee Assist's commitment to digital accessibility for all users.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="relative w-full border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Legal</p>
            <h1 className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              Accessibility at EZee Assist
            </h1>
          </div>
        </section>

        <section className="w-full bg-white dark:bg-[#0D0D0D]">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20 space-y-8 text-base leading-8 text-gray-600 dark:text-gray-400">
            <p>
              EZee Assist is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
            <p>
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible to people with a wide array of disabilities.
            </p>
            <p>
              Our efforts to ensure accessibility include: semantic HTML structure throughout the site, keyboard navigation support, sufficient color contrast ratios, alternative text for images, and responsive design that works across devices and screen sizes.
            </p>
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please contact us at{" "}
              <a href="mailto:accessibility@ezeeassist.com" className="font-semibold text-[#00AEEF] hover:underline underline-offset-4">
                accessibility@ezeeassist.com
              </a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
