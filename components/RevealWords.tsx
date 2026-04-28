'use client';
import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

/**
 * Splits a piece of text into word-spans, each animating in with a small
 * cascading delay when the wrapper enters the viewport. Use for big
 * headlines where each word should feel hand-placed.
 *
 * Pass `accent` to mark a word as accented (e.g. the Caveat handwritten
 * highlight). Pass `accentBefore` text to break before the accent and
 * `accentAfter` to continue after. For simple cases, just pass `text`.
 */
export default function RevealWords({
  text,
  segments,
  className = '',
  style,
  as = 'span',
  staggerMs = 70,
  delay = 0,
}: {
  /** Plain text — split on spaces. Newlines `\n` become <br/>. */
  text?: string;
  /** Or pass pre-split segments for mixed plain/accent words. */
  segments?: Array<string | { text: string; render: (t: string) => ReactNode }>;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  staggerMs?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setVisible(true);
      setArmed(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
    if (alreadyInView) {
      setVisible(true);
      setArmed(true);
      return;
    }
    const armRaf = requestAnimationFrame(() => setArmed(true));
    const fallback = window.setTimeout(() => setVisible(true), 700);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setVisible(true), delay);
            obs.disconnect();
            window.clearTimeout(fallback);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => {
      cancelAnimationFrame(armRaf);
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, [delay]);

  const Tag = as as any;

  // Build the word list. Each segment becomes one or more words.
  const items: Array<{ key: string; node: ReactNode; isBreak?: boolean }> = [];
  let idx = 0;
  const pushText = (raw: string, render?: (t: string) => ReactNode) => {
    const lines = raw.split('\n');
    lines.forEach((line, li) => {
      if (li > 0) items.push({ key: `br-${idx++}`, node: <br />, isBreak: true });
      const words = line.split(/(\s+)/).filter(Boolean);
      words.forEach((w) => {
        if (/^\s+$/.test(w)) {
          items.push({ key: `s-${idx++}`, node: w, isBreak: true });
        } else {
          items.push({
            key: `w-${idx++}`,
            node: render ? render(w) : w,
          });
        }
      });
    });
  };
  if (segments) {
    segments.forEach((seg) => {
      if (typeof seg === 'string') pushText(seg);
      else pushText(seg.text, seg.render);
    });
  } else if (text) {
    pushText(text);
  }

  // Assign animation delay to non-break items only
  let revealIndex = 0;
  return (
    <Tag
      ref={ref as any}
      className={`${className} reveal-words ${armed && visible ? 'is-visible' : ''} ${armed && !visible ? 'is-armed' : ''}`}
      style={style}
    >
      {items.map((it) => {
        if (it.isBreak) return <span key={it.key}>{it.node}</span>;
        const i = revealIndex++;
        return (
          <span
            key={it.key}
            className="reveal-word"
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {it.node}
          </span>
        );
      })}
    </Tag>
  );
}
