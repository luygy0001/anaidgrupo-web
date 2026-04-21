import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Errores habituales en una reforma',
  description: 'Los errores más comunes al planificar una reforma y cómo evitarlos. Guía práctica de Anaid Grupo.',
  alternates: { canonical: '/guias-precios/errores-habituales-reforma' },
};

const errores = [
  { error: 'No definir bien el alcance antes de empezar', consejo: 'Define exactamente qué quieres reformar y qué quieres mantener antes de pedir presupuesto.' },
  { error: 'Elegir solo por precio sin comparar calidades', consejo: 'El presupuesto más barato no siempre es el mejor. Compara qué incluye cada uno.' },
  { error: 'No dejar margen para imprevistos', consejo: 'Reserva un 10-15% del presupuesto para imprevistos. Casi siempre surgen.' },
  { error: 'Olvidar los permisos y licencias', consejo: 'Infórmate antes de empezar si necesitas licencia de obra o autorización de la comunidad.' },
  { error: 'Cambiar de idea durante la obra', consejo: 'Los cambios a mitad de obra encarecen y retrasan. Decide todo lo posible antes.' },
  { error: 'No pedir el presupuesto por escrito y desglosado', consejo: 'Exige un presupuesto detallado por partidas. Evita sorpresas.' },
];

export default function ErroresPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">Errores habituales en una reforma</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Estos son los fallos más comunes que vemos al planificar una reforma y cómo puedes evitarlos.
          </p>
          <div className="mt-8 space-y-4">
            {errores.map((e, i) => (
              <div key={i} className="p-5 rounded-xl bg-white border border-border">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                  <p className="font-semibold text-foreground">{e.error}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground pl-7">{e.consejo}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
