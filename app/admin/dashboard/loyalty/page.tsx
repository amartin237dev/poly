"use client";

import { useState } from "react";
import { loyaltyTiers, loyaltyMembers as initialMembers, pointRedemptions } from "../../data";
import type { LoyaltyMember } from "../../types";

const tierBadge: Record<LoyaltyMember["tier"], string> = {
  bronze: "bg-[#8b5e3c]/15 text-[#8b5e3c]",
  silver: "bg-[#7a6e62]/15 text-[#7a6e62]",
  gold: "bg-[#8a6218]/15 text-[#8a6218]",
  platinum: "bg-[#1e3a4a]/15 text-[#2a5060]",
};

const tierBorderColor: Record<LoyaltyMember["tier"], string> = {
  bronze: "#8b5e3c",
  silver: "#7a6e62",
  gold: "#8a6218",
  platinum: "#2a5060",
};

const redemptionBadge: Record<string, string> = {
  discount: "bg-[#8a6218]/15 text-[#8a6218]",
  "free-product": "bg-[#2a5060]/15 text-[#2a5060]",
  "exclusive-access": "bg-[#8b5e3c]/15 text-[#8b5e3c]",
};

const emptyForm = {
  name: "",
  email: "",
  tier: "bronze" as LoyaltyMember["tier"],
  points: 0,
  status: "active" as LoyaltyMember["status"],
};

