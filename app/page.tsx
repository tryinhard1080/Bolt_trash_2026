'use client';

import { useState } from 'react';
import FieldNotebookDesign from '@/components/designs/field-notebook-design';
import IndustrialWayfindingDesign from '@/components/designs/industrial-wayfinding-design';
import AtlasCartographicDesign from '@/components/designs/atlas-cartographic-design';

type DesignId = 'field-notebook' | 'industrial-wayfinding' | 'atlas-cartographic';

const DESIGNS: { id: DesignId; label: string; sub: string }[] = [
  { id: 'field-notebook', label: 'Field Notebook', sub: 'Editorial paper' },
  { id: 'industrial-wayfinding', label: 'Industrial Wayfinding', sub: 'Safety signage' },
  { id: 'atlas-cartographic', label: 'Atlas Cartographic', sub: 'Survey map' },
];

export default function Home() {
  const [active, setActive] = useState<DesignId>('field-notebook');

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground shadow-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-secondary">
              <span className="font-serif-display text-xs font-bold text-primary">TH</span>
            </div>
            <span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground/80">
              Design Review
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {DESIGNS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={`group rounded-sm px-3 py-1.5 text-xs font-medium transition-all ${
                  active === d.id
                    ? 'bg-secondary text-primary'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                }`}
                aria-pressed={active === d.id}
              >
                <span className="font-semibold">{d.label}</span>
                <span className="ml-1.5 hidden font-mono-id text-[10px] opacity-60 sm:inline">{d.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <main id="main-content">
        {active === 'field-notebook' && <FieldNotebookDesign />}
        {active === 'industrial-wayfinding' && <IndustrialWayfindingDesign />}
        {active === 'atlas-cartographic' && <AtlasCartographicDesign />}
      </main>
    </>
  );
}
