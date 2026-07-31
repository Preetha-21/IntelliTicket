import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Pencil, Trash2, X, Save, LogOut } from "lucide-react";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  type MuseumEvent,
} from "@/lib/eventsStore";
import { toast } from "sonner";
import axios from "axios";

const emptyForm = {
  name: "",
  description: "",
  date: "",
  time: "",
  image: "",
  price: 15,
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<MuseumEvent[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"events" | "bookings">("events");

  // ✅ FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookings");
      setBookings(res.data);
    } catch {
      toast.error("Failed to");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") !== "true") {
      navigate("/admin-login");
      return;
    }

    setEvents(getEvents());
    fetchBookings();
  }, [navigate]);

  const refresh = () => {
    setEvents(getEvents());
    fetchBookings();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  // ✅ SAVE EVENT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateEvent(editingId, form);
      toast.success("Event updated successfully");
    } else {
      addEvent(form);
      toast.success("Event added successfully");
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    refresh();
  };

  const handleEdit = (event: MuseumEvent) => {
    setForm(event);
    setEditingId(event.id);
    setShowForm(true);
    setActiveTab("events");
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    toast.success("Event deleted");
    refresh();
  };

  const handleDeleteBooking = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.total_price || 0),
    0
  );

  const inputClass =
    "w-full rounded-md border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage events and view bookings
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "events" && (
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {showForm ? "Cancel" : "Add Event"}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-border bg-secondary/30 p-1">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "events"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Events ({events.length})
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "bookings"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Booked Tickets ({bookings.length})
          </button>
        </div>

        {/* ✅ EVENT FORM FIXED */}
        {activeTab === "events" && showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 space-y-4 rounded-lg border border-border bg-card p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">
              {editingId ? "Edit Event" : "Add New Event"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Event Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className={inputClass}
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className={inputClass}
              />
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className={inputClass}
              />
            </div>

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={inputClass}
            />

            <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              <Save className="h-4 w-4" />
              {editingId ? "Update Event" : "Save Event"}
            </button>
          </form>
        )}

        {/* EVENTS LIST */}
        {activeTab === "events" && (
          <div className="rounded-xl border border-border bg-card">
            {events.map((event) => (
              <div key={event.id} className="flex justify-between p-4">
                <div>{event.name}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(event)}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteEvent(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="rounded-xl border border-border bg-card p-4">
            {bookings.map((b) => (
              <div key={b.id} className="flex justify-between">
                <div>{b.name}</div>
                <button onClick={() => handleDeleteBooking(b.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="text-right font-semibold">
              Total Revenue: ${totalRevenue}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
