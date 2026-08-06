import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CoachesContent from "@/components/solutions/coaches/CoachesContent";

/**
 * /solutions/coaches — the field-coaches page.
 *
 * Note the plural segment. `/solution` (singular) is a legacy SEO alias
 * that renders the platform page; `/solutions` is the role-based family
 * the nav's Solutions bucket points at. They do not collide.
 *
 * The og/twitter copy here is deliberately not the homepage's, which is
 * stale.
 */

const TITLE = "Franchise Field Coaches";
const DESCRIPTION =
  "Walk into every call already prepared, then have your plays run where you can't be. EZee takes the questions, the chasing, and the report building off your coaches.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/solutions/coaches" },
  openGraph: {
    /* Next replaces the layout's openGraph object wholesale rather than
       merging it, so siteName and type have to be repeated here. */
    type: "website",
    siteName: "EZee Assist",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "EZee Assist — franchise field coaches" }],
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "EZee Assist — franchise field coaches" }],
  },
};

/* Built from the same three questions section 10 renders, so the FAQPage
   schema cannot drift from what is on screen. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will I still know what's happening at my locations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You see every question asked and every answer given, by location. More visibility than you have today, not less.",
      },
    },
    {
      "@type": "Question",
      name: "What if it tells an owner the wrong thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It answers only from material your brand has approved, and it cites the source every time. When it isn't confident, it stops. The question becomes a ticket routed to you with the full conversation attached.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to build these plays myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can. Most teams start from what HQ has already published and adjust from there.",
      },
    },
  ],
};

export default function CoachesPage() {
  return (
    <div className="theme-editorial">
      <JsonLd data={faqSchema} />
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CoachesContent />
      </main>
      <Footer />
    </div>
  );
}
