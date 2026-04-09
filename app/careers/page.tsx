import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersContent from "./CareersContent";

export const metadata = {
  title: "Careers — EZee Assist",
  description:
    "Join our team at EZee Assist. We're hiring talented engineers to help build the future of franchise support.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CareersContent />
      </main>
      <Footer />
    </>
  );
}
