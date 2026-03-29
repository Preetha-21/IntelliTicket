import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import BenefitsSection from "@/components/BenefitsSection";
import StatsSection from "@/components/StatsSection";
import BookSection from "@/components/BookSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <HeroSlider />
      <ScrollFadeIn>
        <BenefitsSection />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <StatsSection />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <BookSection />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <TestimonialsSection />
      </ScrollFadeIn>
      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Index;
