import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TicketingContent from "./TicketingContent";

export const metadata: Metadata = {
  title: "Intelligent Ticketing — EZee Assist Platform",
  description:
    "When AI can't answer, EZee Assist automatically creates a smart ticket — categorized, prioritized, and routed to the right person. No question falls through the cracks.",
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
