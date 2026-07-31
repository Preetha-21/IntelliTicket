import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Send, Globe } from "lucide-react";

interface Message {
  text: string;
  sender: "use" | "bot";
  type?: "text" | "form" | "success";
}

type Lang = "en" | "hi" | "ta";

const LANG_LABELS: Record<Lang, string> = { en: "English", hi: "हिन्दी", ta: "தமிழ்" };

const RESPONSES: Record<Lang, Record<string, string>> = {
  en: {
    price: "🎟️ Ticket prices:\n• Adult: $15\n• Child (under 12): $8\n• Student (with valid ID): $10",
    time: "🕐 We're open:\n• Mon–Fri: 9:00 AM – 6:00 PM\n• Sat–Sun: 10:00 AM – 8:00 PM\n• Closed on public holidays",
    book: "📋 Sure! Please fill out the booking form below:",
    show: "🎨 Current exhibitions:\n• \"Renaissance Reimagined\" — Gallery A\n• \"Modern Sculpture\" — Gallery B\n• \"Ancient Civilizations\" — East Wing\n• \"Photography Through Time\" — West Wing",
    hello: "Hello! 👋 Welcome to MuseumBot. I can help with:\n• Ticket prices\n• Opening times\n• Booking tickets\n• Exhibition info\n\nJust ask!",
    fallback: "I'm not sure about that. Try asking about ticket prices, opening times, booking, or current exhibitions!",
    submitted: "✅ Your ticket request is submitted! We'll send a confirmation shortly.",
    langSwitch: "🌐 Language changed to English.",
  },
  hi: {
    price: "🎟️ टिकट की कीमतें:\n• वयस्क: $15\n• बच्चा (12 से कम): $8\n• छात्र (वैध आईडी के साथ): $10",
    time: "🕐 हम खुले हैं:\n• सोम–शुक्र: सुबह 9:00 – शाम 6:00\n• शनि–रवि: सुबह 10:00 – रात 8:00\n• सार्वजनिक छुट्टियों पर बंद",
    book: "📋 ज़रूर! कृपया नीचे बुकिंग फॉर्म भरें:",
    show: "🎨 वर्तमान प्रदर्शनियाँ:\n• \"पुनर्जागरण पुनर्कल्पित\" — गैलरी A\n• \"आधुनिक मूर्तिकला\" — गैलरी B\n• \"प्राचीन सभ्यताएँ\" — पूर्वी विंग\n• \"समय के माध्यम से फ़ोटोग्राफ़ी\" — पश्चिमी विंग",
    hello: "नमस्ते! 👋 MuseumBot में आपका स्वागत है। मैं आपकी मदद कर सकता हूँ:\n• टिकट की कीमतें\n• खुलने का समय\n• टिकट बुकिंग\n• प्रदर्शनी जानकारी\n\nबस पूछिए!",
    fallback: "मुझे इसके बारे में निश्चित नहीं है। टिकट की कीमतें, समय, बुकिंग, या प्रदर्शनियों के बारे में पूछें!",
    submitted: "✅ आपका टिकट अनुरोध जमा हो गया है! हम जल्द ही पुष्टि भेजेंगे।",
    langSwitch: "🌐 भाषा हिन्दी में बदल दी गई है।",
  },
  ta: {
    price: "🎟️ டிக்கெட் விலைகள்:\n• பெரியவர்: $15\n• குழந்தை (12 வயதுக்கு கீழ்): $8\n• மாணவர் (செல்லுபடியாகும் ID உடன்): $10",
    time: "🕐 நாங்கள் திறந்திருக்கிறோம்:\n• திங்கள்–வெள்ளி: காலை 9:00 – மாலை 6:00\n• சனி–ஞாயிறு: காலை 10:00 – இரவு 8:00\n• பொது விடுமுறை நாட்களில் மூடப்பட்டது",
    book: "📋 நிச்சயமாக! கீழே உள்ள படிவத்தை நிரப்பவும்:",
    show: "🎨 தற்போதைய கண்காட்சிகள்:\n• \"மறுமலர்ச்சி மறுகற்பனை\" — கேலரி A\n• \"நவீன சிற்பம்\" — கேலரி B\n• \"பண்டைய நாகரிகங்கள்\" — கிழக்கு பிரிவு\n• \"காலத்தின் வழியே புகைப்படம்\" — மேற்கு பிரிவு",
    hello: "வணக்கம்! 👋 MuseumBot-க்கு வரவேற்கிறோம். நான் உதவ முடியும்:\n• டிக்கெட் விலைகள்\n• திறக்கும் நேரம்\n• டிக்கெட் முன்பதிவு\n• கண்காட்சி தகவல்\n\nகேளுங்கள்!",
    fallback: "இதைப் பற்றி எனக்கு தெரியவில்லை. டிக்கெட் விலைகள், நேரம், முன்பதிவு அல்லது கண்காட்சிகள் பற்றி கேளுங்கள்!",
    submitted: "✅ உங்கள் டிக்கெட் கோரிக்கை சமர்ப்பிக்கப்பட்டது! விரைவில் உறுதிப்படுத்தல் அனுப்புவோம்.",
    langSwitch: "🌐 மொழி தமிழுக்கு மாற்றப்பட்டது.",
  },
};

