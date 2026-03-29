const BookSection = () => {
  return (
    <section id="book" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">
          Ready to Visit?
        </p>
        <h2 className="mb-6 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Book Your Tickets Now
        </h2>
        <p className="mx-auto mb-10 max-w-lg font-body text-muted-foreground">
          Start a conversation with our chatbot below and get your tickets in seconds. Choose your date, select the number of visitors, and you're all set.
        </p>

        {/* Simulated chat widget */}
        <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="font-body text-sm font-medium text-foreground">MuseumBot</span>
            <span className="ml-auto text-xs text-muted-foreground">Online</span>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <div className="self-start rounded-lg rounded-tl-none bg-secondary px-4 py-2">
              <p className="font-body text-sm text-secondary-foreground">
                Hello! 👋 I can help you book museum tickets. When would you like to visit?
              </p>
            </div>
            <div className="self-end rounded-lg rounded-tr-none bg-primary px-4 py-2">
              <p className="font-body text-sm text-primary-foreground">
                I'd like 2 tickets for this Saturday
              </p>
            </div>
            <div className="self-start rounded-lg rounded-tl-none bg-secondary px-4 py-2">
              <p className="font-body text-sm text-secondary-foreground">
                Great choice! Saturday tickets are available. That'll be $24 for 2 adults. Shall I proceed?
              </p>
            </div>
          </div>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
              <span className="font-body text-sm text-muted-foreground">Type a message...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
