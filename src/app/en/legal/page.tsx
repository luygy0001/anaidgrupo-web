import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { SITE_NAME, EMAIL, LEGAL, INTERMEDIATION_DISCLAIMER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Legal notice',
  alternates: { canonical: '/en/legal', languages: { es: '/aviso-legal' } },
  robots: { index: false },
};

export default function LegalEnPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Legal notice</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Company:</strong> {SITE_NAME} · {LEGAL.razonSocial} · {LEGAL.cif}</p>
          <p><strong>Address:</strong> {LEGAL.domicilio}</p>
          <p><strong>Email:</strong> {EMAIL}</p>
          <h2 className="text-lg font-semibold text-foreground">Nature of the service</h2>
          <p>{INTERMEDIATION_DISCLAIMER}</p>
          <p>{SITE_NAME} does not execute works, does not invoice the end client, and does not provide technical warranties on the execution.</p>
          <p className="text-xs italic">[PENDING: legal texts reviewed by lawyer]</p>
        </div>
      </Container>
    </section>
  );
}
