import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import { Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cuánto cuesta reformar un baño',
  description: 'Cuánto cuesta reformar un baño en Madrid: precios orientativos, factores que influyen y cómo solicitar presupuesto sin compromiso.',
  alternates: { canonical: '/guias-precios/cuanto-cuesta-reformar-bano' },
};

export default function CuantoCuestaBanoPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Cuánto cuesta reformar un baño en Madrid
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            La reforma de un baño en Madrid puede costar entre 3.000 y 10.000 €
            de media, aunque el precio final depende de muchos factores. Esta
            guía te ayuda a entender qué variables influyen y cómo planificar
            tu presupuesto.
          </p>

          <div className="mt-8 p-4 rounded-xl bg-accent-light/50 border border-accent/20 flex gap-2 items-start">
            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Estos precios son orientativos. El presupuesto definitivo lo
              elabora el profesional tras valorar tu baño en persona.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Rangos según tipo de reforma</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="font-medium">Reforma parcial (sanitarios y grifería)</p>
              <p className="text-primary font-semibold">1.500 – 3.500 €</p>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="font-medium">Reforma completa (alicatado, sanitarios, fontanería)</p>
              <p className="text-primary font-semibold">3.000 – 7.000 €</p>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="font-medium">Reforma integral (redistribución, todo nuevo)</p>
              <p className="text-primary font-semibold">6.000 – 10.000+ €</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Factores que influyen</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>- Tamaño del baño (m²)</li>
            <li>- Calidad de los materiales: azulejos, sanitarios, grifería</li>
            <li>- Si se cambian las instalaciones de fontanería</li>
            <li>- Cambio de bañera por plato de ducha</li>
            <li>- Impermeabilización</li>
            <li>- Accesibilidad: plato a nivel, barras, etc.</li>
          </ul>
        </Container>
      </section>

      <CTASection
        title="¿Quieres reformar tu baño?"
        subtitle="Cuéntanos tu proyecto y te asignamos al profesional adecuado."
      />

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
