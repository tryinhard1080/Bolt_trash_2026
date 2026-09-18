'use client';

import { useEffect, useRef, useState } from 'react';

/** Shared motion utilities: scroll reveals, count-ups, scramble titles. */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  repeat?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.16,
  rootMargin = '0px 0px -8% 0px',
  repeat = false,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) io.disconnect();
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, repeat]);

  return { ref, inView } as const;
}

type Tag = 'div' | 'section' | 'li' | 'article' | 'figure' | 'header' | 'footer' | 'p' | 'span';

export function Reveal({
  children,
  as = 'div',
  delay = 0,
  variant = '',
  className = '',
  threshold,
}: {
  children: React.ReactNode;
  as?: Tag;
  delay?: number;
  variant?: '' | 'left' | 'right' | 'scale' | 'clip';
  className?: string;
  threshold?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const Element = as as 'div';
  const variantClass =
    variant === 'left'
      ? 'reveal-left'
      : variant === 'right'
        ? 'reveal-right'
        : variant === 'scale'
          ? 'reveal-scale'
          : variant === 'clip'
            ? 'reveal-clip'
            : '';
  return (
    <Element
      ref={ref}
      className={`reveal ${variantClass} ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Element>
  );
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·#';

/** Scramble-decode a short string once it scrolls into view. */
export function Scramble({ text, className = '', speed = 34 }: { text: string; className?: string; speed?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    const total = text.length * 2 + 6;
    const id = window.setInterval(() => {
      frame += 1;
      const progress = frame / total;
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i / text.length < progress) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setOut(next);
      if (frame >= total) {
        setOut(text);
        window.clearInterval(id);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [inView, reduced, text, speed]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/** Count from 0 to `value` on reveal. */
export function CountUp({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1400,
  className = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={`num ${className}`}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Normalised scroll progress of the document, 0 → 1. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

/** Tracks which of several section ids is currently in the reading position. */
export function useActiveSection(ids: string[], offset = 140) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    const onScroll = () => {
      let current: string | null = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);
  return active;
}
