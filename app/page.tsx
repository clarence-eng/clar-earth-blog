import { getAllPosts } from "@/lib/posts";
import Nav from "@/components/Nav";
import PostList from "@/components/PostList";
import BotanicalAccent from "@/components/BotanicalAccent";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen flex">
        {/* Left column — navigation + post list */}
        <div className="w-full max-w-xs lg:max-w-sm xl:max-w-md px-8 pt-28 pb-16 flex flex-col">
          {/* Site tagline — very small, italic */}
          <p
            className="text-[var(--muted)] italic mb-14 leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
          >
            &ldquo;In the shadow of trees, I find my voice.<br />
            Where the earth listens, and the pen replies.&rdquo;
          </p>

          <PostList posts={posts} />
        </div>

        {/* Right column — decorative botanical (desktop only) */}
        <div className="hidden lg:flex flex-1 items-center justify-center opacity-[0.07] pointer-events-none select-none">
          <BotanicalAccent className="w-64 h-80 text-[var(--charcoal)]" />
        </div>
      </main>

      <footer className="px-8 pb-8 text-[10px] tracking-widest uppercase text-[var(--muted)]">
        © clar.earth
      </footer>
    </>
  );
}
