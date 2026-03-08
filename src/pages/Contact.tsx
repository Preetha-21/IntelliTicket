import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm uppercase tracking-[0.25em] mb-3">Get In Touch</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardContent className="flex items-start gap-4 pt-6">
                <MapPin className="text-primary mt-1 shrink-0" size={20} />
                <div className="font-body"><p className="font-semibold text-foreground">Address</p><p className="text-muted-foreground text-sm">123 Museum Avenue, New York, NY 10001</p></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-start gap-4 pt-6">
                <Phone className="text-primary mt-1 shrink-0" size={20} />
                <div className="font-body"><p className="font-semibold text-foreground">Phone</p><p className="text-muted-foreground text-sm">+1 (555) 234-5678</p></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-start gap-4 pt-6">
                <Mail className="text-primary mt-1 shrink-0" size={20} />
                <div className="font-body"><p className="font-semibold text-foreground">Email</p><p className="text-muted-foreground text-sm">info@museumtix.com</p></div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card">
            <CardHeader><CardTitle className="font-display text-lg">Send a Message</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 font-body">
                <div className="space-y-2"><Label>Name</Label><Input placeholder="Your name" required /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@example.com" required /></div>
                <div className="space-y-2"><Label>Message</Label><Textarea placeholder="How can we help?" rows={4} required /></div>
                <Button type="submit" className="w-full bg-primary hover:bg-gold-dark text-primary-foreground uppercase tracking-wider">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
