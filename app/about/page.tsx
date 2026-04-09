import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";

export const metadata = {
  title: "About — EZee Assist",
  description:
    "Meet the team behind EZee Assist — AI-powered operational support for franchise and multi-location brands.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
