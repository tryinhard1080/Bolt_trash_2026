'use client';

import {
  ArrowRight, MapPin, FileText, Search, CircleDot,
  ExternalLink, Hash, ShieldCheck, BookOpen, Layers,
  ClipboardList, Truck, Ruler,
} from 'lucide-react';

const GUIDES = [
  { id: 'GD-001', title: 'Multifamily Collection Access', lifecycle: 'Collection', summary: 'How to read bin placement, aisle clearance, and hauler access at multifamily properties.', icon: Truck },
  { id: 'GD-002', title: 'Material Category Recognition', lifecycle: 'Materials', summary: 'Visual keys for identifying the six standard material streams and their contamination points.', icon: Layers },
  { id: 'GD-003', title: 'Site Walk Inspection', lifecycle: 'Site Walk', summary: 'A field sequence for inspecting enclosure condition, signage, and overflow at the point of collection.', icon: ClipboardList },
  { id: 'GD-004', title: 'Transfer Station Identification', lifecycle: 'Transfer', summary: 'Recognizing transfer station types, scale systems, and public drop-off access patterns.', icon: BookOpen },
];

const SUPPLIERS = [
  { id: 'SP-014', name: 'Northridge Haulers Co-op', category: 'Collection', region: 'Regional' },
  { id: 'SP-022', name: 'Valley Transfer Authority', category: 'Transfer', region: 'County' },
  { id: 'SP-031', name: 'Riverside Materials Recovery', category: 'Processing', region: 'Metro' },
];

const STEPS = [
  { icon: MapPin, label: 'Identify the place', desc: 'Recognize the property type and collection system.' },
  { icon: FileText, label: 'Find the guide', desc: 'Locate the relevant property-lifecycle guide.' },
  { icon: Search, label: 'Inspect evidence', desc: 'Review the public source and its limitations.' },
  { icon: CircleDot, label: 'Ask locally', desc: 'Use what you see to ask a better local question.' },
];

