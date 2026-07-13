import { getAllPosts } from "@/lib/posts";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import PostGrid from "@/components/PostGrid";
import FeaturedPoem from "@/components/FeaturedPoem";
import SiteFooter from "@/components/SiteFooter";

// getSeasonalGradient uses new Date() at build time (static rendering).
// The season is updated on each deployment; for real-time seasons, move to a Client Component.
function getSeasonalGradient() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "linear-gradient(160deg, #2D4A3E 0%, #3D6154 40%, #4A7A5A 70%, #2A3D34 100%)";
  if (month >= 5 && month <= 7) return "linear-gradient(160deg, #3A4A2A 0%, #4A5E2A 40%, #5A6E38 65%, #2A3D1A 100%)";
  if (month >= 8 && month <= 10) return "linear-gradient(160deg, #4A3A1A 0%, #5A4A2A 40%, #6A5A3A 65%, #3A2A1A 100%)";
  return "linear-gradient(160deg, #1A2D3A 0%, #2A3D4A 40%, #1E3440 65%, #121E28 100%)";
}

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.find(p => p.coverImage) ?? posts[0];

  return (
    <>
      <Nav posts={posts} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <h1 className="sr-only">clar.earth — poetry and writing by Clare</h1>
        <HeroSection titles={posts.map(p => p.title)} gradient={getSeasonalGradient()} />
        {featured && <FeaturedPoem post={featured} />}
        <PostGrid posts={posts} />
      </main>
      <SiteFooter />
    </>
  );
}
