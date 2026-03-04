"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { useCart } from "../../../context/CartContext";
import { useInView } from "../../../hooks/useInView";
import { collections, accentHex, slugify } from "../../data";
import type { Product, FragranceLine } from "../../data";

export default function ProductDetailPage() {
  const params = useParams<{ collectionId: string; productSlug: string }>();
  const { addToCart } = useCart();

  const heroView = useInView(0.1);
  const infoView = useInView(0.1);
  const siblingsView = useInView(0.1);

  // Lookup
  const collection = collections.find((c) => c.id === params.collectionId);
  let product: Product | undefined;
  let line: FragranceLine | undefined;

  if (collection) {
    for (const l of collection.lines) {
      const found = l.products.find((p) => slugify(p.name) === params.productSlug);
      if (found) {
        product = found;
        line = l;
        break;
      }
    }
  }

  const hex = accentHex[params.collectionId] || "#c8922a";
  const isFlagship = product ? !product.isFlanker : false;
  const initial = product?.name.charAt(0) || "?";
  const siblings = line ? line.products.filter((p) => p.name !== product?.name) : [];

  // Not found
  if (!collection || !product) {
    return (
      <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
        <Navbar variant="dark" />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-[72px]">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
            Product Not Found
          </h1>
          <p className="mt-4 text-foreground-muted">
            The fragrance you&apos;re looking for doesn&apos;t exist in our collection.
          </p>
          <Link
            href="/collections"
            className="mt-8 border border-foreground-muted/40 px-6 py-3 text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
          >
            &larr; Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />

      {/* ── Breadcrumb ── */}
      <nav className="relative z-10 px-6 pt-[84px] lg:px-16" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
          <li>
            <Link href="/collections" className="text-foreground-muted/60 transition-colors hover:text-accent">Collections</Link>
          </li>
          <li className="text-foreground-muted/30">/</li>
          <li>
            <Link href={`/collections#${collection.id}`} className="text-foreground-muted/60 transition-colors hover:text-accent">{collection.name}</Link>
          </li>
          {line && line.name !== product.name && (
            <>
              <li className="text-foreground-muted/30">/</li>
              <li className="text-foreground-muted/60">{line.name}</li>
            </>
          )}
          <li className="text-foreground-muted/30">/</li>
          <li className="text-foreground/80">{product.name}</li>
        </ol>
      </nav>

      {/* ── Hero Section ── */}
      <section
        ref={heroView.ref}
        className="relative overflow-hidden"
      >
        {/* Background image at low opacity */}
        {product.image && (
          <div className="absolute inset-0">
            <Image
              src={product.image}
              alt=""
              fill
              className="object-cover opacity-15 blur-sm"
              priority
            />
          </div>
        )}

        {/* Initial letter fallback for imageless products */}
        {!product.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-[family-name:var(--font-playfair)] text-[280px] font-bold leading-none select-none"
              style={{ color: hex, opacity: 0.06 }}
            >
              {initial}
            </span>
          </div>
        )}

        {/* Radial gradient glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center bottom, ${hex}25 0%, transparent 70%)`,
          }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

        {/* Hero content */}
        <div className="relative flex flex-col justify-end px-6 pb-8 pt-8 lg:px-16 lg:pb-12 lg:pt-20">
          {/* Product name */}
          <h1
            className={`reveal mt-3 font-[family-name:var(--font-playfair)] text-4xl font-semibold text-foreground lg:text-6xl ${heroView.isInView ? "in-view" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            {product.name}
          </h1>

          {/* Size */}
          <span
            className={`reveal mt-3 text-[11px] uppercase tracking-[0.2em] text-foreground-muted ${heroView.isInView ? "in-view" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            {product.size}
          </span>
        </div>
      </section>

      {/* ── Product Info Section ── */}
      <section ref={infoView.ref} className="mx-auto max-w-6xl px-4 py-6 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
          {/* Left: Product image */}
          <div
            className={`reveal flex-shrink-0 lg:w-[45%] ${infoView.isInView ? "in-view" : ""}`}
          >
            <div
              className={`relative aspect-square w-full overflow-hidden rounded-lg lg:aspect-[3/4] ${
                isFlagship ? "gilded-frame" : "border border-border/50"
              }`}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-background-secondary">
                  <span
                    className="font-[family-name:var(--font-playfair)] text-[160px] font-bold leading-none"
                    style={{ color: hex, opacity: 0.18 }}
                  >
                    {initial}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col lg:w-[55%]">
            {/* Tags */}
            <div
              className={`reveal flex flex-wrap gap-2 ${infoView.isInView ? "in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              {product.isFlanker && (
                <span className="inline-flex rounded-full border border-amber/30 bg-background/60 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-light backdrop-blur-sm">
                  Flanker
                </span>
              )}
              {product.tag && (
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm ${
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

            {/* Price */}
            <div
              className={`reveal mt-4 lg:mt-6 ${infoView.isInView ? "in-view" : ""}`}
              style={{ transitionDelay: "200ms" }}
            >
              {product.price > 0 ? (
                <span
                  className="font-[family-name:var(--font-playfair)] text-3xl font-semibold"
                  style={{ color: hex }}
                >
                  ${product.price}
                </span>
              ) : (
                <span className="text-sm text-foreground-muted">
                  Available in sample sets only
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p
                className={`reveal mt-3 text-sm leading-relaxed text-foreground-muted lg:mt-6 lg:text-base ${infoView.isInView ? "in-view" : ""}`}
                style={{ transitionDelay: "300ms" }}
              >
                {product.description}
              </p>
            )}

            {/* Add to Cart */}
            {product.price > 0 && (
              <div
                className={`reveal mt-5 lg:mt-8 ${infoView.isInView ? "in-view" : ""}`}
                style={{ transitionDelay: "400ms" }}
              >
                <button
                  onClick={() =>
                    addToCart({
                      productName: product!.name,
                      size: product!.size,
                      price: product!.price,
                      collection: collection.id,
                      collectionName: collection.name,
                    })
                  }
                  className="group/btn flex items-center gap-3 border border-foreground-muted/40 px-8 py-3 text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(212,152,42,0.2)]"
                >
                  Add to Cart
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Ornamental divider */}
            <div
              className={`reveal mt-10 flex items-center gap-4 ${infoView.isInView ? "in-view" : ""}`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-dark/50" />
              <div
                className="h-2 w-2 rotate-45 border border-amber-dark/50"
                style={{ backgroundColor: `${hex}30` }}
              />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-dark/50" />
            </div>

            {/* Back link */}
            <Link
              href="/collections"
              className={`reveal mt-8 inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors duration-200 hover:text-foreground ${infoView.isInView ? "in-view" : ""}`}
              style={{ transitionDelay: "600ms" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to {collection.name}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Siblings Section ── */}
      {siblings.length > 0 && (
        <section ref={siblingsView.ref} className="mx-auto max-w-6xl px-6 pb-20 lg:px-16">
          {/* Divider */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-dark/50" />
            <div
              className="h-2 w-2 rotate-45 border border-amber-dark/50"
              style={{ backgroundColor: `${hex}30` }}
            />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-dark/50" />
          </div>

          <h2
            className={`reveal font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground ${siblingsView.isInView ? "in-view" : ""}`}
          >
            More from{" "}
            <span style={{ color: hex }}>{line!.name}</span>
          </h2>

          <div
            className="mt-8 flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {siblings.map((sibling, i) => {
              const sibInitial = sibling.name.charAt(0);
              const sibIsFlagship = !sibling.isFlanker;

              return (
                <Link
                  key={sibling.name}
                  href={`/collections/${collection.id}/${slugify(sibling.name)}`}
                  className={`reveal group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-lg transition-all duration-500 ${
                    siblingsView.isInView ? "in-view" : ""
                  } ${
                    sibIsFlagship
                      ? "gilded-frame"
                      : "border border-border/50 hover:border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-background-secondary">
                    {sibling.image ? (
                      <>
                        <Image
                          src={sibling.image}
                          alt={sibling.name}
                          fill
                          sizes="220px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0 mix-blend-multiply"
                          style={{ backgroundColor: hex, opacity: 0.08 }}
                        />
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span
                          className="font-[family-name:var(--font-playfair)] text-[80px] font-bold leading-none"
                          style={{ color: hex, opacity: 0.18 }}
                        >
                          {sibInitial}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative -mt-6 px-3 pb-3">
                    <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-foreground">
                      {sibling.name}
                    </h3>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                      {sibling.size}
                    </span>
                    {sibling.price > 0 && (
                      <span
                        className="mt-2 block font-[family-name:var(--font-playfair)] text-sm font-semibold"
                        style={{ color: hex }}
                      >
                        ${sibling.price}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
