// Leaf path helper — creates a proper pointed-tip leaf shape
// cx, cy = center, rx = half-width, ry = half-height, angle = rotation in degrees
function leaf(cx: number, cy: number, rx: number, ry: number, angle: number, vein = true) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  // Local coords: top tip (0,-ry), bottom tip (0,ry), widest at (±rx, 0)
  // Control points at (±rx*1.1, ±ry*0.15) for natural leaf curve
  const pt = (lx: number, ly: number) => `${cx + lx * cos - ly * sin},${cy + lx * sin + ly * cos}`;
  const d = [
    `M ${pt(0, -ry)}`,
    `C ${pt(rx * 1.1, -ry * 0.35)} ${pt(rx * 1.1, ry * 0.35)} ${pt(0, ry)}`,
    `C ${pt(-rx * 1.1, ry * 0.35)} ${pt(-rx * 1.1, -ry * 0.35)} ${pt(0, -ry)}`,
    `Z`,
  ].join(" ");
  const vd = vein ? `M ${pt(0, -ry)} L ${pt(0, ry)}` : null;
  return { d, vd };
}

export default function BotanicalAccent({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const leaves = [
    // [cx, cy, rx, ry, angle]
    // Left side — 4 leaves
    { cx: 14, cy: 100, rx: 6, ry: 18, a: -15 },
    { cx: 12, cy: 72,  rx: 5.5, ry: 16, a: -12 },
    { cx: 19, cy: 46,  rx: 5, ry: 14, a: -8 },
    { cx: 27, cy: 24,  rx: 4, ry: 11, a: -5 },
    // Right side — 4 leaves (mirror)
    { cx: 106, cy: 90,  rx: 6, ry: 18, a: 15 },
    { cx: 108, cy: 63,  rx: 5.5, ry: 16, a: 12 },
    { cx: 101, cy: 38,  rx: 5, ry: 14, a: 8 },
    { cx: 93,  cy: 18,  rx: 4, ry: 11, a: 5 },
  ];

  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M60 196 C60 174 57 148 54 124 C51 100 50 78 53 56 C56 36 60 18 60 4"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"
      />

      {/* Branches and leaves */}
      {/* L1 */}
      <path d="M56 122 C44 118 30 115 16 114" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      {/* L2 */}
      <path d="M54 92 C42 88 28 85 14 85" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* L3 */}
      <path d="M57 62 C47 57 35 54 22 54" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
      {/* L4 */}
      <path d="M58 36 C51 31 41 28 29 28" stroke="currentColor" strokeWidth="0.82" strokeLinecap="round" fill="none"/>
      {/* R1 */}
      <path d="M57 108 C70 104 84 101 98 100" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      {/* R2 */}
      <path d="M56 80 C69 76 83 73 97 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* R3 */}
      <path d="M58 52 C69 47 81 44 92 43" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
      {/* R4 */}
      <path d="M59 28 C67 23 77 20 87 21" stroke="currentColor" strokeWidth="0.82" strokeLinecap="round" fill="none"/>

      {/* Leaf shapes */}
      {leaves.map(({ cx, cy, rx, ry, a }, i) => {
        const { d, vd } = leaf(cx, cy, rx, ry, a);
        const opacity = i < 2 || i === 4 || i === 5 ? 1 : i < 4 || i > 5 ? 0.92 : 0.85;
        return (
          <g key={i}>
            <path d={d} stroke="currentColor" strokeWidth="0.95" fill="none" opacity={opacity} />
            {vd && <path d={vd} stroke="currentColor" strokeWidth="0.38" fill="none" opacity={0.4} />}
          </g>
        );
      })}

      {/* Apex bud */}
      <path
        d={leaf(60, -4, 4, 10, 0).d}
        stroke="currentColor" strokeWidth="0.88" fill="none"
      />
      <circle cx="60" cy="4" r="2" fill="currentColor" opacity="0.7" />

      {/* Junction dots */}
      <circle cx="16" cy="114" r="1.3" fill="currentColor" opacity="0.55"/>
      <circle cx="98" cy="100" r="1.3" fill="currentColor" opacity="0.55"/>
      <circle cx="14" cy="85" r="1.1" fill="currentColor" opacity="0.45"/>
      <circle cx="97" cy="73" r="1.1" fill="currentColor" opacity="0.45"/>
    </svg>
  );
}
