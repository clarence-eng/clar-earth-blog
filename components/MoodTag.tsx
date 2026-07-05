// Mood colour system — each mood has a palette
export const MOOD_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  longing:    { label: "Longing",    bg: "#EBF3F7", text: "#3A6A7A", border: "#B0D0DC", dot: "#7AAABB" },
  nature:     { label: "Nature",     bg: "#EAF0E8", text: "#3A6048", border: "#A8C8A0", dot: "#5A8A74" },
  grief:      { label: "Grief",      bg: "#F0EDF5", text: "#5A4A6A", border: "#C0B0D0", dot: "#7A6A8A" },
  warmth:     { label: "Warmth",     bg: "#F7F0E4", text: "#7A4A18", border: "#D8B880", dot: "#C4882A" },
  resilience: { label: "Resilience", bg: "#F2EDE8", text: "#5A3A28", border: "#C8A888", dot: "#8A6A4A" },
  defiance:   { label: "Defiance",   bg: "#F5ECEA", text: "#6A2A2A", border: "#D0A8A0", dot: "#8A4A4A" },
  love:       { label: "Love",       bg: "#F7EEF0", text: "#7A2A3A", border: "#D8A0B0", dot: "#B05C6A" },
};

export default function MoodTag({ mood }: { mood?: string }) {
  if (!mood || !MOOD_CONFIG[mood]) return null;
  const { label, bg, text, border, dot } = MOOD_CONFIG[mood];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase"
      style={{ background: bg, color: text, border: `1px solid ${border}`, fontFamily: "var(--font-jost)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
      {label}
    </span>
  );
}
