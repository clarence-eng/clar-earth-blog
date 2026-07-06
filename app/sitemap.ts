import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://clar-earth-blog.vercel.app";
// Fixed fallback — avoids non-deterministic builds when no date field is present
const SITE_LAUNCH = new Date("2025-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : SITE_LAUNCH,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: SITE_LAUNCH,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAUNCH,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...postEntries,
  ];
}
