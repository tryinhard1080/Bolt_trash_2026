'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Dices, Mail, Quote, Send, Sparkles } from 'lucide-react';
import { Reveal } from './anim';
import { RegistrationTicks } from './primitives';
import { GUIDES, LIFECYCLES, PRINCIPLES, QB_CONCERNS, QB_PROPERTIES, QB_STAGES, QUESTION_TEMPLATES, type Lifecycle } from '@/lib/data';
import { copyText } from '@/lib/clipboard';

const RECIPIENTS = [
  {
    to: 'Your county solid waste division',
    why: 'They own the ordinance, the service standard and the complaint log — the three documents that answer a specific question.',
  },
  {
    to: 'The hauler’s published standard',
    why: 'Not their marketing page. The published standard is the text a crew is actually measured against.',
  },
  {
    to: 'Your property manager, in writing',
    why: 'A dated email with your walk card attached is a record. A hallway conversation is not.',
  },
];

export default function Ask() {
  const [property, setProperty] = useState(QB_PROPERTIES[0]);
  const [stage, setStage] = useState<Lifecycle>('Access');
  const [concern, setConcern] = useState(QB_CONCERNS[0]);

  const question = useMemo(() => {
    const template = QUESTION_TEMPLATES[concern] ?? QUESTION_TEMPLATES['Missed collection'];
    return template.replace('{p}', property.toLowerCase()).replace('{s}', stage.toLowerCase());
  }, [property, stage, concern]);

  const relevant = useMemo(
    () => GUIDES.filter((g) => g.lifecycle === stage).slice(0, 3),
    [stage]
  );

  const shuffle = () => {
    const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
    setProperty(pick(QB_PROPERTIES));
    setStage(pick(LIFECYCLES));
    setConcern(pick(QB_CONCERNS));
  };

  return (
    <section id="ask" className="on-dark-band relative isolate overflow-hidden bg-ink text-background" aria-labelledby="ask-h">
      <div className="grain absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(0 0% 100% / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 20% 10%, #000, transparent 62%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 20% 10%, #000, transparent 62%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-1.5 hazard opacity-90" aria-hidden="true" />

      <div className="relative mx-auto max-w-8xl px-gutter py-stack">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-plate flex items-center gap-3 text-background/60">
                <span className="num text-lime">08</span>
                <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
                Ask locally
              </p>
              <h2 id="ask-h" className="font-serif-display mt-4 text-display-3 font-semibold leading-[1.02]">
                Build the question <span className="italic text-lime">they can answer.</span>
              </h2>
              <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-measure text-background/70">
                Most waste complaints stall because they are unanswerable as written. Pick the property, the stage, and
                the thing that went wrong — this assembles a question with the specifics a public agency can respond to
                in one email.
              </p>

              <ol className="mt-8 space-y-3">
                {RECIPIENTS.map((r, i) => (
                  <li key={r.to} className="flex gap-4 rounded-plate border border-background/15 bg-background/[0.05] p-4 transition-colors duration-500 hover:border-lime/40">
                    <span className="num mt-0.5 text-[0.7rem] text-lime">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block text-[0.9rem] font-semibold">{r.to}</span>
                      <span className="mt-1 block text-[0.8rem] leading-relaxed text-background/60">{r.why}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className="label-plate mt-7 text-background/40">
                Nothing here is submitted anywhere. The generator writes text into your clipboard, and that is all.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={80} variant="right">
              <div className="relative overflow-hidden rounded-plate border border-background/20 bg-background/[0.05] shadow-deep backdrop-blur-md">
                <div className="flex items-center justify-between gap-4 border-b border-background/15 px-5 py-3.5">
                  <p className="label-plate text-background/60">Question builder · form TH-Q1</p>
                  <button
                    type="button"
                    onClick={shuffle}
                    className="label-plate inline-flex items-center gap-1.5 rounded-full border border-background/25 px-3 py-1.5 text-background/80 transition-colors hover:border-lime hover:text-lime"
                  >
                    <Dices className="h-3 w-3" aria-hidden="true" /> Try an example
                  </button>
                </div>

                <div className="space-y-6 p-5 sm:p-7">
                  <fieldset>
                    <legend className="label-plate text-background/55">Property type</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {QB_PROPERTIES.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setProperty(p)}
                          aria-pressed={property === p}
                          className={`label-plate rounded-full border px-3.5 py-2 transition-all duration-300 ${
                            property === p
                              ? 'border-lime bg-lime text-ink'
                              : 'border-background/25 text-background/75 hover:border-background/60 hover:text-background'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="label-plate text-background/55">Lifecycle stage</legend>
                    <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-plate border border-background/20 bg-background/20 sm:grid-cols-5">
                      {LIFECYCLES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStage(s)}
                          aria-pressed={stage === s}
                          className={`px-3 py-2.5 text-[0.75rem] font-semibold uppercase tracking-widest transition-colors duration-300 ${
                            stage === s ? 'bg-background text-ink' : 'bg-ink/60 text-background/70 hover:bg-ink hover:text-background'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="label-plate text-background/55">What is going wrong</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {QB_CONCERNS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setConcern(c)}
                          aria-pressed={concern === c}
                          className={`group flex items-center justify-between gap-3 rounded-plate border px-3.5 py-2.5 text-left text-[0.85rem] transition-all duration-300 ${
                            concern === c
                              ? 'border-lime/60 bg-lime/15 text-background'
                              : 'border-background/20 text-background/70 hover:border-background/40 hover:bg-background/[0.05]'
                          }`}
                        >
                          {c}
                          <span
                            className={`h-2 w-2 shrink-0 rotate-45 transition-colors ${
                              concern === c ? 'bg-lime' : 'bg-background/25 group-hover:bg-background/50'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* output */}
                <div className="border-t border-background/15 bg-[hsl(var(--background))] p-5 text-foreground sm:p-7">
                  <div className="plate-frame relative rounded-plate border border-rule bg-card p-5 shadow-paper">
                    <p className="label-plate flex items-center gap-2 text-muted-foreground">
                      <Quote className="h-3.5 w-3.5 text-lime" aria-hidden="true" /> Your question, ready to send
                    </p>
                    <p className="font-serif-display mt-3 text-[1.12rem] leading-snug text-ink" aria-live="polite">
                      {question}
                    </p>
                    <RegistrationTicks />
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => copyText(question, 'Question copied — paste it into your email')}
                      className="btn-lime !min-h-11 text-[0.82rem]"
                    >
                      <Send className="h-3.5 w-3.5" aria-hidden="true" /> Copy the question
                    </button>
                    <a href="#walk" className="btn-ghost !min-h-11 text-[0.82rem]">
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Attach a site-walk card
                    </a>
                    {relevant.length ? (
                      <div className="ml-auto flex flex-wrap items-center gap-2">
                        <span className="label-plate inline-flex items-center gap-1.5 text-muted-foreground">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          Guides for this stage:
                        </span>
                        {relevant.map((g) => (
                          <button
                            key={g.code}
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent('th:open-guide', { detail: g.code }))}
                            className="label-plate rounded-full border border-rule bg-paper-deep px-3 py-1.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-background"
                          >
                            {g.code} <ArrowUpRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <p className="label-plate mt-4 text-background/40">
                Policy check · {PRINCIPLES.length} refusals apply to everything above
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
