import type { CSSProperties } from 'react';

export function BannerBotanicalRight({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">

      {/* ── FERN FRONDS ── */}
      {/* Main arching frond stem */}
      <path d="M160 330 C162 285 166 245 170 200 C174 158 178 120 180 80 C181 55 178 35 175 15"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>

      {/* Fern pinnae — small paired leaflets along the stem */}
      {[
        [170, 198, -30], [171, 185, -28], [172, 172, -26],
        [174, 160, -24], [175, 148, -22], [176, 136, -20],
        [177, 124, -18], [178, 113, -16], [179, 102, -14],
      ].map(([x, y, angle], i) => {
        const rad = (angle * Math.PI) / 180;
        const lx = x + 16 * Math.cos(rad + Math.PI);
        const ly = y + 16 * Math.sin(rad + Math.PI);
        const rx = x + 16 * Math.cos(rad);
        const ry = y + 16 * Math.sin(rad);
        return (
          <g key={i}>
            <path d={`M${x},${y} Q${(x + lx) / 2 - 3},${(y + ly) / 2 - 3} ${lx},${ly}`}
              stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" fill="none" opacity="0.8"/>
            <path d={`M${x},${y} Q${(x + rx) / 2 + 3},${(y + ry) / 2 - 3} ${rx},${ry}`}
              stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" fill="none" opacity="0.8"/>
          </g>
        );
      })}

      {/* ── SECOND thinner FROND ── */}
      <path d="M120 330 C122 295 126 265 130 230 C134 195 138 165 140 130"
        stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" fill="none"/>
      {[
        [130, 228, -35], [131, 216, -33], [132, 204, -31],
        [134, 192, -28], [135, 180, -26], [136, 168, -24],
        [137, 156, -22], [138, 145, -19],
      ].map(([x, y, angle], i) => {
        const rad = (angle * Math.PI) / 180;
        const lx = x + 13 * Math.cos(rad + Math.PI);
        const ly = y + 13 * Math.sin(rad + Math.PI);
        const rx = x + 13 * Math.cos(rad);
        const ry = y + 13 * Math.sin(rad);
        return (
          <g key={i}>
            <path d={`M${x},${y} Q${(x + lx) / 2 - 2},${(y + ly) / 2 - 2} ${lx},${ly}`}
              stroke="currentColor" strokeWidth="0.45" strokeLinecap="round" fill="none" opacity="0.7"/>
            <path d={`M${x},${y} Q${(x + rx) / 2 + 2},${(y + ry) / 2 - 2} ${rx},${ry}`}
              stroke="currentColor" strokeWidth="0.45" strokeLinecap="round" fill="none" opacity="0.7"/>
          </g>
        );
      })}

      {/* ── SMALL FLORETS ── three-petal simple flowers */}
      <path d="M80 180 C80 168 82 158 84 148" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" fill="none"/>
      <circle cx="84" cy="145" r="1.5" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M84 145 C82 141 80 137 82 134 C84 131 87 133 84 136" stroke="currentColor" strokeWidth="0.45" fill="none"/>
      <path d="M84 145 C87 142 91 140 93 142 C95 144 93 147 90 145" stroke="currentColor" strokeWidth="0.45" fill="none"/>
      <path d="M84 145 C81 142 77 141 76 143 C75 145 77 148 80 146" stroke="currentColor" strokeWidth="0.45" fill="none"/>

      <path d="M50 230 C51 220 52 212 54 204" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none"/>
      <circle cx="54" cy="201" r="1.2" stroke="currentColor" strokeWidth="0.45" fill="none"/>
      <path d="M54 201 C52 198 51 194 53 192 C55 190 57 192 54 194" stroke="currentColor" strokeWidth="0.4" fill="none"/>
      <path d="M54 201 C57 198 60 197 61 199 C62 201 60 204 57 202" stroke="currentColor" strokeWidth="0.4" fill="none"/>
      <path d="M54 201 C51 198 48 198 47 200 C46 202 48 205 51 203" stroke="currentColor" strokeWidth="0.4" fill="none"/>

      {/* ── SCATTERED DOTS ── */}
      <circle cx="100" cy="100" r="1.1" fill="currentColor" opacity="0.55"/>
      <circle cx="65" cy="140" r="0.9" fill="currentColor" opacity="0.5"/>
      <circle cx="145" cy="90" r="0.8" fill="currentColor" opacity="0.45"/>
      <circle cx="40" cy="270" r="1" fill="currentColor" opacity="0.45"/>
      <circle cx="115" cy="200" r="0.8" fill="currentColor" opacity="0.4"/>
      <circle cx="75" cy="310" r="1.2" fill="currentColor" opacity="0.45"/>
      <circle cx="170" cy="280" r="0.9" fill="currentColor" opacity="0.4"/>

      {/* ── FINE BASE STEMS ── */}
      <path d="M190 330 C170 315 140 305 110 298" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M150 330 C130 320 105 312 80 308" stroke="currentColor" strokeWidth="0.45" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}
