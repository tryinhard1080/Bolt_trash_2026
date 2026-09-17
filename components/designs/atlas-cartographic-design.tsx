'use client';

import {
  Compass,
  MapPin,
  ArrowRight,
  FileText,
  Search,
  ExternalLink,
  Hash,
  Route,
  Layers,
  CircleDot,
  Navigation,
} from 'lucide-react';

const ROUTES = [
  { id: 'R-01', name: 'Collection Access', start: 'Property', end: 'Curb', distance: '0.1 mi' },
  { id: 'R-02', name: 'Material Stream', start: 'Bin', end: 'MRF', distance: '12 mi' },
  { id: 'R-03', name: 'Transfer Path', start: 'Station', end: 'Landfill', distance: '38 mi' },
  { id: 'R-04', name: 'Site Walk', start: 'Entrance', end: 'Enclosure', distance: '0.3 mi' },
];

const GUIDES = [
  { id: 'GD-001', title: 'Multifamily Collection Access', region: 'N. Sector', lifecycle: 'Collection' },
  { id: 'GD-002', title: 'Material Category Recognition', region: 'All Sectors', lifecycle: 'Materials' },
  { id: 'GD-003', title: 'Site Walk Inspection', region: 'Field', lifecycle: 'Site Walk' },
  { id: 'GD-004', title: 'Transfer Station Identification', region: 'Regional', lifecycle: 'Transfer' },
];

const SUPPLIERS = [
  { id: 'SP-014', name: 'Northridge Haulers Co-op', sector: 'N. Sector', coord: '34.21N / 118.51W' },
  { id: 'SP-022', name: 'Valley Transfer Authority', sector: 'S. Sector', coord: '34.05N / 118.24W' },
  { id: 'SP-031', name: 'Riverside Materials Recovery', sector: 'E. Sector', coord: '33.95N / 117.39W' },
];

