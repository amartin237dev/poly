"use client";

import { orders } from "../../data";

const statusBadge: Record<string, string> = {
  delivered: "bg-[#1e3a4a]/15 text-[#2a5060]",
  shipped: "bg-[#1e3a4a]/15 text-[#2a5060]",
  pending: "bg-[#8a6218]/15 text-[#8a6218]",
  processing: "bg-[#8a6218]/15 text-[#8a6218]",
  cancelled: "bg-[#8b2e1c]/15 text-[#8b2e1c]",
};

export default function OrdersPage() {
  const stats = [
    { label: "Total Orders", value: orders.length, accent: "border-[#7a6e62]" },
    { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length, accent: "border-[#2a5060]" },
    { label: "Pending", value: orders.filter((o) => o.status === "pending" || o.status === "processing").length, accent: "border-[#8a6218]" },
    { label: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, accent: "border-[#8b2e1c]" },
  ];

  return (
    <div className="space-y-4">
      {/* Summary stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border-l-4 ${s.accent} border border-[#c8b898]/30 bg-[#e8e1d8] p-4`}>
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a6e62]">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-[#3d352c]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Orders table (desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8]">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-[#c8b898]/40 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Order ID</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Customer</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Items</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Total</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Date</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-[#c8b898]/20 transition-colors hover:bg-[#e2dbd0]">
                <td className="px-4 py-3 font-mono text-xs text-[#8a6218]">{o.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#3d352c]">{o.customer}</p>
                  <p className="text-xs text-[#7a6e62]/50">{o.email}</p>
                </td>
                <td className="px-4 py-3 text-[#5c5145]">
                  {o.items[0].name}
                  {o.items.length > 1 && (
                    <span className="ml-1 text-xs text-[#7a6e62]/50">+{o.items.length - 1} more</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-[#3d352c]">${o.total}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusBadge[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#5c5145]">{o.date}</td>
                <td className="px-4 py-3">
                  <button className="rounded px-2 py-1 text-xs text-[#7a6e62] transition-colors hover:bg-[#d5cdc2] hover:text-[#3d352c]">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-[#8a6218]">{o.id}</span>
              <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusBadge[o.status]}`}>
                {o.status}
              </span>
            </div>
            <div className="mt-2">
              <p className="font-medium text-[#3d352c]">{o.customer}</p>
              <p className="text-xs text-[#7a6e62]/50">{o.email}</p>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-[#5c5145]">
              <span>
                {o.items[0].name}
                {o.items.length > 1 && (
                  <span className="ml-1 text-xs text-[#7a6e62]/50">+{o.items.length - 1} more</span>
                )}
              </span>
              <span className="font-medium text-[#3d352c]">${o.total}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#7a6e62]/50">{o.date}</span>
              <button className="rounded-lg px-3 py-2 text-sm text-[#7a6e62] transition-colors hover:bg-[#d5cdc2] hover:text-[#3d352c]">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
