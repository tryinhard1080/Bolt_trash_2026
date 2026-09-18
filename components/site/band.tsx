'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock, Ruler, Timer } from 'lucide-react';
import { Photo } from './photo';
import { Reveal, useReducedMotion } from './anim';

const NOTES = [
  { icon: Clock, k: '04:40', v: 'First trucks enter before the public window opens.' },
  { icon: Ruler, k: '40 ft', v: 'Tip floor width — the number that decides whether a queue forms.' },
  { icon: Timer, k: '18 mo', v: 'Ticket retention on file: long enough to audit a season.' },
];

/** Full-bleed photographic interlude between the atlas and the stream keys. */
export default function Band() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shift, setShift] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      setShift(Math.max(-60, Math.min(60, progress * -90)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="on-dark-band relative isolate overflow-hidden bg-ink text-background" aria-label="Field note — transfer station">
      <div ref={ref} className="absolute inset-0 -z-20">
        <Photo
          name="industrial-wayfinding"
          alt="A transfer station structure of steel conveyors and concrete chutes under an overcast sky, with a yellow wayfinding sign reading Station 4, Waste Infeed, Load Out"
          sizes="100vw"
          cover
          imgClassName="opacity-70"
          style={{ height: '118%', transform: `translate3d(0, ${shift}px, 0) scale(1.06)` }}
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(90deg, hsl(var(--scrim) / 0.95) 0%, hsl(var(--scrim) / 0.7) 44%, hsl(var(--scrim) / 0.35) 100%), linear-gradient(to top, hsl(var(--scrim) / 0.9), transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-1.5 hazard opacity-80" aria-hidden="true" />

      <div className="relative mx-auto max-w-8xl px-gutter py-24 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label-plate flex items-center gap-3 text-background/60">
                <span className="h-px w-8 bg-lime" aria-hidden="true" />
                Fig. 02 · Field note
              </p>
              <h2 className="font-serif-display mt-4 text-display-3 font-semibold leading-[1.02]">
                The middle of the system is the part nobody sees.
              </h2>
              <p className="mt-5 max-w-[54ch] text-[0.95rem] leading-measure text-background/75">
                A transfer station is where a municipal system stops being a schedule and becomes a building: floors,
                lanes, a scale, a public window. Most of what a reader can verify about their own route is decided in
                rooms like this one, and recorded on tickets.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={90} variant="right">
              <dl className="grid gap-px overflow-hidden rounded-plate border border-background/20 bg-background/20">
                {NOTES.map((n) => (
                  <div
                    key={n.k}
                    className="group flex items-center gap-4 bg-ink/80 px-5 py-4 backdrop-blur-sm transition-colors duration-500 hover:bg-ink"
                  >
                    <n.icon className="h-4 w-4 shrink-0 text-lime transition-transform duration-500 ease-spring group-hover:scale-110" aria-hidden="true" />
                    <dt className="num shrink-0 text-[1.05rem] font-medium text-background">{n.k}</dt>
                    <dd className="text-[0.82rem] leading-snug text-background/65">{n.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="label-plate mt-3 text-background/40">
                Photograph held in the source packet. Facility details are illustrative, not a site record.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