export default function FieldNotebookDesign() {
  return (
    <div className="paper-texture min-h-screen bg-background">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="border-b-2 border-primary bg-card/80 backdrop-blur-sm" role="banner">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm border-2 border-primary bg-background shadow-paper">
              <span className="font-serif-display text-xl font-bold text-primary">TH</span>
            </div>
            <div>
              <h1 className="font-serif-display text-xl font-bold leading-none text-primary sm:text-2xl">The Trash Hub</h1>
              <p className="mt-1 text-sm italic text-muted-foreground">A visual field guide to waste</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
            <a href="#guides" className="rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">Guides</a>
            <a href="#suppliers" className="rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">Suppliers</a>
            <a href="#sources" className="rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">Sources</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-5xl px-5 pt-12 pb-12 sm:px-8 sm:pt-16 sm:pb-16">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className="animate-fade-up">
                <div className="flex items-center gap-3">
                  <span className="stamp">Field Guide</span>
                  <span className="font-mono-id text-xs text-accent">Vol. 1 / 2026</span>
                </div>
                <h2 id="hero-heading" className="mt-5 font-serif-display text-3xl font-bold leading-tight text-primary sm:text-4xl" style={{ textWrap: 'balance' }}>
                  A visual field guide to waste
                </h2>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
                  Identify the system. Find the guide. Inspect the evidence.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#guides" className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lifted">
                    Browse guides <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#suppliers" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-primary bg-card px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                    Supplier directory
                  </a>
                </div>
              </div>
              <div className="relative animate-fade-in">
                <div className="overflow-hidden rounded-sm border-2 border-primary shadow-deep">
                  <img src="/field-guide-hero.webp" alt="Multifamily waste collection area with three bins at curbside on an overcast morning" className="aspect-[4/3] w-full object-cover" width={600} height={450} />
                </div>
                <div className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-sm border border-accent bg-card px-3 py-1.5 shadow-lifted">
                  <Ruler className="h-3 w-3 text-accent" />
                  <p className="font-mono-id text-xs text-accent">FIG. 01 / Collection access</p>
                </div>
                <div className="absolute -right-2 top-4 stamp opacity-70">Evidence</div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="border-b border-border bg-card" aria-labelledby="approach-heading">
          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
            <h3 id="approach-heading" className="font-serif-display text-lg font-semibold text-primary" style={{ textWrap: 'balance' }}>
              How to use this field guide
            </h3>
            <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((item, i) => (
                <li key={item.label} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary bg-background shadow-paper">
                      <item.icon className="h-4 w-4 text-primary" />
                    </span>
                    <span className="font-mono-id text-xs text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Guides */}
        <section id="guides" className="border-b border-border" aria-labelledby="guides-heading">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="flex items-end justify-between">
              <div>
                <h2 id="guides-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>
                  Property-lifecycle guides
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">Four field guides organized by lifecycle stage.</p>
              </div>
              <span className="hidden font-mono-id text-xs text-muted-foreground sm:block">{GUIDES.length} guides</span>
            </div>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {GUIDES.map((guide) => (
                <article key={guide.id} className="group flex flex-col gap-3 py-5 transition-colors hover:bg-card/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="flex items-start gap-4 sm:flex-1">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-card shadow-paper">
                      <guide.icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono-id text-xs text-accent">{guide.id}</span>
                        <span className="inline-flex items-center rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-primary">{guide.lifecycle}</span>
                      </div>
                      <h3 className="mt-1.5 font-serif-display text-lg font-semibold text-foreground group-hover:text-primary">{guide.title}</h3>
                      <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 self-start text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary sm:self-center" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Atlas */}
        <section className="border-b border-border bg-card" aria-labelledby="atlas-heading">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            <h2 id="atlas-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>
              Visual guide atlas
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A three-panel reference covering access, materials, and site walks.
            </p>
            <div className="mt-6 overflow-hidden rounded-sm border-2 border-primary shadow-lifted">
              <img src="/guide-atlas.webp" alt="Three-panel visual guide atlas showing access diagrams, material categories, and site walk checklist" className="w-full object-cover" width={1000} height={500} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { ref: 'Panel A', desc: 'Collection access cross-section' },
                { ref: 'Panel B', desc: 'Material category grid' },
                { ref: 'Panel C', desc: 'Site walk checklist' },
              ].map((panel) => (
                <div key={panel.ref} className="rounded-sm border border-border bg-background px-3 py-2.5 shadow-paper">
                  <p className="font-mono-id text-xs text-accent">{panel.ref}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{panel.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suppliers */}
        <section id="suppliers" className="border-b border-border" aria-labelledby="suppliers-heading">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            <h2 id="suppliers-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>
              Supplier directory
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Public-fact supplier records. No rankings, endorsements, or lead capture.</p>
            <div className="mt-8 overflow-x-auto rounded-sm border border-border shadow-paper">
              <table className="w-full">
                <caption className="sr-only">Supplier directory</caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-mono-id text-xs uppercase text-muted-foreground">ID</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                    <th scope="col" className="hidden px-4 py-3 text-left text-sm font-medium text-foreground sm:table-cell">Category</th>
                    <th scope="col" className="hidden px-4 py-3 text-left text-sm font-medium text-foreground sm:table-cell">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {SUPPLIERS.map((s) => (
                    <tr key={s.id} className="transition-colors hover:bg-muted/50">
                      <td className="px-4 py-3 font-mono-id text-xs text-accent">{s.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                      <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{s.category}</td>
                      <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{s.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-mono-id text-xs text-muted-foreground">Supplier records require an approved source snapshot and claim record.</p>
          </div>
        </section>

        {/* Sources */}
        <section id="sources" className="border-b border-border bg-card" aria-labelledby="sources-heading">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            <h2 id="sources-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>
              Source records
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every claim traces back to an approved public-source snapshot. Source IDs are listed for inspection, not as endorsements.
            </p>
            <div className="mt-8 rounded-sm border border-border bg-background p-5 shadow-paper">
              <div className="flex items-start gap-4">
                <Hash className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="flex-1">
                  <p className="font-mono-id text-xs text-accent">SRC-EPA-MOVING-REDUCE-REUSE</p>
                  <p className="mt-1 text-sm font-medium text-foreground">EPA Moving Toward a Sustainable Materials Management</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="font-mono-id text-xs text-muted-foreground">Approved 2026-09-01</span>
                    <span className="flex items-center gap-1 font-mono-id text-xs text-primary">
                      <ShieldCheck className="h-3.5 w-3.5" /> SHA-256 verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WasteWise */}
        <section className="border-b border-border bg-muted/40" aria-labelledby="ww-heading">
          <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
            <div className="flex items-center gap-3 text-sm">
              <ExternalLink className="h-4 w-4 shrink-0 text-accent" />
              <p className="text-muted-foreground">
                <span id="ww-heading" className="font-medium text-primary">WasteWise</span> is a separate product.{' '}
                <a href="#" className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-primary">Visit the approved preview link</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground" role="contentinfo">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary-foreground/30">
                  <span className="font-serif-display text-sm font-bold">TH</span>
                </div>
                <span className="font-serif-display text-lg font-semibold">The Trash Hub</span>
              </div>
              <p className="mt-2 text-xs text-primary-foreground/70">A visual field guide to waste. Public resource library and supplier directory.</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs" aria-label="Footer">
              <a href="#guides" className="text-primary-foreground/80 hover:text-primary-foreground">Guides</a>
              <a href="#suppliers" className="text-primary-foreground/80 hover:text-primary-foreground">Suppliers</a>
              <a href="#sources" className="text-primary-foreground/80 hover:text-primary-foreground">Sources</a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">WasteWise</a>
            </nav>
          </div>
          <div className="mt-8 border-t border-primary-foreground/20 pt-4">
            <p className="font-mono-id text-xs text-primary-foreground/50">No marketplace. No rankings. No lead capture. Static public resource.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
