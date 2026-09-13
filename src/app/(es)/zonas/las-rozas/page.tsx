import type { Metadata } from 'next';
import ZoneLanding from '@/components/sections/ZoneLanding';

const MUNICIPIO = 'Las Rozas de Madrid';
const SLUG = 'las-rozas';
const DESCRIPTION =
  'Reformas y servicios técnicos en Las Rozas de Madrid. Anaid Grupo asigna al profesional validado más adecuado para tu proyecto en la Comunidad de Madrid.';

export const metadata: Metadata = {
  title: 'Reformas en Las Rozas de Madrid | Anaid Grupo',
  description: DESCRIPTION,
  alternates: { canonical: `/zonas/${SLUG}` },
};

export default function LasRozasPage() {
  return (
    <ZoneLanding
      municipio={MUNICIPIO}
      slug={SLUG}
      description={DESCRIPTION}
      introParagraphs={[
        'Las Rozas combina grandes áreas residenciales de vivienda unifamiliar con bloques de pisos modernos. Anaid Grupo analiza cada proyecto y te asigna al profesional validado adecuado, tanto si necesitas una reforma integral de chalet como si quieres renovar un baño o una cocina.',
        'Cubrimos zonas como Las Matas, Molino de la Hoz, Monterrozas, El Cantizal y el centro urbano. Trabajamos proyectos residenciales, actualizaciones de instalaciones y reformas en comunidades de vecinos.',
        'Somos plataforma de intermediación: conectamos tu necesidad con el profesional que mejor encaja. El presupuesto definitivo lo entrega el propio profesional tras visitar el proyecto en persona.',
      ]}
      highlights={[
        'Mezcla de vivienda unifamiliar y vivienda colectiva moderna, con tipologías de obra variadas.',
        'Alta demanda de reformas de cocina abierta y baños con diseño actualizado.',
        'Equipos habituados a trabajar en urbanizaciones con normativas específicas de comunidad.',
        'Coordinación con arquitectos técnicos cuando el proyecto requiere proyecto visado o licencia.',
      ]}
      crossLinks={[
        { municipio: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon' },
        { municipio: 'Majadahonda', slug: 'majadahonda' },
      ]}
    />
  );
}
