'use client';
import { CSSProperties, ReactNode } from 'react';

/* ─── Washi tape (a strip of decorative tape over a polaroid) ─── */
type TapeColor = 'pink' | 'gold' | 'mint' | 'cream';
const TAPES: Record<TapeColor, string> = {
  pink: 'repeating-linear-gradient(45deg, rgba(236,158,170,0.85) 0 8px, rgba(248,200,210,0.75) 8px 14px)',
  gold: 'repeating-linear-gradient(45deg, rgba(212,160,106,0.85) 0 8px, rgba(232,200,150,0.75) 8px 14px)',
  mint: 'repeating-linear-gradient(45deg, rgba(160,200,180,0.8) 0 8px, rgba(200,220,210,0.7) 8px 14px)',
  cream: 'repeating-linear-gradient(45deg, rgba(245,225,200,0.85) 0 8px, rgba(255,240,220,0.75) 8px 14px)',
};

export function WashiTape({
  width = 92,
  height = 22,
  rotate = -4,
  color = 'pink',
  style,
}: {
  width?: number;
  height?: number;
  rotate?: number;
  color?: TapeColor;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        width,
        height,
        background: TAPES[color],
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 2px 6px rgba(60,30,20,0.18)',
        zIndex: 5,
        ...style,
      }}
    />
  );
}

/* ─── Push pin ─── */
export function Pin({ color = '#B25168', style }: { color?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, #fff 0%, ${color} 60%, #4A1525 100%)`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.35), inset -1px -2px 3px rgba(0,0,0,0.3)',
        zIndex: 6,
        ...style,
      }}
    />
  );
}

/* ─── Hand-drawn underline (rough wavy SVG) ─── */
export function HandUnderline({
  color = '#B27548',
  style,
}: {
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      width="100%"
      height="14"
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      style={{ position: 'absolute', left: 0, bottom: -10, ...style }}
    >
      <path
        d="M3 8 C 30 2, 60 12, 92 6 S 150 12, 180 5 S 215 9, 218 7"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/* ─── Scribble arrow ─── */
export function ScribbleArrow({
  color = '#B27548',
  style,
  width = 120,
  height = 80,
  flip = false,
}: {
  color?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox="0 0 120 80"
      style={{
        transform: flip ? 'scaleX(-1)' : undefined,
        ...style,
      }}
    >
      <path
        d="M5 12 C 30 8, 60 30, 70 50 S 85 70, 105 65"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M95 58 L105 65 L99 73"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/* ─── Heart doodle ─── */
export function HeartDoodle({
  color = '#B25168',
  size = 22,
  style,
}: {
  color?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <path
        d="M12 20 C 6 16, 3 12, 3 8 C 3 5, 5 3, 7.5 3 C 9.3 3, 11 4.2, 12 6 C 13 4.2, 14.7 3, 16.5 3 C 19 3, 21 5, 21 8 C 21 12, 18 16, 12 20 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── Star sparkle doodle ─── */
export function StarDoodle({
  color = '#B27548',
  size = 18,
  style,
}: {
  color?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path
        d="M12 2 L13.6 9.4 L21 11 L13.6 12.6 L12 20 L10.4 12.6 L3 11 L10.4 9.4 Z"
        fill={color}
        opacity="0.7"
      />
    </svg>
  );
}

/* ─── Baby footprint icon ─── */
export function FootprintIcon({
  color = '#7B3545',
  size = 26,
  style,
}: {
  color?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 32 32" style={style}>
      <ellipse cx="14" cy="20" rx="6.5" ry="9" fill={color} opacity="0.85" />
      <ellipse cx="22" cy="11" rx="2.2" ry="2.6" fill={color} opacity="0.8" />
      <ellipse cx="25.5" cy="13.5" rx="1.6" ry="2" fill={color} opacity="0.75" />
      <ellipse cx="26" cy="17" rx="1.4" ry="1.8" fill={color} opacity="0.7" />
      <ellipse cx="24" cy="20" rx="1.3" ry="1.6" fill={color} opacity="0.65" />
    </svg>
  );
}

/* ─── Paper grain texture overlay (SVG noise) ─── */
export function PaperGrain({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'multiply',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.20 0 0 0 0 0.12 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }}
    />
  );
}

/* ─── Polaroid frame ─── */
export function Polaroid({
  children,
  rotate = -3,
  caption,
  captionAlign = 'center',
  width,
  className,
  style,
  pinTopLeft = false,
  tape,
  shadow = true,
}: {
  children: ReactNode;
  rotate?: number;
  caption?: ReactNode;
  captionAlign?: 'left' | 'center' | 'right';
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  pinTopLeft?: boolean;
  tape?: { color?: TapeColor; rotate?: number; offset?: number; width?: number };
  shadow?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        background: '#fdfaf2',
        padding: '12px 12px 44px',
        boxShadow: shadow
          ? '0 2px 4px rgba(60,30,20,0.10), 0 16px 38px rgba(60,30,20,0.18)'
          : 'none',
        transform: `rotate(${rotate}deg)`,
        width,
        display: 'inline-block',
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.02) 100%)',
        ...style,
      }}
    >
      {tape && (
        <WashiTape
          color={tape.color ?? 'pink'}
          rotate={tape.rotate ?? -6}
          width={tape.width ?? 90}
          style={{
            top: -10,
            left: '50%',
            transform: `translateX(-50%) rotate(${tape.rotate ?? -6}deg)`,
            marginLeft: tape.offset ?? 0,
          }}
        />
      )}
      {pinTopLeft && <Pin style={{ top: 10, left: 14 }} />}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
        {children}
      </div>
      {caption && (
        <div
          style={{
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: '20px',
            color: '#6B4530',
            textAlign: captionAlign,
            marginTop: 10,
            lineHeight: 1.1,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

/* ─── Stamp / sticker ─── */
export function Stamp({
  text,
  color = '#7B3545',
  rotate = -8,
  style,
}: {
  text: string;
  color?: string;
  rotate?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden={false}
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-caveat), cursive',
        fontWeight: 700,
        fontSize: '14px',
        color,
        border: `2px solid ${color}`,
        padding: '3px 10px 4px',
        borderRadius: 4,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        background: 'rgba(255,253,245,0.65)',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      {text}
    </span>
  );
}
