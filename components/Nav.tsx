"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";
import type { PostMeta } from "@/lib/posts";

interface NavProps { posts?: PostMeta[] }

export default function Nav({ posts = [] }: NavProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/keystatic");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchOpenRef = useRef(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const openSearch = () => { setSearchOpen(true); searchOpenRef.current = true; };
  const closeSearch = () => {
    setSearchOpen(false);
    searchOpenRef.current = false;
    setTimeout(() => searchButtonRef.current?.focus(), 0);
  };
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl+K opens search
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
      if (e.key === "Escape" && searchOpenRef.current) closeSearch();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  if (isAdmin) return null;

  const isHome = pathname === "/";
  const onDark = !scrolled && isHome;

  const textBase = onDark ? "text-white/80 hover:text-white" : "text-[var(--charcoal)] hover:text-[var(--forest)]";
  const textMuted = onDark ? "text-white/50 hover:text-white/80" : "text-[var(--muted)] hover:text-[var(--forest)]";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[var(--cream)]/90 backdrop-blur-sm border-b border-[var(--border)] py-4"
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className={`tracking-[0.3em] text-[11px] font-medium uppercase transition-colors duration-300 ${textBase}`}
            style={{ fontFamily: "var(--font-jost)" }}>
            CLAR.EARTH
          </Link>

          <nav aria-label="Site navigation" className="flex items-center gap-5">
            {/* Search */}
            <button
              ref={searchButtonRef}
              onClick={openSearch}
              className={`transition-colors duration-300 ${textMuted}`}
              title="Search (⌘K)"
              aria-label="Search"
              style={{ fontFamily: "var(--font-jost)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              Search
            </button>

            {/* About */}
            <Link href="/about" className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${textMuted}`}
              style={{ fontFamily: "var(--font-jost)" }}>
              About
            </Link>

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className={`transition-colors duration-300 ${textMuted}`}
                title={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {resolvedTheme === "dark" ? (
                  // Sun icon
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </svg>
                ) : (
                  // Moon icon
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            )}
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <SearchModal posts={posts} onClose={closeSearch} />
        )}
      </AnimatePresence>
    </>
  );
}
