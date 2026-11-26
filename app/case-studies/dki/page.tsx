import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import DkiCaseStudy from "@/components/sections/DkiCaseStudy";

/**
 * DKI Canada. A static route, so it outranks `[slug]`; DKI is also kept
 * out of `CASE_STUDIES`, so the template never generates this path.
 *
 * Geist is this page's type only. It is loaded here and scoped to
 * `<main>` by re-pointing `--font-editorial` (which the editorial heading
 * rule reads) and setting the body family, so the Navbar and Footer keep
 * the site's fonts.
 */

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dki",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-dki-mono",
  display: "swap",
});

const TITLE = "DKI Canada case study: Faster estimates, built on the right rules";
const DESCRIPTION =
  "Ki, DKI’s AI assistant built on EZee Assist, brings program-specific guidance directly into the estimating process, helping members move jobs forward faster and deliver accurate estimates to property owners sooner.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case-studies/dki" },
  openGraph: {
    type: "article",
    siteName: "EZee Assist",
    url: "/case-studies/dki",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  articleSection: "Case Study",
  headline: "Faster estimates, built on the right rules.",
  description: DESCRIPTION,
  datePublished: "2026-11-26",
  image: "https://www.ezeeassist.com/case-studies/dki/opengraph-image.png",
  publisher: { "@type": "Organization", name: "EZee Assist" },
  about: { "@type": "Organization", name: "DKI Canada" },
};

export default function DkiCaseStudyPage() {
  return (
    <div className="theme-editorial">
      <JsonLd data={schema} />
      <AnnouncementBar />
      <Navbar />
      <main
        className={`${geist.variable} ${geistMono.variable} dki-page flex flex-1 flex-col antialiased`}
        style={{
          fontFamily: "var(--font-dki), ui-sans-serif, system-ui, sans-serif",
          ["--font-editorial" as string]: "var(--font-dki), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <DkiCaseStudy />
      </main>
      <Footer />
    </div>
  );
}
