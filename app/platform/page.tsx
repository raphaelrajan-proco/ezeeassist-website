import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformContent from "./PlatformContent";

export const metadata: Metadata = {
  title: "Platform — EZee Assist",
  description:
    "Explore the EZee Assist platform: AI-powered knowledge delivery, omnichannel support, intelligent escalation, and deep analytics — built for franchise and multi-location brands.",
};

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <PlatformContent />
      </main>
      <Footer />
    </>
  );
}
