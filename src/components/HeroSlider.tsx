import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=1920&h=800&fit=crop",
    title: "Explore the Museum Experience",
    subtitle: "Book Tickets Instantly with AI Chatbot",
  },
  {
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1920&h=800&fit=crop",
    title: "Discover Ancient Civilizations",
    subtitle: "Journey through millennia of human history",
  },
  {
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920&h=800&fit=crop",
    title: "Art That Inspires Generations",
    subtitle: "World-class exhibitions curated for you",
  },
  {
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920&h=800&fit=crop",
    title: "Interactive Learning Awaits",
    subtitle: "Hands-on exhibits for all ages",
  },
  {
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=800&fit=crop",
    title: "Step Into the Future of Museums",
    subtitle: "Technology meets heritage in our galleries",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.05)",
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-primary animate-fade-in">
            Welcome to the Future of Museum Visits
          </p>
          <h1
            key={current}
            className="mb-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-7xl animate-fade-in"
          >
            {SLIDES[current].title}
          </h1>
          <p
            key={`sub-${current}`}
            className="mx-auto mb-10 max-w-xl font-body text-lg text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {SLIDES[current].subtitle}
          </p>
          <Link
            to="/book"
            className="inline-block rounded-sm bg-primary px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-all hover:brightness-110 hover-scale"
          >
            Book Tickets
          </Link>
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border/50 bg-background/40 p-3 text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground sm:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border/50 bg-background/40 p-3 text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground sm:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
