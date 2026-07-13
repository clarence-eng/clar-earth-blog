import { notFound } from "next/navigation";
import { getAllPosts, getPost, natureReadingTime } from "@/lib/posts";
import { cache } from "react";
import Nav from "@/components/Nav";
import PostPageClient from "@/components/PostPageClient";
import SiteFooter from "@/components/SiteFooter";
import LangSync from "@/components/LangSync";
import type { Metadata } from "next";
import readingTime from "reading-time";
import { BASE_URL, LANG_MAP } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

const getCachedPost = cache((slug: string) => getPost(slug));

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getCachedPost(slug);
  if (!post) return {};

  const url = `${BASE_URL}/${slug}`;
  const coverUrl = post.coverImage
    ? `${BASE_URL}${post.coverImage.startsWith('/') ? '' : '/'}${post.coverImage}`
    : undefined;

  return {
    title: `${post.title} — clar.earth`,
    description: post.excerpt ?? "A poem by Clare.",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "A poem by Clare.",
      url,
      siteName: "clar.earth",
      type: "article",
      locale: post.lang ? (LANG_MAP[post.lang] === "zh" ? "zh_CN" : LANG_MAP[post.lang] === "ja" ? "ja_JP" : LANG_MAP[post.lang] === "ko" ? "ko_KR" : undefined) : "en_US",
      ...(coverUrl ? { images: [{ url: coverUrl, alt: post.title }] } : {}),
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt ?? "A poem by Clare.",
      ...(coverUrl ? { images: [coverUrl] } : {}),
    },
    alternates: { canonical: url },
  };
}

// Escape characters that are valid JSON but break inline <script> blocks
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj)
    .replace(/<\/script>/gi, "<\\/script>")
    .replaceAll(String.fromCharCode(0x2028), "\\u2028")
    .replaceAll(String.fromCharCode(0x2029), "\\u2029");
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getCachedPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? allPosts[idx - 1] : null;
  const next = idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const readTime = post.readingPhrase || natureReadingTime(readingTime(post.content).words);

  const rawLang = post.lang ?? "";
  // Resolve BCP-47: known English content has no lang field (falls back to "en"),
  // non-English content must have a recognised LANG_MAP entry. Warn and omit rather
  // than silently lying with a wrong code.
  const bcp47: string | undefined = rawLang === ""
    ? "en"
    : LANG_MAP[rawLang] !== undefined
      ? LANG_MAP[rawLang]
      : (() => {
          console.warn(`[slug]/page.tsx: unknown lang value "${rawLang}" for post "${slug}" — omitting inLanguage from JSON-LD`);
          return undefined;
        })();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": post.type === "poem" ? "Poem" : "CreativeWork",
    "name": post.title,
    "author": {
      "@type": "Person",
      "name": "Clare",
      "url": `${BASE_URL}/about`,
    },
    "url": `${BASE_URL}/${slug}`,
    "description": post.excerpt ?? "",
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "clar.earth",
      "url": BASE_URL,
    },
  };

  if (bcp47 !== undefined) {
    schema["inLanguage"] = bcp47;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      {bcp47 && bcp47 !== "en" && <LangSync lang={bcp47} />}
      <Nav posts={allPosts} />
      <PostPageClient post={post} prev={prev} next={next} readTime={readTime} allPosts={allPosts} />
      <SiteFooter />
    </>
  );
}
