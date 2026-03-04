"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import { readingTypes, readingAvailability } from "../admin/data";
import type { ReadingType } from "../admin/types";

type ModalStep = "idle" | "select-date" | "enter-details" | "confirmed";

function getAvailableDates(availability: typeof readingAvailability) {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayOfWeek = d.getDay();
    const dateStr = d.toISOString().split("T")[0];

    if (
      availability.activeDays.includes(dayOfWeek) &&
      !availability.blockedDates.includes(dateStr)
    ) {
      dates.push(d);
    }
  }
  return dates;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function PerfumeReadings() {
  const { ref, isInView } = useInView();
  const [modalStep, setModalStep] = useState<ModalStep>("idle");
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");

  const availableDates = getAvailableDates(readingAvailability);

  const resetModal = useCallback(() => {
    setModalStep("idle");
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setClientName("");
    setClientEmail("");
    setNotes("");
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalStep !== "idle") resetModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [modalStep, resetModal]);

  const handleBookNow = (type: ReadingType) => {
    setSelectedType(type);
    setModalStep("select-date");
  };

  const handleConfirm = () => {
    setModalStep("confirmed");
  };

  const isModalOpen = modalStep !== "idle";

  return (
    <section id="readings" className="relative overflow-hidden py-4 sm:py-10 lg:py-14">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,46,28,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(200,146,42,0.06)_0%,transparent_50%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile-only header (above image) */}
        <div className={`mb-4 text-center lg:hidden reveal ${isInView ? "in-view" : ""}`}>
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
            A Unique Experience
          </p>
          <div className="ornament mt-2 sm:mt-3">
            <span className="text-amber-dark text-xs">&#9830;</span>
          </div>
          <h2
            className="mt-3 sm:mt-4 font-[family-name:var(--font-playfair)] font-semibold leading-snug text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Perfume Readings
            <br />
            <span className="italic text-amber">with Jamie</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid items-start gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: header (desktop) + editorial content + reading cards */}
          <div className={`order-2 lg:order-1 reveal ${isInView ? "in-view" : ""}`} style={{ transitionDelay: "150ms" }}>
            {/* Desktop-only header (inline with content) */}
            <div className={`hidden lg:block mb-8 reveal ${isInView ? "in-view" : ""}`}>
              <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-accent">
                A Unique Experience
              </p>
              <div className="ornament mt-3">
                <span className="text-amber-dark text-xs">&#9830;</span>
              </div>
              <h2
                className="mt-4 font-[family-name:var(--font-playfair)] font-semibold leading-snug text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Perfume Readings
                <br />
                <span className="italic text-amber">with Jamie</span>
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-foreground-muted">
              Part fragrance expert, part psychology nerd — Jamie guides you
              through a one-on-one scent journey. Forget the department-store
              spray-and-pray. This is deep, personal, and transformative.
            </p>

            {/* Pull quote */}
            <blockquote className="my-8 lg:my-10 border-l border-accent/30 pl-6">
              <p className="font-[family-name:var(--font-playfair)] text-lg italic leading-relaxed text-foreground">
                &ldquo;I didn&apos;t just find a perfume — I found a part of
                myself I&apos;d forgotten.&rdquo;
              </p>
              <cite className="mt-3 block text-[13px] not-italic uppercase tracking-[0.1em] text-foreground-muted/60">
                — Emma L., Reading Client
              </cite>
            </blockquote>

            {/* Reading type cards */}
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              {readingTypes.map((type, i) => (
                <div
                  key={type.id}
                  className={`rounded-lg border border-amber-dark/30 bg-surface p-4 sm:p-6 reveal ${isInView ? "in-view" : ""}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                    {type.tagline}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                    {type.name}
                  </h3>
                  <p className="mt-1 text-2xl font-bold text-accent">${type.price}</p>

                  <ul className="mt-4 space-y-2">
                    {type.description.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-dark/50" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleBookNow(type)}
                    className="mt-6 inline-flex h-11 w-full sm:w-auto items-center justify-center border border-red bg-red/10 px-8 text-[12px] font-semibold uppercase tracking-[0.15em] text-red-light transition-all duration-300 hover:bg-red hover:text-foreground hover:shadow-[0_0_24px_rgba(139,46,28,0.25)]"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: framed atmospheric image */}
          <div className={`order-1 lg:order-2 relative mb-[20vh] sm:mb-0 lg:sticky lg:top-24 reveal ${isInView ? "in-view" : ""}`} style={{ transitionDelay: "200ms" }}>
            <div className="gilded-frame overflow-hidden">
              <div className="relative">
                <Image
                  src="/img/Reading.jpg"
                  alt="Perfume Readings with Jamie"
                  width={800}
                  height={1000}
                  className="h-auto w-full lg:max-h-none"
                />
                {/* Warm amber overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-amber-dark/10 to-transparent" />
              </div>
            </div>
            {/* Shadow beneath frame */}
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,transparent_70%)]" />
          </div>
        </div>
      </div>

      {/* Scheduling Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) resetModal(); }}
        >
          <div className="relative w-full max-w-lg max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-xl border-0 sm:border border-amber-dark/30 bg-background-secondary p-5 sm:p-6 shadow-2xl">
            {/* Close button */}
            <button
              onClick={resetModal}
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-foreground-muted/10 hover:text-foreground"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Step: Select Date */}
            {modalStep === "select-date" && (
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                  Select Date & Time
                </h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  {selectedType?.name} — ${selectedType?.price}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">Available Dates</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {availableDates.map((d) => {
                      const isSelected = selectedDate?.toDateString() === d.toDateString();
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                          className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                            isSelected
                              ? "border-accent bg-accent/15 text-accent"
                              : "border-amber-dark/20 text-foreground-muted hover:border-accent/50 hover:text-foreground"
                          }`}
                        >
                          {formatDate(d)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div className="mt-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">Time Slots</p>
                    <div className="flex flex-wrap gap-2">
                      {readingAvailability.timeSlots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                              isSelected
                                ? "border-accent bg-accent/15 text-accent"
                                : "border-amber-dark/20 text-foreground-muted hover:border-accent/50 hover:text-foreground"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  disabled={!selectedDate || !selectedSlot}
                  onClick={() => setModalStep("enter-details")}
                  className="mt-8 w-full h-11 rounded-lg border border-red bg-red/10 text-[12px] font-semibold uppercase tracking-[0.15em] text-red-light transition-all duration-300 hover:bg-red hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red/10 disabled:hover:text-red-light"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step: Enter Details */}
            {modalStep === "enter-details" && (
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                  Your Details
                </h3>

                {/* Summary banner */}
                <div className="mt-4 rounded-lg border border-amber-dark/20 bg-background/50 p-3">
                  <p className="text-sm font-medium text-foreground">{selectedType?.name}</p>
                  <p className="text-xs text-foreground-muted">
                    {selectedDate && formatDate(selectedDate)} at {selectedSlot} — ${selectedType?.price}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-accent mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-lg border border-amber-dark/20 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-accent mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full rounded-lg border border-amber-dark/20 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-accent mb-1.5">
                      Notes (optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-amber-dark/20 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none resize-none"
                      placeholder="Any preferences or things Jamie should know..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    onClick={() => setModalStep("select-date")}
                    className="h-11 rounded-lg border border-amber-dark/30 px-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground-muted transition-colors hover:text-foreground"
                  >
                    Back
                  </button>
                  <button
                    disabled={!clientName.trim() || !clientEmail.trim()}
                    onClick={handleConfirm}
                    className="flex-1 h-11 rounded-lg border border-red bg-red/10 text-[12px] font-semibold uppercase tracking-[0.15em] text-red-light transition-all duration-300 hover:bg-red hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red/10 disabled:hover:text-red-light"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {/* Step: Confirmed */}
            {modalStep === "confirmed" && (
              <div className="text-center py-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                  <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                  Booking Confirmed!
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  Your {selectedType?.name} has been scheduled.
                </p>

                <div className="mt-6 rounded-lg border border-amber-dark/20 bg-background/50 p-4 text-left">
                  <div className="space-y-2 text-sm">
                    <p><span className="text-foreground-muted">Reading:</span> <span className="text-foreground font-medium">{selectedType?.name}</span></p>
                    <p><span className="text-foreground-muted">Date:</span> <span className="text-foreground font-medium">{selectedDate && formatDate(selectedDate)}</span></p>
                    <p><span className="text-foreground-muted">Time:</span> <span className="text-foreground font-medium">{selectedSlot}</span></p>
                    <p><span className="text-foreground-muted">Name:</span> <span className="text-foreground font-medium">{clientName}</span></p>
                    <p><span className="text-foreground-muted">Email:</span> <span className="text-foreground font-medium">{clientEmail}</span></p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-center">
                  <button
                    onClick={() => {
                      resetModal();
                    }}
                    className="h-11 rounded-lg border border-amber-dark/30 px-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground-muted transition-colors hover:text-foreground"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      setSelectedSlot(null);
                      setClientName("");
                      setClientEmail("");
                      setNotes("");
                      setModalStep("select-date");
                    }}
                    className="h-11 rounded-lg border border-red bg-red/10 px-6 text-[12px] font-semibold uppercase tracking-[0.15em] text-red-light transition-all duration-300 hover:bg-red hover:text-foreground"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
