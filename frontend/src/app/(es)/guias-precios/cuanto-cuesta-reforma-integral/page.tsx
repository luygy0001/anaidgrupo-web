import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';

export const metadata: Metadata = {
  title: 'Cuánto cuesta una reforma integral',
  description: 'Cuánto cuesta una reforma integral en Madrid: precios por m², factores y cómo solicitar presupuesto gratuito.',
  alternates: { canonical: '/guias-precios/cuanto-cuesta-reforma-integral' },
};

export default function CuantoCuestaIntegralPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">Cuánto cuesta una reforma integral en Madrid</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Una reforma integral en Madrid puede costar entre 400 y 1.200 €/m², dependiendo del estado de la vivienda, las calidades elegidas y la complejidad del proyecto.
          </p>
          <h2 className="text-2xl font-bold mt-10 mb-4">Ejemplo por superficie</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-muted border border-border flex justify-between">
              <span className="font-medium">Piso 60 m² (calidad media)</span>
              <span className="text-primary font-semibold">30.000 – 50.000 €</span>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border flex justify-between">
              <span className="font-medium">Piso 90 m² (calidad media-alta)</span>
              <span className="text-primary font-semibold">55.000 – 85.000 €</span>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border flex justify-between">
              <span className="font-medium">Piso 120 m² (calidad alta)</span>
              <span className="text-primary font-semibold">80.000 – 140.000+ €</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-10 mb-4">Qué incluye</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>- Demolición y retirada de escombro</li>
            <li>- Instalaciones eléctricas y de fontanería nuevas</li>
            <li>- Tabiquería, solados y alicatados</li>
            <li>- Carpintería interior (puertas, armarios)</li>
            <li>- Pintura y acabados</li>
            <li>- Baños y cocina completos</li>
          </ul>
        </Container>
      </section>
      <CTASection />
      <Container className="py-6"><IntermediationDisclaimer variant="subtle" /></Container>
    </>
  );
}
