import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveBooking } from "@/lib/bookingsStore";
import { CreditCard, Smartphone, CheckCircle, Lock, User, Calendar, Tag, Hash } from "lucide-react";

const PRICES: Record<string, number> = { Adult: 15, Child: 8, Student: 10 };

type PaymentMethod = "credit" | "debit" | "upi";

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const name = params.get("name") || "Jane Doe";
  const email = params.get("email") || "";
  const phone = params.get("phone") || "";
  const type = params.get("type") || "Adult";
  const date = params.get("date") || new Date().toISOString().split("T")[0];
  const num = parseInt(params.get("num") || "2", 10);
  const eventName = params.get("event") || "General Admission";
  const total = (PRICES[type] ?? 15) * num;

  const [method, setMethod] = useState<PaymentMethod>("credit");
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handlePay = async (e: React.FormEvent) => {
  e.preventDefault();
  setProcessing(true);

  try {
    const response = await fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: params.get("bookingId"),
        name,
        email,
        phone,
        eventName,
        visitDate: date,
        ticketType: type,
        numTickets: num,
        totalPrice: total,
        paymentMethod: method,
        paymentStatus: "Paid",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setBookingId(data.bookingId || params.get("bookingId") || "");
      setPaid(true);
    } else {
      alert(data.message || "Payment failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setProcessing(false);
  }
};
  if (paid) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <main className="mx-auto flex max-w-lg flex-col items-center px-6 pb-24 pt-32 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Payment Successful</h1>
          <p className="mt-2 text-muted-foreground">
            Your payment of <span className="font-semibold text-primary">${total}</span> has been received.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                const p = new URLSearchParams({ name, type, date, num: String(num), event: eventName, id: bookingId });
                navigate(`/confirmation?${p.toString()}`);
              }}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              View Ticket
            </button>
            <a href="/" className="rounded-md border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary">
              Back Home
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const summaryRows = [
    { icon: User, label: "Visitor", value: name },
    { icon: Tag, label: "Type", value: type },
    { icon: Calendar, label: "Date", value: date },
    { icon: Hash, label: "Tickets", value: String(num) },
  ];

  const methods: { id: PaymentMethod; label: string; icon: typeof CreditCard; desc: string }[] = [
    { id: "credit", label: "Credit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
    { id: "debit", label: "Debit Card", icon: CreditCard, desc: "All major banks" },
    { id: "upi", label: "UPI", icon: Smartphone, desc: "Google Pay, PhonePe, Paytm" },
  ];

  const inputCls = "w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-primary">Secure Checkout</p>
        <h1 className="mb-10 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">Complete Payment</h1>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Booking Summary</h2>
              <div className="space-y-3">
                {summaryRows.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="truncate text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{num} × {type}</span>
                  <span className="text-sm text-foreground">${PRICES[type] ?? 15} each</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">${total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handlePay} className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Payment Method</h2>
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {methods.map(({ id, label, icon: Icon, desc }) => (
                  <button key={id} type="button" onClick={() => setMethod(id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border p-4 text-center transition ${method === id ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-muted-foreground"}`}>
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-[11px] leading-tight opacity-70">{desc}</span>
                  </button>
                ))}
              </div>

              {(method === "credit" || method === "debit") && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Card Number</label>
                    <input required placeholder="1234 5678 9012 3456" maxLength={19} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Expiry</label>
                      <input required placeholder="MM/YY" maxLength={5} className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">CVV</label>
                      <input required type="password" placeholder="•••" maxLength={4} className={inputCls} />
                    </div>
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">UPI ID</label>
                  <input required placeholder="yourname@upi" className={inputCls} />
                </div>
              )}

              <button type="submit" disabled={processing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60">
                {processing ? <span className="animate-pulse">Processing…</span> : <><Lock className="h-4 w-4" />Pay ${total}</>}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                <Lock className="mr-1 inline h-3 w-3" />Secured with 256-bit SSL encryption
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;