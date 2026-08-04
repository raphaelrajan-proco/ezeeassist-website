import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/platform/ComingSoon";

/* Stub. The Platform nav's "Reporting and BI" item and the Answers
   page's content-insights link both point here. Replace with the real
   page; do not let this rank in the meantime. */
export const metadata: Metadata = {
  title: "Reporting and BI — EZee Assist",
  description:
    "The numbers your network runs on, pulled and compared without anyone rebuilding a rollup.",
  alternates: { canonical: "/platform/reporting" },
  robots: { index: false, follow: true },
};

export default function ReportingPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Reporting and BI"
          title="The numbers, without anyone rebuilding a rollup."
          body="This page is being written. In the meantime, we can walk you through what your network's reporting would look like on a call."
        />
      </main>
      <Footer />
    </div>
  );
}
