'use client';
import Image from 'next/image';
import { useLang } from '@/lib/langContext';
import { Lang } from '@/lib/translations';
import Reveal from './Reveal';
import RevealWords from './RevealWords';
import Parallax from './Parallax';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';

const langs: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
];

function HeartLogo() {
  return (
    <svg className="heartbeat hero-heart" viewBox="0 0 32 32" fill="none" aria-hidden>
      <defs>
        <linearGradient id="heroHeart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E89BA8" />
          <stop offset="100%" stopColor="#7B3545" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
      <path
        d="M16 24s-9-5.5-9-11.2C7 10.2 8.8 8 11.5 8c1.6 0 3 .9 3.6 2.2C15.7 8.9 17.1 8 18.5 8c2.7 0 4.5 2.2 4.5 4.8C23 18.5 16 24 16 24Z"
        fill="url(#heroHeart)"
      />
    </svg>
  );
}

export default function Hero() {
  const { lang, setLang, t } = useLang();

  return (
    <section
      className="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, #fdf2e6 0%, #fae6d2 35%, #f5dac3 70%, #f0d2bf 100%)',
      }}
    >
      {/* ── Bg flower field ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/bg-flowerfield.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 78%',
          opacity: 0.5,
          mixBlendMode: 'soft-light',
          pointerEvents: 'none',
        }}
      />
      {/* ── Bottom flower band ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '38%',
          backgroundImage: 'url(/bg-flowerfield.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0.85,
          maskImage: 'linear-gradient(180deg, transparent 0%, black 60%, black 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 60%, black 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Sparkle dots ── */}
      {[
        { top: '14%', left: '18%', s: 5, c: '#FFE2A0', delay: '0s' },
        { top: '8%', right: '24%', s: 5, c: '#FFD580', delay: '0.5s' },
        { top: '30%', left: '52%', s: 4, c: '#FFEFB0', delay: '1s' },
        { top: '50%', left: '8%', s: 4, c: '#FFF5C8', delay: '1.5s' },
        { top: '60%', right: '12%', s: 4, c: '#FFEFB0', delay: '2s' },
      ].map((d, i) => (
        <div
          key={i}
          className="sparkle-dot"
          style={{
            top: d.top,
            left: (d as any).left,
            right: (d as any).right,
            width: d.s,
            height: d.s,
            background: d.c,
            boxShadow: `0 0 ${d.s * 2.5}px ${d.c}`,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* ── Navbar ── */}
      <nav
        className="hero-nav"
        style={{
          position: 'relative',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          padding: 'clamp(12px, 2vw, 22px) clamp(14px, 4vw, 36px)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <a
          href="#"
          className="hero-brand"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <HeartLogo />
          <span
            className="brand-text"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontWeight: 700,
              color: '#2D1510',
              letterSpacing: '-0.01em',
            }}
          >
            BabyJourney<span style={{ color: '#B25168' }}>.Life</span>
          </span>
        </a>

        <div
          className="lang-pill"
          style={{
            display: 'flex',
            gap: 3,
            background: 'rgba(255,253,245,0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.85)',
            borderRadius: 999,
            padding: '3px 4px',
            boxShadow: '0 4px 14px rgba(120,60,60,0.12)',
            flexShrink: 0,
          }}
        >
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className="lang-btn"
              style={{
                padding: '5px 10px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                background:
                  lang === l.code
                    ? 'linear-gradient(135deg, #B25168, #7B3545)'
                    : 'transparent',
                color: lang === l.code ? '#fff' : '#5C3D35',
                transition: 'all 0.2s',
                boxShadow: lang === l.code ? '0 2px 8px rgba(110,35,55,0.4)' : 'none',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile-only menu icon (hamburger placeholder, like mockup #2) */}
        <button
          aria-label="menu"
          className="hero-burger"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            color: '#2D1510',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </nav>

      {/* ── Hero body: text left + family photo + iPhone overlay right ── */}
      <div
        className="hero-grid container-x"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 'clamp(24px, 4vw, 56px)',
          alignItems: 'center',
          paddingTop: 'clamp(20px, 4vw, 40px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
        }}
      >
        {/* LEFT — staggered reveals */}
        <Reveal as="div" stagger>
          <div className="eyebrow">{t.hero.kicker}</div>

          {(() => {
            const h2 = t.hero.headline2;
            const acc = t.hero.headlineAccent;
            const segs: any[] = [{ text: t.hero.headline1 + '\n' }];
            if (acc && h2.includes(acc)) {
              const idx = h2.indexOf(acc);
              if (idx > 0) segs.push({ text: h2.slice(0, idx) });
              segs.push({
                text: acc,
                render: (w: string) => (
                  <span className="accent accent-rose" style={{ fontSize: '1.18em' }}>
                    {w}
                  </span>
                ),
              });
              if (idx + acc.length < h2.length) segs.push({ text: h2.slice(idx + acc.length) });
            } else {
              segs.push({ text: h2 });
            }
            return (
              <RevealWords
                as="h1"
                className="h-display"
                segments={segs}
                staggerMs={75}
                style={{
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  marginBottom: 22,
                  maxWidth: '12ch',
                }}
              />
            );
          })()}

          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: '#5C3D35',
              lineHeight: 1.65,
              maxWidth: 460,
              marginBottom: 28,
            }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="hero-cta"
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <a href="#demo" className="btn-outline">
              {t.hero.cta1}
            </a>
            <a href="#start" className="btn-rose">
              {t.hero.cta2}
            </a>
          </div>
        </Reveal>

        {/* RIGHT — family photo + iPhone overlay */}
        <Reveal
          as="div"
          variant="right"
          delay={120}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'clamp(360px, 42vw, 520px)',
          }}
          className="hero-stage"
        >
          {/* warm glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: '-10%',
              background:
                'radial-gradient(ellipse at center, rgba(255,220,180,0.7) 0%, rgba(255,200,160,0) 65%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Family photo (slightly back-left) — parallax shell + rotated card */}
          <Parallax factor={0.12} style={{ position: 'relative', zIndex: 1 }}>
            <Reveal
              variant="wipe"
              className="hero-family-card"
              style={{
                position: 'relative',
                width: 'clamp(240px, 34vw, 400px)',
                aspectRatio: '5/4',
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow:
                  '0 28px 70px rgba(110,55,45,0.26), 0 8px 22px rgba(110,55,45,0.16)',
                border: '4px solid rgba(255,255,255,0.9)',
                transform: 'rotate(-1.5deg) translateX(-8%)',
              }}
            >
              <Image
                src="/hero-family.png"
                alt="Mom and dad smiling with their baby in golden sunlight"
                fill
                sizes="(max-width: 900px) 80vw, 400px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </Reveal>
          </Parallax>

          {/* iPhone X — separate parallax shell with rotated child */}
          <Parallax
            factor={0.24}
            style={{
              position: 'absolute',
              right: 'clamp(-10px, 2%, 30px)',
              bottom: 'clamp(-10px, -1vw, 0px)',
              zIndex: 2,
            }}
          >
            <div
              className="hero-iphone floaty"
              style={{
                transform: 'rotate(3deg)',
                transformOrigin: 'bottom right',
              }}
            >
              <DeviceFrameset device="iPhone X">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#000',
                  }}
                >
                  <img
                    src="/hero-mockup.png"
                    alt="BabyJourney app preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              </DeviceFrameset>
            </div>
          </Parallax>
        </Reveal>
      </div>

      <style>{`
        .hero-heart { width: 32px; height: 32px; }
        .brand-text { font-size: clamp(16px, 2vw, 22px); }
        .hero-burger { display: none; }

        /* iPhone overlay scaling — small enough to overlap family photo nicely */
        .hero-iphone { zoom: 0.42; }
        .hero-iphone .marvel-device.iphone-x {
          box-shadow: 0 30px 70px rgba(60,20,30,0.42), 0 12px 28px rgba(60,20,30,0.28);
        }

        @media (max-width: 1100px) { .hero-iphone { zoom: 0.36; } }
        @media (max-width: 900px)  { .hero-iphone { zoom: 0.34; } }
        @media (max-width: 720px)  { .hero-iphone { zoom: 0.30; } }
        @media (max-width: 520px)  { .hero-iphone { zoom: 0.26; right: -6px !important; } }
        @media (max-width: 380px)  { .hero-iphone { zoom: 0.22; } }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-stage { order: -1; }
          .hero-cta { flex-direction: column !important; align-items: stretch; }
          .hero-cta a { width: 100%; padding-block: 14px; }
        }
        @media (max-width: 520px) {
          .hero-heart { width: 26px !important; height: 26px !important; }
          .brand-text { font-size: 17px !important; }
          .lang-pill { display: none !important; }
          .hero-burger { display: inline-flex !important; }
          .hero-family-card { transform: rotate(-1.5deg) !important; }
        }
      `}</style>
    </section>
  );
}
