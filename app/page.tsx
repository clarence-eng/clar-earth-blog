import { getAllPosts } from "@/lib/posts";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import PostGrid from "@/components/PostGrid";
import FeaturedPoem from "@/components/FeaturedPoem";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  const posts = getAllPosts();
  // Feature the first poem (alphabetical order — no date-based sort)
  const featured = posts.find(p => p.coverImage) ?? posts[0];

  return (
    <>
      <Nav posts={posts} />
      <main id="main-content" className="flex-1">
        <h1 className="sr-only">clar.earth — poetry and writing by Clare</h1>
        <HeroSection titles={posts.map(p => p.title)} />
        {featured && <FeaturedPoem post={featured} />}
        <PostGrid posts={posts} />
      </main>
      <SiteFooter />
    </>
  );
}
