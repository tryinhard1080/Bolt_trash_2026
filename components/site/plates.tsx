/* Hand-drawn SVG plates — the diagrammatic backbone of the field guide.
   Every plate is line art in currentColor with monospace annotations, so it
   inherits the ink palette and reads correctly on both paper and night surfaces.
   Canvas is 520 × 320; annotations stay inside a 24px margin. */

type Coord = number | string;
type PlateProps = { className?: string; label?: string };

const INK = 'currentColor';
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SERIF = "'Source Serif 4', Georgia, serif";
const LIME = '#c7e02a';
const BLUE = '#3f78ac';
const RUST = '#a8492a';
const MUTED = '#7b8781';

function Frame({
  children,
  className,
  label,
  viewBox = '0 0 520 320',
}: PlateProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={`h-auto w-full text-ink ${className}`}
      role="img"
      aria-label={label}
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="0.5" y="0.5" width="519" height="319" stroke={INK} strokeOpacity="0.16" />
      {children}
    </svg>
  );
}

function Tag({
  x,
  y,
  children,
  tone = 'muted',
  anchor = 'start',
  size = 8.5,
}: {
  x: Coord;
  y: Coord;
  children: React.ReactNode;
  tone?: 'muted' | 'ink' | 'lime' | 'blue' | 'rust';
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
}) {
  const fill = tone === 'muted' ? MUTED : tone === 'lime' ? LIME : tone === 'blue' ? BLUE : tone === 'rust' ? RUST : INK;
  return (
    <text x={x} y={y} fill={fill} fontSize={size} fontFamily={MONO} textAnchor={anchor} letterSpacing="0.06em" stroke="none">
      {children}
    </text>
  );
}

function Dim({ x1, y1, x2, y2, text }: { x1: Coord; y1: Coord; x2: Coord; y2: Coord; text: string }) {
  const [X1, Y1, X2, Y2] = [x1, y1, x2, y2].map(Number);
  const mx = (X1 + X2) / 2;
  const my = (Y1 + Y2) / 2;
  const vertical = X1 === X2;
  return (
    <g stroke={INK} strokeOpacity="0.6">
      <line x1={X1} y1={Y1} x2={X2} y2={Y2} />
      <line x1={vertical ? X1 - 4 : X1} y1={vertical ? Y1 : Y1 - 4} x2={vertical ? X1 + 4 : X1} y2={vertical ? Y1 : Y1 + 4} />
      <line x1={vertical ? X1 - 4 : X2} y1={vertical ? Y2 : Y2 - 4} x2={vertical ? X1 + 4 : X2} y2={vertical ? Y2 : Y2 + 4} />
      <Tag x={mx + (vertical ? 7 : 0)} y={my + (vertical ? 0 : -7)} tone="blue" anchor={vertical ? 'start' : 'middle'}>
        {text}
      </Tag>
    </g>
  );
}

function PlateHeader({ left, right }: { left: string; right?: string }) {
  return (
    <g>
      <Tag x="24" y="30" tone="ink" size={9}>
        {left}
      </Tag>
      {right ? (
        <Tag x="496" y="30" anchor="end">
          {right}
        </Tag>
      ) : null}
      <line x1="24" y1="38" x2="496" y2="38" stroke={INK} strokeOpacity="0.18" />
    </g>
  );
}

