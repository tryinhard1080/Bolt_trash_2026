'use client';

import { TICKER_FACTS } from '@/lib/data';

/** Fact ticker — a survey strip of the numbers this edition leans on. */
export default function Ticker() {
  const items = [...TICKER_FACTS];
  return (
    <div className="marquee-host relative overflow-hidden border-y border-rule bg-paper-deep py-3 select-none">
      <div className="fade-edges">
        <div className="marquee-track gap-10 pr-10" aria-hidden="false">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1}>
              {items.map((fact) => (
                <span key={fact} className="flex shrink-0 items-center gap-10">
                  <span className="label-plate whitespace-nowrap text-ink/80">{fact}</span>
                  <span className="relative flex h-2.5 w-2.5 rotate-45 border border-lime bg-lime/60" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">
        Selected national figures cited in this edition: {items.join('. ')}. Source: U.S. EPA, Advancing Sustainable
        Materials Management, 2018 data tables.
      </span>
    </div>
  );
}
