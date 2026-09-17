'use client';

import {
  BookOpen,
  MapPin,
  FileText,
  Search,
  ArrowRight,
  CircleDot,
  Ruler,
  ClipboardList,
  ExternalLink,
  Hash,
} from 'lucide-react';

const GUIDES = [
  {
    id: 'GD-001',
    title: 'Multifamily Collection Access',
    lifecycle: 'Collection',
    summary: 'How to read bin placement, aisle clearance, and hauler access at multifamily properties.',
    tags: ['Access', 'Bins', 'Hauler'],
  },
  {
    id: 'GD-002',
    title: 'Material Category Recognition',
    lifecycle: 'Materials',
    summary: 'Visual keys for identifying the six standard material streams and their contamination points.',
    tags: ['Materials', 'Sorting', 'Contamination'],
  },
  {
    id: 'GD-003',
    title: 'Site Walk Inspection',
    lifecycle: 'Site Walk',
    summary: 'A field sequence for inspecting enclosure condition, signage, and overflow at the point of collection.',
    tags: ['Inspection', 'Enclosure', 'Signage'],
  },
  {
    id: 'GD-004',
    title: 'Transfer Station Identification',
    lifecycle: 'Transfer',
    summary: 'Recognizing transfer station types, scale systems, and public drop-off access patterns.',
    tags: ['Transfer', 'Scale', 'Drop-off'],
  },
];

const SUPPLIERS = [
  { id: 'SP-014', name: 'Northridge Haulers Co-op', category: 'Collection', region: 'Regional' },
  { id: 'SP-022', name: 'Valley Transfer Authority', category: 'Transfer', region: 'County' },
  { id: 'SP-031', name: 'Riverside Materials Recovery', category: 'Processing', region: 'Metro' },
];

