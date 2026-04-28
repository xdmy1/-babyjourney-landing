import React from 'react';

/* One cherry-blossom style flower */
function Bloom({
  x, y, r, color, opacity, rotation = 0,
}: {
  x: number; y: number; r: number; color: string; opacity: number; rotation?: number;
}) {
  const petalRx = r * 0.42;
  const petalRy = r * 0.82;
  const petalCy = -r * 0.55;
  const angles = [0, 72, 144, 216, 288];
  const innerColor = r > 24 ? '#FFE8A0' : '#FFD580';
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`} opacity={opacity}>
      {angles.map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={petalCy}
          rx={petalRx}
          ry={petalRy}
          fill={color}
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.22} fill={innerColor} />
    </g>
  );
}

/* Rose bud - simpler shape */
function RoseBud({
  x, y, r, color, opacity,
}: {
  x: number; y: number; r: number; color: string; opacity: number;
}) {
  return (
    <g opacity={opacity}>
      {/* outer petals */}
      <ellipse cx={x} cy={y - r * 0.3} rx={r * 0.6} ry={r * 0.75} fill={color} opacity={0.7} />
      <ellipse cx={x - r * 0.5} cy={y + r * 0.1} rx={r * 0.6} ry={r * 0.75} fill={color} opacity={0.65} transform={`rotate(-50 ${x} ${y})`} />
      <ellipse cx={x + r * 0.5} cy={y + r * 0.1} rx={r * 0.6} ry={r * 0.75} fill={color} opacity={0.65} transform={`rotate(50 ${x} ${y})`} />
      {/* inner */}
      <ellipse cx={x} cy={y} rx={r * 0.38} ry={r * 0.45} fill={color} />
      <ellipse cx={x} cy={y + r * 0.05} rx={r * 0.2} ry={r * 0.25} fill={'rgba(255,255,255,0.25)'} />
    </g>
  );
}

/* Leaf shape */
function Leaf({
  x, y, w, h, color, rotation = 0, opacity = 0.5,
}: {
  x: number; y: number; w: number; h: number; color: string; rotation?: number; opacity?: number;
}) {
  return (
    <ellipse
      cx={x} cy={y} rx={w} ry={h}
      fill={color} opacity={opacity}
      transform={`rotate(${rotation} ${x} ${y})`}
    />
  );
}

/* ── HERO FLOWERS ── */
export function HeroFlowers() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      viewBox="0 0 1440 780"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Bottom left cluster ── */}
      <Leaf x={-20} y={700} w={120} h={40} color="#5A8A50" rotation={-30} opacity={0.45} />
      <Leaf x={80} y={720} w={100} h={32} color="#4A7A40" rotation={10} opacity={0.4} />
      <Leaf x={30} y={750} w={80} h={28} color="#6A9A5A" rotation={-10} opacity={0.38} />
      <RoseBud x={100} y={680} r={38} color="#F08090" opacity={0.75} />
      <RoseBud x={40} y={720} r={28} color="#E87888" opacity={0.65} />
      <Bloom x={180} y={690} r={26} color="#FFB7C5" opacity={0.7} rotation={20} />
      <Bloom x={200} y={740} r={18} color="#FFC5D0" opacity={0.6} rotation={-15} />
      <Bloom x={250} y={700} r={22} color="#FFAABB" opacity={0.55} rotation={35} />

      {/* ── Bottom right cluster ── */}
      <Leaf x={1380} y={680} w={110} h={38} color="#5A8A50" rotation={140} opacity={0.45} />
      <Leaf x={1320} y={720} w={95} h={30} color="#4A7A40" rotation={160} opacity={0.4} />
      <Leaf x={1420} y={730} w={80} h={26} color="#6A9A5A" rotation={120} opacity={0.38} />
      <RoseBud x={1320} y={660} r={40} color="#F08090" opacity={0.75} />
      <RoseBud x={1390} y={700} r={30} color="#E87888" opacity={0.65} />
      <Bloom x={1240} y={680} r={28} color="#FFB7C5" opacity={0.7} rotation={-20} />
      <Bloom x={1260} y={730} r={20} color="#FFC5D0" opacity={0.6} rotation={10} />
      <Bloom x={1200} y={710} r={24} color="#FFAABB" opacity={0.55} rotation={-35} />

      {/* ── Top right scattered ── */}
      <Bloom x={1300} y={60} r={18} color="#FFD0DC" opacity={0.45} rotation={10} />
      <Bloom x={1380} y={120} r={14} color="#FFC5D0" opacity={0.4} rotation={-20} />
      <Bloom x={1420} y={50} r={16} color="#FFAABB" opacity={0.35} rotation={30} />

      {/* ── Top left scattered ── */}
      <Bloom x={40} y={80} r={16} color="#FFD0DC" opacity={0.4} rotation={15} />
      <Bloom x={80} y={40} r={12} color="#FFC5D0" opacity={0.35} rotation={-10} />

      {/* ── Mid scattered (right half, behind photo area) ── */}
      <Bloom x={900} y={200} r={14} color="#FFD8E5" opacity={0.35} rotation={25} />
      <Bloom x={1100} y={350} r={12} color="#FFD0DC" opacity={0.3} rotation={-15} />
      <Bloom x={1050} y={150} r={16} color="#FFC5D0" opacity={0.32} rotation={40} />

      {/* Sparkle dots */}
      {[
        [300, 100, 4, '#FFD580', 0.7],
        [600, 60, 3, '#FFF0A0', 0.6],
        [800, 200, 5, '#FFD580', 0.5],
        [1100, 80, 4, '#FFF0A0', 0.55],
        [150, 400, 3, '#FFD580', 0.5],
        [400, 600, 4, '#FFF0A0', 0.45],
        [700, 550, 3, '#FFD580', 0.5],
        [1200, 450, 4, '#FFF0A0', 0.4],
        [950, 600, 5, '#FFD580', 0.45],
      ].map(([x, y, r, c, op], i) => (
        <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={c as string} opacity={op as number} />
      ))}
    </svg>
  );
}

/* ── SECTION FLOWERS (bottom strip) ── */
export function SectionFlowers({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className="absolute bottom-0 w-full"
      style={{ pointerEvents: 'none', height: 160 }}
      viewBox="0 0 1440 160"
      preserveAspectRatio="xMidYMax slice"
    >
      <g transform={flip ? 'scale(-1,1) translate(-1440,0)' : ''}>
        <Leaf x={-10} y={140} w={130} h={42} color="#5A8A50" rotation={-25} opacity={0.4} />
        <Leaf x={100} y={155} w={100} h={32} color="#4A7A40" rotation={5} opacity={0.35} />
        <RoseBud x={90} y={115} r={32} color="#F08090" opacity={0.7} />
        <RoseBud x={20} y={145} r={24} color="#E87888" opacity={0.6} />
        <Bloom x={170} y={120} r={22} color="#FFB7C5" opacity={0.65} rotation={20} />
        <Bloom x={195} y={148} r={15} color="#FFC5D0" opacity={0.55} rotation={-15} />
        <Bloom x={240} y={125} r={18} color="#FFAABB" opacity={0.5} rotation={35} />

        <Leaf x={1450} y={130} w={120} h={38} color="#5A8A50" rotation={155} opacity={0.4} />
        <Leaf x={1360} y={150} w={100} h={30} color="#4A7A40" rotation={170} opacity={0.35} />
        <RoseBud x={1355} y={108} r={34} color="#F08090" opacity={0.7} />
        <RoseBud x={1415} y={140} r={26} color="#E87888" opacity={0.6} />
        <Bloom x={1270} y={118} r={24} color="#FFB7C5" opacity={0.65} rotation={-20} />
        <Bloom x={1255} y={148} r={16} color="#FFC5D0" opacity={0.55} rotation={10} />
        <Bloom x={1210} y={128} r={20} color="#FFAABB" opacity={0.5} rotation={-35} />
      </g>
    </svg>
  );
}

export function TopFlowers() {
  return (
    <svg
      className="absolute top-0 w-full"
      style={{ pointerEvents: 'none', height: 130 }}
      viewBox="0 0 1440 130"
      preserveAspectRatio="xMidYMin slice"
    >
      <Leaf x={-10} y={20} w={130} h={42} color="#5A8A50" rotation={30} opacity={0.38} />
      <RoseBud x={80} y={25} r={30} color="#F08090" opacity={0.65} />
      <Bloom x={170} y={18} r={20} color="#FFB7C5" opacity={0.6} rotation={20} />
      <Bloom x={200} y={55} r={15} color="#FFC5D0" opacity={0.5} rotation={-15} />
      <Leaf x={1450} y={25} w={120} h={38} color="#5A8A50" rotation={145} opacity={0.38} />
      <RoseBud x={1360} y={28} r={32} color="#F08090" opacity={0.65} />
      <Bloom x={1260} y={15} r={22} color="#FFB7C5" opacity={0.6} rotation={-20} />
      <Bloom x={1235} y={52} r={16} color="#FFC5D0" opacity={0.5} rotation={10} />
    </svg>
  );
}