// Keywords work across all languages — user can type in English regardless of display lang
function getBotReplyType(input: string, lang: Lang): { text: string; type: "text" | "form" } {
  const lower = input.toLowerCase();
  const r = RESPONSES[lang];
  if (lower.includes("price") || lower.includes("cost") || lower.includes("कीमत") || lower.includes("விலை"))
    return { text: r.price, type: "text" };
  if (lower.includes("time") || lower.includes("open") || lower.includes("hour") || lower.includes("timing") || lower.includes("समय") || lower.includes("நேரம்"))
    return { text: r.time, type: "text" };
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("बुक") || lower.includes("முன்பதிவு"))
    return { text: r.book, type: "form" };
  if (lower.includes("show") || lower.includes("exhibit") || lower.includes("display") || lower.includes("प्रदर्शनी") || lower.includes("கண்காட்சி"))
    return { text: r.show, type: "text" };
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("नमस्ते") || lower.includes("வணக்கம்"))
    return { text: r.hello, type: "text" };
  return { text: r.fallback, type: "text" };
}

const BookingForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [form, setForm] = useState({ name: "", date: "", type: "Adult", num: 1 });
  const update = (k: string, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="mt-2 space-y-3 rounded-md border border-border bg-background p-3"
    >
      <input required placeholder="Your Name" value={form.name} onChange={(e) => update("name", e.target.value)}
        className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
      <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)}
        className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
      <select value={form.type} onChange={(e) => update("type", e.target.value)}
        className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
        <option>Adult</option><option>Child</option><option>Student</option>
      </select>
      <input required type="number" min={1} max={20} value={form.num} onChange={(e) => update("num", +e.target.value || 1)}
        className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" placeholder="Number of tickets" />
      <button type="submit" className="w-full rounded bg-primary py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:brightness-110">
        Submit Booking
      </button>
    </form>
  );
};

const Chatbot = () => {
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([
    { text: RESPONSES.en.hello, sender: "bot", type: "text" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setMessages((prev) => [
      ...prev,
      { text: RESPONSES[newLang].langSwitch, sender: "bot", type: "text" },
    ]);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { text, sender: "user", type: "text" }]);
    setInput("");
    setTimeout(() => {
      const reply = getBotReplyType(text, lang);
      setMessages((prev) => [...prev, { text: reply.text, sender: "bot", type: reply.type }]);
    }, 600);
  };

  const handleBookingSubmit = () => {
    setMessages((prev) => [
      ...prev,
      { text: RESPONSES[lang].submitted, sender: "bot", type: "success" },
    ]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <Navbar />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-6 pt-24">
        <p className="mb-1 text-center text-sm uppercase tracking-[0.3em] text-primary">AI Assistant</p>
        <h1 className="mb-6 text-center font-display text-3xl font-bold text-foreground">MuseumBot Chat</h1>

        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card">
          {/* Header with language selector */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-sm font-medium text-foreground">MuseumBot</span>
            <div className="ml-auto flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select
                value={lang}
                onChange={(e) => handleLangChange(e.target.value as Lang)}
                className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                  <option key={l} value={l}>{LANG_LABELS[l]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-5" style={{ minHeight: "400px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${
                msg.sender === "bot"
                  ? `self-start rounded-tl-none ${msg.type === "success" ? "border border-success/30 bg-success/10 text-foreground" : "bg-secondary text-secondary-foreground"}`
                  : "ml-auto rounded-tr-none bg-primary text-primary-foreground"
              }`}>
                <span className="whitespace-pre-line">{msg.text}</span>
                {msg.type === "form" && <BookingForm onSubmit={handleBookingSubmit} />}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestion buttons */}
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {[
              { label: "🎟️ Book Ticket", query: "book ticket" },
              { label: "💰 Ticket Price", query: "ticket price" },
              { label: "🕐 Museum Timings", query: "museum timings" },
              { label: "🎨 Shows Today", query: "shows today" },
            ].map((btn) => (
              <button
                key={btn.query}
                onClick={() => {
                  setMessages((prev) => [...prev, { text: btn.query, sender: "user", type: "text" }]);
                  setTimeout(() => {
                    const reply = getBotReplyType(btn.query, lang);
                    setMessages((prev) => [...prev, { text: reply.text, sender: "bot", type: reply.type }]);
                  }, 600);
                }}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about prices, hours, or type 'book ticket'..."
                className="flex-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="submit" className="flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-primary-foreground transition-all hover:brightness-110">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
