"use client";

import { useInView } from "../hooks/useInView";

export default function Newsletter() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative bg-background-secondary py-28 lg:py-36">
      {/* Gilded top and bottom edges */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-dark/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-dark/30 to-transparent" />

      {/* Ambient warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,146,42,0.04)_0%,transparent_60%)]" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-2xl px-6 text-center reveal ${isInView ? "in-view" : ""}`}
      >
        <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
          Stay in the Loop
        </p>
        <div className="ornament mt-4">
          <span className="text-amber-dark text-xs">&#9830;</span>
        </div>
        <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground md:text-4xl">
          Join the Inner Circle
        </h2>
        <p className="mt-5 text-base leading-relaxed text-foreground-muted">
          New drops, limited editions, and exclusive reading slots — delivered
          to your inbox before anyone else.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="h-13 flex-1 border border-amber-dark/30 bg-background px-5 text-sm text-foreground placeholder:text-foreground-muted/40 outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_12px_rgba(212,152,42,0.1)] sm:max-w-xs"
          />
          <button
            type="submit"
            className="h-13 border border-accent bg-accent/10 px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-background hover:shadow-[0_0_20px_rgba(212,152,42,0.2)]"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-5 text-xs uppercase tracking-[0.1em] text-foreground-muted/40">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
