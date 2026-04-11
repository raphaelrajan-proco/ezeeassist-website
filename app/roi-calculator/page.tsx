import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ROICalculatorContent from "./ROICalculatorContent";

export const metadata: Metadata = {
  title: "ROI Calculator — EZee Assist",
  description: "Calculate how much time and money EZee Assist can save your franchise network.",
};

export default function ROICalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ROICalculatorContent />
      </main>
      <Footer />
    </>
  );
}
