"use client";

import Image from "next/image";
import { useInView } from "../hooks/useInView";

const collections = [
  {
    name: "Original Fragrances",
    description: "Our signature blends — bold, layered, unforgettable.",
    image: "/img/Amberish-Absolute-Intense.jpg",
    overlay: "overlay-amber",
    objectPosition: "center 30%",
  },
  {
    name: "Perito Moreno Luxury Perfumes",
    description: "Authorized luxury perfumes from Patagonia's finest house.",
    image: "/img/Amberish-Absolute-Intense.jpg",
    overlay: "overlay-teal",
    objectPosition: "center 50%",
  },
  {
    name: "Perito Moreno Official Decants",
    description: "Experience Perito Moreno's range in curated sample sizes.",
    image: "/img/Amberish-Absolute-Intense.jpg",
    overlay: "overlay-teal-light",
    objectPosition: "center 70%",
  },
  {
    name: "Dark Tales Artisan Perfumery",
    description: "Limited edition artisan perfumery. Seasonal. Fleeting.",
    image: "/img/Amberish-Absolute-Intense.jpg",
    overlay: "overlay-red",
    objectPosition: "left 40%",
  },
  {
    name: "Aromas De Salazar Samples",
    description: "Curated samples from a master perfumer's collection.",
    image: "/img/Amberish-Absolute-Intense.jpg",
    overlay: "overlay-warm",
    objectPosition: "right 50%",
  },
  {
    name: "Perfume Readings with Jamie",
    description: "Discover your scent identity through a personalized fragrance consultation.",
    image: "/img/Amberish-Absolute-Intense.jpg",
    overlay: "overlay-warm-red",
    objectPosition: "center 20%",
    isService: true,
  },
];

export default function Collections() {
  const { ref, isInView } = useInView();

  return (
    <section id="collections" className="relative bg-background-secondary py-28 lg:py-36">
      {/* Subtle radial warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,146,42,0.04)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
            Curated Selection
          </p>
          <div className="ornament mt-4">
            <span className="text-amber-dark text-xs">&#9830;</span>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Our Collections
          </h2>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <a
              key={collection.name}
              href={collection.isService ? "#readings" : "#"}
              className={`reveal group relative overflow-hidden border bg-surface transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1 ${
                isInView ? "in-view" : ""
              } ${
                collection.isService
                  ? "border-accent/30 hover:border-accent"
                  : "border-amber-dark/20 hover:border-amber-dark/50"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image with overlay */}
              <div className={`relative aspect-[4/5] overflow-hidden ${collection.overlay}`}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: collection.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                {/* Inner frame line on hover */}
                <div className="absolute inset-3 border border-foreground/0 transition-all duration-500 group-hover:border-foreground/10" />
              </div>

              {/* Content */}
              <div className="relative -mt-16 p-6 lg:p-8">
                {collection.isService && (
                  <span className="mb-3 inline-block border border-accent/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    Experience
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {collection.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-accent transition-all duration-300 group-hover:gap-3 group-hover:text-accent-hover">
                  {collection.isService ? "Book Now" : "Explore"}
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
