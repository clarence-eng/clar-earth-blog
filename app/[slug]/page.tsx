import { notFound } from "next/navigation";
import { getAllPosts, getPost, natureReadingTime } from "@/lib/posts";
import Nav from "@/components/Nav";
import PostPageClient from "@/components/PostPageClient";
import type { Metadata } from "next";
import readingTime from "reading-time";
import { BASE_URL } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${BASE_URL}/${slug}`;

  return {
    title: `${post.title} — clar.earth`,
    description: post.excerpt ?? "A poem by Clare.",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "A poem by Clare.",
      url,
      siteName: "clar.earth",
      type: "article",
      ...(post.coverImage ? { images: [{ url: `${BASE_URL}${post.coverImage}` }] } : {}),
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt ?? "A poem by Clare.",
      ...(post.coverImage ? { images: [`${BASE_URL}${post.coverImage}`] } : {}),
    },
    alternates: { canonical: url },
  };
}

// Escape characters that are valid JSON but break inline <script> blocks
function safeJsonLd(obj: object): string {
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);
  return JSON.stringify(obj)
    .replace(/<\/script>/gi, "<\\/script>")
    .split(LS).join("\\u2028")
    .split(PS).join("\\u2029");
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[idx - 1] ?? null;
  const next = allPosts[idx + 1] ?? null;
  const rt = readingTime(post.content);
  const readTime = post.readingPhrase ?? natureReadingTime(rt.words);

  const schema = {
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
    "inLanguage": post.lang === "中文" ? "zh" : "en",
    "publisher": {
      "@type": "Organization",
      "name": "clar.earth",
      "url": BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      <Nav posts={allPosts} />
      <PostPageClient post={post} prev={prev} next={next} readTime={readTime} allPosts={allPosts} />
    </>
  );
}
