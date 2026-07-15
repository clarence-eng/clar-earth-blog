import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Page not found — clar.earth",
};

export default function NotFound() {
  const posts = getAllPosts();
  return (
    <>
      <Nav posts={posts} />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <p className="font-jost text-[9px] tracking-[0.35em] uppercase text-[var(--muted)] mb-6">404</p>
        <h1 className="cormorant-italic text-[var(--forest)] mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.2 }}>
          Nothing grows here.
        </h1>
        <p className="cormorant-serif text-[var(--muted)] mb-10" style={{ fontSize: "1.05rem", maxWidth: 340 }}>
          The page you&rsquo;re looking for has wandered off into the undergrowth.
        </p>
        <Link
          href="/"
          className="font-jost text-[10px] tracking-[0.3em] uppercase text-[var(--forest)] border border-[var(--sage)] px-6 py-3 rounded-sm hover:bg-[var(--cream-dark)] transition-colors duration-300"
        >
          Return to all works
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
