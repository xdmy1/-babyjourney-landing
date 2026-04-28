import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque, Caveat } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/lib/langContext';

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-body',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const caveat = Caveat({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BabyJourney.Life — Every Memory. One Private Place.',
  description: "Safely capture your child's journey from first smile to first steps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${bricolage.variable} ${caveat.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-body), sans-serif' }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
