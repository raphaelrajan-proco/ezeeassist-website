import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TicketingContent from "@/app/platform/ticketing/TicketingContent";

export const metadata: Metadata = {
  title: "Intelligent Ticketing — EZee Assist",
  description:
    "Human guaranteed. Your team gets looped in when it matters most. EZee's intelligent ticketing ensures the right person gets the right context — automatically.",
  alternates: { canonical: "/solution/ticketing" },
  keywords: [
    "franchise ticketing system",
    "AI escalation franchise",
    "intelligent ticket routing",
    "franchise support tickets",
  ],
};

export default function SolutionTicketingPage() {
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
