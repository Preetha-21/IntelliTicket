import { Landmark, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="text-gold" size={24} />
              <span className="font-display text-lg font-semibold text-cream">MuseumTix</span>
            </div>
            <p className="text-sm leading-relaxed font-body">
              Experience the world's finest art and cultural heritage. Plan your visit and book tickets online.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-cream mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm font-body">
              <li className="flex items-center gap-2"><MapPin size={16} className="text-gold" /> 123 Museum Avenue, New York, NY 10001</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-gold" /> +1 (555) 234-5678</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-gold" /> info@museumtix.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-cream mb-4">Opening Hours</h3>
            <ul className="space-y-3 text-sm font-body">
              <li className="flex items-center gap-2"><Clock size={16} className="text-gold" /> Mon–Fri: 9:00 AM – 6:00 PM</li>
              <li className="flex items-center gap-2"><Clock size={16} className="text-gold" /> Sat–Sun: 10:00 AM – 8:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-xs font-body">
          © {new Date().getFullYear()} MuseumTix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
