'use client';
import { useEffect, useState } from 'react';

type Petal = {
  left: string;
  delay: string;
  dur: string;
  drift: string;
  spin: string;
  size: number;
  color: string;
  shape: 'rose' | 'sakura' | 'leaf';
};

const COLORS = ['#F5B5C5', '#F0A0B5', '#FFC8D8', '#E89BA8', '#FFD8DE'];
const SHAPES: Petal['shape'][] = ['rose', 'sakura', 'leaf'];

function petalSvg(color: string, shape: Petal['shape'], size: number) {
  if (shape === 'sakura') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <g transform="translate(16,16)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={0}
              cy={-9}
              rx={5}
              ry={9}
              fill={color}
              opacity={0.85}
              transform={`rotate(${a})`}
            />
          ))}
          <circle cx={0} cy={0} r={2.5} fill="#FFE6A0" />
        </g>
      </svg>
    );
  }
  if (shape === 'leaf') {
    return (
      <svg width={size} height={size * 0.6} viewBox="0 0 32 20" fill="none">
        <ellipse cx={16} cy={10} rx={14} ry={6} fill={color} opacity={0.7} />
        <path d="M2 10 Q16 7 30 10" stroke="rgba(0,0,0,0.15)" strokeWidth="0.6" fill="none" />
      </svg>
    );
  }
  // rose petal — teardrop
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 4 C24 8 28 18 16 28 C4 18 8 8 16 4 Z"
        fill={color}
        opacity={0.85}
      />
      <path
        d="M16 6 C20 10 22 18 16 24"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export default function Petals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: count }).map(() => {
      const size = 14 + Math.random() * 22;
      return {
        left: `${Math.random() * 100}%`,
        delay: `${-Math.random() * 18}s`,
        dur: `${12 + Math.random() * 14}s`,
        drift: `${(Math.random() - 0.5) * 240}px`,
        spin: `${(Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540)}deg`,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      };
    });
    setPetals(arr);
  }, [count]);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={
            {
              left: p.left,
              ['--delay' as any]: p.delay,
              ['--dur' as any]: p.dur,
              ['--drift' as any]: p.drift,
              ['--spin' as any]: p.spin,
              animationDelay: p.delay,
              animationDuration: p.dur,
              filter: 'drop-shadow(0 2px 4px rgba(180,80,100,0.18))',
            } as React.CSSProperties
          }
        >
          {petalSvg(p.color, p.shape, p.size)}
        </div>
      ))}
    </div>
  );
}
