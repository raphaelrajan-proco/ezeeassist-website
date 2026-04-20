import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityContent from "./SecurityContent";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "EZee Assist follows enterprise-grade security practices aligned with SOC 2 Type II. All data encrypted in transit and at rest. Your data never trains third-party AI models.",
  alternates: { canonical: "/security" },
  keywords: [
    "franchise data security",
    "SOC 2 franchise software",
    "AI security compliance",
    "franchise GDPR compliance",
    "enterprise AI security",
  ],
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <SecurityContent />
      </main>
      <Footer />
    </>
  );
}
