import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/platform/ComingSoon";

/* Stub. Created for the Workflows page, whose §9 calls compliance the
   flagship play. `noindex` on purpose: a thin page that ranks is worse
   than no page. Deliberately NOT added to the nav — a stub in the nav is
   what the retired Automations entry was already doing wrong. Delete the
   route when the real page lands and add it to Navbar.tsx then. */
export const metadata: Metadata = {
  title: "Compliance — EZee Assist",
  description:
    "The flagship play: checks that run on their own, evidence collected as they go, and escalation when something fails.",
  alternates: { canonical: "/platform/compliance" },
  robots: { index: false, follow: true },
};

export default function CompliancePage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Compliance"
          title="The play that runs the checks, collects the evidence, and escalates."
          body="This page is being written. In the meantime, we can walk you through what compliance looks like when nobody has to chase it."
        />
      </main>
      <Footer />
    </div>
  );
}
