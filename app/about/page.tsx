import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { BannerBotanicalRight } from "@/components/BotanicalAccent";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — clar.earth",
  description: "Clare writes from the edges — intertidal flats, peat forests, the threshold between the personal and the planetary.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen pt-28 pb-24">
        {/* Hero tagline */}
        <div className="max-w-4xl mx-auto px-8 mb-20">
          <p
            className="text-[10px] tracking-[0.35em] uppercase text-[var(--muted)] mb-8"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            About
          </p>
          <blockquote
            className="text-balance text-[var(--forest)] leading-[1.4]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
            }}
          >
            &ldquo;She watches first. Then makes demands.&rdquo;
          </blockquote>
          <div className="h-px w-12 bg-[var(--gold)] mt-8 opacity-70" />
        </div>

        {/* Two-column content */}
        <div className="max-w-4xl mx-auto px-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start">
          {/* Bio */}
          <div>
            <div
              className="space-y-6 text-[var(--ink)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.2rem",
                lineHeight: 1.85,
              }}
            >
              <p>
                Clare&rsquo;s poems take their time before they make demands. She watches first — a hermit crab scribing paths across tidal silt, an ember kept alive beneath the ribs long after a gathering ends, peat that holds eight thousand years of carbon in a wet, dark patience. The attention is not decorative. It is the argument.
              </p>
              <p>
                Her work moves between the living world of Southeast Asian forests, intertidal flats, and peat swamps and the interior world of longing, fellowship, and loss — and finds that both require the same instrument: precise, unhurried looking. She writes in English and Chinese, and reaches for Vietnamese or Malay when those are the more truthful words.
              </p>
              <p>
                Formally, she follows the feeling. A sonnet where the volta must do moral work. A poem about drowning that moves down the page like a current. An abandoned notebook that speaks its own grief. The form is chosen for its fit, and so is every image: she names the seagrass blade by blade — Fern, Needle, Spoon — and counts the 27,000 signatures on the petition. Facts are load-bearing here. They are what keeps the political poems from becoming slogans.
              </p>
              <p>
                Clare is based in Singapore. She has knelt in restoration canals, guided nature walks through mangroves at low tide, and lost notebooks to rain. She writes to keep what she has touched from disappearing entirely.
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
            <BannerBotanicalRight className="w-32 h-44 text-[var(--forest)]" />
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
