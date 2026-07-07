// Mood colour system — each mood has a palette.
// bg/text/border/dot are used at runtime by MoodTag and cursor.
// dark* values are documented here as single source of truth matching globals.css dark-mode rules.
const MOOD_CONFIG: Record<string, { label: string }> = {
  longing:    { label: "Longing" },
  nature:     { label: "Nature" },
  warmth:     { label: "Warmth" },
  love:       { label: "Love" },
  nostalgia:  { label: "Nostalgia" },
  melancholy: { label: "Melancholy" },
  protest:    { label: "Protest" },
  solidarity: { label: "Solidarity" },
  reverence:  { label: "Reverence" },
  bitterness: { label: "Bitterness" },
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
