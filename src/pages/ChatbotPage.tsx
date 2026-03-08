import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";

interface Message {
  text: string;
  sender: "bot" | "user";
}

const defaultReplies: Record<string, string> = {
  hello: "Hello! Welcome to MuseumTix. How can I help you?",
  hours: "We're open Mon–Fri 9AM–6PM and Sat–Sun 10AM–8PM.",
  price: "General Entry is $15, Special Show is $25, and Guided Tour is $35.",
  tickets: "You can book tickets from the Book Tickets page. Would you like me to help with anything else?",
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm the Museum Assistant. Ask me about hours, prices, or tickets!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { text: input, sender: "user" };
    const lower = input.toLowerCase();
    const botReply = Object.entries(defaultReplies).find(([key]) => lower.includes(key))?.[1] 
      || "I'm not sure about that. Try asking about hours, prices, or tickets!";
    setMessages((prev) => [...prev, userMsg, { text: botReply, sender: "bot" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="text-primary" size={26} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Museum Chatbot</h1>
          <p className="text-muted-foreground font-body mt-2">Ask me anything about your visit</p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-lg px-4 py-3 text-sm font-body ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              className="font-body"
            />
            <Button onClick={sendMessage} className="bg-primary hover:bg-gold-dark text-primary-foreground">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