/* ——— A · multifamily chute, compactor room and curbside set-out ——— */
export function PlateChute({ className, label = 'Cross-section of a multifamily chute, compactor room and curbside set-out' }: PlateProps) {
  return (
    <Frame className={className} label={label}>
      <PlateHeader left="COLLECTION ACCESS · SECTION" right="A-01" />
      {/* building */}
      <g stroke={INK}>
        <rect x="40" y="52" width="150" height="196" strokeOpacity="0.85" />
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1="40" y1={52 + 39 * (i + 1)} x2="190" y2={52 + 39 * (i + 1)} strokeOpacity="0.3" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={i}>
            <rect x="126" y={66 + i * 39} width="26" height="12" strokeOpacity="0.75" />
            <path d={`M132 ${78 + i * 39} l6 8 l6 -8`} strokeOpacity="0.5" />
          </g>
        ))}
      </g>
      {/* chute */}
      <g stroke={INK}>
        <line x1="139" y1="58" x2="139" y2="248" strokeOpacity="0.9" strokeWidth="1.4" />
        <line x1="145" y1="58" x2="145" y2="248" strokeOpacity="0.3" strokeDasharray="3 3" />
      </g>
      {/* compactor room */}
      <g stroke={INK}>
        <rect x="98" y="248" width="112" height="42" strokeOpacity="0.8" />
        <path d="M106 262 h46 v18 h-46 z" strokeOpacity="0.45" />
        <circle cx="113" cy="283" r="3" strokeOpacity="0.45" />
        <circle cx="145" cy="283" r="3" strokeOpacity="0.45" />
      </g>
      <Tag x="24" y="266" tone="muted" size={7.5}>COMPACTOR</Tag>
      <Tag x="24" y="277" tone="muted" size={7.5}>ROOM</Tag>
      <line x1="86" y1="268" x2="98" y2="262" stroke={INK} strokeOpacity="0.35" strokeDasharray="3 3" />
      {/* ground */}
      <line x1="24" y1="290" x2="496" y2="290" stroke={INK} strokeOpacity="0.55" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1={30 + i * 20} y1="290" x2={24 + i * 20} y2="297" stroke={INK} strokeOpacity="0.22" />
      ))}
      {/* carts + truck */}
      <g stroke={INK}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${238 + i * 40} 254)`}>
            <path d="M0 34 v-24 a3 3 0 0 1 3 -3 h22 a3 3 0 0 1 3 3 v24" strokeOpacity="0.85" />
            <path d="M-2 8 h30" strokeOpacity="0.85" />
            <circle cx="6" cy="36" r="3" strokeOpacity="0.55" />
            <circle cx="22" cy="36" r="3" strokeOpacity="0.55" />
          </g>
        ))}
        <g transform="translate(368 214)">
          <path d="M6 74 v-36 h92 v36" strokeOpacity="0.85" />
          <path d="M98 56 h24 l14 18 h-38 z" strokeOpacity="0.85" />
          <path d="M106 60 h13 l8 12 h-21 z" strokeOpacity="0.35" />
          <circle cx="28" cy="78" r="8" strokeOpacity="0.75" />
          <circle cx="114" cy="78" r="8" strokeOpacity="0.75" />
          <path d="M6 38 q32 -24 58 -24" strokeOpacity="0.7" />
          <path d="M58 12 l15 4 l-4 15" strokeOpacity="0.7" />
        </g>
      </g>
      {/* flow arrows */}
      <g stroke={LIME} strokeWidth="1.6">
        <path d="M142 84 v154" strokeDasharray="7 6" />
        <path d="M134 232 l8 12 l8 -12" />
        <path d="M212 272 h20" strokeDasharray="7 6" />
        <path d="M226 266 l10 6 l-10 6" />
      </g>
      {/* overhead hazard note */}
      <g stroke={INK} strokeOpacity="0.4" strokeDasharray="4 4">
        <path d="M300 96 q60 -18 120 8" />
      </g>
      <line x1="300" y1="96" x2="300" y2="120" stroke={INK} strokeOpacity="0.3" strokeDasharray="3 3" />
      <Tag x="300" y="86" tone="rust">OVERHEAD WIRES AND BRANCHES</Tag>
      <Tag x="300" y="128" tone="muted">LOW CLEARANCE ENDS THE LIFT</Tag>
      <Dim x1="196" y1="238" x2="238" y2="238" text="3 ft" />
      <Dim x1="200" y1="196" x2="356" y2="196" text="aisle 12 ft" />
      <Tag x="238" y="246" tone="ink" size={7.5}>SET-OUT LINE</Tag>
      <Tag x="496" y="204" tone="ink" size={7.5} anchor="end">SIDE LOADER · 1.9 m ARM</Tag>
      <Tag x="24" y="312" tone="muted">FIG. A-01 · ONE HOPPER PER 3–5 UNITS</Tag>
    </Frame>
  );
}

/* ——— B · recognition grid ——— */
export function PlateRecognition({ className, label = 'Six standard material streams drawn as recognisable silhouettes' }: PlateProps) {
  const tiles = [
    { name: 'FIBER', note: 'dry, torn, flat', share: '23.1% of MSW', art: <g><path d="M-14 7 h27 v-17 h-27 z" /><path d="M-9 1 h17 M-9 -4 h17" strokeOpacity="0.45" /></g> },
    { name: 'CONTAINERS', note: 'rigid, rinsed', share: '12.2% of MSW', art: <g><path d="M-8 8 v-13 q0 -4 4 -5 v-5 h7 v5 q4 1 4 5 v13 z" /><path d="M-8 1 h15" strokeOpacity="0.45" /></g> },
    { name: 'METALS', note: 'magnet test', share: '8.8% of MSW', art: <g><path d="M-9 8 v-15 h18 v15 z" /><ellipse cx="0" cy="-7" rx="9" ry="3" /><path d="M-9 -1 h18" strokeOpacity="0.35" /></g> },
    { name: 'GLASS', note: 'bottles, jars', share: '4.2% of MSW', art: <g><path d="M-8 8 v-10 h16 v10 z" /><path d="M-4 -2 v-6 h8 v6" /><path d="M-8 3 h16" strokeOpacity="0.35" /></g> },
    { name: 'ORGANICS', note: 'loose, unbagged', share: '33.7% of MSW', art: <g><path d="M0 8 q-13 -5 -7 -15 q11 -5 13 3 q2 8 -6 12 z" /><path d="M0 8 q-2 -9 5 -13" strokeOpacity="0.5" /></g> },
    { name: 'SPECIAL', note: 'depot only', share: '5.8% of MSW', art: <g><path d="M-10 -7 h20 v15 h-20 z" /><path d="M-5 -7 v-5 M5 -7 v-5" strokeOpacity="0.6" /><path d="M-3 1 h6" strokeOpacity="0.45" /></g> },
  ];
  return (
    <Frame className={className} label={label}>
      <PlateHeader left="MATERIAL CATEGORIES · RECOGNITION KEY" right="B-02" />
      {tiles.map((t, i) => {
        const x = 40 + (i % 3) * 150;
        const y = i < 3 ? 54 : 186;
        return (
          <g key={t.name} transform={`translate(${x} ${y})`}>
            <rect width="136" height="96" stroke={INK} strokeOpacity="0.22" />
            <path d="M0 0 h12 M0 0 v12" stroke={LIME} strokeWidth="2" opacity={i === 0 ? 0.9 : 0.25} />
            <Tag x="128" y="14" anchor="end">{`0${i + 1}`}</Tag>
            <g transform="translate(28 50)" stroke={INK} strokeWidth="1.2">
              {t.art}
            </g>
            <text x="58" y="46" fill={INK} fontSize="9" fontFamily={MONO} stroke="none" letterSpacing="0.06em">
              {t.name}
            </text>
            <line x1="58" y1="54" x2="124" y2="54" stroke={INK} strokeOpacity="0.22" />
            <Tag x="58" y="66">{t.note}</Tag>
            <Tag x="58" y="82" tone="blue">{t.share}</Tag>
            <line x1="58" y1="86" x2="104" y2="86" stroke={LIME} strokeWidth="2" opacity="0.8" />
          </g>
        );
      })}
      <Tag x="24" y="312" tone="muted">FIG. B-02 · RIGID VERSUS FILM SETTLES MOST PLASTIC QUESTIONS</Tag>
    </Frame>
  );
}

/* ——— C · site-walk route ——— */
export function PlateWalk({ className, label = 'Plan view of a waste enclosure with a numbered walking route' }: PlateProps) {
  const stops = [
    { x: 96, y: 128, n: 1 },
    { x: 260, y: 86, n: 2 },
    { x: 356, y: 206, n: 3 },
    { x: 176, y: 246, n: 4 },
  ];
  return (
    <Frame className={className} label={label}>
      <PlateHeader left="SITE WALK · PLAN" right="C-01" />
      <g stroke={INK}>
        <rect x="120" y="72" width="290" height="180" strokeOpacity="0.45" />
        <path d="M120 160 h-46 M74 160 v92" strokeOpacity="0.3" strokeDasharray="4 4" />
        <path d="M120 106 a54 54 0 0 1 0 108" strokeOpacity="0.35" strokeDasharray="3 4" />
        <line x1="120" y1="106" x2="120" y2="214" strokeOpacity="0.8" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${168 + i * 60} 128)`}>
            <rect width="42" height="30" strokeOpacity="0.7" />
            <path d="M0 9 h42" strokeOpacity="0.35" />
            <circle cx="10" cy="34" r="4" strokeOpacity="0.45" />
            <circle cx="32" cy="34" r="4" strokeOpacity="0.45" />
          </g>
        ))}
        <g strokeOpacity="0.45">
          <path d="M300 200 l8 6 M314 194 l6 10 M288 208 l10 2" />
        </g>
      </g>
      <g stroke={LIME} strokeWidth="1.8" strokeDasharray="9 7">
        <path d="M96 128 C 150 92, 220 66, 260 86 C 320 110, 356 160, 356 206 C 340 250, 250 268, 176 246 C 140 234, 110 192, 96 128" />
      </g>
      {stops.map((s) => (
        <g key={s.n}>
          <circle cx={s.x} cy={s.y} r="12" fill="hsl(var(--background))" stroke={INK} strokeWidth="1.1" />
          <text x={s.x} y={s.y + 3.5} textAnchor="middle" fontSize="10" fontFamily={MONO} fill={INK} stroke="none">
            {s.n}
          </text>
        </g>
      ))}
      <Tag x="24" y="58" tone="ink">1 · OUTSIDE FIRST</Tag>
      <Tag x="300" y="58" tone="ink">2 · LIDS CLOSED / SEEN</Tag>
      <Tag x="496" y="200" tone="ink" anchor="end">3 · SPILLAGE LINE</Tag>
      <Tag x="30" y="150">GATE</Tag>
      <line x1="52" y1="155" x2="116" y2="164" stroke={INK} strokeOpacity="0.35" strokeDasharray="3 3" />
      <Dim x1="120" y1="272" x2="410" y2="272" text="" />
      <Tag x="150" y="288" tone="ink">4 · FIXED VANTAGE PHOTO</Tag>
      <Tag x="24" y="312" tone="muted">FIG. C-01 · 3 FT PERIMETER, WALKED ONCE, ONE OBSERVER</Tag>
    </Frame>
  );
}

