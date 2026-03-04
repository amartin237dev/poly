"use client";

import { useState } from "react";
import { products, collections } from "../../data";

const statusBadge: Record<string, string> = {
  "in-stock": "bg-[#1e3a4a]/15 text-[#2a5060]",
  "low-stock": "bg-[#8a6218]/15 text-[#8a6218]",
  "out-of-stock": "bg-[#8b2e1c]/15 text-[#8b2e1c]",
};

const statusLabel: Record<string, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("All");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCollection = collection === "All" || p.collection === collection;
    return matchesSearch && matchesCollection;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[#c8b898]/50 bg-[#f0ebe4] px-3 py-2 text-sm text-[#3d352c] placeholder:text-[#7a6e62]/30 focus:border-[#8a6218] focus:outline-none sm:max-w-xs"
        />
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="rounded-lg border border-[#c8b898]/50 bg-[#f0ebe4] px-3 py-2 text-sm text-[#5c5145] focus:border-[#8a6218] focus:outline-none"
        >
          <option value="All">All Collections</option>
          {collections.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8]">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-[#c8b898]/40 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">SKU</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Collection</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Stock</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Price</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#c8b898]/20 transition-colors hover:bg-[#e2dbd0]">
                <td className="px-4 py-3 font-mono text-xs text-[#7a6e62]">{p.sku}</td>
                <td className="px-4 py-3 font-medium text-[#3d352c]">{p.name}</td>
                <td className="px-4 py-3 text-[#5c5145]">{p.collection}</td>
                <td className="px-4 py-3 text-[#5c5145]">{p.stock}</td>
                <td className="px-4 py-3 text-[#5c5145]">${p.price}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusBadge[p.status]}`}>
                    {statusLabel[p.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="rounded px-2 py-1 text-xs text-[#7a6e62] transition-colors hover:bg-[#d5cdc2] hover:text-[#3d352c]">
                      Edit
                    </button>
                    <button className="rounded px-2 py-1 text-xs text-[#8a6218] transition-colors hover:bg-[#8a6218]/10 hover:text-[#6b4c12]">
                      Restock
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-[#7a6e62]/50">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-[#3d352c]">{p.name}</p>
                <p className="font-mono text-xs text-[#7a6e62]">{p.sku}</p>
              </div>
              <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusBadge[p.status]}`}>
                {statusLabel[p.status]}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#5c5145]">
              <span>${p.price}</span>
              <span>Stock: {p.stock}</span>
              <span>{p.collection}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg px-3 py-2 text-sm text-[#7a6e62] transition-colors hover:bg-[#d5cdc2] hover:text-[#3d352c]">
                Edit
              </button>
              <button className="rounded-lg px-3 py-2 text-sm text-[#8a6218] transition-colors hover:bg-[#8a6218]/10 hover:text-[#6b4c12]">
                Restock
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[#7a6e62]/50">No products found.</p>
        )}
      </div>

      <p className="text-xs text-[#7a6e62]/50">
        Showing {filtered.length} of {products.length} products
      </p>
    </div>
  );
}
