import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import { MapPin, TrendingUp, Users, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zonas de cobertura en Madrid',
  description:
    'Reformas y servicios en Madrid y su zona metropolitana: Pozuelo, Las Rozas, Majadahonda, Móstoles, Fuenlabrada, Leganés, Getafe, Alcorcón, Torrejón y Alcalá de Henares.',
  alternates: { canonical: '/zonas' },
};

type Municipio = {
  nombre: string;
  slug: string;
  nota?: string;
  hasLanding?: boolean;
};

type Capa = {
  id: string;
  titulo: string;
  descripcion: string;
  icon: typeof TrendingUp;
  municipios: Municipio[];
};

const CAPAS: Capa[] = [
  {
    id: 'premium',
    titulo: 'Zonas premium',
    descripcion:
      'Municipios con alta renta media donde abordamos reformas integrales, cocina y baño de mayor entidad, con acabados de gama alta.',
    icon: TrendingUp,
    municipios: [
      { nombre: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon', hasLanding: true },
      { nombre: 'Las Rozas de Madrid', slug: 'las-rozas', hasLanding: true },
      { nombre: 'Majadahonda', slug: 'majadahonda', hasLanding: true },
    ],
  },
  {
    id: 'volumen',
    titulo: 'Zona metropolitana sur y corredor del Henares',
    descripcion:
      'Municipios con gran volumen de población donde cubrimos reformas de vivienda, baño, cocina y servicios técnicos con tiempos ágiles.',
    icon: Users,
    municipios: [
      { nombre: 'Móstoles', slug: 'mostoles' },
      { nombre: 'Fuenlabrada', slug: 'fuenlabrada' },
      { nombre: 'Leganés', slug: 'leganes' },
      { nombre: 'Getafe', slug: 'getafe' },
      { nombre: 'Alcorcón', slug: 'alcorcon' },
      { nombre: 'Torrejón de Ardoz', slug: 'torrejon-de-ardoz' },
    ],
  },
  {
    id: 'operativa',
    titulo: 'Núcleo operativo',
    descripcion:
      'Zona de referencia operativa de Anaid Grupo, con cercanía directa a nuestra sede y la red de profesionales colaboradores.',
    icon: Building2,
    municipios: [
      {
        nombre: 'Alcalá de Henares',
        slug: 'alcala-de-henares',
        nota: 'Sede en Valdeavero (Madrid)',
      },
    ],
  },
];

export default function ZonasPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary/5 to-transparent">
        <Container narrow>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              Cobertura
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Zonas de cobertura en Madrid
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Trabajamos con una red de profesionales validados en Madrid y su
              área metropolitana. Conoce las zonas donde tenemos mayor capacidad
              de respuesta y la tipología de proyecto que cubrimos en cada una.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container narrow>
          <div className="space-y-10">
            {CAPAS.map((capa) => {
              const Icon = capa.icon;
              return (
                <div key={capa.id}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold">
                        {capa.titulo}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {capa.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {capa.municipios.map((m) => {
                      const content = (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="text-sm font-semibold text-foreground">
                              {m.nombre}
                            </span>
                            {m.nota && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {m.nota}
                              </p>
                            )}
                            {!m.hasLanding && (
                              <p className="text-xs text-muted-foreground mt-0.5 italic">
                                Próximamente landing dedicada
                              </p>
                            )}
                          </div>
                        </div>
                      );
                      return m.hasLanding ? (
                        <a
                          key={m.slug}
                          href={`/zonas/${m.slug}`}
                          className="block p-4 rounded-lg bg-muted border border-transparent hover:border-primary/30 hover:bg-white transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        <div
                          key={m.slug}
                          className="p-4 rounded-lg bg-muted border border-transparent"
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-4 rounded-xl bg-accent-light/50 border border-accent/20">
            <p className="text-sm text-muted-foreground">
              <strong>¿Tu municipio no aparece?</strong> Priorizamos estas zonas
              porque es donde nuestra red tiene mayor capacidad de respuesta.
              Si tu proyecto está cerca, envíanos tu solicitud con el código
              postal y valoramos disponibilidad.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <h3 className="font-semibold text-foreground mb-2">
              ¿Eres profesional en alguna de estas zonas?
            </h3>
            <p className="text-sm text-muted-foreground">
              Estamos ampliando la red de colaboradores validados.{' '}
              <a href="/unete-red" className="text-primary underline">
                Únete a la red
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
