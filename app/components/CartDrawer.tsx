"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, cartTotal, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={closeDrawer} />

      {/* Panel */}
      <div className="absolute right-0 top-0 flex h-full w-4/5 max-w-md flex-col border-l border-amber-dark/20 bg-background backdrop-blur-xl animate-slide-in-right">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-dark/20 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-dark/20 px-6 py-5">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground">Your Cart</h2>
          <button onClick={closeDrawer} className="text-foreground-muted transition-colors hover:text-foreground" aria-label="Close cart">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <p className="text-sm text-foreground-muted">Your cart is empty</p>
            <Link
              href="/collections"
              onClick={closeDrawer}
              className="border border-accent/40 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/5"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-surface p-4">
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-[family-name:var(--font-playfair)] text-sm font-semibold text-foreground">
                        {item.productName}
                      </p>
                      <p className="mt-0.5 text-[11px] text-foreground-muted">
                        {item.size} · {item.collectionName}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-accent">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-foreground-muted/60 transition-colors hover:text-red-light"
                        aria-label="Remove item"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-xs text-foreground-muted transition-colors hover:border-accent/60 hover:text-foreground"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-xs font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-xs text-foreground-muted transition-colors hover:border-accent/60 hover:text-foreground"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-amber-dark/20 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Subtotal</span>
                <span className="text-lg font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="flex-1 border border-border py-3 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/80 transition-all hover:border-accent/60 hover:text-foreground"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="flex-1 border border-accent/60 bg-accent/15 py-3 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-accent transition-all hover:border-accent hover:bg-accent/20"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
