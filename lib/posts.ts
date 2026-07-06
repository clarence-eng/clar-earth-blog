import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostType = "poem" | "article" | "photo-essay";

export interface PostMeta {
  slug: string;
  title: string;
  date?: string;
  type: PostType;
  excerpt: string;
  published: boolean;
  coverImage?: string;
  dedication?: string;
  coAuthor?: string;
  lang?: string;
  mood?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

// Nature-metaphor reading time
export function natureReadingTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200);
  if (minutes <= 1) return "a breath";
  if (minutes <= 2) return "a moment by the stream";
  if (minutes <= 3) return "a walk through the garden";
  if (minutes <= 5) return "a sit beneath the trees";
  if (minutes <= 8) return "a wander through the forest";
  return "a long walk at dusk";
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<PostMeta, "slug">) };
    })
    .filter((p) => p.published !== false)
    .sort((a, b) => {
      if (!a.title || !b.title) return 0;
      const aLatin = /^[A-Za-z]/.test(a.title);
      const bLatin = /^[A-Za-z]/.test(b.title);
      if (aLatin && !bLatin) return -1;
      if (!aLatin && bLatin) return 1;
      if (aLatin && bLatin) return a.title.localeCompare(b.title, "en");
      return 0;
    });

  return posts as PostMeta[];
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return { slug, ...(data as Omit<PostMeta, "slug">), content } as Post;
}
