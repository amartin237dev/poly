const footerLinks = {
  shop: [
    { name: "Original Fragrances", href: "/collections" },
    { name: "Perito Moreno", href: "/collections" },
    { name: "Dark Tales", href: "/collections" },
    { name: "Aromas De Salazar", href: "/collections" },
  ],
  quickLinks: [
    { name: "Perfume Readings", href: "/readings" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Shipping Info", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-dark/15 bg-background-secondary">
      {/* Gilded top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-dark/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="brand-shadow">
              <span className="font-[family-name:var(--font-nunito)] text-xl uppercase tracking-[0.08em] text-foreground">
                <span className="font-light">Poly</span>
                <span className="font-black">snifferous</span>
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Niche &amp; luxury fragrances made accessible. For the people,
              always.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex gap-5">
              <a href="https://instagram.com/mrandmrssniff" className="text-foreground-muted/80 transition-colors duration-300 hover:text-accent" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://tiktok.com/@mrandmrssniff" className="text-foreground-muted/80 transition-colors duration-300 hover:text-accent" aria-label="TikTok">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.99-.43z" />
                </svg>
              </a>
              <a href="https://youtube.com/@mrandmrssniff" className="text-foreground-muted/80 transition-colors duration-300 hover:text-accent" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collections column */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Collections
            </h4>
            <div className="mt-2 h-px w-8 bg-amber-dark/30" />
            <ul className="mt-5 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-foreground-muted transition-colors duration-300 hover:text-accent">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Quick Links
            </h4>
            <div className="mt-2 h-px w-8 bg-amber-dark/30" />
            <ul className="mt-5 space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-foreground-muted transition-colors duration-300 hover:text-accent">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Information
            </h4>
            <div className="mt-2 h-px w-8 bg-amber-dark/30" />
            <ul className="mt-5 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-foreground-muted transition-colors duration-300 hover:text-accent">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-amber-dark/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs uppercase tracking-[0.1em] text-foreground-muted/70">
              &copy; {new Date().getFullYear()} Polysnifferous. All rights reserved.
            </p>
            <a href="/admin/login" className="text-foreground-muted/50 hover:text-foreground-muted/80 text-[10px] uppercase tracking-[0.15em] transition-colors">
              Admin
            </a>
            <p className="font-[family-name:var(--font-playfair)] text-xs italic text-foreground-muted/60">
              For the People, Always
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
