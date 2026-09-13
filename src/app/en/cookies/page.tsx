import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Cookie policy',
  alternates: { canonical: '/en/cookies', languages: { es: '/cookies' } },
  robots: { index: false },
};

export default function CookiesEnPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Cookie policy</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p>This website uses cookies to improve your browsing experience and gather analytics. By continuing to use the site, you consent to the use of cookies.</p>
          <h2 className="text-lg font-semibold text-foreground">Types of cookies</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Essential:</strong> Required for the website to function properly.</li>
            <li><strong>Analytics:</strong> Help us understand how visitors use the site.</li>
            <li><strong>Marketing:</strong> Used for conversion tracking.</li>
          </ul>
          <p>You can manage cookies in your browser settings. Disabling cookies may affect site functionality.</p>
          <p className="text-xs italic">[PENDING: legal texts reviewed by lawyer]</p>
        </div>
      </Container>
    </section>
  );
}
