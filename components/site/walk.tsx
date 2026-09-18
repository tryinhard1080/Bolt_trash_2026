'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ClipboardCopy, Printer, RotateCcw, ShieldAlert } from 'lucide-react';
import { Reveal } from './anim';
import { SectionShell } from './primitives';
import { SITE_WALK } from '@/lib/data';
import { copyText } from '@/lib/clipboard';

const STORAGE_KEY = 'th.sitewalk.v2';

const ITEMS = SITE_WALK.flatMap((zone) => zone.items.map((item) => `${zone.zone}::${item.label}`));

interface WalkRecord {
  site: string;
  date: string;
  observer: string;
  weather: string;
}

const EMPTY_RECORD: WalkRecord = { site: '', date: '', observer: '', weather: '' };

export default function Walk() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [meta, setMeta] = useState<WalkRecord>(EMPTY_RECORD);
  const [restored, setRestored] = useState(false);
  const [today, setToday] = useState('');

  // Date is resolved after mount so server and client markup always agree.
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { checks?: Record<string, boolean>; meta?: WalkRecord };
      if (parsed?.checks) setChecked(parsed.checks);
      if (parsed?.meta) setMeta(parsed.meta);
      if (Object.keys(parsed?.checks ?? {}).length) setRestored(true);
    } catch {
      /* a corrupt entry is not worth a toast */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ checks: checked, meta }));
    } catch {
      /* private mode: the card still works in memory */
    }
  }, [checked, meta]);

  const done = useMemo(() => ITEMS.filter((k) => checked[k]).length, [checked]);
  const pct = Math.round((done / ITEMS.length) * 100);
  const R = 34;
  const C = 2 * Math.PI * R;

  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }));
  const reset = () => {
    setChecked({});
    setRestored(false);
  };

  const asNote = () => {
    const lines = [
      'THE TRASH HUB — SITE WALK CARD',
      `site: ${meta.site || '—'}`,
      `date: ${meta.date || today}  observer: ${meta.observer || '—'}  weather: ${meta.weather || '—'}`,
      '',
      ...SITE_WALK.map(
        (zone) =>
          `${zone.zone.toUpperCase()} (${zone.caption})\n` +
          zone.items.map((i) => `  [${checked[`${zone.zone}::${i.label}`] ? 'x' : ' '}] ${i.label} — ${i.note}`).join('\n')
      ),
      '',
      `${done}/${ITEMS.length} observations recorded. One pass, one vantage, no assumptions.`,
    ];
    void copyText(lines.join('\n'), 'Field note copied');
  };

  return (
    <SectionShell id="walk" index="05" label="SITE WALK CARD" texture="grid">
      <div className="screen-only grid gap-8 lg:grid-cols-12">
        {/* card */}
        <div className="lg:col-span-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-5 border-b border-rule pb-6">
              <div className="max-w-xl">
                <p className="label-plate flex items-center gap-3 text-muted-foreground">
                  <span className="num text-ink">05</span>
                  <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
                  Site walk card · working document
                </p>
                <h2 id="walk-h" className="font-serif-display mt-4 text-display-2 font-semibold text-ink">
                  Twelve observations, in a fixed order.
                </h2>
                <p className="mt-3 text-[0.92rem] leading-measure text-muted-foreground">
                  Tick as you walk. The card stays in this browser — nothing is uploaded, nothing is stored on a
                  server. Print it or copy it as a plain-text note when you are done.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-[86px] w-[86px]">
                  <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="40" cy="40" r={R} fill="none" stroke="hsl(var(--rule))" strokeWidth="7" />
                    <circle
                      cx="40"
                      cy="40"
                      r={R}
                      fill="none"
                      stroke="hsl(var(--lime))"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={`${(pct / 100) * C} ${C}`}
                      style={{ transition: 'stroke-dasharray 700ms cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="num text-[1.05rem] font-semibold leading-none text-ink">{pct}%</span>
                    <span className="label-plate mt-0.5 text-[0.5rem] text-muted-foreground">
                      {done}/{ITEMS.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={asNote} className="btn-ink !min-h-10 !px-3.5 !py-2 text-[0.78rem]">
                    <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" /> Copy field note
                  </button>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => window.print()} className="btn-ghost !min-h-9 !flex-1 !px-3 !py-1.5 text-[0.75rem]">
                      <Printer className="h-3.5 w-3.5" aria-hidden="true" /> Print
                    </button>
                    <button type="button" onClick={reset} className="btn-ghost !min-h-9 !px-3 !py-1.5 text-[0.75rem]">
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* record fields */}
          <Reveal delay={60} className="mt-6">
            <div className="grid gap-px overflow-hidden rounded-plate border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  { key: 'site', label: 'Site / address', placeholder: '14 Rowan Court' },
                  { key: 'date', label: 'Walk date', placeholder: today },
                  { key: 'observer', label: 'Observer', placeholder: 'Initials are enough' },
                  { key: 'weather', label: 'Weather', placeholder: 'rain, 9 °C' },
                ] as const
              ).map((field) => (
                <label key={field.key} className="block bg-card px-4 py-3">
                  <span className="label-plate block text-muted-foreground">{field.label}</span>
                  <input
                    type="text"
                    value={meta[field.key]}
                    onChange={(e) => setMeta((m) => ({ ...m, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="mt-1.5 w-full border-0 bg-transparent p-0 text-[0.9rem] text-foreground outline-none placeholder:text-muted-foreground/55"
                  />
                </label>
              ))}
            </div>
          </Reveal>

          {/* zones */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SITE_WALK.map((zone, zi) => {
              const zoneKeys = zone.items.map((i) => `${zone.zone}::${i.label}`);
              const zoneDone = zoneKeys.filter((k) => checked[k]).length;
              return (
                <Reveal key={zone.zone} delay={zi * 70}>
                  <fieldset className="card-plate h-full p-5">
                    <legend className="sr-only">{zone.zone}</legend>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-serif-display text-[1.1rem] font-semibold text-ink">
                        <span className="num mr-2 text-[0.7rem] text-muted-foreground">{String(zi + 1).padStart(2, '0')}</span>
                        {zone.zone}
                      </p>
                      <span className="num text-[0.7rem] text-muted-foreground">
                        {zoneDone}/{zone.items.length}
                      </span>
                    </div>
                    <p className="label-plate mt-1 text-muted-foreground">{zone.caption}</p>
                    <div className="mt-3 h-px w-full bg-rule">
                      <span
                        className="block h-px bg-lime transition-[width] duration-500 ease-expo"
                        style={{ width: `${(zoneDone / zone.items.length) * 100}%` }}
                      />
                    </div>
                    <ul className="mt-4 space-y-3">
                      {zone.items.map((item) => {
                        const key = `${zone.zone}::${item.label}`;
                        const on = Boolean(checked[key]);
                        return (
                          <li key={item.label}>
                            <button
                              type="button"
                              onClick={() => toggle(key)}
                              aria-pressed={on}
                              className="group flex w-full items-start gap-3 text-left"
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border transition-all duration-300 ${
                                  on
                                    ? 'border-ink bg-ink text-background'
                                    : 'border-ink/35 bg-card text-transparent group-hover:border-ink group-hover:bg-lime/20'
                                }`}
                              >
                                <Check className={`h-3 w-3 transition-transform duration-300 ${on ? 'scale-100' : 'scale-50'}`} aria-hidden="true" />
                              </span>
                              <span>
                                <span
                                  className={`block text-[0.88rem] font-medium leading-snug transition-colors ${
                                    on ? 'text-muted-foreground line-through decoration-rule' : 'text-foreground'
                                  }`}
                                >
                                  {item.label}
                                </span>
                                <span className="mt-0.5 block text-[0.78rem] leading-relaxed text-muted-foreground">{item.note}</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                </Reveal>
              );
            })}
          </div>
          {restored ? (
            <p className="label-plate mt-4 inline-flex items-center gap-2 rounded-full border border-rule bg-card px-3 py-1.5 text-muted-foreground" role="status">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
              Card restored from this browser · {done} of {ITEMS.length} marked
            </p>
          ) : null}
        </div>

        {/* dark instructions */}
        <div className="lg:col-span-4">
          <Reveal delay={120} variant="right" className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-plate bg-ink p-6 text-background shadow-lifted sm:p-7">
              <div className="grain absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <p className="label-plate text-background/55">Reading the card</p>
                <ul className="mt-5 space-y-5">
                  {[
                    {
                      t: 'Never merge two walks',
                      d: 'A card from a wet Tuesday is not evidence about a dry Friday. Fill one per visit.',
                    },
                    {
                      t: 'Count, then describe',
                      d: 'Numbers you could reproduce by another observer survive a challenge. Adjectives do not.',
                    },
                    {
                      t: 'Stop before judgement',
                      d: 'The card records condition. Cause belongs to the agency, the hauler and the code — not to you at the gate.',
                    },
                  ].map((b) => (
                    <li key={b.t} className="border-b border-background/15 pb-4 last:border-0">
                      <p className="font-serif-display text-[1.02rem] font-semibold">{b.t}</p>
                      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-background/65">{b.d}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-start gap-3 rounded-plate border border-background/20 bg-background/[0.06] p-4">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                  <p className="text-[0.78rem] leading-relaxed text-background/70">
                    Your entries never leave this device. There is no account, no analytics event and no form on this
                    page — the card is a printable object, not a submission.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* printable sheet */}
      <div className="print-sheet hidden text-foreground">
        <div className="mb-4 border-b-2 border-black pb-3">
          <p className="font-serif-display text-[1.4rem] font-bold">The Trash Hub — site-walk card</p>
          <p className="text-[0.7rem] uppercase tracking-widest">Field guide Vol. 1 No. 4 · Plate C-01 · {meta.date || today}</p>
        </div>
        <table className="mb-4 w-full border-collapse text-[0.75rem]">
          <tbody>
            <tr>
              <td className="w-1/4 border border-black/40 bg-black/5 px-2 py-1 font-semibold uppercase tracking-wide">Site</td>
              <td className="border border-black/40 px-2 py-1">{meta.site || ' '}</td>
              <td className="w-1/4 border border-black/40 bg-black/5 px-2 py-1 font-semibold uppercase tracking-wide">Observer</td>
              <td className="border border-black/40 px-2 py-1">{meta.observer || ' '}</td>
            </tr>
            <tr>
              <td className="border border-black/40 bg-black/5 px-2 py-1 font-semibold uppercase tracking-wide">Walk date</td>
              <td className="border border-black/40 px-2 py-1">{meta.date || today}</td>
              <td className="border border-black/40 bg-black/5 px-2 py-1 font-semibold uppercase tracking-wide">Weather</td>
              <td className="border border-black/40 px-2 py-1">{meta.weather || ' '}</td>
            </tr>
          </tbody>
        </table>
        {SITE_WALK.map((zone) => (
          <div key={zone.zone} className="print-plain mb-3 border border-black/40 p-2">
            <p className="mb-1.5 font-serif-display text-[0.95rem] font-bold">
              {zone.zone} — <span className="font-normal">{zone.caption}</span>
            </p>
            <table className="w-full border-collapse text-[0.75rem]">
              <tbody>
                {zone.items.map((item) => {
                  const on = Boolean(checked[`${zone.zone}::${item.label}`]);
                  return (
                    <tr key={item.label}>
                      <td className="w-6 border border-black/25 px-1 text-center align-top">{on ? '☑' : '☐'}</td>
                      <td className="w-1/2 border border-black/25 px-2 py-1 align-top">{item.label}</td>
                      <td className="border border-black/25 px-2 py-1 align-top text-black/70">{item.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
        <p className="text-[0.7rem] uppercase tracking-widest">
          {done}/{ITEMS.length} observations · one pass, one vantage, no assumptions · thetrashhub — public field guide
        </p>
      </div>
    </SectionShell>
  );
}
