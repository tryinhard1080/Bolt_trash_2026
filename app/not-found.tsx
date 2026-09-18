import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="on-dark-band relative isolate flex min-h-screen items-center overflow-hidden bg-ink px-gutter py-24 text-background">
      <div className="blueprint pointer-events-none absolute inset-0 -z-10 opacity-[0.09]" aria-hidden="true" />
      <div className="grain absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto w-full max-w-3xl">
        <p className="label-plate flex items-center gap-3 text-background/60">
          <Compass className="h-3.5 w-3.5 text-lime" aria-hidden="true" />
          Off the sheet · error 404
        </p>
        <h1 className="font-serif-display mt-5 text-display-3 font-semibold leading-[1.02]">
          This plate is not in the 2026 edition.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-measure text-background/75">
          Nothing is lost, and nothing is being sold to you: the guide library simply does not hold this reference.
          Start again from the field guide, or open the section index in the footer.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn-lime">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the field guide
          </Link>
          <a href="/studies" className="btn-ghost-ink text-background">
            Design studies
          </a>
        </div>
        <p className="num mt-10 border-t border-background/15 pt-4 text-[0.72rem] uppercase tracking-widest text-background/40">
          Ref · TH-404 · edition 2026·Q3
        </p>
      </div>
    </main>
  );
}
