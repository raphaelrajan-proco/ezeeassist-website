import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VideoPlaceholder from "@/components/sections/VideoPlaceholder";
import TrustBar from "@/components/sections/TrustBar";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import CaseStudyCarousel from "@/components/sections/CaseStudyCarousel";
import ComparisonSection from "@/components/sections/ComparisonSection";
import OnboardingTimeline from "@/components/sections/OnboardingTimeline";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PressSection from "@/components/sections/PressSection";
import FAQSection from "@/components/sections/FAQSection";
import PartnersSection from "@/components/sections/PartnersSection";
import SecuritySection from "@/components/sections/SecuritySection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <VideoPlaceholder />
        <TrustBar />
        <ProblemSection />
        <HowItWorksSection />
        <StatsSection />
        <CaseStudyCarousel />
        <ComparisonSection />
        <OnboardingTimeline />
        <TestimonialsSection />
        <PressSection />
        <FAQSection />
        <PartnersSection />
        <SecuritySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
