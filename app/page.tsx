import { getAllPosts } from "@/lib/posts";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import PostGrid from "@/components/PostGrid";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <HeroSection />
      <PostGrid posts={posts} />

      <footer className="border-t border-[var(--border)] mt-8 px-8 py-8 flex items-center justify-between">
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          © clar.earth
        </span>
        <span
          className="text-[11px] italic text-[var(--muted-light)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          where the earth listens
        </span>
      </footer>
    </>
  );
}
