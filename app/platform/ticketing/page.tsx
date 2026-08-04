import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import TicketingContent from "@/components/platform/ticketing/TicketingContent";

/* Replaces the legacy page, which was also unreachable: next.config.ts
   308'd this path to /solution/ticketing, the same shadowing that hid
   /platform/workflows. og/twitter are written out rather than inherited,
   since the homepage's are stale. */
const TITLE = "Ticketing — EZee Assist";
const DESCRIPTION =
  "One place for your franchisees to ask HQ for anything. Raised by asking, classified, routed to the department that owns it, and tracked until it closes. No portal, no forms, no guessing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/ticketing" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/platform/ticketing", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function TicketingPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <TicketingContent />
      </main>
      <Footer />
    </div>
  );
}
