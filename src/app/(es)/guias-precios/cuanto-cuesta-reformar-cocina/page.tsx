import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';

export const metadata: Metadata = {
  title: 'Cuánto cuesta reformar una cocina',
  description: 'Cuánto cuesta reformar una cocina en Madrid: precios orientativos, factores clave y cómo solicitar presupuesto sin compromiso.',
  alternates: { canonical: '/guias-precios/cuanto-cuesta-reformar-cocina' },
};

export default function CuantoCuestaCocinaPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">Cuánto cuesta reformar una cocina en Madrid</h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            El coste de reformar una cocina en Madrid oscila entre 5.000 y 15.000 € de media, dependiendo del alcance de la reforma, los materiales y la distribución deseada.
          </p>
          <h2 className="text-2xl font-bold mt-10 mb-4">Rangos según alcance</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="font-medium">Cambio de muebles y encimera</p>
              <p className="text-primary font-semibold">3.000 – 6.000 €</p>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="font-medium">Reforma completa con instalaciones</p>
              <p className="text-primary font-semibold">6.000 – 12.000 €</p>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="font-medium">Cocina abierta / redistribución</p>
              <p className="text-primary font-semibold">10.000 – 18.000+ €</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-10 mb-4">Factores clave</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>- Metros cuadrados de la cocina</li>
            <li>- Calidad de muebles y encimeras</li>
            <li>- Electrodomésticos incluidos o no</li>
            <li>- Cambios en fontanería, gas o electricidad</li>
            <li>- Apertura de cocina al salón (tabiques)</li>
          </ul>
        </Container>
      </section>
      <CTASection title="¿Quieres reformar tu cocina?" subtitle="Solicita tu proyecto y te asignamos al profesional adecuado." />
      <Container className="py-6"><IntermediationDisclaimer variant="subtle" /></Container>
    </>
  );
}
