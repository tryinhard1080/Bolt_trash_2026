'use client';

import { useState } from 'react';
import { Check, CircleSlash, FlaskConical, Info } from 'lucide-react';
import { Reveal, useInView } from './anim';
import { SectionHead, SectionShell, Tag } from './primitives';
import { COMPOSITION, STREAMS } from '@/lib/data';

const TONE_BY_STREAM: Record<string, string> = {
  fiber: '206 52% 40%',
  organics: '148 38% 34%',
  containers: '38 74% 48%',
  metals: '160 10% 45%',
  glass: '172 44% 40%',
  special: '280 32% 45%',
  residual: '160 8% 62%',
};

const DISPOSAL = [
  { label: 'Recycled & composted', value: 32.1, tone: 'var(--lime)' },
  { label: 'Combusted with energy recovery', value: 17.9, tone: 'var(--survey)' },
  { label: 'Landfilled', value: 50.0, tone: 'hsl(var(--ink) / 0.45)' },
];

function CompositionBars() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const max = Math.max(...COMPOSITION.map((c) => c.value));
  return (
    <div ref={ref} className="mt-6 space-y-2.5">
      {COMPOSITION.map((row, i) => (
        <div key={row.material} className="group grid grid-cols-[8.5rem_1fr_3.2rem] items-center gap-3 sm:grid-cols-[11rem_1fr_3.6rem]">
          <span className="truncate text-[0.78rem] text-foreground" title={row.material}>
            {row.material}
          </span>
          <span className="relative h-5 overflow-hidden rounded-[2px] bg-muted/60">
            <span
              className="absolute inset-y-0 left-0 origin-left rounded-[2px] transition-[width] duration-1200 ease-plate group-hover:brightness-110"
              style={{
                width: inView ? `${(row.value / max) * 100}%` : '0%',
                transitionDelay: `${i * 65}ms`,
                background: `hsl(${TONE_BY_STREAM[row.stream]})`,
              }}
            />
            <span className="absolute inset-y-0 left-0 w-full rule-x opacity-40" aria-hidden="true" />
          </span>
          <span className="num text-right text-[0.78rem] text-muted-foreground">{row.value.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
}

function DisposalRing() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const R = 54;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="relative">
        <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90" role="img" aria-label="Where the 292.4 million tons went: 32.1% recycled and composted, 17.9% combusted with energy recovery, 50% landfilled.">
          <circle cx="70" cy="70" r={R} fill="none" stroke="hsl(var(--rule))" strokeWidth="16" />
          {DISPOSAL.map((d, i) => {
            const len = (d.value / 100) * C;
            const dash = `${inView ? len : 0} ${C}`;
            const el = (
              <circle
                key={d.label}
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke={`hsl(${d.tone})`}
                strokeWidth="16"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                style={{ transition: `stroke-dasharray 1100ms cubic-bezier(0.16,1,0.3,1) ${i * 160}ms` }}
              />
            );
            offset += len + 1.5;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="num text-[1.6rem] font-medium leading-none text-ink">292.4</span>
          <span className="label-plate mt-1 text-muted-foreground">M tons</span>
        </div>
      </div>
      <ul className="space-y-1.5 text-left">
        {DISPOSAL.map((d) => (
          <li key={d.label} className="flex items-baseline gap-2 text-[0.78rem]">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[1px]" style={{ background: `hsl(${d.tone})` }} aria-hidden="true" />
            <span className="text-foreground">{d.label}</span>
            <span className="num text-muted-foreground">{d.value.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Streams() {
  const [active, setActive] = useState(0);
  const stream = STREAMS[active];

  return (
    <SectionShell id="streams" index="04" label="MATERIAL STREAMS" texture="blueprint">
      <Reveal>
        <SectionHead
          index="04"
          kicker="Material streams"
          title={<span id="streams-h">Six streams, and the reason each one fails.</span>}
          lead="Recognition is not memory, it is a set of physical tests. Select a stream to see what is accepted, what is commonly mistaken for it, and the one-field test that settles it."
          right={<Tag tone="blue">EPA 2018 composition</Tag>}
        />
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* selector */}
        <div className="lg:col-span-5">
          <ul className="overflow-hidden rounded-plate border border-rule">
            {STREAMS.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`group relative flex w-full items-center gap-4 border-b border-rule px-4 py-4 text-left transition-colors duration-300 last:border-b-0 ${
                      isActive ? 'bg-ink text-background' : 'bg-card hover:bg-paper-deep'
                    }`}
                  >
                    <span
                      className="h-8 w-8 shrink-0 rounded-[2px] border transition-transform duration-500 ease-spring group-hover:scale-110"
                      style={{ background: `hsl(${s.tone})`, borderColor: isActive ? 'hsl(var(--background) / 0.3)' : 'hsl(var(--rule))' }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className={`font-serif-display block text-[1.02rem] font-semibold ${isActive ? 'text-background' : 'text-ink'}`}>
                        {s.name}
                      </span>
                      <span className={`block truncate text-[0.76rem] ${isActive ? 'text-background/70' : 'text-muted-foreground'}`}>
                        {s.test}
                      </span>
                    </span>
                    <span className={`num shrink-0 text-[0.78rem] ${isActive ? 'text-lime' : 'text-muted-foreground'}`}>{s.shareLabel}</span>
                    <span
                      className={`absolute inset-y-0 left-0 w-[3px] bg-lime transition-transform duration-500 ease-expo ${
                        isActive ? 'scale-y-100' : 'scale-y-0'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="label-plate mt-3 text-muted-foreground">
            Percentages are each stream’s share of U.S. MSW generation, 2018. Food and yard are shown together.
          </p>
        </div>

        {/* detail */}
        <div className="lg:col-span-7">
          <Reveal variant="scale" className="h-full">
            <div className="flex h-full flex-col rounded-plate border border-rule bg-card shadow-paper">
              <div className="flex items-start justify-between gap-4 border-b border-rule px-6 py-5">
                <div>
                  <p className="label-plate text-muted-foreground">Stream {String(active + 1).padStart(2, '0')} · recognition key</p>
                  <h3 className="font-serif-display mt-2 text-display-1 font-semibold text-ink">{stream.name}</h3>
                </div>
                <span
                  className="h-12 w-12 shrink-0 rounded-plate border border-rule shadow-paper"
                  style={{ background: `hsl(${stream.tone})` }}
                  aria-hidden="true"
                />
              </div>

              <div className="grid flex-1 gap-px bg-rule sm:grid-cols-2">
                <div className="bg-card p-5">
                  <p className="label-plate inline-flex items-center gap-2 text-ok">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" /> Usually accepted
                  </p>
                  <ul className="mt-3 space-y-2">
                    {stream.accepted.map((a) => (
                      <li key={a} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-foreground">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-ok" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-5">
                  <p className="label-plate inline-flex items-center gap-2 text-rust">
                    <CircleSlash className="h-3.5 w-3.5" aria-hidden="true" /> Commonly mistaken for it
                  </p>
                  <ul className="mt-3 space-y-2">
                    {stream.rejects.map((r) => (
                      <li key={r} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-foreground">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-rust" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-px border-t border-rule bg-rule sm:grid-cols-[1.35fr_1fr]">
                <div className="bg-paper-deep p-5">
                  <p className="label-plate inline-flex items-center gap-2 text-survey">
                    <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" /> Field test
                  </p>
                  <p className="font-serif-display mt-2.5 text-[1.05rem] leading-snug text-ink">{stream.test}</p>
                </div>
                <div className="bg-paper-deep p-5">
                  <p className="label-plate inline-flex items-center gap-2 text-muted-foreground">
                    <Info className="h-3.5 w-3.5" aria-hidden="true" /> Why it matters
                  </p>
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-muted-foreground">{stream.note}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* data plate */}
      <div className="mt-14 grid gap-6 rounded-plate border border-rule bg-card p-6 shadow-paper lg:grid-cols-12 lg:p-8">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-plate text-muted-foreground">Composition of generated MSW</p>
              <h3 className="font-serif-display mt-2 text-[1.35rem] font-semibold text-ink">
                What the bin holds, nationally
              </h3>
            </div>
            <p className="label-plate max-w-[34ch] text-right text-muted-foreground">
              Share of 292.4 M tons, 2018 · EPA materials table
            </p>
          </div>
          <CompositionBars />
        </div>
        <div className="border-rule lg:col-span-4 lg:border-l lg:pl-8">
          <p className="label-plate text-muted-foreground">End destination</p>
          <h3 className="font-serif-display mt-2 text-[1.35rem] font-semibold text-ink">Where it went</h3>
          <div className="mt-5">
            <DisposalRing />
          </div>
          <p className="label-plate mt-5 text-muted-foreground/80">
            Combustion figure derived from published totals; shown for reading the ledger, not as a facility claim.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
