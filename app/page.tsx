import Masthead from '@/components/site/masthead';
import Hero from '@/components/site/hero';
import Ticker from '@/components/site/ticker';
import Method from '@/components/site/method';
import Guides from '@/components/site/guides';
import Creed from '@/components/site/creed';
import Atlas from '@/components/site/atlas';
import Band from '@/components/site/band';
import Streams from '@/components/site/streams';
import Walk from '@/components/site/walk';
import Directory from '@/components/site/directory';
import Evidence from '@/components/site/evidence';
import Ask from '@/components/site/ask';
import Colophon from '@/components/site/colophon';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Masthead />
      <main id="main">
        <Hero />
        <Ticker />
        <Method />
        <Guides />
        <Creed />
        <Atlas />
        <Band />
        <Streams />
        <Walk />
        <Directory />
        <Evidence />
        <Ask />
      </main>
      <Colophon />
    </div>
  );
}
