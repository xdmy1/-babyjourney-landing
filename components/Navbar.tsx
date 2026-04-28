'use client';
import { useLang } from '@/lib/langContext';
import { Lang } from '@/lib/translations';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const langs: { code: Lang; label: string }[] = [
    { code: 'ro', label: 'RO' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2">
        {/* Heart icon */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="rgba(255,255,255,0.5)" />
          <path
            d="M14 21C14 21 6 16.5 6 11.2C6 8.88 7.79 7 10 7C11.5 7 12.83 7.82 13.5 9.04C14.17 7.82 15.5 7 17 7C19.21 7 21 8.88 21 11.2C21 16.5 14 21 14 21Z"
            fill="#7B3545"
          />
        </svg>
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ fontFamily: 'var(--font-display), sans-serif', color: '#2D1510' }}
        >
          {t.nav.logo}
        </span>
      </a>

      {/* Lang switcher */}
      <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-1 py-1 border border-white/60">
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: lang === l.code ? '#7B3545' : 'transparent',
              color: lang === l.code ? '#fff' : '#5C3D35',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
