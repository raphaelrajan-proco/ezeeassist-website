import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityContent from "./SecurityContent";

export const metadata = {
  title: "Security — EZee Assist",
  description:
    "EZee Assist's AI engine is meticulously developed to surpass current AI security, privacy, and compliance protocols.",
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
