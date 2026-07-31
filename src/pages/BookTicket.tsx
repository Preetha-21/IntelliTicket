import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { User, Mail, Phone, Calendar, Tag, Hash, Ticket } from "lucide-react";
import { getEvents, type MuseumEvent } from "@/lib/eventsStore";

const PRICES: Record<string, number> = {
  Adult: 15,
  Child: 8,
  Student: 10,
};

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  visitDate?: string;
  eventId?: string;
  numTickets?: string;
}

const BookTicket = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<MuseumEvent[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    eventId: "",
    ticketType: "Adult",
    numTickets: 1,
  });

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const selectedEvent = events.find((e) => e.id === form.eventId);

  const totalPrice = useMemo(
    () => PRICES[form.ticketType] * form.numTickets,
    [form.ticketType, form.numTickets]
  );

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: FieldErrors = {};

    if (!/^[A-Za-z\s]{3,}$/.test(form.name.trim())) {
      errs.name = "Please enter a valid name (letters only, min 3 characters)";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      errs.phone = "Phone number must be exactly 10 digits";
    }
    if (!form.visitDate) {
      errs.visitDate = "Please select your date";
    }
    if (!form.eventId) {
      errs.eventId = "Please select an event";
    }
    if (form.numTickets < 1 || form.numTickets > 10) {
      errs.numTickets = "Tickets must be between 1 and 10";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) {
    toast.error("Please fix the errors in the form");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/book-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        event: selectedEvent?.name || "",
        visitDate: form.visitDate,
        ticketType: form.ticketType,
        quantity: form.numTickets,
        totalPrice: totalPrice,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Ticket booked successfully!");

      const params = new URLSearchParams({
        bookingId: String(data.bookingId),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        type: form.ticketType,
        date: form.visitDate,
        num: String(form.numTickets),
        event: selectedEvent?.name || "",
        price: String(totalPrice),
      });

      navigate(`/payment?${params.toString()}`);
    } else {
      toast.error(data.message || "Booking failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
};

  const inputBase =
    "w-full rounded-md border bg-background py-2.5 pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1";

  const inputClass = (field: keyof FieldErrors) =>
    `${inputBase} ${errors[field] ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border focus:border-primary focus:ring-primary"}`;

  const ErrorMsg = ({ field }: { field: keyof FieldErrors }) =>
    errors[field] ? <p className="mt-1 text-xs text-destructive">{errors[field]}</p> : null;

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        <p className="mb-3 text-center font-body text-sm uppercase tracking-[0.3em] text-primary">
          Reserve Your Visit
        </p>
        <h1 className="mb-10 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Book Tickets
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-8">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass("name")} placeholder="John Doe" />
            </div>
            <ErrorMsg field="name" />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass("email")} placeholder="john@email.com" />
            </div>
            <ErrorMsg field="email" />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass("phone")} placeholder="1234567890" maxLength={10} />
            </div>
            <ErrorMsg field="phone" />
          </div>

          {/* Visit Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Visit Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="date" min={today} value={form.visitDate} onChange={(e) => update("visitDate", e.target.value)} className={inputClass("visitDate")} />
            </div>
            <ErrorMsg field="visitDate" />
          </div>

          {/* Event Selection */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Select Event</label>
            <div className="relative">
              <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select value={form.eventId} onChange={(e) => update("eventId", e.target.value)} className={inputClass("eventId") + " appearance-none"}>
                <option value="">Choose an event…</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.name} — {ev.date} (${ev.price})</option>
                ))}
              </select>
            </div>
            <ErrorMsg field="eventId" />
          </div>

          {/* Ticket Type & Number */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Ticket Type</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select value={form.ticketType} onChange={(e) => update("ticketType", e.target.value)} className={inputBase + " appearance-none border-border focus:border-primary focus:ring-primary"}>
                  <option>Adult</option>
                  <option>Child</option>
                  <option>Student</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Number of Tickets</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="number" min={1} max={10} value={form.numTickets} onChange={(e) => update("numTickets", parseInt(e.target.value) || 1)} className={inputClass("numTickets")} />
              </div>
              <ErrorMsg field="numTickets" />
            </div>
          </div>

          {/* Price summary */}
          <div className="flex items-center justify-between rounded-md border border-primary/30 bg-primary/5 px-6 py-4">
            <span className="font-body text-sm text-muted-foreground">
              {form.numTickets} × {form.ticketType} (${PRICES[form.ticketType]})
            </span>
            <span className="font-display text-2xl font-bold text-primary">${totalPrice}</span>
          </div>

          <button type="submit" className="w-full rounded-md bg-primary py-3 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110">
            Submit Booking
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default BookTicket; 
