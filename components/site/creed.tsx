'use client';

import { Ban, ScrollText, Scale, Target } from 'lucide-react';
import { Reveal, Scramble } from './anim';
import { CompassRose } from './primitives';
import { PRINCIPLES } from '@/lib/data';

const MARKS = [Ban, Scale, ScrollText, Target];

/** The editorial line — dark, loud, and unmissable. */
export default function Creed() {
  return (
    <section className="on-dark-band relative isolate overflow-hidden bg-ink text-background" aria-labelledby="creed-h">
      <div className="h-1.5 w-full hazard opacity-90" aria-hidden="true" />
      <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 15% 0%, hsl(var(--lime) / 0.5) 0%, transparent 45%), radial-gradient(ellipse at 88% 100%, hsl(var(--survey) / 0.55) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-8xl gap-12 px-gutter py-stack lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label-plate flex items-center gap-3 text-background/60">
              <span className="h-px w-8 bg-lime" aria-hidden="true" />
              <Scramble text="EDITORIAL POLICY" />
            </p>
            <h2 id="creed-h" className="font-serif-display mt-5 text-display-3 font-semibold leading-[1.02]">
              Four refusals, <span className="italic text-lime">kept</span> in writing.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-measure text-background/70">
              Most waste websites exist to move a transaction. This one exists to move an observation. That difference
              is the whole product, so it is stated as policy rather than implied as tone.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <CompassRose className="h-16 w-16 text-background/45" spinning />
              <p className="label-plate max-w-[16ch] text-background/50">
                North is a convention. Evidence is not.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="grid gap-px self-stretch bg-background/15 sm:grid-cols-2 lg:col-span-7">
          {PRINCIPLES.map((p, i) => {
            const Mark = MARKS[i % MARKS.length];
            return (
              <Reveal as="li" key={p.label} delay={i * 90} className="group relative bg-ink">
                <div className="relative flex h-full flex-col gap-3 p-6 transition-colors duration-500 group-hover:bg-background/[0.05] sm:p-7">
                  <span
                    className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-lime transition-transform duration-700 ease-expo group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between">
                    <Mark className="h-5 w-5 text-lime" aria-hidden="true" />
                    <span className="num text-[0.7rem] text-background/35">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-serif-display text-[1.3rem] font-semibold leading-tight">{p.label}</h3>
                  <p className="text-[0.85rem] leading-relaxed text-background/65">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-gutter py-4">
          <p className="label-plate text-background/45">Static public resource · No accounts · No cookies set by this page</p>
          <p className="label-plate text-background/45">Corrections are published, not swallowed</p>
        </div>
      </div>
    </section>
  );
}
