export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://clar.earth";

export const SITE_TAGLINE = "In the shadow of trees, I find my voice. Where the earth listens, and the pen replies.";

import type { PostType } from "@/lib/posts";

export const TYPE_LABELS: Record<PostType, string> = {
  poem: "Poem",
  article: "Article",
  "photo-essay": "Photo Essay",
};

export function primaryMood(mood: string[] | undefined): string | undefined {
  return mood?.[0];
}

// Map display-name lang values (from Keystatic frontmatter) to BCP-47 codes
export const LANG_MAP: Partial<Record<string, string>> = {
  "中文": "zh",
  "日本語": "ja",
  "español": "es",
  "français": "fr",
  "tiếng việt": "vi",
  "한국어": "ko",
};
