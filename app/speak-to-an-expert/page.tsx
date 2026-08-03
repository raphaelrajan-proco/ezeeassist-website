import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeetingsEmbed from "@/components/MeetingsEmbed";
import { CLOSING_BASE } from "@/components/growth/closing-band";

export const metadata: Metadata = {
  title: "Speak to an expert",
  description:
    "Bring us one franchise workflow and we will show you how EZee runs it. Book a time with the team.",
  alternates: { canonical: "/speak-to-an-expert" },
};

/**
 * The booking page. Every "Speak to an expert" button on the site lands
 * here: the nav, the hero, and the closing section. The workflow line and
 * the calendar used to sit on the homepage; they moved here so the
 * homepage closes on a CTA rather than on an 800px embed.
 *
 * The band carries the hero's background so the page reads as part of the
 * same set, and its bottom fade resolves to CLOSING_BASE, which the
 * footer continues. Change one and change the other, or a seam appears.
 */
export default function SpeakToAnExpertPage() {
  return (
    <>
      <Navbar />
      <main className="theme-editorial flex flex-1 flex-col">
        <section
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: "#0B2C48" }}
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/hero-bg.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "left center" }}
              priority
            />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.30)" }} />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(4,32,54,0.15) 0%, rgba(4,32,54,0) 35%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-20 md:pb-24 flex flex-col items-center">
            <h1
              className="text-center leading-[1.05] tracking-[-0.03em] max-w-4xl"
              style={{
                color: "#FFFFFF",
                fontFamily: "var(--font-editorial)",
                fontWeight: 700,
                /* Two lines, one per span. The longer line needs 14.8px of
                   width per 1px of font size, so one line each allows
                   23.1px at 390, 45.4 at 768 and 60.5 from 1024 up. */
                fontSize: "clamp(1.375rem, 0.02rem + 5.56vw, 3.25rem)",
              }}
            >
              <span className="block">Bring us one franchise workflow.</span>
              <span className="block">We&rsquo;ll show you how EZee runs it.</span>
            </h1>

            <p
              className="text-center mt-5 max-w-[560px] text-[15px] md:text-[17px]"
              style={{ color: "rgba(245,237,224,0.85)", lineHeight: 1.6 }}
            >
              Pick a time that suits you. Come with one workflow your network
              runs today and we will walk through what EZee does with it.
            </p>

            <MeetingsEmbed className="mt-10 max-w-[900px]" onDark />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