/* ——— D · transfer station weigh sequence ——— */
export function PlateScale({ className, label = 'Transfer station scale house with gross, tare and ticket fields' }: PlateProps) {
  return (
    <Frame className={className} label={label}>
      <PlateHeader left="WEIGH SEQUENCE · TRANSFER STATION" right="D-01" />
      {/* facility */}
      <g stroke={INK}>
        <path d="M40 96 h170 v90 h-170 z" strokeOpacity="0.55" />
        <path d="M40 96 l38 -26 h170 l-38 26" strokeOpacity="0.35" />
        <path d="M210 96 l38 -26 v90 l-38 26" strokeOpacity="0.45" />
        <path d="M62 118 h56 v32 h-56 z" strokeOpacity="0.4" />
        <path d="M146 120 h50 v28 h-50 z" strokeOpacity="0.3" strokeDasharray="3 3" />
      </g>
      <Tag x="62" y="170" tone="muted">TIP FLOOR</Tag>
      <Tag x="146" y="170" tone="muted">SCREEN</Tag>
      {/* road + pad */}
      <g stroke={INK}>
        <path d="M24 222 h472 M24 240 h472" strokeOpacity="0.5" />
        <rect x="232" y="212" width="140" height="38" strokeOpacity="0.8" />
        <path d="M232 212 v38 M372 212 v38" strokeOpacity="0.8" />
        <g transform="translate(258 196)">
          <path d="M0 22 v-18 h58 v18" strokeOpacity="0.85" />
          <path d="M58 10 h18 l12 12 h-30 z" strokeOpacity="0.85" />
          <circle cx="12" cy="24" r="6" strokeOpacity="0.7" />
          <circle cx="66" cy="24" r="6" strokeOpacity="0.7" />
        </g>
      </g>
      <g stroke={LIME} strokeWidth="1.6">
        <path d="M268 188 v-18" strokeDasharray="6 5" />
        <path d="M262 180 l6 10 l6 -10" />
      </g>
      <Tag x="380" y="200" tone="ink">SCALE PAD · 60 FT</Tag>
      <Dim x1="232" y1="270" x2="372" y2="270" text="gross - tare = net" />
      {/* ticket */}
      <g transform="translate(382 74)">
        <rect width="114" height="86" stroke={INK} strokeOpacity="0.65" />
        <path d="M0 22 h114" stroke={INK} strokeOpacity="0.35" />
        <text x="8" y="15" fontSize="8" fontFamily={MONO} fill={INK} stroke="none" letterSpacing="0.06em">
          TARE / GROSS
        </text>
        {['LOAD 0184', 'GROSS 31,420', 'TARE 12,110', 'NET 19,310'].map((line, i) => (
          <g key={line}>
            <text x="8" y={38 + i * 14} fontSize="8" fontFamily={MONO} fill={i === 3 ? BLUE : MUTED} stroke="none">
              {line}
            </text>
            <line x1="8" y1={43 + i * 14} x2="106" y2={43 + i * 14} stroke={INK} strokeOpacity="0.1" />
          </g>
        ))}
      </g>
      <g stroke={INK}>
        <path d="M304 144 v-20 l16 -10 l16 10 v20 z" strokeOpacity="0.5" />
        <path d="M314 144 v-12 h12 v12" strokeOpacity="0.35" />
      </g>
      <Tag x="294" y="158">SCALE HOUSE</Tag>
      <g stroke={INK} strokeOpacity="0.4" strokeDasharray="4 4">
        <path d="M382 150 C 372 150, 358 144, 344 141" />
      </g>
      <Tag x="40" y="206" tone="muted">1 IN · 2 TIP · 3 OUT</Tag>
      <Tag x="40" y="218" tone="ink">TICKET SEQUENCE IS THE AUDIT</Tag>
      <Tag x="24" y="312" tone="muted">FIG. D-01 · ONE TICKET PER LOAD, RETAINED 18 MONTHS</Tag>
    </Frame>
  );
}

