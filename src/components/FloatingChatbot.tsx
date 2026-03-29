import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("ticket"))
    return "🎟️ Ticket price is ₹100 for adults and ₹50 for children. Students get ₹70 with a valid ID.";
  if (lower.includes("timing") || lower.includes("time") || lower.includes("open") || lower.includes("hour"))
    return "🕐 Museum is open from 9 AM to 6 PM (Mon–Fri) and 10 AM to 8 PM (Sat–Sun).";
  if (lower.includes("event") || lower.includes("show") || lower.includes("exhibit"))
    return "🎨 You can view today's events on our Events page. We have 6+ exhibitions running!";
  if (lower.includes("book") || lower.includes("reserve"))
    return "📋 You can book tickets from the booking page. Click the link below!\n→ /book";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hello! 👋 I'm MuseumBot. Ask me about ticket prices, timings, events, or how to book!";
  return "I can help with ticket prices, museum timings, events info, and booking. Try asking about those!";
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! 👋 I'm MuseumBot. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getBotReply(text), sender: "bot" }]);
    }, 500);
  };

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-110 hover:brightness-110"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/10 animate-scale-in sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="flex-1 font-body text-sm font-semibold text-foreground">MuseumBot</span>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.sender === "bot"
                    ? "self-start rounded-tl-none bg-secondary text-secondary-foreground"
                    : "ml-auto rounded-tr-none bg-primary text-primary-foreground"
                }`}
              >
                <span className="whitespace-pre-line">
                  {msg.text.includes("→ /book") ? (
                    <>
                      {msg.text.replace("\n→ /book", "")}
                      <br />
                      <Link to="/book" className="mt-1 inline-block font-semibold underline">
                        → Go to Booking Page
                      </Link>
                    </>
                  ) : (
                    msg.text
                  )}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick buttons */}
          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2">
            {["💰 Price", "🕐 Timing", "🎨 Events", "📋 Book"].map((label) => (
              <button
                key={label}
                onClick={() => send(label)}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-3 py-2 text-primary-foreground hover:brightness-110"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
