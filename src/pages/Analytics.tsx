import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Ticket, DollarSign, TrendingUp, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Tickets Sold", value: "12,847", icon: Ticket, change: "+12%" },
  { label: "Visitors Today", value: "284", icon: Users, change: "+8%" },
  { label: "Revenue Today", value: "$4,260", icon: DollarSign, change: "+15%" },
  { label: "Monthly Revenue", value: "$42,390", icon: TrendingUp, change: "+22%" },
];

const dailyVisitors = [
  { day: "Mon", visitors: 320 },
  { day: "Tue", visitors: 280 },
  { day: "Wed", visitors: 410 },
  { day: "Thu", visitors: 370 },
  { day: "Fri", visitors: 520 },
  { day: "Sat", visitors: 680 },
  { day: "Sun", visitors: 590 },
];

const bookings = [
  { id: "MB-1001", name: "Alice Johnson", date: "2026-03-10", type: "Adult", qty: 2, total: "$30", status: "Confirmed" },
  { id: "MB-1002", name: "Bob Smith", date: "2026-03-10", type: "Student", qty: 3, total: "$30", status: "Confirmed" },
  { id: "MB-1003", name: "Carol Davis", date: "2026-03-10", type: "Child", qty: 4, total: "$32", status: "Pending" },
  { id: "MB-1004", name: "David Lee", date: "2026-03-11", type: "Adult", qty: 1, total: "$15", status: "Confirmed" },
  { id: "MB-1005", name: "Eva Martinez", date: "2026-03-11", type: "Student", qty: 2, total: "$20", status: "Confirmed" },
  { id: "MB-1006", name: "Frank Wilson", date: "2026-03-12", type: "Adult", qty: 5, total: "$75", status: "Pending" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Museum Ticket Booking Overview</p>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>March 2026</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-foreground">{s.value}</p>
              <span className="mt-1 inline-block text-xs text-success">{s.change} vs last week</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg font-semibold text-foreground">Daily Visitors</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyVisitors}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
              <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-3 font-medium text-muted-foreground">Booking ID</th>
                  <th className="px-6 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="px-6 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="px-6 py-3 font-medium text-muted-foreground">Qty</th>
                  <th className="px-6 py-3 font-medium text-muted-foreground">Total</th>
                  <th className="px-6 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-6 py-3 font-medium text-primary">{b.id}</td>
                    <td className="px-6 py-3 text-foreground">{b.name}</td>
                    <td className="px-6 py-3 text-muted-foreground">{b.date}</td>
                    <td className="px-6 py-3">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{b.type}</span>
                    </td>
                    <td className="px-6 py-3 text-foreground">{b.qty}</td>
                    <td className="px-6 py-3 font-semibold text-foreground">{b.total}</td>
                    <td className="px-6 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.status === "Confirmed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
