"use client";

import Link from "next/link";
import { products, orders, activities, revenueData } from "../data";

const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
const monthlyRevenue = revenueData[revenueData.length - 2].revenue;

const typeColors: Record<string, string> = {
  order: "bg-[#8a6218]/15 text-[#8a6218]",
  stock: "bg-[#8b2e1c]/10 text-[#8b2e1c]",
  review: "bg-[#1e3a4a]/10 text-[#2a5060]",
  system: "bg-[#d5cdc2] text-[#7a6e62]",
};

export default function DashboardOverview() {
  const summaryCards = [
    {
      label: "Total Products",
      value: products.length,
      href: "/admin/dashboard/inventory",
      accent: "border-[#2a5060]",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      href: "/admin/dashboard/orders",
      accent: "border-[#8a6218]",
    },
    {
      label: "Monthly Revenue",
      value: `$${monthlyRevenue.toLocaleString()}`,
      href: "/admin/dashboard/analytics",
      accent: "border-[#c8922a]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`rounded-xl border-l-4 ${card.accent} border border-[#c8b898]/30 bg-[#e8e1d8] p-5 transition-colors hover:bg-[#e2dbd0]`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a6e62]">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-[#3d352c]">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Recent Activity</h2>
          <div className="space-y-3">
            {activities.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <span className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${typeColors[a.type]}`}>
                  {a.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#5c5145]">{a.message}</p>
                  <p className="text-xs text-[#7a6e62]/50">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/dashboard/inventory"
              className="flex items-center gap-3 rounded-lg border border-[#c8b898]/30 p-4 transition-colors hover:border-[#8a6218]/30 hover:bg-[#e2dbd0]"
            >
              <svg className="h-5 w-5 text-[#8a6218]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm text-[#5c5145]">Add Product</span>
            </Link>
            <Link
              href="/admin/dashboard/orders"
              className="flex items-center gap-3 rounded-lg border border-[#c8b898]/30 p-4 transition-colors hover:border-[#8a6218]/30 hover:bg-[#e2dbd0]"
            >
              <svg className="h-5 w-5 text-[#8a6218]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="text-sm text-[#5c5145]">View Orders</span>
            </Link>
            <Link
              href="/admin/dashboard/analytics"
              className="flex items-center gap-3 rounded-lg border border-[#c8b898]/30 p-4 transition-colors hover:border-[#8a6218]/30 hover:bg-[#e2dbd0]"
            >
              <svg className="h-5 w-5 text-[#8a6218]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
              </svg>
              <span className="text-sm text-[#5c5145]">View Analytics</span>
            </Link>
            <Link
              href="/admin/dashboard/inventory"
              className="flex items-center gap-3 rounded-lg border border-[#c8b898]/30 p-4 transition-colors hover:border-[#8a6218]/30 hover:bg-[#e2dbd0]"
            >
              <svg className="h-5 w-5 text-[#8a6218]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              <span className="text-sm text-[#5c5145]">Restock Alert</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
