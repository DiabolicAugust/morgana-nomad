export function Newsletter() {
  return (
    <section
      className="mt-16 rounded-2xl border border-border bg-card px-6 py-10 sm:px-10"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 id="newsletter-heading" className="text-2xl font-bold tracking-tight">
          Stay in the loop
        </h2>
        <p className="mt-3 text-muted-foreground text-sm">
          Occasionally we announce new guides and major updates worth your attention. Subscribe when signup is enabled.
        </p>
        <form className="mt-6 flex flex-col sm:flex-row gap-3" action="#" method="post">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none ring-ring focus-visible:ring-2"
          />
          <button
            type="button"
            className="h-11 shrink-0 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground opacity-80 cursor-not-allowed"
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
