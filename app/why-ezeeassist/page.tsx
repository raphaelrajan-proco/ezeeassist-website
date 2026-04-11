import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyEZeeAssistContent from "./WhyEZeeAssistContent";

export const metadata: Metadata = {
  title: "Why EZee Assist — Purpose-Built Franchise AI",
  description: "The model is not the product. The context is the product. Learn why EZee Assist is different from generic AI tools.",
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
