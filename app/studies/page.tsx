'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, NotebookPen, Route, TriangleAlert } from 'lucide-react';
import FieldNotebookDesign from '@/components/designs/field-notebook-design';
import IndustrialWayfindingDesign from '@/components/designs/industrial-wayfinding-design';
import AtlasCartographicDesign from '@/components/designs/atlas-cartographic-design';

type DesignId = 'field-notebook' | 'industrial-wayfinding' | 'atlas-cartographic';

const DESIGNS: { id: DesignId; label: string; sub: string; note: string; icon: typeof Layers }[] = [
  {
    id: 'field-notebook',
    label: 'Field Notebook',
    sub: 'Editorial paper',
    note: 'Serif display, taped plates, quiet colour. Reads like a published guide.',
    icon: NotebookPen,
  },
  {
    id: 'industrial-wayfinding',
    label: 'Industrial Wayfinding',
    sub: 'Safety signage',
    note: 'Hazard stripes, hard edges, uppercase wayfinding type. Loud and legible.',
    icon: TriangleAlert,
  },
  {
    id: 'atlas-cartographic',
    label: 'Atlas Cartographic',
    sub: 'Survey map',
    note: 'Plates, coordinates, dashed routes and a compass. Precise and calm.',
    icon: Route,
  },
];

/**
 * Pre-production design studies. The shipped site lives at “/”; these three
 * surfaces are kept for reference because each one contributed a component of
 * the final visual language.
 */
export default function StudiesPage() {
  const [active, setActive] = useState<DesignId>('field-notebook');

  return (
    <div className="studies-root min-h-screen">
      <div className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground shadow-paper">
        <div className="mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-secondary">
              <span className="font-serif-display text-xs font-bold text-primary">TH</span>
            </div>
            <div className="leading-tight">
              <span className="font-mono-id block text-[0.7rem] uppercase tracking-widest text-primary-foreground/80">
                Design studies · pre-production
              </span>
              <Link href="/" className="inline-flex items-center gap-1.5 text-[0.7rem] text-secondary hover:underline">
                <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Back to the published site
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Choose a study">
            {DESIGNS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                aria-pressed={active === d.id}
                className={`flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-medium transition-all ${
                  active === d.id
                    ? 'bg-secondary text-primary'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                }`}
              >
                <d.icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-semibold">{d.label}</span>
                <span className="ml-1 hidden font-mono-id text-[0.6rem] opacity-60 lg:inline">{d.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <ul className="mx-auto flex max-w-[110rem] flex-wrap gap-x-6 gap-y-1 border-t border-primary-foreground/15 px-4 py-2 sm:px-6">
          {DESIGNS.map((d) => (
            <li key={d.id} className="font-mono-id text-[0.65rem] uppercase tracking-wider text-primary-foreground/45">
              <span className={active === d.id ? 'text-secondary' : undefined}>{d.label} — </span>
              {d.note}
            </li>
          ))}
        </ul>
      </div>

      <main>
        {active === 'field-notebook' && <FieldNotebookDesign />}
        {active === 'industrial-wayfinding' && <IndustrialWayfindingDesign />}
        {active === 'atlas-cartographic' && <AtlasCartographicDesign />}
      </main>

      <div className="border-t border-border bg-card px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <p className="font-mono-id text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            These studies are archived. Only “/” is the production surface.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" /> Open the field guide
          </Link>
        </div>
      </div>
    </div>
  );
}
