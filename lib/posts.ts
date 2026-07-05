import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostType = "poem" | "article" | "photo-essay";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  type: PostType;
  excerpt: string;
  published: boolean;
  coverImage?: string;
  dedication?: string;
  coAuthor?: string;
  notes?: string;
  lang?: string;
}

export interface Post extends PostMeta {
  content: string;
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
      // Chinese/non-Latin titles go last
      const aLatin = /^[A-Za-z]/.test(a.title);
      const bLatin = /^[A-Za-z]/.test(b.title);
      if (aLatin && !bLatin) return -1;
      if (!aLatin && bLatin) return 1;
      // Both Latin: alphabetical by title
      if (aLatin && bLatin) return a.title.localeCompare(b.title, "en");
      // Both non-Latin: stable order
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
