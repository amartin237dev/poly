"use client";

import Image from "next/image";
import { useInView } from "../hooks/useInView";

const notes = ["Amber", "Benzoin", "Labdanum", "Vanilla", "Musk", "Sandalwood"];

export default function FeaturedProduct() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      {/* Atmospheric gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,146,42,0.06)_0%,transparent_70%)]" />

      <div ref={ref} className={`reveal ${isInView ? "in-view" : ""}`}>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: framed painting image */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="gilded-frame overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/img/Amberish-Absolute-Intense.jpg"
                    alt="Amberish Absolute Intense"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 40%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>
              </div>
              {/* Shadow beneath frame */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,transparent_70%)]" />
            </div>

            {/* Right: product details */}
            <div className="text-center lg:text-left">
              <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
                Featured
              </p>

              {/* Ornamental line */}
              <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
                <span className="block h-px w-8 bg-amber-dark/50" />
                <span className="block h-1 w-1 rotate-45 bg-amber-dark/50" />
              </div>

              <h2
                className="mt-6 font-[family-name:var(--font-playfair)] italic font-semibold text-foreground"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Amberish Absolute Intense
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted lg:text-lg">
                A rich, enveloping amber that unfolds in layers of resinous warmth.
                Bold yet intimate — our signature statement.
              </p>

              {/* Scent note pills */}
              <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {notes.map((note) => (
                  <span
                    key={note}
                    className="border border-amber-dark/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-muted transition-all duration-300 hover:border-accent/50 hover:text-accent"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <a
                href="/collections"
                className="mt-10 inline-flex h-13 items-center border border-accent/50 px-10 text-[13px] font-semibold uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(212,152,42,0.15)] animate-glow-pulse"
              >
                Discover
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
