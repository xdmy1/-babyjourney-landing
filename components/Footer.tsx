'use client';
import { useLang } from '@/lib/langContext';
import { Lang } from '@/lib/translations';
import Reveal from './Reveal';

const langs: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
];

function FooterLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <defs>
        <linearGradient id="footerLogoHeart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E89BA8" />
          <stop offset="100%" stopColor="#7B3545" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="13" fill="rgba(255,255,255,0.85)" stroke="rgba(178,81,104,0.25)" strokeWidth="0.8" />
      <path
        d="M14 21s-7-4.4-7-9C7 9.5 8.6 8 10.7 8c1.3 0 2.4.7 3.3 1.9.7-1.2 1.9-1.9 3.2-1.9 2.1 0 3.7 1.7 3.7 3.7C20.9 16.6 14 21 14 21Z"
        fill="url(#footerLogoHeart)"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: 'instagram' | 'tiktok' | 'pinterest' | 'mail' }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'instagram':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
          <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
          <path d="M14 4c0 2.5 2 4.5 5 4.5" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M11 8c2 0 3.5 1.4 3.5 3.5 0 2-1.5 3.5-3 3.5-1 0-1.6-.6-1.4-1.6L11 9" />
          <path d="M10.6 13.5L9 21" />
        </svg>
      );
    case 'mail':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
  }
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#7B3545',
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#5C3D35',
                textDecoration: 'none',
                transition: 'color 0.2s, transform 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#7B3545';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#5C3D35';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { lang, setLang, t } = useLang();
  const f: any = t.footer;

  return (
    <footer
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #fbecdb 0%, #f7e0c8 50%, #f3d6bb 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          left: -120,
          width: 380,
          height: 380,
          backgroundImage: 'url(/bg-blooms-soft.png)',
          backgroundSize: 'cover',
          opacity: 0.35,
          mixBlendMode: 'soft-light',
          borderRadius: '50%',
          filter: 'blur(3px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 80,
          right: -110,
          width: 360,
          height: 360,
          backgroundImage: 'url(/bg-blooms-right.png)',
          backgroundSize: 'cover',
          opacity: 0.30,
          mixBlendMode: 'soft-light',
          borderRadius: '50%',
          filter: 'blur(3px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Top: newsletter ── */}
      <div
        className="container-x"
        style={{
          position: 'relative',
          zIndex: 5,
          paddingTop: 'clamp(64px, 8vw, 96px)',
          paddingBottom: 'clamp(40px, 5vw, 56px)',
        }}
      >
        <Reveal variant="rise">
          <div
            className="footer-newsletter"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(24px, 4vw, 56px)',
              alignItems: 'center',
              padding: 'clamp(28px, 4vw, 40px) clamp(28px, 4vw, 44px)',
              background: 'rgba(255,253,245,0.85)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 24,
              boxShadow:
                '0 12px 40px rgba(80,30,30,0.12), 0 4px 14px rgba(80,30,30,0.06)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div>
              <div className="eyebrow">{f.newsletterEyebrow}</div>
              <h3
                className="h-display"
                style={{
                  fontSize: 'clamp(22px, 2.6vw, 32px)',
                  marginBottom: 8,
                  lineHeight: 1.15,
                }}
              >
                {(() => {
                  const h = f.newsletterHeading;
                  const acc = f.newsletterAccent;
                  if (!acc || !h.includes(acc)) return h;
                  const idx = h.indexOf(acc);
                  return (
                    <>
                      {h.slice(0, idx)}
                      <span className="accent accent-rose" style={{ fontSize: '1.16em' }}>
                        {acc}
                      </span>
                      {h.slice(idx + acc.length)}
                    </>
                  );
                })()}
              </h3>
              <p style={{ fontSize: '13px', color: '#7B5548' }}>{f.newsletterNote}</p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="footer-form"
              style={{
                display: 'flex',
                gap: 8,
                background: '#fff',
                border: '1px solid rgba(178,81,104,0.18)',
                borderRadius: 999,
                padding: 5,
                boxShadow: 'inset 0 1px 3px rgba(80,30,30,0.06)',
              }}
            >
              <input
                type="email"
                placeholder={f.newsletterPlaceholder}
                aria-label="email"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body), sans-serif',
                  color: '#2D1510',
                  minWidth: 0,
                }}
              />
              <button type="submit" className="btn-rose" style={{ padding: '10px 22px' }}>
                {f.newsletterButton}
              </button>
            </form>
          </div>
        </Reveal>
      </div>

      {/* ── Middle: brand + columns ── */}
      <div
        className="container-x"
        style={{
          position: 'relative',
          zIndex: 5,
          paddingTop: 'clamp(40px, 5vw, 56px)',
          paddingBottom: 'clamp(32px, 4vw, 48px)',
        }}
      >
        <Reveal
          stagger
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 'clamp(28px, 4vw, 56px)',
          }}
        >
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <FooterLogo />
              <span
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#2D1510',
                  letterSpacing: '-0.02em',
                }}
              >
                BabyJourney<span style={{ color: '#B25168' }}>.Life</span>
              </span>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: '#5C3D35',
                lineHeight: 1.6,
                marginBottom: 22,
                maxWidth: 320,
              }}
            >
              {f.brandIntro}
            </p>

            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#9B7050',
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {f.followUs}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['instagram', 'tiktok', 'pinterest', 'mail'] as const).map((n) => (
                  <a
                    key={n}
                    href="#"
                    aria-label={n}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'rgba(255,253,245,0.9)',
                      border: '1px solid rgba(178,81,104,0.18)',
                      color: '#7B3545',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.25s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'linear-gradient(135deg, #B25168, #7B3545)';
                      el.style.color = '#fff';
                      el.style.transform = 'translateY(-2px)';
                      el.style.boxShadow = '0 8px 18px rgba(110,35,55,0.32)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(255,253,245,0.9)';
                      el.style.color = '#7B3545';
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <SocialIcon name={n} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterColumn
            title={f.colProduct}
            items={[f.links.features, f.links.pricing, f.links.demo, f.links.faq]}
          />
          <FooterColumn
            title={f.colCompany}
            items={[f.links.about, f.links.story, f.links.press, f.links.careers]}
          />
          <FooterColumn
            title={f.colSupport}
            items={[f.links.help, f.links.contact, f.links.email, f.links.gdpr]}
          />
        </Reveal>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          background: 'linear-gradient(90deg, #2A1015 0%, #1B0A0E 100%)',
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        <Reveal
          variant="up"
          className="container-x"
          style={{
            paddingBlock: 'clamp(16px, 2vw, 22px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <span
            style={{
              fontSize: '12.5px',
              opacity: 0.7,
              letterSpacing: '0.02em',
            }}
          >
            {f.copy}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E89BA8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              {f.encrypted}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{f.yours}</span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {langs.map((l, i) => (
                <span key={l.code} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => setLang(l.code)}
                    style={{
                      padding: 0,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: lang === l.code ? 800 : 500,
                      color: lang === l.code ? '#E89BA8' : 'rgba(255,255,255,0.7)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {l.label}
                  </button>
                  {i < langs.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-caveat), cursive',
              color: '#E89BA8',
              letterSpacing: '0.02em',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            {f.madeWith}
          </span>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
          .footer-newsletter {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-form { flex-direction: column; border-radius: 18px !important; padding: 6px !important; }
          .footer-form input { padding: 12px 14px !important; }
          .footer-form button { width: 100%; }
        }
      `}</style>
    </footer>
  );
}
