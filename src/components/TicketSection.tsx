import { Ticket, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tickets = [
  {
    title: "General Entry",
    description: "Access to all permanent galleries and exhibitions. Perfect for a self-guided exploration.",
    price: "$15",
    icon: Ticket,
  },
  {
    title: "Special Show",
    description: "Exclusive access to limited-time exhibitions featuring world-renowned artists and collections.",
    price: "$25",
    icon: Star,
  },
  {
    title: "Guided Tour",
    description: "A curated 90-minute journey led by an expert docent through our most iconic masterpieces.",
    price: "$35",
    icon: Users,
  },
];

const TicketSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm uppercase tracking-[0.25em] mb-3">Plan Your Visit</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Choose Your Experience</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tickets.map((ticket, i) => (
            <Card
              key={ticket.title}
              className="group border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ticket.icon className="text-primary" size={26} />
                </div>
                <CardTitle className="font-display text-xl">{ticket.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                  {ticket.description}
                </p>
                <p className="font-display text-3xl font-bold text-primary mb-6">{ticket.price}</p>
                <Link to="/book">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider text-xs font-body">
                    Select
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
