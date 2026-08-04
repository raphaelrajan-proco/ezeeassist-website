import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import IntegrationsContent from "@/components/platform/integrations/IntegrationsContent";

/**
 * /platform/integrations
 *
 * This route used to redirect into /solution/integrations. The redirect
 * is reversed now: the legacy twin points here, and this is canonical.
 *
 * The old ./IntegrationsContent.tsx is retired along with it; the page
 * body lives under components/platform/integrations/ with the rest of
 * the Platform pages.
 */

const TITLE = "Integrations — EZee Assist";
const DESCRIPTION =
  "Connect what you already run. EZee reads your knowledge, your performance data, and the channels your locations work in, at the source and with the permissions they already have. Nothing migrates.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/integrations" },
  openGraph: {
    /* Next replaces the layout's openGraph object wholesale rather than
       merging it, so type and siteName have to be repeated here. */
    type: "website",
    siteName: "EZee Assist",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "EZee Assist — Integrations" }],
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "EZee Assist — Integrations" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@type": "WebSite", name: "EZee Assist", url: "https://www.ezeeassist.com" },
};

export default function IntegrationsPage() {
  return (
    <div className="theme-editorial">
      <JsonLd data={schema} />
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <IntegrationsContent />
      </main>
      <Footer />
    </div>
  );
}
