import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design studies',
  description:
    'Three archived visual surfaces explored for The Trash Hub — editorial field notebook, industrial wayfinding and cartographic atlas. Pre-production reference only.',
  robots: { index: false, follow: true },
};

export default function StudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
