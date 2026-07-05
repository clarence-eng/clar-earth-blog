// No single ugly plant. Instead: scattered small elegant elements across the whole banner.
// Left panel: tall grasses + seed heads. Right panel: fern fronds + tiny florets.
// Centre behind quote: barely visible large delicate scatter.

export function BannerBotanicalLeft({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">

      {/* ── TALL GRASS BLADES ── */}
      {/* Each blade: thin curved line, slightly swaying */}
      <path d="M40 330 C38 280 34 240 30 190 C26 140 22 100 20 60" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
      <path d="M60 330 C58 275 55 230 54 175 C53 125 55 90 58 50" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" fill="none"/>
      <path d="M80 330 C79 285 76 245 72 200 C68 158 65 120 64 80" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
      <path d="M100 330 C99 290 97 255 95 215 C93 175 92 140 94 100" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" fill="none"/>
      <path d="M20 330 C19 295 18 265 17 230 C16 195 18 165 20 130" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none"/>
      <path d="M130 330 C129 295 127 260 124 220 C121 180 119 148 120 110" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none"/>

      {/* ── SEED HEADS on some blades ── */}
      {/* Dandelion-style: small circle + radiating fine lines */}
      <circle cx="20" cy="58" r="2.5" stroke="currentColor" strokeWidth="0.6" fill="none"/>
      <line x1="20" y1="53" x2="20" y2="47" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="24" y1="54" x2="27" y2="49" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="25" y1="58" x2="30" y2="58" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="16" y1="54" x2="13" y2="49" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="15" y1="58" x2="10" y2="58" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="16" y1="62" x2="13" y2="66" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="24" y1="62" x2="27" y2="66" stroke="currentColor" strokeWidth="0.5"/>

      {/* Seed head on second blade */}
      <circle cx="58" cy="48" r="2" stroke="currentColor" strokeWidth="0.55" fill="none"/>
      <line x1="58" y1="44" x2="58" y2="39" stroke="currentColor" strokeWidth="0.45"/>
      <line x1="61" y1="45" x2="64" y2="41" stroke="currentColor" strokeWidth="0.45"/>
      <line x1="62" y1="48" x2="67" y2="48" stroke="currentColor" strokeWidth="0.45"/>
      <line x1="55" y1="45" x2="52" y2="41" stroke="currentColor" strokeWidth="0.45"/>
      <line x1="54" y1="48" x2="49" y2="48" stroke="currentColor" strokeWidth="0.45"/>

      {/* ── SMALL WILDFLOWERS ── */}
      {/* 5-petal simple flower at top of a stem */}
      {/* Flower 1 */}
      <path d="M90 200 C90 185 88 170 86 155" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" fill="none"/>
      <circle cx="86" cy="151" r="2" stroke="currentColor" strokeWidth="0.55" fill="none"/>
      {/* petals */}
      <path d="M86 151 C84 147 82 143 83 140 C84 137 87 138 86 141" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M86 151 C90 148 94 146 96 148 C98 150 96 153 93 151" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M86 151 C88 155 88 160 86 162 C84 164 82 161 84 158" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M86 151 C82 154 78 154 76 152 C74 150 76 147 79 149" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M86 151 C83 148 81 144 83 141 C85 138 87 140 86 143" stroke="currentColor" strokeWidth="0.5" fill="none"/>

      {/* ── SMALL SCATTERED LEAVES ── small pairs along a stem */}
      <path d="M150 330 C150 305 148 280 146 255" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" fill="none"/>
      {/* leaf pairs */}
      <path d="M146 300 C140 295 135 288 137 282 C139 276 146 280 146 287" stroke="currentColor" strokeWidth="0.55" fill="none"/>
      <path d="M146 300 C152 295 157 288 155 282 C153 276 146 280 146 287" stroke="currentColor" strokeWidth="0.55" fill="none"/>
      <path d="M146 270 C141 266 137 260 139 254 C141 248 146 252 146 258" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M146 270 C151 266 155 260 153 254 C151 248 146 252 146 258" stroke="currentColor" strokeWidth="0.5" fill="none"/>

      {/* ── DOTS — seed floats ── */}
      <circle cx="45" cy="120" r="1" fill="currentColor" opacity="0.6"/>
      <circle cx="110" cy="95" r="0.8" fill="currentColor" opacity="0.5"/>
      <circle cx="70" cy="150" r="1.2" fill="currentColor" opacity="0.55"/>
      <circle cx="25" cy="175" r="0.9" fill="currentColor" opacity="0.45"/>
      <circle cx="155" cy="210" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="95" cy="250" r="0.8" fill="currentColor" opacity="0.4"/>
      <circle cx="35" cy="290" r="1.1" fill="currentColor" opacity="0.45"/>

      {/* ── FINE CROSSING STEMS at base ── */}
      <path d="M10 330 C30 310 60 295 90 285" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M50 330 C70 318 100 308 130 300" stroke="currentColor" strokeWidth="0.45" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

export function BannerBotanicalRight({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
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
        // left pinna
        const lx = x + 16 * Math.cos(rad + Math.PI);
        const ly = y + 16 * Math.sin(rad + Math.PI);
        // right pinna
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
      {/* Floret 1 */}
      <path d="M80 180 C80 168 82 158 84 148" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" fill="none"/>
      <circle cx="84" cy="145" r="1.5" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <path d="M84 145 C82 141 80 137 82 134 C84 131 87 133 84 136" stroke="currentColor" strokeWidth="0.45" fill="none"/>
      <path d="M84 145 C87 142 91 140 93 142 C95 144 93 147 90 145" stroke="currentColor" strokeWidth="0.45" fill="none"/>
      <path d="M84 145 C81 142 77 141 76 143 C75 145 77 148 80 146" stroke="currentColor" strokeWidth="0.45" fill="none"/>

      {/* Floret 2 — smaller, higher */}
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

export function BannerBotanicalCenter({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  // Very faint, large, scattered — goes behind the quote text
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      {/* Graceful arching stems */}
      <path d="M80 300 C90 240 110 190 140 145 C170 100 200 70 220 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M320 300 C310 240 290 190 260 145 C230 100 200 70 180 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Cross-stem */}
      <path d="M60 200 C120 180 200 170 280 175 C340 178 380 185 400 195" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none"/>
      {/* Small leaves along arches */}
      <path d="M140 145 C130 135 122 122 128 115 C134 108 142 116 138 126" stroke="currentColor" strokeWidth="0.7" fill="none"/>
      <path d="M260 145 C270 135 278 122 272 115 C266 108 258 116 262 126" stroke="currentColor" strokeWidth="0.7" fill="none"/>
      <path d="M165 108 C157 99 152 87 158 80 C164 73 172 80 168 90" stroke="currentColor" strokeWidth="0.65" fill="none"/>
      <path d="M235 108 C243 99 248 87 242 80 C236 73 228 80 232 90" stroke="currentColor" strokeWidth="0.65" fill="none"/>
      {/* Scattered dots */}
      <circle cx="110" cy="170" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="290" cy="168" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="195" cy="55" r="1.8" fill="currentColor" opacity="0.75"/>
      <circle cx="175" cy="80" r="1" fill="currentColor" opacity="0.6"/>
      <circle cx="225" cy="80" r="1" fill="currentColor" opacity="0.6"/>
      <circle cx="150" cy="180" r="1.2" fill="currentColor" opacity="0.55"/>
      <circle cx="250" cy="178" r="1.2" fill="currentColor" opacity="0.55"/>
    </svg>
  );
}
