// Mood label map — visual styling comes entirely from globals.css [data-mood] selectors.
const MOOD_CONFIG: Partial<Record<string, { label: string }>> = {
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

export default function MoodTag({ mood }: { mood?: string[] }) {
  if (!mood?.length) return null;
  const valid = mood.filter(m => MOOD_CONFIG[m]);
  if (valid.length === 0) return null;

  return (
    <span className="inline-flex flex-wrap gap-1">
      {valid.map(m => {
        const c = MOOD_CONFIG[m];
        if (!c) return null;
        return (
          <span
            key={m}
            className="mood-tag font-jost inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase"
            data-mood={m}
          >
            <span className="mood-tag-dot w-1.5 h-1.5 rounded-full flex-shrink-0" />
            {c.label}
          </span>
        );
      })}
    </span>
  );
}
