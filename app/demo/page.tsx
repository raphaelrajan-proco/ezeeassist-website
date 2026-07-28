import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Walk a Scenario",
  description:
    "Pick your vertical and walk one scenario end to end: the sources EZee reads, the permissions it checks, and the action it takes.",
  alternates: { canonical: "/demo" },
  robots: { index: false, follow: true },
};

/**
 * Stub route for the no-form interactive demo.
 *
 * TODO: Build the real experience. Pick vertical, walk one scenario, see a recommended
 * action, then the form appears. This page exists so the secondary CTA in section 16 does
 * not dead-end, and is noindexed until the real thing ships.
 */
export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="w-full">
          <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-8"
              style={{ color: "#00AEEF", fontWeight: 500 }}
            >
              Coming soon
            </p>
            <h1
              className="text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] dark:text-[#F0F0F0]"
              style={{ fontFamily: "var(--font-jakarta)", fontWeight: 500 }}
            >
              Walk a scenario yourself.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              We are building a walkthrough that lets you pick your vertical
              and follow one real scenario end to end, with no form in the
              way. Until it ships, the fastest path is a working session with
              our team.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <span className="inline-flex items-center rounded-full bg-[#00AEEF] px-8 py-4 text-base text-white" style={{ fontWeight: 500 }}>
                  Book a working session
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
