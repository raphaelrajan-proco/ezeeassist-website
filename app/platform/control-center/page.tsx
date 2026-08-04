import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/platform/ComingSoon";

/* Stub. Created for the Reporting page, whose §7 and §9 both link here for
   how scoping and the audit trail are set, and which is also the third
   related-pages card. `noindex` on purpose: a thin page that ranks is
   worse than no page. Delete the route when the real one lands and repoint
   Navbar.tsx and Footer.tsx. */
export const metadata: Metadata = {
  title: "Control Center — EZee Assist",
  description:
    "Where scoping, permissions and the audit trail are set for everything your network can ask.",
  alternates: { canonical: "/platform/control-center" },
  robots: { index: false, follow: true },
};

export default function ControlCenterPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Control Center"
          title="Scoping, permissions and the audit trail, in one place."
          body="This page is being written. In the meantime, we can walk you through how your network's permissions would be set on a call."
        />
      </main>
      <Footer />
    </div>
  );
}