/* ——— E · the one-way grammar of a route ——— */
export function PlateFlow({ className, label = 'Journey of a curbside load from set-out to end market' }: PlateProps) {
  const nodes = [
    { x: 44, label: 'SET-OUT', sub: 'cart' },
    { x: 148, label: 'COLLECTION', sub: 'truck' },
    { x: 252, label: 'TRANSFER', sub: 'station' },
    { x: 356, label: 'MRF', sub: 'sort & bale' },
    { x: 460, label: 'MARKET', sub: 'mill' },
  ];
  return (
    <Frame className={className} label={label}>
      <PlateHeader left="ONE LOAD, FIVE RECORDS" right="A-03" />
      {/* residual return */}
      <path d="M252 118 C 300 46, 404 46, 452 118" stroke={INK} strokeOpacity="0.4" strokeDasharray="5 5" />
      <Tag x="352" y="52" tone="rust" anchor="middle">RESIDUAL → LANDFILL</Tag>
      <text x="352" y="64" textAnchor="middle" fontSize="7" fontFamily={MONO} fill={MUTED} stroke="none">
        rejected loads re-enter here, never at the curb
      </text>
      <line x1="24" y1="176" x2="496" y2="176" stroke={INK} strokeOpacity="0.18" />
      {nodes.map((n, i) => (
        <g key={n.label}>
          {i < nodes.length - 1 ? (
            <g>
              <line x1={n.x + 26} y1="146" x2={nodes[i + 1].x - 32} y2="146" stroke={LIME} strokeWidth="1.7" strokeDasharray="8 6" />
              <path d={`M${nodes[i + 1].x - 38} 140 l8 6 l-8 6`} stroke={LIME} strokeWidth="1.7" />
            </g>
          ) : null}
          <circle cx={n.x} cy="146" r="22" fill="hsl(var(--background))" stroke={INK} strokeOpacity="0.85" />
          <circle cx={n.x} cy="146" r="27" stroke={INK} strokeOpacity="0.16" strokeDasharray="2 4" />
          <text x={n.x} y="149" textAnchor="middle" fontSize="8" fontFamily={MONO} fill={INK} stroke="none">
            {`0${i + 1}`}
          </text>
          <text x={n.x} y="196" textAnchor="middle" fontSize="8.5" fontFamily={MONO} fill={INK} stroke="none" letterSpacing="0.08em">
            {n.label}
          </text>
          <text x={n.x} y="208" textAnchor="middle" fontSize="7" fontFamily={MONO} fill={MUTED} stroke="none">
            {n.sub}
          </text>
        </g>
      ))}
      <g stroke={INK} strokeOpacity="0.28">
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={i} x1={24 + i * 19.6} y1="248" x2={24 + i * 19.6} y2={i % 4 === 0 ? 240 : 244} />
        ))}
      </g>
      <text x="24" y="268" fontSize="7.5" fontFamily={MONO} fill={MUTED} stroke="none">
        TIME → each hop is a new record you can ask for
      </text>
      <Tag x="24" y="312" tone="muted">FIG. A-03 · A LOAD IS ONLY EVER AS GOOD AS ITS PAPERWORK</Tag>
    </Frame>
  );
}

