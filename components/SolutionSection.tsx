'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/langContext';
import Reveal from './Reveal';
import RevealWords from './RevealWords';
import Parallax from './Parallax';
import Marquee from './Marquee';

/** Filled, characterful feature emblems — not generic outlined SaaS icons. */
function FeatureEmblem({ name, size = 28 }: { name: string; size?: number }) {
  switch (name) {
    case 'lock':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <defs>
            <linearGradient id="lk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E89BA8" />
              <stop offset="100%" stopColor="#7B3545" />
            </linearGradient>
          </defs>
          <path d="M10 14V10a6 6 0 0 1 12 0v4" stroke="#7B3545" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <rect x="6.5" y="14" width="19" height="13" rx="3.5" fill="url(#lk)" />
          <path d="M16 19c-1.4 0-2.4 1.4-1.6 2.7L16 24l1.6-2.3c.8-1.3-.2-2.7-1.6-2.7Z" fill="#fff" />
        </svg>
      );
    case 'family':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <defs>
            <linearGradient id="fm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2A6B4" />
              <stop offset="100%" stopColor="#B25168" />
            </linearGradient>
          </defs>
          <circle cx="11" cy="11" r="4" fill="url(#fm)" />
          <circle cx="22" cy="12" r="3.2" fill="#7B3545" />
          <path d="M3 26c0-4 3.5-7 8-7s8 3 8 7v1H3v-1Z" fill="url(#fm)" />
          <path d="M18 26c0-2.6 2-5 5-5s5 2.4 5 5v1H18v-1Z" fill="#7B3545" />
          <circle cx="16" cy="22" r="2" fill="#FFD580" stroke="#fff" strokeWidth="1.4" />
        </svg>
      );
    case 'media':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <defs>
            <linearGradient id="md" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE2A0" />
              <stop offset="100%" stopColor="#D4A06A" />
            </linearGradient>
          </defs>
          {/* back polaroid */}
          <rect x="5" y="9" width="18" height="18" rx="2" fill="#fff" stroke="#B25168" strokeWidth="1.4" transform="rotate(-6 14 18)" />
          {/* front polaroid */}
          <rect x="9" y="6" width="18" height="20" rx="2" fill="url(#md)" stroke="#B25168" strokeWidth="1.4" transform="rotate(5 18 16)" />
          <circle cx="18.5" cy="14.5" r="3" fill="#7B3545" transform="rotate(5 18.5 14.5)" />
          {/* heart sticker */}
          <path d="M22 8.5c-.6-.7-1.7-.7-2.3 0-.7-.7-1.7-.7-2.3 0-.7.7-.7 1.9 0 2.6L20 13l2.6-1.9c.7-.7.7-1.9-.6-2.6Z" fill="#E89BA8" stroke="#7B3545" strokeWidth="0.8" />
        </svg>
      );
    case 'book':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <defs>
            <linearGradient id="bk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2A6B4" />
              <stop offset="100%" stopColor="#7B3545" />
            </linearGradient>
          </defs>
          {/* book covers */}
          <path d="M5 7C5 5.9 5.9 5 7 5h8v22H7c-1.1 0-2-.9-2-2V7Z" fill="url(#bk)" />
          <path d="M27 7c0-1.1-.9-2-2-2h-8v22h8c1.1 0 2-.9 2-2V7Z" fill="#7B3545" />
          {/* spine */}
          <rect x="15" y="5" width="2" height="22" fill="#5C2030" />
          {/* page lines */}
          <path d="M9 11h4M9 14h4M9 17h3M19 11h4M19 14h4M19 17h3" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
          {/* heart on cover */}
          <path d="M11 21c-.7-.7-1.7-.7-2.3 0-.7.7-.7 1.7 0 2.3L11 25.6l2.3-2.3c.7-.6.7-1.7 0-2.3-.6-.7-1.7-.7-2.3 0Z" fill="#FFD580" stroke="#5C2030" strokeWidth="0.8" />
        </svg>
      );
    default:
      return null;
  }
}