export default function LoyaltyPage() {
  const [members, setMembers] = useState<LoyaltyMember[]>([...initialMembers]);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Stats
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "active").length;
  const totalPointsIssued = members.reduce((sum, m) => sum + m.points, 0);
  const totalRedeemed = pointRedemptions.reduce((sum, r) => sum + r.pointsSpent, 0);

  const stats = [
    { label: "Total Members", value: totalMembers, accent: "border-[#7a6e62]" },
    { label: "Active Members", value: activeMembers, accent: "border-[#2a5060]" },
    { label: "Points Issued", value: totalPointsIssued.toLocaleString(), accent: "border-[#8a6218]" },
    { label: "Total Redeemed", value: totalRedeemed.toLocaleString(), accent: "border-[#8b5e3c]" },
  ];

  // Filter
  const filtered = members.filter((m) => {
    const matchesSearch =
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || m.tier === tierFilter;
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  // Member count per tier
  const tierCounts = loyaltyTiers.map((t) => ({
    ...t,
    count: members.filter((m) => m.tier === t.name.toLowerCase()).length,
  }));

  // Form helpers
  const openNewForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (m: LoyaltyMember) => {
    setEditingId(m.id);
    setForm({ name: m.name, email: m.email, tier: m.tier, points: m.points, status: m.status });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const saveMember = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editingId) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, name: form.name, email: form.email, tier: form.tier, points: form.points, status: form.status }
            : m
        )
      );
    } else {
      const newMember: LoyaltyMember = {
        id: `LM-${String(Date.now()).slice(-4)}`,
        name: form.name,
        email: form.email,
        tier: form.tier,
        points: form.points,
        totalSpent: 0,
        joinDate: new Date().toISOString().split("T")[0],
        lastActivity: new Date().toISOString().split("T")[0],
        status: form.status,
      };
      setMembers((prev) => [newMember, ...prev]);
    }
    closeForm();
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

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

      {/* Tier overview */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {tierCounts.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4"
            style={{ borderLeftWidth: "4px", borderLeftColor: t.color }}
          >
            <p className="text-sm font-semibold text-[#3d352c]">{t.name}</p>
            <p className="text-xs text-[#7a6e62]">{t.minPoints.toLocaleString()}+ points</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-lg font-bold text-[#3d352c]">{t.count}</span>
              <span className="text-xs text-[#7a6e62]">{t.discount}% off</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] placeholder-[#7a6e62]/50 focus:border-[#8a6218] focus:outline-none sm:w-56"
          />
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          onClick={openNewForm}
          className="shrink-0 rounded-lg bg-[#8a6218] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6d4e13]"
        >
          + Add Member
        </button>
      </div>

      {/* Add / Edit panel */}
      {showForm && (
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#3d352c]">
              {editingId ? "Edit Member" : "Add Member"}
            </h2>
            <button onClick={closeForm} className="text-[#7a6e62] hover:text-[#3d352c] text-lg leading-none">&times;</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="email@example.com"
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Tier</label>
              <select
                value={form.tier}
                onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value as LoyaltyMember["tier"] }))}
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Points</label>
              <input
                type="number"
                value={form.points}
                onChange={(e) => setForm((f) => ({ ...f, points: Number(e.target.value) }))}
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as LoyaltyMember["status"] }))}
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={saveMember}
              className="rounded-lg bg-[#8a6218] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6d4e13]"
            >
              {editingId ? "Save Changes" : "Add Member"}
            </button>
            <button
              onClick={closeForm}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#7a6e62] transition-colors hover:bg-[#d5cdc2]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8]">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-[#c8b898]/40 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Email</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Tier</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Points</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Total Spent</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Join Date</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Last Activity</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-[#c8b898]/20 transition-colors hover:bg-[#e2dbd0]">
                <td className="px-4 py-3 font-medium text-[#3d352c]">{m.name}</td>
                <td className="px-4 py-3 text-[#5c5145]">{m.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${tierBadge[m.tier]}`}>
                    {m.tier}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#5c5145]">{m.points.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#5c5145]">${m.totalSpent.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#5c5145]">{m.joinDate}</td>
                <td className="px-4 py-3 text-[#5c5145]">{m.lastActivity}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${m.status === "active" ? "bg-[#2a5060]/15 text-[#2a5060]" : "bg-[#8b2e1c]/15 text-[#8b2e1c]"}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditForm(m)}
                      className="rounded px-2 py-1 text-xs text-[#8a6218] hover:bg-[#8a6218]/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeMember(m.id)}
                      className="rounded px-2 py-1 text-xs text-[#8b2e1c] hover:bg-[#8b2e1c]/10 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-[#7a6e62]">
                  No members match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((m) => (
          <div key={m.id} className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#3d352c] truncate">{m.name}</p>
                <p className="text-xs text-[#7a6e62]/50 truncate">{m.email}</p>
              </div>
              <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${tierBadge[m.tier]}`}>
                {m.tier}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5c5145]">
              <span>{m.points.toLocaleString()} pts</span>
              <span>${m.totalSpent.toLocaleString()} spent</span>
              <span>Joined {m.joinDate}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${m.status === "active" ? "bg-[#2a5060]/15 text-[#2a5060]" : "bg-[#8b2e1c]/15 text-[#8b2e1c]"}`}>
                {m.status}
              </span>
              <span className="text-[#7a6e62]/50">Last active {m.lastActivity}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => openEditForm(m)}
                className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs font-medium text-[#8a6218] transition-colors hover:bg-[#e8e1d8]"
              >
                Edit
              </button>
              <button
                onClick={() => removeMember(m.id)}
                className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs font-medium text-[#8b2e1c] transition-colors hover:bg-[#e8e1d8]"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-6 text-center text-sm text-[#7a6e62]">
            No members match your filters.
          </div>
        )}
      </div>

      {/* Recent Redemptions */}
      <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Recent Redemptions</h2>
        <div className="space-y-3">
          {pointRedemptions.map((r) => (
            <div key={r.id} className="flex flex-col gap-1 border-b border-[#c8b898]/20 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <span className="text-sm font-medium text-[#3d352c]">{r.memberName}</span>
                <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${redemptionBadge[r.type]}`}>
                  {r.type.replace("-", " ")}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#5c5145]">
                <span className="truncate max-w-[200px]">{r.description}</span>
                <span className="shrink-0 font-semibold text-[#3d352c]">-{r.pointsSpent.toLocaleString()} pts</span>
                <span className="shrink-0 text-[#7a6e62]">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