/* ——— F · end markets ——— */
export function PlateMarket({ className, label = 'Bale grades and the market chain from mill to remanufacture' }: PlateProps) {
  return (
    <Frame className={className} label={label}>
      <PlateHeader left="END MARKET CHAIN" right="E-01" />
      {/* bale */}
      <g stroke={INK} transform="translate(52 62)">
        <rect width="98" height="64" strokeOpacity="0.85" />
        <path d="M0 21 h98 M0 43 h98" strokeOpacity="0.22" />
        <path d="M33 0 v64 M65 0 v64" strokeOpacity="0.22" />
        <path d="M-8 10 h114 M-8 54 h114" strokeOpacity="0.6" />
        <Tag x="0" y="-14" tone="ink">BALE · OCC #11</Tag>
        <Tag x="0" y="78">~1 TON, STRAPPED, GRADED</Tag>
      </g>
      {/* grades */}
      <g transform="translate(204 62)">
        {['OCC #11', 'MIXED PAPER', 'OLD CORRUGATED', 'KOTAC'].map((g, i) => (
          <g key={g}>
            <rect y={i * 28} width="128" height="21" stroke={INK} strokeOpacity={i === 0 ? 0.8 : 0.3} />
            <text x="7" y={i * 28 + 14} fontSize="8" fontFamily={MONO} fill={i === 0 ? INK : MUTED} stroke="none">
              {g}
            </text>
            <rect x="108" y={i * 28 + 5} width={i === 0 ? 12 : 6} height="11" fill={i === 0 ? LIME : MUTED} stroke="none" opacity="0.85" />
          </g>
        ))}
        <Tag x="0" y="-10">GRADE DEFINITIONS DECIDE THE SALE</Tag>
      </g>
      {/* mill */}
      <g stroke={INK} transform="translate(374 74)">
        <path d="M0 88 v-50 l34 -20 l34 20 v50 z" strokeOpacity="0.75" />
        <path d="M20 88 v-28 h28 v28" strokeOpacity="0.45" />
        <path d="M62 88 v-34 a9 9 0 0 1 18 0 v34 z" strokeOpacity="0.5" />
        <path d="M71 45 v-9" strokeOpacity="0.35" />
        <path d="M-6 88 h100" strokeOpacity="0.55" />
      </g>
      <g stroke={LIME} strokeWidth="1.7" strokeDasharray="8 6">
        <path d="M160 106 h34" />
        <path d="M188 100 l8 6 l-8 6" />
        <path d="M340 106 h26" />
        <path d="M360 100 l8 6 l-8 6" />
      </g>
      <Tag x="52" y="150">NO PRICES PUBLISHED HERE</Tag>
      <Tag x="52" y="162" tone="muted">GRADES ARE PUBLIC</Tag>
      <g stroke={INK} strokeOpacity="0.35" strokeDasharray="4 4">
        <path d="M410 192 q-104 40 -270 4" />
      </g>
      <text x="292" y="238" textAnchor="middle" fontSize="7.5" fontFamily={MONO} fill={MUTED} stroke="none">
        contract length · freight · season
      </text>
      <text x="24" y="256" fontSize="9.5" fontFamily={SERIF} fill={INK} stroke="none" opacity="0.85">
        “Accepted” and “sold” are two different verbs.
      </text>
      <text x="24" y="272" fontSize="9.5" fontFamily={SERIF} fill={MUTED} stroke="none">
        Most of the gap between them is a grade sheet, not a rumour.
      </text>
      <Tag x="24" y="312" tone="muted">FIG. E-01 · WHAT A PROCESSED BALE IS WORTH IS A CONTRACT QUESTION</Tag>
    </Frame>
  );
}

export const PLATES = {
  chute: PlateChute,
  recognition: PlateRecognition,
  walk: PlateWalk,
  scale: PlateScale,
  flow: PlateFlow,
  market: PlateMarket,
} as const;