function CheckMark({ color = '#7B3545' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4 13l5 5L20 6" />
    </svg>
  );
}

export default function SolutionSection() {
  const { t } = useLang();
  const s: any = t.solution;
  const features: { icon: string; title: string; desc: string }[] = s.features;

  // Auto-rotating active feature
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % features.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused, features.length]);

  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(170deg, #f9e4d4 0%, #f5d8c5 40%, #f0ccb8 100%)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          left: -90,
          width: 340,
          height: 340,
          backgroundImage: 'url(/bg-blooms-left.png)',
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
          bottom: 80,
          right: -90,
          width: 340,
          height: 340,
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
        {/* Heading */}
        <Reveal variant="blur" style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            {s.kicker}
          </div>
          {(() => {
            const h = s.heading;
            const acc = s.headingAccent;
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
                  fontSize: 'clamp(30px, 4.6vw, 58px)',
                  maxWidth: 880,
                  margin: '0 auto 16px',
                }}
              />
            );
          })()}
          <p
            style={{
              color: '#7B5548',
              fontSize: 'clamp(15px, 1.2vw, 17.5px)',
              maxWidth: 580,
              margin: '0 auto',
              lineHeight: 1.55,
            }}
          >
            {s.subheading}
          </p>
        </Reveal>

        {/* Feature word marquee — adds motion */}
        <Reveal variant="up" style={{ marginBottom: 'clamp(28px, 3.5vw, 44px)' }}>
          <Marquee speed={32}>
            {features.concat(features).map((f, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 18px',
                  background: 'rgba(255,253,245,0.7)',
                  border: '1px solid rgba(255,255,255,0.85)',
                  borderRadius: 999,
                  boxShadow: '0 4px 14px rgba(80,30,30,0.08)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-display), sans-serif',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  color: '#7B3545',
                  letterSpacing: '-0.005em',
                  flexShrink: 0,
                }}
              >
                <FeatureEmblem name={f.icon} size={22} />
                {f.title}
              </span>
            ))}
          </Marquee>
        </Reveal>

        {/* SHOWCASE — auto-rotating tablet + active feature copy */}
        <Reveal
          variant="rise"
          style={{
            position: 'relative',
            marginBottom: 'clamp(48px, 6vw, 70px)',
          }}
        >
          <div
            ref={stageRef}
            className="solution-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1.45fr 1fr',
              gap: 'clamp(24px, 3.5vw, 50px)',
              alignItems: 'center',
            }}
          >
            {/* Tablet stage */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow:
                  '0 26px 60px rgba(80,30,30,0.22), 0 8px 22px rgba(80,30,30,0.10)',
                border: '1px solid rgba(255,255,255,0.92)',
                background: '#fff',
              }}
            >
              <Parallax
                factor={0.1}
                style={{ position: 'absolute', top: '-8%', left: 0, right: 0, height: '116%' }}
              >
                <Image
                  src="/solution-tablet.png"
                  alt="BabyJourney app on tablet"
                  fill
                  sizes="(max-width: 900px) 92vw, 700px"
                  style={{ objectFit: 'cover' }}
                />
              </Parallax>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(45,21,16,0.0) 0%, rgba(45,21,16,0) 55%, rgba(45,21,16,0.45) 100%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Active feature label floating bottom-left */}
              <div
                key={active}
                className="solution-floating-chip"
                style={{
                  position: 'absolute',
                  left: 18,
                  bottom: 18,
                  padding: '10px 16px 10px 12px',
                  background: 'rgba(255,253,245,0.96)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.95)',
                  boxShadow: '0 10px 26px rgba(80,30,30,0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  maxWidth: '70%',
                }}
              >
                <FeatureEmblem name={features[active].icon} size={26} />
                <span
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontWeight: 800,
                    fontSize: '14px',
                    color: '#7B3545',
                    letterSpacing: '-0.005em',
                    lineHeight: 1.15,
                  }}
                >
                  {features[active].title}
                </span>
              </div>
              {/* Progress segments top */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 18,
                  left: 18,
                  right: 18,
                  display: 'flex',
                  gap: 6,
                }}
              >
                {features.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.35)',
                      overflow: 'hidden',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <div
                      style={{
                        width: i < active ? '100%' : i === active ? '100%' : '0%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #FFD580, #fff)',
                        animation:
                          i === active && !paused
                            ? 'segmentGrow 4.2s linear forwards'
                            : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — clickable feature list with active emphasis */}
            <div className="solution-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {features.map((f, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(i);
                      setPaused(false);
                    }}
                    className="solution-item"
                    style={{
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      padding: 'clamp(14px, 1.6vw, 18px) clamp(16px, 1.8vw, 20px)',
                      borderRadius: 18,
                      border: isActive
                        ? '1px solid rgba(178,81,104,0.4)'
                        : '1px solid rgba(255,255,255,0.85)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(255,253,245,0.96), rgba(255,235,225,0.96))'
                        : 'rgba(255,253,245,0.45)',
                      boxShadow: isActive
                        ? '0 14px 32px rgba(80,30,30,0.16), inset 0 1px 0 rgba(255,255,255,0.6)'
                        : '0 4px 12px rgba(80,30,30,0.05)',
                      transform: isActive ? 'translateX(0)' : 'translateX(0)',
                      transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: isActive ? 48 : 40,
                        height: isActive ? 48 : 40,
                        borderRadius: 14,
                        background: isActive
                          ? 'linear-gradient(135deg, #B25168, #7B3545)'
                          : 'rgba(178,81,104,0.10)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isActive
                          ? 'inset 0 1px 0 rgba(255,255,255,0.3), 0 6px 16px rgba(110,35,55,0.32)'
                          : 'none',
                        transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      <FeatureEmblem name={f.icon} size={isActive ? 28 : 22} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        className="h-display"
                        style={{
                          fontSize: isActive ? 'clamp(17px, 1.55vw, 21px)' : 'clamp(15px, 1.3vw, 18px)',
                          color: '#2D1510',
                          marginBottom: 4,
                          lineHeight: 1.18,
                          fontWeight: 800,
                          transition: 'all 0.4s ease',
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                          color: '#5C3D35',
                          lineHeight: 1.5,
                          maxHeight: isActive ? 80 : 0,
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                        }}
                      >
                        {f.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Pricing heading */}
        <Reveal variant="scale" style={{ marginBottom: 'clamp(32px, 4vw, 48px)', textAlign: 'center' }}>
          <div className="orn">
            <div className="orn-line" />
            <span
              style={{
                fontSize: 'clamp(17px, 1.7vw, 22px)',
                fontFamily: 'var(--font-display), sans-serif',
                fontWeight: 700,
                color: '#2D1510',
                whiteSpace: 'nowrap',
              }}
            >
              {s.pricingHeading}
            </span>
            <div className="orn-line right" />
          </div>
        </Reveal>

        {/* Billing toggle — Monthly / Yearly */}
        {s.billing && (
          <Reveal variant="up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(28px, 3.5vw, 40px)' }}>
            <div
              role="tablist"
              aria-label={s.pricingHeading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: 5,
                borderRadius: 999,
                background: 'rgba(255,253,245,0.7)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 18px rgba(80,30,30,0.08)',
              }}
            >
              {(['monthly', 'yearly'] as const).map((key) => {
                const isOn = billing === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={isOn}
                    onClick={() => setBilling(key)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: 999,
                      padding: '10px 22px',
                      fontFamily: 'var(--font-display), sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      letterSpacing: '-0.005em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      color: isOn ? '#fff' : '#7B3545',
                      background: isOn
                        ? 'linear-gradient(135deg, #B25168, #7B3545)'
                        : 'transparent',
                      boxShadow: isOn ? '0 6px 16px rgba(110,35,55,0.32)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {s.billing[key]}
                    {key === 'yearly' && s.billing.saveHint && (
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: 999,
                          background: isOn ? 'rgba(255,213,128,0.95)' : 'rgba(212,160,106,0.2)',
                          color: isOn ? '#5C2030' : '#9A5A2E',
                        }}
                      >
                        {s.billing.saveHint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Pricing — 3 tiers, popular middle is dark hero */}
        <Reveal
          stagger
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(18px, 2.5vw, 26px)',
            alignItems: 'stretch',
            paddingTop: 24,
          }}
        >
          {s.plans.map((plan: any, i: number) => {
            const popular = !!plan.badge;
            const hero = popular;
            const cardTones = [
              { bg: 'linear-gradient(160deg, #fff8ee 0%, #fbecdb 100%)', accent: '#B27548' },
              { bg: 'linear-gradient(155deg, #B25168 0%, #7B3545 55%, #5C2030 100%)', accent: '#fff' },
              { bg: 'linear-gradient(160deg, #fef0e5 0%, #f5d2c3 100%)', accent: '#7B3545' },
            ];
            const tone = cardTones[i] || cardTones[0];
            const active = (billing === 'yearly' ? plan.yearly : plan.monthly) || {
              price: plan.price,
              period: plan.period,
            };
            const numericPrice = typeof active.price === 'string' && /[€$]/.test(active.price);
            return (
              <div
                key={i}
                className="price-card hover-lift"
                style={{
                  position: 'relative',
                  borderRadius: 26,
                  padding: 'clamp(30px, 3.2vw, 38px) clamp(24px, 2.6vw, 30px) clamp(26px, 2.8vw, 32px)',
                  background: tone.bg,
                  color: hero ? '#fff' : '#2D1510',
                  boxShadow: hero
                    ? '0 26px 60px rgba(80,20,30,0.45), 0 8px 22px rgba(80,20,30,0.22)'
                    : '0 12px 32px rgba(80,30,30,0.12), 0 3px 10px rgba(80,30,30,0.06)',
                  border: hero
                    ? '1px solid rgba(255,255,255,0.25)'
                    : '1px solid rgba(255,255,255,0.85)',
                  transform: popular ? 'translateY(-14px)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #FFD580, #D4A06A)',
                      color: '#5C2030',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '7px 16px',
                      borderRadius: 999,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 6px 18px rgba(120,70,40,0.45)',
                      border: '1px solid rgba(255,255,255,0.5)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#5C2030" aria-hidden>
                      <path d="M12 2 L14.6 8.6 L21.6 9.2 L16.3 14 L17.9 21 L12 17.3 L6.1 21 L7.7 14 L2.4 9.2 L9.4 8.6 Z" />
                    </svg>
                    {plan.badge}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: 'clamp(22px, 2.1vw, 26px)',
                    fontWeight: 800,
                    letterSpacing: '-0.015em',
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {plan.name}
                </div>

                {plan.extra && (
                  <div
                    style={{
                      fontSize: '12.5px',
                      opacity: hero ? 0.85 : 0.72,
                      fontStyle: 'italic',
                      marginBottom: 22,
                      lineHeight: 1.4,
                    }}
                  >
                    {plan.extra}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 6,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display), sans-serif',
                      fontSize: numericPrice ? 'clamp(48px, 5vw, 60px)' : 'clamp(30px, 3.4vw, 42px)',
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: '-0.035em',
                    }}
                  >
                    {active.price}
                  </span>
                  {active.period && (
                    <span style={{ fontSize: '15px', opacity: hero ? 0.85 : 0.7, fontWeight: 500 }}>
                      {active.period}
                    </span>
                  )}
                </div>
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 2.5,
                    background: hero
                      ? 'linear-gradient(90deg, #FFD580, transparent)'
                      : `linear-gradient(90deg, ${tone.accent}, transparent)`,
                    borderRadius: 2,
                    marginBottom: 22,
                  }}
                />

                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 9,
                    marginBottom: 20,
                    flex: 1,
                  }}
                >
                  {(plan.features || []).map((f: string, fi: number) => (
                    <li
                      key={fi}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: '13px',
                        lineHeight: 1.45,
                        color: hero ? 'rgba(255,255,255,0.93)' : '#3D2418',
                      }}
                    >
                      <span
                        style={{
                          marginTop: 1,
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: hero
                            ? 'rgba(255,255,255,0.16)'
                            : i === 2
                              ? 'rgba(212,160,106,0.22)'
                              : 'rgba(178,81,104,0.14)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckMark color={hero ? '#fff' : tone.accent} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.perfectFor && (
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                      padding: '12px 14px',
                      marginBottom: 18,
                      borderRadius: 14,
                      background: hero ? 'rgba(255,255,255,0.10)' : 'rgba(178,81,104,0.07)',
                      border: hero ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(178,81,104,0.14)',
                      fontSize: '12px',
                      lineHeight: 1.45,
                      color: hero ? 'rgba(255,255,255,0.9)' : '#5C3D35',
                    }}
                  >
                    <span style={{ fontSize: 13, lineHeight: 1.2, flexShrink: 0 }} aria-hidden>
                      ✦
                    </span>
                    <span>
                      <strong style={{ display: 'block', fontWeight: 800, marginBottom: 2, color: hero ? '#fff' : '#7B3545' }}>
                        {s.perfectForLabel}
                      </strong>
                      {plan.perfectFor}
                    </span>
                  </div>
                )}

                <a
                  href="#"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    borderRadius: 999,
                    padding: '14px 16px',
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.01em',
                    background: hero
                      ? 'linear-gradient(135deg, #FFD580, #D4A06A)'
                      : i === 2
                        ? 'linear-gradient(135deg, #D4A06A, #B27548)'
                        : 'linear-gradient(135deg, #B25168, #7B3545)',
                    color: hero ? '#5C2030' : '#fff',
                    boxShadow: hero
                      ? '0 8px 22px rgba(180,120,40,0.38), inset 0 1px 0 rgba(255,255,255,0.5)'
                      : '0 6px 18px rgba(80,20,30,0.28), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: hero
                      ? '1px solid rgba(255,255,255,0.4)'
                      : '1px solid rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-display), sans-serif',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </Reveal>

        {/* Legacy footnote */}
        {s.legacyNote && (
          <Reveal
            variant="up"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 7,
              maxWidth: 620,
              margin: 'clamp(20px, 2.5vw, 28px) auto 0',
              textAlign: 'center',
              fontSize: '12.5px',
              lineHeight: 1.5,
              fontStyle: 'italic',
              color: '#7B5548',
            }}
          >
            <span aria-hidden style={{ fontStyle: 'normal' }}>✦</span>
            <span>{s.legacyNote}</span>
          </Reveal>
        )}

        {/* Included in every plan — trust band */}
        {s.everyPlan && (
          <Reveal
            variant="up"
            style={{
              marginTop: 'clamp(36px, 4.5vw, 56px)',
              padding: 'clamp(24px, 3vw, 34px) clamp(20px, 3vw, 40px)',
              borderRadius: 24,
              background: 'rgba(255,253,245,0.6)',
              border: '1px solid rgba(255,255,255,0.85)',
              boxShadow: '0 12px 32px rgba(80,30,30,0.08)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <div
              className="h-display"
              style={{
                textAlign: 'center',
                fontSize: 'clamp(16px, 1.6vw, 20px)',
                fontWeight: 800,
                color: '#2D1510',
                marginBottom: 'clamp(16px, 2vw, 22px)',
              }}
            >
              {s.everyPlan.heading}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 'clamp(10px, 1.4vw, 16px)',
              }}
            >
              {s.everyPlan.items.map((item: string, ei: number) => (
                <span
                  key={ei}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 16px',
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(178,81,104,0.16)',
                    borderRadius: 999,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#5C2030',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7B3545" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11Z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      <style>{`
        @keyframes segmentGrow {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (max-width: 900px) {
          .solution-stage { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; gap: 16px !important; max-width: 460px; margin-inline: auto; }
          .pricing-grid > div { transform: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .solution-floating-chip { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
