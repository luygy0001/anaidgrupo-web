import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ServicesGrid from '@/components/sections/ServicesGrid';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';

export const metadata: Metadata = {
  title: 'Servicios de reformas en Madrid',
  description:
    'Reforma integral, baño, cocina, electricista, fontanero, climatización, arquitecto y pequeñas obras en Madrid. Te asignamos al profesional adecuado.',
  alternates: { canonical: '/servicios' },
};

export default function ServiciosPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary/5 to-transparent">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Servicios que podemos ayudarte a canalizar
          </h1>
          <p className="mt-4 text-muted-foreground text-center text-lg">
            Anaid Grupo centraliza la solicitud, analiza el proyecto y lo asigna
            al colaborador adecuado según el tipo de trabajo. No ejecutamos
            obras: conectamos cada necesidad con el profesional indicado.
          </p>
        </Container>
      </section>

      <ServicesGrid />

      <CTASection />

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
