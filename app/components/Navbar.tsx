"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

export default function Navbar({ variant = "hero" }: { variant?: "hero" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, openDrawer } = useCart();

  // On dark-background pages, always use the dark style
  const dark = variant === "dark" || scrolled;

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (variant === "dark") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const close = () => setOpen(false);
  const badge = cartCount > 9 ? "9+" : cartCount > 0 ? String(cartCount) : null;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        dark
          ? "bg-background/92 backdrop-blur-lg shadow-[0_1px_0_rgba(138,98,24,0.15),0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 lg:px-12">
        {/* Logo */}
        <a href="/" className={`transition-all duration-300 hover:brightness-125 ${dark ? "" : "brand-shadow"}`}>
          <span className={`font-[family-name:var(--font-nunito)] text-[20px] uppercase tracking-[0.08em] transition-all duration-700 ${
            dark ? "text-foreground" : "brand-painted"
          }`}>
            <span className="font-light">Poly</span>
            <span className="font-black">snifferous</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className={`hidden items-center gap-12 text-[14px] font-medium uppercase tracking-[0.25em] transition-colors duration-700 lg:flex ${
          dark ? "text-foreground/80" : "text-[#3d2e1a]"
        }`}>
          <li>
            <a href="/collections" className={`relative py-2 transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-0 after:bg-gradient-to-r after:from-transparent after:via-accent after:to-transparent after:transition-all after:duration-500 hover:after:w-full ${
              dark ? "hover:text-foreground" : "hover:text-[#2a1f14]"
            }`}>
              Shop
            </a>
          </li>
          <li className="flex items-center gap-12">
            <span className={`block h-3 w-px transition-colors duration-700 ${dark ? "bg-amber-dark/20" : "bg-[#8a6218]/25"}`} />
          </li>
          <li>
            <a href="/readings" className={`relative py-2 transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-0 after:bg-gradient-to-r after:from-transparent after:via-accent after:to-transparent after:transition-all after:duration-500 hover:after:w-full ${
              dark ? "hover:text-foreground" : "hover:text-[#2a1f14]"
            }`}>
              Perfume Readings
            </a>
          </li>
          <li className="flex items-center gap-12">
            <span className={`block h-3 w-px transition-colors duration-700 ${dark ? "bg-amber-dark/20" : "bg-[#8a6218]/25"}`} />
          </li>
          <li>
            <a href="/about" className={`relative py-2 transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-0 after:bg-gradient-to-r after:from-transparent after:via-accent after:to-transparent after:transition-all after:duration-500 hover:after:w-full ${
              dark ? "hover:text-foreground" : "hover:text-[#2a1f14]"
            }`}>
              About
            </a>
          </li>
        </ul>

        {/* Desktop: Cart icon + CTA */}
        <div className="hidden items-center gap-6 lg:flex">
          <button
            onClick={openDrawer}
            className={`relative transition-all duration-300 ${
              dark ? "text-foreground-muted/70 hover:text-accent" : "text-[#5c4a38] hover:text-[#2a1f14]"
            }`}
            aria-label="Open cart"
          >
            <CartIcon className="h-[18px] w-[18px]" />
            {badge && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-background">
                {badge}
              </span>
            )}
          </button>
          <a
            href="/readings"
            className={`group inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-700 ${
              dark ? "text-accent/80 hover:text-accent" : "text-[#8a6218]/80 hover:text-[#8a6218]"
            }`}
          >
            Book a Reading
            <span className={`block h-px w-6 transition-all duration-300 group-hover:w-10 ${
              dark ? "bg-accent/40 group-hover:bg-accent" : "bg-[#8a6218]/40 group-hover:bg-[#8a6218]"
            }`} />
          </a>
        </div>

        {/* Mobile: Cart icon + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={openDrawer}
            className={`relative transition-all duration-300 ${
              dark ? "text-foreground/80" : "text-[#3d352c]"
            }`}
            aria-label="Open cart"
          >
            <CartIcon className="h-[18px] w-[18px]" />
            {badge && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-background">
                {badge}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px w-5 transition-all duration-300 ${
                open ? "translate-y-[6px] rotate-45 bg-foreground/80" : dark ? "bg-foreground/80" : "bg-[#3d352c]"
              }`}
            />
            <span
              className={`block h-px w-5 transition-all duration-300 ${
                open ? "opacity-0 bg-foreground/80" : dark ? "bg-foreground/80" : "bg-[#3d352c]"
              }`}
            />
            <span
              className={`block h-px w-5 transition-all duration-300 ${
                open ? "-translate-y-[6px] -rotate-45 bg-foreground/80" : dark ? "bg-foreground/80" : "bg-[#3d352c]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={close}
          />
          <div className="absolute right-0 top-0 flex h-full w-4/5 max-w-sm flex-col border-l border-amber-dark/10 bg-background/95 backdrop-blur-xl animate-slide-in-right">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-dark/20 to-transparent" />
            <div className="flex flex-col gap-0 px-8 pt-24">
              <a href="/collections" onClick={close} className="border-b border-amber-dark/8 py-5 font-[family-name:var(--font-playfair)] text-xl tracking-wide text-foreground/80 transition-colors hover:text-accent">Shop</a>
              <a href="/readings" onClick={close} className="border-b border-amber-dark/8 py-5 font-[family-name:var(--font-playfair)] text-xl tracking-wide text-foreground/80 transition-colors hover:text-accent">Perfume Readings</a>
              <a href="/about" onClick={close} className="border-b border-amber-dark/8 py-5 font-[family-name:var(--font-playfair)] text-xl tracking-wide text-foreground/80 transition-colors hover:text-accent">About</a>
              <button
                onClick={() => { close(); openDrawer(); }}
                className="border-b border-amber-dark/8 py-5 text-left font-[family-name:var(--font-playfair)] text-xl tracking-wide text-foreground/80 transition-colors hover:text-accent"
              >
                Cart{cartCount > 0 && <span className="ml-2 text-sm text-accent">({cartCount})</span>}
              </button>
            </div>
            <div className="mt-auto px-8 pb-12">
              <a href="/readings" onClick={close} className="block w-full border border-accent/40 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/5">
                Book a Reading
              </a>
              <div className="mt-8 flex justify-center gap-6">
                <a href="https://instagram.com/mrandmrssniff" className="text-foreground-muted/40 transition-colors hover:text-accent" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://tiktok.com/@mrandmrssniff" className="text-foreground-muted/40 transition-colors hover:text-accent" aria-label="TikTok">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.99-.43z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
