"use client";

import { useState } from "react";
import { emailCampaigns as initialCampaigns } from "../../data";
import type { EmailCampaign } from "../../types";

const statusBadge: Record<EmailCampaign["status"], string> = {
  draft: "bg-[#7a6e62]/15 text-[#7a6e62]",
  scheduled: "bg-[#8a6218]/15 text-[#8a6218]",
  sent: "bg-[#1e3a4a]/15 text-[#2a5060]",
  paused: "bg-[#8b2e1c]/15 text-[#8b2e1c]",
};

const audienceLabels: Record<EmailCampaign["audience"], string> = {
  "all-customers": "All Customers",
  "new-customers": "New Customers",
  "repeat-customers": "Repeat Customers",
  vip: "VIP",
};

const emptyForm = {
  name: "",
  subject: "",
  audience: "all-customers" as EmailCampaign["audience"],
  body: "",
  scheduledDate: "",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([...initialCampaigns]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [audienceFilter, setAudienceFilter] = useState<string>("all");
  const [showCompose, setShowCompose] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Stats
  const totalCampaigns = campaigns.length;
  const sentCount = campaigns.filter((c) => c.status === "sent").length;
  const scheduledCount = campaigns.filter((c) => c.status === "scheduled").length;
  const sentCampaigns = campaigns.filter((c) => c.status === "sent" && c.openRate != null);
  const avgOpenRate = sentCampaigns.length > 0
    ? (sentCampaigns.reduce((sum, c) => sum + c.openRate!, 0) / sentCampaigns.length).toFixed(1)
    : "—";

  const stats = [
    { label: "Total Campaigns", value: totalCampaigns, accent: "border-[#7a6e62]" },
    { label: "Sent", value: sentCount, accent: "border-[#2a5060]" },
    { label: "Scheduled", value: scheduledCount, accent: "border-[#8a6218]" },
    { label: "Avg Open Rate", value: avgOpenRate === "—" ? "—" : `${avgOpenRate}%`, accent: "border-[#2a5060]" },
  ];

  // Filtering
  const filtered = campaigns.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesAudience = audienceFilter === "all" || c.audience === audienceFilter;
    return matchesSearch && matchesStatus && matchesAudience;
  });

  // Compose helpers
  const openNewCompose = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowCompose(true);
  };

  const openEditCompose = (c: EmailCampaign) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      subject: c.subject,
      audience: c.audience,
      body: c.body,
      scheduledDate: c.scheduledDate || "",
    });
    setShowCompose(true);
  };

  const closeCompose = () => {
    setShowCompose(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const saveDraft = () => {
    if (!form.name.trim() || !form.subject.trim()) return;
    if (editingId) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name: form.name, subject: form.subject, audience: form.audience, body: form.body, scheduledDate: form.scheduledDate || undefined }
            : c
        )
      );
    } else {
      const newCampaign: EmailCampaign = {
        id: `EC-${String(Date.now()).slice(-4)}`,
        name: form.name,
        subject: form.subject,
        status: "draft",
        audience: form.audience,
        recipientCount: 0,
        body: form.body,
      };
      setCampaigns((prev) => [newCampaign, ...prev]);
    }
    closeCompose();
  };

  const scheduleCampaign = () => {
    if (!form.name.trim() || !form.subject.trim() || !form.scheduledDate) return;
    if (editingId) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name: form.name, subject: form.subject, audience: form.audience, body: form.body, scheduledDate: form.scheduledDate, status: "scheduled" as const, recipientCount: c.recipientCount || 1923 }
            : c
        )
      );
    } else {
      const newCampaign: EmailCampaign = {
        id: `EC-${String(Date.now()).slice(-4)}`,
        name: form.name,
        subject: form.subject,
        status: "scheduled",
        audience: form.audience,
        scheduledDate: form.scheduledDate,
        recipientCount: 1923,
        body: form.body,
      };
      setCampaigns((prev) => [newCampaign, ...prev]);
    }
    closeCompose();
  };

  const duplicateCampaign = (c: EmailCampaign) => {
    const copy: EmailCampaign = {
      ...c,
      id: `EC-${String(Date.now()).slice(-4)}`,
      name: `${c.name} (Copy)`,
      status: "draft",
      sentDate: undefined,
      scheduledDate: undefined,
      openRate: undefined,
      clickRate: undefined,
      recipientCount: 0,
    };
    setCampaigns((prev) => [copy, ...prev]);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const togglePause = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (c.status === "paused") return { ...c, status: "scheduled" as const };
        if (c.status === "scheduled") return { ...c, status: "paused" as const };
        return c;
      })
    );
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

      {/* Action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] placeholder-[#7a6e62]/50 focus:border-[#8a6218] focus:outline-none sm:w-56"
          />
          <select
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
            className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
          >
            <option value="all">All Audiences</option>
            <option value="all-customers">All Customers</option>
            <option value="new-customers">New Customers</option>
            <option value="repeat-customers">Repeat Customers</option>
            <option value="vip">VIP</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button
          onClick={openNewCompose}
          className="shrink-0 rounded-lg bg-[#8a6218] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6d4e13]"
        >
          + New Campaign
        </button>
      </div>

      {/* Compose / Edit panel */}
      {showCompose && (
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#3d352c]">
              {editingId ? "Edit Campaign" : "New Campaign"}
            </h2>
            <button onClick={closeCompose} className="text-[#7a6e62] hover:text-[#3d352c] text-lg leading-none">&times;</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Campaign Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Spring Sale Blast"
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Subject Line</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="e.g. Don't miss our latest scents"
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Audience</label>
              <select
                value={form.audience}
                onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value as EmailCampaign["audience"] }))}
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              >
                <option value="all-customers">All Customers</option>
                <option value="new-customers">New Customers</option>
                <option value="repeat-customers">Repeat Customers</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Schedule Date</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm((f) => ({ ...f, scheduledDate: e.target.value }))}
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">Body Preview</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={3}
              placeholder="Write a short preview of the email content..."
              className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none resize-none"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={saveDraft}
              className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-4 py-2 text-sm font-medium text-[#3d352c] transition-colors hover:bg-[#e8e1d8]"
            >
              Save as Draft
            </button>
            <button
              onClick={scheduleCampaign}
              disabled={!form.scheduledDate}
              className="rounded-lg bg-[#8a6218] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6d4e13] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Schedule
            </button>
            <button
              onClick={closeCompose}
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
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Campaign</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Subject</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Audience</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Date</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Open Rate</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Click Rate</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[#c8b898]/20 transition-colors hover:bg-[#e2dbd0]">
                <td className="px-4 py-3">
                  <p className="font-medium text-[#3d352c]">{c.name}</p>
                  <p className="text-xs text-[#7a6e62]/50">{c.recipientCount.toLocaleString()} recipients</p>
                </td>
                <td className="px-4 py-3 text-[#5c5145] max-w-[200px] truncate">{c.subject}</td>
                <td className="px-4 py-3 text-[#5c5145]">{audienceLabels[c.audience]}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusBadge[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#5c5145]">
                  {c.sentDate || c.scheduledDate || "—"}
                </td>
                <td className="px-4 py-3 text-[#5c5145]">{c.openRate != null ? `${c.openRate}%` : "—"}</td>
                <td className="px-4 py-3 text-[#5c5145]">{c.clickRate != null ? `${c.clickRate}%` : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {(c.status === "draft" || c.status === "scheduled") && (
                      <button
                        onClick={() => openEditCompose(c)}
                        className="rounded px-2 py-1 text-xs text-[#8a6218] hover:bg-[#8a6218]/10 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => duplicateCampaign(c)}
                      className="rounded px-2 py-1 text-xs text-[#2a5060] hover:bg-[#2a5060]/10 transition-colors"
                    >
                      Duplicate
                    </button>
                    {(c.status === "scheduled" || c.status === "paused") && (
                      <button
                        onClick={() => togglePause(c.id)}
                        className="rounded px-2 py-1 text-xs text-[#8b2e1c] hover:bg-[#8b2e1c]/10 transition-colors"
                      >
                        {c.status === "paused" ? "Resume" : "Pause"}
                      </button>
                    )}
                    {c.status !== "sent" && (
                      <button
                        onClick={() => deleteCampaign(c.id)}
                        className="rounded px-2 py-1 text-xs text-[#8b2e1c] hover:bg-[#8b2e1c]/10 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-[#7a6e62]">
                  No campaigns match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#3d352c] truncate">{c.name}</p>
                <p className="text-xs text-[#7a6e62]/50 truncate">{c.subject}</p>
              </div>
              <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusBadge[c.status]}`}>
                {c.status}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5c5145]">
              <span>{audienceLabels[c.audience]}</span>
              <span>{c.recipientCount.toLocaleString()} recipients</span>
              {(c.sentDate || c.scheduledDate) && <span>{c.sentDate || c.scheduledDate}</span>}
            </div>
            {c.openRate != null && (
              <div className="mt-2 flex gap-4 text-xs text-[#5c5145]">
                <span>Open: {c.openRate}%</span>
                <span>Click: {c.clickRate}%</span>
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {(c.status === "draft" || c.status === "scheduled") && (
                <button
                  onClick={() => openEditCompose(c)}
                  className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs font-medium text-[#8a6218] transition-colors hover:bg-[#e8e1d8]"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => duplicateCampaign(c)}
                className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs font-medium text-[#2a5060] transition-colors hover:bg-[#e8e1d8]"
              >
                Duplicate
              </button>
              {(c.status === "scheduled" || c.status === "paused") && (
                <button
                  onClick={() => togglePause(c.id)}
                  className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs font-medium text-[#8b2e1c] transition-colors hover:bg-[#e8e1d8]"
                >
                  {c.status === "paused" ? "Resume" : "Pause"}
                </button>
              )}
              {c.status !== "sent" && (
                <button
                  onClick={() => deleteCampaign(c.id)}
                  className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs font-medium text-[#8b2e1c] transition-colors hover:bg-[#e8e1d8]"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-6 text-center text-sm text-[#7a6e62]">
            No campaigns match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
