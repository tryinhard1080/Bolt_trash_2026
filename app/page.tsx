'use client';

import { useState } from 'react';
import FieldNotebookDesign from '@/components/designs/field-notebook-design';
import IndustrialWayfindingDesign from '@/components/designs/industrial-wayfinding-design';
import AtlasCartographicDesign from '@/components/designs/atlas-cartographic-design';

type DesignId = 'field-notebook' | 'industrial-wayfinding' | 'atlas-cartographic';

const DESIGNS: { id: DesignId; label: string; description: string }[] = [
  { id: 'field-notebook', label: 'Field Notebook', description: 'Editorial paper, hand-annotated margins, documentary collage' },
  { id: 'industrial-wayfinding', label: 'Industrial Wayfinding', description: 'Bold signage, safety-lime signals, structural grid' },
  { id: 'atlas-cartographic', label: 'Atlas Cartographic', description: 'Map-based navigation, survey lines, topographic palette' },
];

export default function Home() {
  const [activeDesign, setActiveDesign] = useState<DesignId>('field-notebook');

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Design switcher bar */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-mono-id text-xs text-muted-foreground">TH / DESIGN REVIEW</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {DESIGNS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDesign(d.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeDesign === d.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                aria-pressed={activeDesign === d.id}
                title={d.description}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content">
        {activeDesign === 'field-notebook' && <FieldNotebookDesign />}
        {activeDesign === 'industrial-wayfinding' && <IndustrialWayfindingDesign />}
        {activeDesign === 'atlas-cartographic' && <AtlasCartographicDesign />}
      </main>
    </>
  );
}
