import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import LeadershipContent from "@/components/solutions/leadership/LeadershipContent";

/* Replaces /industries/franchising/franchisors, which now 301s here.
   og/twitter are written out rather than inherited: the homepage's are
   stale. */
const TITLE = "For franchisor leadership";
const DESCRIPTION =
  "See what's happening across your network, support every owner, and multiply your coaching team, without adding headcount or changing the systems you already run.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/solutions/leadership" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solutions/leadership", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
};

export default function LeadershipPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <LeadershipContent />
      </main>
      <Footer />
    </div>
  );
}
