'use client';

import {
  ArrowRight,
  Building2,
  Truck,
  Recycle,
  ClipboardCheck,
  ExternalLink,
  Hash,
  Layers,
  Zap,
  MapPin,
  TriangleAlert,
} from 'lucide-react';

const CATEGORIES = [
  { icon: Building2, label: 'Multifamily', code: 'MF', count: 4, span: 'lg:col-span-2 lg:row-span-2' },
  { icon: Truck, label: 'Collection', code: 'CO', count: 6, span: 'lg:col-span-2' },
  { icon: Recycle, label: 'Processing', code: 'PR', count: 3, span: 'lg:col-span-1' },
  { icon: ClipboardCheck, label: 'Site Walk', code: 'SW', count: 5, span: 'lg:col-span-1' },
];

const GUIDES = [
  { code: 'MF-01', title: 'Collection Access', desc: 'Bin placement, aisle clearance, hauler access at multifamily properties.', lifecycle: 'Multifamily', size: 'lg:col-span-3' },
  { code: 'MA-02', title: 'Material Recognition', desc: 'Six standard streams and their contamination points.', lifecycle: 'Processing', size: 'lg:col-span-2' },
  { code: 'SW-03', title: 'Site Walk Inspection', desc: 'Enclosure condition, signage, overflow at collection point.', lifecycle: 'Site Walk', size: 'lg:col-span-2' },
  { code: 'TR-04', title: 'Transfer Station ID', desc: 'Station types, scale systems, public drop-off patterns.', lifecycle: 'Collection', size: 'lg:col-span-3' },
];

const SUPPLIERS = [
  { code: 'SP-014', name: 'Northridge Haulers Co-op', cat: 'Collection', region: 'Regional' },
  { code: 'SP-022', name: 'Valley Transfer Authority', cat: 'Transfer', region: 'County' },
  { code: 'SP-031', name: 'Riverside MRF', cat: 'Processing', region: 'Metro' },
];

const PANELS = [
  { ref: 'Panel A', desc: 'Collection access cross-section', coord: 'A-01' },
  { ref: 'Panel B', desc: 'Material category grid', coord: 'B-02' },
  { ref: 'Panel C', desc: 'Site walk checklist', coord: 'C-03' },
];

