import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalBody from "@/components/legal/LegalBody";
import { TERMS_BLOCKS } from "@/lib/data/legal-terms";

/**
 * /terms
 *
 * **The body is a verbatim copy of the published policy** at
 * ezeeassist.com/terms-policy-ezee-assist, held in
 * `lib/data/legal-terms.ts`.
 *
 * **This route did not exist.** The footer linked `/terms` from every
 * page on the site and every one of those links was a 404. Nothing on
 * this page writes legal copy, including the date, which the document
 * supplies itself as its first line.
 */
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing use of the EZee Assist site and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <section className="w-full bg-[#F7F8FA] dark:bg-[#0A0A0A]">
          <div className="mx-auto max-w-3xl px-6 pt-32 pb-14 lg:px-8 lg:pt-40 lg:pb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Legal
            </p>
            <h1
              className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Terms of Use
            </h1>
          </div>
        </section>

        {/* Body */}
        <section className="w-full bg-white dark:bg-[#0D0D0D]">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
            <LegalBody blocks={TERMS_BLOCKS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
