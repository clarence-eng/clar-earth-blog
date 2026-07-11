"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "./SearchModal";
import type { PostMeta } from "@/lib/posts";

interface NavProps { posts: PostMeta[] }

export default function Nav({ posts }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchOpenRef = useRef(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSearch = useCallback(() => {
    if (focusTimerRef.current !== null) { clearTimeout(focusTimerRef.current); focusTimerRef.current = null; }
    setSearchOpen(true);
    searchOpenRef.current = true;
    setMenuOpen(false);
  }, []);
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    searchOpenRef.current = false;
    if (focusTimerRef.current !== null) clearTimeout(focusTimerRef.current);
    focusTimerRef.current = setTimeout(() => { focusTimerRef.current = null; searchButtonRef.current?.focus(); }, 0);
  }, []);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => {
      window.removeEventListener("scroll", h);
      if (focusTimerRef.current !== null) clearTimeout(focusTimerRef.current);
    };
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close menu on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
      if (e.key === "Escape") {
        if (searchOpenRef.current) closeSearch();
        else if (menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); }
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [openSearch, closeSearch, menuOpen]);

  if (pathname.startsWith("/keystatic")) return null;

  const isHome = pathname === "/";
  const onDark = !scrolled && isHome;

  const textBase = onDark ? "text-white/80 hover:text-white" : "text-[var(--charcoal)] hover:text-[var(--forest)]";
  const textMuted = onDark ? "text-white/65 hover:text-white/90" : "text-[var(--muted)] hover:text-[var(--forest)]";
  const menuBg = menuOpen ? "bg-[var(--cream)] border-b border-[var(--border)]" : "";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${menuOpen ? menuBg : scrolled || !isHome ? "bg-[var(--cream)]/90 backdrop-blur-sm border-b border-[var(--border)] py-4" : "bg-transparent py-6"} ${menuOpen ? "py-4" : ""}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo + IG */}
          <div className="flex items-center gap-3">
            <Link href="/" className={`font-jost tracking-[0.3em] text-[11px] font-medium uppercase transition-colors duration-300 ${menuOpen ? "text-[var(--charcoal)] hover:text-[var(--forest)]" : textBase}`}
              aria-current={isHome ? 'page' : undefined}>
              CLAR.EARTH
            </Link>
            <a
              href="https://www.instagram.com/clar.earth/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center w-9 h-9 -m-2 transition-colors duration-300 ${menuOpen ? "text-[var(--muted)] hover:text-[var(--forest)]" : textMuted}`}
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>

          {/* Desktop nav */}
          <nav aria-label="Site navigation" className="hidden sm:flex items-center gap-5">
            <button
              type="button"
              ref={searchButtonRef}
              onClick={openSearch}
              className={`nav-action-label transition-colors duration-300 min-h-[44px] px-1 ${textMuted}`}
              title="Search (⌘K)"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-haspopup="dialog"
              aria-keyshortcuts="Meta+k Control+k"
            >
              Search
            </button>
            <Link href="/about" className={`nav-action-label transition-colors duration-300 min-h-[44px] flex items-center ${textMuted}`}
              aria-current={pathname === '/about' ? 'page' : undefined}>
              About
            </Link>
            {resolvedTheme && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className={`w-11 h-11 flex items-center justify-center transition-colors duration-300 ${textMuted}`}
                title={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {resolvedTheme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            )}
          </nav>

          {/* Mobile right side: search icon + hamburger */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              type="button"
              ref={searchButtonRef}
              onClick={openSearch}
              className={`w-11 h-11 flex items-center justify-center transition-colors duration-300 ${menuOpen ? "text-[var(--muted)] hover:text-[var(--forest)]" : textMuted}`}
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-haspopup="dialog"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className={`w-11 h-11 flex items-center justify-center transition-colors duration-300 ${menuOpen ? "text-[var(--charcoal)]" : textMuted}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-label="Mobile navigation"
              className="sm:hidden border-t border-[var(--border)] bg-[var(--cream)]"
            >
              <div className="flex flex-col px-4 py-3 gap-1">
                <Link
                  href="/about"
                  className="font-jost text-[13px] tracking-[0.15em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors py-3 border-b border-[var(--border)]"
                  aria-current={pathname === '/about' ? 'page' : undefined}
                >
                  About
                </Link>
                {resolvedTheme && (
                  <button
                    type="button"
                    onClick={() => { setTheme(resolvedTheme === "dark" ? "light" : "dark"); setMenuOpen(false); }}
                    className="font-jost text-[13px] tracking-[0.15em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors py-3 text-left flex items-center gap-3"
                  >
                    {resolvedTheme === "dark" ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                        Light mode
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        Dark mode
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <SearchModal posts={posts} onClose={closeSearch} />
        )}
      </AnimatePresence>
    </>
  );
}