export default function AtlasCartographicDesign() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-dashed border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 sm:px-8">
          <div className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5 text-accent" />
            <span className="font-mono-id text-xs text-muted-foreground">
              THE TRASH HUB / CARTOGRAPHIC SURVEY
            </span>
          </div>
          <span className="font-mono-id text-xs text-muted-foreground">
            PLATE 01 / 2026
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-2 border-primary">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary">
                  <span className="font-serif-display text-xl font-bold text-primary">TH</span>
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-primary bg-secondary" />
                </div>
                <div>
                  <h1 className="font-serif-display text-3xl font-bold leading-none text-primary sm:text-4xl">
                    The Trash Hub
                  </h1>
                  <p className="mt-1.5 font-mono-id text-xs uppercase tracking-wider text-muted-foreground">
                    A visual field guide to waste
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Primary">
              <a href="#guides" className="rounded-sm px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">Guides</a>
              <a href="#suppliers" className="rounded-sm px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">Suppliers</a>
              <a href="#sources" className="rounded-sm px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">Sources</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero — map-based */}
      <section className="relative border-b border-border" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5 animate-fade-in">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-accent" />
                <span className="font-mono-id text-xs uppercase tracking-wider text-accent">
                  Survey Route / 01
                </span>
              </div>
              <h2 id="hero-heading" className="mt-4 font-serif-display text-3xl font-bold leading-tight text-primary sm:text-4xl">
                Chart the waste system at the property level.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                A public visual resource library and public-fact supplier
                directory. Read the place, trace the route, inspect the evidence,
                and ask a better local question.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#guides"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Open the atlas
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#suppliers"
                  className="inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Supplier directory
                </a>
              </div>
            </div>
            <div className="md:col-span-7 animate-fade-in">
              <div className="relative overflow-hidden rounded-sm border-2 border-primary shadow-md">
                <img
                  src="/atlas-cartographic.webp"
                  alt="Cartographic survey map of waste collection routes with dashed wayfinding lines and transfer station markers"
                  className="w-full object-cover"
                  width={700}
                  height={450}
                />
                <div className="absolute left-3 top-3 rounded-sm border border-accent bg-card/90 px-2.5 py-1 backdrop-blur-sm">
                  <p className="font-mono-id text-xs text-accent">SURVEY MAP / 01</p>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-sm border border-primary bg-card/90 px-2.5 py-1 backdrop-blur-sm">
                  <Navigation className="h-3 w-3 text-primary" />
                  <span className="font-mono-id text-xs text-primary">N / SCALE 1:2400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey routes */}
      <section className="border-b border-border bg-card" aria-labelledby="routes-heading">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Legend / Routes</p>
              <h2 id="routes-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
                Survey routes
              </h2>
            </div>
            <span className="font-mono-id text-xs text-muted-foreground">{ROUTES.length} routes</span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROUTES.map((route) => (
              <div key={route.id} className="group rounded-sm border border-dashed border-border bg-background p-5 transition-all hover:border-primary hover:border-solid hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono-id text-xs text-accent">{route.id}</span>
                  <CircleDot className="h-3.5 w-3.5 text-secondary" />
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{route.name}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono-id">{route.start}</span>
                  <span className="h-px flex-1 bg-border">
                    <span className="block h-px w-full bg-[repeating-linear-gradient(90deg,transparent_0,transparent_3px,hsl(var(--border))_3px,hsl(var(--border))_6px)]" />
                  </span>
                  <span className="font-mono-id">{route.end}</span>
                </div>
                <p className="mt-2 font-mono-id text-xs text-muted-foreground">{route.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides — map grid */}
      <section id="guides" className="border-b border-border" aria-labelledby="guides-heading">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Section A</p>
              <h2 id="guides-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
                Property-lifecycle guides
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
            {GUIDES.map((guide) => (
              <article key={guide.id} className="group bg-card p-6 transition-colors hover:bg-background">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="font-mono-id text-xs font-bold text-primary">{guide.id.split('-')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-id text-xs text-accent">{guide.id}</span>
                      <span className="inline-flex items-center rounded-full border border-secondary px-2 py-0.5 text-xs text-primary">
                        {guide.lifecycle}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif-display text-lg font-semibold text-foreground group-hover:text-primary">
                      {guide.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 font-mono-id text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {guide.region}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual atlas plate */}
      <section className="border-b border-border bg-card" aria-labelledby="atlas-heading">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
          <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Plate 02</p>
          <h2 id="atlas-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
            Visual guide atlas
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A three-panel survey covering access, materials, and site walks.
            Use it alongside the guides to recognize what you see in the field.
          </p>
          <div className="mt-8 overflow-hidden rounded-sm border-2 border-primary shadow-sm">
            <img
              src="/guide-atlas.webp"
              alt="Three-panel visual guide atlas for waste systems showing access, materials, and site walks"
              className="w-full object-cover"
              width={1000}
              height={450}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { ref: 'Panel A', desc: 'Collection access cross-section', coord: 'A-01' },
              { ref: 'Panel B', desc: 'Material category grid', coord: 'B-02' },
              { ref: 'Panel C', desc: 'Site walk checklist', coord: 'C-03' },
            ].map((panel) => (
              <div key={panel.ref} className="border-l-2 border-secondary pl-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono-id text-xs text-accent">{panel.ref}</span>
                  <span className="font-mono-id text-xs text-muted-foreground">[{panel.coord}]</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{panel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers — coordinate table */}
      <section id="suppliers" className="border-b border-border" aria-labelledby="suppliers-heading">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Section B</p>
              <h2 id="suppliers-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
                Supplier directory
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Public-fact supplier records with survey coordinates. No rankings or endorsements.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-dashed border-border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr className="border-b border-dashed border-border">
                  <th className="px-4 py-3 text-left font-mono-id text-xs uppercase text-muted-foreground">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                  <th className="hidden px-4 py-3 text-left text-sm font-medium text-foreground sm:table-cell">Sector</th>
                  <th className="hidden px-4 py-3 text-left font-mono-id text-xs uppercase text-muted-foreground md:table-cell">Coordinates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border">
                {SUPPLIERS.map((s) => (
                  <tr key={s.id} className="bg-card transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3 font-mono-id text-xs text-accent">{s.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{s.sector}</td>
                    <td className="hidden px-4 py-3 font-mono-id text-xs text-muted-foreground md:table-cell">{s.coord}</td>
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
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
          <p className="font-mono-id text-xs uppercase tracking-wider text-accent">Section C</p>
          <h2 id="sources-heading" className="mt-2 font-serif-display text-2xl font-bold text-primary">
            Source records
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every claim and supplier entry traces back to an approved public-source
            snapshot. Source IDs are listed for inspection, not as endorsements.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 rounded-sm border border-dashed border-border p-5">
              <Hash className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-mono-id text-xs text-accent">SRC-EPA-MOVING-REDUCE-REUSE</p>
                <p className="mt-1 text-sm text-foreground">EPA Moving Toward a Sustainable Materials Management</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono-id text-xs text-muted-foreground">Approved 2026-09-01</span>
                  <span className="flex items-center gap-1 font-mono-id text-xs text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    SHA-256 verified
                  </span>
                  <span className="font-mono-id text-xs text-muted-foreground">Manifest admitted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WasteWise */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4 text-accent" />
            <span>
              <span className="font-medium text-primary">WasteWise</span> is a separate product.{' '}
              <a href="#" className="font-medium text-accent underline underline-offset-2 hover:text-primary">
                Visit the approved preview link
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/30">
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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono-id text-xs text-primary-foreground/50">No marketplace</span>
              <span className="font-mono-id text-xs text-primary-foreground/50">No rankings</span>
              <span className="font-mono-id text-xs text-primary-foreground/50">No lead capture</span>
              <span className="font-mono-id text-xs text-primary-foreground/50">Static public resource</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
