export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 pl-6 border-l-2 border-[var(--gold)] italic text-[var(--muted)]" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem" }}>
      {children}
    </blockquote>
  );
}
