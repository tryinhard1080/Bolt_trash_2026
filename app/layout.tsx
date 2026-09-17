import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Trash Hub — A Visual Field Guide to Waste',
  description:
    'A public visual resource library and public-fact supplier directory for waste systems. Recognize the place, find the guide, inspect the evidence, ask a better local question.',
  openGraph: {
    title: 'The Trash Hub — A Visual Field Guide to Waste',
    description:
      'A public visual resource library and public-fact supplier directory for waste systems.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
