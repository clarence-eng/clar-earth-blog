import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import BotanicalAccent from "@/components/BotanicalAccent";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — clar.earth",
  description: "About Clare — poetry, nature, and the spaces between.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-24">
        {/* Hero tagline */}
        <div className="max-w-4xl mx-auto px-8 mb-20">
          <p
            className="text-[10px] tracking-[0.35em] uppercase text-[var(--muted)] mb-8"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            About
          </p>
          <blockquote
            className="text-[var(--forest)] leading-[1.4]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            &ldquo;In the shadow of trees, I find my voice.
            <br />
            Where the earth listens, and the pen replies.&rdquo;
          </blockquote>
          <div className="h-px w-12 bg-[var(--gold)] mt-8 opacity-70" />
        </div>

        {/* Two-column content */}
        <div className="max-w-4xl mx-auto px-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start">
          {/* Bio */}
          <div>
            <div
              className="space-y-5 text-[var(--ink)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.2rem",
                lineHeight: 1.8,
              }}
            >
              <p>
                I write from the margins of nature — where the forest meets the city, where silence meets speech, where the personal meets the planetary.
              </p>
              <p>
                My poetry explores longing, ecology, identity, and the small sacred things that hold us together. I believe in the power of language to make the invisible visible, and the quiet radical act of paying attention.
              </p>
              <p>
                I&rsquo;m based in Singapore, and I write in English and Chinese.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--forest)] text-white rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--forest-mid)] transition-colors"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                View all works
              </Link>
              <span
                className="text-[10px] tracking-[0.15em] uppercase text-[var(--muted)]"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                · clar.earth
              </span>
            </div>
          </div>

          {/* Decorative botanical */}
          <div className="hidden md:block opacity-[0.18] select-none pointer-events-none pt-4">
            <BotanicalAccent className="w-32 h-44 text-[var(--forest)]" />
          </div>
        </div>

        {/* Selected works strip */}
        <div className="max-w-4xl mx-auto px-8 mt-20 pt-10 border-t border-[var(--border)]">
          <p
            className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted)] mb-6"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            A few poems
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              { slug: "my-every-sense-of-you", title: "My Every Sense of You" },
              { slug: "daughter-of-the-tides", title: "Daughter of the Tides" },
              { slug: "embers", title: "Embers" },
              { slug: "drowning", title: "Drowning" },
              { slug: "like-moth-to-flame", title: "Like Moth to Flame" },
            ].map(({ slug, title }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="text-[var(--muted)] hover:text-[var(--forest)] transition-colors"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                }}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
