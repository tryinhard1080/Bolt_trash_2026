'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, Search, TriangleAlert } from 'lucide-react';
import { Reveal } from './anim';
import { Photo } from './photo';
import { SectionHead, SectionShell, Tag } from './primitives';
import { SOURCES, SUPPLIERS } from '@/lib/data';

const KINDS = ['All', 'Collection', 'Transfer', 'Processing', 'Markets'] as const;

const LEGEND: Record<'Collection' | 'Transfer' | 'Processing' | 'Markets', string> = {
  Collection: 'hsl(206 52% 40%)',
  Transfer: 'hsl(38 74% 48%)',
  Processing: 'hsl(148 38% 34%)',
  Markets: 'hsl(280 32% 45%)',
};
type Kind = (typeof KINDS)[number];
type Sort = 'name' | 'recent';

export default function Directory() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<Kind>('All');
  const [sort, setSort] = useState<Sort>('name');
  const [expanded, setExpanded] = useState<string[]>([]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SUPPLIERS.filter((s) => {
      if (kind !== 'All' && s.kind !== kind) return false;
      if (!q) return true;
      return [s.id, s.name, s.footprint, s.operations, ...s.accepted].join(' ').toLowerCase().includes(q);
    });
    return [...list].sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name) : b.admitted.localeCompare(a.admitted)
    );
  }, [query, kind, sort]);

  const toggle = (id: string) =>
    setExpanded((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]));

  return (
    <SectionShell id="directory" index="06" label="SUPPLIER DIRECTORY" texture="none" className="bg-paper-deep">
      <Reveal>
        <SectionHead
          index="06"
          kicker="Supplier directory"
          title={<span id="directory-h">Public-fact records. Nothing else.</span>}
          lead="A record exists here when a public document describes it. What follows is a transcription of that document: footprint, intake, published hours, the source ID it came from. Availability, price and quality are outside the scope of this page."
          right={<Tag tone="rust"><TriangleAlert className="h-3 w-3" aria-hidden="true" /> No rankings · no endorsement</Tag>}
        />
      </Reveal>

      <Reveal delay={60} className="mt-8">
        <figure className="plate-frame grid overflow-hidden rounded-plate border border-rule bg-card shadow-paper lg:grid-cols-12">
          <div className="group relative overflow-hidden border-b border-rule lg:col-span-8 lg:border-b-0 lg:border-r">
            <Photo
              name="atlas-map"
              alt="A vintage-style survey map of a neighbourhood waste collection system with route grid, legend, compass rose and tipping points marked"
              sizes="(max-width: 1024px) 92vw, 60vw"
              imgClassName="transition-transform duration-2200 ease-plate group-hover:scale-[1.06]"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                backgroundImage:
                  'linear-gradient(hsl(var(--ink) / 0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink) / 0.12) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
              aria-hidden="true"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/90 to-transparent px-4 pb-3 pt-10">
              <span className="label-plate text-background">Fig. 03 · coverage by published service area</span>
              <span className="label-plate text-background/60">Illustrative plate, not a dataset</span>
            </figcaption>
          </div>
          <figcaption className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between gap-5 p-6">
              <div>
                <p className="label-plate text-muted-foreground">What a record covers</p>
                <ul className="mt-4 space-y-2.5">
                  {(['Collection', 'Transfer', 'Processing', 'Markets'] as const).map((k) => {
                    const count = SUPPLIERS.filter((s) => s.kind === k).length;
                    return (
                      <li key={k} className="flex items-center gap-3 border-b border-rule pb-2.5 last:border-0">
                        <span
                          className="h-3 w-3 shrink-0 rounded-[2px] border border-rule"
                          style={{ background: LEGEND[k] }}
                          aria-hidden="true"
                        />
                        <span className="text-[0.85rem] font-medium text-foreground">{k}</span>
                        <button
                          type="button"
                          onClick={() => setKind(k)}
                          aria-pressed={kind === k}
                          className={`num ml-auto rounded-full border px-2 py-0.5 text-[0.7rem] transition-colors ${
                            kind === k ? 'border-ink bg-ink text-background' : 'border-rule text-muted-foreground hover:border-ink hover:text-ink'
                          }`}
                        >
                          {count} {count === 1 ? 'record' : 'records'}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="text-[0.78rem] leading-relaxed text-muted-foreground">
                Coverage describes what a public document says a record serves. It is not a claim about whether a truck
                will come to your street — read the local standard for that.
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter records by kind">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
              className={`label-plate rounded-full border px-3.5 py-2 transition-all duration-300 ${
                kind === k ? 'border-ink bg-ink text-background' : 'border-rule bg-card text-muted-foreground hover:border-ink/40 hover:text-ink'
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="label-plate flex items-center gap-2 text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-10 rounded-plate border border-rule bg-card px-2.5 text-[0.72rem] uppercase tracking-widest text-foreground focus:border-ink focus:outline-none"
            >
              <option value="name">Name A–Z</option>
              <option value="recent">Most recently admitted</option>
            </select>
          </label>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search records"
              aria-label="Search supplier records"
              className="min-h-11 w-full rounded-plate border border-rule bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      </div>

      <p className="label-plate mt-3 text-muted-foreground" role="status" aria-live="polite">
        {rows.length} record{rows.length === 1 ? '' : 's'} shown · {SUPPLIERS.length} in this edition
      </p>

      <div className="mt-4 overflow-hidden rounded-plate border border-rule bg-card shadow-paper">
        <div className="hidden grid-cols-[5.5rem_1fr_8rem_8rem_7rem_2.5rem] items-center gap-4 border-b border-rule bg-paper-deep px-5 py-2.5 lg:grid">
          {['ID', 'Record', 'Kind', 'Coverage', 'Admitted', ''].map((h, i) => (
            <span key={i} className="label-plate text-muted-foreground">
              {h}
            </span>
          ))}
        </div>

        {rows.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="label-plate text-muted-foreground">No record matches</p>
            <p className="mx-auto mt-2 max-w-[44ch] text-sm text-muted-foreground">
              The directory is deliberately small: a record is only admitted when a public document supports every
              field shown.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setKind('All');
              }}
              className="btn-ghost !min-h-10 mt-4 text-[0.8rem]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-rule">
            {rows.map((s, i) => {
              const isOpen = expanded.includes(s.id);
              const source = SOURCES.find((src) => src.id === s.snapshot);
              return (
                <Reveal as="li" key={s.id} delay={(i % 4) * 50}>
                  <div className={`transition-colors duration-300 ${isOpen ? 'bg-paper-deep' : 'hover:bg-paper-deep/60'}`}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggle(s.id)}
                        aria-expanded={isOpen}
                        aria-controls={`rec-${s.id}`}
                        className="grid w-full grid-cols-1 items-center gap-x-4 gap-y-2 px-5 py-4 text-left lg:grid-cols-[5.5rem_1fr_8rem_8rem_7rem_2.5rem]"
                      >
                        <span className="num text-[0.72rem] text-survey">{s.id}</span>
                        <span className="min-w-0">
                          <span className="font-serif-display block text-[1.02rem] font-semibold leading-snug text-ink">{s.name}</span>
                          <span className="mt-0.5 block truncate text-[0.78rem] text-muted-foreground lg:hidden">{s.footprint}</span>
                        </span>
                        <span className="label-plate hidden text-muted-foreground lg:block">{s.kind}</span>
                        <span className="label-plate hidden truncate text-muted-foreground lg:block">{s.region}</span>
                        <span className="num hidden text-[0.72rem] text-muted-foreground lg:block">{s.admitted}</span>
                        <span className="hidden justify-self-end lg:flex">
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground transition-transform duration-500 ease-plate ${isOpen ? 'rotate-180 text-ink' : ''}`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`rec-${s.id}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-plate ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid gap-px border-t border-rule bg-rule md:grid-cols-3">
                          <div className="bg-card p-5">
                            <p className="label-plate text-muted-foreground">Footprint</p>
                            <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground">{s.footprint}</p>
                            <p className="mt-4 text-[0.86rem] leading-relaxed text-muted-foreground">{s.operations}</p>
                          </div>
                          <div className="bg-card p-5">
                            <p className="label-plate text-muted-foreground">Accepted at the gate</p>
                            <ul className="mt-2.5 flex flex-wrap gap-1.5">
                              {s.accepted.map((a) => (
                                <li key={a}>
                                  <span className="label-plate rounded-full border border-rule bg-paper-deep px-2.5 py-1 text-ink">
                                    {a}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <p className="mt-4 text-[0.86rem] leading-relaxed text-muted-foreground">{s.note}</p>
                          </div>
                          <div className="bg-card p-5">
                            <p className="label-plate text-muted-foreground">Source snapshot</p>
                            <p className="num mt-2 text-[0.78rem] text-survey">{s.snapshot}</p>
                            <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground">{source?.title ?? 'Record held on file.'}</p>
                            <p className="label-plate mt-3 text-muted-foreground">
                              Publisher: {source?.publisher ?? '—'} · Digest {source?.digest ?? 'pending'}
                            </p>
                            {source?.url ? (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label-plate mt-3 inline-flex items-center gap-1.5 text-ink underline decoration-lime decoration-2 underline-offset-4 hover:text-survey"
                              >
                                Open public source <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
                            ) : (
                              <a href="#evidence" className="label-plate mt-3 inline-flex items-center gap-1.5 text-ink underline decoration-lime decoration-2 underline-offset-4">
                                Read the evidence policy
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-plate border border-dashed border-rule bg-card px-5 py-4">
        <p className="max-w-[62ch] text-[0.82rem] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-ink">Admission rule.</span> A record is published only when an approved
          public document supports every field. We do not accept submissions, sponsorships or listings, and a record
          being present here says nothing about service quality.
        </p>
        <a href="#evidence" className="label-plate shrink-0 text-ink underline decoration-lime decoration-2 underline-offset-4">
          See the ledger
        </a>
      </div>
    </SectionShell>
  );
}
