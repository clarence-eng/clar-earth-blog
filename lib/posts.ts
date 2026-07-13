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
  excerpt?: string;
  published: boolean;
  coverImage?: string;
  dedication?: string;
  coAuthor?: string;
  lang?: string;
  mood?: string[];
  readingPhrase?: string;
  ladybugColor?: string;
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

export function getAllPosts(): (PostMeta & { published: true })[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      const { slug: _discard, ...rest } = data as Partial<PostMeta>;
      const post = { slug, ...rest };
      if (!post.type) post.type = "poem";
      if (!(['poem','article','photo-essay'] as const).includes(post.type as never)) post.type = "poem";
      if (post.mood && !Array.isArray(post.mood)) post.mood = [post.mood as unknown as string];
      return post;
    })
    .filter((p): p is typeof p & { title: string; published: true } => p.published === true && !!p.title)
    .sort((a, b) => {
      const aLatin = /^[A-Za-z]/.test(a.title);
      const bLatin = /^[A-Za-z]/.test(b.title);
      // Chinese/Japanese/Korean characters sort after Latin
      const aCJK = /^[一-鿿぀-ヿ가-힯]/.test(a.title);
      const bCJK = /^[一-鿿぀-ヿ가-힯]/.test(b.title);
      if (aLatin && !bLatin) return -1;
      if (!aLatin && bLatin) return 1;
      if (aLatin && bLatin) return a.title.localeCompare(b.title, "en");
      if (aCJK && bCJK) return a.title.localeCompare(b.title, "zh");
      return a.title.localeCompare(b.title, "en");
    });

  return posts as (PostMeta & { published: true })[];
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const { slug: _discard, ...rest } = data as Partial<PostMeta>;
  const post = { slug, ...rest, content } as Post;
  if (!post.title) return null;
  if (post.published !== true) return null;
  if (!post.type) post.type = "poem";
  if (!(['poem','article','photo-essay'] as const).includes(post.type as never)) post.type = "poem";
  if (post.mood && !Array.isArray(post.mood)) post.mood = [post.mood as unknown as string];
  return post;
}
