import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { BASE_URL } from "@/lib/config";
// Fixed fallback — avoids non-deterministic builds when no date field is present
const SITE_LAUNCH = new Date("2025-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const parseDate = (d: string | undefined) =>
    d ? (isNaN(new Date(d).getTime()) ? SITE_LAUNCH : new Date(d)) : SITE_LAUNCH;

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Use most recent post date as homepage lastModified so crawlers re-index on new content
  const mostRecent = posts.reduce<Date>((latest, p) => {
    const d = parseDate(p.date);
    return d > latest ? d : latest;
  }, SITE_LAUNCH);

  return [
    {
      url: BASE_URL,
      lastModified: mostRecent,
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
