import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Calendar, IndianRupee } from "lucide-react";
import { getEvents, type MuseumEvent } from "@/lib/eventsStore";

const Shows = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<MuseumEvent[]>([]);

  useEffect(() => { setEvents(getEvents()); }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <p className="mb-3 text-center font-body text-sm uppercase tracking-[0.3em] text-primary">
          What's On
        </p>
        <h1 className="mb-4 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Museum Shows & Exhibitions
        </h1>
        <p className="mx-auto mb-14 max-w-xl text-center font-body text-muted-foreground">
          Explore our curated exhibitions and live shows. Book your spot today and immerse yourself in history, science, and art.
        </p>

        {events.length === 0 ? (
          <p className="text-center text-muted-foreground">No events available at the moment. Check back soon!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((show) => (
              <div
                key={show.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={show.image} alt={show.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">${show.price}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{show.name}</h3>
                  <div className="mb-1 flex items-center gap-2 text-primary">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{show.date}</span>
                  </div>
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{show.time}</span>
                  </div>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{show.description}</p>
                  <button
                    onClick={() => navigate("/book")}
                    className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110"
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shows;
