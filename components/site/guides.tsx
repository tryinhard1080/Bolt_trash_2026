'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Clock3, LayoutGrid, List, Search, X } from 'lucide-react';
import { Reveal } from './anim';
import { RegistrationTicks, SectionHead, SectionShell, Tag } from './primitives';
import GuideDrawer from './guide-drawer';
import { PLATES } from './plates';
import { GUIDES, LIFECYCLES, type Lifecycle } from '@/lib/data';

type Filter = 'All' | Lifecycle;
type View = 'grid' | 'ledger';

const FILTERS: Filter[] = ['All', ...LIFECYCLES];

export default function Guides() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [view, setView] = useState<View>('grid');
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GUIDES.filter((g) => {
      const matchFilter = filter === 'All' || g.lifecycle === filter;
      if (!matchFilter) return false;
      if (!q) return true;
      return [g.code, g.title, g.summary, g.lifecycle, g.kicker, ...g.lookFor]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, filter]);

  // Sections elsewhere can request a guide by code (atlas, evidence, ask).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const code = (e as CustomEvent<string>).detail;
      if (typeof code === 'string') setOpen(code);
    };
    window.addEventListener('th:open-guide', onOpen);
    return () => window.removeEventListener('th:open-guide', onOpen);
  }, []);

  const featured = GUIDES.find((g) => g.code === 'GD-201') ?? GUIDES[0];
  const FeaturedPlate = PLATES[featured.diagram];
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    GUIDES.forEach((g) => map.set(g.lifecycle, (map.get(g.lifecycle) ?? 0) + 1));
    return map;
  }, []);

  return (
    <SectionShell id="guides" index="02" label="GUIDE LIBRARY" texture="grid">
      <Reveal>
        <SectionHead
          index="02"
          kicker="Guide library"
          title={<span id="guides-h">Nine protocols, searchable.</span>}
          lead="Each guide is a walking protocol tied to a lifecycle stage, a plate list and an approval date. Open one to see the diagram, the sequence and the sources underneath it."
          right={
            <div className="flex items-center gap-2">
              <span className="num rounded-plate border border-rule px-3 py-2 text-[0.75rem] text-muted-foreground">
                {results.length.toString().padStart(2, '0')} / {GUIDES.length.toString().padStart(2, '0')}
              </span>
              <div className="flex overflow-hidden rounded-plate border border-rule" role="group" aria-label="Result layout">
                {(
                  [
                    { id: 'grid' as View, icon: LayoutGrid, label: 'Cards' },
                    { id: 'ledger' as View, icon: List, label: 'Ledger' },
                  ]
                ).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setView(v.id)}
                    aria-pressed={view === v.id}
                    title={v.label}
                    className={`flex h-9 w-9 items-center justify-center transition-colors duration-300 ${
                      view === v.id ? 'bg-ink text-background' : 'bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <v.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">{v.label} view</span>
                  </button>
                ))}
              </div>
            </div>
          }
        />
      </Reveal>

      {/* Featured plate */}
      <Reveal delay={60} className="mt-8">
        <article className="group grid overflow-hidden rounded-plate border border-rule bg-card shadow-paper transition-shadow duration-500 hover:shadow-lifted lg:grid-cols-12">
          <div className="relative flex flex-col justify-between gap-6 border-b border-rule bg-paper-deep p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Tag tone="lime">Newest revision</Tag>
                <span className="num text-[0.7rem] text-muted-foreground">{featured.code}</span>
                <span className="label-plate text-muted-foreground">{featured.kicker}</span>
              </div>
              <h3 className="font-serif-display mt-4 text-display-1 font-semibold leading-tight text-ink">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[0.9rem] leading-measure text-muted-foreground">{featured.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="label-plate inline-flex items-center gap-1.5 text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> {featured.minutes} min read
              </span>
              <span className="label-plate text-muted-foreground">Plates {featured.plates.join(', ')}</span>
              <span className="label-plate text-muted-foreground">Updated {featured.updated}</span>
              <button
                type="button"
                onClick={() => setOpen(featured.code)}
                className="btn-ink ml-auto !min-h-10 !px-4 !py-2 text-[0.8rem]"
              >
                Open guide <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden p-4 sm:p-6 lg:col-span-5">
            <div className="zoom-plate group-hover:scale-[1.03]">
              <FeaturedPlate label={`${featured.title} — preview plate`} />
            </div>
            <RegistrationTicks />
          </div>
        </article>
      </Reveal>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4 border-y border-rule py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1" role="group" aria-label="Filter guides by lifecycle">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`label-plate relative shrink-0 rounded-full border px-3.5 py-2 transition-all duration-300 ${
                  active
                    ? 'border-ink bg-ink text-background'
                    : 'border-rule bg-card text-muted-foreground hover:border-ink/40 hover:text-ink'
                }`}
              >
                {f}
                {f !== 'All' ? (
                  <span className={`num ml-2 text-[0.65rem] ${active ? 'text-lime' : 'text-muted-foreground/70'}`}>
                    {counts.get(f) ?? 0}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search code, title, stream…"
            aria-label="Search guides"
            className="min-h-11 w-full rounded-plate border border-rule bg-card pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <p className="label-plate mt-3 text-muted-foreground" role="status" aria-live="polite">
        {results.length} guide{results.length === 1 ? '' : 's'} shown
        {filter !== 'All' ? ` · ${filter}` : ''}
        {query ? ` · “${query}”` : ''}
      </p>

      {/* Results */}
      {results.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-plate border border-dashed border-rule bg-card px-6 py-14 text-center">
          <span className="label-plate">No match in this edition</span>
          <p className="max-w-[46ch] text-sm text-muted-foreground">
            Nothing in the library matches that combination yet. Clear the filters — or tell us which protocol is
            missing and we will research it.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setFilter('All');
            }}
            className="btn-ghost !min-h-10 mt-2 text-[0.8rem]"
          >
            Reset the search
          </button>
        </div>
      ) : view === 'grid' ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((g, i) => (
            <Reveal as="li" key={g.code} delay={(i % 3) * 70}>
              <button
                type="button"
                onClick={() => setOpen(g.code)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-plate border border-rule bg-card p-5 text-left shadow-paper transition-all duration-500 ease-plate hover:-translate-y-1 hover:border-ink/30 hover:shadow-lifted"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lime transition-transform duration-700 ease-expo group-hover:scale-x-100" aria-hidden="true" />
                <div className="flex items-start justify-between gap-3">
                  <span className="num text-[0.7rem] text-survey">{g.code}</span>
                  <Tag>{g.lifecycle}</Tag>
                </div>
                <h4 className="font-serif-display mt-4 text-[1.12rem] font-semibold leading-snug text-ink transition-colors group-hover:text-foreground">
                  {g.title}
                </h4>
                <p className="mt-2 line-clamp-3 text-[0.83rem] leading-relaxed text-muted-foreground">{g.summary}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-5">
                  <span className="label-plate inline-flex items-center gap-1.5 text-muted-foreground">
                    <Clock3 className="h-3 w-3" aria-hidden="true" />
                    {g.minutes} min
                  </span>
                  <span className="label-plate text-muted-foreground">{g.depth}</span>
                  <span className="label-plate ml-auto inline-flex items-center gap-1 text-ink">
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="mt-6 overflow-hidden rounded-plate border border-rule">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Guide library, ledger view</caption>
            <thead>
              <tr className="border-b border-rule bg-paper-deep">
                <th scope="col" className="label-plate px-4 py-3 font-medium text-muted-foreground">
                  Code
                </th>
                <th scope="col" className="label-plate px-4 py-3 font-medium text-muted-foreground">
                  Guide
                </th>
                <th scope="col" className="label-plate hidden px-4 py-3 font-medium text-muted-foreground sm:table-cell">
                  Stage
                </th>
                <th scope="col" className="label-plate hidden px-4 py-3 font-medium text-muted-foreground md:table-cell">
                  Plates
                </th>
                <th scope="col" className="label-plate px-4 py-3 text-right font-medium text-muted-foreground">
                  Open
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((g) => (
                <tr key={g.code} className="group border-b border-rule bg-card transition-colors last:border-0 hover:bg-paper-deep">
                  <th scope="row" className="num whitespace-nowrap px-4 py-3.5 text-left text-[0.75rem] font-normal text-survey">
                    {g.code}
                  </th>
                  <td className="px-4 py-3.5">
                    <button type="button" onClick={() => setOpen(g.code)} className="text-left">
                      <span className="font-serif-display block text-[0.98rem] font-semibold text-ink underline-offset-4 group-hover:underline">
                        {g.title}
                      </span>
                      <span className="mt-0.5 block text-[0.78rem] text-muted-foreground">{g.kicker}</span>
                    </button>
                  </td>
                  <td className="hidden px-4 py-3.5 sm:table-cell">
                    <span className="label-plate text-muted-foreground">{g.lifecycle}</span>
                  </td>
                  <td className="num hidden px-4 py-3.5 text-[0.75rem] text-muted-foreground md:table-cell">{g.plates.join(' · ')}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setOpen(g.code)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:bg-ink hover:text-background"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">Open guide {g.code}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <GuideDrawer code={open} onClose={() => setOpen(null)} onSelect={(code) => setOpen(code)} />
    </SectionShell>
  );
}
