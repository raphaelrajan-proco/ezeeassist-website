import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AnswersContent from "@/components/platform/answers/AnswersContent";

/**
 * /platform/answers
 *
 * Replaces /platform/ai-agent, which 301s here. The capability had four
 * names across the site — "Support Agent" in the nav, ai-agent in the
 * route, "Ask for anything" on the homepage tile, and "Answers" in the
 * spec. It is Answers everywhere now except the homepage tile, which is
 * out of scope for this branch and left as a follow-up.
 */

const TITLE = "Answers";
const DESCRIPTION =
  "Every question answered from your own material, scoped to the person asking. Cited, logged, and available in the channels your locations already use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/answers" },
  openGraph: {
    /* Next replaces the layout's openGraph object wholesale rather than
       merging it, so type and siteName have to be repeated here. */
    type: "website",
    siteName: "EZee Assist",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "EZee Assist — Answers" }],
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "EZee Assist — Answers" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@type": "WebSite", name: "EZee Assist", url: "https://www.ezeeassist.com" },
};

export default function AnswersPage() {
  return (
    <div className="theme-editorial">
      <JsonLd data={schema} />
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <AnswersContent />
      </main>
      <Footer />
    </div>
  );
}
