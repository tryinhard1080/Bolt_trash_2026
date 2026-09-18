'use client';

import { ArrowUp, ArrowUpRight, FileDiff, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Reveal } from './anim';
import { ScaleBar } from './primitives';

const INDEX = [
  { id: 'method', label: 'Method', n: '01' },
  { id: 'guides', label: 'Guide library', n: '02' },
  { id: 'atlas', label: 'Visual atlas', n: '03' },
  { id: 'streams', label: 'Material streams', n: '04' },
  { id: 'walk', label: 'Site-walk card', n: '05' },
  { id: 'directory', label: 'Supplier directory', n: '06' },
  { id: 'evidence', label: 'Evidence ledger', n: '07' },
  { id: 'ask', label: 'Ask locally', n: '08' },
];

const SWATCHES = [
  { name: 'Paper', token: '--card', css: 'hsl(45 44% 98%)' },
  { name: 'Ink', token: '--ink', css: 'hsl(160 24% 15%)' },
  { name: 'Survey lime', token: '--lime', css: 'hsl(74 74% 49%)' },
  { name: 'Cartographic', token: '--survey', css: 'hsl(206 52% 33%)' },
  { name: 'Warning rust', token: '--rust', css: 'hsl(14 58% 41%)' },
];

export default function Colophon() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-rule bg-paper-deep" role="contentinfo">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-8xl px-gutter">
        {/* giant wordmark */}
        <div className="flex items-end justify-between gap-6 border-b border-rule py-10">
          <h2 className="font-serif-display select-none text-[clamp(2.2rem,8.5vw,6.4rem)] font-semibold leading-[0.86] tracking-tightest text-ink">
            The Trash&nbsp;Hub
          </h2>
          <p className="label-plate hidden shrink-0 pb-3 text-right text-muted-foreground sm:block">
            Vol. 1 · No. 4
            <br />
            Edition 2026·Q3
          </p>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label-plate text-muted-foreground">About this edition</p>
              <p className="mt-4 max-w-[42ch] text-[0.9rem] leading-measure text-foreground/85">
                A public visual resource library and a public-fact supplier directory for waste systems. Static,
                source-first, and written so that a reader can reproduce every observation on their own street.
              </p>
              <p className="mt-4 text-[0.9rem] leading-measure text-muted-foreground">
                Corrections are welcome and are published with the date they were made. Send the record, not the
                opinion.
              </p>
              <a
                href="#guides"
                className="btn-ink mt-6 !min-h-11 text-[0.82rem]"
              >
                Start with the guides
              </a>
            </Reveal>
          </div>

          <nav className="lg:col-span-3" aria-label="Section index">
            <p className="label-plate text-muted-foreground">Index</p>
            <ul className="mt-4 space-y-1.5">
              {INDEX.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-baseline gap-3 py-1 text-[0.9rem] text-foreground transition-colors hover:text-ink"
                  >
                    <span className="num text-[0.7rem] text-muted-foreground transition-colors group-hover:text-lime">{item.n}</span>
                    <span className="border-b border-transparent pb-0.5 transition-[border-color] group-hover:border-lime">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-5">
            <p className="label-plate text-muted-foreground">Colophon</p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-plate border border-rule bg-card p-4">
                <dt className="label-plate text-muted-foreground">Typefaces</dt>
                <dd className="mt-2 space-y-1.5 text-[0.85rem]">
                  <p className="font-serif-display text-ink">Source Serif 4 — display</p>
                  <p className="font-sans text-ink">Inter — text and interface</p>
                  <p className="font-mono-id text-ink">JetBrains Mono — ids, data</p>
                </dd>
              </div>
              <div className="rounded-plate border border-rule bg-card p-4">
                <dt className="label-plate text-muted-foreground">Palette</dt>
                <dd className="mt-2 space-y-1.5">
                  {SWATCHES.map((s) => (
                    <span key={s.name} className="flex items-center gap-2.5 text-[0.78rem]">
                      <span className="h-3.5 w-3.5 shrink-0 rounded-[2px] border border-rule" style={{ background: s.css }} aria-hidden="true" />
                      <span className="text-foreground">{s.name}</span>
                      <span className="num ml-auto text-[0.68rem] text-muted-foreground">{s.token}</span>
                    </span>
                  ))}
                </dd>
              </div>
              <div className="rounded-plate border border-rule bg-card p-4 sm:col-span-2">
                <dt className="label-plate text-muted-foreground">Build notes</dt>
                <dd className="mt-2 grid gap-x-6 gap-y-1.5 text-[0.8rem] text-muted-foreground sm:grid-cols-2">
                  <p>
                    Next.js 13 App Router · Tailwind tokens · no client analytics, no cookies, no third-party
                    requests.
                  </p>
                  <p>
                    Images are AVIF/WebP plates, served responsively. Reduced-motion and print stylesheets included —
                    the field card is designed for paper.
                  </p>
                </dd>
                <dd className="mt-3 flex flex-wrap items-center gap-4">
                  <a
                    href="/studies"
                    className="label-plate inline-flex items-center gap-2 rounded-full border border-rule bg-paper-deep px-3 py-1.5 text-ink transition-colors hover:border-ink"
                  >
                    <FileDiff className="h-3.5 w-3.5" aria-hidden="true" /> Design studies (3 surfaces)
                  </a>
                  <ScaleBar />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule py-5">
          <p className="label-plate flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span>© 2026 The Trash Hub</span>
            <span className="hidden h-3 w-px bg-rule sm:block" aria-hidden="true" />
            <span>No marketplace</span>
            <span className="hidden h-3 w-px bg-rule sm:block" aria-hidden="true" />
            <span>No rankings</span>
            <span className="hidden h-3 w-px bg-rule sm:block" aria-hidden="true" />
            <span>No lead capture</span>
          </p>
          <p className="label-plate inline-flex items-center gap-2 text-muted-foreground">
            Built for readers who check
            <Heart className="h-3 w-3 text-rust" aria-hidden="true" />
            <a
              href="https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink underline decoration-lime decoration-2 underline-offset-4 hover:text-survey"
            >
              EPA data <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`no-print fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-card text-ink shadow-lifted transition-all duration-500 ease-expo hover:-translate-y-0.5 hover:bg-ink hover:text-background max-lg:hidden ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
        aria-label="Back to top"
        tabIndex={show ? 0 : -1}
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
    </footer>
  );
}
