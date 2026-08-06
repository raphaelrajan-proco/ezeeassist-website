import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ReportingContent from "@/components/platform/reporting/ReportingContent";

/* Replaces the ComingSoon stub. The og/twitter blocks are written out
   rather than inherited: the homepage's are stale and would describe the
   wrong page. */
const TITLE = "Reporting";
const DESCRIPTION =
  "Every number your network has, however you want to see it. Ask in plain language, get it rendered the way the question demands, and stop rebuilding the weekly report.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/reporting" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/platform/reporting",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function ReportingPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ReportingContent />
      </main>
      <Footer />
    </div>
  );
}
