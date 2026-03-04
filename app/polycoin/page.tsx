"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

function generateWalletAddress() {
  const chars = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

function formatAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const CONVERSION_RATE = 0.0025; // 1 POLY = 0.0025 ETH

interface Transaction {
  id: number;
  amount: number;
  ethCost: number;
  timestamp: Date;
}

const benefits = [
  {
    title: "Exclusive Access Drops",
    description:
      "Polycoin holders receive early and sole access to limited-edition fragrance releases before they reach public sale. First nose, first pour — always.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "On-Chain Authenticity Certificates",
    description:
      "Every bottle receives a token-linked provenance record proving it is genuine — critical for a niche house where counterfeits undercut trust.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Chain of Ownership",
    description:
      "Every bottle carries an immutable ownership history on-chain. When you sell or gift a fragrance, the new owner inherits its full provenance — every hand it passed through, verified and permanent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "Community Governance",
    description:
      "Holders vote on what we create next — which scent profile to develop, which collaboration to pursue, which markets to enter. Your nose, your choice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Loyalty Rewards That Compound",
    description:
      "Unlike points that expire, Polycoin accumulates and appreciates based on the house's growth. Long-term customers are rewarded proportionally.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Transferable Gifting",
    description:
      "Coins can be gifted to fellow fragrance enthusiasts — a store credit that also carries community membership. Share the world of Polysnifferous.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    title: "Scent Memoir NFTs",
    description:
      "Mint a personal scent memoir — a digital artifact tied to a fragrance you wore at a meaningful moment. Build a sensory timeline on-chain that only you can curate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z" />
      </svg>
    ),
  },
  {
    title: "Private Perfumer Sessions",
    description:
      "Top-tier holders unlock one-on-one virtual sessions with our in-house perfumers. Discuss accords, request bespoke modifications, or simply learn the art behind the craft.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Decentralized Scent Reviews",
    description:
      "Write immutable on-chain reviews that cannot be censored or deleted by platforms. Your honest nose becomes a trusted, permanent voice in the community.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Collector Tier Staking",
    description:
      "Stake your Polycoin to climb collector tiers — Bronze Nose, Silver Accord, Gold Sillage, Platinum Nez. Higher tiers unlock deeper discounts, earlier access, and house-exclusive samples.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Social Scent Circles",
    description:
      "Form token-gated scent circles with friends or fellow enthusiasts. Pool coins to commission group-exclusive fragrances, share discovery samples, and host blind-sniff events.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
  },
  {
    title: "Resale Royalty Sharing",
    description:
      "When a limited-edition bottle is resold with its on-chain certificate, a micro-royalty flows back to original Polycoin holders. Community profit, not just platform profit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Seasonal Airdrop Collections",
    description:
      "Every equinox and solstice, active holders receive surprise sample airdrops — physical vials shipped to your door, selected by the house to match the turning season.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Co-Creation Bounties",
    description:
      "Submit scent briefs and mood boards to the house. The community votes with Polycoin on which concepts get developed. Winning contributors receive a co-creator credit and a bottle from the first batch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Blind Swap Marketplace",
    description:
      "Trade mystery decants with other holders. You list a sealed sample tagged only by scent family — the recipient discovers the fragrance after it arrives. A trust-based marketplace powered by holder reputation scores.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Scent-Paired Event Tickets",
    description:
      "Redeem Polycoin for tickets to intimate, scent-paired dinner experiences — multi-course meals designed alongside specific fragrances, hosted in small venues for holders only.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    title: "Olfactory Profile Passport",
    description:
      "Build a verifiable on-chain scent preference profile based on your purchases, reviews, and votes. Other holders and houses can see your taste DNA — opening doors to tailored recommendations and collabs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
      </svg>
    ),
  },
  {
    title: "Referral Yield",
    description:
      "Earn a passive Polycoin yield every time someone you referred makes a purchase. The more your network grows, the more your holdings compound — turning tastemakers into stakeholders.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: "Scent of the Month DAO",
    description:
      "Each month, holders nominate and vote on a 'Scent of the Month' from the full catalog. The winner gets a limited re-release with exclusive packaging, available only to voters who backed it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Cross-House Collaborations",
    description:
      "Polycoin opens bridges to other niche houses. Holders can propose and fund cross-brand collaborative releases — imagine a Polysnifferous x guest perfumer limited accord, voted into existence by the community.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "Wearability Challenges",
    description:
      "Weekly community challenges where holders wear a specific fragrance and share their experience — photos, stories, layering combos. Top entries voted by the community win bonus Polycoin and house recognition.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Legacy Bottle Vault",
    description:
      "Lock Polycoin for extended periods to reserve bottles from future releases years in advance. The longer you lock, the rarer the allocation — building a personal cellar of fragrances yet to be blended.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Scent-Linked Playlists",
    description:
      "Each fragrance gets a community-curated playlist. Holders submit and upvote songs that match a scent's mood. Top playlists are published on streaming platforms under the Polysnifferous brand.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
      </svg>
    ),
  },
  {
    title: "Charity Fragrance Drops",
    description:
      "The community votes to allocate a portion of Polycoin treasury toward charity-edition fragrances. 100% of proceeds go to a cause chosen by holders — perfume with purpose.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Pop-Up Lab Access",
    description:
      "When Polysnifferous launches pop-up blending labs in select cities, Polycoin holders get priority reservations and exclusive time slots to create custom single-use accords with house perfumers on-site.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Holder-Exclusive Packaging",
    description:
      "Polycoin holders receive special packaging variants on every order — hand-numbered boxes, wax-sealed closures, gilded labels, and collector cards unavailable to non-holders.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Digital Bottle Passport",
    description:
      "Each product ships with a scannable NFC tag linked to its on-chain record — production date, bottle number, ownership history, and tasting notes from the perfumer. A living document that travels with the bottle forever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Token-Gated Product Previews",
    description:
      "Before any product hits the storefront, holders get full access to scent profiles, mood boards, behind-the-scenes development notes, and sample request windows. Know the product before the world does.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Holder Price Tiers",
    description:
      "The more Polycoin you hold, the deeper your permanent discount on all products. Not a coupon — a status. Your wallet balance is your membership card.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: "Secondary Market Storefront",
    description:
      "Buy and sell discontinued or sold-out bottles through an official Polycoin-powered secondary market. Every listing is backed by an authenticity certificate — no fakes, no risk.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    title: "Bespoke Engraving Credits",
    description:
      "Spend Polycoin to unlock custom bottle engraving — your name, a date, a short message laser-etched onto the flacon. Turn any bottle into a one-of-one keepsake.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Product Launch Countdown Access",
    description:
      "When a new release is announced, holders enter a private countdown room with live updates, perfumer commentary, and the ability to place pre-orders minutes before the public window opens.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Holder Anniversary Bottles",
    description:
      "On the anniversary of your first Polycoin purchase, you receive access to an annual holder-exclusive fragrance — a scent that is never sold publicly and changes every year.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Layering Recommendation Engine",
    description:
      "Holders unlock an AI-powered layering tool that suggests fragrance combinations from their collection. Rate pairings, share combos with the community, and discover accords you'd never try alone.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm10 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "Burn-to-Redeem Exclusives",
    description:
      "Permanently burn a set amount of Polycoin to claim ultra-limited products — bespoke concentrations, travel atomizer sets, or one-off experimental blends that will never be restocked.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: "Collector Leaderboard",
    description:
      "A public, opt-in leaderboard ranking the most dedicated holders by collection size, review count, community contributions, and governance participation. Top collectors receive quarterly recognition drops.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Fragrance Insurance",
    description:
      "Register your collection on-chain and stake Polycoin to insure it. If a bottle is lost, damaged, or stolen, submit a claim backed by your authenticity certificate for replacement or reimbursement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function PolycoinPage() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [polyBalance, setPolyBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(2.4);
  const [buyAmount, setBuyAmount] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txCounter, setTxCounter] = useState(0);
  const [walletOpen, setWalletOpen] = useState(false);

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      setWalletAddress("");
      setPolyBalance(0);
      setEthBalance(2.4);
      setBuyAmount("");
      setTransactions([]);
      setTxCounter(0);
    } else {
      setWalletAddress(generateWalletAddress());
      setConnected(true);
    }
  };

  const handlePurchase = () => {
    const amount = parseFloat(buyAmount);
    if (!amount || amount <= 0) return;
    const cost = amount * CONVERSION_RATE;
    if (cost > ethBalance) return;

    setPurchasing(true);
    setTimeout(() => {
      setPolyBalance((prev) => prev + amount);
      setEthBalance((prev) => parseFloat((prev - cost).toFixed(6)));
      const newId = txCounter + 1;
      setTxCounter(newId);
      setTransactions((prev) => [
        { id: newId, amount, ethCost: cost, timestamp: new Date() },
        ...prev,
      ]);
      setBuyAmount("");
      setPurchasing(false);
    }, 1800);
  };

  const ethCost = buyAmount ? parseFloat(buyAmount) * CONVERSION_RATE : 0;
  const canBuy = buyAmount && parseFloat(buyAmount) > 0 && ethCost <= ethBalance && !purchasing;

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />

      <main className="pt-[72px]">
        {/* Hero */}
        <section className="relative py-6 lg:py-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,146,42,0.06)_0%,transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="relative mx-auto mb-4 lg:mb-6 h-64 w-64 lg:h-[520px] lg:w-[520px]">
              <div className="absolute inset-0 rounded-full bg-accent/[0.07] blur-3xl" />
              <Image
                src="/img/polycoin.png"
                alt="Polycoin"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(212,152,42,0.2)]"
                priority
              />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber mb-3">
              The Polysnifferous Token
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4">
              Polycoin
            </h1>
            <div className="ornament mb-4">
              <span className="text-amber-dark text-xs">◆</span>
            </div>
            <p className="text-foreground-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              A token for those who believe fragrance is more than product — it is provenance,
              community, and craft. Hold Polycoin to unlock the inner world of Polysnifferous.
            </p>
          </div>
        </section>

        {/* Floating Wallet Widget */}
        <div className="fixed top-24 right-6 z-40 lg:right-10">
          {!walletOpen ? (
            <button
              onClick={() => setWalletOpen(true)}
              className="group flex items-center gap-3 border border-amber-dark/50 bg-background-secondary backdrop-blur-xl px-5 py-3.5 lg:px-6 lg:py-4 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber/60 hover:shadow-[0_4px_30px_rgba(200,146,42,0.15)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 lg:w-6 lg:h-6 text-amber-light">
                <path d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 16a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {connected ? (
                <span className="text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-amber-light">
                  {polyBalance.toLocaleString()} POLY
                </span>
              ) : (
                <span className="text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-foreground group-hover:text-amber-light transition-colors">
                  Wallet
                </span>
              )}
              {connected && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
            </button>
          ) : (
            <div className="w-80 lg:w-96 border border-amber-dark/40 bg-background-secondary backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] animate-fade-in">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-amber-dark/25 px-5 py-4 lg:px-7 lg:py-5">
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 lg:w-6 lg:h-6 text-amber-light">
                    <path d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 16a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  <span className="text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-foreground">Wallet</span>
                </div>
                <button
                  onClick={() => setWalletOpen(false)}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-5 lg:p-7">
                {!connected ? (
                  <div className="text-center py-4 lg:py-6">
                    <p className="text-foreground/70 text-sm lg:text-base mb-6 leading-relaxed">
                      Connect a wallet to acquire Polycoin and unlock holder benefits.
                    </p>
                    <button
                      onClick={handleConnect}
                      className="w-full border border-amber/50 bg-amber-dark/10 px-6 py-3 lg:py-3.5 text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-amber-light hover:bg-amber-dark/20 hover:border-amber/70 transition-all duration-300 cursor-pointer"
                    >
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 lg:space-y-6">
                    {/* Address + disconnect */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-foreground/70 text-xs lg:text-sm font-mono">
                          {formatAddress(walletAddress)}
                        </span>
                      </div>
                      <button
                        onClick={handleConnect}
                        className="text-[10px] lg:text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60 hover:text-red-light transition-colors cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </div>

                    {/* Balances */}
                    <div className="grid grid-cols-2 gap-4 lg:gap-6 pb-5 border-b border-amber-dark/20">
                      <div>
                        <p className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-foreground/60 mb-1">POLY</p>
                        <p className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-amber-light">
                          {polyBalance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-foreground/60 mb-1">ETH</p>
                        <p className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl text-foreground">
                          {ethBalance.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    {/* Buy */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] text-foreground">Buy Polycoin</span>
                        <span className="text-foreground/50 text-[10px] lg:text-xs">1 POLY = {CONVERSION_RATE} ETH</span>
                      </div>
                      <div className="flex gap-2 lg:gap-3">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0"
                          disabled={purchasing}
                          className="flex-1 bg-background border border-border px-3 py-2.5 lg:px-4 lg:py-3 text-foreground text-sm lg:text-base font-mono outline-none focus:border-amber-dark transition-colors placeholder:text-foreground-muted/50"
                        />
                        <button
                          onClick={handlePurchase}
                          disabled={!canBuy}
                          className="border border-amber/50 bg-amber-dark/10 px-5 py-2.5 lg:px-6 lg:py-3 text-xs lg:text-sm font-semibold uppercase tracking-[0.1em] text-amber-light hover:bg-amber-dark/20 hover:border-amber/70 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {purchasing ? (
                            <span className="w-3.5 h-3.5 border-2 border-amber/60 border-t-transparent rounded-full animate-spin inline-block" />
                          ) : (
                            "Buy"
                          )}
                        </button>
                      </div>
                      {buyAmount && parseFloat(buyAmount) > 0 && (
                        <p className="text-foreground/60 text-xs lg:text-sm mt-2 font-mono">
                          Cost: {ethCost.toFixed(6)} ETH
                        </p>
                      )}
                      {ethCost > ethBalance && (
                        <p className="text-red-light text-xs lg:text-sm mt-1">Insufficient ETH</p>
                      )}
                    </div>

                    {/* Transaction History */}
                    {transactions.length > 0 && (
                      <div className="border-t border-amber-dark/20 pt-4 lg:pt-5">
                        <p className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-foreground/60 mb-3">Recent</p>
                        <div className="space-y-2.5 max-h-40 overflow-y-auto">
                          {transactions.map((tx) => (
                            <div
                              key={tx.id}
                              className="flex items-center justify-between text-xs lg:text-sm"
                            >
                              <div>
                                <span className="text-amber-light font-mono">+{tx.amount.toLocaleString()}</span>
                                <span className="text-foreground/50 ml-2">−{tx.ethCost.toFixed(4)} ETH</span>
                              </div>
                              <span className="text-foreground/40 font-mono text-[10px] lg:text-xs">
                                {formatTime(tx.timestamp)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,146,42,0.04)_0%,transparent_60%)]" />
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber mb-4">
                Why Hold Polycoin
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Built for the Fragrance Connoisseur
              </h2>
              <div className="ornament mb-6">
                <span className="text-amber-dark text-xs">◆</span>
              </div>
              <p className="text-foreground-muted text-sm leading-relaxed max-w-2xl mx-auto">
                Polycoin is not a generic utility token. Every benefit is designed around the realities
                of niche perfumery — rare materials, limited runs, and a community that demands authenticity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="gilded-frame bg-background-secondary/40 p-7 group hover:bg-background-secondary/60 transition-colors duration-300"
                >
                  <div className="text-amber mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {benefit.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-base text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground-muted text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="ornament mb-8">
              <span className="text-amber-dark text-xs">◆</span>
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed mb-8">
              Polycoin is currently in private beta. Connect your wallet above to begin
              accumulating tokens ahead of the public launch.
            </p>
            <p className="text-foreground-muted/40 text-[10px] uppercase tracking-[0.2em]">
              This is a simulated experience — no real transactions occur
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
