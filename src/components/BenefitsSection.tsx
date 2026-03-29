import { useState, useEffect, useRef } from "react";
import { Clock, MessageSquare, Ticket, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Book tickets anytime, day or night. Our chatbot never sleeps, so you can plan your visit on your schedule.",
  },
  {
    icon: MessageSquare,
    title: "Conversational Booking",
    description: "Simply chat in natural language. No complex forms — just tell our bot when you'd like to visit.",
  },
  {
    icon: Ticket,
    title: "Instant Confirmation",
    description: "Receive your e-tickets instantly via email. No waiting, no printing, just scan and enter.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "All transactions are encrypted and secure. Book with confidence using any major payment method.",
  },
];

const BenefitsSection = () => {
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
    <section ref={ref} id="chatbot" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center font-body text-sm uppercase tracking-[0.3em] text-primary">
          Why Choose Us
        </p>
        <h2 className="mb-16 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Smarter Ticket Booking
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group rounded-lg border border-border bg-secondary/50 p-8 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-gold)] hover-scale"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease-out ${i * 120}ms`,
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
                {b.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
