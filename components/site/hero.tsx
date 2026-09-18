'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpenCheck, MapPin, ShieldCheck } from 'lucide-react';
import { CountUp, useReducedMotion } from './anim';
import { Photo } from './photo';
import { STATS } from '@/lib/data';

const PINS = [
  {
    id: 'residual',
    n: '01',
    x: 21,
    y: 62,
    title: 'Black lid · residual',
    body: 'Whatever the district will not take. Fullness here is the clearest signal about the other two.',
  },
  {
    id: 'dry',
    n: '02',
    x: 44,
    y: 58,
    title: 'Green lid · dry recycling',
    body: 'Single-stream: fiber, containers and metals share one truck and one sort. Moisture is the enemy.',
  },
  {
    id: 'organics',
    n: '03',
    x: 65,
    y: 58,
    title: 'Brown lid · organics',
    body: 'Food and yard material. Where no brown cart exists, this share of generation goes to landfill.',
  },
];

export default function Hero() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Gentle parallax on the photo layer only; skipped for reduced motion.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) setOffset(y * 0.14);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      id="top"
      ref={ref}
      className="on-dark-band relative isolate flex min-h-[86vh] flex-col overflow-hidden bg-ink"
      aria-labelledby="hero-title"
    >
      {/* photographic layer */}
      <div className="absolute inset-0 -z-20" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <Photo
          name="field-guide-hero"
          eager
          cover
          alt="Three wheeled bins set out at the kerb in front of a brick multifamily block on a wet, overcast morning"
          sizes="100vw"
          imgClassName="ken scale-[1.06]"
          style={{ height: '100%', transform: 'scale(1.06)' }}
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(100deg, hsl(var(--scrim) / 0.94) 0%, hsl(var(--scrim) / 0.72) 34%, hsl(var(--scrim) / 0.28) 62%, hsl(var(--scrim) / 0.62) 100%),
            linear-gradient(to top, hsl(var(--scrim) / 0.96) 0%, transparent 48%)`,
        }}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(0 0% 100% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.5) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'radial-gradient(ellipse at 78% 62%, #000 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 78% 62%, #000 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* masthead line inside the plate */}
      <div className="mx-auto flex w-full max-w-8xl shrink-0 items-center justify-between px-gutter pt-6 text-background/70 lg:pt-8">
        <p className="label-plate flex items-center gap-3">
          <span className="h-px w-8 bg-lime" aria-hidden="true" />
          Field guide · Vol. 1 · No. 4
        </p>
        <p className="label-plate hidden sm:block">Evidence first · Ratings never</p>
      </div>

      <div className="mx-auto grid w-full max-w-8xl flex-1 grid-cols-1 items-center gap-12 px-gutter pb-14 pt-20 sm:pt-24 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-32">
        <div className="lg:col-span-8">
          <div className="mb-7 flex flex-wrap items-center gap-2.5">
            <span className="label-plate inline-flex items-center gap-2 rounded-full border border-lime/50 bg-lime/15 px-3 py-1.5 text-lime backdrop-blur-sm">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              Recognise the place
            </span>
            <span className="label-plate hidden items-center gap-2 rounded-full border border-background/25 px-3 py-1.5 text-background/75 backdrop-blur-sm sm:inline-flex">
              9 guides · 6 streams · 7 public records
            </span>
          </div>

          <h1
            id="hero-title"
            className="font-serif-display text-display-4 font-semibold text-background text-shadow-hero"
          >
            <span className="mask-line">
              <span style={{ animationDelay: '80ms' }}>Recognise the system</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: '210ms' }} className="italic text-lime">
                in front of your building.
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-[52ch] text-lead leading-measure text-background/80">
            The Trash Hub is a public visual field guide to waste. It teaches the eye before it makes a claim:
            property-lifecycle guides, annotated plates, and a supplier directory of public facts only — no
            rankings, no endorsements, no lead capture.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#guides" className="btn-lime group">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              Open the guide library
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#directory" className="btn-ghost-ink text-background">
              Supplier directory
            </a>
          </div>

          <p className="label-plate mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-background/55">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-lime" aria-hidden="true" />
              Every figure carries a source ID
            </span>
            <span className="hidden h-3 w-px bg-background/25 sm:block" aria-hidden="true" />
            <span>Reviewed 2026-09-10</span>
          </p>
        </div>

        {/* annotated pins */}
        <div className="relative hidden lg:col-span-4 lg:block">
          <ul className="space-y-2.5" aria-label="Reading the photograph">
            {PINS.map((pin) => {
              const isActive = activePin === pin.id;
              return (
                <li key={pin.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActivePin(pin.id)}
                    onMouseLeave={() => setActivePin(null)}
                    onFocus={() => setActivePin(pin.id)}
                    onBlur={() => setActivePin(null)}
                    className={`group flex w-full items-start gap-3 rounded-plate border p-3 text-left backdrop-blur-md transition-all duration-500 ease-plate ${
                      isActive
                        ? 'border-lime/70 bg-lime/15 shadow-glow'
                        : 'border-background/20 bg-background/[0.06] hover:border-background/40'
                    }`}
                    aria-expanded={isActive}
                  >
                    <span
                      className={`num mt-0.5 text-[0.7rem] transition-colors ${isActive ? 'text-lime' : 'text-background/50'}`}
                    >
                      {pin.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.85rem] font-semibold text-background">{pin.title}</span>
                      <span
                        className={`mt-1 block max-h-0 overflow-hidden text-[0.78rem] leading-relaxed text-background/75 transition-all duration-500 ease-plate group-hover:max-h-24 group-focus-visible:max-h-24 ${
                          isActive ? 'max-h-24' : ''
                        }`}
                      >
                        {pin.body}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="label-plate mt-3 text-background/45">
            Lid colours vary by district. Read the rules on the sign, not the colour.
          </p>
        </div>
      </div>

      {/* data strip */}
      <div className="relative shrink-0 border-t border-background/15 bg-background/[0.04] backdrop-blur-sm">
        <dl className="mx-auto grid max-w-8xl grid-cols-2 gap-px px-gutter py-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-1 sm:px-4 sm:first:pl-0">
              <dd className="num flex items-baseline gap-1 text-[1.75rem] font-medium leading-none text-background sm:text-[2.1rem]">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-[0.8rem] font-medium text-background/85">{stat.label}</dt>
              <p className="label-plate mt-1 text-background/40">{stat.note}</p>
            </div>
          ))}
        </dl>
        <p className="label-plate border-t border-background/10 px-gutter py-2.5 text-background/40">
          Source: U.S. EPA, Advancing Sustainable Materials Management — 2018 data tables. National figures, not local ones.
        </p>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-[12rem] right-3 hidden w-6 flex-col items-center gap-3 xl:flex" aria-hidden="true">
        <span className="label-plate [writing-mode:vertical-rl] text-background/45">Scroll · Plate 01</span>
        <span className="relative h-24 w-px overflow-hidden bg-background/20">
          <span className="absolute inset-x-0 top-0 h-8 animate-scroll-cue bg-lime" />
        </span>
      </div>
    </section>
  );
}
