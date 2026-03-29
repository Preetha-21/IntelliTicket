import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ✅ BACKEND CONNECTED
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent! We'll get back to you shortly.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-primary">
          Get In Touch
        </p>
        <h1 className="mb-4 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mb-14 max-w-xl text-center text-muted-foreground">
          Have a question or need help planning your visit? Reach out to us and
          our team will be happy to assist.
        </p>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-border bg-card p-8 lg:col-span-3"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="How can we help you?"
                className="w-full resize-none rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
            >
              {sending ? (
                "Sending…"
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>
          </form>

          {/* Info Sidebar (No Map) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Location */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Museum Location
              </h3>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  123 Museum Avenue, Art District, Melbourne VIC 3000
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Contact Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  info@museumbot.com
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Mon–Fri: 9 AM – 6 PM
                    <br />
                    Sat–Sun: 10 AM – 8 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;