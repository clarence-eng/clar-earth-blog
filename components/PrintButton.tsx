"use client";

interface PrintButtonProps {
  title: string;
}

export default function PrintButton({ title }: PrintButtonProps) {
  const handlePrint = () => {
    const prev = document.title;
    document.title = `${title} — clar.earth`;
    const restore = () => { document.title = prev; };
    window.addEventListener("afterprint", restore, { once: true });
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--forest)] transition-colors"
      style={{ fontFamily: "var(--font-jost)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
      title="Print poem"
      aria-label="Print poem"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <polyline points="6,9 6,2 18,2 18,9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print
    </button>
  );
}
