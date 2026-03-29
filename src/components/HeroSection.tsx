import heroImage from "@/assets/museum-hero.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Grand museum interior with marble columns and golden light"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-primary">
          Welcome to the Future of Museum Visits
        </p>
        <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-7xl">
          Museum Chatbot
          <br />
          <span className="text-primary">Ticket Booking</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl font-body text-lg text-muted-foreground">
          Skip the queues. Book your museum tickets instantly through our intelligent chatbot — available 24/7.
        </p>
        <a
          href="#book"
          className="inline-block rounded-sm bg-primary px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-all hover:brightness-110"
        >
          Book Tickets
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
