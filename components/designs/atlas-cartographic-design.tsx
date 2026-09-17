'use client';

import {
  Compass, MapPin, ArrowRight, ArrowDownRight, ExternalLink,
  Hash, Route, Crosshair, Navigation, Fingerprint, Layers, Ruler,
} from 'lucide-react';

const ROUTES = [
  { id: 'R-01', name: 'Collection Access', start: 'Property', end: 'Curb', distance: '0.1 mi', bearing: 'N' },
  { id: 'R-02', name: 'Material Stream', start: 'Bin', end: 'MRF', distance: '12 mi', bearing: 'NE' },
  { id: 'R-03', name: 'Transfer Path', start: 'Station', end: 'Landfill', distance: '38 mi', bearing: 'E' },
  { id: 'R-04', name: 'Site Walk', start: 'Entrance', end: 'Enclosure', distance: '0.3 mi', bearing: 'S' },
];

const GUIDES = [
  { id: 'GD-001', title: 'Multifamily Collection Access', region: 'N. Sector', lifecycle: 'Collection', coord: 'A-01' },
  { id: 'GD-002', title: 'Material Category Recognition', region: 'All Sectors', lifecycle: 'Materials', coord: 'B-02' },
  { id: 'GD-003', title: 'Site Walk Inspection', region: 'Field', lifecycle: 'Site Walk', coord: 'C-03' },
  { id: 'GD-004', title: 'Transfer Station Identification', region: 'Regional', lifecycle: 'Transfer', coord: 'D-04' },
];

const SUPPLIERS = [
  { id: 'SP-014', name: 'Northridge Haulers Co-op', sector: 'N. Sector', coord: '34.21N / 118.51W' },
  { id: 'SP-022', name: 'Valley Transfer Authority', sector: 'S. Sector', coord: '34.05N / 118.24W' },
  { id: 'SP-031', name: 'Riverside Materials Recovery', sector: 'E. Sector', coord: '33.95N / 117.39W' },
];

