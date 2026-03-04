"use client";

import Image from "next/image";
import { useInView } from "../hooks/useInView";

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="relative py-28 lg:py-36">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,146,42,0.04)_0%,transparent_50%)]" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-3xl px-6 text-center reveal ${isInView ? "in-view" : ""}`}
      >
        {/* Mr and Mrs Sniff image */}
        <div className="mb-8 flex items-center justify-center">
          <Image
            src="/img/MrandMrsSniffnobg.png"
            alt="Mr and Mrs Sniff"
            width={360}
            height={360}
            className="h-16 w-auto sm:h-72"
          />
        </div>

        <h2 className="text-3xl text-foreground md:text-4xl lg:text-5xl">
          <span className="brand-shadow inline-block">
            <span className="font-[family-name:var(--font-nunito)] uppercase tracking-[0.06em] text-foreground">
              <span className="font-light">Poly</span>
              <span className="font-black">snifferous</span>
            </span>
          </span>
          <br />
          <span className="font-[family-name:var(--font-playfair)] italic font-semibold text-amber">is for the People</span>
        </h2>

        {/* Decorative divider */}
        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <span className="block h-px w-12 bg-gradient-to-r from-transparent to-amber-dark/50" />
          <span className="block h-1.5 w-1.5 rotate-45 border border-amber-dark/50" />
          <span className="block h-px w-12 bg-gradient-to-l from-transparent to-amber-dark/50" />
        </div>

        <p className="mt-8 text-lg leading-relaxed text-foreground-muted">
          We&apos;re Jamie &amp; Noah — fragrance and psychology nerds who
          believe luxury scent shouldn&apos;t live behind a velvet rope. From
          original house blends to authorized decants of the world&apos;s most
          sought-after scents, we make niche perfumery accessible to everyone.
        </p>
        <p className="mt-5 text-base leading-relaxed text-foreground-muted/80">
          Follow along for reviews, drops, and the occasional unhinged scent
          take.
        </p>

        {/* Social links */}
        <div className="mt-12 flex justify-center gap-8">
          <a
            href="https://instagram.com/mrandmrssniff"
            className="group flex flex-col items-center gap-2 text-foreground-muted transition-colors duration-300 hover:text-accent"
            aria-label="Instagram"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.15em]">Instagram</span>
          </a>
          <a
            href="https://tiktok.com/@mrandmrssniff"
            className="group flex flex-col items-center gap-2 text-foreground-muted transition-colors duration-300 hover:text-accent"
            aria-label="TikTok"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.99-.43z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.15em]">TikTok</span>
          </a>
          <a
            href="https://youtube.com/@mrandmrssniff"
            className="group flex flex-col items-center gap-2 text-foreground-muted transition-colors duration-300 hover:text-accent"
            aria-label="YouTube"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.15em]">YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
}
