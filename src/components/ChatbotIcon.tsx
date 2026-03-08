import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const ChatbotIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 rounded-lg bg-card border border-border shadow-2xl overflow-hidden animate-fade-up">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <span className="font-display text-sm font-semibold">Museum Assistant</span>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="p-4 h-64 flex flex-col justify-between">
            <div className="space-y-3 text-sm font-body">
              <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                👋 Hello! How can I help you with your museum visit today?
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm font-body">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-gold-dark transition-colors flex items-center justify-center animate-pulse-glow"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatbotIcon;
