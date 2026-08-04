import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/platform/ComingSoon";

/* Stub. The Platform nav's "Automations" item points here. Replace with
   the real page; do not let this rank in the meantime. */
export const metadata: Metadata = {
  title: "Automations — EZee Assist",
  description:
    "Plays that fire the moment something changes, at every location they apply to.",
  alternates: { canonical: "/platform/automations" },
  robots: { index: false, follow: true },
};

export default function AutomationsPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Automations"
          title="Plays that fire the moment something changes."
          body="This page is being written. In the meantime, the always-on section of the homepage shows a day's worth of these running across a network."
        />
      </main>
      <Footer />
    </div>
  );
}
