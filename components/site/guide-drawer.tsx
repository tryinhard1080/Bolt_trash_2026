'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Ruler, TriangleAlert, X } from 'lucide-react';
import { PLATES } from './plates';
import { RegistrationTicks } from './primitives';
import { GUIDES, SOURCES } from '@/lib/data';
import { copyText } from '@/lib/clipboard';

export default function GuideDrawer({
  code,
  onClose,
  onSelect,
}: {
  code: string | null;
  onClose: () => void;
  onSelect: (code: string) => void;
}) {
  const open = Boolean(code);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      setMounted(false);
      return;
    }
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => panelRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const index = GUIDES.findIndex((g) => g.code === code);
  const guide = index >= 0 ? GUIDES[index] : null;
  const prev = guide ? GUIDES[(index - 1 + GUIDES.length) % GUIDES.length] : null;
  const next = guide ? GUIDES[(index + 1) % GUIDES.length] : null;
  const Diagram = guide ? PLATES[guide.diagram] : null;
  const sources = (guide?.sources ?? []).map((id) => SOURCES.find((s) => s.id === id)).filter(Boolean);

  const copyCitation = () => {
    if (!guide) return;
    void copyText(
      `The Trash Hub (2026). “${guide.title}”, guide ${guide.code}, ${guide.lifecycle} lifecycle, updated ${guide.updated}. Retrieved from ${window.location.href}`,
      'Citation copied'
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[70] no-print ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* scrim */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-scrim/70 backdrop-blur-[3px] transition-opacity duration-500 ${
          mounted && open ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[46rem] flex-col border-l border-rule bg-background shadow-deep transition-transform duration-600 ease-plate focus:outline-none ${
          mounted && open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {guide ? (
          <>
            {/* header */}
            <header className="relative flex items-start justify-between gap-4 border-b border-rule bg-paper-deep px-6 py-5">
              <div className="min-w-0">
                <p className="label-plate flex flex-wrap items-center gap-3 text-muted-foreground">
                  <span className="num text-ink">{guide.code}</span>
                  <span className="h-3 w-px bg-rule" aria-hidden="true" />
                  {guide.lifecycle} lifecycle · {guide.depth}
                  <span className="h-3 w-px bg-rule" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler className="h-3 w-3" aria-hidden="true" /> {guide.plates.join(' · ')}
                  </span>
                </p>
                <h2 id={titleId} className="font-serif-display mt-2.5 text-[1.6rem] font-semibold leading-tight text-ink">
                  {guide.title}
                </h2>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">{guide.summary}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:bg-ink hover:text-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Close guide</span>
              </button>
            </header>

            {/* body */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
              <section aria-labelledby={`${titleId}-plate`}>
                <h3 id={`${titleId}-plate`} className="label-plate text-muted-foreground">
                  Plate {guide.plates[0]}
                </h3>
                <figure className="plate-frame relative mt-3 overflow-hidden rounded-plate border border-rule bg-card p-3">
                  {Diagram ? <Diagram label={`${guide.title} — diagram`} /> : null}
                  <figcaption className="mt-2 border-t border-rule pt-2 text-[0.72rem] text-muted-foreground">
                    Schematic. Dimensions are typical, not regulatory — the enforced number is the one in your district
                    standard.
                  </figcaption>
                  <RegistrationTicks />
                </figure>
              </section>

              <section className="mt-7 grid gap-7 sm:grid-cols-2">
                <div>
                  <h3 className="label-plate text-muted-foreground">You will be able to</h3>
                  <ul className="mt-3 space-y-2.5">
                    {guide.lookFor.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-foreground">
                        <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ok" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label-plate text-muted-foreground">Frequently misread</h3>
                  <ul className="mt-3 space-y-2.5">
                    {guide.pitfalls.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                        <TriangleAlert className="mt-[3px] h-3.5 w-3.5 shrink-0 text-rust" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mt-8">
                <h3 className="label-plate text-muted-foreground">Field sequence · {guide.minutes} minute walk</h3>
                <ol className="mt-3 divide-y divide-rule overflow-hidden rounded-plate border border-rule">
                  {guide.checks.map((zone, zi) => (
                    <li key={zone.zone} className="bg-card p-4">
                      <p className="font-serif-display text-[0.95rem] font-semibold text-ink">
                        <span className="num mr-2 text-[0.7rem] text-muted-foreground">{String(zi + 1).padStart(2, '0')}</span>
                        {zone.zone}
                      </p>
                      <ul className="mt-2.5 space-y-2">
                        {zone.items.map((item) => (
                          <li key={item.label} className="flex gap-3">
                            <span
                              className="mt-[3px] h-3.5 w-3.5 shrink-0 rounded-[2px] border border-ink/45"
                              aria-hidden="true"
                            />
                            <span className="text-[0.83rem] leading-snug">
                              <span className="font-medium text-foreground">{item.label}</span>
                              <span className="mt-0.5 block text-muted-foreground">{item.cue}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mt-8 border-t border-rule pt-5">
                <h3 className="label-plate text-muted-foreground">Approved sources for this guide</h3>
                <ul className="mt-3 space-y-2">
                  {sources.map((s) => (
                    <li key={s!.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.8rem]">
                      <span className="num text-survey">{s!.id}</span>
                      <span className="text-foreground">{s!.title}</span>
                      <span className="text-muted-foreground">approved {s!.approved}</span>
                      {s!.url ? (
                        <a
                          href={s!.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-survey underline underline-offset-2 hover:text-ink"
                        >
                          open <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* footer */}
            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-paper-deep px-6 py-4">
              <div className="flex items-center gap-2">
                {prev ? (
                  <button type="button" onClick={() => onSelect(prev.code)} className="btn-ghost !min-h-10 !px-3 !py-2 text-[0.78rem]">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {prev.code}
                  </button>
                ) : null}
                {next ? (
                  <button type="button" onClick={() => onSelect(next.code)} className="btn-ghost !min-h-10 !px-3 !py-2 text-[0.78rem]">
                    {next.code} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={copyCitation}
                className="btn-lime !min-h-10 !px-4 !py-2 text-[0.78rem]"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Cite this guide
              </button>
            </footer>
          </>
        ) : (
          <div className="h-full p-8 text-muted-foreground">Loading plate…</div>
        )}
      </div>
    </div>
  );
}
