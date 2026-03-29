import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Calendar, User, Tag, Hash, DollarSign, Ticket, MapPin, CreditCard } from "lucide-react";

const PRICES: Record<string, number> = { Adult: 15, Child: 8, Student: 10 };

const Confirmation = () => {
  const [params] = useSearchParams();
  const name = params.get("name") || "Jane Doe";
  const type = params.get("type") || "Adult";
  const date = params.get("date") || new Date().toISOString().split("T")[0];
  const num = parseInt(params.get("num") || "2", 10);
  const eventName = params.get("event") || "General Admission";
  const total = (PRICES[type] ?? 15) * num;
  const bookingId = params.get("id") || `MUS-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const rows = [
    { icon: User, label: "Visitor Name", value: name },
    { icon: MapPin, label: "Event", value: eventName },
    { icon: Tag, label: "Ticket Type", value: type },
    { icon: Calendar, label: "Visit Date", value: date },
    { icon: Hash, label: "Tickets", value: String(num) },
    { icon: DollarSign, label: "Total Price", value: `$${total}` },
    { icon: Ticket, label: "Booking ID", value: bookingId },
    { icon: CreditCard, label: "Payment Status", value: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="mx-auto max-w-lg px-6 pb-24 pt-32">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="bg-primary px-6 py-6 text-center">
            <CheckCircle className="mx-auto mb-2 h-10 w-10 text-primary-foreground" />
            <h1 className="font-display text-2xl font-bold text-primary-foreground">Booking Confirmed</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">Your digital ticket</p>
          </div>

          <div className="relative flex items-center">
            <div className="absolute -left-3 h-6 w-6 rounded-full bg-background" />
            <div className="flex-1 border-t-2 border-dashed border-border" />
            <div className="absolute -right-3 h-6 w-6 rounded-full bg-background" />
          </div>

          <div className="space-y-4 px-6 py-6">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="truncate font-medium text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-secondary/30 px-6 py-4 text-center text-xs text-muted-foreground">
            Please present this ticket at the museum entrance. Enjoy your visit!
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => window.print()} className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary">
            Print Ticket
          </button>
          <a href="/book" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
            Book Another
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
