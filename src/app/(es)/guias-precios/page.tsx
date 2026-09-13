import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guías y precios reformas Madrid',
  description:
    'Guías prácticas y precios orientativos de reformas en Madrid. Cuánto cuesta reformar un baño, una cocina o hacer una reforma integral.',
  alternates: { canonical: '/guias-precios' },
};

const guides = [
  {
    title: 'Guía de precios de reformas en Madrid',
    slug: 'precios-reformas-madrid',
    description:
      'Rangos orientativos de precios para los principales tipos de reforma en la Comunidad de Madrid.',
  },
  {
    title: 'Cuánto cuesta reformar un baño',
    slug: 'cuanto-cuesta-reformar-bano',
    description:
      'Factores que influyen en el precio de una reforma de baño y rangos habituales en Madrid.',
  },
  {
    title: 'Cuánto cuesta reformar una cocina',
    slug: 'cuanto-cuesta-reformar-cocina',
    description:
      'Todo lo que necesitas saber sobre los costes de reformar una cocina en Madrid.',
  },
  {
    title: 'Cuánto cuesta una reforma integral',
    slug: 'cuanto-cuesta-reforma-integral',
    description:
      'Precios por metro cuadrado y factores clave en una reforma integral en Madrid.',
  },
  {
    title: 'Checklist antes de pedir presupuesto',
    slug: 'checklist-presupuesto',
    description:
      'Lista de comprobación para preparar tu solicitud y obtener un presupuesto más preciso.',
  },
  {
    title: 'Errores habituales en una reforma',
    slug: 'errores-habituales-reforma',
    description:
      'Los fallos más comunes al planificar una reforma y cómo evitarlos.',
  },
  {
    title: 'Licencias y dudas básicas antes de reformar',
    slug: 'licencias-dudas-reforma',
    description:
      'Cuándo necesitas licencia de obra, qué permisos hay que pedir y otras dudas frecuentes.',
  },
];

export default function GuiasPreciosPage() {
  return (
    <>
      <section className="section-padding">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Recursos
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Guías y precios orientativos de reformas
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Información práctica para que puedas planificar tu proyecto con
              más claridad. Recuerda que los precios son orientativos: el
              presupuesto definitivo lo elabora el profesional tras valorar tu
              caso.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {guides.map((guide) => (
              <a
                key={guide.slug}
                href={`/guias-precios/${guide.slug}`}
                className="group p-6 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {guide.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Leer guía <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="¿Listo para dar el primer paso?"
        subtitle="Solicita tu proyecto y te asignamos el profesional adecuado."
      />
    </>
  );
}
