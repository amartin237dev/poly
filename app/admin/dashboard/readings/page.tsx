"use client";

import { useState } from "react";
import { readingTypes as initialTypes, readingAvailability as initialAvailability, readingBookings as initialBookings } from "../../data";
import type { ReadingType, ReadingBooking, ReadingAvailability } from "../../types";

const statusBadge: Record<string, string> = {
  confirmed: "bg-[#1e3a4a]/15 text-[#2a5060]",
  completed: "bg-[#1e3a4a]/15 text-[#2a5060]",
  pending: "bg-[#8a6218]/15 text-[#8a6218]",
  cancelled: "bg-[#8b2e1c]/15 text-[#8b2e1c]",
};

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ReadingsPage() {
  const [bookings, setBookings] = useState<ReadingBooking[]>([...initialBookings]);
  const [types, setTypes] = useState<ReadingType[]>([...initialTypes]);
  const [availability, setAvailability] = useState<ReadingAvailability>({
    ...initialAvailability,
    activeDays: [...initialAvailability.activeDays],
    timeSlots: [...initialAvailability.timeSlots],
    blockedDates: [...initialAvailability.blockedDates],
  });
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState("");

  // Stats
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const today = new Date();
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);
  const thisWeek = bookings.filter((b) => {
    const d = new Date(b.date);
    return d >= today && d <= weekFromNow && b.status !== "cancelled";
  }).length;
  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => {
      const type = types.find((t) => t.name === b.readingType);
      return sum + (type?.price || 0);
    }, 0);

  const stats = [
    { label: "Total Bookings", value: totalBookings, accent: "border-[#7a6e62]" },
    { label: "Pending", value: pendingCount, accent: "border-[#8a6218]" },
    { label: "This Week", value: thisWeek, accent: "border-[#2a5060]" },
    { label: "Revenue", value: `$${totalRevenue}`, accent: "border-[#2a5060]" },
  ];

  const toggleDay = (day: number) => {
    setAvailability((prev) => ({
      ...prev,
      activeDays: prev.activeDays.includes(day)
        ? prev.activeDays.filter((d) => d !== day)
        : [...prev.activeDays, day].sort(),
    }));
  };

  const toggleSlot = (slot: string) => {
    setAvailability((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter((s) => s !== slot)
        : [...prev.timeSlots, slot],
    }));
  };

  const addBlockedDate = () => {
    if (newBlockedDate && !availability.blockedDates.includes(newBlockedDate)) {
      setAvailability((prev) => ({
        ...prev,
        blockedDates: [...prev.blockedDates, newBlockedDate].sort(),
      }));
      setNewBlockedDate("");
    }
  };

  const removeBlockedDate = (date: string) => {
    setAvailability((prev) => ({
      ...prev,
      blockedDates: prev.blockedDates.filter((d) => d !== date),
    }));
  };

  const toggleTypeActive = (id: string) => {
    setTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const startEditPrice = (id: string, currentPrice: number) => {
    setEditingPrice(id);
    setPriceInput(String(currentPrice));
  };

  const savePrice = (id: string) => {
    const val = parseInt(priceInput);
    if (!isNaN(val) && val > 0) {
      setTypes((prev) =>
        prev.map((t) => (t.id === id ? { ...t, price: val } : t))
      );
    }
    setEditingPrice(null);
  };

  const updateBookingStatus = (id: string, status: ReadingBooking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const allSlotOptions = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

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

      {/* Two-column: Availability + Reading Types */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Availability Settings */}
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Availability Settings</h2>

          {/* Active days */}
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a6e62] mb-2">Active Days</p>
            <div className="flex flex-wrap gap-2">
              {dayLabels.map((label, i) => {
                const isActive = availability.activeDays.includes(i);
                return (
                  <button
                    key={label}
                    onClick={() => toggleDay(i)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#8a6218]/20 text-[#8a6218] border border-[#8a6218]/40"
                        : "bg-[#d5cdc2]/50 text-[#7a6e62]/60 border border-transparent"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a6e62] mb-2">Time Slots</p>
            <div className="flex flex-wrap gap-2">
              {allSlotOptions.map((slot) => {
                const isActive = availability.timeSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#8a6218]/20 text-[#8a6218] border border-[#8a6218]/40"
                        : "bg-[#d5cdc2]/50 text-[#7a6e62]/60 border border-transparent"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blocked dates */}
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a6e62] mb-2">Blocked Dates</p>
            <div className="flex flex-wrap gap-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-1.5 text-xs text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              />
              <button
                onClick={addBlockedDate}
                className="rounded-lg bg-[#8a6218]/15 px-3 py-1.5 text-xs font-medium text-[#8a6218] transition-colors hover:bg-[#8a6218]/25"
              >
                Block
              </button>
            </div>
            {availability.blockedDates.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {availability.blockedDates.map((date) => (
                  <span key={date} className="inline-flex items-center gap-1.5 rounded-full bg-[#8b2e1c]/10 px-3 py-1 text-xs text-[#8b2e1c]">
                    {date}
                    <button onClick={() => removeBlockedDate(date)} className="hover:text-[#8b2e1c]/70">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reading Types */}
        <div className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#3d352c]">Reading Types</h2>
          <div className="mt-4 space-y-4">
            {types.map((type) => (
              <div key={type.id} className="rounded-lg border border-[#c8b898]/30 bg-[#f5f0e8] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#3d352c]">{type.name}</h3>
                    <p className="text-xs text-[#7a6e62] mt-0.5">{type.tagline}</p>
                  </div>
                  <button
                    onClick={() => toggleTypeActive(type.id)}
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                      type.active
                        ? "bg-[#2a5060]/15 text-[#2a5060]"
                        : "bg-[#7a6e62]/15 text-[#7a6e62]"
                    }`}
                  >
                    {type.active ? "Active" : "Inactive"}
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-[#7a6e62]">Price:</span>
                  {editingPrice === type.id ? (
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-[#3d352c]">$</span>
                      <input
                        type="number"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") savePrice(type.id); }}
                        className="w-20 rounded border border-[#c8b898]/40 bg-white px-2 py-1 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => savePrice(type.id)}
                        className="rounded px-2 py-1 text-xs text-[#2a5060] hover:bg-[#2a5060]/10"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPrice(null)}
                        className="rounded px-2 py-1 text-xs text-[#7a6e62] hover:bg-[#d5cdc2]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditPrice(type.id, type.price)}
                      className="text-sm font-semibold text-[#3d352c] hover:text-[#8a6218] transition-colors"
                    >
                      ${type.price}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings table (desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8]">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-[#c8b898]/40 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Booking ID</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Client</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Reading Type</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Date & Time</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#7a6e62]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-[#c8b898]/20 transition-colors hover:bg-[#e2dbd0]">
                <td className="px-4 py-3 font-mono text-xs text-[#8a6218]">{b.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#3d352c]">{b.clientName}</p>
                  <p className="text-xs text-[#7a6e62]/50">{b.clientEmail}</p>
                </td>
                <td className="px-4 py-3 text-[#5c5145]">{b.readingType}</td>
                <td className="px-4 py-3 text-[#5c5145]">
                  <p>{b.date}</p>
                  <p className="text-xs text-[#7a6e62]/50">{b.timeSlot}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusBadge[b.status]}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateBookingStatus(b.id, e.target.value as ReadingBooking["status"])}
                    className="rounded border border-[#c8b898]/40 bg-[#f5f0e8] px-2 py-1 text-xs text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-xl border border-[#c8b898]/30 bg-[#e8e1d8] p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-[#8a6218]">{b.id}</span>
              <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusBadge[b.status]}`}>
                {b.status}
              </span>
            </div>
            <div className="mt-2">
              <p className="font-medium text-[#3d352c]">{b.clientName}</p>
              <p className="text-xs text-[#7a6e62]/50">{b.clientEmail}</p>
            </div>
            <div className="mt-2 text-sm text-[#5c5145]">
              <p>{b.readingType}</p>
              <p className="text-xs text-[#7a6e62]/50">{b.date} &middot; {b.timeSlot}</p>
            </div>
            <div className="mt-3">
              <select
                value={b.status}
                onChange={(e) => updateBookingStatus(b.id, e.target.value as ReadingBooking["status"])}
                className="w-full rounded-lg border border-[#c8b898]/40 bg-[#f5f0e8] px-3 py-2.5 text-sm text-[#3d352c] focus:border-[#8a6218] focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
