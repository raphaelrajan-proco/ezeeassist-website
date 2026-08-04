import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ComplianceContent from "@/components/platform/compliance/ComplianceContent";

/* Replaces the ComingSoon stub created for the Workflows page's related
   card. og/twitter are written out rather than inherited: the homepage's
   are stale. */
const TITLE = "Compliance — EZee Assist";
const DESCRIPTION =
  "Know where every location stands without anyone having to ask. Certifications, insurance, training, and audits checked continuously, chased until they close, and evidenced.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/compliance" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/platform/compliance", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function CompliancePage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComplianceContent />
      </main>
      <Footer />
    </div>
  );
}
