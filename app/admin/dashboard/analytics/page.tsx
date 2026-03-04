"use client";

import { products, orders, revenueData } from "../../data";

const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
const avgOrderValue = Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length);
const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

// Top sellers by order frequency
const productSales: Record<string, number> = {};
orders.forEach((o) => {
  o.items.forEach((item) => {
    productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
  });
});
const topSellers = Object.entries(productSales)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
const maxSales = topSellers[0]?.[1] || 1;

// Conversion funnel
const funnel = [
  { stage: "Site Visitors", value: 2840, color: "bg-[#7a6e62]/20" },
  { stage: "Product Views", value: 1420, color: "bg-[#1e3a4a]/20" },
  { stage: "Add to Cart", value: 380, color: "bg-[#8a6218]/25" },
  { stage: "Completed Purchase", value: 142, color: "bg-[#c8922a]/30" },
];
const maxFunnel = funnel[0].value;

export default function AnalyticsPage() {
  const revenueCards = [
    { label: "Total Revenue (7mo)", value: `$${totalRevenue.toLocaleString()}` },
    { label: "Feb Revenue", value: `$${revenueData[5].revenue.toLocaleString()}` },
    { label: "Avg Order Value", value: `$${avgOrderValue}` },
    { label: "Total Orders", value: orders.length },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue summary cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {revenueCards.map((c) => (
          <div key={c.label} className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a6e62]">{c.label}</p>
            <p className="mt-1 text-xl font-bold text-[#3d352c]">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar chart */}
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Monthly Revenue</h2>
          <div className="flex items-end justify-between gap-2" style={{ height: 200 }}>
            {revenueData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-medium text-[#7a6e62]">
                  ${(d.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${(d.revenue / maxRevenue) * 160}px`,
                    background: "linear-gradient(to top, #8a6218, #c8922a)",
                  }}
                />
                <span className="text-[11px] text-[#7a6e62]/60">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top sellers */}
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Top Selling Products</h2>
          <div className="space-y-4">
            {topSellers.map(([name, qty], i) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-[#5c5145]">
                    <span className="mr-2 text-xs text-[#7a6e62]/40">#{i + 1}</span>
                    {name}
                  </span>
                  <span className="text-xs font-medium text-[#8a6218]">{qty} sold</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#d5cdc2]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(qty / maxSales) * 100}%`,
                      background: "linear-gradient(to right, #8a6218, #c8922a)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion funnel */}
      <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Conversion Funnel</h2>
        <div className="space-y-3">
          {funnel.map((f) => (
            <div key={f.stage} className="flex items-center gap-4">
              <span className="w-40 shrink-0 text-sm text-[#5c5145]">{f.stage}</span>
              <div className="flex-1">
                <div className="h-8 overflow-hidden rounded-lg bg-[#d5cdc2]">
                  <div
                    className={`flex h-full items-center rounded-lg ${f.color} px-3`}
                    style={{ width: `${(f.value / maxFunnel) * 100}%` }}
                  >
                    <span className="text-xs font-semibold text-[#3d352c]">{f.value.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory health */}
      <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Inventory Health</h2>
        <div className="grid gap-3 grid-cols-3">
          <div className="rounded-lg bg-[#1e3a4a]/10 p-3 text-center">
            <p className="text-xl font-bold text-[#2a5060]">{products.filter((p) => p.status === "in-stock").length}</p>
            <p className="text-xs text-[#5c5145]">In Stock</p>
          </div>
          <div className="rounded-lg bg-[#8a6218]/10 p-3 text-center">
            <p className="text-xl font-bold text-[#8a6218]">{products.filter((p) => p.status === "low-stock").length}</p>
            <p className="text-xs text-[#5c5145]">Low Stock</p>
          </div>
          <div className="rounded-lg bg-[#8b2e1c]/10 p-3 text-center">
            <p className="text-xl font-bold text-[#8b2e1c]">{products.filter((p) => p.status === "out-of-stock").length}</p>
            <p className="text-xs text-[#5c5145]">Out of Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
