import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { BannerBotanicalRight } from "@/components/BotanicalAccent";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "About — clar.earth",
  description: "About Clare — poetry, nature, and the spaces between.",
  openGraph: {
    title: "About — clar.earth",
    description: "About Clare — poetry, nature, and the spaces between.",
    url: `${BASE_URL}/about`,
    siteName: "clar.earth",
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export default function AboutPage() {
  const posts = getAllPosts();
  return (
    <>
      <Nav posts={posts} />
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
                My poetry explores longing, ecology, identity, and the small sacred things that hold us together.
              </p>
              <p>
                I&rsquo;m based in Singapore.
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

        {/* Selected works strip — picks 5 poems dynamically so slugs/titles stay in sync */}
        <div className="max-w-4xl mx-auto px-8 mt-20 pt-10 border-t border-[var(--border)]">
          <p
            className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted)] mb-6"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            A few poems
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {(() => {
              const ORDER = ["my-every-sense-of-you", "daughter-of-the-tides", "embers", "drowning", "like-moth-to-flame"];
              return posts
                .filter(p => ORDER.includes(p.slug))
                .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug))
                .map(p => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="text-[var(--muted)] hover:text-[var(--forest)] transition-colors"
                    style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.05rem" }}
                  >
                    {p.title}
                  </Link>
                ));
            })()}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
