'use client';
import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'blur' | 'pop' | 'rise' | 'wipe' | 'wipe-up';

type Props = {
  children: ReactNode;
  stagger?: boolean;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

const variantClass: Record<RevealVariant, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  blur: 'reveal-blur',
  pop: 'reveal-pop',
  rise: 'reveal-rise',
  wipe: 'reveal-wipe',
  'wipe-up': 'reveal-wipe-up',
};

/**
 * Reveal-on-scroll wrapper.
 *
 * SSR / pre-hydration: renders with no reveal class so content is always
 * visible. After mount, if the element is below the fold, the reveal class
 * is armed (hidden state) and an IntersectionObserver releases it when the
 * element enters the viewport. Above-the-fold content skips the animation
 * entirely (no flash). 500ms fallback in case the observer never fires.
 */
export default function Reveal({
  children,
  stagger = false,
  variant = 'up',
  className = '',
  style,
  threshold = 0.18,
  rootMargin = '0px 0px -16% 0px',
  delay = 0,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

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
    // Only skip animation for content clearly above the fold at first paint
    // (tighter than before so more reveals fire on scroll).
    const alreadyInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
    if (alreadyInView) {
      setVisible(true);
      setArmed(true);
      return;
    }

    const armRaf = requestAnimationFrame(() => setArmed(true));
    const fallback = window.setTimeout(() => setVisible(true), 500);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const reveal = () => setVisible(true);
            if (delay > 0) window.setTimeout(reveal, delay);
            else reveal();
            obs.disconnect();
            window.clearTimeout(fallback);
          }
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);

    return () => {
      cancelAnimationFrame(armRaf);
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  const Tag = as as any;
  const base = stagger ? 'reveal-stagger' : variantClass[variant];
  const cls = [
    armed && !visible ? base : '',
    armed && visible ? `${base} is-visible` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref as any} className={cls} style={style}>
      {children}
    </Tag>
  );
}
