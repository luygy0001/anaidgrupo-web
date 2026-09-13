import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import FormSolicitud from '@/components/forms/FormSolicitud';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';

export const metadata: Metadata = {
  title: 'Request your project',
  description: 'Tell us about your renovation project in Madrid. We analyze your needs and assign the right professional at no cost.',
  alternates: { canonical: '/en/request-project', languages: { es: '/solicitar-proyecto' } },
};

export default function RequestProjectEnPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Tell us about your project</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            We analyze your needs and help you take the next step with the right collaborator.
          </p>
        </div>
        <FormSolicitud />
        <div className="mt-8">
          <IntermediationDisclaimer />
        </div>
      </Container>
    </section>
  );
}
