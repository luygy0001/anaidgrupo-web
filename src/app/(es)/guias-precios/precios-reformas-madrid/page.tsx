import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PriceRange from '@/components/sections/PriceRange';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';

export const metadata: Metadata = {
  title: 'Precios de reformas en Madrid',
  description: 'Guía de precios orientativos de reformas en Madrid: reforma integral, baño, cocina, electricista, fontanero y más. Rangos actualizados.',
  alternates: { canonical: '/guias-precios/precios-reformas-madrid' },
};

export default function PreciosReformasPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary/5 to-transparent">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Guía de precios de reformas en Madrid
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Rangos orientativos actualizados para los principales tipos de
            reforma y servicio técnico en la Comunidad de Madrid. Recuerda que
            estos precios son una referencia: el presupuesto definitivo lo
            determina el profesional.
          </p>
        </Container>
      </section>

      <PriceRange />

      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Factores que influyen en el precio</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>- Estado actual de la vivienda o local</li>
            <li>- Calidad de los materiales y acabados elegidos</li>
            <li>- Superficie a reformar</li>
            <li>- Complejidad técnica (instalaciones, estructura)</li>
            <li>- Zona geográfica dentro de la Comunidad de Madrid</li>
            <li>- Plazo de ejecución deseado</li>
            <li>- Necesidad de licencias o permisos</li>
          </ul>
        </Container>
      </section>

      <CTASection
        title="¿Quieres un presupuesto para tu proyecto?"
        subtitle="Cuéntanos qué necesitas y te asignamos al profesional adecuado."
      />

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
