"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BotanicalAccent from "./BotanicalAccent";

export default function Nav() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/keystatic");

  if (isAdmin) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 pt-7 pb-0 flex items-start justify-between pointer-events-none">
      <Link
        href="/"
        className="pointer-events-auto tracking-[0.25em] text-[11px] font-medium uppercase text-[var(--charcoal)] hover:text-[var(--sage)] transition-colors duration-300"
        style={{ fontFamily: "var(--font-jost)" }}
      >
        CLAR.EARTH
      </Link>
      <BotanicalAccent className="w-8 h-10 text-[var(--sage)] pointer-events-none" />
    </header>
  );
}
