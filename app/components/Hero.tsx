"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

/* Floating golden motes — like dust catching light in an old gallery */
const MOTES = [
  { left: "12%", top: "22%", size: 2.5, dur: 19, delay: 0 },
  { left: "78%", top: "28%", size: 2, dur: 23, delay: 4 },
  { left: "32%", top: "68%", size: 3, dur: 21, delay: 2 },
  { left: "88%", top: "52%", size: 1.5, dur: 26, delay: 7 },
  { left: "52%", top: "14%", size: 2, dur: 20, delay: 3 },
  { left: "22%", top: "82%", size: 2, dur: 24, delay: 5 },
  { left: "68%", top: "72%", size: 1.5, dur: 22, delay: 1 },
  { left: "42%", top: "38%", size: 2.5, dur: 25, delay: 6 },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  /* Element refs */
  const veilLeftRef = useRef<HTMLDivElement>(null);
  const veilRightRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const crackCoreRef = useRef<HTMLDivElement>(null);
  const crackInnerRef = useRef<HTMLDivElement>(null);
  const crackOuterRef = useRef<HTMLDivElement>(null);
  const brandWrapRef = useRef<HTMLDivElement>(null);
  const brandH1Ref = useRef<HTMLHeadingElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const dividerDiamondRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const motesContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const warmBloomRef = useRef<HTMLDivElement>(null);

  /* Corner frames: [TL-v, TL-h, TR-v, TR-h, BL-v, BL-h, BR-v, BR-h] */
  const cornersRef = useRef<(HTMLDivElement | null)[]>([]);
  const setCornerRef = (i: number) => (el: HTMLDivElement | null) => {
    cornersRef.current[i] = el;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const isMobile = window.innerWidth < 768;

      const allAnimated = [
        veilLeftRef.current,
        veilRightRef.current,
        ambientGlowRef.current,
        crackCoreRef.current,
        crackInnerRef.current,
        crackOuterRef.current,
        brandWrapRef.current,
        shimmerRef.current,
        taglineRef.current,
        dividerDiamondRef.current,
        subtitleRef.current,
        bodyRef.current,
        ctaRef.current,
        motesContainerRef.current,
        scrollIndicatorRef.current,
        warmBloomRef.current,
        ...cornersRef.current,
      ].filter(Boolean);

      if (prefersReduced) {
        gsap.set([veilLeftRef.current, veilRightRef.current], {
          autoAlpha: 0,
        });
        gsap.set(
          [crackCoreRef.current, crackInnerRef.current, crackOuterRef.current],
          { autoAlpha: 0 }
        );
        gsap.set(brandWrapRef.current, {
          scale: 1,
          filter: "blur(0px)",
        });
        gsap.set(
          [
            taglineRef.current,
            subtitleRef.current,
            bodyRef.current,
            ctaRef.current,
            motesContainerRef.current,
            scrollIndicatorRef.current,
            warmBloomRef.current,
          ],
          { autoAlpha: 1, y: 0 }
        );
        gsap.set(dividerDiamondRef.current, { scale: 1, autoAlpha: 1 });
        cornersRef.current.filter(Boolean).forEach((el) => {
          gsap.set(el, { scaleX: 1, scaleY: 1 });
        });
        brandH1Ref.current?.classList.add("brand-ambient-drift");
        return;
      }

      /* ── Initial states ── */

      /* Curtain panels — positioned, ready to slide */
      gsap.set(veilLeftRef.current, { x: 0, willChange: "transform" });
      gsap.set(veilRightRef.current, { x: 0, willChange: "transform" });

      /* Golden crack — vertical seam between curtain panels */
      gsap.set(crackCoreRef.current, { scaleY: 0, autoAlpha: 0 });
      gsap.set(crackInnerRef.current, { autoAlpha: 0, scaleX: 1 });
      gsap.set(crackOuterRef.current, { autoAlpha: 0 });

      /* Ambient glow */
      gsap.set(ambientGlowRef.current, { autoAlpha: 0 });

      /* Brand name — visible behind curtains, slightly scaled + blurred for depth */
      gsap.set(brandWrapRef.current, {
        scale: 1.04,
        filter: isMobile ? "blur(0px)" : "blur(3px)",
        willChange: "transform, filter",
      });

      /* Shimmer — hidden off-left */
      gsap.set(shimmerRef.current, { x: "-100%", autoAlpha: 0 });

      /* All supporting text — hidden until Act 3 */
      gsap.set(
        [taglineRef.current, subtitleRef.current, bodyRef.current, ctaRef.current],
        { autoAlpha: 0, y: 20 }
      );
      gsap.set(ctaRef.current, { y: 12 });
      gsap.set(bodyRef.current, { y: 16 });
      gsap.set(dividerDiamondRef.current, { scale: 0, autoAlpha: 0 });
      gsap.set(motesContainerRef.current, { autoAlpha: 0 });
      gsap.set(scrollIndicatorRef.current, { autoAlpha: 0, y: 8 });
      gsap.set(warmBloomRef.current, { autoAlpha: 0 });

      /* Corner frames: initial hidden */
      cornersRef.current.filter(Boolean).forEach((el, i) => {
        const isVertical = i % 2 === 0;
        gsap.set(el, { [isVertical ? "scaleY" : "scaleX"]: 0 });
      });

      /* ── Timeline ── */
      const tl = gsap.timeline({
        onComplete() {
          gsap.set(allAnimated, { willChange: "auto" });
          brandH1Ref.current?.classList.add("brand-ambient-drift");
          warmBloomRef.current?.classList.add("hero-ambient-glow");
        },
      });

      /* ═══ Act 1: The Anticipation (0–0.6s) ═══
         Golden crack appears at curtain seam, then curtains part immediately. */

      tl.to(
        ambientGlowRef.current,
        { autoAlpha: 0.04, duration: 0.8, ease: "power2.inOut" },
        0.1
      );

      /* Golden crack — vertical core line scales up from center */
      tl.to(
        crackCoreRef.current,
        { scaleY: 1, autoAlpha: 1, duration: 0.6, ease: "expo.out" },
        0.2
      );

      /* Golden crack — inner halo blooms outward horizontally */
      tl.to(
        crackInnerRef.current,
        { autoAlpha: 1, scaleX: 3, duration: 0.5, ease: "power2.out" },
        0.3
      );

      /* Golden crack — outer halo */
      tl.to(
        crackOuterRef.current,
        { autoAlpha: 0.6, duration: 0.5, ease: "power2.out" },
        0.35
      );

      /* ═══ Act 2: The Reveal (0.6–2.4s) ═══
         Curtains part from the golden crack, sliding left and right
         like museum drapes unveiling a masterpiece. */

      /* Left curtain slides off to the left */
      tl.to(
        veilLeftRef.current,
        { x: "-100%", duration: 1.6, ease: "power3.inOut" },
        0.6
      );

      /* Right curtain slides off to the right */
      tl.to(
        veilRightRef.current,
        { x: "100%", duration: 1.6, ease: "power3.inOut" },
        0.6
      );

      /* Brand name — scale settles as curtains reveal it (depth perception) */
      tl.to(
        brandWrapRef.current,
        { scale: 1, duration: 1.6, ease: "expo.out" },
        0.6
      );

      /* Brand name — focus pull, blur resolves (skip on mobile) */
      if (!isMobile) {
        tl.to(
          brandWrapRef.current,
          { filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
          0.7
        );
      }

      /* Golden crack — fades out as curtains part (job done) */
      tl.to(
        [crackCoreRef.current, crackInnerRef.current, crackOuterRef.current],
        { autoAlpha: 0, duration: 0.8, ease: "power2.in" },
        1.0
      );

      /* Shimmer sweep — golden glint across revealed brand name */
      tl.to(
        shimmerRef.current,
        { x: "200%", autoAlpha: 1, duration: 1.2, ease: "power2.inOut" },
        2.2
      );
      tl.to(
        shimmerRef.current,
        { autoAlpha: 0, duration: 0.2 },
        2.2 + 1.0
      );

      /* ═══ Act 3: The Flourish (2.2–3.8s) ═══
         Supporting elements cascade in. The gallery comes alive. */

      /* Warm bloom behind text */
      tl.to(
        warmBloomRef.current,
        { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
        2.2
      );

      /* Tagline */
      tl.to(
        taglineRef.current,
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
        2.2
      );

      /* Mr and Mrs Sniff image — scale up with bounce */
      tl.to(
        dividerDiamondRef.current,
        { scale: 1, autoAlpha: 1, duration: 1.0, ease: "back.out(1.4)" },
        2.4
      );

      /* Subtitle */
      tl.to(
        subtitleRef.current,
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
        2.5
      );

      /* Corner frames — staggered: TL, TR, BL, BR */
      const cornerPairDelay = 0.15;
      for (let pair = 0; pair < 4; pair++) {
        const vIdx = pair * 2;
        const hIdx = pair * 2 + 1;
        const t = 2.6 + pair * cornerPairDelay;
        const vEl = cornersRef.current[vIdx];
        const hEl = cornersRef.current[hIdx];
        if (vEl) tl.to(vEl, { scaleY: 1, duration: 0.6, ease: "power2.out" }, t);
        if (hEl) tl.to(hEl, { scaleX: 1, duration: 0.6, ease: "power2.out" }, t);
      }

      /* Body copy */
      tl.to(
        bodyRef.current,
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
        2.8
      );

      /* CTA buttons */
      tl.to(
        ctaRef.current,
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        3.1
      );

      /* ═══ Act 4: The Settle (3.8s+) ═══
         Everything at rest. Ambient CSS loops take over. */

      tl.to(
        motesContainerRef.current,
        { autoAlpha: 1, duration: 1.4, ease: "power2.inOut" },
        3.8
      );

      tl.to(
        scrollIndicatorRef.current,
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
        4.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-svh items-start justify-center overflow-hidden pt-24 pb-12 sm:items-center sm:pt-0 sm:pb-0"
    >
      {/* Off-white background */}
      <div className="absolute inset-0" style={{ background: "#f0ebe4" }} />

      {/* Warm ambient glow behind center */}
      <div
        ref={ambientGlowRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,146,42,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Curtain panels — physically slide left/right like museum drapes */}

      {/* Left curtain */}
      <div
        ref={veilLeftRef}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none"
      >
        {/* Curtain face — distinct from background so movement is visible */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #e8e1d8 80%, #e2dbd0)" }}
        />
        {/* Inner edge shadow — depth at the seam */}
        <div
          className="absolute top-0 right-0 bottom-0 w-24"
          style={{
            background: "linear-gradient(to left, rgba(40,30,15,0.18), transparent)",
          }}
        />
        {/* Golden trim at seam edge — catches light like a theater curtain cord */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[2px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 10%, rgba(200,146,42,0.3) 30%, rgba(200,146,42,0.5) 50%, rgba(200,146,42,0.3) 70%, transparent 90%)",
          }}
        />
      </div>

      {/* Right curtain */}
      <div
        ref={veilRightRef}
        className="absolute top-0 bottom-0 left-1/2 w-1/2 z-20 pointer-events-none"
      >
        {/* Curtain face */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to left, #e8e1d8 80%, #e2dbd0)" }}
        />
        {/* Inner edge shadow */}
        <div
          className="absolute top-0 left-0 bottom-0 w-24"
          style={{
            background: "linear-gradient(to right, rgba(40,30,15,0.18), transparent)",
          }}
        />
        {/* Golden trim at seam edge */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[2px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 10%, rgba(200,146,42,0.3) 30%, rgba(200,146,42,0.5) 50%, rgba(200,146,42,0.3) 70%, transparent 90%)",
          }}
        />
      </div>

      {/* Golden crack — vertical light seam between curtain panels */}
      <div className="absolute inset-0 z-[21] flex items-center justify-center pointer-events-none">
        <div className="relative w-px h-2/3 max-h-80">
          {/* Core line */}
          <div
            ref={crackCoreRef}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-dark/80 to-transparent"
          />
          {/* Inner halo — blooms horizontally */}
          <div
            ref={crackInnerRef}
            className="absolute inset-y-0 -inset-x-3 bg-gradient-to-b from-transparent via-amber-dark/30 to-transparent blur-md"
          />
          {/* Outer halo */}
          <div
            ref={crackOuterRef}
            className="absolute inset-y-0 -inset-x-8 bg-gradient-to-b from-transparent via-amber-dark/15 to-transparent blur-xl"
          />
        </div>
      </div>

      {/* Floating golden motes */}
      <div
        ref={motesContainerRef}
        className="absolute inset-0 pointer-events-none z-[5]"
      >
        {MOTES.map((m, i) => (
          <div
            key={i}
            className={`absolute rounded-full${i >= 4 ? " hidden sm:block" : ""}`}
            style={{
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              background:
                "radial-gradient(circle, rgba(138,98,24,0.5) 0%, rgba(138,98,24,0.15) 60%, transparent 100%)",
              animation: `float-mote ${m.dur}s ease-in-out ${m.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Corner frame accents */}
      <div className="absolute inset-6 pointer-events-none sm:inset-10 lg:inset-14">
        {/* Top-left */}
        <div
          ref={setCornerRef(0)}
          className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-amber-dark/60 to-transparent origin-top sm:h-16 lg:h-20"
        />
        <div
          ref={setCornerRef(1)}
          className="absolute left-0 top-0 w-10 h-px bg-gradient-to-r from-amber-dark/60 to-transparent origin-left sm:w-16 lg:w-20"
        />
        {/* Top-right */}
        <div
          ref={setCornerRef(2)}
          className="absolute right-0 top-0 h-10 w-px bg-gradient-to-b from-amber-dark/60 to-transparent origin-top sm:h-16 lg:h-20"
        />
        <div
          ref={setCornerRef(3)}
          className="absolute right-0 top-0 w-10 h-px bg-gradient-to-l from-amber-dark/60 to-transparent origin-right sm:w-16 lg:w-20"
        />
        {/* Bottom-left */}
        <div
          ref={setCornerRef(4)}
          className="absolute bottom-0 left-0 h-10 w-px bg-gradient-to-t from-amber-dark/60 to-transparent origin-bottom sm:h-16 lg:h-20"
        />
        <div
          ref={setCornerRef(5)}
          className="absolute bottom-0 left-0 w-10 h-px bg-gradient-to-r from-amber-dark/60 to-transparent origin-left sm:w-16 lg:w-20"
        />
        {/* Bottom-right */}
        <div
          ref={setCornerRef(6)}
          className="absolute bottom-0 right-0 h-10 w-px bg-gradient-to-t from-amber-dark/60 to-transparent origin-bottom sm:h-16 lg:h-20"
        />
        <div
          ref={setCornerRef(7)}
          className="absolute bottom-0 right-0 w-10 h-px bg-gradient-to-l from-amber-dark/60 to-transparent origin-right sm:w-16 lg:w-20"
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Warm bloom behind text */}
        <div
          ref={warmBloomRef}
          className="absolute inset-0 -inset-x-20 bg-[radial-gradient(ellipse_at_center,rgba(200,146,42,0.06)_0%,transparent_60%)]"
        />

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="relative mb-2 text-[10px] font-light uppercase tracking-[0.35em] text-[#8a6218] sm:mb-8 sm:text-[12px] sm:tracking-[0.45em]"
        >
          Niche &amp; Luxury Fragrances
        </p>

        {/* Main title — oil painting texture, revealed by parting curtains */}
        <div ref={brandWrapRef} className="brand-shadow">
          <h1
            ref={brandH1Ref}
            className="relative overflow-hidden font-[family-name:var(--font-nunito)] uppercase tracking-[0.06em] leading-[1.05] brand-painted"
            style={{ fontSize: "clamp(1.85rem, 8vw, 5.5rem)" }}
          >
            <span className="font-light">Poly</span>
            <span className="font-black">snifferous</span>
            {/* Golden shimmer sweep */}
            <span
              ref={shimmerRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, transparent 35%, rgba(224,176,74,0.18) 45%, rgba(224,176,74,0.3) 50%, rgba(224,176,74,0.18) 55%, transparent 65%, transparent 100%)",
              }}
            />
          </h1>
        </div>

        {/* Mr and Mrs Sniff image */}
        <div
          ref={dividerDiamondRef}
          className="my-1 flex items-center justify-center sm:my-3"
        >
          <Image
            src="/img/MrandMrsSniffnobg.png"
            alt="Mr and Mrs Sniff"
            width={360}
            height={360}
            className="h-40 w-auto sm:h-72"
            priority
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="relative font-[family-name:var(--font-playfair)] italic font-medium text-[#7a5a1a]"
          style={{ fontSize: "clamp(1.4rem, 5vw, 3.25rem)" }}
        >
          is for the People
        </p>

        {/* Body copy */}
        <p
          ref={bodyRef}
          className="relative mx-auto mt-3 max-w-md text-[12px] font-light leading-[1.7] text-[#5c5145] sm:mt-8 sm:text-base sm:leading-[1.8]"
        >
          Original blends, curated decants, and artisan perfumery
          <br className="hidden sm:block" />
          — bold fragrances made accessible.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-5 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-6"
        >
          <a
            href="/collections"
            className="group relative inline-flex h-[44px] items-center overflow-hidden border border-[#8a6218] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a6218] transition-all duration-500 hover:text-[#f0ebe4] sm:h-[46px] sm:px-8"
          >
            <span className="absolute inset-0 bg-[#8a6218] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative">Shop Collections</span>
          </a>
          <a
            href="#readings"
            className="group inline-flex h-[46px] items-center gap-3 px-2 text-[11px] font-light uppercase tracking-[0.2em] text-[#7a6e62] transition-all duration-500 hover:text-[#3d352c]"
          >
            Book a Reading
            <svg
              className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:bottom-8 sm:gap-3"
      >
        <span className="text-[9px] font-light uppercase tracking-[0.4em] text-[#8a6218]/50">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8a6218]/60 to-transparent animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
