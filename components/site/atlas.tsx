'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Minus } from 'lucide-react';
import { Reveal } from './anim';
import { Photo } from './photo';
import { RegistrationTicks, SectionHead, SectionShell } from './primitives';
import { PlateChute, PlateRecognition, PlateWalk } from './plates';

const PANELS = [
  {
    key: 'A',
    cx: 1 / 6,
    code: 'A-01',
    title: 'Collection access, in section',
    lead: 'A multifamily block read as a vertical system: hoppers on every floor, a chute to the compactor room, carts to the set-out line, and an arm that must reach.',
    bullets: [
      'One hopper per 3–5 units is the usual design load',
      'Compactor rooms fail on clearance, not on volume',
      'The set-out line is where the route standard becomes visible',
    ],
    guide: 'GD-101',
    Diagram: PlateChute,
  },
  {
    key: 'B',
    cx: 1 / 2,
    code: 'B-02',
    title: 'Material categories, side by side',
    lead: 'Six streams drawn as silhouettes rather than logos, because in the field you recognise shape, weight and contamination — not a chasing arrow.',
    bullets: [
      'Rigid versus film decides most plastic outcomes',
      'Fiber is the stream that moisture destroys',
      'Glass is the only one that contaminates its neighbours',
    ],
    guide: 'GD-201',
    Diagram: PlateRecognition,
  },
  {
    key: 'C',
    cx: 5 / 6,
    code: 'C-03',
    title: 'The site walk, in plan',
    lead: 'A fixed loop with four stops. Walk it the same way twice and your two records are comparable; walk it differently and you have two opinions.',
    bullets: [
      'Outside before inside: spillage tells the truth',
      'Count lids; never estimate a closure rate',
      'Photograph from the corner you started at',
    ],
    guide: 'GD-301',
    Diagram: PlateWalk,
  },
] as const;

export default function Atlas() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(true);
  const observed = useRef<HTMLElement | null>(null);

  // Scroll-driven panel focus: whichever block occupies the reading band wins.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-atlas-panel]'));
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.atlasPanel);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    observed.current = nodes[0] ?? null;
    return () => io.disconnect();
  }, []);

  const panel = PANELS[active];
  const scale = zoomed ? 2.15 : 1;
  const tx = zoomed ? (0.5 - panel.cx) * 100 * scale : 0;

  const step = (dir: -1 | 1) => setActive((i) => (i + dir + PANELS.length) % PANELS.length);

  return (
    <SectionShell id="atlas" index="03" label="VISUAL ATLAS" texture="dots" className="bg-paper-deep">
      <Reveal>
        <SectionHead
          index="03"
          kicker="Visual atlas"
          title={<span id="atlas-h">Three plates, one reference sheet.</span>}
          lead="The atlas is the drawing sheet the guides are written from. Scroll the column and the plate follows — or drive it with the controls."
          right={
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-card text-ink transition-colors hover:bg-ink hover:text-background" aria-label="Previous panel">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-card text-ink transition-colors hover:bg-ink hover:text-background" aria-label="Next panel">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="btn-ghost !min-h-10 !px-3.5 !py-2 text-[0.75rem]"
                aria-pressed={zoomed}
              >
                {zoomed ? <Minus className="h-3.5 w-3.5" aria-hidden="true" /> : <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />}
                {zoomed ? 'Full sheet' : 'Panel zoom'}
                <span className="num ml-1 opacity-60">{zoomed ? '2.15×' : '1×'}</span>
              </button>
            </div>
          }
        />
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* sticky plate viewer */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-24">
            <figure className="plate-frame relative overflow-hidden rounded-plate border border-rule bg-card shadow-lifted">
              <div className="relative overflow-hidden bg-[hsl(45_44%_98%)]" style={{ aspectRatio: '1376 / 768' }}>
                <div className="absolute inset-0 transition-transform duration-900 ease-plate" style={{ transform: `translateX(${tx}%) scale(${scale})` }}>
                  <Photo
                    name="guide-atlas"
                    alt="Three-panel drawing sheet: an apartment chute and compactor cross-section, a material category grid, and a site-walk checklist"
                    sizes="(max-width: 1024px) 92vw, 52vw"
                    cover
                  />
                </div>
                {/* panel guides */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <span className="absolute inset-y-0 left-1/3 w-px bg-ink/25" />
                  <span className="absolute inset-y-0 left-2/3 w-px bg-ink/25" />
                  <span
                    className="absolute top-0 h-full transition-all duration-900 ease-plate"
                    style={{
                      left: `${panel.cx * 100 - 100 / 6}%`,
                      width: `${100 / 3}%`,
                      boxShadow: 'inset 0 0 0 2px hsl(var(--lime) / 0.9), inset 0 0 60px 10px hsl(var(--lime) / 0.18)',
                      opacity: zoomed ? 1 : 0.75,
                    }}
                  />
                </div>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent px-4 pb-3 pt-10">
                  <span className="label-plate text-background">
                    Panel {panel.key} · {panel.code}
                  </span>
                  <span className="label-plate text-background/70">
                    Sheet 1376 × 768 · {zoomed ? 'cropped' : 'entire'}
                  </span>
                </figcaption>
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  {PANELS.map((p, i) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`num flex h-7 w-7 items-center justify-center rounded-full border text-[0.7rem] transition-all duration-300 ${
                        i === active
                          ? 'border-lime bg-lime text-ink'
                          : 'border-background/40 bg-ink/40 text-background/80 backdrop-blur-sm hover:border-background'
                      }`}
                      aria-label={`Show panel ${p.key}`}
                      aria-pressed={i === active}
                    >
                      {p.key}
                    </button>
                  ))}
                </div>
                <RegistrationTicks />
              </div>
            </figure>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-plate border border-rule bg-card px-4 py-3">
              <p className="label-plate text-muted-foreground">
                Drawing sheet from the 2026 revision · annotated in the margins
              </p>
              <a
                href="#guides"
                className="label-plate inline-flex items-center gap-1.5 text-ink underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-survey"
              >
                Guides built from this sheet <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* scrolling panel notes */}
        <div className="lg:col-span-5">
          {PANELS.map((p, i) => (
            <article
              key={p.key}
              data-atlas-panel={i}
              className={`border-l-2 py-10 pl-6 transition-all duration-700 ease-plate first:pt-0 lg:min-h-[58vh] ${
                i === active ? 'border-lime' : 'border-rule'
              }`}
            >
              <p className={`label-plate transition-colors ${i === active ? 'text-ink' : 'text-muted-foreground'}`}>
                Panel {p.key} · Plate {p.code}
              </p>
              <h3 className={`font-serif-display mt-3 text-display-1 font-semibold leading-tight transition-colors ${i === active ? 'text-ink' : 'text-ink/45'}`}>
                {p.title}
              </h3>
              <p className="mt-3 max-w-[50ch] text-[0.92rem] leading-measure text-muted-foreground">{p.lead}</p>
              <ul className="mt-5 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[0.85rem] leading-relaxed text-foreground/90">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-lime" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 overflow-hidden rounded-plate border border-rule bg-card p-3">
                <p.Diagram />
              </div>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('th:open-guide', { detail: p.guide }))}
                className="btn-ghost !min-h-10 mt-6 text-[0.8rem]"
              >
                Open {p.guide} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
