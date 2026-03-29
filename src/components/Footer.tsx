import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/shows" },
  { label: "Book Ticket", to: "/book" },
  { label: "Chatbot", to: "/chatbot" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-primary">MuseumBot</h3>
          <p className="mb-5 font-body text-sm leading-relaxed text-muted-foreground">
            Making museum visits effortless with AI-powered ticket booking. Experience history, art, and science like never before.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-foreground">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-foreground">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3 font-body text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              123 Museum Avenue, Art District, New Delhi - 110001
            </li>
            <li className="flex items-center gap-3 font-body text-sm text-muted-foreground">
              <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
              +91 (11) 2345-6789
            </li>
            <li className="flex items-center gap-3 font-body text-sm text-muted-foreground">
              <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
              info@museumbot.com
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-foreground">
            Opening Hours
          </h4>
          <ul className="flex flex-col gap-2.5 font-body text-sm text-muted-foreground">
            <li className="flex justify-between">
              <span>Mon – Fri</span>
              <span className="text-foreground">9:00 AM – 6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sat – Sun</span>
              <span className="text-foreground">10:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Holidays</span>
              <span className="text-destructive">Closed</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-border px-6 pt-6">
        <p className="text-center font-body text-xs text-muted-foreground">
          © 2026 MuseumBot — Online Chatbot Based Museum Ticketing System | Smart India Hackathon Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;
