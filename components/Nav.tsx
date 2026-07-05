"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/keystatic");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[var(--cream)]/90 backdrop-blur-sm border-b border-[var(--border)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        <Link
          href="/"
          className={`tracking-[0.3em] text-[11px] font-medium uppercase transition-colors duration-300 ${
            scrolled || !isHome
              ? "text-[var(--charcoal)] hover:text-[var(--forest)]"
              : "text-white/80 hover:text-white"
          }`}
          style={{ fontFamily: "var(--font-jost)" }}
        >
          CLAR.EARTH
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
              scrolled || !isHome
                ? "text-[var(--muted)] hover:text-[var(--forest)]"
                : "text-white/50 hover:text-white/80"
            }`}
            style={{ fontFamily: "var(--font-jost)" }}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
