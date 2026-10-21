import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import { MapPin, TrendingUp, Users, Building2 } from 'lucide-react';
import { CAPAS_COBERTURA } from '@/content/zonas';

export const metadata: Metadata = {
  title: 'Zonas de cobertura en Madrid',
  description:
    'Reformas en Madrid y su área metropolitana: Pozuelo, Las Rozas, Majadahonda, Móstoles, Fuenlabrada, Leganés, Getafe, Alcorcón, Torrejón y Alcalá de Henares.',
  alternates: { canonical: '/zonas' },
};

// Datos en src/content/zonas.ts; aquí solo el icono de cada capa.
const ICONOS: Record<string, typeof TrendingUp> = { noroeste: TrendingUp, volumen: Users, base: Building2 };
const CAPAS = CAPAS_COBERTURA.map((capa) => ({ ...capa, icon: ICONOS[capa.id] ?? MapPin }));

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
              Trabajamos con una red de profesionales seleccionados en toda la
              Comunidad de Madrid. Estas son las zonas a las que llegamos y el tipo
              de obra que cubrimos en cada una.
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
              <strong>¿Tu municipio no aparece?</strong> Llegamos a toda la
              Comunidad de Madrid: envíanos tu solicitud con el código postal y
              valoramos disponibilidad.
            </p>
          </div>

        </Container>
      </section>

      <CTASection />
    </>
  );
}
