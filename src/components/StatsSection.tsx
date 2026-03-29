import { useState, useEffect, useRef } from "react";
import { Users, Calendar, Landmark, Award } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { icon: Users, value: 10000, suffix: "+", label: "Happy Visitors" },
  { icon: Calendar, value: 120, suffix: "+", label: "Events Hosted" },
  { icon: Landmark, value: 50, suffix: "+", label: "Exhibitions" },
  { icon: Award, value: 15, suffix: "+", label: "Awards Won" },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

const StatCard = ({ stat, isVisible, delay }: { stat: StatItem; isVisible: boolean; delay: number }) => {
  const count = useCountUp(stat.value, isVisible);
  const Icon = stat.icon;

  return (
    <div
      className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover-scale"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${delay}ms`,
      }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="font-display text-4xl font-bold text-foreground">
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="font-body text-sm text-muted-foreground">{stat.label}</span>
    </div>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center font-body text-sm uppercase tracking-[0.3em] text-primary">
          Our Impact
        </p>
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Museum by the Numbers
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
