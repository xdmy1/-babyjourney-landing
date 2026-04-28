'use client';
import Image from 'next/image';
import { useLang } from '@/lib/langContext';
import Reveal from './Reveal';
import RevealWords from './RevealWords';
import Parallax from './Parallax';

function StatBadge({ stat, sub, delay = 0 }: { stat: string; sub: string; delay?: number }) {
  return (
    <Reveal
      variant="pop"
      delay={delay}
      threshold={0.25}
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 4,
        padding: '8px 14px 10px',
        background: 'rgba(255,253,245,0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.95)',
        borderRadius: 14,
        boxShadow: '0 8px 22px rgba(80,30,30,0.18)',
        maxWidth: 200,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(15px, 1.5vw, 19px)',
          color: '#7B3545',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          fontSize: '11.5px',
          color: '#7B5548',
          marginTop: 2,
          lineHeight: 1.3,
        }}
      >
        {sub}
      </div>
    </Reveal>
  );
}

export default function ProblemSection() {
  const { t } = useLang();
  const p: any = t.problem;

  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(180deg, #fdf5ec 0%, #fae9d9 60%, #f7decb 100%)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 30,
          left: -60,
          width: 280,
          height: 280,
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
          bottom: 20,
          right: -80,
          width: 320,
          height: 320,
          backgroundImage: 'url(/bg-blooms-right.png)',
          backgroundSize: 'cover',
          opacity: 0.35,
          mixBlendMode: 'soft-light',
          borderRadius: '50%',
          filter: 'blur(3px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-x" style={{ position: 'relative', zIndex: 5 }}>
        {/* Heading block */}
        <Reveal variant="blur" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            {p.kicker}
          </div>
          {(() => {
            const h = p.heading;
            const acc = p.headingAccent;
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
                  fontSize: 'clamp(30px, 4.6vw, 56px)',
                  maxWidth: 820,
                  margin: '0 auto 16px',
                }}
              />
            );
          })()}
          <p
            style={{
              color: '#7B5548',
              fontSize: 'clamp(15px, 1.2vw, 17.5px)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.55,
            }}
          >
            {p.subheading}
          </p>
        </Reveal>

        {/* BENTO: 1 big + 2 small */}
        <Reveal
          stagger
          className="problem-bento"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.45fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 'clamp(18px, 2.4vw, 24px)',
            marginBottom: 'clamp(40px, 5vw, 60px)',
          }}
        >
          {/* BIG — cracked phone (most dramatic) */}
          <article
            className="hover-lift problem-big"
            style={{
              gridRow: '1 / span 2',
              gridColumn: '1',
              position: 'relative',
              background: 'rgba(255,253,245,0.92)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 26,
              overflow: 'hidden',
              boxShadow:
                '0 14px 40px rgba(80,40,30,0.14), 0 4px 14px rgba(80,40,30,0.08)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'clamp(420px, 50vw, 580px)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                flex: 1,
                minHeight: 280,
                overflow: 'hidden',
              }}
            >
              <Parallax
                factor={0.16}
                style={{
                  position: 'absolute',
                  top: '-12%',
                  left: 0,
                  right: 0,
                  height: '124%',
                }}
              >
                <Image
                  src="/problem-phone.png"
                  alt="Cracked phone screen"
                  fill
                  sizes="(max-width: 760px) 90vw, 600px"
                  style={{ objectFit: 'cover' }}
                />
              </Parallax>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)',
                }}
              />
              <StatBadge stat={p.stat1} sub={p.stat1Sub} delay={250} />

              {/* Number watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 18,
                  fontFamily: 'var(--font-display), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 4.8vw, 60px)',
                  color: '#fff',
                  textShadow: '0 4px 18px rgba(80,30,30,0.5)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  opacity: 0.85,
                }}
              >
                01
              </div>

              {/* Bottom title overlay */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 'clamp(22px, 3vw, 32px) clamp(22px, 3vw, 32px) clamp(20px, 2.5vw, 26px)',
                  color: '#fff',
                }}
              >
                <h3
                  className="h-display"
                  style={{
                    fontSize: 'clamp(22px, 2.4vw, 32px)',
                    color: '#fff',
                    marginBottom: 8,
                    lineHeight: 1.1,
                  }}
                >
                  {p.label1}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    color: 'rgba(255,255,255,0.92)',
                    lineHeight: 1.55,
                    maxWidth: 460,
                  }}
                >
                  {p.desc1}
                </p>
              </div>
            </div>
          </article>

          {/* SMALL 2 — cloud */}
          <article
            className="hover-lift"
            style={{
              gridRow: '1',
              gridColumn: '2',
              position: 'relative',
              background: 'rgba(255,253,245,0.92)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow:
                '0 10px 28px rgba(80,40,30,0.12), 0 4px 12px rgba(80,40,30,0.06)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'clamp(200px, 24vw, 280px)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                flex: 1,
                minHeight: 140,
                overflow: 'hidden',
              }}
            >
              <Parallax
                factor={0.13}
                style={{ position: 'absolute', top: '-10%', left: 0, right: 0, height: '120%' }}
              >
                <Image
                  src="/problem-cloud.png"
                  alt="Cluttered cloud illustration"
                  fill
                  sizes="(max-width: 760px) 90vw, 360px"
                  style={{ objectFit: 'cover' }}
                />
              </Parallax>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.32) 100%)',
                }}
              />
              <StatBadge stat={p.stat2} sub={p.stat2Sub} delay={400} />

              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  fontFamily: 'var(--font-display), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  color: '#fff',
                  textShadow: '0 4px 14px rgba(80,30,30,0.5)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  opacity: 0.85,
                }}
              >
                02
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 'clamp(16px, 2vw, 22px)',
                  color: '#fff',
                }}
              >
                <h3
                  className="h-display"
                  style={{
                    fontSize: 'clamp(17px, 1.6vw, 21px)',
                    color: '#fff',
                    marginBottom: 4,
                    lineHeight: 1.1,
                  }}
                >
                  {p.label2}
                </h3>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'rgba(255,255,255,0.92)',
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc2}
                </p>
              </div>
            </div>
          </article>

          {/* SMALL 3 — album */}
          <article
            className="hover-lift"
            style={{
              gridRow: '2',
              gridColumn: '2',
              position: 'relative',
              background: 'rgba(255,253,245,0.92)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow:
                '0 10px 28px rgba(80,40,30,0.12), 0 4px 12px rgba(80,40,30,0.06)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'clamp(200px, 24vw, 280px)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                flex: 1,
                minHeight: 140,
                overflow: 'hidden',
              }}
            >
              <Parallax
                factor={0.13}
                style={{ position: 'absolute', top: '-10%', left: 0, right: 0, height: '120%' }}
              >
                <Image
                  src="/problem-album.png"
                  alt="Family photo book"
                  fill
                  sizes="(max-width: 760px) 90vw, 360px"
                  style={{ objectFit: 'cover' }}
                />
              </Parallax>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.32) 100%)',
                }}
              />
              <StatBadge stat={p.stat3} sub={p.stat3Sub} delay={550} />

              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  fontFamily: 'var(--font-display), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  color: '#fff',
                  textShadow: '0 4px 14px rgba(80,30,30,0.5)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  opacity: 0.85,
                }}
              >
                03
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 'clamp(16px, 2vw, 22px)',
                  color: '#fff',
                }}
              >
                <h3
                  className="h-display"
                  style={{
                    fontSize: 'clamp(17px, 1.6vw, 21px)',
                    color: '#fff',
                    marginBottom: 4,
                    lineHeight: 1.1,
                  }}
                >
                  {p.label3}
                </h3>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'rgba(255,255,255,0.92)',
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc3}
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Quote — clean centered pull-quote */}
        <Reveal
          variant="rise"
          style={{
            textAlign: 'center',
            maxWidth: 760,
            margin: 'clamp(28px, 4vw, 48px) auto 0',
            padding: '0 clamp(20px, 4vw, 40px)',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(13px, 1vw, 14px)',
              fontWeight: 600,
              color: '#9B7050',
              marginBottom: 18,
              fontStyle: 'italic',
            }}
          >
            {p.quote1.replace(/[:,]\s*$/, '')}
          </div>
          <p
            className="h-display"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 44px)',
              color: '#7B3545',
              lineHeight: 1.18,
              fontStyle: 'italic',
              fontWeight: 700,
              letterSpacing: '-0.015em',
            }}
          >
            “{p.quote2.replace(/[“”"']/g, '')}”
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .problem-bento {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .problem-bento > article:first-child {
            grid-row: auto !important;
            grid-column: auto !important;
            min-height: 380px !important;
          }
          .problem-bento > article {
            grid-row: auto !important;
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
