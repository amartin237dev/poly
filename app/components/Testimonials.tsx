"use client";

import { useInView } from "../hooks/useInView";

const testimonials = [
  {
    quote:
      "Jamie helped me find a scent I never would have chosen on my own — and now it's the only fragrance I wear.",
    name: "Sarah M.",
    detail: "Perfume Reading Client",
  },
  {
    quote:
      "Finally, a perfume shop that doesn't gatekeep. The decant selection is incredible and the service is personal.",
    name: "David R.",
    detail: "Loyal Customer",
  },
  {
    quote:
      "The Dark Tales collection is unlike anything I've ever smelled. Every bottle tells a story. Absolutely obsessed.",
    name: "Priya K.",
    detail: "Fragrance Enthusiast",
  },
];

export default function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-28 lg:py-36">
      {/* Subtle warm ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,46,28,0.05)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
            What People Say
          </p>
          <div className="ornament mt-4">
            <span className="text-amber-dark text-xs">&#9830;</span>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            From Our Community
          </h2>
        </div>

        <div ref={ref} className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal relative border border-amber-dark/15 bg-surface p-8 transition-all duration-500 hover:border-amber-dark/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] lg:p-10 ${
                isInView ? "in-view" : ""
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Inner frame accent */}
              <div className="absolute inset-3 border border-amber-dark/5 pointer-events-none" />

              {/* Large decorative quote */}
              <span className="font-[family-name:var(--font-playfair)] text-6xl leading-none text-accent/20">
                &ldquo;
              </span>
              <p className="mt-1 text-base leading-relaxed text-foreground-muted italic">
                {t.quote}
              </p>

              {/* Gilded divider */}
              <div className="mt-8 flex items-center gap-3">
                <span className="block h-px flex-1 bg-gradient-to-r from-amber-dark/30 to-transparent" />
                <span className="block h-1 w-1 rotate-45 bg-amber-dark/40" />
              </div>

              <div className="mt-4">
                <p className="font-[family-name:var(--font-playfair)] text-sm font-semibold tracking-wide text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-foreground-muted/60">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
