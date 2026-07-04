export default function Stanza({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-8 last:mb-0 whitespace-pre-line leading-[1.95]" style={{ fontFamily: "var(--font-cormorant)" }}>
      {children}
    </p>
  );
}
