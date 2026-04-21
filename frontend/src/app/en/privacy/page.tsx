import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { SITE_NAME, EMAIL, LEGAL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy policy',
  alternates: { canonical: '/en/privacy', languages: { es: '/privacidad' } },
  robots: { index: false },
};

export default function PrivacyEnPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Privacy policy</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Data controller:</strong> {SITE_NAME} · {LEGAL.razonSocial} · {LEGAL.cif}</p>
          <h2 className="text-lg font-semibold text-foreground">Purpose</h2>
          <p>Personal data collected is used to manage project requests, assign professionals, and respond to inquiries.</p>
          <h2 className="text-lg font-semibold text-foreground">Data sharing</h2>
          <p>Your data may be shared with the assigned professional collaborator exclusively for managing your project. No data will be shared with third parties without consent.</p>
          <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
          <p>You can exercise your rights of access, rectification, erasure, and portability by contacting {EMAIL}.</p>
          <p className="text-xs italic">[PENDING: legal texts reviewed by lawyer]</p>
        </div>
      </Container>
    </section>
  );
}
