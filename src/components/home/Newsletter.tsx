export function Newsletter() {
  return (
    <section
      className="rounded-lg border border-border bg-card px-6 py-12 shadow-soft sm:px-12 sm:py-14"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 id="newsletter-heading" className="font-display text-headline-lg tracking-tight text-primary">
          Stay in the loop
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-[17px] sm:leading-relaxed">
          Occasionally we announce new guides and major updates worth your attention. Subscribe when signup is enabled.
        </p>
        <form className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-10" action="#" method="post">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 min-w-[min(100%,260px)] flex-1 rounded-none border-0 border-b border-border bg-transparent pb-3 text-[15px] outline-none ring-0 placeholder:text-muted-foreground/70 focus-visible:border-primary"
          />
          <button
            type="button"
            className="h-12 shrink-0 rounded-lg bg-primary px-10 text-sm font-semibold text-primary-foreground opacity-70 shadow-soft transition hover:-translate-y-0.5 hover:opacity-95 hover:shadow-elevated disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled
            title="Signup is not enabled yet."
          >
            Coming soon
          </button>
        </form>
      </div>
    </section>
  );
}
