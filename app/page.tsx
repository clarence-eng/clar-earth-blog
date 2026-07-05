import { getAllPosts } from "@/lib/posts";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import PostGrid from "@/components/PostGrid";
import FeaturedPoem from "@/components/FeaturedPoem";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  const posts = getAllPosts();
  // Feature the most recent poem with a cover image
  const featured = posts.find(p => p.coverImage) ?? posts[0];

  return (
    <>
      <Nav posts={posts} />
      <HeroSection />
      {featured && <FeaturedPoem post={featured} />}
      <PostGrid posts={posts} />
      <SiteFooter />
    </>
  );
}