export default function IndustrialWayfindingDesign() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Top utility bar */}
      <div className="border-b-2 border-secondary bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
          <span className="font-mono-id text-xs uppercase tracking-widest">TH / FIELD STATION</span>
          <div className="flex items-center gap-4">
            <span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground/70">EST. 2026</span>
            <span className="flex items-center gap-1.5 font-mono-id text-xs uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-secondary" />ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-2 border-primary bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center bg-primary">
                <span className="font-serif-display text-2xl font-bold text-primary-foreground">TH</span>
              </div>
              <div>
                <h1 className="font-serif-display text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl" style={{ textWrap: 'balance' }}>
                  The Trash Hub
                </h1>
                <p className="font-mono-id text-xs uppercase tracking-wider text-muted-foreground">A visual field guide to waste</p>
              </div>
            </div>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              <a href="#categories" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Categories</a>
              <a href="#guides" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Guides</a>
              <a href="#suppliers" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Suppliers</a>
              <a href="#sources" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Sources</a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative border-b-2 border-primary" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 lg:border-r-2 lg:border-dashed lg:border-border">
                <div className="py-10 sm:py-14 lg:pr-10 lg:pt-20">
                  <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1 animate-fade-in">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono-id text-xs font-bold uppercase tracking-widest text-primary">FIELD STATION / 01</span>
                  </div>
                  <h2 id="hero-heading" className="mt-6 font-serif-display text-4xl font-bold uppercase leading-none text-primary sm:text-5xl lg:text-6xl animate-fade-up" style={{ textWrap: 'balance' }}>
                    Recognize<br />the system
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    A public visual resource library and public-fact supplier directory. Identify waste systems, find lifecycle guides, inspect public evidence.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <a href="#guides" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      Enter guides<ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#suppliers" className="inline-flex items-center gap-2 border-2 border-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      Supplier directory
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative h-64 lg:h-full">
                  <img src="/industrial-wayfinding.webp" alt="Industrial waste transfer station with overhead structure and safety signage" className="h-full w-full object-cover animate-scale-in" width={500} height={600} />
                  <div className="absolute bottom-0 left-0 bg-primary px-4 py-2">
                    <p className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground">FIG.01 / TRANSFER STATION</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wayfinding categories — asymmetric bento */}
        <section id="categories" className="border-b-2 border-primary bg-card" aria-labelledby="cat-heading">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 bg-secondary" />
              <h2 id="cat-heading" className="font-serif-display text-xl font-bold uppercase tracking-tight text-primary" style={{ textWrap: 'balance' }}>Wayfinding Categories</h2>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:auto-rows-[minmax(120px,auto)]">
              {CATEGORIES.map((cat) => (
                <a key={cat.code} href="#guides" className={`group relative overflow-hidden border-2 border-primary bg-background p-5 transition-all hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary animate-fade-up ${cat.span}`}>
                  <div className="flex items-start justify-between">
                    <cat.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                    <span className="font-mono-id text-xs font-bold text-secondary group-hover:text-secondary">{cat.code}</span>
                  </div>
                  <p className="mt-4 text-sm font-bold uppercase tracking-wide text-primary group-hover:text-primary-foreground">{cat.label}</p>
                  <p className="mt-1 font-mono-id text-xs text-muted-foreground group-hover:text-primary-foreground/70">{cat.count} guides</p>
                  <div className="mt-3 h-1 w-full bg-border group-hover:bg-secondary" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Guides — structural grid, varied sizes */}
        <section id="guides" className="border-b-2 border-primary" aria-labelledby="guides-heading">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1.5 bg-secondary" />
                <h2 id="guides-heading" className="font-serif-display text-xl font-bold uppercase tracking-tight text-primary" style={{ textWrap: 'balance' }}>Property-Lifecycle Guides</h2>
              </div>
              <span className="font-mono-id text-xs uppercase text-muted-foreground">{GUIDES.length} entries</span>
            </div>
            <div className="mt-8 grid gap-px bg-border lg:grid-cols-5">
              {GUIDES.map((guide) => (
                <article key={guide.code} className={`group flex flex-col bg-card p-6 transition-colors hover:bg-background animate-fade-up ${guide.size}`}>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center bg-secondary px-2 py-0.5 font-mono-id text-xs font-bold uppercase text-primary">{guide.lifecycle}</span>
                    <span className="font-mono-id text-xs font-bold text-accent">{guide.code}</span>
                  </div>
                  <h3 className="mt-4 font-serif-display text-lg font-bold text-primary group-hover:text-secondary" style={{ textWrap: 'balance' }}>{guide.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{guide.desc}</p>
                  <div className="mt-auto pt-4 flex items-center gap-1 text-primary">
                    <span className="font-mono-id text-xs uppercase tracking-wide">Open</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Visual atlas — image with 3 panels */}
        <section className="border-b-2 border-primary bg-card" aria-labelledby="atlas-heading">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 bg-secondary" />
              <h2 id="atlas-heading" className="font-serif-display text-xl font-bold uppercase tracking-tight text-primary" style={{ textWrap: 'balance' }}>Visual Guide Atlas</h2>
            </div>
            <div className="mt-8 overflow-hidden border-2 border-primary animate-scale-in">
              <img src="/guide-atlas.webp" alt="Three-panel visual guide atlas for waste systems showing access, materials, and site walks" className="w-full object-cover" width={1200} height={500} />
            </div>
            <div className="mt-4 grid gap-px bg-border sm:grid-cols-3">
              {PANELS.map((panel) => (
                <div key={panel.ref} className="bg-background p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-id text-xs font-bold uppercase text-accent">{panel.ref}</span>
                    <span className="font-mono-id text-xs text-muted-foreground">[{panel.coord}]</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{panel.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suppliers — directory board */}
        <section id="suppliers" className="border-b-2 border-primary bg-card" aria-labelledby="suppliers-heading">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1.5 bg-secondary" />
                <h2 id="suppliers-heading" className="font-serif-display text-xl font-bold uppercase tracking-tight text-primary" style={{ textWrap: 'balance' }}>Supplier Directory</h2>
              </div>
              <div className="flex items-center gap-2 bg-destructive/10 px-3 py-1">
                <TriangleAlert className="h-3.5 w-3.5 text-destructive" />
                <span className="font-mono-id text-xs uppercase text-destructive">No rankings / No endorsements</span>
              </div>
            </div>
            <div className="mt-8 border-2 border-primary">
              <div className="grid grid-cols-12 gap-px bg-border">
                <div className="col-span-2 bg-primary px-4 py-3"><span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground">ID</span></div>
                <div className="col-span-5 bg-primary px-4 py-3"><span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground">Name</span></div>
                <div className="col-span-3 bg-primary px-4 py-3"><span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground">Category</span></div>
                <div className="col-span-2 bg-primary px-4 py-3"><span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground">Region</span></div>
                {SUPPLIERS.map((s) => (
                  <div key={s.code} className="contents">
                    <div className="col-span-2 bg-card px-4 py-3"><span className="font-mono-id text-xs font-bold text-accent">{s.code}</span></div>
                    <div className="col-span-5 bg-card px-4 py-3"><span className="text-sm font-medium text-foreground">{s.name}</span></div>
                    <div className="col-span-3 bg-card px-4 py-3"><span className="text-sm text-muted-foreground">{s.cat}</span></div>
                    <div className="col-span-2 bg-card px-4 py-3"><span className="font-mono-id text-xs text-muted-foreground">{s.region}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 font-mono-id text-xs uppercase text-muted-foreground">Every supplier record requires an approved source snapshot. No supplier is a recommendation.</p>
          </div>
        </section>

        {/* Sources */}
        <section id="sources" className="border-b-2 border-primary bg-background" aria-labelledby="sources-heading">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 bg-secondary" />
              <h2 id="sources-heading" className="font-serif-display text-xl font-bold uppercase tracking-tight text-primary" style={{ textWrap: 'balance' }}>Source Records</h2>
            </div>
            <div className="mt-8 grid gap-px bg-border lg:grid-cols-2">
              <div className="flex items-start gap-4 bg-card p-6 animate-fade-up">
                <Hash className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-mono-id text-xs font-bold text-accent">SRC-EPA-MOVING-REDUCE-REUSE</p>
                  <p className="mt-1 text-sm font-medium text-foreground">EPA Sustainable Materials Management</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-mono-id text-xs text-muted-foreground">Approved 2026-09-01</span>
                    <span className="flex items-center gap-1 font-mono-id text-xs text-secondary"><span className="h-1.5 w-1.5 rounded-full bg-secondary" />SHA-256 verified</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-card p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <Layers className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-mono-id text-xs font-bold text-accent">SRC-MANIFEST-2026-Q3</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Source packet manifest, Q3 batch</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-mono-id text-xs text-muted-foreground">Manifest admitted</span>
                    <span className="flex items-center gap-1 font-mono-id text-xs text-secondary"><span className="h-1.5 w-1.5 rounded-full bg-secondary" />Integrity clean</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WasteWise */}
        <section className="border-b-2 border-primary bg-secondary/15">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-foreground">
                <span className="font-bold uppercase tracking-wide text-primary">WasteWise</span> is a separate product.{' '}
                <a href="#" className="font-medium text-accent underline underline-offset-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Visit the approved preview link</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-primary-foreground">
                  <span className="font-serif-display text-lg font-bold text-primary">TH</span>
                </div>
                <div>
                  <p className="font-serif-display text-lg font-bold uppercase">The Trash Hub</p>
                  <p className="font-mono-id text-xs uppercase tracking-wider text-primary-foreground/60">A visual field guide to waste</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#categories" className="text-xs uppercase tracking-wide text-primary-foreground/80 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground">Categories</a>
              <a href="#guides" className="text-xs uppercase tracking-wide text-primary-foreground/80 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground">Guides</a>
              <a href="#suppliers" className="text-xs uppercase tracking-wide text-primary-foreground/80 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground">Suppliers</a>
              <a href="#sources" className="text-xs uppercase tracking-wide text-primary-foreground/80 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground">Sources</a>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/20 pt-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground/50">No marketplace</span>
              <span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground/50">No rankings</span>
              <span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground/50">No lead capture</span>
              <span className="font-mono-id text-xs uppercase tracking-widest text-primary-foreground/50">Static public resource</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
