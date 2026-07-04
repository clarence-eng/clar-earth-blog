export default function BotanicalDivider() {
  return (
    <div className="my-12 flex items-center justify-center gap-4 text-[var(--sage)] opacity-50">
      <span className="h-px w-16 bg-[var(--border)]" />
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 22 C12 18 10 14 8 12 C6 10 4 9 4 6 C4 3 7 2 10 4 C11 5 12 6 12 8 C12 6 13 5 14 4 C17 2 20 3 20 6 C20 9 18 10 16 12 C14 14 12 18 12 22Z" />
      </svg>
      <span className="h-px w-16 bg-[var(--border)]" />
    </div>
  );
}
