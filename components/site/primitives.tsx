import type { ReactNode } from 'react';

/* ————————————————————————————————————————————————
   Typographic + decorative primitives for the site.
   ———————————————————————————————————————————————— */

export function Eyebrow({
  index,
  children,
  className = '',
  tone = 'ink',
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: 'ink' | 'light';
}) {
  return (
    <p
      className={`label-plate flex items-center gap-3 ${
        tone === 'light' ? 'text-background/70' : 'text-muted-foreground'
      } ${className}`}
    >
      {index ? (
        <span className={tone === 'light' ? 'text-lime' : 'text-ink'} aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  lead,
  right,
  className = '',
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 border-b border-rule pb-6 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-2xl">
        <Eyebrow index={index}>{kicker}</Eyebrow>
        <h2 className="font-serif-display mt-4 text-display-2 font-semibold text-ink">{title}</h2>
        {lead ? <p className="mt-3 max-w-[58ch] text-[0.95rem] leading-measure text-muted-foreground">{lead}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function Tag({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode;
  tone?: 'default' | 'lime' | 'blue' | 'rust' | 'ok';
  className?: string;
}) {
  const tones: Record<string, string> = {
    default: 'border-rule text-muted-foreground',
    lime: 'border-lime/50 bg-lime/12 text-ink',
    blue: 'border-survey/40 bg-survey/10 text-survey',
    rust: 'border-rust/40 bg-rust/10 text-rust',
    ok: 'border-ok/40 bg-ok/10 text-ok',
  };
  return (
    <span
      className={`label-plate inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Four corner registration ticks — draws the "plate" frame. */
export function RegistrationTicks({ className = '' }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-ink/35" />
      <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-ink/35" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-ink/35" />
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-ink/35" />
    </span>
  );
}

export function CompassRose({ className = '', spinning = false }: { className?: string; spinning?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} ${spinning ? 'animate-spin-slow' : ''}`} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      {Array.from({ length: 36 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="3.5"
          x2="50"
          y2={i % 3 === 0 ? '9.5' : '6.5'}
          stroke="currentColor"
          strokeWidth={i % 9 === 0 ? 1.1 : 0.5}
          opacity={i % 3 === 0 ? 0.65 : 0.32}
          transform={`rotate(${i * 10} 50 50)`}
        />
      ))}
      <path d="M50 12 L55 48 L50 44 L45 48 Z" fill="currentColor" opacity="0.9" />
      <path d="M50 88 L45 52 L50 56 L55 52 Z" fill="currentColor" opacity="0.35" />
      <path d="M12 50 L48 45 L44 50 L48 55 Z" fill="currentColor" opacity="0.45" />
      <path d="M88 50 L52 55 L56 50 L52 45 Z" fill="currentColor" opacity="0.45" />
      <text x="50" y="10.5" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="'JetBrains Mono', monospace">
        N
      </text>
      <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
  );
}

/** Small scale bar used as a decorative rule under section titles. */
export function ScaleBar({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-end gap-0 ${className}`} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className="w-3 border-l border-ink/45"
          style={{ height: i % 4 === 0 ? 9 : i % 2 === 0 ? 6 : 4 }}
        />
      ))}
      <span className="h-[9px] border-r border-ink/45" />
    </div>
  );
}

/**
 * Section wrapper: consistent gutters, hairline rules and a plate watermark.
 */
export function SectionShell({
  id,
  index,
  label,
  children,
  texture = 'none',
  className = '',
  bleed = false,
}: {
  id?: string;
  index?: string;
  label?: string;
  children: ReactNode;
  texture?: 'none' | 'paper' | 'grid' | 'blueprint' | 'topo' | 'dots';
  className?: string;
  bleed?: boolean;
}) {
  const textureClass =
    texture === 'paper'
      ? 'paper-texture'
      : texture === 'grid'
        ? 'grid-paper'
        : texture === 'blueprint'
          ? 'blueprint'
          : texture === 'topo'
            ? 'topo-lines'
            : texture === 'dots'
              ? 'dotfield'
              : '';
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden border-b border-rule py-stack ${className}`}
      aria-labelledby={id ? `${id}-h` : undefined}
    >
      <div className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.55] ${textureClass}`} aria-hidden="true" />
      {index ? (
        <span
          className="label-plate pointer-events-none absolute right-gutter top-6 hidden select-none text-muted-foreground/60 lg:block"
          aria-hidden="true"
        >
          PLATE {index}
          {label ? ` / ${label}` : ''}
        </span>
      ) : null}
      <div className={bleed ? '' : 'mx-auto w-full max-w-8xl px-gutter'}>{children}</div>
    </section>
  );
}
