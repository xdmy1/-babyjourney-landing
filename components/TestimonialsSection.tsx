'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/langContext';
import Reveal from './Reveal';
import RevealWords from './RevealWords';
import Marquee from './Marquee';

/** Animated count-up that fires when the element enters the viewport. */
function CountUp({
  end,
  duration = 1600,
  decimals = 0,
  suffix = '',
}: {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(end);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(end * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(end);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2 }}>
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#D4A06A"
          style={{ filter: 'drop-shadow(0 1px 0 rgba(180,120,80,0.18))' }}
        >
          <path d="M12 2 L14.6 8.6 L21.6 9.2 L16.3 14 L17.9 21 L12 17.3 L6.1 21 L7.7 14 L2.4 9.2 L9.4 8.6 Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLang();
  const ts: any = t.testimonials;
  const tones: { tint: string; quoteColor: string }[] = [
    { tint: 'linear-gradient(155deg, #fff5ec 0%, #fae0d0 100%)', quoteColor: '#B25168' },
    { tint: 'linear-gradient(155deg, #fef0e5 0%, #f5d8c5 100%)', quoteColor: '#7B3545' },
  ];

  return (
    <section
      className="section"
      style={{
        background:
          'linear-gradient(180deg, #f0ccb8 0%, #f4d6c0 35%, #f8e2d0 75%, #fbecdb 100%)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '8%',
          left: -100,
          width: 360,
          height: 360,
          backgroundImage: 'url(/bg-blooms-soft.png)',
          backgroundSize: 'cover',
          opacity: 0.4,
          mixBlendMode: 'soft-light',
          borderRadius: '50%',
          filter: 'blur(2px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          right: -90,
          width: 320,
          height: 320,
          backgroundImage: 'url(/bg-blooms-right.png)',
          backgroundSize: 'cover',
          opacity: 0.45,
          mixBlendMode: 'soft-light',
          borderRadius: '50%',
          filter: 'blur(2px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-x" style={{ position: 'relative', zIndex: 5 }}>
        {/* Heading block */}
        <Reveal variant="blur" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              borderRadius: 999,
              background: 'rgba(255,253,245,0.85)',
              border: '1px solid rgba(212,160,106,0.35)',
              boxShadow: '0 6px 20px rgba(110,55,45,0.12)',
              marginBottom: 18,
              backdropFilter: 'blur(8px)',
            }}
          >
            <StarRow />
            <span
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontWeight: 800,
                color: '#7B3545',
                fontSize: 'clamp(15px, 1.2vw, 17px)',
                letterSpacing: '-0.01em',
              }}
            >
              <CountUp end={parseFloat(ts.stat.replace(',', '.'))} decimals={1} />
            </span>
            <span style={{ fontSize: '13px', color: '#7B5548', fontStyle: 'italic' }}>
              {ts.statLabel}
            </span>
          </div>

          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            {ts.kicker}
          </div>

          {(() => {
            const h = ts.heading;
            const acc = ts.headingAccent;
            const segs: any[] = [];
            if (acc && h.includes(acc)) {
              const idx = h.indexOf(acc);
              if (idx > 0) segs.push({ text: h.slice(0, idx) });
              segs.push({
                text: acc,
                render: (w: string) => (
                  <span className="accent accent-rose" style={{ fontSize: '1.16em' }}>
                    {w}
                  </span>
                ),
              });
              if (idx + acc.length < h.length) segs.push({ text: h.slice(idx + acc.length) });
            } else {
              segs.push({ text: h });
            }
            return (
              <RevealWords
                as="h2"
                className="h-display"
                segments={segs}
                staggerMs={70}
                style={{
                  fontSize: 'clamp(30px, 4.4vw, 52px)',
                  marginTop: 4,
                }}
              />
            );
          })()}
        </Reveal>

        {/* Avatar marquee — feels alive */}
        <Reveal variant="up" style={{ marginBottom: 'clamp(36px, 4.5vw, 56px)' }}>
          <Marquee speed={42}>
            {[
              { name: 'Maria & Bogdan', city: 'București' },
              { name: 'Andreea G.', city: 'Iași' },
              { name: 'The Petrescu Family', city: 'Sibiu' },
              { name: 'Ioana D.', city: 'Timișoara' },
              { name: 'Nicolae & Cristina', city: 'Brașov' },
              { name: 'Diana M.', city: 'Constanța' },
              { name: 'Familia Ionescu', city: 'Oradea' },
              { name: 'Raluca P.', city: 'Cluj-Napoca' },
            ].map((p, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 18px 8px 8px',
                  background: 'rgba(255,253,245,0.86)',
                  border: '1px solid rgba(255,255,255,0.95)',
                  borderRadius: 999,
                  boxShadow: '0 4px 14px rgba(80,30,30,0.10)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, hsl(${(i * 47) % 360}, 60%, 78%), hsl(${(i * 47 + 30) % 360}, 55%, 65%))`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-display), sans-serif',
                    fontWeight: 800,
                    fontSize: '13px',
                    border: '2px solid #fff',
                    boxShadow: '0 2px 6px rgba(80,30,30,0.18)',
                  }}
                >
                  {p.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                </span>
                <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1.15 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display), sans-serif',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      color: '#2D1510',
                    }}
                  >
                    {p.name}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#9B7050', fontStyle: 'italic' }}>
                    {p.city}
                  </span>
                </span>
              </span>
            ))}
          </Marquee>
        </Reveal>

        {/* Quote-first cards — alternating slide directions */}
        <div
          className="testi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(20px, 3vw, 32px)',
            maxWidth: 980,
            margin: '0 auto clamp(56px, 7vw, 80px)',
          }}
        >
          {ts.list.map((item: any, i: number) => {
            const tone = tones[i % tones.length];
            return (
              <Reveal
                key={i}
                as="article"
                variant={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 120}
                className="testi-card hover-lift"
                style={{
                  position: 'relative',
                  background: tone.tint,
                  border: '1px solid rgba(255,255,255,0.95)',
                  borderRadius: 26,
                  overflow: 'hidden',
                  boxShadow:
                    '0 14px 40px rgba(80,30,30,0.13), 0 4px 14px rgba(80,30,30,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(28px, 3vw, 38px) clamp(28px, 3vw, 38px) clamp(24px, 2.8vw, 30px)',
                  minHeight: 'clamp(320px, 36vw, 380px)',
                }}
              >
                {/* Big decorative quote mark */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 'clamp(12px, 2vw, 22px)',
                    right: 'clamp(20px, 3vw, 30px)',
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 800,
                    fontSize: 'clamp(110px, 14vw, 180px)',
                    color: tone.quoteColor,
                    opacity: 0.12,
                    lineHeight: 0.7,
                    pointerEvents: 'none',
                    letterSpacing: '-0.05em',
                  }}
                >
                  ”
                </div>

                {/* Stars */}
                <div style={{ marginBottom: 16, position: 'relative', zIndex: 2 }}>
                  <StarRow />
                </div>

                {/* BIG quote — the star of the card */}
                <p
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 1.7vw, 23px)',
                    color: '#2D1510',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                    flex: 1,
                    position: 'relative',
                    zIndex: 2,
                    marginBottom: 22,
                  }}
                >
                  “{item.quote}”
                </p>

                {/* Author row at bottom — small avatar + name + role */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    paddingTop: 18,
                    borderTop: '1px solid rgba(110,55,45,0.14)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '2px solid #fff',
                      boxShadow: '0 4px 12px rgba(80,30,30,0.18)',
                    }}
                  >
                    <Image
                      src="/hero-family.png"
                      alt={item.author}
                      fill
                      sizes="44px"
                      style={{
                        objectFit: 'cover',
                        objectPosition: i === 0 ? '20% 20%' : '70% 30%',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display), sans-serif',
                        fontWeight: 800,
                        fontSize: '15px',
                        color: '#2D1510',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.author}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#9B7050',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {item.role}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        {/* end testimonial cards */}

        {/* CTA */}
        <Reveal variant="rise" style={{ textAlign: 'center' }}>
          <div className="orn" style={{ marginBottom: 14 }}>
            <div className="orn-line" />
            <h3
              className="h-display"
              style={{
                fontSize: 'clamp(22px, 2.8vw, 32px)',
              }}
            >
              {t.cta.heading}
            </h3>
            <div className="orn-line right" />
          </div>
          <div
            className="cta-row"
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="#demo" className="btn-outline">
              {t.cta.btn1}
            </a>
            <a href="#start" className="btn-rose">
              {t.cta.btn2}
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .testi-grid {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
          }
          .cta-row { flex-direction: column; align-items: stretch; max-width: 360px; margin-inline: auto; }
          .cta-row a { width: 100%; padding-block: 14px; }
        }
      `}</style>
    </section>
  );
}
