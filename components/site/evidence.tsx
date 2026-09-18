'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Fingerprint, Link2, ShieldCheck, Hourglass } from 'lucide-react';
import { Reveal, Scramble } from './anim';
import { RegistrationTicks, SectionHead, SectionShell, Tag } from './primitives';
import { CLAIMS, GUIDES, SOURCES } from '@/lib/data';

export default function Evidence() {
  const [active, setActive] = useState(0);
  const source = SOURCES[active];
  const carried = useMemo(() => CLAIMS.filter((c) => c.source === source.id), [source.id]);
  const guides = useMemo(() => GUIDES.filter((g) => g.sources.includes(source.id)), [source.id]);

  return (
    <SectionShell id="evidence" index="07" label="EVIDENCE LEDGER" texture="paper">
      <Reveal>
        <SectionHead
          index="07"
          kicker="Evidence ledger"
          title={<span id="evidence-h">Every claim, and the document under it.</span>}
          lead="A figure enters a guide only with a source ID, a publisher, and a date on which the snapshot was approved. When a source is superseded, the guide is annotated — the old number stays visible."
          right={
            <Tag tone="ok">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" /> {SOURCES.filter((s) => s.status === 'Verified').length} of {SOURCES.length} verified
            </Tag>
          }
        />
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* source index */}
        <nav className="lg:col-span-4" aria-label="Approved sources">
          <ul className="overflow-hidden rounded-plate border border-rule bg-card">
            {SOURCES.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="border-b border-rule last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative flex w-full flex-col gap-1.5 px-4 py-3.5 text-left transition-colors duration-300 ${
                      isActive ? 'bg-ink text-background' : 'hover:bg-paper-deep'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className={`num text-[0.7rem] ${isActive ? 'text-lime' : 'text-survey'}`}>{s.id}</span>
                      <span
                        className={`label-plate inline-flex items-center gap-1.5 ${
                          isActive ? 'text-background/75' : 'text-muted-foreground'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            s.status === 'Verified' ? 'bg-ok' : 'animate-blink bg-lime'
                          }`}
                          aria-hidden="true"
                        />
                        {s.status}
                      </span>
                    </span>
                    <span className={`text-[0.86rem] font-medium leading-snug ${isActive ? 'text-background' : 'text-ink'}`}>
                      {s.title}
                    </span>
                    <span className={`text-[0.72rem] ${isActive ? 'text-background/60' : 'text-muted-foreground'}`}>
                      {s.publisher}
                    </span>
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
            Digests are truncated snapshot hashes, recorded for internal comparison only.
          </p>
        </nav>

        {/* record detail */}
        <div className="lg:col-span-8">
          <Reveal variant="scale" key={source.id}>
            <article className="plate-frame relative overflow-hidden rounded-plate border border-rule bg-card shadow-paper">
              <header className="flex flex-wrap items-start justify-between gap-4 border-b border-rule px-6 py-5">
                <div className="min-w-0">
                  <p className="num text-[0.72rem] text-survey">
                    <Scramble text={source.id} />
                  </p>
                  <h3 className="font-serif-display mt-2 text-[1.35rem] font-semibold leading-snug text-ink">{source.title}</h3>
                  <p className="mt-1.5 text-[0.85rem] text-muted-foreground">{source.publisher}</p>
                </div>
                <Tag tone={source.status === 'Verified' ? 'ok' : 'lime'}>
                  {source.status === 'Verified' ? <Check className="h-3 w-3" aria-hidden="true" /> : <Hourglass className="h-3 w-3" aria-hidden="true" />}
                  {source.status}
                </Tag>
              </header>

              <dl className="grid gap-px bg-rule sm:grid-cols-3">
                {[
                  { k: 'Approved for use', v: source.approved },
                  { k: 'Snapshot digest', v: source.digest },
                  { k: 'Guides carrying it', v: guides.length.toString() },
                ].map((row) => (
                  <div key={row.k} className="bg-card px-5 py-4">
                    <dt className="label-plate text-muted-foreground">{row.k}</dt>
                    <dd className="num mt-1.5 text-[0.9rem] text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-rule px-6 py-5">
                <p className="label-plate text-muted-foreground">Scope and limits</p>
                <p className="mt-2 max-w-[70ch] text-[0.92rem] leading-measure text-foreground">{source.scope}</p>
              </div>

              <div className="grid gap-px border-t border-rule bg-rule lg:grid-cols-2">
                <div className="bg-paper-deep p-5">
                  <p className="label-plate flex items-center gap-2 text-muted-foreground">
                    <Fingerprint className="h-3.5 w-3.5" aria-hidden="true" /> Claims carried by this source
                  </p>
                  {carried.length ? (
                    <ul className="mt-3 space-y-3">
                      {carried.map((c) => (
                        <li key={c.claim} className="flex items-baseline justify-between gap-4 border-b border-rule pb-2.5 last:border-0">
                          <span className="text-[0.83rem] leading-snug text-foreground">{c.claim}</span>
                          <span className="num shrink-0 text-[0.83rem] font-medium text-ink">{c.figure}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-[0.83rem] leading-relaxed text-muted-foreground">
                      No numeric claim depends on this record. It is held for context: definitions, acceptance patterns
                      and the wording a local rule uses.
                    </p>
                  )}
                </div>
                <div className="bg-paper-deep p-5">
                  <p className="label-plate flex items-center gap-2 text-muted-foreground">
                    <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> Used in guides
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {guides.map((g) => (
                      <li key={g.code}>
                        <button
                          type="button"
                          onClick={() => window.dispatchEvent(new CustomEvent('th:open-guide', { detail: g.code }))}
                          className="label-plate inline-flex items-center gap-1.5 rounded-full border border-rule bg-card px-3 py-1.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-background"
                        >
                          {g.code} · {g.title}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-[0.8rem] font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-survey"
                    >
                      Open the public document <ExternalArrow />
                    </a>
                  ) : (
                    <p className="label-plate mt-5 text-muted-foreground">
                      Held as a local excerpt. Not published online by the issuing body.
                    </p>
                  )}
                </div>
              </div>
              <RegistrationTicks />
            </article>
          </Reveal>
        </div>
      </div>

      {/* full claims ledger */}
      <Reveal delay={80} className="mt-10">
        <div className="overflow-hidden rounded-plate border border-rule bg-card shadow-paper">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3.5">
            <p className="label-plate text-muted-foreground">Claims ledger · this edition</p>
            <p className="label-plate text-muted-foreground">{CLAIMS.length} numeric claims · {SOURCES.length} sources</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">Claims and their approved sources</caption>
              <thead>
                <tr className="border-b border-rule bg-paper-deep">
                  {['Claim', 'Figure', 'Source', 'Used in'].map((h) => (
                    <th key={h} scope="col" className="label-plate px-5 py-2.5 font-medium text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLAIMS.map((c) => (
                  <tr key={c.claim} className="border-b border-rule last:border-0 transition-colors hover:bg-paper-deep/70">
                    <th scope="row" className="max-w-[34ch] px-5 py-3.5 text-left text-[0.85rem] font-normal leading-snug text-foreground">
                      {c.claim}
                    </th>
                    <td className="num whitespace-nowrap px-5 py-3.5 text-[0.85rem] font-semibold text-ink">{c.figure}</td>
                    <td className="num whitespace-nowrap px-5 py-3.5 text-[0.78rem] text-survey">{c.source}</td>
                    <td className="px-5 py-3.5">
                      <span className="label-plate text-muted-foreground">{c.usedIn.join(' · ')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function ExternalArrow() {
  return <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />;
}
