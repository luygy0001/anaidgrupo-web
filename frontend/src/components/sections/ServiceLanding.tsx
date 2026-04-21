import Container from '@/components/ui/Container';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/seo-schemas';
import type { FAQItem } from '@/types';
import { CheckCircle, ArrowRight, ChevronRight, MapPin } from 'lucide-react';

const ZONAS_DESTACADAS = [
  { nombre: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon' },
  { nombre: 'Las Rozas de Madrid', slug: 'las-rozas' },
  { nombre: 'Majadahonda', slug: 'majadahonda' },
];

interface ServiceLandingProps {
  h1: string;
  intro: string;
  slug: string;
  description: string;
  breadcrumbName: string;
  trabajos: string[];
  cuando: string;
  rangoOrientativo?: { rango: string; nota: string };
  faqs: FAQItem[];
}

const pasos = [
  { title: 'Cuéntanos tu proyecto', text: 'Envía tu solicitud con los detalles del trabajo que necesitas.' },
  { title: 'Analizamos la necesidad', text: 'Estudiamos tu solicitud para entender qué tipo de profesional necesitas.' },
  { title: 'Asignamos al profesional', text: 'Seleccionamos al colaborador más adecuado según especialidad y zona.' },
  { title: 'El profesional te contacta', text: 'Visita tu proyecto, lo valida y te entrega un presupuesto definitivo.' },
];

export default function ServiceLanding({
  h1,
  intro,
  slug,
  description,
  breadcrumbName,
  trabajos,
  cuando,
  rangoOrientativo,
  faqs,
}: ServiceLandingProps) {
  const breadcrumbs = [
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/servicios' },
    { name: breadcrumbName, url: `/servicios/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({ name: h1, description, slug })}
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumbs */}
      <Container className="pt-6">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-muted-foreground"
        >
          <ol className="flex items-center gap-1 flex-wrap">
            {breadcrumbs.map((b, i) => (
              <li key={b.url} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="text-foreground">
                    {b.name}
                  </span>
                ) : (
                  <a href={b.url} className="hover:text-primary transition-colors">
                    {b.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">{h1}</h1>
          <p className="mt-3 text-sm text-primary font-medium">
            Cobertura en Madrid capital y Comunidad de Madrid
          </p>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {intro}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/solicitar-proyecto">Solicitar proyecto gratuito</Button>
            <Button href="/como-funciona" variant="outline">Cómo funciona</Button>
          </div>
        </Container>
      </section>

      {/* Qué tipo de trabajos incluye */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Qué tipo de trabajos incluye</h2>
          <ul className="space-y-2">
            {trabajos.map((t) => (
              <li key={t} className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Cuándo suele necesitarse */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Cuándo suele necesitarse</h2>
          <p className="text-muted-foreground leading-relaxed">{cuando}</p>
        </Container>
      </section>

      {/* Cómo te ayuda Anaid Grupo */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Cómo te ayuda Anaid Grupo</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-foreground">
              <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              Analizamos tu solicitud y determinamos el perfil profesional que mejor encaja.
            </li>
            <li className="flex items-start gap-2 text-foreground">
              <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              Asignamos un colaborador estrictamente seleccionado en tu zona de la Comunidad de Madrid.
            </li>
            <li className="flex items-start gap-2 text-foreground">
              <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              El profesional visita tu proyecto, lo valida y te entrega un presupuesto definitivo sin compromiso.
            </li>
          </ul>
        </Container>
      </section>

      {/* Cómo es el proceso */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-6">Cómo es el proceso</h2>
          <ol className="space-y-4">
            {pasos.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Rango orientativo */}
      {rangoOrientativo && (
        <section className="section-padding">
          <Container narrow>
            <h2 className="text-2xl font-bold mb-4">Rango orientativo de precios</h2>
            <div className="p-4 rounded-xl bg-accent-light/50 border border-accent/20">
              <p className="text-lg font-semibold text-primary">{rangoOrientativo.rango}</p>
              <p className="text-sm text-muted-foreground mt-1">{rangoOrientativo.nota}</p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Este rango es orientativo. El precio definitivo lo determina el profesional tras valorar el proyecto en persona.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Cobertura en la Comunidad de Madrid */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Cobertura en la Comunidad de Madrid</h2>
          <p className="text-muted-foreground leading-relaxed">
            Atendemos este servicio en <strong>Madrid capital y en toda la Comunidad de Madrid</strong>,
            con mayor capacidad operativa en el área metropolitana y el corredor del Henares. Estas
            son algunas de las zonas donde tenemos mayor presencia:
          </p>

          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {ZONAS_DESTACADAS.map((z) => (
              <a
                key={z.slug}
                href={`/zonas/${z.slug}`}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-transparent hover:border-primary/30 hover:bg-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{z.nombre}</span>
              </a>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            ¿Tu municipio no está en la lista? Consulta el{' '}
            <a href="/zonas" className="text-primary underline">
              mapa completo de cobertura
            </a>{' '}
            o envíanos tu solicitud con el código postal y valoramos disponibilidad.
          </p>
        </Container>
      </section>

      {/* FAQs */}
      <FAQAccordion items={faqs} />

      <CTASection />

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
