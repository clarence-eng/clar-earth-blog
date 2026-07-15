import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { BASE_URL } from "@/lib/config";
// Fixed fallback — avoids non-deterministic builds when no date field is present
const SITE_LAUNCH = new Date("2025-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: post.date ? (isNaN(new Date(post.date).getTime()) ? SITE_LAUNCH : new Date(post.date)) : SITE_LAUNCH,
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
