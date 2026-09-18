'use client';

import { Camera, Crosshair, FileSearch, Footprints, Quote } from 'lucide-react';
import { Reveal } from './anim';
import { Photo } from './photo';
import { RegistrationTicks, ScaleBar, SectionShell, SectionHead } from './primitives';
import { METHOD } from '@/lib/data';

const FLOW = [
  {
    icon: Crosshair,
    label: 'Identify the place',
    desc: 'Property type, container system and the frequency the route actually runs.',
    plate: 'A-01',
  },
  {
    icon: FileSearch,
    label: 'Find the guide',
    desc: 'One lifecycle stage at a time. A guide is a protocol, not an article.',
    plate: 'B-02',
  },
  {
    icon: Camera,
    label: 'Inspect the evidence',
    desc: 'Public sources, their limits and the date they were approved for use.',
    plate: 'C-01',
  },
  {
    icon: Footprints,
    label: 'Ask a better question',
    desc: 'Bring the record, not the opinion, to the agency that governs your route.',
    plate: 'D-04',
  },
];

export default function Method() {
  return (
    <SectionShell id="method" index="01" label="METHOD" texture="topo">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* left: statement + figure */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHead
              index="01"
              kicker="Method"
              title={
              <span id="method-h" className="block">
                A field guide reads a place before it names one.
              </span>
              }
              lead="Waste systems are legible from the sidewalk if you know what to look for. Every guide here is written as a walking protocol: a fixed order, a fixed vantage, and a record that two strangers would produce identically."
            />
          </Reveal>

          <Reveal delay={90} variant="clip" className="mt-8">
            <figure className="plate-frame relative overflow-hidden rounded-plate border border-rule bg-card shadow-lifted">
              <div className="relative overflow-hidden">
                <Photo
                  name="field-notebook-flatlay"
                  alt="An open field notebook on a wooden table with a hand-drawn waste sorting diagram, taped cardboard and glass samples, and a pen"
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  imgClassName="transition-transform duration-2600 ease-plate hover:scale-[1.045]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="flex items-start justify-between gap-4 border-t border-rule px-4 py-3">
                <p className="max-w-[38ch] text-[0.8rem] leading-relaxed text-muted-foreground">
                  Fig. 01 — A working notebook: one pass, one vantage, no assumptions. Samples are taped, not
                  described.
                </p>
                <ScaleBar className="mt-1 shrink-0" />
              </figcaption>
              <RegistrationTicks />
            </figure>
          </Reveal>

          <Reveal delay={140} className="mt-8">
            <blockquote className="relative border-l-2 border-lime pl-5">
              <Quote className="absolute -left-[9px] -top-2 h-5 w-5 rotate-180 bg-background text-lime" aria-hidden="true" />
              <p className="font-serif-display text-[1.05rem] italic leading-measure text-ink">
                The point is never to rank a hauler or grade a property. It is to see the system clearly enough that the
                next question you ask is answerable.
              </p>
              <footer className="label-plate mt-3 text-muted-foreground">Editorial position · The Trash Hub</footer>
            </blockquote>
          </Reveal>
        </div>

        {/* right: flow + method cards */}
        <div className="lg:col-span-7 lg:pl-4">
          <Reveal>
            <p className="label-plate text-muted-foreground">The four-pass sequence</p>
          </Reveal>

          <ol className="relative mt-5 grid gap-4 sm:grid-cols-2">
            {/* connector */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full text-rule sm:block"
              viewBox="0 0 600 320"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M60 60 H540 M60 220 H540 M540 60 V220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 7" />
            </svg>
            {FLOW.map((step, i) => (
              <Reveal as="li" key={step.label} delay={70 * i} className="group relative">
                <div className="card-plate card-hover h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-plate border border-rule bg-background text-ink transition-colors duration-500 group-hover:border-lime group-hover:bg-lime/20">
                      <step.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="num text-[0.7rem] text-muted-foreground">
                      STEP {String(i + 1).padStart(2, '0')} · {step.plate}
                    </span>
                  </div>
                  <h3 className="font-serif-display mt-4 text-[1.15rem] font-semibold leading-snug text-ink">{step.label}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">{step.desc}</p>
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-lime transition-transform duration-700 ease-expo group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 grid gap-px overflow-hidden rounded-plate border border-rule bg-rule sm:grid-cols-3">
            {METHOD.map((m, i) => (
              <Reveal key={m.step} delay={i * 80} className="bg-card p-5 transition-colors duration-500 hover:bg-paper-deep">
                <p className="num text-[2rem] leading-none text-ink/15">{m.step}</p>
                <h3 className="font-serif-display mt-3 text-[1.05rem] font-semibold text-ink">{m.title}</h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-muted-foreground">{m.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-6">
            <p className="text-[0.8rem] leading-relaxed text-muted-foreground">
              Guides are reviewed on a rolling basis and annotated rather than silently edited. A superseded figure
              stays visible with its replacement beside it, so a reader can see how the record changed.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
