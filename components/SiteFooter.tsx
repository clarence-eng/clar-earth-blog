import { BannerBotanicalRight } from "./BotanicalAccent";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--border)] mt-4 overflow-hidden">
      {/* Faint botanical background */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none select-none">
        <BannerBotanicalRight className="w-24 h-32 text-[var(--forest)]" />
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="font-jost text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors duration-300"
        >
          CLAR.EARTH
        </Link>

        <p
          className="italic text-[var(--muted)] text-sm text-center"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          where the earth listens, and the pen replies
        </p>

        {/* suppressHydrationWarning: year is baked at build time on server, re-evaluated at runtime on client */}
        <span
          suppressHydrationWarning
          className="font-jost text-[10px] tracking-widest text-[var(--muted)]"
        >
          © {new Date().getFullYear()} clar.earth
        </span>
      </div>
    </footer>
  );
}
