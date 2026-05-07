import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyEZeeAssistContent from "./WhyEZeeAssistContent";

export const metadata: Metadata = {
  title: "Why EZee Assist — The Context Is the Product",
  description: "250+ integrations. Conversational workflows. Support + Coaching + Compliance in one AI agent. Learn what makes EZee Assist purpose-built for multi-location execution.",
  alternates: { canonical: "/why-ezeeassist" },
};

export default function WhyEZeeAssistPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <WhyEZeeAssistContent />
      </main>
      <Footer />
    </>
  );
}
