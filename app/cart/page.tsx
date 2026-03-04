"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const accentColors: Record<string, string> = {
  originals: "#c8922a",
  "perito-moreno": "#2a5060",
  "dark-tales": "#b04a30",
  "aromas-de-salazar": "#a89880",
};

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />

      <div className="mx-auto max-w-4xl px-6 pt-[72px] pb-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">Your Cart</h1>
        <div className="mt-2 h-px w-12 bg-accent/30" />

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-foreground-muted/60">Your cart is empty</p>
            <Link
              href="/collections"
              className="border border-accent/40 px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/5"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Items list */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 rounded-lg border border-border/40 bg-surface/50 p-5"
                  >
                    {/* Collection accent dot */}
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: accentColors[item.collection] || "#c8922a" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-[family-name:var(--font-playfair)] text-base font-semibold text-foreground">
                        {item.productName}
                      </p>
                      <p className="mt-0.5 text-xs text-foreground-muted/60">
                        {item.size} · {item.collectionName}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border/60 text-sm text-foreground-muted transition-colors hover:border-accent/40 hover:text-foreground"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border/60 text-sm text-foreground-muted transition-colors hover:border-accent/40 hover:text-foreground"
                        >
                          +
                        </button>
                      </div>
                      {/* Price */}
                      <span className="w-16 text-right text-sm font-semibold text-accent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-foreground-muted/40 transition-colors hover:text-red-light"
                        aria-label="Remove item"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-8 lg:mt-0">
              <div className="rounded-lg border border-amber-dark/20 bg-surface/50 p-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground">
                  Order Summary
                </h2>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Subtotal</span>
                    <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Shipping</span>
                    <span className="text-foreground-muted/60">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border/40 pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-lg font-semibold text-accent">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block w-full border border-accent/50 bg-accent/10 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(212,152,42,0.15)]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
