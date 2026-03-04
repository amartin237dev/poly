"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="ornament mb-6">
            <span className="block h-1 w-1 rotate-45 bg-accent" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">
            Order Confirmed
          </h1>
          <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-foreground-muted">
            Thank you for your order, {form.name}! This is a mock checkout — no payment was processed. Your fragrances await in the ether.
          </p>
          <div className="ornament mt-6">
            <span className="block h-1 w-1 rotate-45 bg-accent" />
          </div>
          <Link
            href="/"
            className="mt-10 border border-accent/50 px-10 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/5"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />

      <div className="mx-auto max-w-4xl px-6 pt-[72px] pb-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">Checkout</h1>
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
          <form onSubmit={handleSubmit} className="mt-8 lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Form fields */}
            <div className="space-y-5 lg:col-span-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                  Full Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="w-full rounded-lg border border-border/60 bg-background-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full rounded-lg border border-border/60 bg-background-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                  Address
                </label>
                <input
                  required
                  value={form.address}
                  onChange={update("address")}
                  className="w-full rounded-lg border border-border/60 bg-background-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                    City
                  </label>
                  <input
                    required
                    value={form.city}
                    onChange={update("city")}
                    className="w-full rounded-lg border border-border/60 bg-background-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                    ZIP Code
                  </label>
                  <input
                    required
                    value={form.zip}
                    onChange={update("zip")}
                    className="w-full rounded-lg border border-border/60 bg-background-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full border border-accent/50 bg-accent/10 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(212,152,42,0.15)] lg:hidden"
              >
                Place Order
              </button>
            </div>

            {/* Order summary sidebar */}
            <div className="mt-8 lg:mt-0">
              <div className="rounded-lg border border-amber-dark/20 bg-surface/50 p-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground">
                  Order Summary
                </h2>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate text-foreground-muted">
                        {item.productName} × {item.quantity}
                      </span>
                      <span className="ml-4 shrink-0 text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border/40 pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-lg font-semibold text-accent">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 hidden w-full border border-accent/50 bg-accent/10 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all hover:border-accent hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(212,152,42,0.15)] lg:block"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
