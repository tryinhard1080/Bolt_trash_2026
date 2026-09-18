import './globals.css';
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/600.css';
import '@fontsource/source-serif-4/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const SITE = 'https://thetrashhub.fieldguide.example';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'The Trash Hub — A Visual Field Guide to Waste',
    template: '%s — The Trash Hub',
  },
  description:
    'A public visual resource library and a public-fact supplier directory for waste systems. Recognise the place, open the guide, inspect the evidence, then ask a better local question. No rankings, no endorsements, no lead capture.',
  keywords: [
    'waste systems',
    'recycling guide',
    'materials recovery',
    'transfer station',
    'multifamily collection',
    'field guide',
    'supplier directory',
  ],
  authors: [{ name: 'The Trash Hub editorial collective' }],
  creator: 'The Trash Hub',
  publisher: 'The Trash Hub',
  category: 'reference',
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    url: SITE,
    title: 'The Trash Hub — A Visual Field Guide to Waste',
    description:
      'Property-lifecycle guides, annotated plates, material recognition keys and a public-fact supplier directory. Evidence first, rankings never.',
    siteName: 'The Trash Hub',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Trash Hub — a survey plate of a neighbourhood waste collection system',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Trash Hub — A Visual Field Guide to Waste',
    description: 'Recognise the system in front of your building. Guides, plates and a public-fact directory.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'theme-color': '#F7F5EF',
    'color-scheme': 'light dark',
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'The Trash Hub',
      alternateName: 'A Visual Field Guide to Waste',
      description: metadata.description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE}/#org` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#org`,
      name: 'The Trash Hub',
      description: 'A static, source-first public reference for waste systems.',
      knowsAbout: ['Waste collection', 'Materials recovery', 'Recycling contamination', 'Transfer stations'],
    },
    {
      '@type': 'Dataset',
      name: 'Trash Hub supplier directory (public-fact records)',
      description:
        'Public-fact records for waste collection, transfer and processing operators. Contains no rankings, prices, contacts or endorsements.',
      license: 'https://creativecommons.org/publicdomain/zero/1.0/',
      isAccessibleForFree: true,
      measurementTechnique: 'Documentary transcription from approved public sources',
      creator: { '@id': `${SITE}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          {...({
            rel: 'preload',
            as: 'image',
            imagesrcset:
              '/img/field-guide-hero-800.avif 800w, /img/field-guide-hero-1200.avif 1200w, /img/field-guide-hero-1600.avif 1600w',
            imagesizes: '100vw',
            type: 'image/avif',
          } as unknown as React.ComponentProps<'link'>)}
        />
      </head>
      <body className="grain-fixed font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: '!rounded-plate !border !border-rule !shadow-lifted !font-sans !text-[0.85rem]',
            }}
          />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
