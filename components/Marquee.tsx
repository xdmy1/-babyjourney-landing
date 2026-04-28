'use client';
import { ReactNode } from 'react';

/**
 * Infinite horizontal scroll marquee. Renders children twice for a seamless
 * loop using CSS keyframes. Pauses on hover. GPU-only transform animation.
 */
export default function Marquee({
  children,
  speed = 40,
  className = '',
  fade = true,
}: {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  className?: string;
  /** Soft fade-out at edges. */
  fade?: boolean;
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        maskImage: fade
          ? 'linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)'
          : undefined,
        WebkitMaskImage: fade
          ? 'linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)'
          : undefined,
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(20px, 3vw, 36px)',
          animation: `marquee-scroll ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(20px, 3vw, 36px)' }}>
          {children}
        </div>
        <div aria-hidden style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(20px, 3vw, 36px)' }}>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
