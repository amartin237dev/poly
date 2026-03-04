"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useInView } from "../hooks/useInView";
import { collections, accentHex, slugify } from "./data";
import type { FragranceLine, Collection } from "./data";

/* ── Fragrance line section sub-component ── */

function FragranceLineSection({
  line,
  active,
  hex,
  addToCart,
  isFirst,
}: {
  line: FragranceLine;
  active: Collection;
  hex: string;
  addToCart: (item: { productName: string; size: string; price: number; collection: string; collectionName: string }) => void;
  isFirst: boolean;
}) {
  const { ref, isInView } = useInView(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const productCount = line.products.length;

  // Calculate how many cards fit in view
  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (w >= 1024) setVisibleCount(3);
      else if (w >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Reset index when collection changes
  useEffect(() => { setActiveIndex(0); }, [line.name]);

  const maxIndex = Math.max(0, productCount - visibleCount);
  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < maxIndex;

  const scroll = (dir: "left" | "right") => {
    setActiveIndex((prev) => {
      if (dir === "left") return Math.max(0, prev - 1);
      return Math.min(maxIndex, prev + 1);
    });
  };

  // Drag / swipe support
  const dragStart = useRef<{ x: number; t: number } | null>(null);
  const dragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, t: Date.now() };
    dragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    if (Math.abs(e.clientX - dragStart.current.x) > 5) dragging.current = true;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dt = Date.now() - dragStart.current.t;
    const threshold = dt < 300 ? 30 : 60;
    if (Math.abs(dx) > threshold) {
      scroll(dx < 0 ? "right" : "left");
    }
    dragStart.current = null;
    // Brief delay so the click event on Link children gets suppressed
    setTimeout(() => { dragging.current = false; }, 10);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section ref={ref}>
      {/* Ornamental divider between sections */}
      {!isFirst && (
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-dark/50" />
          <div
            className="h-2 w-2 rotate-45 border border-amber-dark/50"
            style={{ backgroundColor: `${hex}30` }}
          />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-dark/50" />
        </div>
      )}

      {/* Section header */}
      <div className={`reveal mb-4 flex items-end justify-between sm:mb-8 ${isInView ? "in-view" : ""}`}>
        <div>
          <h2
            className="text-[13px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: hex }}
          >
            {line.name}
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-px w-8" style={{ backgroundColor: hex, opacity: 0.6 }} />
            <div
              className="h-1.5 w-1.5 rotate-45"
              style={{ backgroundColor: hex, opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Card count */}
        <span className="text-[11px] text-foreground-muted">
          {productCount} {productCount === 1 ? "fragrance" : "fragrances"}
        </span>
      </div>

      {/* Product carousel */}
      <div className="relative" ref={containerRef}>
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute -left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-background-secondary/90 backdrop-blur-sm shadow-lg transition-all duration-200 sm:-left-5 sm:h-11 sm:w-11 ${
            canScrollLeft
              ? "border-foreground-muted/40 text-foreground hover:border-accent hover:text-accent"
              : "pointer-events-none border-foreground-muted/10 opacity-0"
          }`}
          aria-label="Previous products"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute -right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-background-secondary/90 backdrop-blur-sm shadow-lg transition-all duration-200 sm:-right-5 sm:h-11 sm:w-11 ${
            canScrollRight
              ? "border-foreground-muted/40 text-foreground hover:border-accent hover:text-accent"
              : "pointer-events-none border-foreground-muted/10 opacity-0"
          }`}
          aria-label="Next products"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards container — no overflow, translated via CSS */}
        <div
          className="overflow-hidden touch-pan-y select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          style={{ cursor: "grab" }}
        >
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${activeIndex} * (${100 / visibleCount}% + ${20 / visibleCount}px)))`,
            }}
          >
            {line.products.map((product, i) => {
              const isFlagship = !product.isFlanker;
              const initial = product.name.charAt(0);

              return (
                <Link
                  key={product.name}
                  href={`/collections/${active.id}/${slugify(product.name)}`}
                  className={`reveal group relative flex flex-col overflow-hidden rounded-lg transition-all duration-500 ${
                    isInView ? "in-view" : ""
                  } ${
                    isFlagship
                      ? "gilded-frame"
                      : "border border-border/50 hover:border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                  }`}
                  style={{
                    flex: `0 0 calc(${100 / visibleCount}% - ${(visibleCount - 1) * 20 / visibleCount}px)`,
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Image area */}
                  <div className="relative aspect-[1/1] w-full overflow-hidden bg-background-secondary sm:aspect-[4/5]">
                    {product.image ? (
                      <>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain transition-transform duration-700 group-hover:scale-110 sm:object-cover"
                        />
                        {/* Collection-colored overlay */}
                        <div
                          className="absolute inset-0 mix-blend-multiply"
                          style={{ backgroundColor: hex, opacity: 0.08 }}
                        />
                      </>
                    ) : (
                      /* No-image fallback: large initial letter */
                      <div className="flex h-full items-center justify-center">
                        <span
                          className="font-[family-name:var(--font-playfair)] text-[120px] font-bold leading-none"
                          style={{ color: hex, opacity: 0.18 }}
                        >
                          {initial}
                        </span>
                      </div>
                    )}

                    {/* Gradient fade to bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                    {/* Inner frame line on hover */}
                    <div className="absolute inset-3 border border-foreground/0 transition-all duration-500 group-hover:border-foreground/10" />

                    {/* Tags floating over image */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                      {product.isFlanker && (
                        <span className="inline-flex rounded-full border border-amber/30 bg-background/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-light backdrop-blur-sm">
                          Flanker
                        </span>
                      )}
                      {product.tag && (
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm ${
                            product.tag === "Limited"
                              ? "border-red-light/40 bg-red-dark/30 text-red-light animate-glow-pulse"
                              : product.tag === "Coming Soon"
                                ? "border-teal-light/40 bg-teal-dark/30 text-teal-light"
                                : "border-foreground-muted/20 bg-background/50 text-foreground-muted"
                          }`}
                        >
                          {product.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content area — overlaps image */}
                  <div className="relative -mt-10 flex flex-1 flex-col px-4 pb-4 sm:-mt-12 sm:p-5 lg:p-7">
                    {/* Product name */}
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug text-foreground lg:text-xl">
                      {product.name}
                    </h3>

                    {/* Size label */}
                    <span className="mt-1 text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                      {product.size}
                    </span>

                    {/* Description */}
                    {product.description && (
                      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-foreground-muted">
                        {product.description}
                      </p>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Price + Add to Cart */}
                    <div className="mt-3 flex items-center justify-between sm:mt-5">
                      {product.price > 0 ? (
                        <>
                          <span
                            className="font-[family-name:var(--font-playfair)] text-lg font-semibold"
                            style={{ color: hex }}
                          >
                            ${product.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart({
                                productName: product.name,
                                size: product.size,
                                price: product.price,
                                collection: active.id,
                                collectionName: active.name,
                              });
                            }}
                            className="group/btn flex items-center gap-2 border border-foreground-muted/40 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_12px_rgba(212,152,42,0.15)]"
                          >
                            Add to Cart
                            <svg
                              className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-foreground-muted">In sets only</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        {productCount > visibleCount && (
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "h-2 w-5"
                    : "h-1.5 w-1.5 opacity-40 hover:opacity-70"
                }`}
                style={{ backgroundColor: idx === activeIndex ? hex : "var(--foreground-muted)" }}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Main Component ── */

export default function CollectionsPage() {
  const [activeId, setActiveId] = useState(collections[0].id);
  const active = collections.find((c) => c.id === activeId)!;
  const { addToCart } = useCart();
  const hex = accentHex[active.id] || "#c8922a";

  const heroView = useInView();

  const switchCollection = (id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />

      {/* ── Hero Section ── */}
      <section
        key={`hero-${activeId}`}
        ref={heroView.ref}
        className="relative overflow-hidden pt-[72px]"
      >
        {/* Radial gradient glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at center top, ${hex}20 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:py-28">
          {/* Subtitle */}
          <p
            className={`reveal text-[11px] font-semibold uppercase tracking-[0.35em] ${
              heroView.isInView ? "in-view" : ""
            } ${active.accent}`}
          >
            {active.subtitle}
          </p>

          {/* Ornament divider */}
          <div
            className={`reveal mx-auto my-5 flex items-center justify-center gap-3 ${
              heroView.isInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${hex}60)` }} />
            <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: hex, opacity: 0.7 }} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent" style={{ backgroundImage: `linear-gradient(to left, transparent, ${hex}60)` }} />
          </div>

          {/* Heading */}
          <h1
            className={`reveal font-[family-name:var(--font-playfair)] text-4xl font-semibold text-foreground lg:text-6xl ${
              heroView.isInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {active.name}
          </h1>

          {/* Description */}
          <p
            className={`reveal mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground-muted lg:text-base ${
              heroView.isInView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {active.description}
          </p>

          {/* Decorative accent line */}
          <div
            className={`reveal mx-auto mt-6 h-px w-20 ${heroView.isInView ? "in-view" : ""}`}
            style={{ backgroundColor: hex, opacity: 0.5, transitionDelay: "400ms" }}
          />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Mobile Navigation (sticky) ── */}
      <nav
        className="sticky top-[72px] z-30 border-b border-amber-dark/10 backdrop-blur-md lg:hidden"
        style={{ backgroundColor: "rgba(15, 11, 8, 0.9)" }}
      >
        <div
          className="flex gap-1 overflow-x-auto px-4 py-3"
          style={{ scrollbarWidth: "none" }}
        >
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => switchCollection(c.id)}
              className="relative shrink-0 px-4 py-2 text-sm font-medium transition-colors"
            >
              <span
                className={
                  activeId === c.id
                    ? `${c.accent}`
                    : "text-foreground-muted hover:text-foreground"
                }
              >
                {c.name}
              </span>
              {/* Bottom accent underline */}
              <span
                className="absolute bottom-0 left-2 right-2 h-[2px] origin-center transition-transform duration-300"
                style={{
                  backgroundColor: accentHex[c.id],
                  transform: activeId === c.id ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* ── Sidebar + Content Split ── */}
      <div className="mx-auto lg:flex">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto py-10 pl-6 pr-4">
            {/* Label */}
            <div className="mb-6">
              <span className="font-[family-name:var(--font-playfair)] text-xs font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                Collections
              </span>
              <div className="mt-2 h-px w-full bg-gradient-to-r from-amber-dark/50 to-transparent" />
            </div>

            {/* Nav items */}
            <div className="flex flex-col gap-1">
              {collections.map((c) => {
                const isActive = activeId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => switchCollection(c.id)}
                    className="group relative py-3 pl-5 text-left transition-colors"
                  >
                    {/* Left accent bar */}
                    <span
                      className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full origin-center transition-transform duration-300"
                      style={{
                        backgroundColor: accentHex[c.id],
                        transform: isActive ? "scaleY(1)" : "scaleY(0)",
                      }}
                    />

                    {/* Horizontal glow */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-r-lg opacity-[0.12]"
                        style={{
                          background: `linear-gradient(to right, ${accentHex[c.id]}, transparent)`,
                        }}
                      />
                    )}

                    <span className="relative flex items-center gap-2">
                      <span
                        className={`font-[family-name:var(--font-playfair)] text-sm transition-colors ${
                          isActive
                            ? `${c.accent} font-semibold`
                            : "text-foreground-muted group-hover:text-foreground"
                        }`}
                      >
                        {c.name}
                      </span>
                      {isActive && (
                        <span
                          className="h-1 w-1 rotate-45"
                          style={{ backgroundColor: accentHex[c.id], opacity: 0.8 }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom ornamental divider */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-dark/40 to-transparent" />
            </div>
            <div className="mt-3 flex justify-center">
              <div className="h-2 w-2 rotate-45 border border-amber-dark/40" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          key={`content-${activeId}`}
          className="flex-1 px-6 py-10 lg:px-10 lg:py-14"
        >
          <div className="space-y-16 lg:space-y-20">
            {active.lines.map((line, idx) => (
              <FragranceLineSection
                key={line.name}
                line={line}
                active={active}
                hex={hex}
                addToCart={addToCart}
                isFirst={idx === 0}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
