// Mood colour system — each mood has a palette
export const MOOD_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; dot: string; darkBg: string; darkText: string; darkBorder: string; darkDot: string }> = {
  longing:    { label: "Longing",    bg: "#EBF3F7", text: "#3A6A7A", border: "#B0D0DC", dot: "#7AAABB", darkBg: "#1A2E36", darkText: "#7AAABB", darkBorder: "#2A4A5A", darkDot: "#7AAABB" },
  nature:     { label: "Nature",     bg: "#EAF0E8", text: "#3A6048", border: "#A8C8A0", dot: "#5A8A74", darkBg: "#1A2E20", darkText: "#5A8A74", darkBorder: "#2A4A30", darkDot: "#5A8A74" },
  grief:      { label: "Grief",      bg: "#F0EDF5", text: "#5A4A6A", border: "#C0B0D0", dot: "#7A6A8A", darkBg: "#201A2E", darkText: "#A899B8", darkBorder: "#3A2A4A", darkDot: "#7A6A8A" },
  warmth:     { label: "Warmth",     bg: "#F7F0E4", text: "#7A4A18", border: "#D8B880", dot: "#C4882A", darkBg: "#2E1E08", darkText: "#C4882A", darkBorder: "#4A3010", darkDot: "#C4882A" },
  resilience: { label: "Resilience", bg: "#F2EDE8", text: "#5A3A28", border: "#C8A888", dot: "#8A6A4A", darkBg: "#281808", darkText: "#C4A888", darkBorder: "#3A2A18", darkDot: "#8A6A4A" },
  defiance:   { label: "Defiance",   bg: "#F5ECEA", text: "#6A2A2A", border: "#D0A8A0", dot: "#8A4A4A", darkBg: "#2A1010", darkText: "#C48080", darkBorder: "#4A1A1A", darkDot: "#8A4A4A" },
  love:       { label: "Love",       bg: "#F7EEF0", text: "#7A2A3A", border: "#D8A0B0", dot: "#B05C6A", darkBg: "#2A0E18", darkText: "#D4899A", darkBorder: "#4A1A28", darkDot: "#B05C6A" },
};

export default function MoodTag({ mood }: { mood?: string | string[] }) {
  if (!mood) return null;
  const moods = Array.isArray(mood) ? mood : [mood];
  const valid = moods.filter(m => MOOD_CONFIG[m]);
  if (valid.length === 0) return null;

  return (
    <span className="inline-flex flex-wrap gap-1">
      {valid.map(m => {
        const c = MOOD_CONFIG[m];
        return (
          <span
            key={m}
            className="mood-tag inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase"
            data-mood={m}
            style={{ fontFamily: "var(--font-jost)" }}
          >
            <span className="mood-tag-dot w-1.5 h-1.5 rounded-full flex-shrink-0" />
            {c.label}
          </span>
        );
      })}
    </span>
  );
}
