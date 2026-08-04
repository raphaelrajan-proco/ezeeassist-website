import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import AppsContent from "@/components/platform/apps/AppsContent";

/* New route. The nav and footer both pointed Apps at the homepage's
   #capabilities section until this shipped. og/twitter are written out
   rather than inherited: the homepage's are stale. */
const TITLE = "Apps — EZee Assist";
const DESCRIPTION =
  "Describe the tool your network needs and it's running this afternoon. Purpose-built tools for your locations, connected to your systems, with no developer and no release cycle.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/apps" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/platform/apps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AppsPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <AppsContent />
      </main>
      <Footer />
    </div>
  );
}
