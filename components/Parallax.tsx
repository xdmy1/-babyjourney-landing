'use client';
import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

/**
 * Wraps content and translates it on Y as the user scrolls, creating a
 * parallax depth effect. The transform is tied to the element's distance
 * from viewport center, so different `factor` values produce different
 * apparent depths. rAF-throttled, IntersectionObserver-gated (no work done
 * when off-screen). Disabled by `prefers-reduced-motion`.
 */
export default function Parallax({
  children,
  factor = 0.2,
  className = '',
  style,
}: {
  children: ReactNode;
  /** Higher = more apparent motion. 0.1 subtle, 0.3 obvious, 0.5 extreme. */
  factor?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    let inView = false;

    const update = () => {
      raf = 0;
      if (!inView || !el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const delta = center - window.innerHeight / 2;
      const offset = -delta * factor;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting;
          if (inView) update();
        }
      },
      { rootMargin: '40% 0px 40% 0px' }
    );
    obs.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: 'transform' }}>
      {children}
    </div>
  );
}
