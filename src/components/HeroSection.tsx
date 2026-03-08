import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-museum.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-up">
        <p className="text-gold font-body text-sm uppercase tracking-[0.3em] mb-4">
          Welcome to the Experience
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
          Online Museum Ticket Booking System
        </h1>
        <p className="text-cream/70 font-body text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Explore centuries of art, culture, and history. Reserve your visit today.
        </p>
        <Link to="/book">
          <Button size="lg" className="bg-primary hover:bg-gold-dark text-primary-foreground font-body text-base px-10 py-6 uppercase tracking-widest animate-pulse-glow">
            Book Tickets
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
