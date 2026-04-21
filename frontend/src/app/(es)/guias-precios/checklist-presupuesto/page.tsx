import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Checklist antes de pedir presupuesto',
  description: 'Lista de comprobación para preparar tu solicitud de reforma y obtener un presupuesto más preciso del profesional.',
  alternates: { canonical: '/guias-precios/checklist-presupuesto' },
};

const items = [
  'Define el alcance: ¿reforma parcial o integral?',
  'Mide los espacios que quieres reformar (m² aproximados)',
  'Haz fotos del estado actual desde varios ángulos',
  'Anota lo que quieres mantener y lo que quieres cambiar',
  'Define tu presupuesto máximo orientativo',
  'Indica si necesitas licencia o si hay comunidad de vecinos',
  'Piensa en los plazos: ¿cuándo quieres empezar?',
  'Indica si la vivienda estará vacía durante la obra',
  'Recopila referencias o ejemplos de lo que te gusta',
  'Anota dudas concretas para el profesional',
];

export default function ChecklistPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">Checklist antes de pedir presupuesto</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Prepara tu solicitud con esta lista de comprobación y consigue un presupuesto más preciso y útil del profesional asignado.
          </p>
          <div className="mt-8 space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection title="¿Listo para solicitar tu proyecto?" />
    </>
  );
}
