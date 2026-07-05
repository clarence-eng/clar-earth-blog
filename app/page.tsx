import { getAllPosts } from "@/lib/posts";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import PostGrid from "@/components/PostGrid";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav posts={posts} />
      <HeroSection />
      <PostGrid posts={posts} />
      <SiteFooter />
    </>
  );
}
