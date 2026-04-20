import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TicketingContent from "./TicketingContent";

export const metadata: Metadata = {
  title: "Intelligent Ticketing — Zero-Drop Escalation",
  description:
    "When AI can't answer, EZee Assist automatically creates a smart ticket — categorized, prioritized, and routed to the right person. No question falls through the cracks.",
  alternates: { canonical: "/platform/ticketing" },
  keywords: [
    "franchise ticketing system",
    "AI escalation franchise",
    "franchise support tickets",
    "auto-routing support tickets",
  ],
};

export default function TicketingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <TicketingContent />
      </main>
      <Footer />
    </>
  );
}