export default function AtlasCartographicDesign() {
  return (
    <div className="topo-lines min-h-screen bg-background">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Coordinate strip */}
      <div className="border-b border-dashed border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 sm:px-8">
          <div className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="font-mono-id text-xs text-muted-foreground">THE TRASH HUB / CARTOGRAPHIC SURVEY</span>
          </div>
          <span className="font-mono-id text-xs text-muted-foreground">PLATE 01 / 2026</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-2 border-primary bg-card/80 backdrop-blur-sm shadow-paper">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lifted">
                <span className="font-serif-display text-xl font-bold text-primary">TH</span>
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-primary bg-secondary shadow-[0_0_6px_hsl(72_76%_50%)]" />
              </div>
              <div>
                <h1 className="font-serif-display text-3xl font-bold leading-none text-primary sm:text-4xl" style={{ textWrap: 'balance' }}>The Trash Hub</h1>
                <p className="mt-1.5 font-mono-id text-xs uppercase tracking-wider text-muted-foreground">A visual field guide to waste</p>
              </div>
            </div>
            <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Primary">
              <a href="#guides" className="rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">Guides</a>
              <a href="#suppliers" className="rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">Suppliers</a>
              <a href="#sources" className="rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">Sources</a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-6xl px-6 pt-12 pb-10 sm:px-8 sm:pt-16 sm:pb-14">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-5 animate-fade-up">
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="font-mono-id text-xs uppercase tracking-wider text-accent">Survey Route / 01</span>
                </div>
                <h2 id="hero-heading" className="mt-4 font-serif-display text-3xl font-bold leading-tight text-primary sm:text-4xl" style={{ textWrap: 'balance' }}>
                  Chart the waste system at the property level.
                </h2>
                <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                  A public visual resource library and public-fact supplier directory. Read the place, trace the route, inspect the evidence.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#guides" className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lifted">
                    Open the atlas <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#suppliers" className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                    Supplier directory
                  </a>
                </div>
              </div>
              <div className="md:col-span-7 animate-fade-in">
                <div className="relative overflow-hidden rounded-sm border-2 border-primary shadow-deep">
                  <img src="/atlas-cartographic.webp" alt="Cartographic survey map of waste collection routes" className="w-full object-cover" width={700} height={450} />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-sm border border-accent bg-card/90 px-2.5 py-1 shadow-paper backdrop-blur-sm">
                    <Crosshair className="h-3 w-3 text-accent" />
                    <p className="font-mono-id text-xs text-accent">SURVEY MAP / 01</p>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-sm border border-primary bg-card/90 px-2.5 py-1 shadow-paper backdrop-blur-sm">
                    <Navigation className="h-3 w-3 text-primary" aria-hidden="true" />
                    <span className="font-mono-id text-xs text-primary">N / SCALE 1:2400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Survey routes */}
        <section className="border-b border-border bg-card" aria-labelledby="routes-heading">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
            <div className="flex items-end justify-between">
              <h2 id="routes-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>Survey routes</h2>
              <span className="font-mono-id text-xs text-muted-foreground">{ROUTES.length} routes logged</span>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              {/* R-01 featured */}
              <article className="group rounded-sm border border-dashed border-border bg-background p-6 transition-all hover:border-primary hover:border-solid hover:shadow-lifted lg:col-span-7 animate-fade-up">
                <div className="flex items-center justify-between">
                  <span className="font-mono-id text-sm text-accent">{ROUTES[0].id}</span>
                  <Crosshair className="h-4 w-4 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-serif-display text-xl font-semibold text-foreground group-hover:text-primary">{ROUTES[0].name}</h3>
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-mono-id text-xs text-muted-foreground">{ROUTES[0].start}</span>
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <Compass className="h-4 w-4 text-accent" aria-hidden="true" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <span className="font-mono-id text-xs text-muted-foreground">{ROUTES[0].end}</span>
                </div>
                <p className="mt-3 font-mono-id text-xs text-muted-foreground">{ROUTES[0].distance} / bearing {ROUTES[0].bearing}</p>
              </article>

              {/* R-02 compact */}
              <article className="group rounded-sm border border-dashed border-border bg-background p-6 transition-all hover:border-primary hover:border-solid hover:shadow-paper lg:col-span-5 animate-fade-up">
                <div className="flex items-center justify-between">
                  <span className="font-mono-id text-sm text-accent">{ROUTES[1].id}</span>
                  <Crosshair className="h-4 w-4 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-serif-display text-lg font-semibold text-foreground group-hover:text-primary">{ROUTES[1].name}</h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono-id text-xs text-muted-foreground">{ROUTES[1].start}</span>
                  <ArrowDownRight className="h-3 w-3 text-accent" aria-hidden="true" />
                  <span className="font-mono-id text-xs text-muted-foreground">{ROUTES[1].end}</span>
                </div>
                <p className="mt-2 font-mono-id text-xs text-muted-foreground">{ROUTES[1].distance} / bearing {ROUTES[1].bearing}</p>
              </article>

              {/* R-03 inline */}
              <article className="group flex items-center gap-4 rounded-sm border border-dashed border-border bg-background p-5 transition-all hover:border-primary hover:border-solid hover:shadow-paper lg:col-span-5 animate-fade-up">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card shadow-paper">
                  <span className="font-mono-id text-xs font-bold text-primary">03</span>
                </div>
                <div className="flex-1">
                  <span className="font-mono-id text-xs text-accent">{ROUTES[2].id}</span>
                  <h3 className="font-serif-display text-base font-semibold text-foreground group-hover:text-primary">{ROUTES[2].name}</h3>
                  <p className="font-mono-id text-xs text-muted-foreground">{ROUTES[2].start} to {ROUTES[2].end} / {ROUTES[2].distance}</p>
                </div>
              </article>

              {/* R-04 wider inline */}
              <article className="group flex items-center gap-4 rounded-sm border border-dashed border-border bg-background p-5 transition-all hover:border-primary hover:border-solid hover:shadow-paper lg:col-span-7 animate-fade-up">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card shadow-paper">
                  <span className="font-mono-id text-xs font-bold text-primary">04</span>
                </div>
                <div className="flex-1">
                  <span className="font-mono-id text-xs text-accent">{ROUTES[3].id}</span>
                  <h3 className="font-serif-display text-base font-semibold text-foreground group-hover:text-primary">{ROUTES[3].name}</h3>
                  <p className="font-mono-id text-xs text-muted-foreground">{ROUTES[3].start} to {ROUTES[3].end} / {ROUTES[3].distance}</p>
                </div>
                <div className="hidden shrink-0 items-center gap-1 sm:flex">
                  <Compass className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="font-mono-id text-xs text-muted-foreground">{ROUTES[3].bearing}</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Guides */}
        <section id="guides" className="border-b border-border" aria-labelledby="guides-heading">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
            <h2 id="guides-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>Property-lifecycle guides</h2>
            <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">Four field guides organized by lifecycle stage. Each carries a coordinate reference for cross-reading with the atlas plates.</p>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {GUIDES.map((guide, i) => (
                <article key={guide.id} className={`group bg-card p-6 transition-colors hover:bg-background animate-fade-up ${i === 0 || i === 3 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-id text-xs text-accent">{guide.id}</span>
                    <span className="font-mono-id text-xs text-muted-foreground">[{guide.coord}]</span>
                  </div>
                  <h3 className="mt-3 font-serif-display text-lg font-semibold text-foreground group-hover:text-primary" style={{ textWrap: 'balance' }}>{guide.title}</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-secondary px-2.5 py-0.5 text-xs font-medium text-primary">{guide.lifecycle}</span>
                    <span className="flex items-center gap-1 font-mono-id text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" aria-hidden="true" />{guide.region}
                    </span>
                  </div>
                  {i === 0 && (
                    <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-muted-foreground">The entry point for every other guide. Start here to map property access before tracing materials downstream.</p>
                  )}
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Atlas plate */}
        <section className="border-b border-border bg-card" aria-labelledby="atlas-heading">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
            <div className="flex items-end justify-between">
              <h2 id="atlas-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>Visual guide atlas</h2>
              <span className="font-mono-id text-xs text-muted-foreground">PLATE 02 / 3 PANELS</span>
            </div>
            <div className="mt-6 overflow-hidden rounded-sm border-2 border-primary shadow-lifted animate-scale-in">
              <img src="/guide-atlas.webp" alt="Three-panel visual guide atlas for waste systems" className="w-full object-cover" width={1000} height={450} />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                { ref: 'Panel A', desc: 'Collection access cross-section', coord: 'A-01' },
                { ref: 'Panel B', desc: 'Material category grid', coord: 'B-02' },
                { ref: 'Panel C', desc: 'Site walk checklist', coord: 'C-03' },
              ].map((panel) => (
                <div key={panel.ref} className="rounded-sm bg-background p-4 shadow-paper">
                  <div className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <span className="font-mono-id text-xs text-accent">{panel.ref}</span>
                    <span className="font-mono-id text-xs text-muted-foreground">[{panel.coord}]</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground">{panel.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suppliers */}
        <section id="suppliers" className="border-b border-border" aria-labelledby="suppliers-heading">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
            <h2 id="suppliers-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>Supplier directory</h2>
            <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">Public-fact supplier records with survey coordinates. No rankings or endorsements.</p>
            <div className="mt-8 overflow-x-auto rounded-sm border border-dashed border-border shadow-paper">
              <table className="w-full">
                <caption className="sr-only">Supplier directory with coordinates</caption>
                <thead className="bg-muted">
                  <tr className="border-b border-dashed border-border">
                    <th scope="col" className="px-4 py-3 text-left font-mono-id text-xs uppercase text-muted-foreground">ID</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                    <th scope="col" className="hidden px-4 py-3 text-left text-sm font-medium text-foreground sm:table-cell">Sector</th>
                    <th scope="col" className="hidden px-4 py-3 text-left font-mono-id text-xs uppercase text-muted-foreground md:table-cell">Coordinates</th>
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
            <p className="mt-4 font-mono-id text-xs text-muted-foreground">Supplier records require an approved source snapshot and claim record. No supplier is a recommendation.</p>
          </div>
        </section>

        {/* Sources */}
        <section id="sources" className="border-b border-border bg-card" aria-labelledby="sources-heading">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
            <h2 id="sources-heading" className="font-serif-display text-2xl font-bold text-primary" style={{ textWrap: 'balance' }}>Source records</h2>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">Every claim and supplier entry traces back to an approved public-source snapshot. Source IDs are listed for inspection, not as endorsements.</p>
            <div className="mt-8 flex items-start gap-4 rounded-sm border border-dashed border-border bg-background p-5 shadow-paper animate-fade-up">
              <Fingerprint className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-mono-id text-sm text-accent">SRC-EPA-MOVING-REDUCE-REUSE</p>
                <p className="mt-1 text-sm font-medium text-foreground">EPA Moving Toward a Sustainable Materials Management</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <span className="font-mono-id text-xs text-muted-foreground">Approved 2026-09-01</span>
                  <span className="flex items-center gap-1 font-mono-id text-xs text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_4px_hsl(72_76%_50%)]" aria-hidden="true" /> SHA-256 verified
                  </span>
                  <span className="font-mono-id text-xs text-muted-foreground">Manifest admitted</span>
                </div>
              </div>
              <Hash className="h-4 w-4 shrink-0 text-muted-foreground sm:hidden" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* WasteWise */}
        <section className="border-b border-border bg-muted/30" aria-labelledby="ww-heading">
          <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span id="ww-heading">
                <span className="font-medium text-primary">WasteWise</span> is a separate product.{' '}
                <a href="#" className="font-medium text-accent underline underline-offset-2 hover:text-primary">Visit the approved preview link</a>
              </span>
            </div>
          </div>
        </section>
      </main>

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
              <p className="mt-2 max-w-[50ch] text-xs text-primary-foreground/70">A visual field guide to waste. Public resource library and supplier directory.</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-primary-foreground/80" aria-label="Footer">
              <a href="#guides" className="min-h-[44px] flex items-center hover:text-primary-foreground">Guides</a>
              <a href="#suppliers" className="min-h-[44px] flex items-center hover:text-primary-foreground">Suppliers</a>
              <a href="#sources" className="min-h-[44px] flex items-center hover:text-primary-foreground">Sources</a>
              <a href="#" className="min-h-[44px] flex items-center hover:text-primary-foreground">WasteWise</a>
            </nav>
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
