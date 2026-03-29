import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    role: "Art Enthusiast",
    text: "The chatbot made booking so seamless! I was inside the museum in minutes without standing in any queue.",
    rating: 5,
    avatar: "AS",
  },
  {
    name: "Rajesh Kumar",
    role: "History Teacher",
    text: "Brought my entire class here. The online booking system saved us so much time. Excellent exhibitions!",
    rating: 5,
    avatar: "RK",
  },
  {
    name: "Priya Menon",
    role: "Tourist",
    text: "Multilingual chatbot support was a lifesaver. I booked tickets in Tamil and the experience was flawless.",
    rating: 4,
    avatar: "PM",
  },
  {
    name: "David Chen",
    role: "Photographer",
    text: "The exhibitions are world-class. Being able to check show timings via the chatbot was incredibly convenient.",
    rating: 5,
    avatar: "DC",
  },
  {
    name: "Fatima Hassan",
    role: "Student",
    text: "Student discounts and instant digital tickets — this is how every museum should operate!",
    rating: 5,
    avatar: "FH",
  },
  {
    name: "Arjun Patel",
    role: "Weekend Visitor",
    text: "Clean interface, fast booking, and great events. The whole family loved the dinosaur exhibition!",
    rating: 4,
    avatar: "AP",
  },
];

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center font-body text-sm uppercase tracking-[0.3em] text-primary">
          What Visitors Say
        </p>
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Visitor Testimonials
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease-out ${i * 100}ms`,
              }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`h-4 w-4 ${si < t.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 flex-1 font-body text-sm leading-relaxed text-muted-foreground italic">
                "{t.text}"
              </p>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
