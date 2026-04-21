import Container from '@/components/ui/Container';
import FormSolicitud from '@/components/forms/FormSolicitud';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import JsonLd from '@/components/seo/JsonLd';
import { zoneLocalBusinessSchema, breadcrumbSchema } from '@/lib/seo-schemas';
import { SERVICES } from '@/lib/constants';
import {
  MapPin,
  ChevronRight,
  CheckCircle,
  Home,
  Bath,
  ChefHat,
  Zap,
  Droplets,
  Thermometer,
  Ruler,
  Wrench,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Bath,
  ChefHat,
  Zap,
  Droplets,
  Thermometer,
  Ruler,
  Wrench,
};

export type ZoneCrossLink = {
  municipio: string;
  slug: string;
};

export interface ZoneLandingProps {
  municipio: string;
  slug: string;
  description: string;
  introParagraphs: string[];
  highlights: string[];
  crossLinks: ZoneCrossLink[];
}

const pasos = [
  { title: 'Cuéntanos tu proyecto', text: 'Envía tu solicitud con los detalles del trabajo que necesitas.' },
  { title: 'Analizamos la necesidad', text: 'Estudiamos tu solicitud para entender qué tipo de profesional encaja.' },
  { title: 'Asignamos al profesional', text: 'Seleccionamos al colaborador validado más cercano a tu zona.' },
  { title: 'El profesional te contacta', text: 'Visita tu proyecto, lo valida y te entrega un presupuesto definitivo.' },
];

export default function ZoneLanding({
  municipio,
  slug,
  description,
  introParagraphs,
  highlights,
  crossLinks,
}: ZoneLandingProps) {
  const breadcrumbs = [
    { name: 'Inicio', url: '/' },
    { name: 'Zonas', url: '/zonas' },
    { name: municipio, url: `/zonas/${slug}` },
  ];

  return (
    <>
      <JsonLd data={zoneLocalBusinessSchema({ municipio, slug, description })} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumbs */}
      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            {municipio} · Comunidad de Madrid
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Reformas y profesionales en {municipio}
          </h1>
          <div className="mt-4 space-y-3 text-muted-foreground text-lg leading-relaxed">
            {introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Servicios cubiertos */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Servicios que cubrimos en {municipio}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Cubrimos la tipología completa de reformas y servicios técnicos de hogar. Cada solicitud se asigna al colaborador validado más adecuado según el tipo de trabajo y su disponibilidad en la zona.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SERVICES.map((s) => {
              const Icon = iconMap[s.icon] || Wrench;
              return (
                <a
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-lg bg-muted border border-transparent hover:border-primary/30 hover:bg-white transition-colors"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {s.title} en {municipio}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Qué tiene de específico esta zona */}
      {highlights.length > 0 && (
        <section className="section-padding bg-muted">
          <Container narrow>
            <h2 className="text-2xl font-bold mb-4">
              Qué tiene de específico reformar en {municipio}
            </h2>
            <ul className="space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Cómo es el proceso */}
      <section className="section-padding">
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

      {/* Por qué confiar */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">Por qué confiar en Anaid Grupo</h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              Red de profesionales validados y cercanos a {municipio}.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              Un único interlocutor que centraliza tu proyecto y coordina gremios.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              Presupuesto definitivo del profesional tras visita, sin compromiso.
            </li>
          </ul>
        </Container>
      </section>

      {/* CTA: formulario embebido con form_location=zona-<slug> */}
      <section className="section-padding">
        <Container narrow>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">
                Solicita tu proyecto en {municipio}
              </h2>
              <p className="mt-2 text-muted-foreground">
                Cuéntanos qué necesitas y te asignamos al profesional validado más adecuado. Sin compromiso.
              </p>
            </div>
            <FormSolicitud formLocation={`zona-${slug}`} />
          </div>
        </Container>
      </section>

      {/* Cross-links */}
      {crossLinks.length > 0 && (
        <section className="section-padding bg-muted">
          <Container narrow>
            <h2 className="text-xl font-bold mb-4">Otras zonas donde trabajamos</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {crossLinks.map((z) => (
                <a
                  key={z.slug}
                  href={`/zonas/${z.slug}`}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white border border-transparent hover:border-primary/30 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{z.municipio}</span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Consulta el{' '}
              <a href="/zonas" className="text-primary underline">
                mapa completo de cobertura
              </a>
              .
            </p>
          </Container>
        </section>
      )}

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