export default function FieldNotebookDesign() {
  return (
    <div className="paper-grain min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 sm:py-12">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border-2 border-primary bg-card">
                  <span className="font-serif-display text-xl font-bold text-primary">TH</span>
                </div>
                <div>
                  <h1 className="font-serif-display text-3xl font-bold leading-tight text-primary sm:text-4xl">
                    The Trash Hub
                  </h1>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    A visual field guide to waste
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden sm:flex sm:items-center sm:gap-1" aria-label="Primary">
              <a href="#guides" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Guides
              </a>
              <a href="#suppliers" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Suppliers
              </a>
              <a href="#sources" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Sources
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="animate-fade-in">
              <p className="font-mono-id text-xs uppercase tracking-wider text-accent">
                Field Guide / Vol. 1
              </p>
              <h2 id="hero-heading" className="mt-3 font-serif-display text-2xl font-bold leading-snug text-primary sm:text-3xl">
                Recognize the system. Find the guide. Ask a better local question.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The Trash Hub is a public visual resource library and public-fact
                supplier directory. It helps readers identify waste systems at the
                property level, locate the relevant lifecycle guide, and inspect
                the public evidence behind each record.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#guides"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse guides
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#suppliers"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Supplier directory
                </a>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="overflow-hidden rounded-md border border-border shadow-sm">
                <img
                  src="/field-guide-hero.webp"
                  alt="Multifamily waste collection area with three bins at curbside on an overcast morning"
                  className="h-full w-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
              <div className="absolute -bottom-3 -left-3 rounded-sm border border-accent bg-card px-3 py-1.5 shadow-sm">
                <p className="font-mono-id text-xs text-accent">
                  FIG. 01 / Collection access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content hierarchy callout */}
      <section className="border-b border-border bg-card" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
          <h3 id="approach-heading" className="font-serif-display text-lg font-semibold text-primary">
            How to use this field guide
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, step: '01', label: 'Identify the place', desc: 'Recognize the property type and collection system.' },
              { icon: FileText, step: '02', label: 'Find the guide', desc: 'Locate the relevant property-lifecycle guide.' },
              { icon: Search, step: '03', label: 'Inspect evidence', desc: 'Review the public source and its limitations.' },
              { icon: CircleDot, step: '04', label: 'Ask locally', desc: 'Use what you see to ask a better local question.' },
            ].map((item) => (
              <div key={item.step} className="border-l-2 border-secondary pl-4">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="font-mono-id text-xs text-muted-foreground">{item.step}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section id="guides" className="border-b border-border" aria-labelledby="guides-heading">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Section A</p>
              <h2 id="guides-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
                Property-lifecycle guides
              </h2>
            </div>
            <span className="font-mono-id text-xs text-muted-foreground">
              {GUIDES.length} guides
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {GUIDES.map((guide) => (
              <article
                key={guide.id}
                className="group rounded-md border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-id text-xs text-accent">{guide.id}</span>
                      <span className="inline-flex items-center rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {guide.lifecycle}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif-display text-lg font-semibold text-foreground group-hover:text-primary">
                      {guide.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {guide.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {guide.tags.map((tag) => (
                        <span key={tag} className="font-mono-id text-xs text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual guide atlas */}
      <section className="border-b border-border bg-card" aria-labelledby="atlas-heading">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
          <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Plate 01</p>
          <h2 id="atlas-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
            Visual guide atlas
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A three-panel reference covering access, materials, and site walks.
            Use it alongside the guides to recognize what you see in the field.
          </p>
          <div className="mt-8 overflow-hidden rounded-md border border-border shadow-sm">
            <img
              src="/guide-atlas.webp"
              alt="Three-panel visual guide atlas showing access diagrams, material categories, and site walk checklist"
              className="w-full object-cover"
              width={1000}
              height={500}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="border-l-2 border-secondary pl-3">
              <p className="font-mono-id text-xs text-accent">Panel A</p>
              <p className="mt-1 text-xs text-muted-foreground">Collection access cross-section</p>
            </div>
            <div className="border-l-2 border-secondary pl-3">
              <p className="font-mono-id text-xs text-accent">Panel B</p>
              <p className="mt-1 text-xs text-muted-foreground">Material category grid</p>
            </div>
            <div className="border-l-2 border-secondary pl-3">
              <p className="font-mono-id text-xs text-accent">Panel C</p>
              <p className="mt-1 text-xs text-muted-foreground">Site walk checklist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Suppliers */}
      <section id="suppliers" className="border-b border-border" aria-labelledby="suppliers-heading">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Section B</p>
              <h2 id="suppliers-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
                Supplier directory
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Public-fact supplier records. No rankings, endorsements, or lead capture.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-md border border-border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-mono-id text-xs uppercase text-muted-foreground">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium text-foreground sm:table-cell">Category</th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium text-foreground sm:table-cell">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SUPPLIERS.map((s) => (
                  <tr key={s.id} className="bg-card transition-colors hover:bg-muted/50">
                    <td className="px-4 py-3 font-mono-id text-xs text-accent">{s.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{s.category}</td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{s.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono-id text-xs text-muted-foreground">
            Supplier records require an approved source snapshot and claim record. No supplier is a recommendation.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section id="sources" className="border-b border-border bg-card" aria-labelledby="sources-heading">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
          <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Section C</p>
          <h2 id="sources-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
            Source records
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every claim and supplier entry traces back to an approved public-source
            snapshot. Source IDs are listed for inspection, not as endorsements.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-start gap-4 rounded-md border border-border p-4">
              <Hash className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-mono-id text-xs text-accent">SRC-EPA-MOVING-REDUCE-REUSE</p>
                <p className="mt-1 text-sm text-foreground">EPA Moving Toward a Sustainable Materials Management</p>
                <p className="mt-1 text-xs text-muted-foreground">Approved 2026-09-01 / SHA-256 verified / Manifest admitted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WasteWise link */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4 text-accent" />
            <span>
              WasteWise is a separate product.{' '}
              <a href="#" className="font-medium text-accent underline underline-offset-2 hover:text-primary">
                Visit the approved preview link
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary-foreground/30">
                  <span className="font-serif-display text-sm font-bold">TH</span>
                </div>
                <span className="font-serif-display text-lg font-semibold">The Trash Hub</span>
              </div>
              <p className="mt-2 text-xs text-primary-foreground/70">
                A visual field guide to waste. Public resource library and supplier directory.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-primary-foreground/80">
              <a href="#guides" className="hover:text-primary-foreground">Guides</a>
              <a href="#suppliers" className="hover:text-primary-foreground">Suppliers</a>
              <a href="#sources" className="hover:text-primary-foreground">Sources</a>
              <a href="#" className="hover:text-primary-foreground">WasteWise</a>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/20 pt-4">
            <p className="font-mono-id text-xs text-primary-foreground/50">
              No marketplace. No rankings. No lead capture. Static public resource.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
