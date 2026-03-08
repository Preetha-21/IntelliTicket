import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const BookTickets = () => {
  const [ticketType, setTicketType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking confirmed! Check your email for details.");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-10">
          <p className="text-primary font-body text-sm uppercase tracking-[0.25em] mb-3">Reserve Now</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Book Your Tickets</h1>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Visitor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5 font-body">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label>Visit Date</Label>
                <Input type="date" required />
              </div>
              <div className="space-y-2">
                <Label>Ticket Type</Label>
                <Select value={ticketType} onValueChange={setTicketType} required>
                  <SelectTrigger><SelectValue placeholder="Select a ticket" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Entry — $15</SelectItem>
                    <SelectItem value="special">Special Show — $25</SelectItem>
                    <SelectItem value="guided">Guided Tour — $35</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Tickets</Label>
                <Input type="number" min={1} max={10} defaultValue={1} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-gold-dark text-primary-foreground uppercase tracking-wider">
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookTickets;
