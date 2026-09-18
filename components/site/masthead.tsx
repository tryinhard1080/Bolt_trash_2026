'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { useActiveSection, useScrollProgress } from './anim';

const NAV = [
  { id: 'method', label: 'Method' },
  { id: 'guides', label: 'Guides' },
  { id: 'atlas', label: 'Atlas' },
  { id: 'streams', label: 'Streams' },
  { id: 'walk', label: 'Site walk' },
  { id: 'directory', label: 'Directory' },
  { id: 'evidence', label: 'Evidence' },
];

export const SECTION_IDS = NAV.map((n) => n.id);

export default function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isDark = mounted && resolvedTheme === 'dark';
  const floating = !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 no-print transition-[background-color,box-shadow,border-color,color] duration-500 ease-plate ${
        floating
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-rule bg-background/85 shadow-paper backdrop-blur-xl supports-[backdrop-filter]:bg-background/70'
      }`}
    >
      <div className="mx-auto flex max-w-8xl items-center justify-between gap-6 px-gutter py-3">
        {/* Identity */}
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="The Trash Hub — back to top"
        >
          <span
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-plate border transition-colors duration-500 ${
              floating ? 'border-background/40 bg-background/10 text-background backdrop-blur-md' : 'border-ink/25 bg-lime/90 text-ink'
            }`}
          >
            <span className="font-serif-display text-[0.95rem] font-bold leading-none tracking-tight">TH</span>
            <span
              className={`absolute -bottom-1 -right-1 h-2 w-2 rounded-full ring-2 ${
                floating ? 'bg-lime ring-background/20' : 'bg-lime ring-background'
              }`}
              aria-hidden="true"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={`font-serif-display text-[1.05rem] font-semibold tracking-tight transition-colors duration-500 sm:text-[1.15rem] ${
                floating ? 'text-background' : 'text-ink'
              }`}
            >
              The Trash Hub
            </span>
            <span
              className={`label-plate mt-1 hidden text-[0.58rem] sm:block ${
                floating ? 'text-background/60' : 'text-muted-foreground'
              }`}
            >
              A visual field guide to waste
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Sections">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative rounded-plate px-3 py-2 text-[0.8rem] font-medium transition-colors duration-300 ${
                  floating
                    ? isActive
                      ? 'text-background'
                      : 'text-background/65 hover:text-background'
                    : isActive
                      ? 'text-ink'
                      : 'text-muted-foreground hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-1 left-3 right-3 h-px origin-left bg-lime transition-transform duration-500 ease-expo ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className={`label-plate mr-1 hidden xl:inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
              floating ? 'border-background/25 text-background/75' : 'border-rule text-muted-foreground'
            }`}
          >
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-lime" aria-hidden="true" />
            Ed. 2026·Q3
          </span>

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to day surface' : 'Switch to night surface'}
            className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300 ${
              floating
                ? 'border-background/30 text-background hover:bg-background/15'
                : 'border-rule text-ink hover:bg-muted'
            }`}
          >
            <Sun
              className={`absolute h-4 w-4 transition-all duration-500 ease-spring ${
                isDark ? 'translate-y-6 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'
              }`}
              aria-hidden="true"
            />
            <Moon
              className={`absolute h-4 w-4 transition-all duration-500 ease-spring ${
                isDark ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-6 -rotate-90 opacity-0'
              }`}
              aria-hidden="true"
            />
          </button>

          <a
            href="#ask"
            className={`hidden min-h-11 items-center gap-1.5 rounded-plate px-4 py-2.5 text-[0.8rem] font-semibold transition-all duration-300 sm:inline-flex ${
              floating ? 'bg-background text-ink hover:bg-lime' : 'bg-ink text-background hover:bg-lime hover:text-ink'
            }`}
          >
            Ask locally
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors lg:hidden ${
              floating ? 'border-background/30 text-background' : 'border-rule text-ink'
            }`}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <div className="relative h-px w-full bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-lime transition-[width] duration-150 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-rule bg-background transition-[max-height,opacity] duration-500 ease-plate lg:hidden ${
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto grid max-w-8xl gap-1 px-gutter py-4" aria-label="Sections, mobile">
          {NAV.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-rule py-3 text-sm font-medium text-ink last:border-0"
            >
              <span>
                <span className="num mr-3 text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </a>
          ))}
          <Link
            href="/studies"
            className="label-plate mt-2 inline-flex items-center gap-2 self-start rounded-full border border-rule px-3 py-2 text-muted-foreground"
          >
            Design studies
          </Link>
        </nav>
      </div>
    </header>
  );
}
