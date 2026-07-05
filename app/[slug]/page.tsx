import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import Nav from "@/components/Nav";
import PostPageClient from "@/components/PostPageClient";
import type { Metadata } from "next";
import readingTime from "reading-time";

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
  return {
    title: `${post.title} — clar.earth`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[idx - 1] ?? null;
  const next = allPosts[idx + 1] ?? null;
  const readTime = readingTime(post.content).text;

  return (
    <>
      <Nav />
      <PostPageClient post={post} prev={prev} next={next} readTime={readTime} />
    </>
  );
}
