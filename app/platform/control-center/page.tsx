import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ControlCenterContent from "@/components/platform/control-center/ControlCenterContent";

/* Replaces the ComingSoon stub created for the Reporting page. og/twitter
   are written out rather than inherited: the homepage's are stale. */
const TITLE = "Control Center — EZee Assist";
const DESCRIPTION =
  "One policy set, one permission model, one activity log across every location, channel, and department. Set once at HQ, applied everywhere, with nothing that can be worked around.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/control-center" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/platform/control-center", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ControlCenterPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ControlCenterContent />
      </main>
      <Footer />
    </div>
  );
}
