import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "./ContactContent";

export const metadata = {
  title: "Contact — EZee Assist",
  description:
    "Get in touch with the EZee Assist team to learn how we can help your franchise brand amplify operations with AI.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
